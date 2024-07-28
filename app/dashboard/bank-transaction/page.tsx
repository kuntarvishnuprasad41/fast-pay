'use client';
import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { BankListTable } from '@/components/data-table/data-table';
import { AddBankDialog } from '@/components/data-table/AddEditModal';

type BankDetails = {
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
  const bd: BankDetails[] = [
    {
      id: nanoid(16),
      accountHolderName: 'Vishnu',
      accountNumber: '5620474005',
      ifscCode: 'CBIN0280102',
      bankName: 'CENTRAL BANK OF INDIA',
      creditLimit: 100000,
      debitLimit: 50000,
      upiId: 'ashok@upi',
      level: 'Level1'
    },
    {
      id: nanoid(16),
      accountHolderName: 'Trishul',
      accountNumber: '120029499757',
      ifscCode: 'CNRB0071150',
      bankName: 'CANARA BANK',
      creditLimit: 200000,
      debitLimit: 100000,
      upiId: 'meetagri@upi',
      level: 'Level2'
    }
    // Add more data as needed
  ];

  const [bankList, setBankList] = useState<BankDetails[]>(bd);

  const handleAddBank = (formData: BankDetails) => {
    setBankList([...bankList, formData]);
  };

  return (
    <>
      <div className="mr-6 mt-6 flex w-[70vdw] justify-end">
        <AddBankDialog
          //   fromData={formData}
          //   setFormData={setFormData}
          handleAddBank={handleAddBank}
        />
      </div>
      <BankListTable data={bankList} />
    </>
  );
};

export default Page;
