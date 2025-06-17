
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MonsterBattleCard } from './MonsterBattleCard.extended';
import monstersData from '../../../data/monsters.json';

const mockOnClick = jest.fn();

describe('MonsterBattleCardExtended', () => {
  const testMonster = monstersData.monsters[0];

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders the monster card correctly with a monster', () => {
    render(
      <MonsterBattleCard 
        monster={testMonster} 
        onClick={mockOnClick}
      />
    );

    expect(screen.getByText(testMonster.name)).toBeInTheDocument();
    expect(screen.getByText(`HP: ${testMonster.hp}`)).toBeInTheDocument();
    expect(screen.getByText(`Attack: ${testMonster.attack}`)).toBeInTheDocument();
    expect(screen.getByText(`Defense: ${testMonster.defense}`)).toBeInTheDocument();
    expect(screen.getByText(`Speed: ${testMonster.speed}`)).toBeInTheDocument();
  });

  it('displays monster image correctly', () => {
    render(
      <MonsterBattleCard 
        monster={testMonster} 
        onClick={mockOnClick}
      />
    );

    const image = screen.getByAltText(testMonster.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', testMonster.imageUrl);
  });

  it('calls onClick when card is clicked', () => {
    render(
      <MonsterBattleCard 
        monster={testMonster} 
        onClick={mockOnClick}
      />
    );

    const card = screen.getByRole('button');
    fireEvent.click(card);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(testMonster.id);
  });

  it('renders correctly when monster is selected', () => {
    render(
      <MonsterBattleCard 
        monster={testMonster} 
        onClick={mockOnClick}
        isSelected={true}
      />
    );

    const card = screen.getByRole('button');
    expect(card).toHaveClass('selected');
  });

  it('renders correctly when monster is not selected', () => {
    render(
      <MonsterBattleCard 
        monster={testMonster} 
        onClick={mockOnClick}
        isSelected={false}
      />
    );

    const card = screen.getByRole('button');
    expect(card).not.toHaveClass('selected');
  });

  it('displays all monster stats correctly', () => {
    const redDragon = monstersData.monsters[2]; // Red Dragon with high stats
    render(
      <MonsterBattleCard 
        monster={redDragon} 
        onClick={mockOnClick}
      />
    );

    expect(screen.getByText('Red Dragon')).toBeInTheDocument();
    expect(screen.getByText('HP: 90')).toBeInTheDocument();
    expect(screen.getByText('Attack: 90')).toBeInTheDocument();
    expect(screen.getByText('Defense: 80')).toBeInTheDocument();
    expect(screen.getByText('Speed: 70')).toBeInTheDocument();
  });
});
