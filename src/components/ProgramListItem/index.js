import React from 'react'
import df from 'dateformat'
import './ProgramListItem.scss'

const ProgramListItem = props => {
  const { start, title } = props
  const time = df(new Date(start), 'HH:MM')

  return (
    <div>
      <div className="program">
        <div className="program__text">
          <span className="program__text-time">
            <strong>{time}</strong> {title}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProgramListItem
