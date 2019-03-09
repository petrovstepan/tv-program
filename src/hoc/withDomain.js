import { domain } from '../../api'

const withDomain = Component => props => <Component {...props} domain={domain} />
 
export default withDomain