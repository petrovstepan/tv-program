import React from 'react'
import ChannelList from '../src/containers/ChannelList'
import { setChannels, setChannelsToGo } from '../src/store/ChannelList/actions'
import { getTvProgram } from '../server/controllers'
import Layout from '../src/components/Layout'

class IndexPage extends React.Component {
  static async getInitialProps({ req, reduxStore, query }) {
    //const isServer = !!req
    const { channels, rest } = await getTvProgram()

    const ua = req ? req.headers['user-agent'] : window.navigator.userAgent

    reduxStore.dispatch(setChannels(channels))
    reduxStore.dispatch(setChannelsToGo(rest))
    return { ua }
  }

  render = () => (
    <div>
      <Layout title="Телепрограмма">
        <ChannelList />
      </Layout>
    </div>
  )
}

export default IndexPage
