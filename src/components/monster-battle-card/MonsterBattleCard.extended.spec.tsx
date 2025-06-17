import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import monstersData from '../../../data/monsters.json';
import { Monster } from '../../models/interfaces/monster.interface';
import { MonsterBattleCardExtended } from './MonsterBattleCard.extended';

describe('MonsterBattleCardExtended', () => {
  it('renders the monster card correctly with a monster', () => {
    const mockMonster: Monster = monstersData[0];
    render(<MonsterBattleCardExtended monster={mockMonster} />);

    expect(screen.getByText(mockMonster.name)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockMonster.imageUrl);
  });
});
