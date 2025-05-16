import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  ButtonGroup,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import styles from './styles/FilterPanel.module.css';

export default function FilterPanel({ statMode, setStatMode, sortBy, setSortBy }) {
  const statModes = ['Per Game', 'Per 36', 'Totals'];

  return (
    <Card>
      <CardContent>
        <Typography variant="body2" gutterBottom className={styles.filterSection}>
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

        <br />
        <br />

        <Typography variant="body2" gutterBottom className={styles.filterSection}>
          Sort By
        </Typography>

        <RadioGroup
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={styles.radioGroup}
        >
          <FormControlLabel value="Average" control={<Radio />} label="Average" classes={{ label: styles.radioLabel }} />
          <FormControlLabel value="ESPN Rank" control={<Radio />} label="ESPN" classes={{ label: styles.radioLabel }} />
          <FormControlLabel value="Sam Vecenie Rank" control={<Radio />} label="Sam Vecenie" classes={{ label: styles.radioLabel }} />
          <FormControlLabel value="Kevin O'Connor Rank" control={<Radio />} label="Kevin O'Connor" classes={{ label: styles.radioLabel }} />
          <FormControlLabel value="Kyle Boone Rank" control={<Radio />} label="Kyle Boone" classes={{ label: styles.radioLabel }} />
          <FormControlLabel value="Gary Parrish Rank" control={<Radio />} label="Gary Parrish" classes={{ label: styles.radioLabel }} />
        </RadioGroup>
      </CardContent>
    </Card>
  );
}