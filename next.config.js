require('./server/withEnv')()
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')

module.exports = withCSS(withSass({
    cssModules: false,
    useFileSystemPublicRoutes: false,
    webpack: (config,
         { buildId, dev, isServer, defaultLoaders }) => {
        return config
    },

    serverRuntimeConfig: {

    },
    publicRuntimeConfig: {

    }
}))