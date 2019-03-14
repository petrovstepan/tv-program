import {getTvProgram} from "../../../../server/controllers";

export const ADD_CHANNELS = 'ADD_CHANNELS'
export const SET_CHANNELS = 'SET_CHANNELS'
export const SET_CHANNELS_TO_GO = 'SET_CHANNELS_TO_GO'
export const LOADING_CHANNELS = 'LOADING_CHANNELS'
export const CHOOSE_ACTIVE_PROGRAM = 'CHOOSE_ACTIVE_PROGRAM'


export const setChannels = (channels) => ({
    type: SET_CHANNELS,
    payload: channels
})

export const addChannels = (channels) => ({
    type: ADD_CHANNELS,
    payload: channels
})

export const setChannelsToGo = (n) => ({
    type: SET_CHANNELS_TO_GO,
    payload: n
})

export const loadChannels = (offset) => async (dispatch) => {

    dispatch({
        type: LOADING_CHANNELS
    })

    const data = await getTvProgram(offset)

    dispatch(addChannels(data.channels))
    dispatch(setChannelsToGo(data.rest))
}

export const chooseActiveProgram = (chid) => ({
    type: CHOOSE_ACTIVE_PROGRAM,
    payload: chid
})