import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import styles from './styles/SeasonModal.module.css';

export default function SeasonAveragesModal({ open, onClose, seasons }) {
  const allStatKeys = Object.keys(seasons[0] || {})
    .filter(
      (key) =>
        !['playerId', 'age', 'Season', 'League', 'Team', 'w', 'l'].includes(key)
    );

  const orderedStatKeys = [
    'MP', 'PTS', 'TRB', 'AST', 'STL', 'BLK', 'TOV', 'PF',
    'FGM', 'FGA', 'FG%', 'FG2M', 'FG2A', 'FG2%', '3PM', '3PA', '3P%',
    'FT', 'FTA', 'FTP', 'eFG%', 'GS', 'GP', 'ORB', 'DRB'
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      PaperProps={{ sx: { borderRadius: 0 } }}
    >
      <DialogTitle
        sx={{
          fontFamily: "'Russo One', sans-serif",
          fontSize: '1.75rem',
          color: '#00285E',
          fontWeight: 'normal'
        }}
      >
        All Season Stats
      </DialogTitle>
      <DialogContent dividers>
        <div className={styles.tableWrapper}>
          <table className={styles.gameTable}>
            <thead>
              <tr>
                <th>Season</th>
                <th>Team</th>
                <th>W–L</th>
                  {orderedStatKeys.map((key) => (
                    <th key={key}>{key}</th>
                  ))}
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
                    {orderedStatKeys.map((key) => (
                      <td key={key}>{s[key] ?? '—'}</td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.glossary}>
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{
              fontFamily: 'Figtree, sans-serif',
              fontSize: '1.15rem',
              fontWeight: 600,
              color: '#00285E'
            }}
          >
            Glossary
          </Typography>
          <ul className={styles.glossaryList}>
            <li><strong>W–L</strong> – Wins and losses</li>
            <li><strong>MP</strong> – Minutes Played</li>
            <li><strong>PTS</strong> – Points</li>
            <li><strong>TRB</strong> – Total Rebounds</li>
            <li><strong>AST</strong> – Assists</li>
            <li><strong>STL</strong> – Steals</li>
            <li><strong>BLK</strong> – Blocks</li>
            <li><strong>TOV</strong> – Turnovers</li>
            <li><strong>PF</strong> – Personal Fouls</li>
            <li><strong>FGM</strong> – Field Goals Made</li>
            <li><strong>FGA</strong> – Field Goals Attempted</li>
            <li><strong>FG%</strong> – Field Goal Percentage</li>
            <li><strong>FG2M</strong> – 2PT Field Goals Made</li>
            <li><strong>FG2A</strong> – 2PT Field Goals Attempted</li>
            <li><strong>FG2%</strong> – 2PT Field Goal Percentage</li>
            <li><strong>3PM</strong> – 3PT Field Goals Made</li>
            <li><strong>3PA</strong> – 3PT Field Goals Attempted</li>
            <li><strong>3P%</strong> – 3PT Field Goal Percentage</li>
            <li><strong>FT</strong> – Free Throws Made</li>
            <li><strong>FTA</strong> – Free Throws Attempted</li>
            <li><strong>FTP</strong> – Free Throw Percentage</li>
            <li><strong>eFG%</strong> – Effective FG Percentage</li>
            <li><strong>GS</strong> – Games Started</li>
            <li><strong>GP</strong> – Games Played</li>
            <li><strong>ORB</strong> – Offensive Rebounds</li>
            <li><strong>DRB</strong> – Defensive Rebounds</li>
          </ul>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          className={styles.cancelButton}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}