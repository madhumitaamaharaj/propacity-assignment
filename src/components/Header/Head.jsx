import React, { useState } from 'react';
import { MdApps, MdRefresh } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaSearch, FaListUl } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import styles from './Head.module.css';

const Head = () => {
    const iconStyle = {
        color: '#606060',
    };

    const [searchFilter, setSearchFilter] = useState('');

    const handleSearchInputChange = (e) => {
        setSearchFilter(e.target.value);
    };

    return (
        <div className={styles.headContainer}>
            <div className={styles.leftIcons}>
                <GiHamburgerMenu className={styles.icon} style={iconStyle} />
                
                <a href="#" className={styles.logo}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Google_Keep_icon_%282020%29.svg/1489px-Google_Keep_icon_%282020%29.svg.png" 
                        alt="Google Keep Logo"
                    />
                    <span>Keep</span>
                </a>
            </div>

            <div className={styles.centerIcons}>
                <div className={styles.searchContainer}>
                    <input
                        className={styles.searchInput}
                        type="text"
                        placeholder="Search"
                        value={searchFilter}
                        onChange={handleSearchInputChange}
                    />
                    <button className={styles.searchButton}>
                        <FaSearch style={iconStyle} />
                    </button>
                </div>
            </div>

            <div className={styles.rightIcons}>
                <MdRefresh className={styles.icon} style={iconStyle} />
                <FaListUl className={styles.icon} style={iconStyle} />
                <IoMdSettings className={styles.icon} style={iconStyle} />
                <MdApps className={styles.icon} style={iconStyle} />
                <div className={styles.iconSpacing} />
                <CgProfile className={styles.icon} style={iconStyle} />
            </div>
        </div>
    );
};

export default Head;
