import React from 'react'
import moment from 'moment'
import './styles/events-horizontal.css'

export default props => {
  const { event } = props
  const m = moment(event.start)
  let time = ''
  if (m.isBefore()) time = 'En ce moment'
  else time = 'À ' + m.format('HH[h]mm')
  return (
    <div key={event.id} className='event-main'>
      <div className='event-image'>
        <img src={process.env.REACT_APP_API + event.image} alt='' />
      </div>
      <div className='event-informations'>
        <h1>{event.name}</h1>
        <span className='time'>{time}</span>
        <span className='place'>{event.place}</span>
      </div>
    </div>
  )
}
