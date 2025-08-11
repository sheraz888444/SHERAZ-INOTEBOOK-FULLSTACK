import React, { useContext, useEffect } from 'react';
import NotesContext from '../context/notes/NotesContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';

const Notes = () => {
  const context = useContext(NotesContext);
  const { notes, fetchNote } = context;

   useEffect(() => {
     fetchNote(); 
   }, []); 

  return (
    <>
      <Addnote />
      <div className="row my-3">
        <h2>Your Notes</h2>
        {Array.isArray(notes) && notes.length > 0 ? (
          notes.map((note, index) => (
            <Noteitem key={index} note={note} />
          ))
        ) : (
          <p>No notes found.</p>
        )}
      </div>
    </>
  );
};

export default Notes;
