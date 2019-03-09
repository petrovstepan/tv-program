import withDomain from '../../hoc/withDomain'
import './ChannelLogo.css'

const ChannelLogo = (props) => {
    const { domain, logo } = props
    const url = `${domain}${logo}`
    
    return (
        <img class="channel-logo" src={url} />
        )
}

export default withDomain(ChannelLogo)