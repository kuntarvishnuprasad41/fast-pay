

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

export function AddBankDialog({ handleAddBank }: any) {
  const [formData, setFormData] = useState({
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    creditLimit: '',
    debitLimit: '',
    upiId: '',
    level: '',
    amount: ''
  });

  const [qrCodeFile, setQrCodeFile] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id) {
      setFormData((prevState) => ({
        ...prevState,
        [id]: value
      }));
    }
  };

  const handleFileChange = (e) => {
    setQrCodeFile(e.target.files[0]);
  };

  const handleSave = async () => {
    const formDataToSend = new FormData();

    formDataToSend.append('userName', formData.accountHolderName);
    formDataToSend.append('accountNumber', formData.accountNumber);
    formDataToSend.append('ifscCode', formData.ifscCode);
    formDataToSend.append('bankName', formData.bankName);
    formDataToSend.append('creditLimit', formData.creditLimit);
    formDataToSend.append('debitLimit', formData.debitLimit);
    formDataToSend.append('upiId', formData.upiId);
    formDataToSend.append('level', formData.level);
    formDataToSend.append('amount', formData.amount);
    if (qrCodeFile) {
      formDataToSend.append('qrCode', qrCodeFile);
    }

    try {
      await handleAddBank(formDataToSend);

      // Clear the form
      setFormData({
        accountHolderName: '',
        accountNumber: '',
        ifscCode: '',
        bankName: '',
        creditLimit: '',
        debitLimit: '',
        upiId: '',
        level: '',
        amount: ''
      });
      setQrCodeFile(null);
    } catch (error) {
      console.error('Error saving bank details:', error);
    }
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="qrCodeFile" className="text-right">
              QR Code
            </Label>
            <Input
              id="qrCodeFile"
              type="file"
              onChange={handleFileChange}
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