import React from 'react';
import styles from './styles/PlayerStatCards.module.css';

export default function StatCard({ title, children }) {
  return (
    <div className={styles.statCard}>
      {title && <h3 className={styles.cardTitle}>{title}</h3>}
      <div className={styles.cardContent}>{children}</div>
    </div>
  );
}