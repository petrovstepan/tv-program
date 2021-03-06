import React from 'react'
import ChannelLogo from '../ChannelLogo'
import './Channel.scss'
import ProgramList from '../../containers/ProgramList'

const Channel = ({ channel }) => {
  const { chid, description, logo, programs, title } = channel

  return (
    <div className="channel">
      <div className="channel__header">
        <ChannelLogo logo={logo} />
        <h1 className="channel__title">{title}</h1>
      </div>
      <div
        className="channel__description"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <ProgramList programs={programs} chid={chid} />
    </div>
  )
}

export default Channel
