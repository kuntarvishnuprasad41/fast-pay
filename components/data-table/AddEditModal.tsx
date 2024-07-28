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

export function AddBankDialog({ handleAddBank }) {
  const [formData, setFormData] = useState({
    id: nanoid(16),
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
    setFormData((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSave = () => {
    // Save the formData as JSON
    // console.log(JSON.stringify(formData));
    handleAddBank();
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="accountHolderName" className="text-right">
              Account Holder Name
            </Label>
            <Input
              id="accountHolderName"
              value={formData.accountHolderName}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="accountNumber" className="text-right">
              Account Number
            </Label>
            <Input
              id="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ifscCode" className="text-right">
              IFSC Code
            </Label>
            <Input
              id="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bankName" className="text-right">
              Bank Name
            </Label>
            <Input
              id="bankName"
              value={formData.bankName}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="creditLimit" className="text-right">
              Credit Limit
            </Label>
            <Input
              id="creditLimit"
              value={formData.creditLimit}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="debitLimit" className="text-right">
              Debit Limit
            </Label>
            <Input
              id="debitLimit"
              value={formData.debitLimit}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="upiId" className="text-right">
              UPI Id
            </Label>
            <Input
              id="upiId"
              value={formData.upiId}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="level" className="text-right">
              Level
            </Label>
            <Input
              id="level"
              value={formData.level}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
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
