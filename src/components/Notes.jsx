import React from 'react'

const Notes = ({notes, onClick}) => {
  if (!notes) return;
  return (
    <div className='notes'>
      {notes.map(note => {
        console.log('key = ' + note.id);
        return (
        <div key={note.id} className='note'>
          <div className='note-content'>{note.content}</div>
          <button className='delete-note' type='button' onClick={() => onClick(note.id)}>{'\u2716'}</button>
        </div>)
      })}
    </div>
  )
}

export default Notes