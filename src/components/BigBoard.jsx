import React from 'react';
import { bio, scoutRankings, seasonLogs } from '../data/players';
import styles from './styles/BigBoard.module.css';
import mavsLogo from '../assets/mavs-logo.png';
import FilterPanel from '../components/FilterPanel';
import PlayerCard from '../components/PlayerCard';

export default function BigBoard() {
  const rankedPlayers = bio.map((player) => {
    const rankingEntry = scoutRankings.find(
      (r) => r.playerId.toString() === player.playerId.toString()
    );
  
    const rankings = rankingEntry
      ? Object.fromEntries(
          Object.entries(rankingEntry).filter(
            ([key, value]) => key !== 'playerId' && value !== null
          )
        )
      : {};
    
    const ranks = Object.values(rankings);
    
    const avgRank =
      ranks.length > 0
        ? ranks.reduce((sum, r) => sum + r, 0) / ranks.length
        : Infinity;
    
    const highRank = ranks.length > 0 ? Math.min(...ranks) : null;
    const lowRank = ranks.length > 0 ? Math.max(...ranks) : null;
    
    const espnRank = rankingEntry?.['ESPN Rank'] ?? Infinity;
    
    const stats = seasonLogs.find(
      (s) => s.playerId.toString() === player.playerId.toString()
    );
  
    return {
      ...player,
      avgRank,
      espnRank,
      highRank,
      lowRank,
      stats: stats || {},
      rankings,
    };
  });  

  rankedPlayers.sort((a, b) => {
    if (a.avgRank === b.avgRank) {
      return a.espnRank - b.espnRank;
    }
    return a.avgRank - b.avgRank;
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <img src={mavsLogo} alt="Mavericks Logo" className={styles.logo} />
        <div className={styles.titleBox}>
          <h1>2025 NBA DRAFT HUB</h1>
          <h2 className={styles.subtitle}>Big Board</h2>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.sidebar}>
          <FilterPanel />
        </div>
        <div className={styles.cardContainer}>
          {rankedPlayers.map((player, index) => (
            <PlayerCard
              key={player.playerId}
              player={player}
              index={index + 1}
              stats={player.stats}
            />
          ))}
        </div>
      </div>
    </div>
  );
}