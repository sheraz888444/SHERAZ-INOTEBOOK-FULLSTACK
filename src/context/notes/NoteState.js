import { useState } from "react";
import NotesContext from "./NotesContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  //const authToken =
   // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg5NWUwZTFlNTc5ODI0YmY0ZTBhYzA1In0sImlhdCI6MTc1NDY2MzQ0NX0.hibbLGpVDu-1J-y1vvtHG_f5fnlCEEv6Yhp3EogkT3w";
const authToken = localStorage.getItem("token"); 
  const [notes, setNotes] = useState([]);

  // 📥 Fetch all notes
  const fetchNote = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });

      const json = await response.json();
      console.log("Fetched Notes:", json);

      if (Array.isArray(json)) {
        setNotes(json);
      } else {
        console.error("API did not return an array:", json);
        setNotes([]);
      }
    } catch (error) {
      console.error("Fetch notes error:", error);
      setNotes([]);
    }
  };

  // ➕ Add a Note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const newNote = await response.json();
      console.log("Added Note:", newNote);

      setNotes((prevNotes) =>
        Array.isArray(prevNotes) ? prevNotes.concat(newNote) : [newNote]
      );
    } catch (error) {
      console.error("Add note error:", error);
    }
  };

  // ❌ Delete a Note
  const deleteNote = async (_id) => {
    console.log("Deleting note with id:", _id);

    try {
      const response = await fetch(`${host}/api/notes/deleteNotes/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });

      const result = await response.json();
      console.log("Delete response:", result);

      if (response.ok) {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== _id));
      } else {
        console.error("Failed to delete note:", result.error || result);
      }
    } catch (error) {
      console.error("Delete note error:", error);
    }
  };

  // ✏️ Edit a Note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updateNotes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const updatedNote = await response.json();
      console.log("Updated Note:", updatedNote);

      if (response.ok) {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === id ? { ...note, title, description, tag } : note
          )
        );
      } else {
        console.error("Failed to update note:", updatedNote.error || updatedNote);
      }
    } catch (error) {
      console.error("Edit note error:", error);
    }
  };
  

  return (
    <NotesContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        editNote,
        fetchNote,
      }}
    >
      {props.children}
    </NotesContext.Provider>
  );
};

export default NoteState;
