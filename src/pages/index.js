import React from 'react'
import {
    getChannelThemes,
    getChannels
} from '../../api'
import ChannelLogo from '../components/ChannelLogo'
import './style.css'


class Index extends React.Component {
    
    static async getInitialProps () {
        const themes = await getChannelThemes()
        const channels = await getChannels()
    
        
        return {themes, channels}
    }
    
    renderChannels = (channels) => channels.map(ch => {
        
        return (
            <div class="channels-list__item" key={ch.chid}>
                <ChannelLogo logo={ch.logo} />
                <span class="channels-list__item-title">{ch.title}</span>
            </div>
            )
    })
    
    render () {
        const { themes = [], channels = [] } = this.props
        
        
        return (
            <div>
                <div>{themes.map( theme => <p key={theme.thid}>{theme.name}</p> )}</div>
                <div class="channels-list">{this.renderChannels(channels)}</div>
            </div>
            )
    }
}

export default Index