'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { MerchantListTable } from '@/components/data-table/MerchantListTable';
import { AddMerchantDialog } from '@/components/data-table/AddMerchantDialog';
import { BASE_URL } from '@/base_url';
export type MerchantDetails = {
  id: string;
  name: string;
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  creditLimit: number;
  debitLimit: number;
  upiId: string;
  level: string;
};

const Page = () => {
  const [merchantList, setMerchantList] = useState<MerchantDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMerchantList = async () => {
      try {
        const response = await axios.get(
          BASE_URL + '/merchants', // Replace with your merchant API URL
          {
            headers: {
              Authorization: `${localStorage.getItem('token')}` // Add your token if needed
            }
          }
        );
        setMerchantList(response.data);
      } catch (err) {
        setError('Failed to fetch merchant details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMerchantList();
  }, []);

  const handleAddMerchant = async (formData: FormData) => {
    try {
      const response = await axios.post(BASE_URL + '/merchant', formData, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setMerchantList([...merchantList, response.data]);
    } catch (err) {
      setError('Failed to add merchant details.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="mr-6 mt-6 flex w-[70vdw] justify-end">
        <AddMerchantDialog handleAddMerchant={handleAddMerchant} />
      </div>
      <MerchantListTable data={merchantList} />
    </>
  );
};

export default Page;
