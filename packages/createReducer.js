/*
 * @Author: ouyangdc 
 * @Date: 2018-11-15 11:28:43 
 * @Description: 动态创建reducer
 * @Last Modified by: ouyangdc
 * @Last Modified time: 2018-12-01 11:26:51
 */
export default (type, initState) => (state = initState, action) => {
    if (type === action.type) {
        if(typeof action.payload === 'object'){
            if(Array.isArray(action.payload)){
                return [...action.payload]
            }else {
                return Object.assign({}, state, action.payload)
            }  
        }
        return action.payload
    } 
    return state
}
