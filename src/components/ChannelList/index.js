import React from 'react'
import ChannelListItem from '../ChannelListItem'
import './ChannelList.scss'

class ChannelList extends React.Component {
  constructor(props) {
    super(props)

    this.list = React.createRef()
  }
  componentDidMount() {
    document.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll)
  }

  onScroll = () => {
    const { channelsToGo, loadChannels, channels, isLoading } = this.props
    const wHeight = window.innerHeight
    const { bottom: b } = this.list.current.getBoundingClientRect()

    if (channelsToGo && !isLoading && b - wHeight < wHeight / 5) {
      loadChannels(Object.keys(channels).length)
    }
  }

  render() {
    const { order, channels, isLoading } = this.props

    return (
      <div className="channel-list-wrapper">
        <div ref={this.list} className="channel-list">
          {order.map(k => (
            <ChannelListItem key={k} {...channels[k]} />
          ))}
        </div>
        {isLoading && <span>...загрузка</span>}
      </div>
    )
  }
}

export default ChannelList
