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
          className={styles.toggleGroup}
          size="small"
          exclusive
          value={mode}
          onChange={(_, newMode) => newMode && setMode(newMode)}
        >
          <ToggleButton value="averages">AVG</ToggleButton>
          <ToggleButton value="totals">TOT</ToggleButton>
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