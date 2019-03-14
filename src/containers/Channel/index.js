import Channel from '../../components/Channel'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    channel: state.channel.ch,
  }
}

export default connect(mapStateToProps)(Channel)
