import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bio } from '../data/players';
import styles from './styles/PlayerProfile.module.css';
import Header from './Header';
import defaultProfile from '../assets/default-profile.png';

export default function PlayerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const player = bio.find(p => p.playerId.toString() === id);

  if (!player) {
    return <div style={{ padding: '2rem' }}>Player not found.</div>;
  }

  return (
    <div className={styles.page}>
      <Header title="2025 NBA DRAFT HUB" subtitle="Player Profile" />

      <div className={styles.backButton} onClick={() => navigate(-1)}>
        ← Back
      </div>

      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <img
            src={player.photoUrl || defaultProfile}
            alt={player.name}
            className={styles.playerImage}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultProfile;
            }}
          />
          <button className={styles.scoutButton}>+ Create Scouting Report</button>
        </div>

        <div className={styles.rightColumn}>
          <h2>{player.name}</h2>
          <p><strong>Team:</strong> {player.currentTeam}</p>
          <p><strong>Age:</strong> {player.age || "N/A"}</p>
          <p><strong>Nationality:</strong> {player.nationality}</p>
          {/* Placeholder for flag and stats */}
          <div className={styles.statsPlaceholder}>
            [Stat Blocks Placeholder]
          </div>
        </div>
      </div>
    </div>
  );
}