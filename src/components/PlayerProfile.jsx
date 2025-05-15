import React from 'react';
import { useParams } from 'react-router-dom';
import { bio } from '../data/players';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function PlayerProfile() {
  const { id } = useParams();
  const player = bio.find(p => p.playerId.toString() === id);
  const navigate = useNavigate();

  if (!player) {
    return <Typography variant="h6">Player not found</Typography>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <Button variant="outlined" onClick={() => navigate(-1)}>
        ← Back to Big Board
      </Button>
      <Typography variant="h4" gutterBottom>
        {player.name}
      </Typography>
      <img
        src={player.photoUrl}
        alt={player.name}
        style={{ width: '200px', borderRadius: '8px' }}
      />
      <Typography variant="body1">
        {player.currentTeam}, {player.class || 'Freshman'}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        League: {player.league}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Nationality: {player.nationality}
      </Typography>
      {/* Add more info later like stats, measurements, scouting reports, etc. */}
    </div>
  );
}