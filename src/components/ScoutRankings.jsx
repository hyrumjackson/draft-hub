import React from 'react';
import styles from './styles/ScoutRankings.module.css';

export default function ScoutRankings({ data, customReports = [] }) {
  const playerRanks = data?.[0] || {};

  const customRanks = customReports
    .filter((r) => r.rank !== null && r.rank !== undefined)
    .reduce((acc, r) => {
      acc[`${r.scout}`] = r.rank;
      return acc;
    }, {});

  const combinedRanks = {
    ...playerRanks,
    ...customRanks
  };

  const scoutEntries = Object.entries(combinedRanks)
    .filter(([key]) => key !== 'playerId')
    .sort(([aKey, aVal], [bKey, bVal]) => {
      if (aVal === null) return 1;
      if (bVal === null) return -1;
      return aVal - bVal;
    });

  const values = scoutEntries.map(([_, rank]) => rank).filter((r) => r !== null);
  const average =
  values.length > 0
    ? (values.reduce((sum, val) => sum + val, 0) / values.length).toFixed(1)
    : null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const isAllEqual = values.length > 0 && values.every((val) => val === values[0]);

  return (
    <div className={styles.statCard}>
      <h3 className={styles.cardTitle}>Scout Rankings</h3>
        {average && (
          <div style={{ textAlign: 'center', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
            <strong>Average Rank:</strong> #{average}
          </div>
        )}
      <div className={styles.cardContent}>
        {scoutEntries.map(([scout, rank]) => {
          let indicator = <span className={styles.scoutDotPlaceholder} />;
          let display = '';

          if (rank === null || rank === undefined) {
            display = 'TBD';
            indicator = <span className={styles.grayDot} />;
          } else {
            display = `#${rank}`;
            if (!isAllEqual) {
              if (rank === min) indicator = <span className={styles.greenDot} />;
              else if (rank === max) indicator = <span className={styles.redDot} />;
            }
          }

          return (
            <div key={scout} className={styles.scoutRow}>
              <strong>{scout.replace(' Rank', '')}</strong>
              <span>{display}</span>
              {indicator}
            </div>
          );
        })}
      </div>
    </div>
  );
}