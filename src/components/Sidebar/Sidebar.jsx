import React, { useState } from 'react';
import SidebarStyles from './Sidebar.module.css';
import { RiStickyNoteFill } from "react-icons/ri";
import { BsBell,BsFillTrashFill} from 'react-icons/bs';
import { MdEdit, MdOutlineArchive } from "react-icons/md";


const Sidebar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(true);

 
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!isMenuOpen) return null;

  return (
    <div className={SidebarStyles.container}>
      <ul className={SidebarStyles.listItem}>
        <li className={SidebarStyles.listItem}>
          <RiStickyNoteFill className={SidebarStyles.icon} />
          <span className={SidebarStyles.listItemText}>Notes</span>
        </li>
        <li className={SidebarStyles.listItem}>
          <BsBell className={SidebarStyles.icon} />
          <span className={SidebarStyles.listItemText}>Reminder</span>
        </li>
        <li className={SidebarStyles.listItem}>
          <MdEdit className={SidebarStyles.icon} />
          <span className={SidebarStyles.listItemText}>Edit Labels</span>
        </li>
        <li className={SidebarStyles.listItem}>
          <MdOutlineArchive className={SidebarStyles.icon} />
          <span className={SidebarStyles.listItemText}>Archive</span>
          </li>
          <li className={SidebarStyles.listItem}>
          <BsFillTrashFill className={SidebarStyles.icon} />
          <span className={SidebarStyles.listItemText}>Trash</span>
        </li>
       
      </ul>
      
    </div>
  );
};

export default Sidebar;
