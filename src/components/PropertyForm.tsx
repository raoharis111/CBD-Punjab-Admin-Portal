import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Upload, X, Plus } from 'lucide-react';

interface PaymentPlan {
  id: string;
  name: string;
  downPayment: string;
  monthlyInstallments: string;
  duration: string;
}

export function PropertyForm() {
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    sqFeet: '',
    processingFees: '',
    plotSize: '',
    plotUnit: 'kanal',
    totalPrice: '',
    description: ''
  });

  const [paymentPlans, setPaymentPlans] = useState<PaymentPlan[]>([]);
  const [newPlan, setNewPlan] = useState({
    name: '',
    downPayment: '',
    monthlyInstallments: '',
    duration: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addPaymentPlan = () => {
    if (newPlan.name && newPlan.downPayment && newPlan.monthlyInstallments && newPlan.duration) {
      const plan: PaymentPlan = {
        id: Date.now().toString(),
        ...newPlan
      };
      setPaymentPlans(prev => [...prev, plan]);
      setNewPlan({ name: '', downPayment: '', monthlyInstallments: '', duration: '' });
    }
  };

  const removePlan = (id: string) => {
    setPaymentPlans(prev => prev.filter(plan => plan.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Property Data:', { ...formData, paymentPlans });
    // Here you would typically send the data to your backend
    alert('Property advertisement created successfully!');
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Create Property Advertisement</CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="name" className="text-sm">Property Name</Label>
                <Input
                  id="name"
                  placeholder="Enter property name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  className="h-8"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="sqFeet" className="text-sm">Square Feet</Label>
                <Input
                  id="sqFeet"
                  type="number"
                  placeholder="Enter area in sq ft"
                  value={formData.sqFeet}
                  onChange={(e) => handleInputChange('sqFeet', e.target.value)}
                  required
                  className="h-8"
                />
              </div>
            </div>

            {/* Photo Upload */}
            <div className="space-y-1">
              <Label htmlFor="photo" className="text-sm">Property Photo</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {formData.photo ? (
                  <div className="relative">
                    <ImageWithFallback
                      src={formData.photo}
                      alt="Property preview"
                      className="max-h-32 mx-auto rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 right-1 h-6 w-6 p-0"
                      onClick={() => handleInputChange('photo', '')}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            handleInputChange('photo', e.target?.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                      id="photoUpload"
                    />
                    <Label htmlFor="photoUpload" className="cursor-pointer text-sm">
                      <span className="text-blue-600 hover:text-blue-800">Click to upload</span> or drag and drop
                    </Label>
                  </div>
                )}
              </div>
            </div>

            {/* Financial Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <Label htmlFor="processingFees" className="text-sm">Processing Fees (PKR)</Label>
                <Input
                  id="processingFees"
                  type="number"
                  placeholder="Enter processing fees"
                  value={formData.processingFees}
                  onChange={(e) => handleInputChange('processingFees', e.target.value)}
                  required
                  className="h-8"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-sm">Plot Size</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Enter size"
                    value={formData.plotSize}
                    onChange={(e) => handleInputChange('plotSize', e.target.value)}
                    required
                    className="h-8"
                  />
                  <Select value={formData.plotUnit} onValueChange={(value) => handleInputChange('plotUnit', value)}>
                    <SelectTrigger className="w-20 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kanal">Kanal</SelectItem>
                      <SelectItem value="marla">Marla</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="totalPrice" className="text-sm">Total Price (PKR)</Label>
                <Input
                  id="totalPrice"
                  type="number"
                  placeholder="Enter total price"
                  value={formData.totalPrice}
                  onChange={(e) => handleInputChange('totalPrice', e.target.value)}
                  required
                  className="h-8"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <Label htmlFor="description" className="text-sm">Property Description</Label>
              <Textarea
                id="description"
                placeholder="Enter property description..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="text-sm"
              />
            </div>

            {/* Payment Plans */}
            <div className="space-y-2">
              <Label className="text-sm">Payment Plan Options</Label>
              
              {/* Add New Payment Plan */}
              <Card className="border-dashed">
                <CardContent className="p-3">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-3">
                    <Input
                      placeholder="Plan name"
                      value={newPlan.name}
                      onChange={(e) => setNewPlan(prev => ({ ...prev, name: e.target.value }))}
                      className="h-8 text-sm"
                    />
                    <Input
                      placeholder="Down payment %"
                      value={newPlan.downPayment}
                      onChange={(e) => setNewPlan(prev => ({ ...prev, downPayment: e.target.value }))}
                      className="h-8 text-sm"
                    />
                    <Input
                      placeholder="Monthly amount"
                      value={newPlan.monthlyInstallments}
                      onChange={(e) => setNewPlan(prev => ({ ...prev, monthlyInstallments: e.target.value }))}
                      className="h-8 text-sm"
                    />
                    <Input
                      placeholder="Duration (months)"
                      value={newPlan.duration}
                      onChange={(e) => setNewPlan(prev => ({ ...prev, duration: e.target.value }))}
                      className="h-8 text-sm"
                    />
                  </div>
                  <Button type="button" onClick={addPaymentPlan} className="w-full h-8 text-sm">
                    <Plus className="w-3 h-3 mr-1" />
                    Add Payment Plan
                  </Button>
                </CardContent>
              </Card>

              {/* Existing Payment Plans */}
              {paymentPlans.length > 0 && (
                <div className="space-y-2">
                  {paymentPlans.map((plan) => (
                    <div key={plan.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex gap-3 items-center">
                        <Badge variant="outline" className="text-xs">{plan.name}</Badge>
                        <span className="text-xs text-gray-600">
                          {plan.downPayment}% down, PKR {plan.monthlyInstallments}/month for {plan.duration} months
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removePlan(plan.id)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 h-8 text-sm">
              Create Property Advertisement
            </Button>
          </form>
        </CardContent>
    </Card>
  );
}