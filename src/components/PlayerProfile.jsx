import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bio, measurements, gameLogs, seasonLogs, scoutingReports } from '../data/players';
import styles from './styles/PlayerProfile.module.css';
import Header from './Header';
import defaultProfile from '../assets/default-profile.png';

export default function PlayerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const player = bio.find(p => p.playerId.toString() === id);
  const playerMeasurements = measurements.find(m => m.playerId.toString() === id);
  const playerGames = gameLogs.filter(g => g.playerId.toString() === id);
  const playerSeasonStats = seasonLogs.filter(s => s.playerId.toString() === id);
  const playerReports = scoutingReports.filter(r => r.playerId.toString() === id);

  if (!player) {
    return <div style={{ padding: '2rem' }}>Player not found.</div>;
  }

  return (
    <div className={styles.page}>
      <Header title="2025 NBA DRAFT HUB" subtitle="Player Profile" />

      <div className={styles.backButton} onClick={() => navigate(-1)}>
        ← Back
      </div>

      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <img
            src={player.photoUrl || defaultProfile}
            alt={player.name}
            className={styles.playerImage}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultProfile;
            }}
          />
          <button className={styles.scoutButton}>+ Create Scouting Report</button>
        </div>

        <div className={styles.rightColumn}>
          <h2>{player.name}</h2>
          <p><strong>Team:</strong> {player.currentTeam}</p>
          <p><strong>Age:</strong> {player.age || "N/A"}</p>
          <p><strong>Nationality:</strong> {player.nationality}</p>
          {/* Placeholder for flag and stats */}
          <div className={styles.statsSection}>
            <h3>Bio Data</h3>
            <ul className={styles.statsList}>
              {Object.entries(player).map(([key, value]) => (
                key !== 'playerId' && key !== 'photoUrl' && (
                  <li key={key}>
                    <strong>{key}:</strong> {value ?? 'N/A'}
                  </li>
                )
              ))}
            </ul>
          </div>
          <div className={styles.statsSection}>
            <h3>Measurements & Athletic Stats</h3>
            {playerMeasurements ? (
              <ul className={styles.statsList}>
                {Object.entries(playerMeasurements).map(([key, value]) => (
                  key !== 'playerId' && (
                    <li key={key}>
                      <strong>{key}:</strong> {value ?? 'N/A'}
                    </li>
                  )
                ))}
              </ul>
            ) : (
              <p>No measurement data available.</p>
            )}
          </div>
          <div className={styles.statsSection}>
            <h3>Game History</h3>
            {playerGames.length > 0 ? (
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
                  {playerGames.map((game) => (
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
            ) : (
              <p>No game logs available.</p>
            )}
          </div>
          <div className={styles.statsSection}>
            <h3>Season Averages</h3>
            {playerSeasonStats.length > 0 ? (
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
                  {playerSeasonStats.map((s, i) => (
                    <tr key={i}>
                      <td>{s.Season}</td>
                      <td>{s.Team}</td>
                      <td>{s.GP}</td>
                      <td>{s.PTS}</td>
                      <td>{s.TRB}</td>
                      <td>{s.AST}</td>
                      <td>{s["FG%"]}%</td>
                      <td>{s["3P%"]}%</td>
                      <td>{s.FTP}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No season averages available.</p>
            )}
          </div>
          <div className={styles.statsSection}>
            <h3>Scouting Reports</h3>
            {playerReports.length > 0 ? (
              playerReports.map(report => (
                <div key={report.reportId} className={styles.reportCard}>
                  <strong>{report.scout}</strong>
                  <p>{report.report}</p>
                </div>
              ))
            ) : (
              <p>No scouting reports available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}