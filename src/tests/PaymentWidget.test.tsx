import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PaymentWidget from '../components/interactive-components/PaymentWidget';

describe('PaymentWidget', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<PaymentWidget onClose={mockOnClose} />);
    expect(screen.getByLabelText(/payment amount/i)).toBeInTheDocument();
    expect(screen.getByText(/process payment/i)).toBeInTheDocument();
  });

  it('shows loading state during submission', async () => {
    render(<PaymentWidget onClose={mockOnClose} />);
    
    await userEvent.type(screen.getByLabelText(/payment amount/i), '100');
    await userEvent.click(screen.getByText('Process Payment'));

    expect(screen.getByText('Processing...')).toBeInTheDocument();
  });

  it('validates amount before submission', async () => {
    render(<PaymentWidget onClose={mockOnClose} maxAmount={1000} />);
    
    const input = screen.getByLabelText(/payment amount/i);
    await userEvent.type(input, '2000');
    await userEvent.click(screen.getByText('Process Payment'));

    expect(screen.getByText(/amount cannot exceed/i)).toBeInTheDocument();
  });

  it('calculates service fee correctly', async () => {
    render(<PaymentWidget onClose={mockOnClose} />);
    
    const input = screen.getByLabelText(/payment amount/i);
    await userEvent.type(input, '100');

    expect(screen.getByText('Service Fee: $1.50')).toBeInTheDocument();
    expect(screen.getByText('Total: $101.50')).toBeInTheDocument();
  });

  it('shows success toast after successful payment', async () => {
    render(<PaymentWidget onClose={mockOnClose} />);
    
    await userEvent.type(screen.getByLabelText(/payment amount/i), '100');
    await userEvent.click(screen.getByText('Process Payment'));

    await waitFor(() => {
      expect(screen.getByText('Payment successful!')).toBeInTheDocument();
    });
  });
});