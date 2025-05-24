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
      <Divider textAlign="center">
        <Typography
          sx={{
            fontSize: '1.2rem',
            color: '#00285E',
            fontFamily: 'Russo One, sans-serif'
          }}
        >
          Search and Filters
        </Typography>
      </Divider>

      <TextField
        fullWidth
        label="Search"
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputLabelProps={{
          sx: {
            fontFamily: 'Figtree, sans-serif',
            '&.Mui-focused': { color: '#0053BC' }
          }
        }}
        InputProps={{
          sx: {
            borderRadius: 0,
            fontFamily: 'Figtree, sans-serif'
          },
          endAdornment: searchQuery && (
            <InputAdornment position="end">
              <IconButton onClick={() => setSearchQuery('')}>
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      <Divider textAlign="left">
        <Typography
          sx={{
            fontFamily: 'Russo One, sans-serif',
            color: 'rgba(0, 0, 0, 0.6)',
            fontSize: '1rem'
          }}
        >
          Sort Mode
        </Typography>
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
        <ToggleButton
          value="scout"
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '0.85rem',
            fontFamily: 'Figtree, sans-serif',
            borderRadius: 0,
            borderColor: '#BBC4CA',
            '&.Mui-selected': {
              backgroundColor: '#E6EEF9',
              color: '#0053BC',
              borderColor: '#0053BC',
              fontWeight: 600
            }
          }}
        >
          Scout
        </ToggleButton>
        <ToggleButton value="stat" sx={{
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.85rem',
          fontFamily: 'Figtree, sans-serif',
          borderRadius: 0,
          borderColor: '#BBC4CA',
          '&.Mui-selected': {
            backgroundColor: '#E6EEF9',
            color: '#0053BC',
            borderColor: '#0053BC',
            fontWeight: 600
          }
        }}>Stat</ToggleButton>
      </ToggleButtonGroup>

      {sortMode === 'scout' && (
        <Select
          fullWidth
          size="small"
          value={sortByScout || 'Average'}
          onChange={(e) => setSortByScout(e.target.value)}
          sx={{ fontFamily: 'Figtree, sans-serif', borderRadius: 0, color: '#00285E' }}
          MenuProps={{
            PaperProps: {
              sx: {
                borderRadius: 0
              }
            },
            MenuListProps: {
              sx: {
                paddingTop: 0,
                paddingBottom: 0
              }
            }
          }}
        >
          <MenuItem value="Average" sx={{ fontFamily: 'Figtree, sans-serif' }}>Average</MenuItem>
          {availableScouts.map((scout) => (
            <MenuItem key={scout} value={scout} sx={{ fontFamily: 'Figtree, sans-serif' }}>{scout.replace(' Rank', '')}</MenuItem>
          ))}
        </Select>
      )}

      {sortMode === 'stat' && (
        <Select
          fullWidth
          size="small"
          value={sortByStat || 'PTS'}
          onChange={(e) => setSortByStat(e.target.value)}
          sx={{ fontFamily: 'Figtree, sans-serif', borderRadius: 0 }}
          MenuProps={{
            PaperProps: {
              sx: {
                borderRadius: 0
              }
            },
            MenuListProps: {
              sx: {
                paddingTop: 0,
                paddingBottom: 0
              }
            }
          }}
        >
          <MenuItem value="PTS" sx={{ fontFamily: 'Figtree, sans-serif' }}>Points</MenuItem>
          <MenuItem value="TRB" sx={{ fontFamily: 'Figtree, sans-serif' }}>Rebounds</MenuItem>
          <MenuItem value="AST" sx={{ fontFamily: 'Figtree, sans-serif' }}>Assists</MenuItem>
          <MenuItem value="FG%" sx={{ fontFamily: 'Figtree, sans-serif' }}>Field Goal %</MenuItem>
        </Select>
      )}

      <Divider textAlign="left">
        <Typography
          sx={{
            fontFamily: 'Russo One, sans-serif',
            color: 'rgba(0, 0, 0, 0.6)',
            fontSize: '1rem'
          }}
        >
          Stat Mode
        </Typography>
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
        {['Per Game', 'Per 36', 'Totals'].map((label) => (
          <ToggleButton key={label} value={label} sx={{
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '0.85rem',
            fontFamily: 'Figtree, sans-serif',
            borderRadius: 0,
            borderColor: '#BBC4CA',
            '&.Mui-selected': {
              backgroundColor: '#E6EEF9',
              color: '#0053BC',
              borderColor: '#0053BC',
              fontWeight: 600
            }
          }}>{label}</ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Button
        fullWidth
        variant="outlined"
        onClick={handleReset}
        startIcon={<RestartAltIcon />}
        sx={{
          textTransform: 'none',
          fontWeight: 500,
          fontFamily: 'Figtree, sans-serif',
          color: '#0053BC',
          borderColor: '#0053BC',
          borderRadius: 0,
        }}
      >
        Reset Filters
      </Button>
    </Box>
  );
}