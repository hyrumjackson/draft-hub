import React from 'react';
import styles from './styles/PlayerStatCards.module.css';

export default function BioMeasurementsCard({ player, measurements }) {
  const measurementFields = measurements ? [
    ['Height (no shoes)', measurements.heightNoShoes != null ? `${measurements.heightNoShoes}"` : null],
    ['Height (shoes)', measurements.heightShoes != null ? `${measurements.heightShoes}"` : null],
    ['Wingspan', measurements.wingspan != null ? `${measurements.wingspan}"` : null],
    ['Standing Reach', measurements.reach != null ? `${measurements.reach}"` : null],
    ['Weight (measured)', measurements.weight != null ? `${measurements.weight} lbs` : null],
  ] : [];

  const athleticFields = measurements ? [
    ['Max Vertical', measurements.maxVertical != null ? `${measurements.maxVertical}"` : null],
    ['No-Step Vertical', measurements.noStepVertical != null ? `${measurements.noStepVertical}"` : null],
    ['Agility', measurements.agility ?? null],
    ['Sprint', measurements.sprint ?? null],
    ['Shuttle', measurements.shuttleBest ?? null],
    ['Hand Length', measurements.handLength ?? null],
    ['Hand Width', measurements.handWidth ?? null],
  ] : [];

  const hasMeasurements = measurementFields.some(([_, val]) => val != null);
  const hasAthletic = athleticFields.some(([_, val]) => val != null);

  if (!hasMeasurements && !hasAthletic) {
    return <div className={styles.noDataMessage}>No measurements available.</div>;
  }

  const section = (title, fields) => (
    <div>
      <h4 className={styles.statGroupTitle}>{title}</h4>
      <div className={styles.twoColumnGrid}>
        {fields
          .filter(([_, value]) => value != null)
          .map(([label, value]) => (
            <div key={label} className={styles.inlineFieldRow}>
              <strong>{label}:</strong> {value}
            </div>
          ))}
      </div>
    </div>
  );

  return (
    <div className={hasMeasurements && hasAthletic ? styles.sideBySideGrid : undefined}>
      {hasMeasurements && section('Measurements', measurementFields)}
      {hasAthletic && section('Athletic Testing', athleticFields)}
    </div>
  );
}