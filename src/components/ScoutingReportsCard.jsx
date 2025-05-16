import React from 'react';
import styles from './styles/PlayerStatCards.module.css';

export default function ScoutingReportsCard({ reports }) {
  if (!reports || reports.length === 0) {
    return <p>No scouting reports available.</p>;
  }

  return (
    <div className={styles.reportsWrapper}>
      {reports.map((report) => (
        <div key={report.reportId} className={styles.reportCard}>
          <strong>{report.scout}</strong>
          <p>{report.report}</p>
        </div>
      ))}
    </div>
  );
}