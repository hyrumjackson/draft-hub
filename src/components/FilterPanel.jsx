import React from 'react';
import {
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Box,
  Divider,
  TextField,
  InputAdornment,
  IconButton,
  MenuItem,
  Select,
  Button
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ClearIcon from '@mui/icons-material/Clear';
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
  const [sortMode, setSortMode] = React.useState('scout');

  const handleReset = () => {
    setSearchQuery('');
    setStatMode('Per Game');
    setSortByScout('Average');
    setSortByStat(null);
    setSortMode('scout');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Divider
        textAlign="center"
        sx={{
          '& span': {
            fontSize: '1.2rem',
            color: '#00285E',
          }
        }}
      >
        Search and Filters
      </Divider>
      <TextField
        fullWidth
        label="Search"
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ borderRadius: '0px' }}
        InputProps={{
          endAdornment: searchQuery && (
            <InputAdornment position="end">
              <IconButton onClick={() => setSearchQuery('')}>
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      <Divider
        textAlign="left"
        sx={{
          '& span': {
            fontFamily: 'Russo One',
            color: 'rgba(0, 0, 0, 0.6)',
          }
        }}
      >
        Sort Mode
      </Divider>
      <ToggleButtonGroup
        color="primary"
        value={sortMode}
        exclusive
        onChange={(e, value) => {
          if (!value) return;
          setSortMode(value);
          if (value === 'scout') {
            setSortByStat(null);
            setSortByScout(sortByScout || 'Average');
          } else {
            setSortByScout(null);
            setSortByStat(sortByStat || 'PTS');
          }
        }}
        fullWidth
        size="small"
      >
        <ToggleButton value="scout">Scout</ToggleButton>
        <ToggleButton value="stat">Stat</ToggleButton>
      </ToggleButtonGroup>

      {sortMode === 'scout' && (
        <Select
          fullWidth
          size="small"
          value={sortByScout || 'Average'}
          onChange={(e) => setSortByScout(e.target.value)}
        >
          <MenuItem value="Average" sx={{ fontFamily: 'Figtree, sans-serif' }}>Average</MenuItem>
          {availableScouts.map((scout) => (
            <MenuItem
              key={scout}
              value={scout}
              sx={{ fontFamily: 'Figtree, sans-serif' }}
            >
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
        >
          <MenuItem value="PTS" sx={{ fontFamily: 'Figtree, sans-serif' }}>Points</MenuItem>
          <MenuItem value="TRB" sx={{ fontFamily: 'Figtree, sans-serif' }}>Rebounds</MenuItem>
          <MenuItem value="AST" sx={{ fontFamily: 'Figtree, sans-serif' }}>Assists</MenuItem>
          <MenuItem value="FG%" sx={{ fontFamily: 'Figtree, sans-serif' }}>Field Goal %</MenuItem>
        </Select>
      )}

      <Divider
        textAlign="left"
        sx={{
          '& span': {
            fontFamily: 'Russo One',
            color: 'rgba(0, 0, 0, 0.6)',
          }
        }}
      >
        Stat Mode
      </Divider>
      <ToggleButtonGroup
        color="primary"
        value={statMode}
        exclusive
        onChange={(e, value) => {
          if (value) setStatMode(value);
        }}
        fullWidth
        size="small"
      >
        <ToggleButton value="Per Game">Per Game</ToggleButton>
        <ToggleButton value="Per 36">Per 36</ToggleButton>
        <ToggleButton value="Totals">Totals</ToggleButton>
      </ToggleButtonGroup>

      <Button
        fullWidth
        variant="outlined"
        onClick={handleReset}
        startIcon={<RestartAltIcon />}
        sx={{
          color: '#0053BC',
        }}
      >
        Reset Filters
      </Button>
    </Box>
  );
}