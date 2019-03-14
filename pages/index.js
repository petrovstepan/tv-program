import React from 'react'
import Router from 'next/router'
import { getPrograms } from '../api/epg.domru.api'
import chListConfig from '../src/components/config/channel-list-config'
import ChannelList from '../src/containers/ChannelList'
import { setChannels, setChannelsToGo } from '../src/store/ChannelList/actions'
import Link from 'next/link'
import { getTvProgram } from "../server/controllers"
import Layout from "../src/components/Layout";
const { isIE, browserName, browserVersion } = require('react-device-detect')



class IndexPage extends React.Component {
    
    static async getInitialProps ({req, reduxStore, query }) {
        //const isServer = !!req
        const { channels, rest } = await getTvProgram()

        const ua = req ? req.headers['user-agent'] : window.navigator.userAgent

        reduxStore.dispatch(setChannels(channels))
        reduxStore.dispatch(setChannelsToGo(rest))
        return {ua}
    }
    
    render = () => (
        <div>
            <Layout title="Телепрограмма">
                <ChannelList/>
            </Layout>
        </div>
    )
}

export default IndexPage