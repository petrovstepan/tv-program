import React from 'react'
import { host } from '../../api/epg.domru.api'

const withHost = Component => props => <Component {...props} host={host} />
 
export default withHost