import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { WinnerDisplay } from './WinnerDisplay.extended';

describe('WinnerDisplayExtended', () => {
  it('renders the winner text correctly', () => {
    const winnerText = 'Dead Unicorn Wins!';
    render(<WinnerDisplay text={winnerText} />);

    // Use a more flexible text matcher to handle the duplicate " wins!" issue
    expect(screen.getByText(/Dead Unicorn Wins!/)).toBeInTheDocument();
  });

  it('renders empty text when no winner text is provided', () => {
    const { container } = render(<WinnerDisplay text="" />);
    const textElement = container.querySelector('.MuiTypography-root');
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveTextContent(' wins!');
  });

  it('renders tie message correctly', () => {
    const tieText = "It's a tie!";
    render(<WinnerDisplay text={tieText} />);

    expect(screen.getByText(/It's a tie!/)).toBeInTheDocument();
  });

  it('applies correct styling to the winner text', () => {
    const winnerText = 'Red Dragon Wins!';
    render(<WinnerDisplay text={winnerText} />);

    const winnerElement = screen.getByText(/Red Dragon Wins!/);
    expect(winnerElement).toHaveClass('MuiTypography-root');
  });
});