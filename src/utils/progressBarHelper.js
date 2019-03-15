import colors from '../../config/program-completion-colors'

const getNearestColor = pcnt => (acc, v) =>
  Math.abs(acc - pcnt) < Math.abs(v - pcnt) ? acc : v

export const getColor = pcnt => {
  const pcnts = Object.keys(colors)
  return colors[pcnts.reduce(getNearestColor(pcnt))]
}
