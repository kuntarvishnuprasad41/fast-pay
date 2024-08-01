'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { BankListTable } from '@/components/data-table/data-table';
import { AddBankDialog } from '@/components/data-table/AddEditModal';

export type BankDetails = {
  id: string;
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
  const [bankList, setBankList] = useState<BankDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBankList = async () => {
      try {
        const response = await axios.get('http://localhost:8009');
        setBankList(response.data);
      } catch (err) {
        setError('Failed to fetch bank details.');
      } finally {
        setLoading(false);
      }
    };

    fetchBankList();
  }, []);

  const handleAddBank = async (formData: BankDetails) => {
    try {
      const response = await axios.post('http://localhost:8009/', formData);
      setBankList([...bankList, response.data]);
    } catch (err) {
      setError('Failed to add bank details.');
    }
  };

  if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  return (
    <>
      <div className="mr-6 mt-6 flex w-[70vdw] justify-end">
        <AddBankDialog handleAddBank={handleAddBank} />
      </div>
      <BankListTable data={bankList} />
    </>
  );
};

export default Page;
