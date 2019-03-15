const {
  numberOfChannelsToLoad,
  programsForTheNextNHours,
  startHoursOffset,
  numberOfProgramsToShow,
} = require('../../config/channel-list-config')

const {
  progIsShowingNow,
  progWillRunInTheFuture,
  selectActiveProgram,
} = require('./programTimeHelper')

const getTimePeriod = n => n * 60 * 60 * 1000

const sliceChannels = (channels, channelsOffset) => {
  return channels.slice(
    channelsOffset,
    +channelsOffset + numberOfChannelsToLoad
  )
}

const progFilter = p =>
  progIsShowingNow(p.start, p.duration) || progWillRunInTheFuture(p.start)

const filterProgramsToCurrentTime = (programs, sliceForTvProgram = false) => {
  Object.keys(programs).forEach(xvid => {
    programs[xvid] = selectActiveProgram(
      (sliceForTvProgram &&
        sliceProgramsForTvProgram(programs[xvid].filter(progFilter))) ||
        programs[xvid].filter(progFilter)
    )
  })
  return { ...programs }
}

const sliceProgramsForTvProgram = programs =>
  programs.slice(0, numberOfProgramsToShow)
const parseDateStringForSafari = programs =>
  programs.map(p => ({ ...p, start: p.start.split('-').join('/') })) // костыль для сафари, дату через дефис не понимает

const getTimeForPrograms = () => {
  const from = new Date(Date.now() + getTimePeriod(startHoursOffset))
  const to = new Date(+from + getTimePeriod(programsForTheNextNHours))
  return {
    date_from: from,
    date_to: to,
  }
}

const combineChannelsAndPrograms = (channelArray, programs) => {
  const channels = {}
  channelArray.forEach(ch => {
    channels[ch.chid] = {
      ...ch,
      programs:
        (programs[ch.xvid] && selectActiveProgram(programs[ch.xvid])) || [],
    }
  })
  return channels
}

module.exports = {
  combineChannelsAndPrograms,
  sliceChannels,
  getTimeForPrograms,
  filterProgramsToCurrentTime,
  parseDateStringForSafari,
}
