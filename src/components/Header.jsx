import React from 'react';
import styles from './styles/Header.module.css';
import mavsLogo from '../assets/mavs-logo.png';

export default function Header({ title, subtitle }) {
  return (
    <div className={styles.header}>
      <a href="https://www.mavs.com" target="_blank" rel="noopener noreferrer">
        <img src={mavsLogo} alt="Mavericks Logo" className={styles.logo} />
      </a>
      <div className={styles.titleBox}>
        <h1>{title}</h1>
        <h2 className={styles.subtitle}>{subtitle}</h2>
      </div>
    </div>
  );
}