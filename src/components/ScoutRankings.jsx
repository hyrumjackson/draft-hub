import React from 'react';
import styles from './styles/PlayerStatCards.module.css';

export default function ScoutRanks({ data }) {
  const playerRanks = data?.[0];
  if (!playerRanks) return <p>No scout rankings available.</p>;

  const scoutEntries = Object.entries(playerRanks)
    .filter(([key]) => key !== 'playerId' && playerRanks[key] != null)
    .map(([scout, rank]) => ({ scout: scout.replace(' Rank', ''), rank }));

  scoutEntries.sort((a, b) => a.scout.localeCompare(b.scout)); // alphabetical

  const ranks = scoutEntries.map((s) => s.rank);
  const minRank = Math.min(...ranks);
  const maxRank = Math.max(...ranks);

  // add padding to prevent edge overflow
  const rangeStart = minRank - 1;
  const rangeEnd = maxRank + 1;
  const rankRange = rangeEnd - rangeStart;

  return (
    <div className={styles.scoutGraphContainer} style={{ height: `${scoutEntries.length * 24 + 20}px` }}>
      {scoutEntries.map(({ scout, rank }, i) => {
        const leftPercent = ((rank - rangeStart) / rankRange) * 100;

        const dotClass =
          rank === minRank
            ? styles.greenDot
            : rank === maxRank
            ? styles.redDot
            : styles.neutralDot;

        return (
          <div
            key={scout}
            className={styles.scoutPlot}
            style={{
              left: `${leftPercent}%`,
              top: `${i * 24 + 10}px`, // slight padding from top
            }}
          >
            <div className={dotClass} />
            <span className={styles.scoutLabel}>
              {scout} ({rank})
            </span>
          </div>
        );
      })}
    </div>
  );
}