import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardGrid from './DashboardGrid';

const agents = [
  { id: '1', name: 'Agent One', icon: <span data-testid="icon1">Icon1</span>, accentColor: '#ff0000' },
  { id: '2', name: 'Agent Two', icon: <span data-testid="icon2">Icon2</span>, accentColor: '#00ff00' },
];

describe('DashboardGrid', () => {
  it('renders agent cards', () => {
    render(<DashboardGrid agents={agents} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByText('Agent One')).toBeInTheDocument();
    expect(screen.getByText('Agent Two')).toBeInTheDocument();
    expect(screen.getByTestId('icon1')).toBeInTheDocument();
    expect(screen.getByTestId('icon2')).toBeInTheDocument();
  });

  it('has accessible role and label', () => {
    render(<DashboardGrid agents={agents} />);
    const list = screen.getByRole('list');
    expect(list).toHaveAttribute('aria-label', 'Agent dashboard grid');
  });
});