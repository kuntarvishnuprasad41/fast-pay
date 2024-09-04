'use client';
import { useEffect, useState } from 'react';
import { AreaGraph } from '@/components/charts/area-graph';
import { BarGraph } from '@/components/charts/bar-graph';
import { PieGraph } from '@/components/charts/pie-graph';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import PageContainer from '@/components/layout/page-container';
import { SelectMerchant } from '@/components/merchantDropDown/MerchantDropDown';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import axios from 'axios';
import { BASE_URL } from '@/base_url';

export default function Page() {
  const [selectedMerchant, setSelectedMerchant] = useState(null); // To hold selected merchant ID
  const [merchantDetails, setMerchantDetails] = useState(null); // To hold merchant details

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
      setMerchantDetails(response.data); // Update state with merchant details

      console.log(response.data);
      
    } catch (error) {
      console.error('Error fetching merchant details:', error);
    }
  };

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>

          <div className="hidden items-center space-x-2 md:flex">
            <CalendarDateRangePicker />
            {/* <Button>Download</Button> */}
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analytics
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            {/* Select Merchant Dropdown */}
            <SelectMerchant onSelect={setSelectedMerchant} />

            {merchantDetails && (
              <>
                <h2 className="text-l font-bold tracking-tight">
                  Pay In Details
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Today&apos;s Pay In
                      </CardTitle>
                      ₹
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        ₹{merchantDetails.payInDetails.todayPayIn}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        +20.1% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Settled Balance
                      </CardTitle>
                      ₹
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        ₹{merchantDetails.payInDetails.settledBalance}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        +180.1% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Unsettled Balance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        ₹{merchantDetails.payInDetails.unsettledBalance}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        +19% from last month
                      </p>
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
                      <p className="text-xs text-muted-foreground">
                        +19% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Pay In Charges
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        ₹{merchantDetails.payInDetails.payInCharges}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        +19% from last month
                      </p>
                    </CardContent>
                  </Card>
                </div>

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
                      <p className="text-xs text-muted-foreground">+20.1%</p>
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
                      <p className="text-xs text-muted-foreground">+180.1%</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Payout
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        ₹{merchantDetails.payOutDetails.totalPayout}
                      </div>
                      <p className="text-xs text-muted-foreground">+19%</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Payout Charges
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        ₹{merchantDetails.payOutDetails.payoutCharges}
                      </div>
                      <p className="text-xs text-muted-foreground">+20%</p>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
