import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';

export default function ScoutingReportModal({ open, onClose, onSubmit, playerId }) {
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim() === '' || name.trim() === '') return;

    const reportObj = {
      scout: name.trim(),
      reportId: crypto.randomUUID(),
      playerId: playerId,
      report: text.trim()
    };

    onSubmit(reportObj);
    setName('');
    setText('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Scouting Report</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Scout Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          multiline
          label="Scouting Report"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}