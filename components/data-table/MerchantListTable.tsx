'use client';

import * as React from 'react';
import { ChevronDownIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

export type Merchant = {
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

export const columns: ColumnDef<Merchant>[] = [
  {
    accessorKey: 'id',
    header: 'Merchant ID'
  },
  {
    accessorKey: 'accountHolder',
    header: 'Merchant Name'
  },
  {
    accessorKey: 'accountHolder',
    header: 'Account Holder'
  },
  {
    accessorKey: 'accountNumber',
    header: 'Account Number'
  },
  {
    accessorKey: 'ifscCode',
    header: 'IFSC Code'
  },
  {
    accessorKey: 'bankName',
    header: 'Bank Name'
  },
  {
    accessorKey: 'creditLimit',
    header: () => <div className="text-right">Credit Limit</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('creditLimit'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR'
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
    size: 150
  },
  {
    accessorKey: 'debitLimit',
    header: () => <div className="text-right">Debit Limit</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('debitLimit'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR'
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
    size: 150
  },
  {
    accessorKey: 'upiId',
    header: 'UPI Id'
  },
  {
    accessorKey: 'level',
    header: 'Level'
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const merchant = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(merchant.id)}
            >
              Copy Merchant ID
            </DropdownMenuItem>
            <DropdownMenuItem>View Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

export function MerchantListTable({ data }: { data: Merchant[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  return (
    <div className="flex w-full justify-center">
      <div className="custom-scrollbar w-full px-[19px]">
        <div className="flex items-center py-4">
          <Input placeholder="Search merchants..." className="max-w-sm" />
        </div>
        <div className="w-full overflow-x-auto rounded-md border">
          <Table className="w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No merchants found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
