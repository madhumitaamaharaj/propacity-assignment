import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import styles from './MidComponent.module.css';

const MidComponent = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ id: uuidv4(), title: '', content: '', color: '#ffffff' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote.title.trim() !== '' || newNote.content.trim() !== '') {
      setNotes([newNote, ...notes]);
      setNewNote({ id: uuidv4(), title: '', content: '', color: '#ffffff' });
      toast.success('Note created successfully');
      setShowForm(false); 
    } else {
      toast.error('Please provide a title or content for the note');
    }
  };

  const editNote = (id, updatedNote) => {
    const updatedNotes = notes.map((note) => (note.id === id ? updatedNote : note));
    setNotes(updatedNotes);
    toast.success('Note edited successfully');
  };

  const deleteNote = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this note?');
    if (confirmDelete) {
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
      toast.success('Note deleted successfully');
    }
  };

  return (
    <div>
      <button className={styles.button} onClick={() => setShowForm(true)}>
        Create Note
      </button>

      {showForm && (
        <form className={styles.form}>
          <input
            className={styles.inputField}
            type="text"
            placeholder="Title"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          />
          <textarea
            className={styles.textareaField}
            placeholder="Content"
            value={newNote.content}
            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
          />
          <input
            className={styles.colorPicker}
            type="color"
            value={newNote.color}
            onChange={(e) => setNewNote({ ...newNote, color: e.target.value })}
          />
          <button className={styles.button} type="button" onClick={addNote}>
            Save Note
          </button>
        </form>
      )}

      {notes.map((note) => (
        <div key={note.id} className={styles.noteContainer} style={{ border: `1px solid ${note.color}` }}>
          <h3 className={styles.noteTitle}>{note.title}</h3>
          <p className={styles.noteContent}>{note.content}</p>
          <button className={`${styles.deleteButton} ${styles.editButton}`} onClick={() => deleteNote(note.id)}>
            Delete
          </button>
          <button
            className={styles.editButton}
            onClick={() => editNote(note.id, { ...note, title: 'Updated Title' })}
          >
            Edit
          </button>
        </div>
      ))}

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default MidComponent;
