import React from 'react'
import withHost from '../../hoc/withHost'
import './ChannelLogo.scss'

const ChannelLogo = props => {
  const { host, logo } = props
  const url = `${host}${logo}`

  return <img className="channel-logo" src={url} alt="Лого канала" />
}

export default withHost(ChannelLogo)
