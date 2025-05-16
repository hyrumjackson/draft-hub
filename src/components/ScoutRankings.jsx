import React from 'react';
import styles from './styles/PlayerStatCards.module.css';

export default function ScoutRanks({ data }) {
  const playerRanks = data?.[0];

  if (!playerRanks) {
    return <p>No scout rankings available.</p>;
  }

  const scoutEntries = Object.entries(playerRanks).filter(
    ([key, _]) => key !== 'playerId'
  );

  const values = scoutEntries.map(([_, rank]) => rank).filter((r) => r !== null);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const isAllEqual = values.every((val) => val === values[0]);

  return (
    <div className={styles.twoColumnGrid}>
      {scoutEntries.map(([scout, rank]) => {
        let indicator = null;
        if (!isAllEqual) {
          if (rank === min) indicator = <span className={styles.greenDot} />;
          else if (rank === max) indicator = <span className={styles.redDot} />;
        }

        return (
          <div key={scout} className={styles.inlineFieldRow}>
            <strong>{scout.replace(' Rank', '')}:</strong> #{rank} {indicator}
          </div>
        );
      })}
    </div>
  );
}