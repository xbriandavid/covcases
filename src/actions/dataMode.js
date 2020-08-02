// Action Creator
export const changeDataMode = (mode) => dispatch => {
    dispatch({
        type: mode,
        payloadDataMode: mode
    })
}