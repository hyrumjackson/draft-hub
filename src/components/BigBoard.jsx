import React, { useState } from 'react';
import { bio, scoutRankings, seasonLogs } from '../data/players';
import styles from './styles/BigBoard.module.css';
import Header from './Header';
import FilterPanel from '../components/FilterPanel';
import PlayerCard from '../components/PlayerCard';
import { Card, CardContent } from '@mui/material';

export default function BigBoard() {
  const [statMode, setStatMode] = useState('Per Game');
  const [sortByScout, setSortByScout] = useState('Average');
  const [sortByStat, setSortByStat] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Enrich player data
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

    const playerSeasons = seasonLogs.filter(
      (s) => s.playerId.toString() === player.playerId.toString()
    );

    let stats = null;

    if (playerSeasons.length > 0) {
      const byYear = playerSeasons.reduce((acc, s) => {
        const year = s.Season;
        if (!acc[year]) acc[year] = [];
        acc[year].push(s);
        return acc;
      }, {});

      const bestPerYear = Object.entries(byYear).map(([year, list]) =>
        list.reduce((max, curr) => (curr.GP > (max.GP || 0) ? curr : max), {})
      );

      stats = bestPerYear.sort((a, b) => b.Season - a.Season)[0];
    }

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

  // Sorting logic
  function getSortableStat(stats = {}, key, mode) {
    const value = stats[key];
    const gp = stats.GP || 1;
    const mp = stats.MP || 1;

    if (value == null) return -Infinity;

    // FG% is a rate stat — never scale it
    if (key === 'FG%') return value;

    switch (mode) {
      case 'Totals': return value * gp;
      case 'Per 36': return mp > 0 ? (value / mp) * 36 : 0;
      case 'Per Game':
      default: return value;
    }
  }

  const sortedPlayers = [...players].sort((a, b) => {
    if (sortByScout) {
      if (sortByScout === 'Average') {
        if (a.avgRank === b.avgRank) return a.espnRank - b.espnRank;
        return a.avgRank - b.avgRank;
      } else {
        const aRank = a.rankings?.[sortByScout] ?? Infinity;
        const bRank = b.rankings?.[sortByScout] ?? Infinity;
        return aRank - bRank;
      }
    } else if (sortByStat) {
      const aStat = getSortableStat(a.stats, sortByStat, statMode);
      const bStat = getSortableStat(b.stats, sortByStat, statMode);
      return bStat - aStat;
    } else {
      return 0;
    }
  });

  // Build index map (based on full sorted list)
  const playerIndexMap = new Map();
  sortedPlayers.forEach((player, i) => {
    playerIndexMap.set(player.playerId, i + 1);
  });

  // Search filter (non-impactful on index)
  function matchesSearch(player) {
    const q = searchQuery.toLowerCase();
    return (
      player.name.toLowerCase().includes(q) ||
      player.currentTeam.toLowerCase().includes(q) ||
      player.leagueType.toLowerCase().includes(q)
    );
  }

  const filteredPlayers = sortedPlayers.filter(matchesSearch);

  // Split ranked/unranked (from filtered)
  let visibleRankedPlayers = [];
  let visibleUnrankedPlayers = [];

  if (sortByScout && sortByScout !== 'Average') {
    visibleRankedPlayers = filteredPlayers.filter(p => p.rankings?.[sortByScout] != null);
    visibleUnrankedPlayers = filteredPlayers.filter(p => p.rankings?.[sortByScout] == null);
  } else {
    visibleRankedPlayers = filteredPlayers;
  }

  return (
    <div className={styles.page}>
      <Header title="2025 NBA DRAFT HUB" subtitle="Big Board" />

      <div className={styles.content}>
        <div className={styles.sidebar}>
          <FilterPanel
            statMode={statMode}
            setStatMode={setStatMode}
            sortByScout={sortByScout}
            setSortByScout={setSortByScout}
            sortByStat={sortByStat}
            setSortByStat={setSortByStat}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            availableScouts={Array.from(new Set(
              scoutRankings.flatMap((entry) =>
                Object.keys(entry).filter((k) => k !== 'playerId' && entry[k] != null)
              )
            )).sort()}
          />
        </div>

        <div className={styles.cardContainer}>
          {/* Ranked */}
          {visibleRankedPlayers.map((player) => (
            <PlayerCard
              key={player.playerId}
              player={player}
              index={playerIndexMap.get(player.playerId)}
              stats={player.stats}
              statMode={statMode}
              ranked={true}
              sortByStat={sortByStat}
              sortByScout={sortByScout}
            />
          ))}

          {/* Divider if applicable */}
          {sortByScout && sortByScout !== 'Average' && visibleUnrankedPlayers.length > 0 && (
            <div className={styles.notRankedDivider}>
              <hr className={styles.horizontalLine} />
              <div className={styles.dividerLabel}>
                Not Ranked by {sortByScout.replace(' Rank', '')}
              </div>
              <hr className={styles.horizontalLine} />
            </div>
          )}

          {/* Unranked */}
          {visibleUnrankedPlayers.map((player) => (
            <PlayerCard
              key={player.playerId}
              player={player}
              index={null}
              stats={player.stats}
              statMode={statMode}
              ranked={false}
              sortByStat={sortByStat}
              sortByScout={sortByScout}
            />
          ))}

          {/* No matches */}
          {visibleRankedPlayers.length === 0 && visibleUnrankedPlayers.length === 0 && (
            <Card className={styles.card}>
              <CardContent className={styles.cardContent}>
                <div className={styles.noMatches}>
                  No players match your search.
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}