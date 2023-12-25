import React from 'react'

const NewNote = ({state, onSubmit, onChange}) => {
  return (
    <form id='add-new-note-form' className='form' onSubmit={onSubmit}>
      <label>New note
        <textarea 
        className='textarea' 
        name='content' 
        rows='10' 
        cols='35'
        placeholder='Введите текст новой заметки'
        value={state.content}
        onChange={onChange}
        required
        />
      </label>
      <button className='btn' type='submit'>{'\u27A4'}</button>
    </form>
  )
}

export default NewNote