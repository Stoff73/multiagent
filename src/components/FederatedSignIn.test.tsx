import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FederatedSignIn from './FederatedSignIn';

describe('FederatedSignIn Component', () => {
  test('renders Google and Microsoft sign-in buttons', () => {
    const mockGoogleSignIn = jest.fn();
    const mockMicrosoftSignIn = jest.fn();

    render(
      <FederatedSignIn
        onGoogleSignIn={mockGoogleSignIn}
        onMicrosoftSignIn={mockMicrosoftSignIn}
      />
    );

    const googleButton = screen.getByRole('button', { name: /sign in with google/i });
    const microsoftButton = screen.getByRole('button', { name: /sign in with microsoft/i });

    expect(googleButton).toBeInTheDocument();
    expect(microsoftButton).toBeInTheDocument();
  });

  test('calls onGoogleSignIn when Google button is clicked', () => {
    const mockGoogleSignIn = jest.fn();
    const mockMicrosoftSignIn = jest.fn();

    render(
      <FederatedSignIn
        onGoogleSignIn={mockGoogleSignIn}
        onMicrosoftSignIn={mockMicrosoftSignIn}
      />
    );

    const googleButton = screen.getByRole('button', { name: /sign in with google/i });
    fireEvent.click(googleButton);

    expect(mockGoogleSignIn).toHaveBeenCalledTimes(1);
  });

  test('calls onMicrosoftSignIn when Microsoft button is clicked', () => {
    const mockGoogleSignIn = jest.fn();
    const mockMicrosoftSignIn = jest.fn();

    render(
      <FederatedSignIn
        onGoogleSignIn={mockGoogleSignIn}
        onMicrosoftSignIn={mockMicrosoftSignIn}
      />
    );

    const microsoftButton = screen.getByRole('button', { name: /sign in with microsoft/i });
    fireEvent.click(microsoftButton);

    expect(mockMicrosoftSignIn).toHaveBeenCalledTimes(1);
  });
});