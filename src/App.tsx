import { useState } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Checkbox } from './components/ui/checkbox';
import { Card, CardContent } from './components/ui/card';
import { Shield, Home, Zap } from 'lucide-react';
import backgroundImage from './assets/4dddf96460095568287aea0b16ed64cf2de1e273.png';
import logoImage from './assets/CBDLogoWhite.avif';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication - in real app this would call an API
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setRememberMe(false);
  };

  // Show dashboard if logged in
  if (isLoggedIn) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  // Show login page
  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* Light overlay for better contrast */}
        <div className="absolute inset-0 bg-white/10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-screen flex flex-col">
        {/* Header */}
        <div className="p-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-800/80 rounded-lg flex items-center justify-center backdrop-blur-sm shadow-lg border border-white/20">
              <img 
                src={logoImage} 
                alt="CBD Punjab Logo" 
                className="w-10 h-10 object-contain"
              />
            </div>
            <div>
              <h1 className="text-gray-800 font-semibold">CBD Punjab</h1>
              <p className="text-gray-600 text-sm">Central Business District</p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Side - Welcome Text */}
          <div className="flex-1 flex flex-col justify-start px-8 py-6 pt-12">
            <div className="max-w-xl">
              <h2 className="text-gray-800 text-4xl leading-tight mb-3">
                Welcome to Punjab's
              </h2>
              <h2 className="text-green-600 text-4xl leading-tight mb-6">
                Premier Business Hub
              </h2>
              <p className="text-gray-600 text-lg max-w-lg leading-relaxed">
                Access your administrative portal for the Central Business District development project
              </p>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-96 flex items-center justify-center p-4">
            <Card className="bg-white/95 backdrop-blur-md border-0 shadow-2xl w-full">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h3 className="text-gray-800 text-lg mb-2">Admin Portal</h3>
                  <p className="text-gray-600 text-sm">Sign in to access your dashboard</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-50 border-gray-200 placeholder:text-gray-500 h-10"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-700">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-50 border-gray-200 placeholder:text-gray-500 h-10"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <Label htmlFor="remember" className="text-gray-600 text-sm">
                        Remember me
                      </Label>
                    </div>
                    <button 
                      type="button"
                      className="text-green-600 hover:text-green-700 text-sm underline"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700 text-white h-10 rounded-lg"
                  >
                    Sign In →
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-600 text-sm">
                    Need access?{' '}
                    <button className="text-green-600 hover:text-green-700 underline">
                      Contact administrator
                    </button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Feature Cards */}
        <div className="px-4 pb-4 flex-shrink-0">
          <div className="grid grid-cols-3 gap-3 max-w-2xl">
            <Card className="bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30 transition-all duration-300 cursor-pointer">
              <CardContent className="p-3 flex items-center gap-2">
                <div className="w-6 h-6 bg-green-600/20 rounded-md flex items-center justify-center">
                  <Shield className="w-3 h-3 text-green-700" />
                </div>
                <div>
                  <h4 className="text-gray-800 text-xs">Secure Admin Access</h4>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30 transition-all duration-300 cursor-pointer">
              <CardContent className="p-3 flex items-center gap-2">
                <div className="w-6 h-6 bg-green-600/20 rounded-md flex items-center justify-center">
                  <Home className="w-3 h-3 text-green-700" />
                </div>
                <div>
                  <h4 className="text-gray-800 text-xs">Property Management</h4>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30 transition-all duration-300 cursor-pointer">
              <CardContent className="p-3 flex items-center gap-2">
                <div className="w-6 h-6 bg-green-600/20 rounded-md flex items-center justify-center">
                  <Zap className="w-3 h-3 text-green-700" />
                </div>
                <div>
                  <h4 className="text-gray-800 text-xs">Smart City Control</h4>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}