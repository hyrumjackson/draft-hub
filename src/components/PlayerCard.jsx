import React from 'react';
import { Card, CardContent, Tooltip, Typography } from '@mui/material';
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
              <Typography variant="h6" style={{ fontFamily: 'Russo One' }}>
                {player.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{ fontFamily: 'Figtree' }}>
                {player.currentTeam}, {player.leagueType}
              </Typography>

              <div className={styles.statsRow}>
                {['PTS', 'TRB', 'AST', 'FG%'].map((statKey) => (
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
            <div
              className={styles.avgRank}
              style={{
                color: sortByScout && sortByScout !== 'Average' ? '#999' : '#00285E',
                fontWeight: sortByScout && sortByScout !== 'Average' ? 400 : 600,
              }}
            >
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
                  .map(([scout, rank]) => {
                    const scoutRanks = Object.values(player.rankings || {});
                    const mean =
                      scoutRanks.reduce((sum, r) => sum + r, 0) / scoutRanks.length;

                    const stdDev =
                      Math.sqrt(
                        scoutRanks.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) /
                          scoutRanks.length
                      );

                    const shortName = scout.split(' ')[0];

                    let dotClass = styles.neutralDot;
                    const z = (rank - mean) / stdDev;

                    if (scoutRanks.length > 2) {
                      if (z > 1.5) dotClass = styles.redDot;
                      else if (z > 0.75) dotClass = styles.paleRedDot;
                      else if (z < -1.5) dotClass = styles.greenDot;
                      else if (z < -0.75) dotClass = styles.paleGreenDot;
                    } else {
                      dotClass = styles.neutralDot;
                    }

                    return (
                      <div key={scout} className={styles.scoutDot}>
                        <Tooltip
                          title={
                            scoutRanks.length <= 2
                              ? "Too few rankings for comparison"
                              : z > 1.5
                              ? "Much lower than others"
                              : z > 0.75
                              ? "Somewhat lower than others"
                              : z < -1.5
                              ? "Much higher than others"
                              : z < -0.75
                              ? "Somewhat higher than others"
                              : "Similar to others"
                          }
                          arrow
                          placement="top"
                          componentsProps={{
                            tooltip: {
                              sx: {
                                fontSize: '0.9rem',
                                padding: '0.6rem 0.9rem',
                                color: '#fff',
                                backgroundColor: '#00285E',
                                borderRadius: 0,
                                fontFamily: 'Figtree, sans-serif',
                              },
                            },
                            arrow: {
                              sx: {
                                color: '#00285E',
                              },
                            },
                          }}
                        >
                          <span className={dotClass} />
                        </Tooltip>
                        <span
                          className={styles.scoutText}
                          style={{
                            fontWeight: sortByScout === scout ? 600 : 400,
                            color:
                              sortByScout === scout
                                ? '#00285E'
                                : sortByScout !== 'Average'
                                ? '#999'
                                : '#555'
                          }}
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