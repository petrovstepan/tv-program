import { createStore, applyMiddleware, combineReducers } from 'redux'
//import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { channelListReducer } from './ChannelList/reducers'
import {channelReducer} from "./Channel/reducers";

const rootReducer = combineReducers({
    chList: channelListReducer,
    channel: channelReducer
})


export function initializeStore (initialState = {}) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunkMiddleware)
    )
}