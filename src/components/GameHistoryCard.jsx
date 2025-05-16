import React from 'react';
import styles from './styles/PlayerStatCards.module.css';

export default function GameHistoryCard({ games }) {
  if (!games || games.length === 0) {
    return <p>No game logs available.</p>;
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.gameTable}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Opponent</th>
            <th>PTS</th>
            <th>REB</th>
            <th>AST</th>
            <th>FGM/FGA</th>
            <th>3PM/3PA</th>
            <th>FTM/FTA</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.gameId}>
              <td>{new Date(game.date).toLocaleDateString()}</td>
              <td>{game.opponent}</td>
              <td>{game.pts}</td>
              <td>{game.reb}</td>
              <td>{game.ast}</td>
              <td>{game.fgm}/{game.fga}</td>
              <td>{game.tpm}/{game.tpa}</td>
              <td>{game.ftm}/{game.fta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}