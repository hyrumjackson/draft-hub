import React from 'react';
import {
  Card,
  CardContent,
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
  setSearchQuery,
  availableScouts = []
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

  const handleReset = () => {
    setSearchQuery('');
    setStatMode('Per Game');
    setSortByScout('Average');
    setSortByStat(null);
    setSortMode('scout');
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
              <span className={styles.clearIcon} onClick={() => setSearchQuery('')}>
                ×
              </span>
            ),
          }}
        />

        <div className={styles.sortLabel}>
          <h4 className='sortLabel'>
            Sort By
          </h4>
        </div>

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
            size="small"
            value={sortByScout || 'Average'}
            onChange={(e) => setSortByScout(e.target.value)}
            sx={{ marginTop: 1 }}
          >
            <MenuItem value="Average">Average</MenuItem>
            {availableScouts.map((scout) => (
              <MenuItem key={scout} value={scout}>
                {scout.replace(' Rank', '')}
              </MenuItem>
            ))}
          </Select>
        )}

        {sortMode === 'stat' && (
          <Select
            fullWidth
            size="small"
            value={sortByStat || 'PTS'}
            onChange={(e) => setSortByStat(e.target.value)}
            sx={{ marginTop: 1 }}
          >
            <MenuItem value="PTS">Points</MenuItem>
            <MenuItem value="TRB">Rebounds</MenuItem>
            <MenuItem value="AST">Assists</MenuItem>
            <MenuItem value="FG%">Field Goal %</MenuItem>
          </Select>
        )}

        <div className={styles.statLabel}>
          <h4 className='statLabel'>
            Stat Mode
          </h4>
        </div>
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

        <Button
          fullWidth
          onClick={handleReset}
          className={styles.resetButton}
          variant="outlined"
          sx={{ marginTop: 2 }}
        >
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  );
}