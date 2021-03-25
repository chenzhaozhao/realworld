import {request} from '../plugins/request'
const login = (data) => {
    return request({
        url: "/users/login",
        method: 'post',
        data,
    })
}
const sign = (data) => {
    return request({
        url: "/users",
        method: 'post',
        data,
    })
}
const updateUser = (data) => {
    return request({
        url: '/user',
        method:'put',
        data,
    })
}
const getUser=()=>{
    return request({
        url:'/user',
        method:'get',
    }) 
}
const getUserByName=name=>{
    return request({
        url:`/profiles/${name}`,
        method:'get',
    })
}
export default {
    login,
    sign,
    updateUser,
    getUser,
    getUserByName
}