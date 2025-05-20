import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import defaultProfile from '../assets/default-profile.png';
import styles from './styles/PlayerCard.module.css';
import { playerImageOverrides } from '../utils/playerPhotos';

export default function PlayerCard({ player, index, stats, statMode, ranked = true, sortByStat, sortByScout }) {
  function getStat(statKey) {
    if (!stats || stats[statKey] == null) return '–';

    const value = stats[statKey];
    const gp = stats.GP || 1;
    const mp = stats.MP || 1;

  switch (statMode) {
    case 'Totals':
      return statKey === 'FG%' ? value.toFixed(1) : (value * gp).toFixed(0);
    case 'Per 36':
      return statKey === 'FG%' ? value.toFixed(1) : mp > 0 ? ((value / mp) * 36).toFixed(1) : '–';
    case 'Per Game':
    default:
      return value.toFixed(1);
  }
}

  return (
    <Link to={`/player/${player.playerId}`} className={styles.cardLink}>
      <Card className={styles.card}>
        {ranked && <div className={styles.rankBadge}>{index}</div>}

        <CardContent className={styles.cardContent}>
          {/* Left Section */}
          <div className={styles.leftSide}>
            <img
              src={
                playerImageOverrides[player.playerId]
                || player.photoUrl
                || defaultProfile
              }
              alt={player.name}
              className={`${styles.photo} ${!ranked ? styles.grayOut : ''}`}
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
                {['PTS', 'TRB', 'AST', 'BLK', 'FG%'].map((statKey) => (
                  <div
                    key={statKey}
                    className={`${styles.statBox} ${
                      sortByStat === statKey ? styles.highlightStat : ''
                    }`}
                  >
                    <strong>{statKey}</strong><br />
                    {getStat(statKey)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className={styles.rightSide}>
            <div className={styles.avgRank}>
              Avg. Rank: {player.avgRank?.toFixed(1) ?? '–'}
            </div>

            <div className={`${styles.scoutStrip} ${!ranked ? styles.dimmedScoutStrip : ''}`}>
              {player.rankings &&
                Object.entries(player.rankings)
                  .filter(([, rank]) => rank != null)
                  .sort(([aName, aRank], [bName, bRank]) => {
                    if (aRank !== bRank) return aRank - bRank;
                    return aName.localeCompare(bName);
                  })
                  .sort(([nameA], [nameB]) => {
                    // Move selected scout to the top (if it's in the list)
                    if (!sortByScout) return 0;
                    if (nameA === sortByScout) return -1;
                    if (nameB === sortByScout) return 1;
                    return 0;
                  })
                  .map(([scout, rank]) => {
                    const shortName = scout.split(' ')[0];
                    let dotClass = styles.grayDot;
                    if (rank === player.highRank) dotClass = styles.greenDot;
                    else if (rank === player.lowRank) dotClass = styles.redDot;
                    else dotClass = styles.neutralDot;

                    return (
                      <div key={scout} className={styles.scoutDot}>
                        <span className={dotClass} />
                        <span
                          className={`${styles.scoutText} ${
                            sortByScout === scout ? styles.boldScout : ''
                          }`}
                        >
                          {shortName}: {rank}
                        </span>
                      </div>
                    );
                  })
              }
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}