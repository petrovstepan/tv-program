import ChannelList from '../../components/ChannelList'
import { connect } from 'react-redux'
import {loadChannels} from "../../store/ChannelList/actions";

const mapStateToProps = (state) => {

    return { // ...state.chList
        channels: state.chList.channels,
        isLoading: state.chList.isLoading,
        order: state.chList.order,
        channelsToGo: state.chList.channelsToGo
    }
}

const mapDispatchToProps = (dispatch) => ({
    loadChannels: offset => dispatch(loadChannels(offset))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList)