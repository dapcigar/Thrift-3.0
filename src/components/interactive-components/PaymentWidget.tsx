import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, X } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import Toast from '../common/Toast';
import { validateAmount } from '../../utils/validation';

export interface PaymentWidgetProps {
  onClose?: () => void;
  maxAmount?: number;
  minAmount?: number;
  defaultAmount?: number;
}

const PaymentWidget: React.FC<PaymentWidgetProps> = ({ 
  onClose,
  maxAmount = 10000,
  minAmount = 0,
  defaultAmount = 0
}) => {
  const [amount, setAmount] = useState(defaultAmount.toString());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const numAmount = parseFloat(amount);
    
    if (numAmount > maxAmount) {
      setError(`Amount cannot exceed $${maxAmount.toLocaleString()}`);
      return;
    }

    if (numAmount < minAmount) {
      setError(`Amount must be at least $${minAmount.toLocaleString()}`);
      return;
    }

    const validation = validateAmount(amount);
    if (!validation.isValid) {
      setError(validation.errors[0]?.message || 'Invalid amount');
      return;
    }

    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowToast(true);
      setAmount('');
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card
        title="Make Payment"
        className="w-full max-w-md mx-auto"
        headerAction={onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Close payment form"
            icon={<X className="h-4 w-4" />}
          />
        )}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Payment Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            startIcon={<DollarSign className="h-4 w-4 text-gray-400" />}
            placeholder="Enter amount"
            error={error}
            min={minAmount}
            max={maxAmount}
            step="0.01"
            disabled={loading}
            fullWidth
          />

          <div className="text-sm text-gray-500 space-y-1">
            {maxAmount && (
              <p>Maximum amount: ${maxAmount.toLocaleString()}</p>
            )}
            <p>Service Fee: ${amount ? (parseFloat(amount) * 0.015).toFixed(2) : '0.00'}</p>
            <p>
              Total: $
              {amount
                ? (parseFloat(amount) * 1.015).toFixed(2)
                : '0.00'}
            </p>
          </div>

          <Button
            type="submit"
            loading={loading}
            disabled={loading}
            fullWidth
            size="lg"
          >
            {loading ? 'Processing...' : 'Process Payment'}
          </Button>
        </form>
      </Card>

      <Toast
        isVisible={showToast}
        message="Payment successful!"
        type="success"
        onClose={() => setShowToast(false)}
      />
    </>
  );
};

export default PaymentWidget;