import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import WinnerDisplay from './WinnerDisplay';
import { Monster } from '../../models/interfaces/monster.interface';

// TODO complete tests
describe('WinnerDisplayExtended', () => {
  it('renders the winner text correctly', () => {
    const winner: Monster = { id: '1', name: 'Monster A', defense: 10, attack: 10, speed: 10, hp: 10, imageUrl: '' };
    render(<WinnerDisplay winner={winner} />);
    expect(screen.getByText(`${winner.name} wins!`)).toBeInTheDocument();
  });
});
