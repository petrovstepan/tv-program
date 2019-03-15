const timezoneOffset = require('../../config/domain-timezone')
const domain = require('../../config/domain')
const isServer = typeof window === 'undefined'

const getOffsetInMinutes = () =>
  (timezoneOffset[domain] &&
    new Date().getTimezoneOffset() - timezoneOffset[domain]) ||
  0

const getOffset = () => getOffsetInMinutes() * 60 * 1000

const getOffsetTime = () => +new Date(Date.now() + getOffset())
const getTime = () => (isServer ? getOffsetTime() : Date.now())

const progIsShowingNow = (start, duration) => {
  const s = new Date(start)
  const e = new Date(+s + duration * 1000)
  const now = getTime()
  return now >= +s && now < +e
}

const progWillRunInTheFuture = start => {
  const s = new Date(start)
  const now = getTime()
  return now < +s
}

const progWillEndInNMinutes = (start, duration) => {
  const now = getTime()
  const end = +new Date(+new Date(start) + duration * 1000)
  return end - now
}

const progWillBeginInNMinutes = start => {
  const now = getTime()
  const s = +new Date(start)
  const diff = s - now
  return diff > 0 ? diff : 0
}

const selectActiveProgram = programs => {
  let active = false // чтобы был только 1 active. Есть программы с одним временем начала
  return programs.map(p => {
    if (!active && progIsShowingNow(p.start, p.duration)) {
      active = true
      return { ...p, active: true }
    } else {
      return { ...p, active: false }
    }
  })
}

module.exports = {
  selectActiveProgram,
  progWillBeginInNMinutes,
  progWillEndInNMinutes,
  progWillRunInTheFuture,
  progIsShowingNow,
}
