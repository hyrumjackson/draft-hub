import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
import { teamLogos } from '../utils/teamLogos';

export default function PlayerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [customReports, setCustomReports] = useState([]);
  const [seasonStatMode, setSeasonStatMode] = useState('averages');

  const player = bio.find((p) => p.playerId.toString() === id);
  const playerMeasurements = measurements.find((m) => m.playerId.toString() === id);
  const playerGames = gameLogs.filter((g) => g.playerId.toString() === id);

  const allSeasons = seasonLogs.filter((s) => s.playerId.toString() === id);

  // Group seasons by year
  const groupedByYear = allSeasons.reduce((acc, season) => {
    const year = season.Season;
    if (!acc[year]) acc[year] = [];
    acc[year].push(season);
    return acc;
  }, {});

  // Filter: keep GP >= 10 OR the most-played season per year
  const filteredSeasons = Object.values(groupedByYear).flatMap((seasonGroup) => {
    const qualifying = seasonGroup.filter((s) => s.GP >= 10);
    if (qualifying.length > 0) return qualifying;

    // If none have GP >= 10, return the one with the most games
    return [seasonGroup.reduce((max, curr) => (curr.GP > max.GP ? curr : max), seasonGroup[0])];
  });

  filteredSeasons.sort((a, b) => b.Season - a.Season);

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

  function getMainSeason(seasons) {
    if (!seasons || seasons.length === 0) return null;

    // Group by year
    const byYear = seasons.reduce((acc, s) => {
      const year = s.Season;
      if (!acc[year]) acc[year] = [];
      acc[year].push(s);
      return acc;
    }, {});

    // Get most played season per year
    const bestPerYear = Object.entries(byYear).map(([year, seasonList]) =>
      seasonList.reduce((max, curr) => (curr.GP > (max.GP || 0) ? curr : max), {})
    );

    // Sort by season descending and return the most recent one
    return bestPerYear.sort((a, b) => b.Season - a.Season)[0];
  }

  const mainSeason = getMainSeason(allSeasons);

  const height =
    playerMeasurements?.heightShoes || player.height || null;
  const weight =
    playerMeasurements?.weight || player.weight || null;

  const displayHeight = height ? `${Math.floor(height / 12)}'${Math.round(height % 12)}"` : 'N/A';
  const displayWeight = weight ? `${weight} lbs` : 'N/A';

  const seasonLabel = mainSeason?.Season?.toString() || 'Season';

  return (
    <div className={styles.page}>
      <Header title="2025 NBA DRAFT HUB" subtitle="Player Profile" />

      <div className={styles.backButton} onClick={() => navigate('/')}>
        ← Back
      </div>

      <div className={styles.mobileHeader}>
        <img
          src={
            playerImageOverrides[player.playerId] ||
            player.photoUrl ||
            defaultProfile
          }
          alt={player.name}
          className={styles.mobilePlayerThumb}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultProfile;
          }}
        />

        <div className={styles.mobileHeaderText}>
          <h1 className={styles.playerName}>{player.name}</h1>
          <p className={styles.teamLine}>{player.currentTeam} - {player.leagueType}</p>
          <p><strong>Age:</strong> {calculateAge(player.birthDate) || 'N/A'}</p>
          <p><strong>Height:</strong> {displayHeight}</p>
          <p><strong>Weight:</strong> {displayWeight}</p>
          <p>
            <strong>Hometown:</strong>{' '}
            {[player.homeTown, player.homeState, player.homeCountry && !player.homeState ? player.homeCountry : null]
              .filter(Boolean)
              .join(', ')}
            <Flag code={getCountryCode(player.homeCountry)} className={styles.nationalityFlag} />
          </p>
        </div>
      </div>

      <div className={styles.mobileStatTable}>
        <div className={styles.statTableHeader}>{seasonLabel} SEASON STATS</div>
          <table className={styles.statTable}>
            <thead>
              <tr>
                {['PTS', 'TRB', 'AST', 'FG%'].map((statKey) => (
                  <th key={statKey}>{statKey}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {['PTS', 'TRB', 'AST', 'FG%'].map((statKey) => {
                  let val = mainSeason?.[statKey];
                  const isPercentage = statKey.includes('%');
                  if (
                    seasonStatMode === 'totals' &&
                    val != null &&
                    mainSeason?.GP &&
                    !isPercentage
                  ) {
                    val = Math.round(val * mainSeason.GP);
                  }
                  return (
                    <td key={statKey}>
                      {val != null ? val : '—'}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
      </div>

      <div className={styles.content}>
        {/* Left Column: Image + Button */}
        <div className={styles.leftColumn}>
          <img
            src={
              playerImageOverrides[player.playerId] ||
              player.photoUrl ||
              defaultProfile
            }
            alt={player.name}
            className={styles.playerImage}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultProfile;
            }}
          />

          <ScoutRankings data={playerRankings} customReports={customReports} />

          <button
            className={styles.scoutButton}
            onClick={() => setModalOpen(true)}
          >
            + Create Scouting Report
          </button>
        </div>

        {/* Right Column: Header and Cards */}
        <div className={styles.rightColumn}>
          {/* Custom Header Block (not in StatCard) */}
          <div className={styles.playerOverviewHeader}>
            {/* Left Section: Name, Team, League */}
            <div className={styles.section}>
              <h1 className={styles.playerName}>{player.name}</h1>
              <p className={styles.teamLine}>
                {player.currentTeam}
                {teamLogos[player.currentTeam] && (
                  <img
                    src={teamLogos[player.currentTeam]}
                    alt={`${player.currentTeam} logo`}
                    className={styles.inlineIcon}
                  />
                )}
              </p>
              <p className={styles.leagueText}>{player.leagueType}</p>
            </div>

            <div className={styles.verticalDivider} />

            {/* Middle: Age, Height, Weight, Nationality */}
            <div className={styles.section}>
              <p><strong>Age:</strong> {calculateAge(player.birthDate) || 'N/A'}</p>
              <p><strong>Height:</strong> {displayHeight}</p>
              <p><strong>Weight:</strong> {displayWeight}</p>
              <p>
                <strong>Hometown:</strong>{' '}
                {[
                  player.homeTown,
                  player.homeState,
                  player.homeCountry && !player.homeState ? player.homeCountry : null
                ]
                  .filter(Boolean)
                  .join(', ')}
                <Flag
                  code={getCountryCode(player.homeCountry)}
                  className={styles.nationalityFlag}
                />
              </p>
            </div>

            <div className={styles.verticalDivider} />

            {/* Right: Stats Table */}
            <div className={styles.statTableContainer}>
              <div className={styles.statTableHeader}>{seasonLabel} SEASON STATS</div>
                <table className={styles.statTable}>
                  <thead>
                    <tr>
                      {['PTS', 'TRB', 'AST', 'FG%'].map((statKey) => (
                        <th key={statKey}>{statKey}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {['PTS', 'TRB', 'AST', 'FG%'].map((statKey) => {
                        let val = mainSeason?.[statKey];

                        // Apply total math only to non-percentage stats
                        const isPercentage = statKey.includes('%');
                        if (
                          seasonStatMode === 'totals' &&
                          val != null &&
                          mainSeason?.GP &&
                          !isPercentage
                        ) {
                          val = Math.round(val * mainSeason.GP);
                        }

                        return (
                          <td key={statKey}>
                            {val != null ? val : '—'}
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          {/* Info Cards Below */}
          <SeasonAveragesCard
            seasons={filteredSeasons}
            fullSeasons={allSeasons}
            mode={seasonStatMode}
            setMode={setSeasonStatMode}
          />

          <StatCard title="Game History">
            <GameHistoryCard games={playerGames} />
          </StatCard>

          <StatCard title="Measurements & Testing">
            <BioMeasurementsCard player={player} measurements={playerMeasurements} />
          </StatCard>

          <ScoutingReportsCard
            reports={[...playerReports, ...customReports]}
            onCreate={() => setModalOpen(true)}
          />
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