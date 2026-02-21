'use client';
import { useState } from 'react';
import { 
  User, 
  ShoppingBag, 
  Download, 
  Heart, 
  Settings, 
  Bell, 
  TrendingUp, 
  Clock,
  Star,
  File,
  Edit
} from 'lucide-react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'purchases', label: 'Purchases', icon: ShoppingBag },
    { id: 'downloads', label: 'Downloads', icon: Download },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const purchases = [
    { id: 1, name: 'YouTube Thumbnail Pack', date: '2024-01-15', price: 499, status: 'Completed' },
    { id: 2, name: 'Instagram Story Templates', date: '2024-01-10', price: 399, status: 'Completed' },
    { id: 3, name: 'Event Poster Bundle', date: '2024-01-05', price: 599, status: 'Processing' },
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-accent-coral rounded-full"></div>
              <h1 className="text-4xl font-bold font-hand">Dashboard</h1>
            </div>
            <p className="text-muted-foreground">Welcome back, Creative Designer!</p>
          </div>
          <button className="relative">
            <div className="w-10 h-10 doodle-border rounded-full flex items-center justify-center bg-white">
              <Bell className="w-5 h-5" />
            </div>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-coral text-xs doodle-border rounded-full flex items-center justify-center font-bold">
              3
            </span>
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6">
              {/* Profile */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-accent-yellow rounded-full flex items-center justify-center doodle-border">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <div className="font-bold text-lg">Creative Designer</div>
                  <div className="text-sm text-muted-foreground">Pro Member</div>
                </div>
              </div>

              {/* Tabs */}
              <nav className="space-y-2">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:-translate-y-0.5 ${
                        activeTab === tab.id
                          ? 'bg-foreground text-primary-foreground doodle-border'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>

              {/* Stats */}
              <div className="mt-8 pt-8 border-t-2 border-foreground">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Member Since</span>
                    <span className="font-bold">Jan 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Spent</span>
                    <span className="font-bold font-hand">₹1,497</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Downloads</span>
                    <span className="font-bold">12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <>
                {/* Stats Cards */}
                <div className="grid sm:grid-cols-3 gap-6 mb-8">
                  <div className="card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <ShoppingBag className="w-8 h-8 text-accent-coral" />
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="text-3xl font-bold font-hand mb-2">3</div>
                    <div className="text-muted-foreground">Total Purchases</div>
                  </div>
                  <div className="card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Download className="w-8 h-8 text-accent-mint" />
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="text-3xl font-bold font-hand mb-2">12</div>
                    <div className="text-muted-foreground">Files Downloaded</div>
                  </div>
                  <div className="card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Star className="w-8 h-8 text-accent-yellow" />
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="text-3xl font-bold font-hand mb-2">4.9</div>
                    <div className="text-muted-foreground">Avg. Rating</div>
                  </div>
                </div>

                {/* Recent Purchases */}
                <div className="card p-6 mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold font-hand">Recent Purchases</h2>
                    <button className="text-sm text-muted-foreground hover:text-foreground">
                      View All →
                    </button>
                  </div>
                  <div className="space-y-4">
                    {purchases.map(purchase => (
                      <div key={purchase.id} className="flex items-center justify-between p-4 doodle-border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-accent-lavender rounded-lg flex items-center justify-center">
                            <File className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="font-bold">{purchase.name}</div>
                            <div className="text-sm text-muted-foreground">Purchased on {purchase.date}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold font-hand text-xl">₹{purchase.price}</div>
                          <div className={`text-sm px-2 py-1 rounded-full inline-block ${
                            purchase.status === 'Completed' 
                              ? 'bg-accent-mint/30 text-green-600' 
                              : 'bg-accent-yellow/30 text-yellow-600'
                          }`}>
                            {purchase.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="card p-6">
                  <h2 className="text-2xl font-bold mb-6 font-hand">Quick Actions</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <button className="p-4 doodle-border rounded-lg flex items-center gap-3 hover:bg-muted transition-colors">
                      <Edit className="w-5 h-5 text-accent-coral" />
                      <span>Edit Profile</span>
                    </button>
                    <button className="p-4 doodle-border rounded-lg flex items-center gap-3 hover:bg-muted transition-colors">
                      <Download className="w-5 h-5 text-accent-mint" />
                      <span>Download All</span>
                    </button>
                    <button className="p-4 doodle-border rounded-lg flex items-center gap-3 hover:bg-muted transition-colors">
                      <ShoppingBag className="w-5 h-5 text-accent-lavender" />
                      <span>Buy Credits</span>
                    </button>
                    <button className="p-4 doodle-border rounded-lg flex items-center gap-3 hover:bg-muted transition-colors">
                      <Heart className="w-5 h-5 text-accent-coral" />
                      <span>Wishlist</span>
                    </button>
                    <button className="p-4 doodle-border rounded-lg flex items-center gap-3 hover:bg-muted transition-colors">
                      <Clock className="w-5 h-5 text-accent-yellow" />
                      <span>Purchase History</span>
                    </button>
                    <button className="p-4 doodle-border rounded-lg flex items-center gap-3 hover:bg-muted transition-colors">
                      <Settings className="w-5 h-5 text-accent-mint" />
                      <span>Settings</span>
                    </button>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'purchases' && (
              <div className="card p-6">
                <h2 className="text-2xl font-bold mb-6 font-hand">Your Purchases</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-foreground">
                        <th className="text-left py-3 px-4">Product</th>
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Price</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchases.map(purchase => (
                        <tr key={purchase.id} className="border-b border-foreground/20">
                          <td className="py-4 px-4">
                            <div className="font-medium">{purchase.name}</div>
                          </td>
                          <td className="py-4 px-4">{purchase.date}</td>
                          <td className="py-4 px-4 font-bold font-hand">₹{purchase.price}</td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              purchase.status === 'Completed' 
                                ? 'bg-accent-mint/30 text-green-600' 
                                : 'bg-accent-yellow/30 text-yellow-600'
                            }`}>
                              {purchase.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <button className="text-sm text-accent-coral hover:underline">
                              Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}