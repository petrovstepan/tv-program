import React from 'react'
import { getChannel } from '../server/controllers'
import Layout from '../src/components/Layout'
import Channel from '../src/containers/Channel'
import { setChannel } from '../src/store/Channel/actions'

class ChannelPage extends React.Component {
  static async getInitialProps({ req, reduxStore, query }) {
    //const isServer = !!req
    const resp = await getChannel(query.id)

    if (resp.status === 'FAIL') {
      throw new Error(resp.data.message)
    }

    const ua = req ? req.headers['user-agent'] : window.navigator.userAgent

    reduxStore.dispatch(setChannel(resp.data.channel))

    return { ua, title: resp.data.channel.title }
  }

  render = () => (
    <div>
      <Layout title={this.props.title || 'Телеканал'}>
        <Channel />
      </Layout>
    </div>
  )
}

export default ChannelPage
