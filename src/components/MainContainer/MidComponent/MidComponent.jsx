import React, { useState, useEffect } from 'react';
import { IoIosAdd } from 'react-icons/io';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Note from './Note';
import styles from './MidComponent.module.css';
import { v4 as uuidv4 } from 'uuid';

const MidComponent = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [notes, setNotes] = useState([]);
  const [selectedColor, setSelectedColor] = useState({
    noteId: null,
    color: '#ffffff',
  });

  const [note, setNote] = useState({
    id: '',
    title: '',
    content: '',
    color: '#ffffff', 
  });

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((preValue) => ({
      ...preValue,
      [name]: value,
    }));
  };

  const handleExpanded = () => {
    setExpanded(true);
  };

  const submitButton = (event) => {
    event.preventDefault();

    if (note.title.trim() === '' && note.content.trim() === '') {
      toast.error('Please enter a title or content before adding a note.');
      return;
    }

    const existingNote = notes.find((n) => n.id === note.id);

    if (existingNote) {
      const updatedNotes = notes.map((n) => (n.id === note.id ? { ...n, ...note } : n));
      setNotes(updatedNotes);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      toast.success('Note edited successfully!');
    } else {
      const newNote = { ...note, id: uuidv4() };
      setNotes((prevNotes) => [...prevNotes, newNote]);
      localStorage.setItem('notes', JSON.stringify([...notes, newNote]));
      toast.success('Note added successfully!');
    }

    setNote({
      id: '',
      title: '',
      content: '',
      color: '#ffffff', 
    });

    setExpanded(false);
  };

  const handleEdit = (id) => {
    const selectedNote = notes.find((n) => n.id === id);
    setNote({ ...selectedNote });
    setExpanded(true);
  };

  const handleDelete = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    toast.success('Note deleted successfully!');
  };

  const handleColorChange = (color) => {
    setNote((prevNote) => ({
      ...prevNote,
      color: color.hex,
    }));
  };

  const handleColor = (id) => {
    setSelectedColor({
      noteId: id,
      color: notes.find((n) => n.id === id)?.color || '#ffffff',
    });
  };

  return (
    <div className={styles.midContainer}>
      <form>
        {isExpanded && (
          <input
            value={note.title}
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
          />
        )}
        <p>
          <textarea
            value={note.content}
            onClick={handleExpanded}
            name="content"
            placeholder="Take a note..."
            onChange={handleChange}
            rows={isExpanded ? 3 : 1}
          ></textarea>
        </p>
        <button onClick={submitButton}>
          <IoIosAdd size={30} />
        </button>
      </form>
      <ToastContainer />
      {notes.map((note) => (
        <Note
          key={note.id}
          title={note.title}
          content={note.content}
          onDelete={() => handleDelete(note.id)}
          onEdit={() => handleEdit(note.id)}
          onColor={() => handleColor(note.id)}
          selectedColor={selectedColor}
          id={note.id}
          color={note.color}
          handleColorChange={handleColorChange}
        />
      ))}
    </div>
  );
};

export default MidComponent;
