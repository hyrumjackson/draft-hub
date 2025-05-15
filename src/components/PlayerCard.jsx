import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import defaultProfile from '../assets/default-profile.png';
import styles from './styles/PlayerCard.module.css';

export default function PlayerCard({ player, index }) {
  return (
    <Link to={`/player/${player.playerId}`} className={styles.cardLink}>
      <Card className={styles.card}>
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
            <Typography variant="h6">{index + 1}. {player.name}</Typography>
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
  );
}