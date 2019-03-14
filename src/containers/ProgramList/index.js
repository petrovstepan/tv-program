import ProgramList from '../../components/ProgramList'
import { connect } from 'react-redux'
import { chooseActiveProgram } from '../../store/ChannelList/actions'

const mapDispatchToProps = dispatch => ({
  chooseActiveProgram: xvid => dispatch(chooseActiveProgram(xvid)),
})

export default connect(
  null,
  mapDispatchToProps
)(ProgramList)
