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
            <th>W–L</th>
            <th>MP</th>
            <th>PTS</th>
            <th>REB</th>
            <th>AST</th>
            <th>STL</th>
            <th>BLK</th>
            <th>TOV</th>
            <th>FG%</th>
            <th>3P%</th>
            <th>FT%</th>
            <th>eFG%</th>
          </tr>
        </thead>
        <tbody>
          {seasons.map((s, i) => (
            <tr key={i}>
              <td>{s.Season}</td>
              <td>
                <div>{s.Team}</div>
                <div className={styles.leagueSubtext}>{s.League}</div>
              </td>
              <td>{`${s.w}-${s.l}`}</td>
              <td>{s.MP}</td>
              <td>{s.PTS}</td>
              <td>{s.TRB}</td>
              <td>{s.AST}</td>
              <td>{s.STL}</td>
              <td>{s.BLK}</td>
              <td>{s.TOV}</td>
              <td>{s['FG%']?.toFixed(1) ?? '—'}</td>
              <td>{s['3P%']?.toFixed(1) ?? '—'}</td>
              <td>{s.FTP?.toFixed(1) ?? '—'}</td>
              <td>{s['eFG%']?.toFixed(1) ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}