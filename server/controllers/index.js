const {
  combineChannelsAndPrograms,
  sliceChannels,
  filterProgramsToCurrentTime,
  parseDateStringForSafari,
} = require('../../src/utils/channel-n-program-data-handler')
const { loadChannels, loadPrograms } = require('../../api/epg.domru.api')
const api = require('../../api')
const cache = require('../node-cache').getInstance()

/**
 * Загрузка каналов и сохранение в кэш
 * @returns {Promise<*>}
 */
async function initializeChannelsCache() {
  const channels = await loadChannels()
  cache.set('channels', channels, 6 * 60 * 60) //можно кэшировать и дольше
  return channels
}

/**
 * Загрузка програм и сохранение в кэш
 * @returns {Promise<*>}
 */
async function initializeProgramsCache() {
  const channels = cache.get('channels')
  const xvid = channels.map(c => c.xvid)
  const programs = await loadPrograms({ xvid })
  Object.keys(programs).forEach(xvid => {
    programs[xvid] = parseDateStringForSafari(programs[xvid])
  })
  cache.set('programs', programs, 2 * 60 * 60)
  return programs
}

async function initializeTvProgram() {
  await initializeChannelsCache()
  await initializeProgramsCache()
}

/**
 * Загрузка данных о каналах и программах, выполняется при старте сервера, при истечении срока обновляются
 * @returns {Promise<void>}
 */
async function initializeCache() {
  await initializeTvProgram()
  cache.on('expired', key => {
    switch (key) {
      case 'channels':
        initializeTvProgram()
        break
      case 'programs':
        initializeProgramsCache()
        break
      default:
        break
    }
  })
}

/**
 * Достает каналы из кэша или загружает их с api, выполняется на сервере
 * @returns {Promise<*>}
 */
async function getChannelsFromCacheOrApi() {
  let channels = cache.get('channels')
  if (!channels) {
    channels = await initializeChannelsCache()
  }
  return channels
}

/**
 * Достает программы из кэша или загружает их с api, выполняется на сервере
 * @returns {Promise<*>}
 */
async function getProgramsFromCacheOrApi() {
  let programs = cache.get('programs')
  if (!programs) {
    programs = await initializeProgramsCache()
  }
  return programs
}

/**
 * Выбирает нужные каналы и подсчитывает, сколько еще можно загрузить
 * @param channelsOffset
 * @returns {Promise<{rest: *, channels: *}>}
 */
async function getSlicedChannels(channelsOffset = 0) {
  const alllChannels = await getChannelsFromCacheOrApi()
  const channels = sliceChannels(alllChannels, channelsOffset)
  const rest = countRestChannels(
    alllChannels.length,
    channelsOffset,
    channels.length
  )
  return { channels, rest }
}

const countRestChannels = (all, offset, curr) => {
  return (all > 0 && all - offset - curr) || 0
}

/**
 * Достает список программ для списка каналов, выполняется на сервере
 * @param xvid
 * @returns {Promise<void>}
 */
async function getProgramsByXvid(xvid) {
  const programs = await getProgramsFromCacheOrApi()
  const xvidPrograms = {}
  xvid.map(id => (xvidPrograms[id] = programs[id] || []))
  return xvidPrograms
}

/**
 * Достает список из n телеканалов с отступом и объединяет их с программами, выполняется на сервере
 * @param channelsOffset
 * @returns {Promise<{rest, channels}>}
 */
async function createTvProgram(channelsOffset) {
  let { channels, rest } = await getSlicedChannels(channelsOffset) // || await api.getChannels(channelsOffset)
  const xvid = channels.map(c => c.xvid)

  const programs = await getProgramsByXvid(xvid)
  channels = combineChannelsAndPrograms(
    channels,
    filterProgramsToCurrentTime(programs, true)
  )
  return { channels, rest }
}

/**
 * Достает текущую телепрограмму для следующих n каналов с отступом в размере количества уже загруженных
 * Изоморфный
 * @param channelsOffset
 * @returns {Promise<boolean|*>}
 */
async function getTvProgram(channelsOffset = 0) {
  const isServer = typeof window === 'undefined'
  return (
    (isServer && (await createTvProgram(channelsOffset))) ||
    (await api.getTvProgram(channelsOffset))
  )
}

/**
 * Метод достает канал с программами по id, выполняется на сервере
 * @param chid
 * @returns {Promise<*|null>}
 */
async function getChannelWithProgram(chid) {
  const channels = await getChannelsFromCacheOrApi()
  const channel = channels.find(c => c.chid === chid)

  if (channel) {
    const { xvid } = channel
    channel.programs =
      filterProgramsToCurrentTime(await getProgramsByXvid([xvid]))[xvid] || []
  }

  return channel || null
}

/**
 * Метод достает канал с программами по id, изоморфный
 * @param chid
 * @returns {Promise<*>}
 */
async function getChannel(chid) {
  const isServer = typeof window === 'undefined'
  if (isServer) {
    const channel = await getChannelWithProgram(chid)
    if (channel) {
      return {
        status: 'OK',
        data: {
          channel,
        },
      }
    } else {
      return {
        status: 'FAIL',
        error: true,
        data: {
          message: 'Канала не существует',
        },
      }
    }
  } else {
    return await api.getChannel(chid)
  }
}

module.exports = {
  getSlicedChannels,
  getTvProgram,
  createTvProgram,
  initializeCache,
  getProgramsByXvid,
  getChannelWithProgram,
  getChannel,
}
