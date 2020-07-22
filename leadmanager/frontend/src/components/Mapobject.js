import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux'
import PropTypes, { object } from 'prop-types';
// action creator
import {changedate} from '../actions/days.js'
import L from 'leaflet';
import {bayd} from "./density.js";
import $ from 'jquery'
import * as d3 from 'd3'
import { values } from 'd3';


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
            side_panel._div.innerHTML = (casesnum ? "<div id = panelLayout><h3>"+ countyName + "</h3><div id = 'rectangle'></div><h4 id = 'cases'>"+casesnum+" cases</h4><div id = 'temperatures'></div></div>"
            : "<h4>hover on a county</h4>")
            // ========== Bar Graph ===========
            // Identify which days are present: if data from all 3/2/1 day(s) are present, 
            // which will then be used to create the x-axis labels 
            // Label array will hold available days

            // Dimensions
            var margin = {top: 0, right: 0, bottom: 0, left: 0}
            var width = 300
            var height = 400

            // Append SVG element
            var svg = d3.select("#temperatures")
                            .append("svg")
                                .attr("width", width+50)
                                .attr("height", height+100)
                                .append("g") // Create group container
                                    .attr("transform", "translate(45, 50)")
            // Data
            var labels = Object.values(this.props.currentDate).filter(val => val !== null)
            // Create X Axis - requires a group container
            var xAxis = d3.scaleBand()
                            .range([0, width])
                            .domain(labels.map((value) => value))
                            .padding(0.3);
            svg.append("g")
                .attr("transform", "translate(0, 400)")
                .call(d3.axisBottom(xAxis))
                .style("color","#212121")
                .style("stroke-width", "3px")
                .selectAll(".tick")
                    .attr("opacity", "3")
                    .selectAll("line")
                        .style("stroke-width", "8px")
            svg.selectAll("text").attr("transform", "translate(-20,20)rotate(-45)")

            // Create Y Axis
            
            // Holds the correct county for previous case numbers 
            const matchedPrevCovData = this.props.prevCovData.filter(val => val.county == countyName)

            // Create Bar 
            if(matchedPrevCovData.length != 0){
                const rectdata = [casesnum, matchedPrevCovData[0].prevDay, matchedPrevCovData[0].beforePrevDay].filter(
                    val => val !== null
                )

                var yAxis = d3.scaleLinear()
                            .domain([0, d3.max(rectdata)+300])
                            .range([height, 0])

                svg.append('g')
                .call(d3.axisLeft(yAxis))
                .style("color","#212121")
                .style("stroke-width", "3px")

                svg.selectAll()
                    .data(labels)
                    .enter()
                    .append("rect")
                        .attr("x", function(d){return xAxis(d)})
                        .attr("width", xAxis.bandwidth())
                        .attr("y", ()=>{return yAxis(0)})
                        .attr("height", ((d) => {return height - yAxis(0)}))

                svg.selectAll("rect")
                    .data(rectdata)
                    .transition()
                    .duration(800)
                    .attr("y", (d) => {return yAxis(d)})
                    .attr("height", (d) => {return height -yAxis(d)})
            }

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