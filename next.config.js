const withSass = require('@zeit/next-sass')

module.exports = {
    useFileSystemPublicRoutes: false,
    dir: 'src',
    webpack: withSass(
        (config,
         { buildId, dev, isServer, defaultLoaders }) => {
            console.log(defaultLoaders)
        return config
    }),

    serverRuntimeConfig: {

    },
    publicRuntimeConfig: {

    }
}