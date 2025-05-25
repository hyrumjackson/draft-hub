import React from 'react';
import styles from './styles/PlayerStatCards.module.css';
import { Tooltip } from '@mui/material';

export default function BioMeasurementsCard({ player, measurements, allMeasurements }) {
  const tierThresholds = (key, invert = false) => {
    const values = allMeasurements
      ?.map(p => p?.[key])
      .filter(v => typeof v === 'number');

    if (!values || values.length < 10) return null;

    const sorted = [...values].sort((a, b) => a - b);
    const top25 = sorted[Math.floor(0.75 * sorted.length)];
    const bottom25 = sorted[Math.floor(0.25 * sorted.length)];
    const elite = invert ? sorted[0] : sorted[sorted.length - 1];

    return { top25, bottom25, elite, invert };
  };

  const getTierIcon = (key, value) => {
    const invert = ['agility', 'sprint', 'shuttleBest'].includes(key);
    const thresholds = tierThresholds(key, invert);
    if (!thresholds || value == null) return null;

    const { top25, bottom25, elite } = thresholds;

    if (value === elite) {
      return (
        <Tooltip
          title="Top 10%"
          arrow
          placement="top"
          componentsProps={{
            tooltip: {
              sx: {
                fontSize: '0.85rem',
                padding: '0.5rem 0.75rem',
                color: '#fff',
                backgroundColor: '#00285E',
                borderRadius: 0,
                fontFamily: 'Figtree, sans-serif',
              },
            },
            arrow: {
              sx: {
                color: '#00285E',
              },
            },
          }}
        >
          <span className={styles.eliteIcon}>★</span>
        </Tooltip>
      );
    }

    if ((!invert && value < bottom25) || (invert && value > top25)) {
      return (
        <Tooltip
          title="Bottom 25%"
          arrow
          placement="top"
          componentsProps={{
            tooltip: {
              sx: {
                fontSize: '0.85rem',
                padding: '0.5rem 0.75rem',
                color: '#fff',
                backgroundColor: '#00285E',
                borderRadius: 0,
                fontFamily: 'Figtree, sans-serif',
              },
            },
            arrow: {
              sx: {
                color: '#00285E',
              },
            },
          }}
        >
          <span className={styles.redDot} />
        </Tooltip>
      );
    }

    if ((!invert && value > top25) || (invert && value < bottom25)) {
      return (
        <Tooltip
          title="Top 25%"
          arrow
          placement="top"
          componentsProps={{
            tooltip: {
              sx: {
                fontSize: '0.85rem',
                padding: '0.5rem 0.75rem',
                color: '#fff',
                backgroundColor: '#00285E',
                borderRadius: 0,
                fontFamily: 'Figtree, sans-serif',
              },
            },
            arrow: {
              sx: {
                color: '#00285E',
              },
            },
          }}
        >
          <span className={styles.greenDot} />
        </Tooltip>
      );
    }

    return null;
  };

  const measurementFields = measurements ? [
    ['Height (no shoes)', measurements.heightNoShoes, '"'],
    ['Height (shoes)', measurements.heightShoes, '"'],
    ['Wingspan', measurements.wingspan, '"'],
    ['Standing Reach', measurements.reach, '"'],
    ['Weight (measured)', measurements.weight, ' lbs'],
    ['Hand Length', measurements.handLength, '"'],
    ['Hand Width', measurements.handWidth, '"'],
  ] : [];

  const athleticFields = measurements ? [
    ['Max Vertical', measurements.maxVertical, '"', 'maxVertical'],
    ['No-Step Vertical', measurements.noStepVertical, '"', 'noStepVertical'],
    ['Agility', measurements.agility, ' sec', 'agility'],
    ['Sprint', measurements.sprint, ' sec', 'sprint'],
    ['Shuttle', measurements.shuttleBest, ' sec', 'shuttleBest'],
  ] : [];

  const hasMeasurements = measurementFields.some(([_, val]) => val != null);
  const hasAthletic = athleticFields.some(([_, val]) => val != null);

  if (!hasMeasurements && !hasAthletic) {
    return <div className={styles.noDataMessage}>No measurements available.</div>;
  }

  const renderSection = (title, fields, showTiers = false) => (
    <div>
      <h4 className={styles.statGroupTitle}>{title}</h4>
      <div className={styles.twoColumnGrid}>
        {fields
          .filter(([_, value]) => value != null)
          .map(([label, value, unit, key]) => (
            <div key={label} className={styles.inlineFieldRow}>
              <strong>{label}:</strong> {`${value}${unit || ''}`}
              {showTiers && getTierIcon(key ?? label.toLowerCase().replace(/\s/g, ''), value)}
            </div>
          ))}
      </div>
    </div>
  );

  return (
    <div className={hasMeasurements && hasAthletic ? styles.sideBySideGrid : undefined}>
      {hasMeasurements && renderSection('Measurements', measurementFields)}
      {hasAthletic && renderSection('Athletic Testing', athleticFields, true)}
    </div>
  );
}