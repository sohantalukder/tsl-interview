import React from 'react';
import { ScrollView } from 'react-native';
import { SafeScreen } from '@/shared/components/templates';
import { useNavigationHeader } from '@/shared/hooks/useNavigationHeader';
import { useTheme } from '@/theme';

// Profile components
import ProfileHeader from './components/molecules/ProfileHeader/ProfileHeader';
import ProfileSection from './components/molecules/ProfileSection/ProfileSection';
import ProfileItem from './components/atoms/ProfileItem/ProfileItem';
import ProfileSettings from './components/molecules/ProfileSettings/ProfileSettings';

// Hook
import useProfile from './hooks/useProfile';
import { EmptyContent } from '@/shared/components/molecules';

const ProfileIndex = () => {
  useNavigationHeader({
    title: 'Profile',
  });

  const { gutters } = useTheme();
  const { profile, loading, formatDate } = useProfile();

  if (!profile || loading) {
    return (
      <SafeScreen>
        <EmptyContent
          isLoading={loading}
          title="No profile found"
          description="Please try again later"
        />
      </SafeScreen>
    );
  }

  return (
    <SafeScreen showHeader={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[gutters.paddingHorizontal_20, gutters.paddingBottom_40]}
      >
        {/* Profile Header */}
        <ProfileHeader profile={profile} />
        {/* Essential Information */}
        <ProfileSection title="Personal Information">
          <ProfileItem
            label="Username"
            value={profile.username}
          />
          <ProfileItem
            label="Phone"
            value={profile.phone}
          />
          <ProfileItem
            label="Birth Date"
            value={formatDate(profile.birthDate)}
          />
          <ProfileItem
            label="Location"
            value={`${profile.address.city}, ${profile.address.state}`}
          />
        </ProfileSection>

        {/* Work Information */}
        <ProfileSection title="Work">
          <ProfileItem
            label="Company"
            value={profile.company.name}
          />
          <ProfileItem
            label="Position"
            value={profile.company.title}
          />
          <ProfileItem
            label="Department"
            value={profile.company.department}
          />
        </ProfileSection>

        {/* Settings */}
        <ProfileSettings />
      </ScrollView>
    </SafeScreen>
  );
};

export default ProfileIndex;
