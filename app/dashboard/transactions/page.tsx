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
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';

export type PaymentDetails = {
  id: number;
  screenshot: string;
  utrNumber: string;
  payment: {
    id: number;
    amount: number;
    status: string;
    merchantId: number;
    createdAt: string;
  };
};

const Page = () => {
  const [paymentList, setPaymentList] = useState<PaymentDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedProof, setSelectedProof] = useState<string | null>(null); // For showing modal

  useEffect(() => {
    const fetchPaymentList = async () => {
      try {
        const response = await axios.get(BASE_URL + '/payment-proofs', {
          headers: {
            Authorization: `${localStorage.getItem('token')}` // Add JWT token if needed
          }
        });
        setPaymentList(response.data);
      } catch (err) {
        setError('Failed to fetch payment details.');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentList();
  }, []);

  const handleStatusChange = async (
    paymentId: number,
    status: 'Verified' | 'Error'
  ) => {
    try {
      await axios.patch(
        `${BASE_URL}/payment/verify`,
        { paymentId, status },
        {
          headers: {
            Authorization: `${localStorage.getItem('token')}`
          }
        }
      );
      // Update the payment list after successful status change
      paymentList.map((p) => {
        if (p.id === paymentId) {
          p.status = status;
        }
        setPaymentList([...paymentList.filter((p) => p.id !== paymentId), p]);
      });
    } catch (err) {
      console.error('Error updating payment status:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Verified':
        return 'bg-green-800';
      case 'Error':
        return 'bg-red-800';
      case 'Pending':
        return 'bg-blue-800';
      default:
        return 'bg-blue-800';
    }
  };

  const columns: ColumnDef<PaymentDetails>[] = [
    {
      accessorKey: 'merchantId',
      header: 'Merchant Id'
    },
    {
      accessorKey: 'id',
      header: 'Payment ID'
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      size: 150
    },
    {
      accessorKey: 'utrNumber',
      header: 'UTR Number'
    },
    {
      accessorKey: 'status',
      header: 'Status'
    },
    {
      accessorKey: 'screenShot',
      header: 'Screenshot',
      cell: ({ row }) => {
        const screenshot = row.getValue('screenShot');
        return screenshot ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button onClick={() => setSelectedProof(screenshot)}>
                View Proof
              </Button>
            </DialogTrigger>
            <DialogContent>
              <div className="flex flex-col items-center justify-center space-y-4">
                <img src={screenshot} alt="Proof" className="max-w-full" />
                <Button onClick={() => setSelectedProof(null)}>Close</Button>
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          'No Image'
        );
      }
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const paymentProof = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                ...
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => handleStatusChange(paymentProof.id, 'Verified')}
                disabled={paymentProof.status === 'Verified'}
              >
                Verify
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleStatusChange(paymentProof.id, 'Error')}
                disabled={paymentProof.status === 'Error'}
              >
                Mark as Error
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }
  ];

  const table = useReactTable({
    data: paymentList,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Payment Proofs</h2>
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
                <TableRow
                  key={row.id}
                  className={getStatusColor(row.original.status)} // Apply background color based on status
                >
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
