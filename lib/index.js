function myMiddleware({ dispatch, getState }) {
    return next => action => {
        const {
            types,
            fetchAPI,
            shouldfetchAPI = () => true,
            shouldSaveData = true,
            dealData = () => { },
            callback,
        } = action

        if (!types) {
            // Normal action: pass it on
            return next(action)
        }

        if (
            !Array.isArray(types) ||
            types.length !== 3 ||
            !types.every(type => typeof type === 'string')
        ) {
            throw new Error('Expected an array of three string types.')
        }

        if (typeof fetchAPI !== 'function') {
            throw new Error('Expected fetchAPI to be a function.')
        }
        if (typeof dealData !== 'function') {
            throw new Error('Expected dealData to be a function.')
        }
        if (!shouldfetchAPI(getState())) {
            return
        }
        const {
            successCall = () => { },
            failureCall = () => { },
        } = callback;
        const [requestType, successType, failureType] = types;

        dispatch({ type: requestType });

        return fetchAPI().then(
            response => {
                if (response.data.errCode === 200) {
                    if (shouldSaveData) {
                        let data = dealData(response.data.data) || response.data.data;
                        dispatch({
                            type: successType,
                            data
                        });
                        successCall(data, dispatch, getState());
                    } else {
                        dispatch({
                            type: successType,
                        });
                        successCall(dispatch, getState());
                    }
                } else {
                    const error = response.data.errCode;
                    dispatch({
                        type: failureType,
                        error
                    });
                    failureCall(error, dispatch, getState());
                }
            }
        ).catch(error => {
            dispatch({
                type: failureType,
                error
            });
            failureCall();
        })
    }
}
export default myMiddleware