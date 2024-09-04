import { NavItem } from '@/types';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};

export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active'
  }
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard',
    disabled: false
  },
  {
    title: 'Merchant Details',
    href: '/dashboard/merchant-details',
    icon: 'dashboard',
    label: 'Merchant Details',
    disabled: false
  },
  {
    title: 'Transaction',
    href: '/dashboard/transactions',
    icon: 'dashboard',
    label: 'Transaction',
    disabled: false
  },
  {
    title: 'Manual Bank',
    href: '/dashboard/bank-transaction',
    icon: 'dashboard',
    label: 'Manual Bank',
    disabled: false
  },
  {
    title: 'Payout',
    href: '/dashboard/payout',
    icon: 'dashboard',
    label: 'SS Transactions',
    disabled: false
  },
  {
    title: 'All  Payouts',
    href: '/dashboard/payoutsAll',
    icon: 'dashboard',
    label: 'SS Transactions',
    disabled: false
  },
  {
    title: 'SS Transactions',
    href: '/dashboard/ss-transactions',
    icon: 'dashboard',
    label: 'SS Transactions',
    disabled: true
  },
  {
    title: 'Payout',
    href: '/dashboard/payout',
    icon: 'dashboard',
    label: 'Payout',
    disabled: true
  },
  {
    title: 'Payout W Client',
    href: '/dashboard/payout-w-client',
    icon: 'dashboard',
    label: 'Payout W Client',
    disabled: true
  },

  {
    title: 'Transactions',
    href: '/dashboard/transactions',
    icon: 'dashboard',
    label: 'Transactions',
    disabled: false
  },
  {
    title: 'Bank Login',
    href: '/dashboard/bank-login',
    icon: 'dashboard',
    label: 'Bank Login',
    disabled: true
  },
  {
    title: 'Reconciliation',
    href: '/dashboard/reconciliation',
    icon: 'dashboard',
    label: 'Reconciliation',
    disabled: true
  },
  {
    title: 'Debit Bank',
    href: '/dashboard/debit-bank',
    icon: 'dashboard',
    label: 'Debit Bank',
    disabled: true
  },
  {
    title: 'Settlement',
    href: '/dashboard/settlement',
    icon: 'dashboard',
    label: 'Settlement',
    disabled: true
  },
  {
    title: 'Payout Credit',
    href: '/dashboard/payout-credit',
    icon: 'dashboard',
    label: 'Payout Credit',
    disabled: true
  },
  {
    title: 'Report',
    href: '/dashboard/report',
    icon: 'dashboard',
    label: 'Report',
    disabled: true
  },
  {
    title: 'Support Logs',
    href: '/dashboard/support-logs',
    icon: 'dashboard',
    label: 'Support Logs',
    disabled: true
  },
  {
    title: 'Payin Summery',
    href: '/dashboard/payin-summary',
    icon: 'dashboard',
    label: 'Payin Summery',
    disabled: true
  },
  {
    title: 'Webhook Event',
    href: '/dashboard/webhook-event',
    icon: 'dashboard',
    label: 'Webhook Event',
    disabled: true
  },
  {
    title: 'Almaron',
    href: '/dashboard/almaron',
    icon: 'dashboard',
    label: 'Almaron',
    disabled: true
  },
  {
    title: 'Bank Statement',
    href: '/dashboard/bank-statement',
    icon: 'dashboard',
    label: 'Bank Statement',
    disabled: true
  },
  {
    title: 'User',
    href: '/dashboard/user',
    icon: 'user',
    label: 'user'
  },
  {
    title: 'Employee',
    href: '/dashboard/employee',
    icon: 'employee',
    label: 'employee'
  },
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: 'profile',
    label: 'profile'
  },
  {
    title: 'Kanban',
    href: '/dashboard/kanban',
    icon: 'kanban',
    label: 'kanban'
  },
  {
    title: 'Login',
    href: '/',
    icon: 'login',
    label: 'login'
  }
];
