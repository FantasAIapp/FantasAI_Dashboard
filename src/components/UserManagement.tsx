import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Key, 
  Smartphone, 
  Edit2, 
  Save, 
  Copy, 
  RefreshCw,
  Trash2,
  Plus,
  Check,
  X
} from 'lucide-react';

interface Device {
  id: string;
  name: string;
  type: string;
  lastConnected: string;
  status: 'connected' | 'disconnected';
}

interface UserManagementProps {
  user: any;
  onUpdateUser: (updatedUser: any) => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ user, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'Smart Watch',
      type: 'wearable',
      lastConnected: '2024-03-15T10:30:00',
      status: 'connected'
    },
    {
      id: '2',
      name: 'Fitness Band',
      type: 'wearable',
      lastConnected: '2024-03-14T15:45:00',
      status: 'disconnected'
    }
  ]);
  const [activeTab, setActiveTab] = useState('profile');

  const generateApiKey = () => {
    const key = 'sk_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setApiKey(key);
    setShowApiKey(true);
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
  };

  const handleSaveProfile = () => {
    onUpdateUser(editedUser);
    setIsEditing(false);
  };

  const disconnectDevice = (deviceId: string) => {
    setDevices(devices.map(device => 
      device.id === deviceId 
        ? { ...device, status: 'disconnected' as const }
        : device
    ));
  };

  const connectNewDevice = () => {
    const newDevice: Device = {
      id: Math.random().toString(36).substring(7),
      name: 'New Device',
      type: 'wearable',
      lastConnected: new Date().toISOString(),
      status: 'connected'
    };
    setDevices([...devices, newDevice]);
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex space-x-4 border-b border-[#1E1E1E]">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === 'profile'
              ? 'text-[#FF7A00] border-b-2 border-[#FF7A00]'
              : 'text-[#B3B3B3] hover:text-white'
          }`}
        >
          <User className="w-4 h-4 inline mr-2" />
          Profile
        </button>
        <button
          onClick={() => setActiveTab('api')}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === 'api'
              ? 'text-[#FF7A00] border-b-2 border-[#FF7A00]'
              : 'text-[#B3B3B3] hover:text-white'
          }`}
        >
          <Key className="w-4 h-4 inline mr-2" />
          API Keys
        </button>
        <button
          onClick={() => setActiveTab('devices')}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === 'devices'
              ? 'text-[#FF7A00] border-b-2 border-[#FF7A00]'
              : 'text-[#B3B3B3] hover:text-white'
          }`}
        >
          <Smartphone className="w-4 h-4 inline mr-2" />
          Devices
        </button>
      </div>

      {/* Profile Section */}
      {activeTab === 'profile' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Profile Information</h2>
            <button
              onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
              className="flex items-center px-4 py-2 rounded-lg bg-[#FF7A00] text-black hover:bg-[#FFB347] transition-colors"
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Profile
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#B3B3B3] text-sm mb-2">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedUser.name}
                  onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                  className="orange-input w-full"
                />
              ) : (
                <div className="p-3 bg-[#1E1E1E] rounded-lg text-white">{user.name}</div>
              )}
            </div>

            <div>
              <label className="block text-[#B3B3B3] text-sm mb-2">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={editedUser.email}
                  onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                  className="orange-input w-full"
                />
              ) : (
                <div className="p-3 bg-[#1E1E1E] rounded-lg text-white">{user.email}</div>
              )}
            </div>

            <div>
              <label className="block text-[#B3B3B3] text-sm mb-2">Fitness Level</label>
              {isEditing ? (
                <select
                  value={editedUser.level}
                  onChange={(e) => setEditedUser({ ...editedUser, level: e.target.value })}
                  className="orange-input w-full"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Professional">Professional</option>
                </select>
              ) : (
                <div className="p-3 bg-[#1E1E1E] rounded-lg text-white">{user.level}</div>
              )}
            </div>

            <div>
              <label className="block text-[#B3B3B3] text-sm mb-2">Fitness Age</label>
              {isEditing ? (
                <input
                  type="number"
                  value={editedUser.fitnessAge}
                  onChange={(e) => setEditedUser({ ...editedUser, fitnessAge: parseInt(e.target.value) })}
                  className="orange-input w-full"
                />
              ) : (
                <div className="p-3 bg-[#1E1E1E] rounded-lg text-white">{user.fitnessAge} years</div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* API Keys Section */}
      {activeTab === 'api' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">API Keys</h2>
            <button
              onClick={generateApiKey}
              className="flex items-center px-4 py-2 rounded-lg bg-[#FF7A00] text-black hover:bg-[#FFB347] transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Generate New Key
            </button>
          </div>

          {showApiKey && (
            <div className="p-4 bg-[#1E1E1E] rounded-lg border border-[#FF7A00]/30">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#B3B3B3] text-sm">Your API Key</span>
                <button
                  onClick={copyApiKey}
                  className="text-[#FF7A00] hover:text-[#FFB347] transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="font-mono text-sm bg-[#0A0A0A] p-3 rounded-lg text-white break-all">
                {apiKey}
              </div>
              <p className="mt-2 text-xs text-[#B3B3B3]">
                Make sure to copy your API key now. You won't be able to see it again!
              </p>
            </div>
          )}

          <div className="p-4 bg-[#1E1E1E] rounded-lg">
            <h3 className="text-white font-medium mb-4">API Documentation</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-[#FF7A00] text-sm font-medium mb-2">Authentication</h4>
                <p className="text-[#B3B3B3] text-sm">
                  Include your API key in the Authorization header of your requests:
                </p>
                <code className="block mt-2 p-3 bg-[#0A0A0A] rounded-lg text-white text-sm">
                  Authorization: Bearer YOUR_API_KEY
                </code>
              </div>
              <div>
                <h4 className="text-[#FF7A00] text-sm font-medium mb-2">Base URL</h4>
                <code className="block p-3 bg-[#0A0A0A] rounded-lg text-white text-sm">
                  https://api.fantasai.app/v1
                </code>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Devices Section */}
      {activeTab === 'devices' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Connected Devices</h2>
            <button
              onClick={connectNewDevice}
              className="flex items-center px-4 py-2 rounded-lg bg-[#FF7A00] text-black hover:bg-[#FFB347] transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Connect Device
            </button>
          </div>

          <div className="grid gap-4">
            {devices.map((device) => (
              <div
                key={device.id}
                className="p-4 bg-[#1E1E1E] rounded-lg border border-[#FF7A00]/30"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-medium">{device.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        device.status === 'connected'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {device.status}
                      </span>
                    </div>
                    <p className="text-[#B3B3B3] text-sm mt-1">
                      Last connected: {new Date(device.lastConnected).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => disconnectDevice(device.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {devices.length === 0 && (
            <div className="text-center py-8">
              <Smartphone className="w-12 h-12 text-[#B3B3B3] mx-auto mb-4" />
              <p className="text-[#B3B3B3]">No devices connected yet</p>
              <button
                onClick={connectNewDevice}
                className="mt-4 text-[#FF7A00] hover:text-[#FFB347] transition-colors"
              >
                Connect your first device
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default UserManagement; 