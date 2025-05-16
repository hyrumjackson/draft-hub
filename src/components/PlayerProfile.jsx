import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  bio,
  measurements,
  gameLogs,
  seasonLogs,
  scoutingReports,
  scoutRankings
} from '../data/players';
import Header from './Header';
import StatCard from './StatCard';
import BioMeasurementsCard from './BioMeasurementsCard';
import GameHistoryCard from './GameHistoryCard';
import SeasonAveragesCard from './SeasonAveragesCard';
import ScoutRankings from './ScoutRankings';
import ScoutingReportsCard from './ScoutingReportsCard';
import ScoutingReportModal from './ScoutingReportModal';
import styles from './styles/PlayerProfile.module.css';
import defaultProfile from '../assets/default-profile.png';
import Flag from 'react-world-flags';
import { getCountryCode } from '../utils/nationalityToCode';
import { playerImageOverrides } from '../utils/playerPhotos';

export default function PlayerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [customReports, setCustomReports] = useState([]);

  const player = bio.find((p) => p.playerId.toString() === id);
  const playerMeasurements = measurements.find((m) => m.playerId.toString() === id);
  const playerGames = gameLogs.filter((g) => g.playerId.toString() === id);
  const playerSeasonStats = seasonLogs.filter((s) => s.playerId.toString() === id);
  const playerRankings = scoutRankings.filter((r) => r.playerId.toString() === id);
  const playerReports = scoutingReports.filter((e) => e.playerId.toString() === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!player) {
    return <div style={{ padding: '2rem' }}>Player not found.</div>;
  }

  function calculateAge(birthDateStr) {
    if (!birthDateStr) return null;

    const birthDate = new Date(birthDateStr);
    const now = new Date();
    const ageInMs = now - birthDate;
    const ageInYears = ageInMs / (1000 * 60 * 60 * 24 * 365.25);

    return ageInYears.toFixed(1);
  }

  function handleAddReport(reportObj) {
    setCustomReports([...customReports, reportObj]);
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
            src={
              playerImageOverrides[player.playerId] 
              || player.photoUrl
              || defaultProfile
            }
            alt={player.name}
            className={styles.playerImage}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultProfile;
            }}
          />
          <button
            className={styles.scoutButton}
            onClick={() => setModalOpen(true)}
          >
            + Create Scouting Report
          </button>
        </div>

        {/* Right Column: Info Cards */}
        <div className={styles.rightColumn}>
          <h2>{player.name}</h2>
          <p><strong>Team:</strong> {player.currentTeam}</p>
          <p><strong>Age:</strong> {calculateAge(player.birthDate) || 'N/A'}</p>
          <p>
            <strong>Nationality:</strong> {player.nationality}
            <Flag
              code={getCountryCode(player.nationality)}
              className={styles.nationalityFlag}
            />
          </p>
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

          <StatCard title="Scout Rankings">
            <ScoutRankings data={playerRankings} />
          </StatCard>

          <StatCard title="Scouting Reports">
            <ScoutingReportsCard reports={[...playerReports, ...customReports]} />
          </StatCard>
        </div>
      </div>

      <ScoutingReportModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddReport}
        playerId={player.playerId}
      />
    </div>
  );
}