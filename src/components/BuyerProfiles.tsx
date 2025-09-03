import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Search, Phone, Mail, MapPin, Calendar, CreditCard, Home, Ruler, FileText, DollarSign } from 'lucide-react';

// Mock data for buyers
const mockBuyers = [
  {
    id: 'BUY001',
    name: 'Ahmed Khan',
    email: 'ahmed.khan@email.com',
    phone: '+92 300 1234567',
    address: 'House 123, Block A, Gulberg, Lahore',
    cnic: '35201-1234567-8',
    joinDate: '2024-01-15',
    propertyPurchased: 'Executive Heights Block A',
    totalAmount: 2500000,
    paidAmount: 500000,
    remainingAmount: 2000000,
    paymentPlan: 'Standard Plan (24 months)',
    paymentStatus: 'current',
    nextPaymentDue: '2024-02-15',
    payments: [
      { date: '2024-01-15', amount: 500000, type: 'Down Payment', status: 'paid' },
      { date: '2024-02-15', amount: 83333, type: 'Monthly Installment', status: 'upcoming' },
      { date: '2024-03-15', amount: 83333, type: 'Monthly Installment', status: 'upcoming' }
    ],
    propertyDetails: {
      name: 'Executive Heights Block A',
      photo: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=500&h=300&fit=crop',
      sqFeet: 2200,
      processingFees: 50000,
      plotSize: 5,
      plotUnit: 'marla',
      description: 'Premium residential plot in the heart of CBD Punjab with modern infrastructure, wide roads, and 24/7 security. Perfect for building your dream home with easy access to commercial areas.',
      paymentPlans: [
        { name: 'Standard Plan', downPayment: '20%', monthlyInstallments: '83,333', duration: '24 months' },
        { name: 'Extended Plan', downPayment: '15%', monthlyInstallments: '62,500', duration: '36 months' }
      ],
      features: ['24/7 Security', 'Underground Utilities', 'Wide Roads', 'Green Spaces', 'Mosque', 'Shopping Center']
    }
  },
  {
    id: 'BUY002',
    name: 'Fatima Ali',
    email: 'fatima.ali@email.com',
    phone: '+92 301 9876543',
    address: 'Apartment 45B, DHA Phase 5, Karachi',
    cnic: '42101-9876543-2',
    joinDate: '2024-01-14',
    propertyPurchased: 'Royal Residency Plot 45',
    totalAmount: 1800000,
    paidAmount: 900000,
    remainingAmount: 900000,
    paymentPlan: 'Installment Plan (12 months)',
    paymentStatus: 'current',
    nextPaymentDue: '2024-02-14',
    payments: [
      { date: '2024-01-14', amount: 540000, type: 'Down Payment', status: 'paid' },
      { date: '2024-01-29', amount: 90000, type: 'Monthly Installment', status: 'paid' },
      { date: '2024-02-14', amount: 90000, type: 'Monthly Installment', status: 'upcoming' }
    ],
    propertyDetails: {
      name: 'Royal Residency Plot 45',
      photo: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=300&fit=crop',
      sqFeet: 1800,
      processingFees: 35000,
      plotSize: 3,
      plotUnit: 'marla',
      description: 'Beautiful residential plot in Royal Residency with modern amenities, landscaped gardens, and excellent connectivity to main roads. Ideal for family homes.',
      paymentPlans: [
        { name: 'Quick Plan', downPayment: '30%', monthlyInstallments: '90,000', duration: '12 months' },
        { name: 'Standard Plan', downPayment: '25%', monthlyInstallments: '75,000', duration: '18 months' }
      ],
      features: ['Gated Community', 'Landscaped Gardens', 'Community Center', 'Playground', 'Backup Power', 'Water Supply']
    }
  },
  {
    id: 'BUY003',
    name: 'Omar Malik',
    email: 'omar.malik@email.com',
    phone: '+92 304 8888888',
    address: 'Villa 12, Bahria Town, Islamabad',
    cnic: '61101-8888888-4',
    joinDate: '2024-01-11',
    propertyPurchased: 'Business Hub Office 501',
    totalAmount: 4500000,
    paidAmount: 4500000,
    remainingAmount: 0,
    paymentPlan: 'Cash Payment',
    paymentStatus: 'completed',
    nextPaymentDue: null,
    payments: [
      { date: '2024-01-11', amount: 4500000, type: 'Full Payment', status: 'paid' }
    ],
    propertyDetails: {
      name: 'Business Hub Office 501',
      photo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=300&fit=crop',
      sqFeet: 3500,
      processingFees: 75000,
      plotSize: 1,
      plotUnit: 'kanal',
      description: 'Premium commercial office space in the Business Hub with panoramic city views, modern facilities, and strategic location. Perfect for corporate headquarters and business operations.',
      paymentPlans: [
        { name: 'Cash Payment', downPayment: '100%', monthlyInstallments: '0', duration: '0 months' },
        { name: 'Corporate Plan', downPayment: '50%', monthlyInstallments: '187,500', duration: '12 months' }
      ],
      features: ['Prime Location', 'High-Speed Elevators', 'Conference Rooms', 'Parking Space', 'HVAC System', 'Fiber Internet']
    }
  }
];

