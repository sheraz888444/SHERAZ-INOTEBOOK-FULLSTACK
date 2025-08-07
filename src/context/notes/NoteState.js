import { useState } from "react";
import NotesContext from "./NotesContext";
const NoteState = (props) => {
const notesinitial = [
  {
    id: "1",
    user: "y46237yhi3yuyi32ry",
    title: "my title",
    description: "my description",
    tag: "my tag",
    date: "01-01-2025",
    __v: 0,
  },
  {
    id: "2",
    user: "y46237yhi3yuyi32ry",
    title: "my title",
    description: "my description",
    tag: "my tag",
    date: "01-01-2025",
    __v: 0,
  },
  {
    id: "3",
    user: "y46237yhi3yuyi32ry",
    title: "my title",
    description: "my description",
    tag: "my tag",
    date: "01-01-2025",
    __v: 0,
  },
  {
    id: "4",
    user: "y46237yhi3yuyi32ry",
    title: "my title",
    description: "my description",
    tag: "my tag",
    date: "01-01-2025",
    __v: 0,
  },
];


  const [notes, setNotes] = useState(notesinitial);

  //add a Note
const addNote=(title,description,tag)=>{
 const  note={
    
    id: "4",
    user: "y46237yhi3yuyi32ry",
    title: title,
    description: description,
    tag: tag,
    date: "01-01-2025",
    __v: 0,

  }
setNotes(notes.concat(note))
}

  //Delete a note 

const deleteNote=()=>{
  
}
  //Edit a note
const editNote=()=>{
  
}
  return (
    <NotesContext.Provider value={{ notes, addNote,deleteNote,editNote }}>
      {props.children}
    </NotesContext.Provider>
  );
};


export default NoteState;
