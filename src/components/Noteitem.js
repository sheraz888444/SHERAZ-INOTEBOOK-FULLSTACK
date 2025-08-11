import React, { useContext, useState } from 'react';
import NotesContext from '../context/notes/NotesContext';

function Noteitem(props) {
  const { note } = props;
  const context = useContext(NotesContext);
  const { deleteNote, editNote } = context;

  // Local state for modal
  const [showModal, setShowModal] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedDescription, setEditedDescription] = useState(note.description);

  const handleSave = () => {
    editNote(note._id, editedTitle, editedDescription, note.tag || "");
    setShowModal(false);
  };
  

  return (
    <>
      <div className="col-md-3">
        <div className="card my-3">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>

            {/* Delete Icon */}
            <i 
              className="fa-solid fa-trash mx-2 text-danger" 
              style={{ cursor: "pointer" }} 
              onClick={() => deleteNote(note._id)}
            ></i>

            {/* Edit Icon */}
            <i 
              className="fa-solid fa-edit text-primary" 
              style={{ cursor: "pointer" }} 
              onClick={() => setShowModal(true)}
            ></i>
          </div>
        </div>
      </div>

      {/* Bootstrap Modal */}
      {showModal && (
        <div 
          className="modal fade show" 
          style={{ display: "block" }} 
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Note</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input 
                  type="text" 
                  className="form-control mb-2" 
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <textarea
                  className="form-control"
                  rows="5"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Noteitem;
