import React from 'react'
import Router from 'next/router'
import { getPrograms } from '../api/epg.domru.api'
import chListConfig from '../src/components/config/channel-list-config'
import { setChannels, setChannelsToGo } from '../src/store/ChannelList/actions'
import Link from 'next/link'
import { getChannel } from "../server/controllers"
import Layout from "../src/components/Layout"
import Channel from '../src/containers/Channel'
import {setChannel} from "../src/store/Channel/actions";
const { isIE, browserName, browserVersion } = require('react-device-detect')



class ChannelPage extends React.Component {

    static async getInitialProps ({req, reduxStore, query }) {
        //const isServer = !!req
        const resp = await getChannel(query.id)

        if (resp.status === 'FAIL') {
            throw new Error(resp.data.message)
        }

        const ua = req ? req.headers['user-agent'] : window.navigator.userAgent

        reduxStore.dispatch(setChannel(resp.data.channel))

        return {ua, title: resp.data.channel.title}
    }

    render = () => (
        <div>
            <Layout title={this.props.title || 'Телеканал'}>
                <Channel/>
            </Layout>
        </div>
    )
}

export default ChannelPage