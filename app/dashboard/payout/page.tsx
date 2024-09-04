'use client';
import { useEffect, useState } from 'react';
import PageContainer from '@/components/layout/page-container';
import { SelectMerchant } from '@/components/merchantDropDown/MerchantDropDown';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import axios from 'axios';
import { BASE_URL } from '@/base_url';
import { Modal } from '@/components/ui/modal'; // Assuming you have a modal component
import { Input } from '@/components/ui/input'; // Assuming you're using a custom input component

export default function Page() {
  const [selectedMerchant, setSelectedMerchant] = useState(null); // To hold selected merchant ID
  const [merchantDetails, setMerchantDetails] = useState(null); // To hold merchant details
  const [payoutAmount, setPayoutAmount] = useState(''); // Controlled input for payout amount
  const [error, setError] = useState(null); // To hold any payout error
  const [isPayoutModalOpen, setPayoutModalOpen] = useState(false); // To control the payout modal
  const [validationError, setValidationError] = useState(null); // To hold validation error

  // Fetch merchant details whenever a merchant is selected
  useEffect(() => {
    if (selectedMerchant) {
      fetchMerchantDetails(selectedMerchant);
    }
  }, [selectedMerchant]);

  const fetchMerchantDetails = async (merchantId: string) => {
    try {
      const response = await axios.get(
        BASE_URL + `/merchant-details/${merchantId}`,
        {
          headers: {
            Authorization: `${localStorage.getItem('token')}` // Add your token here
          }
        }
      );
      setMerchantDetails(response.data);
      console.log(response.data);
      // Update state with merchant details
    } catch (error) {
      console.error('Error fetching merchant details:', error);
    }
  };

  const handlePayout = async () => {
    const toBeSettled = merchantDetails?.payInDetails?.toBeSettled || 0;

    // Validate if the entered amount is greater than toBeSettled
    if (parseFloat(payoutAmount) > toBeSettled) {
      setValidationError(`Payout amount cannot exceed ₹${toBeSettled}`);
      return;
    }

    setValidationError(null); // Clear any previous validation error

    try {
      const response = await axios.post(
        `${BASE_URL}/payout`,
        {
          merchantId: selectedMerchant,
          payoutAmount: parseFloat(payoutAmount)
        },
        {
          headers: {
            Authorization: `${localStorage.getItem('token')}` // Add your token here
          }
        }
      );
      console.log('Payout successful', response.data);
      // Optionally refresh merchant details after payout
      alert('Payment Success');
      fetchMerchantDetails(selectedMerchant);
    } catch (error) {
      setError('Payout failed. Please try again.');
      setPayoutModalOpen(true);
    }
  };

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="payout" disabled>
              Payout
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            {/* Select Merchant Dropdown */}
            <SelectMerchant onSelect={setSelectedMerchant} />

            {merchantDetails && (
              <>
                <h2 className="text-l font-bold tracking-tight">
                  Pay Out Details
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Load Balance
                      </CardTitle>
                      ₹
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        ₹{merchantDetails.payOutDetails.totalLoadBalance}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Available Balance
                      </CardTitle>
                      ₹
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        ₹{merchantDetails.payOutDetails.availableBalance}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        To Be Settled
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        ₹{merchantDetails.payInDetails.toBeSettled}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Input for Manual Payout Amount */}
                <div className="mt-4">
                  <label
                    htmlFor="payoutAmount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Enter Payout Amount
                  </label>
                  <Input
                    id="payoutAmount"
                    type="number"
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(e.target.value)}
                    className="mt-1 block w-full"
                    placeholder="Enter payout amount"
                  />
                  {validationError && (
                    <p className="mt-2 text-sm text-red-500">
                      {validationError}
                    </p>
                  )}
                </div>

                {/* Payout Button */}
                <Button onClick={handlePayout} className="mt-4">
                  Initiate Payout
                </Button>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Error Modal */}
      <Modal open={isPayoutModalOpen} onClose={() => setPayoutModalOpen(false)}>
        <div className="p-4">
          <h2 className="text-xl font-bold">Error</h2>
          <p>{error}</p>
          <Button onClick={() => setPayoutModalOpen(false)} className="mt-4">
            Close
          </Button>
        </div>
      </Modal>
    </PageContainer>
  );
}
