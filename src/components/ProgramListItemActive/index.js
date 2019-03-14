import React from "react"
import df from "dateformat"
import './ProgramListItemActive.scss'
import ProgressBar from "../ProgressBar";

class ProgramListItemActive extends React.Component {

    onAnimationEnd = () => {
        this.props.chooseActiveProgram(this.props.chid)
    }

    render () {
        const { start, title, duration } = this.props
        const time = df(new Date(start), 'HH:MM')
        const d = Number(duration) * 1000
        const delay = (+new Date() - new Date(start))

        return (
            <div>
                <div className="program active">
                    <ProgressBar {...{duration: d, delay, onAnimationEnd: this.onAnimationEnd }} />
                    <span className="program__text">
                        <strong className="program__text-time">{time}</strong> <span>{title}</span>
                    </span>
                </div>
            </div>
        )
    }
}

export default ProgramListItemActive