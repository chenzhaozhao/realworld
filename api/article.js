import {
    request
} from '../plugins/request'
const getArticle = (params) => {
    return request({
        url: "/articles",
        method: 'get',
        params,
    })
}
const getOwnerArticle = () => {
    return request({
        url: '/articles/feed',
        method: 'get'
    })
}
const getTag = () => {
    return request({
        url: '/tags',
        method: 'get'
    })
}
// 点赞
const addFavorite = slug => {
    return request({
        url: `/articles/${slug}/favorite`,
        method: 'post'
    })
}
// 取消
const deleteFavorite = slug => {
    return request({
        url: `/articles/${slug}/favorite`,
        method: "delete"
    })
}
//创建
const createArticle = (data) => {
    request({
        url: '/articles',
        method: 'post',
        data
    })
}
//获取文章
const getArticleBySlug = (slug) => {
    return request({
        url: `/articles/${slug}`,
        method: "get"
    })
}
const getCommentBySlug = slug => {
    return request({
        url: `/articles/${slug}/comments`,
        method: "get"
    })
}
const setCommentBySlug = (slug, data) => {
    return request({
        url: `/articles/${slug}/comments`,
        method: "post",
        data: data
    })
}
export default {
    getArticle,
    getTag,
    getOwnerArticle,
    addFavorite,
    deleteFavorite,
    createArticle,
    getArticleBySlug,
    getCommentBySlug,
    setCommentBySlug
}