import axios from 'axios'

export const domain = 'http://epg.domru.ru'

const get = (url) => axios.get(`${domain}${url}`)
                    .then(resp => {console.log(resp); return resp})
                    .then(resp => resp.data)
                    .catch(err => {
                         console.log(err)
                         return []
                    })

export const getChannelThemes = () => get('/channeltheme/list')
export const getChannels = () => get('/channel/list?domain=perm')

var a = {
   
     'темы каналов': 'http://epg.domru.ru/channeltheme/list',
     'список каналов в городе': 'http://epg.domru.ru/channel/list?domain=ekat',
     'sfs': 'http://epg.domru.ru/geodigit/list?domain=ekat&digit=0',
     'Инфо о канале': 'http://epg.domru.ru/channel/info?chid=1&domain=barnaul',
     'темы каналов в пакете': 'http://epg.domru.ru/geobundle/themelist?domain=ekat&bid=23',
     'каналы в пакете': 'http://epg.domru.ru/geobundle/channels?domain=ekat&bid=23',
     'все каналы': 'http://epg.domru.ru/geobundle/channels?domain=ekat',
     'жанры': ' http://epg.domru.ru/programgenre/mainlist',
     'список передач за промежуток времени': `http://epg.domru.ru/program/list?
     date_from=2015-06-08+00%3A00%3A00&
     date_to=2015-06-09+00%3A00%3A00&
     xvid[0]=1&xvid[1]=2&xvid[2]=479`
}