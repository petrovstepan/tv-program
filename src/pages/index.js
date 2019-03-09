import Head from '../components/Head'
import Link from 'next/link'

function IndexPage() {
    return (
        <div className="index">
            <Head title={'Main'} />
            <p>Hello world!</p>
            <Link prefetch href='/home'>
                <a>Home</a>
            </Link>
        </div>
    )
}

export default IndexPage