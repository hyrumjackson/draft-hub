import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export default function FilterPanel() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>
        <Typography variant="body2" color="text.secondary">
          [Filter Panel Placeholder]
        </Typography>
      </CardContent>
    </Card>
  );
}