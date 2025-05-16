import React from 'react';
import styles from './styles/PlayerStatCards.module.css';

export default function BioMeasurementsCard({ player, measurements }) {
  const bioFields = [
    ['Birthdate', player.birthDate],
    ['Height (listed)', `${player.height} in`],
    ['Weight (listed)', `${player.weight} lbs`],
    ['Hometown', `${player.homeTown}${player.homeState ? ', ' + player.homeState : ''}`],
    ['High School', player.highSchool],
    ['League', player.league],
    ['Current Team', player.currentTeam],
  ];

  const measurementFields = measurements ? [
    ['Height (no shoes)', `${measurements.heightNoShoes}"`],
    ['Height (shoes)', `${measurements.heightShoes}"`],
    ['Wingspan', `${measurements.wingspan}"`],
    ['Reach', `${measurements.reach}"`],
    ['Max Vertical', `${measurements.maxVertical}"`],
    ['No-Step Vertical', `${measurements.noStepVertical}"`],
    ['Weight (measured)', `${measurements.weight} lbs`],
    ['Agility', measurements.agility],
    ['Sprint', measurements.sprint],
    ['Shuttle Best', measurements.shuttleBest],
  ] : [];

  return (
    <div className={styles.twoColumnGrid}>
      {[...bioFields, ...measurementFields]
        .filter(([_, value]) => value !== null && value !== undefined && value !== 'N/A')
        .map(([label, value]) => (
          <div key={label} className={styles.inlineFieldRow}>
            <strong>{label}:</strong> {value}
          </div>
        ))}
    </div>
  );
}