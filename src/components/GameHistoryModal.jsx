import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import styles from './styles/SeasonModal.module.css'; // REUSING styles

export default function GameHistoryModal({ open, onClose, games }) {
  if (!games || games.length === 0) return null;

  const sortedGames = [...games].sort((a, b) => new Date(b.date) - new Date(a.date));

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
        Full Game History
      </DialogTitle>
      <DialogContent dividers>
        <div className={styles.tableWrapper}>
          <table className={styles.gameTable}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Opponent</th>
                <th>Result</th>
                <th>MP</th>
                <th>GS</th>
                <th>OREB</th>
                <th>DREB</th>
                <th>PTS</th>
                <th>AST</th>
                <th>STL</th>
                <th>BLK</th>
                <th>TOV</th>
                <th>PF</th>
                <th>+/-</th>
                <th>FG</th>
                <th>3P</th>
                <th>FT</th>
              </tr>
            </thead>
            <tbody>
              {sortedGames.map((g) => {
                const isWin =
                  (g.isHome && g.homeTeamPts > g.visitorTeamPts) ||
                  (!g.isHome && g.homeTeamPts < g.visitorTeamPts);

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
                      <span style={{ color: isWin ? '#2e7d32' : '#c62828' }}>
                        {result}
                      </span>{' '}
                      {score}
                    </td>
                    <td>{g.timePlayed}</td>
                    <td>{g.gs ? 'Yes' : 'No'}</td>
                    <td>{g.oreb}</td>
                    <td>{g.dreb}</td>
                    <td>{g.pts}</td>
                    <td>{g.ast}</td>
                    <td>{g.stl}</td>
                    <td>{g.blk}</td>
                    <td>{g.tov}</td>
                    <td>{g.pf}</td>
                    <td>{g.plusMinus > 0 ? `+${g.plusMinus}` : g.plusMinus}</td>
                    <td>{g.fgm}/{g.fga}</td>
                    <td>{g.tpm}/{g.tpa}</td>
                    <td>{g.ftm}/{g.fta}</td>
                  </tr>
                );
              })}
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
            <li><strong>MP</strong> – Minutes Played</li>
            <li><strong>GS</strong> – Game Started</li>
            <li><strong>PTS</strong> – Points</li>
            <li><strong>OREB</strong> – Offensive Rebounds</li>
            <li><strong>DREB</strong> – Defensive Rebounds</li>
            <li><strong>AST</strong> – Assists</li>
            <li><strong>STL</strong> – Steals</li>
            <li><strong>BLK</strong> – Blocks</li>
            <li><strong>TOV</strong> – Turnovers</li>
            <li><strong>PF</strong> – Personal Fouls</li>
            <li><strong>+/-</strong> – Plus/Minus</li>
            <li><strong>FG</strong> – Field Goals Made/Attempted</li>
            <li><strong>3P</strong> – Three-Point Made/Attempted</li>
            <li><strong>FT</strong> – Free Throws Made/Attempted</li>
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