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

  function renderSection(title, fields) {
    const validFields = fields.filter(([_, value]) =>
      value !== null && value !== undefined && value !== 'N/A'
    );
    if (validFields.length === 0) return null;

    return (
      <div className={styles.statGroup}>
        <h4 className={styles.statGroupTitle}>{title}</h4>
        <div className={styles.twoColumnGrid}>
          {validFields.map(([label, value]) => (
            <div key={label} className={styles.inlineFieldRow}>
              <strong>{label}:</strong> {value}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {renderSection('Measurements', measurementFields)}
      {renderSection('Athletic Testing', athleticFields)}

      {measurementFields.length === 0 && athleticFields.length === 0 && (
        <div className={styles.noDataMessage}>
          No measurements available.
        </div>
      )}
    </div>
  );

}