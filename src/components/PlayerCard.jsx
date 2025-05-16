import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import defaultProfile from '../assets/default-profile.png';
import styles from './styles/PlayerCard.module.css';

export default function PlayerCard({ player, index, stats }) {
  return (
    <Link to={`/player/${player.playerId}`} className={styles.cardLink}>
      <Card className={styles.card}>
        <div className={styles.rankBadge}>{index}</div>
        <CardContent className={styles.cardContent}>
          {/* Left Section */}
          <div className={styles.leftSide}>
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
              <Typography variant="h6">{player.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {player.currentTeam}, {player.leagueType}
              </Typography>
              <div className={styles.statsRow}>
                <div className={styles.statBox}><strong>PTS</strong><br />{stats.PTS?.toFixed(1) ?? '–'}</div>
                <div className={styles.statBox}><strong>REB</strong><br />{stats.TRB?.toFixed(1) ?? '–'}</div>
                <div className={styles.statBox}><strong>AST</strong><br />{stats.AST?.toFixed(1) ?? '–'}</div>
                <div className={styles.statBox}><strong>BLK</strong><br />{stats.BLK?.toFixed(1) ?? '–'}</div>
                <div className={styles.statBox}><strong>STL</strong><br />{stats.STL?.toFixed(1) ?? '–'}</div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className={styles.rightSide}>
            <div className={styles.avgRank}>Avg. Rank: {player.avgRank?.toFixed(1) ?? '–'}</div>
            <div className={styles.scoutStrip}>
              {player.rankings &&
                Object.entries(player.rankings).map(([scout, rank]) => {
                  let dotClass = styles.grayDot;
                  if (rank !== null) {
                    if (rank === player.highRank) dotClass = styles.greenDot;
                    else if (rank === player.lowRank) dotClass = styles.redDot;
                    else dotClass = styles.neutralDot;
                  }

                  const scoutAbbrev = scout.replace(' Rank', '').split(' ')[0]; // crude but effective

                  return (
                    <div key={scout} className={styles.scoutDot}>
                      <span className={dotClass} />
                      <span className={styles.scoutText}>
                        {scoutAbbrev}: {rank ?? 'NR'}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}