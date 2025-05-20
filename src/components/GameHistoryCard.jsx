import React, { useState } from 'react';
import styles from './styles/PlayerStatCards.module.css';

export default function GameHistoryCard({ games }) {
  if (!games || games.length === 0) {
    return <p>No game logs available.</p>;
  }

  const [expanded, setExpanded] = useState(false);
  const displayLimit = expanded ? 10 : 5;

  const sortedGames = [...games].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.gameTable}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Opponent</th>
            <th>Result</th>
            <th>MP</th>
            <th>PTS</th>
            <th>REB</th>
            <th>AST</th>
            <th>STL</th>
            <th>BLK</th>
            <th>TOV</th>
            <th>+/-</th>
            <th>FG</th>
            <th>3P</th>
            <th>FT</th>
          </tr>
        </thead>
        <tbody>
          {sortedGames.slice(0, displayLimit).map((g) => {
            const isWin = (g.isHome && g.homeTeamPts > g.visitorTeamPts) || (!g.isHome && g.homeTeamPts < g.visitorTeamPts);
            const result = isWin ? 'W' : 'L';
            const score = g.isHome
              ? `${g.homeTeamPts}-${g.visitorTeamPts}`
              : `${g.visitorTeamPts}-${g.homeTeamPts}`;
            const opponentText = g.isHome ? `vs ${g.opponent}` : `@ ${g.opponent}`;

            return (
              <tr key={g.gameId}>
                <td>{new Date(g.date).toLocaleDateString()}</td>
                <td>{opponentText}</td>
                <td>
                  <span>
                    <span className={isWin ? styles.winText : styles.lossText}>{result}</span> {score}
                  </span>
                </td>
                <td>{g.timePlayed}</td>
                <td>{g.pts}</td>
                <td>{g.reb}</td>
                <td>{g.ast}</td>
                <td>{g.stl}</td>
                <td>{g.blk}</td>
                <td>{g.tov}</td>
                <td>{g.plusMinus > 0 ? `+${g.plusMinus}` : g.plusMinus}</td>
                <td>{g.fgm}/{g.fga}</td>
                <td>{g.tpm}/{g.tpa}</td>
                <td>{g.ftm}/{g.fta}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {sortedGames.length > 5 && (
        <div className={styles.pullTabWrapper}>
          <div className={styles.pullTab} onClick={() => setExpanded(!expanded)}>
            <span className={styles.pullArrow}>{expanded ? '▲' : '▼'}</span>
          </div>
        </div>
      )}
    </div>
  );
}