import { createStore, applyMiddleware, combineReducers } from 'redux'
//import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const exampleInitialState = {
    bla: 'asd'
}

export const actionTypes = {
    TICK: 'TICK',
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT',
    RESET: 'RESET'
}


const reducerOne = (state = exampleInitialState, action) => {
    switch (action.type) {
        case actionTypes.TICK:
            return Object.assign({}, state, {
                lastUpdate: action.ts,
                light: !!action.light
            })
        case actionTypes.INCREMENT:
            return Object.assign({}, state, {
                count: state.count + 1
            })
        case actionTypes.DECREMENT:
            return Object.assign({}, state, {
                count: state.count - 1
            })
        case actionTypes.RESET:
            return Object.assign({}, state, {
                count: exampleInitialState.count
            })
        default:
            return state
    }
}

const rootReducer = combineReducers({
    one: reducerOne
})


export function initializeStore () {
    return createStore(
        rootReducer,
        applyMiddleware(thunkMiddleware)
    )
}