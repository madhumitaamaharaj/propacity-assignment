import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoIosColorPalette } from "react-icons/io";
import { HexColorPicker } from "react-colorful";
import styles from './Note.module.css'; 

function Note({ title, content, onDelete, onEdit, onColor, id, selectedColor, handleColorChange }) {
  return (
    <div className={styles.note} style={{ backgroundColor: selectedColor?.noteId === id ? selectedColor.color : '#ffffff' }}>
      <h1>{title}</h1>
      <p>{content}</p>
      <div className={styles.actions}>
        <button onClick={() => onDelete(id)}>
          <MdDelete size={24} />
        </button>
        <button onClick={() => onEdit(id)}>
          <MdEdit size={24} />
        </button>
        <button onClick={() => onColor(id)}>
          <IoIosColorPalette size={24} />
        </button>
        {id === selectedColor?.noteId && (
          <HexColorPicker color={selectedColor.color} onChange={handleColorChange} />
        )}
      </div>
    </div>
  );
}

export default Note;
