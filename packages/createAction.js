/*
 * @Author: ouyangdc 
 * @Date: 2018-11-15 10:00:04 
 * @Description: 动态生成action
 * @Last Modified by: ouyangdc
 * @Last Modified time: 2018-12-21 15:58:37
 */
export default (type, args) => {
    let action = {
        type,
        payload: args
    }
    return action
}