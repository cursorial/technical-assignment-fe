import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/js/App';

describe('App', () => {
  it('renders the title and the options', () => {
    const { getByText } = render(<App />);

    expect(getByText('Choose your fighter!')).toBeInTheDocument();
    expect(getByText('rock')).toBeInTheDocument();
    expect(getByText('paper')).toBeInTheDocument();
    expect(getByText('scissors')).toBeInTheDocument();
  });

  it('simulates a game between two computer players', async () => {
    const { getByText, getByTestId } = render(<App />);

    fireEvent.click(getByText('Simulate Game'));

    await waitFor(() => {
      expect(getByTestId('ai-vs-ai')).toBeInTheDocument();
    });
  });

  it('resets the game when the reset button is clicked', async () => {
    const { getByText, queryByTestId } = render(<App />);

    fireEvent.click(getByText('Simulate Game'));
    fireEvent.click(getByText('Reset Game'));

    await waitFor(() => {
      expect(queryByTestId('ai-vs-ai')).not.toBeInTheDocument();
      expect(queryByTestId('human-vs-ai')).not.toBeInTheDocument();
    });
  });

  it('simulates a game between a human player and a computer player', async () => {
    const { getByText, getByTestId } = render(<App />);

    fireEvent.click(getByText('rock'));

    await waitFor(() => {
      expect(getByTestId('human-vs-ai')).toBeInTheDocument();
    });
  });
});
