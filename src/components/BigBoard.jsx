import React, { useState } from 'react';
import { bio, scoutRankings, seasonLogs } from '../data/players';
import styles from './styles/BigBoard.module.css';
import Header from './Header';
import FilterPanel from '../components/FilterPanel';
import PlayerCard from '../components/PlayerCard';

export default function BigBoard() {
  const [statMode, setStatMode] = useState('Per Game');
  const [sortBy, setSortBy] = useState('Average');

  const players = bio.map((player) => {
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
    const avgRank = ranks.length > 0
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
      highRank,
      lowRank,
      espnRank,
      stats: stats || {},
      rankings,
    };
  });

  const sortedPlayers = [...players].sort((a, b) => {
    if (sortBy === 'Average') {
      if (a.avgRank === b.avgRank) return a.espnRank - b.espnRank;
      return a.avgRank - b.avgRank;
    } else {
      const aRank = a.rankings?.[sortBy] ?? Infinity;
      const bRank = b.rankings?.[sortBy] ?? Infinity;
      return aRank - bRank;
    }
  });  

  return (
    <div className={styles.page}>
      <Header title="2025 NBA DRAFT HUB" subtitle="Big Board" />

      <div className={styles.content}>
        <div className={styles.sidebar}>
          <FilterPanel
            statMode={statMode}
            setStatMode={setStatMode}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>

        <div className={styles.cardContainer}>
          {sortedPlayers.map((player, index) => (
            <PlayerCard
              key={player.playerId}
              player={player}
              index={index + 1}
              stats={player.stats}
              statMode={statMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
}