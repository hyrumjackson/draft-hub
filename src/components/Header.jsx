import React from 'react';
import styles from './styles/Header.module.css';
import mavsLogo from '../assets/mavs-logo.png';
import { Link } from 'react-router-dom';

export default function Header({ title, subtitle }) {
  return (
    <div className={styles.header}>
      <Link to="/">
        <img src={mavsLogo} alt="Mavericks Logo" className={styles.logo} />
      </Link>
      <div className={styles.titleBox}>
        <h1>{title}</h1>
        <h2 className={styles.subtitle}>{subtitle}</h2>
      </div>
    </div>
  );
}