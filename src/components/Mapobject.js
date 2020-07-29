import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux'
// action creator
import L from 'leaflet';
import $ from 'jquery'
import * as d3 from 'd3'


export class Mapobject extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.map()
    }

    map(){
        var Cases_Map = L.map('casesmap').setView([37.9, -121.8],9);
        var geojson;
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYmRhdmlkMSIsImEiOiJjamh5bng5cnMwb280M3RvenViN3MwN2JhIn0.dPZXrYglsoHH3R133ABafg', 
        {
          id: 'mapbox/light-v9',
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(Cases_Map);
        // MISC FUNCTIONS 

        // =========== SIDE BAR HOVER INFORMATION =============
        var side_panel = L.control()
        side_panel.onAdd = function(){
            this._div = L.DomUtil.create('div', 'SIDEPANEL');
            L.DomUtil.setOpacity(this._div, 0.85)
            this.update();
            return this._div
        }
        side_panel.update = ((countyName, casesnum) => {
            side_panel._div.innerHTML = (casesnum ? "<div id = 'panelLayout'><h3>"+
            countyName + "</h3><div id = 'rectangle'></div><h4 id = 'cases'>"+
            casesnum+" cases</h4><div id = 'temperatures'></div><div id = 'changeInCases'></div></div>"
            : "<h2>Hover on a county</h2>")

            // ========== Line Graph ===========
            // Identify which days are present: if data from all 3/2/1 day(s) are present, 
            // which will then be used to create the x-axis labels 
            // Label array will hold available days

            // Dimensions
            var height = 400

            var svg = d3.select("#temperatures")
                        .append("svg")
                        .attr("preserveAspectRatio", "xMinYMin meet")
                        .attr("viewBox", "-65 -50 300 500")
                        .classed("svg-content-responsive", true)
                        .append("g")
            
            var labels = Object.values(this.props.currentDate).filter(val => val !== null)
            var xAxis = d3.scaleOrdinal()
                            .domain(labels.map(date => date))
                            .range([25, 125, 205])
            var xAxisLine = svg.append("g").call(d3.axisBottom(xAxis)).attr("transform", "translate(0, 400)")
            xAxisLine.select("path").attr("stroke", "#212121").style("stroke-width", "3")
            xAxisLine.selectAll(".tick").style("color", "#212121").style("stroke-width", "2")
            xAxisLine.selectAll(".tick").select("text").style("font-size", "14px")

            const zip = (array1, ...array2) => {
                return array1.map((array1Val, array1Idx) => {
                    return array2.reduce((accum, currentVal) => {
                        return [accum, currentVal[array1Idx]]
                    }, array1Val)
                })
            }

            const matchedPrevCovData = this.props.prevCovData.filter(val => val.county == countyName)
            
            if(matchedPrevCovData.length != 0){
                var dataByDate = [casesnum, matchedPrevCovData[0].prevDay, matchedPrevCovData[0].beforePrevDay].filter(
                    val => val !== null
                )
                var yAxis = d3.scaleLinear()
                            .domain([d3.min(dataByDate)-20, d3.max(dataByDate)+20])
                            .range([height, 0])
                
                var yAxisLine = svg.append("g").call(d3.axisLeft(yAxis))
                yAxisLine.select("path").attr("stroke", "#212121").style("stroke-width", "3")
                yAxisLine.selectAll(".tick").style("color", "#212121").style("stroke-width", "2")
                yAxisLine.selectAll("text").style("font-size", "14px")

                const graphdata = zip(labels, dataByDate)
                svg.selectAll("circle")
                    .data(graphdata)
                    .enter()
                    .append("circle")
                        .attr("cx", (d) => xAxis(d[0]))
                        .attr("cy", (d) => yAxis(d[1]))
                        .attr("r", "6")
                        .style("fill", "#212121")
                        
                var line = d3.line()
                                .x((d) => xAxis(d[0]))
                                .y((d) => yAxis(d[1]))
                var path = svg.append("path")
                                .attr("d", line(graphdata))
                                .attr("stroke", "#50c878")
                                .attr("stroke-width", "3")
                                .attr("fill", "none")

                const totalLength = path.node().getTotalLength()
                path.attr("stroke-dasharray", totalLength + " " + totalLength)
                    .attr("stroke-dashoffset", totalLength)
                    .transition()
                    .duration(1000)
                    .attr("stroke-dashoffset", totalLength*2)

                var changesvg = d3.select("#changeInCases")
                               .append("svg")
                               .attr("preserveAspectRatio", "xMinYMin meet")
                               .attr("viewBox", "-20 -15 100 100")

                if(dataByDate.length > 1){
                    const dayChangeCases = dataByDate[0] - dataByDate[1]
                    changesvg.append("text").text("+"+dayChangeCases+" new cases").classed("cases-change-text", true)
    
                }
            }

            // ========= Changes in Cases Text =========
            
        })
        side_panel.addTo(Cases_Map)
        // =========== EVENT HANDLES =============

        // Event when mouse returns to original after hover

        geojson = L.geoJSON(this.props.covdata, {style:{opacity:1, color:'#5B6467',dashArray:'3', fillOpacity:0.7}, onEachFeature: ((feature,layer) =>{
            layer.on({
                mouseover: ((e) =>{
                    var layer = e.target;
                    layer.setStyle({
                    color: '#080f29',
                    weight:2,
                    opacity: 0.5
                    })
                    $('.SIDEPANEL.leaflet-control').addClass("sidepanelinfo")
                    side_panel.update(e.target.feature.properties.county, e.target.feature.properties.density)
                }),
                mouseout: ((e) => {
                    geojson.resetStyle(e.target)
                    $('.SIDEPANEL.leaflet-control').removeClass("sidepanelinfo")
                    side_panel.update()
                })
            });
        })}).addTo(Cases_Map)
    }

    render(){
        return(
            <div id = "casesmap">xx</div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        covdata: state.datesReducer.data,
        currentDate: state.datesReducer.displaydate,
        prevCovData: state.datesReducer.prevData
    }
};

export default connect(mapStateToProps, null)(Mapobject)