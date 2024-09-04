import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export function SelectMerchant() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Merchant" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Merchants</SelectLabel>
          <SelectItem value="hari">Hari</SelectItem>
          <SelectItem value="punee">Punee</SelectItem>
          <SelectItem value="ridha">Ridha</SelectItem>
          <SelectItem value="semee">Semee</SelectItem>
          <SelectItem value="test">test</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
