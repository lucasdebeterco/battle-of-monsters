import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MonsterBattleCard } from './MonsterBattleCard.extended';
import monstersData from '../../../data/monsters.json';

describe('MonsterBattleCardExtended', () => {
  const testMonster = monstersData.monsters[0];

  it('renders the monster card correctly with a monster', () => {
    render(
      <MonsterBattleCard 
        monster={testMonster} 
        title="Test Monster"
      />
    );

    expect(screen.getByText('Test Monster')).toBeInTheDocument();
    expect(screen.getByText(testMonster.hp.toString())).toBeInTheDocument();
    expect(screen.getByText(testMonster.attack.toString())).toBeInTheDocument();
    expect(screen.getByText(testMonster.defense.toString())).toBeInTheDocument();
  });

  it('displays monster image correctly', () => {
    render(
      <MonsterBattleCard 
        monster={testMonster} 
        title="Test Monster"
      />
    );

    const image = screen.getByAltText(testMonster.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', testMonster.imageUrl);
  });

  it('renders correctly with title only', () => {
    render(
      <MonsterBattleCard 
        title="No Monster Selected"
      />
    );

    expect(screen.getByText('No Monster Selected')).toBeInTheDocument();
  });

  it('displays all monster stats correctly', () => {
    const testMonster = monstersData.monsters[2]; // Red Dragon with HP: 90, Attack: 90, Defense: 80, Speed: 70

    render(
      <MonsterBattleCard 
        monster={testMonster} 
        title="Red Dragon Card"
      />
    );

    expect(screen.getByText('Red Dragon Card')).toBeInTheDocument();
    expect(screen.getAllByText('90')).toHaveLength(2); // HP and Attack both have value 90
    expect(screen.getByText('80')).toBeInTheDocument(); // Defense
    expect(screen.getByText('70')).toBeInTheDocument(); // Speed
  });

  it('renders with monster stats display', () => {
    render(
      <MonsterBattleCard 
        monster={testMonster} 
        title="Monster Stats"
      />
    );

    // Check for HP label and value display structure
    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('Attack')).toBeInTheDocument();
    expect(screen.getByText('Defense')).toBeInTheDocument();
  });
});