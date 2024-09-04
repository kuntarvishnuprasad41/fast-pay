'use client';

import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import axios from 'axios';
import { BASE_URL } from '@/base_url';

interface SelectMerchantProps {
  onSelect: (merchantId: string) => void;
}

export function SelectMerchant({ onSelect }: SelectMerchantProps) {
  const [merchants, setMerchants] = useState<any[]>([]); // Store merchants from API

  useEffect(() => {
    // Fetch merchants from the backend API
    const fetchMerchants = async () => {
      try {
        const response = await axios.get(BASE_URL + '/merchants', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Add your token here
          }
        });
        setMerchants(response.data); // Assume the response data is an array of merchants
      } catch (error) {
        console.error('Error fetching merchants:', error);
      }
    };

    fetchMerchants();
  }, []);

  const handleSelect = (value: string) => {
    onSelect(value); // Call the onSelect prop with the selected merchant ID
  };

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Merchant" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Merchants</SelectLabel>
          {/* Dynamically map the fetched merchants into the dropdown */}
          {merchants.map((merchant) => (
            <SelectItem key={merchant.id} value={merchant.id}>
              {merchant.accountHolder}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
