import { useEffect, useState } from 'react';
import './App.css';
import NewNote from './components/NewNote';
import Notes from './components/Notes';

function App() {
  // const url = 'http://localhost:7070'
  const url = 'https://crud-backend-2.onrender.com';
  
  const [noteState, setNoteState] = useState({
    id: '',
    content: '',
  })

  const [notes, setNotes] = useState([]);

  const [needDataLoading, setNeedDataLoading] = useState(false); // Необходимость запуска эффекта

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        let response = await fetch(url + '/notes', {
          signal: abortController.signal
        });
        if (!response.ok) { 
          alert("Ошибка HTTP: " + response.status);
        } else {
          let result = await response.json();
          console.log(result);

          setNotes([...result]);
          setNeedDataLoading(false);    
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('fetch aborted');
        } else {
          console.log(error);
        }
      }
    }

    console.log('Отработал эффект с fetchData()');
    setTimeout(() => {
      fetchData();
    }, 1000);

    return () => {
      console.log('cleanup');
      return abortController.abort();
    }
  }, [needDataLoading])


  const sendNote = async (noteState) => {
    try {
      let response = await fetch(url + '/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteState)
      });
      if (!response.ok) { 
        alert("Ошибка HTTP: " + response.status);
      } else {
        // let result = await response.json();
        console.log('note\'s added');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const deleteNote = async (id) => {
    try {
      let response = await fetch(url + '/notes/' + id, {
        method: 'DELETE',
      });
      if (!response.ok) { 
        alert("Ошибка HTTP: " + response.status);
      } else {
        // await response.json();
        console.log('note\'s deleted');
      }
    } catch (error) {
      console.log(error);
    }
  }


  const handleChange = (event) => {
    const {value} = event.target;
    console.log(event.target);
    setNoteState((prevNoteStateValue) => ({...prevNoteStateValue, content: value, id: 0}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    sendNote(noteState); // отправка новых данных на сервер
    setNeedDataLoading(true); // меняю состояние needDataLoading, заставляю отработать useEffect

    // Очистка textarea
    setNoteState((prevNoteStateValue) => ({...prevNoteStateValue, content: '', id: ''}));
  }

  const handleClick = (id) => {
    deleteNote(id);
    setNeedDataLoading(true); // меняю состояние needDataLoading, заставляю отработать useEffect
  }

  const refreshNotes = () => {
    setNeedDataLoading(true); // меняю состояние needDataLoading, заставляю отработать useEffect
  }

  return (
    <div className='container'>
      {!needDataLoading && <button className='refresh-notes' type='button' onClick={refreshNotes}>Обновить</button>}
      {needDataLoading && <button className='refresh-notes' type='button' disabled>Обновление данных...</button>}
      <Notes notes={notes} onClick={handleClick}/>
      <NewNote state={noteState} onChange={handleChange} onSubmit={handleSubmit}/>
    </div>
  );
}

export default App;
