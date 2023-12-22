import React, { useState, useEffect } from 'react';
import { IoIosAdd } from 'react-icons/io';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Note from './Note';
import Head from '../../Header/Head';
import styles from './MidComponent.module.css';
import { v4 as uuidv4 } from 'uuid';
import { SketchPicker } from 'react-color';

const MidComponent = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [selectedColor, setSelectedColor] = useState({
    noteId: null,
    color: '#ffffff',
  });
  const [note, setNote] = useState({
    id: '',
    title: '',
    content: '',
    color: '#ffffff',
    isColorPickerVisible: false,
  });
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
    applySearchFilter(storedNotes);
  }, []);

  useEffect(() => {
    applySearchFilter(notes);
  }, [notes, searchFilter]);

  const applySearchFilter = (notesToFilter) => {
    const filtered = notesToFilter.filter(
      (n) =>
        n.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
        n.content.toLowerCase().includes(searchFilter.toLowerCase())
    );
    setFilteredNotes(filtered);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleExpanded = () => {
    setExpanded(true);
  };

  const handleColor = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((n) =>
        n.id === id
          ? { ...n, isColorPickerVisible: !n.isColorPickerVisible }
          : n
      )
    );

    setSelectedColor({
      noteId: id,
      color: notes.find((n) => n.id === id)?.color || '#ffffff',
    });
  };

  const submitButton = (event) => {
    event.preventDefault();

    if (note.title.trim() === '' && note.content.trim() === '') {
      toast.error('Please enter a title or content before adding a note.');
      return;
    }

    const existingNote = notes.find((n) => n.id === note.id);

    if (existingNote) {
      const updatedNotes = notes.map((n) =>
        n.id === note.id ? { ...n, ...note } : n
      );
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
      color: selectedColor.color,
      isColorPickerVisible: false,
    });

    setExpanded(false);
    setSelectedColor({ noteId: null, color: '#ffffff' });
  };

  const handleEdit = (id) => {
    const selectedNote = notes.find((n) => n.id === id);
    setNote({
      ...selectedNote,
      isColorPickerVisible: false,
    });
    setExpanded(true);
  };

  const handleDelete = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    toast.success('Note deleted successfully!');
  };

  const handleColorChange = (id, color) => {
    setSelectedColor({
      noteId: id,
      color: color,
    });
    setNote((prevNote) => ({
      ...prevNote,
      color: color,
    }));
  };

  const handleSearchInputChange = (filter) => {
    setSearchFilter(filter);
  };

  return (
    <div>
      <Head searchFilter={searchFilter} onSearchInputChange={handleSearchInputChange} />
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
        {selectedColor.noteId !== null && note.isColorPickerVisible && (
          <SketchPicker color={selectedColor.color} onChange={(color) => handleColorChange(selectedColor.noteId, color.hex)} />
        )}
        <ToastContainer />
        <div className={styles.notesContainer}>
          {filteredNotes.map((note, index) => (
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
      </div>
    </div>
  );
};

export default MidComponent;
