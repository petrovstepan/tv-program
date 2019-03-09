import dynamic from 'next/dynamic'
import Router, { withRouter } from 'next/router'

const DynamicComponent = dynamic(() => import('../components/Hello'))

function Home(props) {
    let { show } = props

    if ( ! show ) {
        show = props.router.query.show
    }

    const onClick = (e) => {
        console.log(e.currentTarget)

        const href = e.currentTarget.getAttribute('href')
        Router.push(`${href}?show=true`, href, {shallow: true})
    }

    return (
        <div>
            { show && <DynamicComponent /> }
            <p>HOME PAGE is here!</p>
            <button href="/dynamic" onClick={onClick}>Click</button>
        </div>
    )
}

Home.getInitialProps = ({ query }) => {
    const show = query && query.show || false
    console.log('get initialprops')

    return { show }
}

export default withRouter(Home)