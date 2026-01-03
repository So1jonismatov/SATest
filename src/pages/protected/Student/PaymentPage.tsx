import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/context/AuthContext";
import { CheckCircle } from "lucide-react";

const PaymentPage = () => {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const plans = [
    {
      id: 'premium',
      name: 'Premium Plan',
      description: 'Access to all tests and premium features',
      price: 9.99,
      features: [
        'Unlimited test access',
        'Detailed performance analytics',
        'Advanced study tools',
        'Priority support'
      ]
    },
    {
      id: 'monthly',
      name: 'Monthly Test Access',
      description: 'Access to specific tests for one month',
      price: 4.99,
      features: [
        'Access to 5 tests',
        'Basic performance tracking',
        'Standard support'
      ]
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto p-4 max-w-2xl flex items-center justify-center h-[70vh]">
        <Card className="w-full text-center">
          <CardContent className="pt-8">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for your purchase, {user?.name}. Your premium access has been activated.
            </p>
            <Button onClick={() => setIsSuccess(false)}>Make Another Purchase</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const selectedPlanDetails = plans.find(plan => plan.id === selectedPlan);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Payment</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Plan Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Choose a Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="space-y-4">
              {plans.map((plan) => (
                <div 
                  key={plan.id}
                  className={`border rounded-lg p-4 ${selectedPlan === plan.id ? 'border-primary' : ''}`}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value={plan.id} id={plan.id} />
                    <div className="space-y-1">
                      <Label htmlFor={plan.id} className="font-semibold">
                        {plan.name} - ${plan.price.toFixed(2)}/mo
                      </Label>
                      <p className="text-sm text-muted-foreground">{plan.description}</p>
                      <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2 text-green-500" /> {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Payment Details */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nameOnCard">Name on Card</Label>
                <Input
                  id="nameOnCard"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="MM/YY"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    required
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-muted-foreground">Plan:</span>
                  <span className="font-medium">{selectedPlanDetails?.name}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium">${selectedPlanDetails?.price.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total:</span>
                    <span>${selectedPlanDetails?.price.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full mt-6"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing Payment...' : `Pay $${selectedPlanDetails?.price.toFixed(2)}`}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentPage;