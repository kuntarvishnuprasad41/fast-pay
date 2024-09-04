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
import axios from 'axios';
import { BASE_URL } from '@/base_url'; // Add your BASE_URL here

export function AddMerchantDialog({ handleAddMerchant }: any) {
  const [formData, setFormData] = useState({
    merchantName: '',
    contactNumber: '',
    email: '',
    address: '',
    gstNumber: '',
    creditLimit: '',
    debitLimit: '',
    upiId: '',
    accountHolder: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    qrCode: '' // For QR Code URL
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSave = async () => {
    const merchantData = {
      accountHolder: formData.accountHolder,
      accountNumber: formData.accountNumber,
      ifscCode: formData.ifscCode,
      bankName: formData.bankName,
      creditLimit: parseFloat(formData.creditLimit),
      debitLimit: parseFloat(formData.debitLimit),
      upiId: formData.upiId,
      level: formData.gstNumber, // Assuming gstNumber is the merchant's level.
      qrCode: formData.qrCode // This can be a URL or a file.
    };

    try {
      const response = await axios.post(`${BASE_URL}/merchant`, merchantData, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Merchant added successfully:', response.data);
      // Clear the form after successful save
      setFormData({
        merchantName: '',
        contactNumber: '',
        email: '',
        address: '',
        gstNumber: '',
        creditLimit: '',
        debitLimit: '',
        upiId: '',
        accountHolder: '',
        accountNumber: '',
        ifscCode: '',
        bankName: '',
        qrCode: ''
      });

      // Call the parent handler to refresh the merchant list
      if (handleAddMerchant) {
        handleAddMerchant(response.data);
      }
    } catch (error) {
      console.error('Error saving merchant details:', error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Merchant</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Merchant</DialogTitle>
          <DialogDescription>
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {[
            'merchantName',
            'contactNumber',
            'email',
            'address',
            'gstNumber',
            'creditLimit',
            'debitLimit',
            'upiId',
            'accountHolder',
            'accountNumber',
            'ifscCode',
            'bankName',
            'qrCode' // Adding QR Code field
          ].map((field) => (
            <div key={field} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={field} className="text-right">
                {field.replace(/([A-Z])/g, ' $1').trim()}
              </Label>
              <Input
                id={field}
                value={formData[field as keyof typeof formData]}
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
