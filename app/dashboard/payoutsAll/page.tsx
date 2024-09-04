'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/base_url';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export type PayoutDetails = {
  id: number;
  payoutAmount: number;
  merchant: {
    accountHolder: string;
    accountNumber: string;
    bankName: string;
  };
  createdAt: string;
  status: string;
};

const Page = () => {
  const [payoutList, setPayoutList] = useState<PayoutDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [globalFilter, setGlobalFilter] = useState('');

  useEffect(() => {
    const fetchPayoutList = async () => {
      try {
        const response = await axios.get(BASE_URL + '/payouts', {
          headers: {
            Authorization: `${localStorage.getItem('token')}` // Add JWT token if needed
          }
        });
        setPayoutList(response.data);
      } catch (err) {
        setError('Failed to fetch payouts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPayoutList();
  }, []);

  const columns: ColumnDef<PayoutDetails>[] = [
    {
      accessorKey: 'merchant.accountHolder',
      header: 'Merchant Name'
    },
    {
      accessorKey: 'merchant.accountNumber',
      header: 'Account Number'
    },
    {
      accessorKey: 'merchant.bankName',
      header: 'Bank Name'
    },
    {
      accessorKey: 'payoutAmount',
      header: 'Payout Amount',
      size: 150
    },
    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell: ({ row }) =>
        new Date(row.getValue('createdAt')).toLocaleDateString()
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status');
        return (
          <span
            className={`rounded-full px-2 py-1 text-white ${getStatusColor(
              status
            )}`}
          >
            {status}
          </span>
        );
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-800';
      case 'Pending':
        return 'bg-yellow-800';
      case 'Failed':
        return 'bg-red-800';
      default:
        return 'bg-blue-800';
    }
  };

  const table = useReactTable({
    data: payoutList,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Payouts</h2>
      <div className="mt-4">
        <Input
          placeholder="Search..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
        />
      </div>

      <div className="mt-6 w-full overflow-auto">
        <Table>
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
                <TableCell colSpan={columns.length} className="text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
