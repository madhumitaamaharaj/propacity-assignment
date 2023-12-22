import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { IoIosColorPalette } from 'react-icons/io';
import { SketchPicker } from 'react-color';
import styles from './Note.module.css';

const Note = ({
  title,
  content,
  onDelete,
  onEdit,
  onColor,
  id,
  selectedColor,
  handleColorChange,
}) => {
  const [isColorPickerVisible, setColorPickerVisibility] = useState(false);
  const [noteColor, setNoteColor] = useState(selectedColor?.noteId === id ? selectedColor.color : '#ffffff');

  const handleColorButtonClick = () => {
    setColorPickerVisibility(!isColorPickerVisible);
    onColor(id);
  };

  return (
    <div
      className={styles.note}
      style={{
        backgroundColor: noteColor,
      }}
    >
      <h1>{title}</h1>
      <p>{content}</p>
      <div className={styles.actions}>
      <button onClick={() => onDelete(id)}>
        <MdDelete size={24} />
      </button>
        <button onClick={() => onEdit(id)}>
          <MdEdit size={24} />
        </button>
        
      <button onClick={handleColorButtonClick}>
      <IoIosColorPalette size={24} />
    </button>
        {isColorPickerVisible && (
          <div className={styles.colorPickerContainer}>
            <SketchPicker
              color={noteColor}
              onChange={(color) => {
                setNoteColor(color.hex);
              handleColorChange(id, color.hex);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Note;