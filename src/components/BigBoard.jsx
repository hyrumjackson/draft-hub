import React from 'react';
import { bio } from '../data/players';
import { Card, CardContent, Typography, Avatar } from '@mui/material';
import styles from './styles/BigBoard.module.css';
import mavsLogo from '../assets/mavs-logo.png';

export default function BigBoard() {
  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <img src={mavsLogo} alt="Mavericks Logo" className={styles.logo} />
        <div className={styles.titleBox}>
          <h1>2025 NBA DRAFT</h1>
          <h2 className={styles.subtitle}>Big Board</h2>
        </div>
      </div>

      {/* Main layout */}
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <p>[Filter Panel Placeholder]</p>
        </div>

        <div className={styles.cardContainer}>
          {bio.map((player, index) => (
            <Card key={player.playerId} className={styles.card}>
              <CardContent className={styles.cardContent}>
                <Avatar
                  src={player.photoUrl}
                  alt={player.name}
                  className={styles.avatar}
                />
                <div className={styles.info}>
                  <Typography variant="h6">
                    {index + 1}. {player.name}
                  </Typography>
                  <Typography variant="body2">
                    {player.currentTeam} ({player.league})
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avg Rank: TBD
                  </Typography>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}