export function BuyerProfiles() {
  const [buyers] = useState(mockBuyers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBuyer, setSelectedBuyer] = useState<string | null>(null);

  const filteredBuyers = buyers.filter(buyer =>
    buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    buyer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    buyer.propertyPurchased.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'current':
        return <Badge variant="outline" className="text-green-600 border-green-600">Current</Badge>;
      case 'overdue':
        return <Badge variant="outline" className="text-red-600 border-red-600">Overdue</Badge>;
      case 'completed':
        return <Badge variant="outline" className="text-blue-600 border-blue-600">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const calculatePaymentProgress = (paid: number, total: number) => {
    return (paid / total) * 100;
  };

  const selectedBuyerData = selectedBuyer ? buyers.find(b => b.id === selectedBuyer) : null;

  return (
    <div className="h-full flex flex-col space-y-4">
      {!selectedBuyer ? (
        <>
          {/* Search and Buyers List */}
          <Card className="flex-1 flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Buyer Profiles</CardTitle>
            </CardHeader>
            <CardContent className="pb-3 flex-1 flex flex-col">
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2 h-3 w-3 text-gray-400" />
                  <Input
                    placeholder="Search buyers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-7 h-8 text-sm"
                  />
                </div>
              </div>

              <div className="grid gap-3 flex-1 overflow-auto">
                {filteredBuyers.map((buyer) => (
                  <Card key={buyer.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedBuyer(buyer.id)}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="" />
                            <AvatarFallback className="text-xs">{buyer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <h3 className="text-sm">{buyer.name}</h3>
                            <p className="text-xs text-gray-500">{buyer.email}</p>
                            <p className="text-xs text-gray-500">{buyer.propertyPurchased}</p>
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          {getPaymentStatusBadge(buyer.paymentStatus)}
                          <p className="text-xs text-gray-500">{formatCurrency(buyer.totalAmount)}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Payment Progress</span>
                          <span>{Math.round(calculatePaymentProgress(buyer.paidAmount, buyer.totalAmount))}%</span>
                        </div>
                        <Progress value={calculatePaymentProgress(buyer.paidAmount, buyer.totalAmount)} className="h-1" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredBuyers.length === 0 && (
                <div className="text-center py-4 text-gray-500 text-sm">
                  No buyers found matching your search criteria.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Card>
              <CardContent className="p-3">
                <div className="font-bold text-blue-600">{buyers.length}</div>
                <p className="text-xs text-gray-600">Total Buyers</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-3">
                <div className="font-bold text-green-600">
                  {buyers.filter(buyer => buyer.paymentStatus === 'current').length}
                </div>
                <p className="text-xs text-gray-600">Current Payments</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-3">
                <div className="font-bold text-orange-600 text-xs">
                  {formatCurrency(buyers.reduce((sum, buyer) => sum + buyer.paidAmount, 0))}
                </div>
                <p className="text-xs text-gray-600">Total Payments Received</p>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        /* Buyer Detail View */
        <div className="h-full flex flex-col space-y-3">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => setSelectedBuyer(null)} className="h-8 text-sm">
              ← Back to Buyers
            </Button>
          </div>

          {selectedBuyerData && (
            <Tabs defaultValue="profile" className="flex-1 flex flex-col">
              <TabsList className="flex-shrink-0">
                <TabsTrigger value="profile" className="text-sm">Profile</TabsTrigger>
                <TabsTrigger value="property" className="text-sm">Property Details</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Buyer Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src="" />
                            <AvatarFallback className="text-lg">
                              {selectedBuyerData.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-xl font-medium">{selectedBuyerData.name}</h3>
                            {getPaymentStatusBadge(selectedBuyerData.paymentStatus)}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span>{selectedBuyerData.email}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span>{selectedBuyerData.phone}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span>{selectedBuyerData.address}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <CreditCard className="w-4 h-4 text-gray-400" />
                            <span>CNIC: {selectedBuyerData.cnic}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>Joined: {new Date(selectedBuyerData.joinDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium">Payment Summary</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>Total Amount:</span>
                            <span className="font-medium">{formatCurrency(selectedBuyerData.totalAmount)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Paid Amount:</span>
                            <span className="font-medium text-green-600">{formatCurrency(selectedBuyerData.paidAmount)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Remaining:</span>
                            <span className="font-medium text-orange-600">{formatCurrency(selectedBuyerData.remainingAmount)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Payment Plan:</span>
                            <span className="font-medium">{selectedBuyerData.paymentPlan}</span>
                          </div>
                          {selectedBuyerData.nextPaymentDue && (
                            <div className="flex justify-between">
                              <span>Next Payment Due:</span>
                              <span className="font-medium">{new Date(selectedBuyerData.nextPaymentDue).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>

                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{Math.round(calculatePaymentProgress(selectedBuyerData.paidAmount, selectedBuyerData.totalAmount))}%</span>
                          </div>
                          <Progress value={calculatePaymentProgress(selectedBuyerData.paidAmount, selectedBuyerData.totalAmount)} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>



              <TabsContent value="property" className="flex-1 overflow-auto">
                <div className="space-y-4">
                  {/* Property Overview */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Home className="w-5 h-5" />
                        Property Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Property Image */}
                        <div className="space-y-4">
                          <ImageWithFallback
                            src={selectedBuyerData.propertyDetails.photo}
                            alt={selectedBuyerData.propertyDetails.name}
                            className="w-full h-64 object-cover rounded-lg border"
                          />
                          
                          {/* Basic Info */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Purchase Date</p>
                              <p className="font-medium">{new Date(selectedBuyerData.joinDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Status</p>
                              {getPaymentStatusBadge(selectedBuyerData.paymentStatus)}
                            </div>
                          </div>
                        </div>

                        {/* Property Details */}
                        <div className="space-y-4">
                          <h4 className="text-xl font-semibold">{selectedBuyerData.propertyDetails.name}</h4>
                          <p className="text-gray-600 leading-relaxed">{selectedBuyerData.propertyDetails.description}</p>
                          
                          <div className="grid grid-cols-1 gap-3">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <Ruler className="w-4 h-4 text-blue-600" />
                              <div>
                                <p className="text-sm text-gray-500">Plot Size</p>
                                <p className="font-medium">{selectedBuyerData.propertyDetails.plotSize} {selectedBuyerData.propertyDetails.plotUnit}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <Home className="w-4 h-4 text-green-600" />
                              <div>
                                <p className="text-sm text-gray-500">Area</p>
                                <p className="font-medium">{selectedBuyerData.propertyDetails.sqFeet.toLocaleString()} sq ft</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <DollarSign className="w-4 h-4 text-orange-600" />
                              <div>
                                <p className="text-sm text-gray-500">Processing Fees</p>
                                <p className="font-medium">{formatCurrency(selectedBuyerData.propertyDetails.processingFees)}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <FileText className="w-4 h-4 text-purple-600" />
                              <div>
                                <p className="text-sm text-gray-500">Total Value</p>
                                <p className="font-medium">{formatCurrency(selectedBuyerData.totalAmount)}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Property Features */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Property Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {selectedBuyerData.propertyDetails.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm font-medium text-green-800">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Available Payment Plans */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Available Payment Plans</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedBuyerData.propertyDetails.paymentPlans.map((plan, index) => (
                          <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium">{plan.name}</h5>
                              {selectedBuyerData.paymentPlan.includes(plan.name) && (
                                <Badge variant="outline" className="text-green-600 border-green-600">Selected</Badge>
                              )}
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-gray-500">Down Payment</p>
                                <p className="font-medium">{plan.downPayment}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Monthly</p>
                                <p className="font-medium">PKR {plan.monthlyInstallments}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Duration</p>
                                <p className="font-medium">{plan.duration}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Payment Summary & History */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-600 mb-1">Total Amount</p>
                          <p className="font-bold text-blue-800">{formatCurrency(selectedBuyerData.totalAmount)}</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <p className="text-sm text-green-600 mb-1">Paid Amount</p>
                          <p className="font-bold text-green-800">{formatCurrency(selectedBuyerData.paidAmount)}</p>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                          <p className="text-sm text-orange-600 mb-1">Remaining</p>
                          <p className="font-bold text-orange-800">{formatCurrency(selectedBuyerData.remainingAmount)}</p>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Payment Progress</span>
                          <span>{Math.round(calculatePaymentProgress(selectedBuyerData.paidAmount, selectedBuyerData.totalAmount))}% Complete</span>
                        </div>
                        <Progress value={calculatePaymentProgress(selectedBuyerData.paidAmount, selectedBuyerData.totalAmount)} className="h-3" />
                      </div>
                      
                      {selectedBuyerData.nextPaymentDue && (
                        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm font-medium text-yellow-800">
                              Next Payment Due: {new Date(selectedBuyerData.nextPaymentDue).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Payment History */}
                      <div className="border-t pt-6">
                        <h5 className="font-medium mb-4">Payment History</h5>
                        <div className="space-y-3">
                          {selectedBuyerData.payments.map((payment, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                              <div>
                                <p className="font-medium">{payment.type}</p>
                                <p className="text-sm text-gray-500">{new Date(payment.date).toLocaleDateString()}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{formatCurrency(payment.amount)}</p>
                                <Badge variant={payment.status === 'paid' ? 'default' : 'outline'} className="mt-1">
                                  {payment.status}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      )}
    </div>
  );
}