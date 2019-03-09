import NextHead from 'next/head'

const Head = (props) => (
    <NextHead>
        <title>{props.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {
            React.Children.map(props.children, c => c)
        }
    </NextHead>
)

export default Head