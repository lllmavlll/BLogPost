import React from 'react'
import './notecard.css'

const NoteCard = (props) => {
  return (

    <>
      <div class="note-card">
                    <p class="card-date">{props.title}</p>
                    <p class="card-title">{props.date}</p>
                    <p class="card-desc">{props.description}</p>
        </div>
    </>
  )
}

export default NoteCard
