module.exports = {
    createAsynType: function (pre) {
        return [
            `${pre}_LOAD_POSTS_REQUEST`,
            `${pre}_LOAD_POSTS_SUCCESS`,
            `${pre}_LOAD_POSTS_FAILURE`
        ]
    },
    createAsynReducer: function (initState, pre) {
        return (state = initState, action) => {
            switch (action.type) {
                case `${pre}_LOAD_POSTS_REQUEST`:
                    return Object.assign({}, state, {
                        isFecting: true
                    })
                case `${pre}_LOAD_POSTS_SUCCESS`:
                    return Object.assign({}, state, {
                        isFecting: false,
                        isSucceed: true,
                        data: action.data
                    })
                case `${pre}_LOAD_POSTS_FAILURE`:
                    return Object.assign({}, state, {
                        isFecting: false,
                        isSucceed: false,
                        error: action.error
                    })
                default:
                    return state
            }
        }
    },
    createSyncReducer: function (initState, type) {
        return (state = initState, action) => {
            if (type === action.type) {
                switch (Object.prototype.toString.call(initState)) {
                    case '[object Object]':
                        return Object.assign({}, state, action.data)
                    default:
                        return action.data
                }
            } else {
                return state
            }
        }
    }
}