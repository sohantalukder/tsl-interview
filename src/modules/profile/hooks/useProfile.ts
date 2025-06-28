import { useState, useEffect } from 'react';
import { IUser } from '../types/profile.interface';

const useProfile = () => {
  const [profile, setProfile] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user profile data
    const loadProfile = () => {
      setLoading(true);

      // Mock data based on the provided JSON
      const mockProfile: IUser = {
        id: 2,
        firstName: 'Michael',
        lastName: 'Williams',
        maidenName: '',
        age: 35,
        gender: 'male',
        email: 'michael.williams@x.dummyjson.com',
        phone: '+49 258-627-6644',
        username: 'michaelw',
        password: 'michaelwpass',
        birthDate: '1989-8-10',
        image: 'https://dummyjson.com/icon/michaelw/128',
        bloodGroup: 'B+',
        height: 186.22,
        weight: 76.32,
        eyeColor: 'Red',
        hair: {
          color: 'Green',
          type: 'Straight',
        },
        ip: '12.13.116.142',
        address: {
          address: '385 Fifth Street',
          city: 'Houston',
          state: 'Alabama',
          stateCode: 'AL',
          postalCode: '38807',
          coordinates: {
            lat: 22.815468,
            lng: 115.608581,
          },
          country: 'United States',
        },
        macAddress: '79:15:78:99:60:aa',
        university: 'Ohio State University',
        bank: {
          cardExpire: '02/27',
          cardNumber: '6737807858721625',
          cardType: 'Elo',
          currency: 'SEK',
          iban: '83IDT77FWYLCJVR8ISDACFH0',
        },
        company: {
          department: 'Support',
          name: 'Spinka - Dickinson',
          title: 'Support Specialist',
          address: {
            address: '395 Main Street',
            city: 'Los Angeles',
            state: 'New Hampshire',
            stateCode: 'NH',
            postalCode: '73442',
            coordinates: {
              lat: 79.098326,
              lng: -119.624845,
            },
            country: 'United States',
          },
        },
        ein: '912-602',
        ssn: '108-953-962',
        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/97.0.1072.76 Safari/537.36',
        crypto: {
          coin: 'Bitcoin',
          wallet: '0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a',
          network: 'Ethereum (ERC20)',
        },
        role: 'admin',
      };

      // Simulate network delay
      setTimeout(() => {
        setProfile(mockProfile);
        setLoading(false);
      }, 1000);
    };

    if (!profile) {
      loadProfile();
    }
  }, [profile]);

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logout functionality to be implemented');
    // You can add navigation logic or auth context clearing here
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatHeight = (height: number) => {
    const feet = Math.floor(height / 30.48);
    const inches = Math.floor((height % 30.48) / 2.54);
    return `${height} cm (${feet}'${inches}")`;
  };

  const formatWeight = (weight: number) => {
    return `${weight} kg`;
  };

  const maskSensitiveData = (data: string, visibleChars: number = 4) => {
    if (data.length <= visibleChars) return data;
    return data.substring(0, visibleChars) + '*'.repeat(data.length - visibleChars);
  };

  return {
    profile,
    loading,
    handleLogout,
    formatDate,
    formatHeight,
    formatWeight,
    maskSensitiveData,
  };
};

export default useProfile;
