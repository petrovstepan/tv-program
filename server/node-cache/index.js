const NodeCache = require( "node-cache" )

class Cache {
    static getInstance() { return Cache.instance == null ? Cache.instance = new NodeCache() : Cache.instance }
}

module.exports = Cache