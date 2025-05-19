import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  ButtonGroup,
  Button,
  Tabs,
  Tab,
  Select,
  MenuItem,
  TextField
} from '@mui/material';
import styles from './styles/FilterPanel.module.css';

export default function FilterPanel({
  statMode,
  setStatMode,
  sortByScout,
  setSortByScout,
  sortByStat,
  setSortByStat,
  searchQuery,
  setSearchQuery
}) {
  const statModes = ['Per Game', 'Per 36', 'Totals'];

  const [sortMode, setSortMode] = React.useState('scout');

  const handleTabChange = (event, newValue) => {
    setSortMode(newValue);
    if (newValue === 'scout') {
      setSortByStat(null);
      setSortByScout(sortByScout || 'Average');
    } else {
      setSortByScout(null);
      setSortByStat(sortByStat || 'PTS');
    }
  };

  return (
    <Card>
      <CardContent>
        <TextField
          fullWidth
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ marginBottom: 2 }}
          InputProps={{
            endAdornment: searchQuery && (
              <Button onClick={() => setSearchQuery('')} size="small">
                ×
              </Button>
            ),
          }}
        />

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

        <Typography variant="body2" gutterBottom sx={{ marginTop: 2 }}>
          Sort By
        </Typography>

        <Tabs
          value={sortMode}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Scout" value="scout" />
          <Tab label="Stat" value="stat" />
        </Tabs>

        {sortMode === 'scout' && (
          <Select
            fullWidth
            value={sortByScout || 'Average'}
            onChange={(e) => setSortByScout(e.target.value)}
            sx={{ marginTop: 1 }}
          >
            <MenuItem value="Average">Average</MenuItem>
            <MenuItem value="ESPN Rank">ESPN</MenuItem>
            <MenuItem value="Sam Vecenie Rank">Sam Vecenie</MenuItem>
            <MenuItem value="Kevin O'Connor Rank">Kevin O'Connor</MenuItem>
            <MenuItem value="Kyle Boone Rank">Kyle Boone</MenuItem>
            <MenuItem value="Gary Parrish Rank">Gary Parrish</MenuItem>
          </Select>
        )}

        {sortMode === 'stat' && (
          <Select
            fullWidth
            value={sortByStat || 'PTS'}
            onChange={(e) => setSortByStat(e.target.value)}
            sx={{ marginTop: 1 }}
          >
            <MenuItem value="PTS">Points</MenuItem>
            <MenuItem value="TRB">Rebounds</MenuItem>
            <MenuItem value="AST">Assists</MenuItem>
            <MenuItem value="BLK">Blocks</MenuItem>
            <MenuItem value="FG%">Field Goal %</MenuItem>
          </Select>
        )}
      </CardContent>
    </Card>
  );
}