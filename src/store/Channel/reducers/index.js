import { SET_CHANNEL } from '../actions'
import {CHOOSE_ACTIVE_PROGRAM} from "../../ChannelList/actions";
import {selectActiveProgram} from "../../../utils/programTimeHelper";

const initialState = {
    ch: {
        chid: '',
        description: '',
        display: '',
        hd: '',
        logo: '',
        programs: [],
        thid: '',
        title: '',
        url: '',
        xvid: ''
    }
}

export const channelReducer = (state = initialState, action) => {
    const { type, payload: p } = action

    switch (type) {
        case SET_CHANNEL:
            return {
                ...state, ch: {...p}
            }
        case CHOOSE_ACTIVE_PROGRAM:
            let programs = state.ch.programs
            if (programs.length) {
                programs = selectActiveProgram(programs)
            }
            return {
                ...state, ch: {...state.ch, programs}
            }
        default:
            return state
    }
}