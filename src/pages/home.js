import React from 'react'
import Link from 'next/link'
import Head from "../components/Head";
import 'isomorphic-unfetch'

class Home extends React.Component {
    static async getInitialProps (params) {

        // pathname
        // query
        // asPath
        // req
        // res
        // jsonPageRes
        // err

        const { req, query } = params


        const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
        const res = await fetch('https://api.github.com/repos/developit/preact')
        const json = await res.json()
        return { stars: json.stargazers_count, ...query }
    }

    render() {
        const { stars, userAgent, id } = this.props

        return (
            <div>
                <Head title={'Home'} />
                <div>Welcome to homepage!</div>
                <div>{stars}</div>
                <Link prefetch href='/'>
                    <button>Ссылка</button>
                </Link>
                <div>{userAgent}</div>
            </div>
        )
    }
}

export default Home