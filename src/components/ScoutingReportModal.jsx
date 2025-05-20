import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';
import styles from './styles/ScoutingReportModal.module.css';

export default function ScoutingReportModal({ open, onClose, onSubmit, playerId }) {
  const [name, setName] = useState('');
  const [rank, setRank] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim() === '' || name.trim() === '') return;

    const parsedRank = parseInt(rank);
    const validRank = !isNaN(parsedRank) && parsedRank >= 1 && parsedRank <= 100;

    const reportObj = {
      scout: name.trim(),
      reportId: crypto.randomUUID(),
      playerId: playerId,
      report: text.trim(),
      rank: validRank ? parsedRank : null
    };

    onSubmit(reportObj);
    setName('');
    setRank('');
    setText('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className={styles.dialogTitle}>Create Scouting Report</DialogTitle>
      <DialogContent>
        <div className={styles.inputFieldTop}>
          <TextField
            fullWidth
            label="Scout Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.inputFieldMiddle}>
          <TextField
            fullWidth
            label="Ranking"
            type="number"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            InputProps={{ classes: { root: styles.inputRoot } }}
            InputLabelProps={{ className: styles.inputRoot }}
          />
        </div>

        <div className={styles.inputFieldBottom}>
          <TextField
            fullWidth
            multiline
            label="Scouting Report"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} className={styles.cancelButton}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          className={styles.submitButton}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}