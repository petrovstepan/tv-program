import React from 'react'
import App, { Container } from 'next/app'
import withReduxStore from '../../store/withStore'
import { Provider } from 'react-redux'
import './App.scss'
import {UserAgentProvider} from '@quentin-sommer/react-useragent'

[].includes(1) // babel-polyfill

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        return { pageProps }
    }

    render () {
        const { Component, pageProps, reduxStore } = this.props
        return (
            <Container>
                <UserAgentProvider ua={pageProps.ua}>
                    <Provider store={reduxStore}>
                        <Component {...pageProps} />
                    </Provider>
                </UserAgentProvider>
            </Container>
        )
    }
}

export default withReduxStore(MyApp)