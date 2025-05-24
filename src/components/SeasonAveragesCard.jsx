import React, { useState } from 'react';
import styles from './styles/SeasonCard.module.css';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import SeasonAveragesModal from './SeasonAveragesModal';

export default function SeasonAveragesCard({ seasons, fullSeasons, mode, setMode }) {
  if (!seasons || seasons.length === 0) {
    return <p>No season averages available.</p>;
  }

  const [modalOpen, setModalOpen] = useState(false);

  const numericStatKeys = ['MP', 'PTS', 'TRB', 'AST', 'STL', 'BLK', 'TOV'];

  const getDisplayValue = (season, stat) => {
    if (mode === 'averages') return season[stat];
    const value = season[stat] * season.GP;
    return isNaN(value) ? '—' : Math.round(value);
  };

  return (
    <div className={styles.statCard}>
      <div className={styles.cardTopRight}>
        <ToggleButtonGroup
          size="small"
          exclusive
          value={mode}
          onChange={(_, newMode) => newMode && setMode(newMode)}
          sx={{
            position: 'relative',
            top: {
              xs: '-0.8rem',
              sm: '-0.4rem'
            },
            height: '2rem'
          }}
        >
          <ToggleButton
            value="averages"
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.85rem',
              fontFamily: 'Figtree, sans-serif',
              borderRadius: 0,
              borderColor: '#BBC4CA',
              '&.Mui-selected': {
                backgroundColor: '#E6EEF9',
                color: '#0053BC',
                borderColor: '#0053BC',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'rgba(0, 83, 188, 0.15)' // darker than selected bg
                }
              }
            }}
          >
            AVG
          </ToggleButton>
          <ToggleButton
            value="totals"
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.85rem',
              fontFamily: 'Figtree, sans-serif',
              borderRadius: 0,
              borderColor: '#BBC4CA',
              '&.Mui-selected': {
                backgroundColor: '#E6EEF9',
                color: '#0053BC',
                borderColor: '#0053BC',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'rgba(0, 83, 188, 0.15)' // darker than selected bg
                }
              }
            }}
          >
            TOT
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <div className={styles.cardTitleRow}>
        <h3 className={styles.cardTitle}>
          {mode === 'totals' ? 'Season Totals' : 'Season Averages'}
        </h3>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.gameTable}>
          <thead>
            <tr>
              <th>Season</th>
              <th>Team</th>
              <th>W–L</th>
              {numericStatKeys.map((stat) => (
                <th key={stat}>{stat}</th>
              ))}
              <th>FG%</th>
              <th>3P%</th>
              <th>FT%</th>
              <th>eFG%</th>
            </tr>
          </thead>
          <tbody>
            {seasons.map((s, i) => (
              <tr key={i}>
                <td>{s.Season}</td>
                <td>
                  <div>{s.Team}</div>
                  <div className={styles.leagueSubtext}>{s.League}</div>
                </td>
                <td>{`${s.w}-${s.l}`}</td>
                {numericStatKeys.map((stat) => (
                  <td key={stat}>{getDisplayValue(s, stat)}</td>
                ))}
                <td>{s['FG%']?.toFixed(1) ?? '—'}</td>
                <td>{s['3P%']?.toFixed(1) ?? '—'}</td>
                <td>{s.FTP?.toFixed(1) ?? '—'}</td>
                <td>{s['eFG%']?.toFixed(1) ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.seeMoreRow}>
          <span className={styles.seeMoreLink} onClick={() => setModalOpen(true)}>
            See All Stats
          </span>
        </div>

        <SeasonAveragesModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          seasons={fullSeasons}
        />
      </div>
    </div>
  );
}