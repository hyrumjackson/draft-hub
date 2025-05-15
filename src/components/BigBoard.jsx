import React from 'react';
import { bio } from '../data/players';
import styles from './styles/BigBoard.module.css';
import mavsLogo from '../assets/mavs-logo.png';
import FilterPanel from '../components/FilterPanel';
import PlayerCard from '../components/PlayerCard';

export default function BigBoard() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <img src={mavsLogo} alt="Mavericks Logo" className={styles.logo} />
        <div className={styles.titleBox}>
          <h1>2025 NBA DRAFT HUB</h1>
          <h2 className={styles.subtitle}>Big Board</h2>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.sidebar}>
          <FilterPanel />
        </div>
        <div className={styles.cardContainer}>
          {bio.map((player, index) => (
            <PlayerCard key={player.playerId} player={player} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}