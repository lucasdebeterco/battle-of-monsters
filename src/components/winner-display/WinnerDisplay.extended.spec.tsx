import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { WinnerDisplayExtended } from './WinnerDisplay.extended';

describe('WinnerDisplayExtended', () => {
  it('renders the winner text correctly when a winner name is provided', () => {
    const winnerName = 'Monster A';
    render(<WinnerDisplayExtended winnerName={winnerName} />);
    expect(screen.getByText(`${winnerName} wins!`)).toBeInTheDocument();
  });

  it('renders nothing when no winner name is provided', () => {
    const { container } = render(<WinnerDisplayExtended winnerName={''} />);
    expect(container).toBeEmptyDOMElement();
  });
});
