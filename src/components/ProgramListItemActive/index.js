import React from 'react'
import df from 'dateformat'
import './ProgramListItemActive.scss'
import ProgressBarStatic from '../ProgressBarStatic'
import dynamic from 'next/dynamic'
const ProgressBarAnimated = dynamic(() => import('../ProgressBar'), {
  ssr: false,
  loading: () => null,
})

class ProgramListItemActive extends React.Component {
  onAnimationEnd = () => {
    this.props.chooseActiveProgram(this.props.chid)
  }

  componentDidMount() {
    // isServer && console.log('component did mount')
    // setTimeout(() => this.props.chooseActiveProgram(this.props.chid), 1000)
    // console.log(this)
  }

  render() {
    const isServer = typeof window === 'undefined'
    const { start, title, duration } = this.props
    const time = df(new Date(start), 'HH:MM')
    const d = Number(duration) * 1000
    const delay = +new Date() - new Date(start)

    console.log('render active item')
    console.log({ isServer })

    return (
      <div>
        <div className="program active">
          {isServer ? (
            <ProgressBarStatic {...{ duration: d, delay }} />
          ) : (
            <ProgressBarAnimated
              {...{ duration: d, delay, onAnimationEnd: this.onAnimationEnd }}
            />
          )}
          <span className="program__text">
            <strong className="program__text-time">{time}</strong>{' '}
            <span>{title}</span>
          </span>
        </div>
      </div>
    )
  }
}

export default ProgramListItemActive
