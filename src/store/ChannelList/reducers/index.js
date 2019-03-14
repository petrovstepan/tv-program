import {SET_CHANNELS, CHOOSE_ACTIVE_PROGRAM, ADD_CHANNELS, LOADING_CHANNELS, SET_CHANNELS_TO_GO} from "../actions";
import {selectActiveProgram} from "../../../utils/programTimeHelper";


const initialState = {
    channels: {},
    isLoading: false,
    order: [],
    channelsToGo: 100
}

export const channelListReducer = (state = initialState, action) => {
    const { payload : p, type } = action
    let channels
    let order

    switch (type) {
        case SET_CHANNELS:
            return {
                ...state, channels: { ...p }, order: Object.keys(p)
            }
        case SET_CHANNELS_TO_GO:
            return {
                ...state, channelsToGo: p
            }
        case ADD_CHANNELS:
            order = [...state.order, ...Object.keys(p)]
            return {
                ...state, channels: { ...state.channels, ...p }, order: [ ...new Set(order) ] , isLoading: false
            }
        case LOADING_CHANNELS:
            return {
                ...state, isLoading: true
            }
        case CHOOSE_ACTIVE_PROGRAM:
            channels = state.channels
            if (channels[p] && channels[p].programs.length) {
                channels[p].programs = selectActiveProgram(channels[p].programs)
            }
            return {
                ...state, channels: { ...channels }
            }
        default:
            return state
    }
}