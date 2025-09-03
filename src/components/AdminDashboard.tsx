import { useState } from 'react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LogOut, Plus, Home, Users, FileText } from 'lucide-react';
import logoImage from '../assets/CBDLogoWhite.avif';
import { PropertyForm } from './PropertyForm';
import { ApplicationsList } from './ApplicationsList';
import { BuyerProfiles } from './BuyerProfiles';

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                <img 
                  src={logoImage} 
                  alt="CBD Punjab Logo" 
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div>
                <h1 className="text-gray-900 font-semibold">CBD Punjab Admin</h1>
                <p className="text-gray-500 text-xs">Property Management Portal</p>
              </div>
            </div>
            <Button 
              onClick={onLogout}
              variant="outline"
              className="flex items-center gap-2 text-sm h-8"
            >
              <LogOut className="w-3 h-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 h-full">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-4 lg:w-1/2 flex-shrink-0 mb-4">
            <TabsTrigger value="overview" className="flex items-center gap-1 text-sm">
              <Home className="w-3 h-3" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="properties" className="flex items-center gap-1 text-sm">
              <Plus className="w-3 h-3" />
              Properties
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center gap-1 text-sm">
              <FileText className="w-3 h-3" />
              Applications
            </TabsTrigger>
            <TabsTrigger value="buyers" className="flex items-center gap-1 text-sm">
              <Users className="w-3 h-3" />
              Buyers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="flex-1 overflow-auto space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs font-medium">Total Properties</CardTitle>
                  <Home className="h-3 w-3 text-muted-foreground" />
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs font-medium">Active Applications</CardTitle>
                  <FileText className="h-3 w-3 text-muted-foreground" />
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="font-bold">156</div>
                  <p className="text-xs text-muted-foreground">+12 from last week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs font-medium">Total Buyers</CardTitle>
                  <Users className="h-3 w-3 text-muted-foreground" />
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="font-bold">89</div>
                  <p className="text-xs text-muted-foreground">+8 from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs font-medium">Revenue (PKR)</CardTitle>
                  <Plus className="h-3 w-3 text-muted-foreground" />
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="font-bold">45.2M</div>
                  <p className="text-xs text-muted-foreground">+15% from last month</p>
                </CardContent>
              </Card>
            </div>

            <Card className="flex-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Recent Activities</CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <div className="min-w-0">
                      <p className="text-sm">New property application received</p>
                      <p className="text-xs text-gray-500">Block A, Plot 45 - 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <div className="min-w-0">
                      <p className="text-sm">Payment received</p>
                      <p className="text-xs text-gray-500">Ahmed Khan - PKR 2,500,000 - 4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                    <div className="min-w-0">
                      <p className="text-sm">Property listing updated</p>
                      <p className="text-xs text-gray-500">Executive Heights - 6 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="properties" className="flex-1 overflow-auto">
            <PropertyForm />
          </TabsContent>

          <TabsContent value="applications" className="flex-1 overflow-auto">
            <ApplicationsList />
          </TabsContent>

          <TabsContent value="buyers" className="flex-1 overflow-auto">
            <BuyerProfiles />
          </TabsContent>
        </Tabs>
        </div>
      </div>
    </div>
  );
}