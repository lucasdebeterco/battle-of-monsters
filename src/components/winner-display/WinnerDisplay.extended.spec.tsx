
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { WinnerDisplay } from './WinnerDisplay.extended';

describe('WinnerDisplayExtended', () => {
  it('renders the winner text correctly', () => {
    const winnerText = 'Dead Unicorn Wins!';
    render(<WinnerDisplay text={winnerText} />);
    
    const winnerElement = screen.getByText(winnerText);
    expect(winnerElement).toBeInTheDocument();
  });

  it('renders empty text when no winner text is provided', () => {
    const { container } = render(<WinnerDisplay text="" />);
    
    const textElement = container.querySelector('.MuiTypography-root');
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveTextContent('');
  });

  it('renders tie message correctly', () => {
    const tieText = "It's a tie!";
    render(<WinnerDisplay text={tieText} />);
    
    const tieElement = screen.getByText(tieText);
    expect(tieElement).toBeInTheDocument();
  });

  it('applies correct styling to the winner text', () => {
    const winnerText = 'Red Dragon Wins!';
    render(<WinnerDisplay text={winnerText} />);
    
    const winnerElement = screen.getByText(winnerText);
    expect(winnerElement).toHaveClass('MuiTypography-root');
  });
});
