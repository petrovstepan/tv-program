import React from 'react'
import Router, { withRouter } from 'next/router'
import { format } from 'url'
import {connect} from "react-redux"

let count = 1

class Counter extends React.Component {
    static getInitialProps ({ res }) {
        if (res) {
            return { initialPropsCounter: 1 }
        }
        console.log('get initial props counter')

        count++
        return {
            initialPropsCounter: count
        }
    }

    reload () {
        const { pathname, query } = Router
        Router.push(format({ pathname, query }))
    }

    incrementStateCounter () {
        const { router } = this.props
        const currentCounter = router.query.counter
            ? parseInt(router.query.counter)
            : 0
        const href = `/counter?counter=${currentCounter + 1}`
        Router.push(href, href, { shallow: true })
    }

    render () {
        const { initialPropsCounter, router } = this.props
        console.log(this.props)

        return (
            <div>
                <h2>This is the Home Page</h2>

                <button onClick={() => this.reload()}>Reload</button>
                <button onClick={() => this.incrementStateCounter()}>
                    Change State Counter
                </button>
                <p>"getInitialProps" ran for "{initialPropsCounter}" times.</p>
                <p>
                    Counter: "{router.query.counter || 0}
                    ".
                </p>
            </div>
        )
    }
}

const mapStateToProps = (store) => ({
    one: store.one
})


export default connect(mapStateToProps)(withRouter(Counter))