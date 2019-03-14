const axios = require('axios')

const get = (url, params = {}) =>
  axios
    .get(url, { params })
    .then(resp => resp.data)
    .catch(err => {
      console.log('local error')
      console.log(err)
      return []
    })

const getChannel = chid => get(`/api/getchannel/${chid}`)
const getTvProgram = offset => get('/api/gettvprogram', { offset })

module.exports = {
  getTvProgram,
  getChannel,
}
