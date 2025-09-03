import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Eye, Search, Filter } from 'lucide-react';

// Mock data for applications
const mockApplications = [
  {
    id: 'APP001',
    propertyName: 'Executive Heights Block A',
    applicantName: 'Ahmed Khan',
    email: 'ahmed.khan@email.com',
    phone: '+92 300 1234567',
    appliedDate: '2024-01-15',
    status: 'pending',
    amount: '2500000',
    paymentPlan: 'Standard Plan'
  },
  {
    id: 'APP002',
    propertyName: 'Royal Residency Plot 45',
    applicantName: 'Fatima Ali',
    email: 'fatima.ali@email.com',
    phone: '+92 301 9876543',
    appliedDate: '2024-01-14',
    status: 'approved',
    amount: '1800000',
    paymentPlan: 'Installment Plan'
  },
  {
    id: 'APP003',
    propertyName: 'CBD Tower Suite 302',
    applicantName: 'Muhammad Hassan',
    email: 'm.hassan@email.com',
    phone: '+92 302 5555555',
    appliedDate: '2024-01-13',
    status: 'rejected',
    amount: '3200000',
    paymentPlan: 'Cash Payment'
  },
  {
    id: 'APP004',
    propertyName: 'Green Valley Plot 12',
    applicantName: 'Sara Sheikh',
    email: 'sara.sheikh@email.com',
    phone: '+92 303 7777777',
    appliedDate: '2024-01-12',
    status: 'pending',
    amount: '1500000',
    paymentPlan: 'Extended Plan'
  },
  {
    id: 'APP005',
    propertyName: 'Business Hub Office 501',
    applicantName: 'Omar Malik',
    email: 'omar.malik@email.com',
    phone: '+92 304 8888888',
    appliedDate: '2024-01-11',
    status: 'approved',
    amount: '4500000',
    paymentPlan: 'Premium Plan'
  }
];

export function ApplicationsList() {
  const [applications] = useState(mockApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-orange-600 border-orange-600">Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="text-green-600 border-green-600">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-600">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(parseInt(amount));
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Property Applications</CardTitle>
        </CardHeader>
        <CardContent className="pb-3 flex-1 flex flex-col">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2 h-3 w-3 text-gray-400" />
              <Input
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-7 h-8 text-sm"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40 h-8">
                <Filter className="w-3 h-3 mr-1" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Applications Table */}
          <div className="border rounded-lg flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">ID</TableHead>
                  <TableHead className="text-xs">Applicant</TableHead>
                  <TableHead className="text-xs">Property</TableHead>
                  <TableHead className="text-xs">Amount</TableHead>
                  <TableHead className="text-xs">Plan</TableHead>
                  <TableHead className="text-xs">Date</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="text-xs">{app.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="text-xs">{app.applicantName}</div>
                        <div className="text-xs text-gray-500">{app.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">{app.propertyName}</TableCell>
                    <TableCell className="text-xs">{formatCurrency(app.amount)}</TableCell>
                    <TableCell className="text-xs">{app.paymentPlan}</TableCell>
                    <TableCell className="text-xs">{new Date(app.appliedDate).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(app.status)}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedApplication(app.id)}
                        className="h-6 w-6 p-0"
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredApplications.length === 0 && (
            <div className="text-center py-4 text-gray-500 text-sm">
              No applications found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-3">
            <div className="font-bold text-orange-600">
              {applications.filter(app => app.status === 'pending').length}
            </div>
            <p className="text-xs text-gray-600">Pending Applications</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-3">
            <div className="font-bold text-green-600">
              {applications.filter(app => app.status === 'approved').length}
            </div>
            <p className="text-xs text-gray-600">Approved Applications</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-3">
            <div className="font-bold text-red-600">
              {applications.filter(app => app.status === 'rejected').length}
            </div>
            <p className="text-xs text-gray-600">Rejected Applications</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-3">
            <div className="font-bold text-blue-600 text-xs">
              {formatCurrency(applications.reduce((sum, app) => sum + parseInt(app.amount), 0).toString())}
            </div>
            <p className="text-xs text-gray-600">Total Applied Amount</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}