import React, { useContext } from 'react';
import NotesContext from '../context/notes/NotesContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';

const Notes = () => {
  const context = useContext(NotesContext);
  const { notes ,addNote} = context;

  return (
    <>
    <Addnote/>
    <div className="row my-3">
      <h2>Your Notes</h2>
      {notes.map((note, index) => (
        <Noteitem key={index} note={note} />
      ))}
    </div>
    </>
  );
};

export default Notes;
