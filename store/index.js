import cookieparser from 'cookieparser'
export const state = () => {
    return {
        user: null,
    }
}
export const mutations = {
    setUser(state, data) {
        state.user = data
    }
}

export const actions = {
    nuxtServerInit({
        commit
    }, {
        req
    }) {
        let user = null;
        if (req.headers.cookie) {
            try {
                user = JSON.parse(cookieparser.parse(req.headers.cookie).user)
            } catch (e) {
                console.log(e)
            }
        }
        commit('setUser', user)
    }
}