import ChannelLogo from "../ChannelLogo"
import React from "react"
import './ChannelListItem.scss'
import ProgramList from "../../containers/ProgramList"
import Link from 'next/link'

const ChannelListItem = (props) => {

    const { logo, title, programs, chid } = props

    return (
        <div className="channel-list__item" >
            <Link prefetch href={`/channel/${chid}`}>
                    <div className="channel-list__item-wrapper">
                        <ChannelLogo logo={logo} />
                        <span className="channel-list__item-title">{title}</span>
                    </div>
            </Link>
            <ProgramList programs={programs} chid={chid} />
        </div>
    )
}

export default ChannelListItem