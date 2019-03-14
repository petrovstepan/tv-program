const progIsShowingNow = (start, duration) => {
  const s = new Date(start)
  const e = new Date(+s + duration * 1000)
  const now = Date.now()
  return now >= +s && now < +e
}

const progWillRunInTheFuture = start => {
  const s = new Date(start)
  const now = Date.now()
  return now < +s
}

const progWillEndInNMinutes = (start, duration) => {
  const now = Date.now()
  const end = +new Date(+new Date(start) + duration * 1000)
  return end - now
}

const progWillBeginInNMinutes = start => {
  const now = Date.now()
  const s = +new Date(start)
  const diff = s - now
  return diff > 0 ? diff : 0
}

const getCompletionPercent = (start, duration) => {
  const d = duration * 1000
  const s = new Date(start)
  const e = new Date(+s + d)
  const now = new Date()
  const complete = Math.round(+e - now > 0 ? ((+now - s) / d) * 100 : 100)
  return complete ? complete : 1
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
  getCompletionPercent,
  progWillBeginInNMinutes,
  progWillEndInNMinutes,
  progWillRunInTheFuture,
  progIsShowingNow,
}
