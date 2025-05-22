import React from 'react';
import styles from './styles/ScoutRankings.module.css';
import { Tooltip } from '@mui/material';

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
          <div className={styles.averageRank}>
            <strong>Average Rank:</strong> #{average}
          </div>
        )}
      <div className={styles.cardContent}>
        {scoutEntries.map(([scout, rank]) => {
          const validRanks = values.filter((v) => v != null);
          const mean = validRanks.reduce((sum, r) => sum + r, 0) / validRanks.length;
          const stdDev = Math.sqrt(
            validRanks.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / validRanks.length
          );

          const allEqual = validRanks.length > 0 && validRanks.every((val) => val === validRanks[0]);

          let dotClass = styles.grayDot;
          let display = 'TBD';
          let tooltipText = 'Ranking not provided';

          if (rank !== null && rank !== undefined) {
            display = `#${rank}`;

            const diff = mean - rank;

            if (validRanks.length <= 2) {
              tooltipText = 'Too few rankings for comparison';
            } else if (allEqual) {
              tooltipText = 'All scouts gave the same ranking';
            } else {
              const z = (rank - mean) / stdDev;
              let summary = 'Similar to others';

              if (z > 1.5) {
                dotClass = styles.redDot;
                summary = 'Significantly lower than others';
              } else if (z > 0.75) {
                dotClass = styles.paleRedDot;
                summary = 'Somewhat lower than others';
              } else if (z < -1.5) {
                dotClass = styles.greenDot;
                summary = 'Significantly higher than others';
              } else if (z < -0.75) {
                dotClass = styles.paleGreenDot;
                summary = 'Somewhat higher than others';
              }

              tooltipText = (
                <>
                  <div><strong>{summary}</strong></div>
                  <div>{diff > 0 ? '+' : ''}{diff.toFixed(1)} vs avg</div>
                </>
              );
            }
          }

          return (
            <div key={scout} className={styles.scoutRow}>
              <strong>{scout.replace(' Rank', '')}</strong>
              <span>{display}</span>
              <Tooltip
                title={tooltipText}
                arrow
                placement="right"
                componentsProps={{
                  tooltip: {
                    sx: {
                      fontSize: '0.85rem',
                      padding: '0.5rem 0.75rem',
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
            </div>
          );
        })}
      </div>
    </div>
  );
}