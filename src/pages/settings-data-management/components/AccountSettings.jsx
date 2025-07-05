import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const AccountSettings = () => {
  const [profileData, setProfileData] = useState({
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState(profileData);

  const handleEdit = () => {
    setIsEditing(true);
    setTempData(profileData);
  };

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
   
    localStorage.setItem('userProfile', JSON.stringify(tempData));
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 shadow-financial">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="User" size={24} className="text-primary" />
          <h3 className="text-lg font-heading-semibold text-text-primary">Account Settings</h3>
        </div>
        {!isEditing && (
          <Button
            variant="outline"
            iconName="Edit"
            iconSize={16}
            onClick={handleEdit}
          >
            Edit Profile
          </Button>
        )}
      </div>

      <div className="space-y-6">
       
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-border">
              <Image
                src={profileData.avatar}
                alt="Profile Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            {isEditing && (
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-smooth">
                <Icon name="Camera" size={16} />
              </button>
            )}
          </div>
          <div>
            <h4 className="font-heading-medium text-text-primary">{profileData.name}</h4>
            <p className="text-sm text-text-secondary">{profileData.email}</p>
          </div>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              Full Name
            </label>
            {isEditing ? (
              <Input
                type="text"
                value={tempData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
              />
            ) : (
              <div className="p-3 bg-border-light rounded-lg text-text-primary">
                {profileData.name}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              Email Address
            </label>
            {isEditing ? (
              <Input
                type="email"
                value={tempData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
              />
            ) : (
              <div className="p-3 bg-border-light rounded-lg text-text-primary">
                {profileData.email}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              Phone Number
            </label>
            {isEditing ? (
              <Input
                type="tel"
                value={tempData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter your phone number"
              />
            ) : (
              <div className="p-3 bg-border-light rounded-lg text-text-primary">
                {profileData.phone}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              Member Since
            </label>
            <div className="p-3 bg-border-light rounded-lg text-text-primary">
              January 2024
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex items-center space-x-3 pt-4 border-t border-border">
            <Button
              variant="primary"
              iconName="Check"
              iconSize={16}
              onClick={handleSave}
            >
              Save Changes
            </Button>
            <Button
              variant="outline"
              iconName="X"
              iconSize={16}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;