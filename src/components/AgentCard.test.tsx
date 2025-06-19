import React from 'react';
import { render, screen } from '@testing-library/react';
import AgentCard from './AgentCard';

describe('AgentCard', () => {
  it('renders agent name and icon', () => {
    render(<AgentCard name="Test Agent" icon={<span data-testid="icon">Icon</span>} accentColor="#ff0000" />);
    expect(screen.getByText('Test Agent')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('applies accent color to border', () => {
    const { container } = render(<AgentCard name="Agent" icon={<div />} accentColor="#00ff00" />);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveStyle('border-left: 4px solid #00ff00');
  });

  it('has accessible role and label', () => {
    render(<AgentCard name="Accessible Agent" icon={<div />} />);
    const card = screen.getByRole('listitem');
    expect(card).toHaveAttribute('aria-label', 'Agent card for Accessible Agent');
    expect(card).toHaveAttribute('tabindex', '0');
  });
});