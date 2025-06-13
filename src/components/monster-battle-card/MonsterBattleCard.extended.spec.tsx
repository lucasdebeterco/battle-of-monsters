import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { MonsterBattleCardExtended } from './MonsterBattleCard.extended';
import monstersData from '../../../data/monsters.json';

describe('MonsterBattleCardExtended', () => {
  it('renders the monster card correctly with a monster', () => {
    render(<MonsterBattleCardExtended monster={monstersData.monsters[0]} />);

    expect(screen.getByText(monstersData.monsters[0].name)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', monstersData.monsters[0].imageUrl);
    expect(screen.getByText('Combat power:')).toBeInTheDocument();
  });
});
