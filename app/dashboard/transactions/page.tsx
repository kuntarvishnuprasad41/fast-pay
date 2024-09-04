'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BankListTable } from '@/components/data-table/data-table';
import { AddBankDialog } from '@/components/data-table/AddEditModal';
import Image from 'next/image';

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

export type PaymentDetails = {
  id: string;
  userName: string;
  amount: string;
  utrCode: string;
  fileUrl: string;
};

const Page = () => {
  const [bankList, setBankList] = useState<BankDetails[]>([]);
  const [paymentList, setPaymentList] = useState<PaymentDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBankList = async () => {
      try {
        const response = await axios.get('https://api.vishnuprasadkuntar.me/banks');
        setBankList(response.data);
      } catch (err) {
        setError('Failed to fetch bank details.');
      } finally {
        setLoading(false);
      }
    };

    const fetchPaymentList = async () => {
      try {
        const response = await axios.get('https://api.vishnuprasadkuntar.me/payments');
        setPaymentList(response.data);
      } catch (err) {
        setError('Failed to fetch payment details.');
      } finally {
        setLoading(false);
      }
    };

    fetchBankList();
    fetchPaymentList();
  }, []);

  const handleAddBank = async (formData: FormData) => {
    try {
      const response = await axios.post(
        'https://api.vishnuprasadkuntar.me/banks',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setBankList([...bankList, response.data]);
    } catch (err) {
      setError('Failed to add bank details.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="mr-6 mt-6 flex w-[70vdw] justify-end">
        {/* <AddBankDialog handleAddBank={handleAddBank} /> */}
      </div>
      {/* <BankListTable data={bankList} /> */}

      <div className="mt-10">
        <h2 className="text-2xl font-bold">Payment Proofs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {paymentList.map(payment => (
            <div key={payment.id} className="p-4 border rounded-lg shadow-md">
              <p><strong>User Name:</strong> {payment.userName}</p>
              <p><strong>Amount:</strong> {payment.amount}</p>
              <p><strong>UTR Code:</strong> {payment.utrCode}</p>
              {payment.fileUrl && (
                <Image
                  src={`https://api.vishnuprasadkuntar.me${payment.fileUrl}`}
                  alt={`Proof by ${payment.userName}`}
                  width={350}
                  height={350}
                  className="mt-2"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
