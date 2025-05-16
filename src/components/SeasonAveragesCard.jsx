import React from 'react';
import styles from './styles/PlayerStatCards.module.css';

export default function SeasonAveragesCard({ seasons }) {
  if (!seasons || seasons.length === 0) {
    return <p>No season averages available.</p>;
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.gameTable}>
        <thead>
          <tr>
            <th>Season</th>
            <th>Team</th>
            <th>GP</th>
            <th>PTS</th>
            <th>REB</th>
            <th>AST</th>
            <th>FG%</th>
            <th>3P%</th>
            <th>FT%</th>
          </tr>
        </thead>
        <tbody>
          {seasons.map((s, i) => (
            <tr key={i}>
              <td>{s.Season}</td>
              <td>{s.Team}</td>
              <td>{s.GP}</td>
              <td>{s.PTS}</td>
              <td>{s.TRB}</td>
              <td>{s.AST}</td>
              <td>{s['FG%']}%</td>
              <td>{s['3P%']}%</td>
              <td>{s.FTP}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}