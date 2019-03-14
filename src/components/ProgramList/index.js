import ProgramListItem from "../ProgramListItem"
import React from 'react'
import ProgramListItemActive from "../../containers/ProgramListItemActive";

const ProgramList = (props) => {

    const { programs, chid } = props

    return programs.map((program, i) => {

        const prevProgram = i > 0 && programs[i-1] || null
        if (prevProgram && `${prevProgram.start}${prevProgram.title}` === `${program.start}${program.title}`) {
            return null // уберем дубли программ
        }

        let key = program.start
        if (i > 0 && key === programs[i-1].start) {
            key = `${key}${i}` // если есть программы с одним временем, но разным названием
        }

        const Component = program.active ? ProgramListItemActive : ProgramListItem
        return <Component key={key} { ...program } chid={chid}/>
    })
}

export default ProgramList