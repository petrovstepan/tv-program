import React from 'react'
import { getColor } from '../../utils/progressBarHelper'

const ProgressBarStatic = ({ delay, duration }) => {
  const complete = Math.round((delay / duration) * 100)
  const color = getColor(complete)
  return (
    <div
      style={{
        width: `${complete}%`,
        background: `${color}`,
        boxShadow: `0 0 10px ${color}`,
      }}
      className="program__progress-bar"
    >
      {' '}
    </div>
  )
}

export default ProgressBarStatic
