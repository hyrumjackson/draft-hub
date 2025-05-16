import React from 'react';
import { Card, CardContent, Typography, ButtonGroup, Button } from '@mui/material';

export default function FilterPanel({ statMode, setStatMode }) {
  const statModes = ['Per Game', 'Per 36', 'Totals'];

  return (
    <Card>
      <CardContent>
        <Typography variant="body2" gutterBottom>
          Stat Mode
        </Typography>

        <ButtonGroup fullWidth variant="outlined">
          {statModes.map((mode) => (
            <Button
              key={mode}
              variant={statMode === mode ? 'contained' : 'outlined'}
              onClick={() => setStatMode(mode)}
            >
              {mode}
            </Button>
          ))}
        </ButtonGroup>
      </CardContent>
    </Card>
  );
}