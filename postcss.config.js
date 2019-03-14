module.exports = {
    plugins: [
        require('doiuse')({
            onFeatureUsage: function(usageInfo) { console.log(usageInfo.message) }
        }),
        require('autoprefixer')
    ]
}