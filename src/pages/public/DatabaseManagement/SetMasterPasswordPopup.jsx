import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Eye, EyeOff } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const generateRecommendedPassword = () => {
  return uuidv4();
};

const SetMasterPasswordPopup = ({ isOpen, onClose }) => {
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
  const [existingPasswordInput, setExistingPasswordInput] = useState('');
  const [recommendedPassword] = useState(generateRecommendedPassword());
  const [serverPort, setServerPort] = useState(8069);
  const [existingPassword, setExistingPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showExistingPassword, setShowExistingPassword] = useState(false);
  const [isPasswordSet, setIsPasswordSet] = useState(false);

  useEffect(() => {
    const fetchPort = async () => {
      try {
        const response = await fetch('/api/get-port');
        if (response.ok) {
          const data = await response.json();
          setServerPort(data.port);
        } else {
          console.error('Failed to fetch server port');
        }
      } catch (error) {
        console.error('Error fetching port:', error);
      }
    };

    const fetchMasterPassword = async () => {
      try {
        const response = await fetch('/api/get-master-password');
        if (response.ok) {
          const data = await response.json();
          setExistingPassword(data.hashedPassword);
          setIsPasswordSet(data.hashedPassword !== '');
        }
      } catch (error) {
        console.error('Error fetching master password:', error);
      }
    };

    fetchPort();
    fetchMasterPassword();
  }, []);

  const handleSetPassword = async () => {
    if (isPasswordSet) {
      handleChangePassword();
    } else {
      await createMasterPassword();
    }
  };

  const createMasterPassword = async () => {
    try {
      const baseURL = `${window.location.protocol}//${window.location.hostname}:${serverPort}`;
      const response = await fetch(`${baseURL}/api/set-master-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword }),
      });
      if (response.ok) {
        alert('Master password set successfully');
        onClose();
      } else {
        alert('Failed to set master password');
      }
    } catch (error) {
      console.error('Error setting master password:', error);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== newPasswordConfirmation) {
      alert('New passwords do not match.');
      return;
    }

    if (existingPasswordInput !== existingPassword) {
      alert('Existing password is incorrect.');
      return;
    }

    try {
      const baseURL = `${window.location.protocol}//${window.location.hostname}:${serverPort}`;
      const response = await fetch(`${baseURL}/api/change-master-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword }),
      });
      if (response.ok) {
        alert('Master password changed successfully');
        onClose();
      } else {
        alert('Failed to change master password');
      }
    } catch (error) {
      console.error('Error changing master password:', error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isPasswordSet ? 'Change Master Password' : 'Set Master Password'}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <Label>Recommended Password</Label>
          <Input value={recommendedPassword} readOnly />
          {isPasswordSet && (
            <>
              <Label>Existing Master Password</Label>
              <div className="relative">
                <Input
                  type={showExistingPassword ? 'text' : 'password'}
                  placeholder="Enter existing master password"
                  value={existingPasswordInput}
                  onChange={(e) => setExistingPasswordInput(e.target.value)}
                />
                <button 
                  type="button" 
                  onClick={() => setShowExistingPassword(!showExistingPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showExistingPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </>
          )}
          <Label>{isPasswordSet ? 'New Master Password' : 'Set New Master Password'}</Label>
          <div className="relative">
            <Input
              type={showNewPassword ? 'text' : 'password'}
              placeholder={isPasswordSet ? "Enter new master password" : "Set new master password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button 
              type="button" 
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showNewPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {isPasswordSet && (
            <>
              <Label>Confirm New Master Password</Label>
              <Input
                type={showNewPassword ? 'text' : 'password'}
                placeholder="Confirm new master password"
                value={newPasswordConfirmation}
                onChange={(e) => setNewPasswordConfirmation(e.target.value)}
              />
            </>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleSetPassword}>
            {isPasswordSet ? 'Change Password' : 'Set Password'}
          </Button>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SetMasterPasswordPopup;
