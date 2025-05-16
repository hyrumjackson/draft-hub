import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  bio,
  measurements,
  gameLogs,
  seasonLogs,
  scoutingReports,
} from '../data/players';

import Header from './Header';
import StatCard from './StatCard';
import BioMeasurementsCard from './BioMeasurementsCard';
import GameHistoryCard from './GameHistoryCard';
import SeasonAveragesCard from './SeasonAveragesCard';
import ScoutingReportsCard from './ScoutingReportsCard';

import styles from './styles/PlayerProfile.module.css';
import defaultProfile from '../assets/default-profile.png';

export default function PlayerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const player = bio.find((p) => p.playerId.toString() === id);
  const playerMeasurements = measurements.find((m) => m.playerId.toString() === id);
  const playerGames = gameLogs.filter((g) => g.playerId.toString() === id);
  const playerSeasonStats = seasonLogs.filter((s) => s.playerId.toString() === id);
  const playerReports = scoutingReports.filter((r) => r.playerId.toString() === id);

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
        {/* Left Column: Image + Button */}
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

        {/* Right Column: Info Cards */}
        <div className={styles.rightColumn}>
          <h2>{player.name}</h2>
          <p><strong>Team:</strong> {player.currentTeam}</p>
          <p><strong>Age:</strong> {player.age || 'N/A'}</p>
          <p><strong>Nationality:</strong> {player.nationality}</p>
          <p><strong>And you're still missing a table in json, make sure to analyze that and add those</strong></p>
          <br />

          <StatCard title="Bio & Measurements">
            <BioMeasurementsCard player={player} measurements={playerMeasurements} />
          </StatCard>

          <StatCard title="Game History">
            <GameHistoryCard games={playerGames} />
          </StatCard>

          <StatCard title="Season Averages">
            <SeasonAveragesCard seasons={playerSeasonStats} />
          </StatCard>

          <StatCard title="Scouting Reports">
            <ScoutingReportsCard reports={playerReports} />
          </StatCard>
        </div>
      </div>
    </div>
  );
}