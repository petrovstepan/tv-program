const {
  getTimeForPrograms,
} = require('../src/utils/channel-n-program-data-handler')
const axios = require('axios')
const domain = require('../config/domain')

const host = 'http://epg.domru.ru'

const get = (url, params = {}) =>
  axios
    .get(`${host}${url}`, { params: { ...params, domain } })
    .then(resp => resp.data)
    .catch(err => {
      console.log('error')
      console.log(err.response)
      return []
    })

const loadChannels = params => get('/channel/list', params)
const loadPrograms = params =>
  get('/program/list', { ...params, ...getTimeForPrograms() })

module.exports = {
  loadChannels,
  loadPrograms,
  host,
}
