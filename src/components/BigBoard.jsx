import React from 'react';
import { bio } from '../data/players';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './styles/BigBoard.module.css';
import mavsLogo from '../assets/mavs-logo.png';
import defaultProfile from '../assets/default-profile.png';

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

      {/* Main Layout */}
      <div className={styles.content}>
        {/* Filter Panel */}
        <div className={styles.sidebar}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Filters
              </Typography>
              <Typography variant="body2" color="text.secondary">
                [Filter Panel Placeholder]
              </Typography>
            </CardContent>
          </Card>
        </div>

        {/* Player Cards */}
        <div className={styles.cardContainer}>
          {bio.map((player, index) => (
            <Link to={`/player/${player.playerId}`} className={styles.cardLink}>
              <Card key={player.playerId} className={styles.card}>
                <CardContent className={styles.cardContent}>
                  <img
                    src={player.photoUrl || defaultProfile}
                    alt={player.name}
                    className={styles.photo}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultProfile;
                    }}
                  />
                  <div className={styles.info}>
                    <Typography variant="h6">
                      {player.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {player.currentTeam}, {player.league}
                    </Typography>
                    <div className={styles.statsRow}>
                      <div className={styles.statBox}>PTS</div>
                      <div className={styles.statBox}>REB</div>
                      <div className={styles.statBox}>AST</div>
                      <div className={styles.statBox}>BLK</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}