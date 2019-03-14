import ProgramListItemActive from '../../components/ProgramListItemActive'
import { connect } from 'react-redux'
import { chooseActiveProgram } from '../../store/ChannelList/actions'

const mapDispatchToProps = dispatch => ({
  chooseActiveProgram: chid => dispatch(chooseActiveProgram(chid)),
})

export default connect(
  null,
  mapDispatchToProps
)(ProgramListItemActive)
