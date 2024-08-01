import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { nanoid } from 'nanoid';

export function AddBankDialog({ handleAddBank }: any) {
  const [formData, setFormData] = useState({
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    creditLimit: '',
    debitLimit: '',
    upiId: '',
    level: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id) {
      setFormData((prevState) => ({
        ...prevState,
        [id]: value
      }));
    }
  };

  const handleSave = () => {
    // Map form data to API data keys
    const apiData = {
      accountNumber: formData.accountNumber,
      amount: parseFloat(formData.creditLimit), // Assuming amount corresponds to creditLimit
      bankName: formData.bankName,
      ifscCode: formData.ifscCode,
      upiId: formData.upiId,
      userName: formData.accountHolderName
    };

    // Pass the mapped data to handleAddBank
    handleAddBank(apiData);

    // Clear the form
    setFormData({
      accountHolderName: '',
      accountNumber: '',
      ifscCode: '',
      bankName: '',
      creditLimit: '',
      debitLimit: '',
      upiId: '',
      level: ''
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Bank</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Bank</DialogTitle>
          <DialogDescription>
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {[
            'accountHolderName',
            'accountNumber',
            'ifscCode',
            'bankName',
            'creditLimit',
            'debitLimit',
            'upiId',
            'level'
          ].map((field) => (
            <div key={field} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={field} className="text-right">
                {field.replace(/([A-Z])/g, ' $1').trim()}
              </Label>
              <Input
                id={field}
                value={formData[field]}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={handleSave}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
