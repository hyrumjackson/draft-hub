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
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 0,
          fontFamily: 'Figtree, sans-serif',
        }
      }}
    >
      <DialogTitle
        sx={{
          fontSize: '1.25rem',
          fontWeight: 'normal',
          color: '#00285E',
          fontFamily: 'Russo One, sans-serif',
        }}
      >
        Create Scouting Report
      </DialogTitle>
      <DialogContent sx={{ padding: '20px 20px 0px' }}>
        <TextField
          fullWidth
          label="Scout Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{
            mt: 1,
            mb: 2,
            fontFamily: 'Figtree, sans-serif',
            '& .MuiOutlinedInput-root': {
              fontFamily: 'Figtree, sans-serif',
              borderRadius: 0
            }
          }}
          InputLabelProps={{
            sx: {
              fontFamily: 'Figtree, sans-serif',
              '&.Mui-focused': { color: '#0053BC' }
            }
          }}
          InputProps={{
            sx: {
              fontFamily: 'Figtree, sans-serif',
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#0053BC'
              },
              borderRadius: 0
            }
          }}
        />

        <TextField
          fullWidth
          label="Ranking"
          type="number"
          value={rank}
          onChange={(e) => setRank(e.target.value)}
          sx={{
            mb: 2,
            fontFamily: 'Figtree, sans-serif',
            '& .MuiOutlinedInput-root': {
              fontFamily: 'Figtree, sans-serif',
              borderRadius: 0
            }
          }}
          InputLabelProps={{
            sx: {
              fontFamily: 'Figtree, sans-serif',
              '&.Mui-focused': { color: '#0053BC' }
            }
          }}
          InputProps={{
            sx: {
              fontFamily: 'Figtree, sans-serif',
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#0053BC'
              },
              borderRadius: 0
            }
          }}
        />


        <TextField
          fullWidth
          multiline
          label="Scouting Report"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          sx={{
            mb: 2,
            fontFamily: 'Figtree, sans-serif',
            '& .MuiOutlinedInput-root': {
              fontFamily: 'Figtree, sans-serif',
              borderRadius: 0
            }
          }}
          InputLabelProps={{
            sx: {
              fontFamily: 'Figtree, sans-serif',
              '&.Mui-focused': { color: '#0053BC' }
            }
          }}
          InputProps={{
            sx: {
              fontFamily: 'Figtree, sans-serif',
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#0053BC'
              },
              borderRadius: 0
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            color: '#00285E',
            backgroundColor: 'transparent',
            textTransform: 'none',
            fontWeight: 500,
            fontFamily: 'Figtree, sans-serif',
            width: { xs: '100%', sm: 'auto' },
            justifyContent: { xs: 'center', sm: 'flex-start' }
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: '#0053BC',
            color: '#FFFFFF',
            fontWeight: 600,
            textTransform: 'uppercase',
            fontFamily: 'Figtree, sans-serif',
            borderRadius: 0,
            padding: '0.5rem 1.25rem',
            boxShadow: 'none',
            width: { xs: '100%', sm: 'auto' },
            justifyContent: { xs: 'center', sm: 'flex-start' },
            '&:hover': {
              backgroundColor: '#00285E'
            }
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}