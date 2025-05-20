import React from 'react';
import styles from './styles/ScoutingReportsCard.module.css';
import { Button } from '@mui/material';

export default function ScoutingReportsCard({ reports, onCreate }) {
  return (
    <div className={styles.reportCardWrapper}>
      <div className={styles.reportHeader}>
        <h3 className={styles.cardTitle}>Scouting Reports</h3>
        <button className={styles.scoutButton} onClick={onCreate}>
          + Create Scouting Report
        </button>
      </div>

      {(!reports || reports.length === 0) ? (
        <p>No scouting reports available.</p>
      ) : (
        <div className={styles.reportsWrapper}>
          {reports.map((report) => (
            <div key={report.reportId} className={styles.reportCard}>
              <strong>{report.scout}</strong>
              <p>{report.report}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}