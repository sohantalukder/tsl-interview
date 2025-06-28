import { useEffect, useCallback, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { fetchUserProfile, performLogout } from '@/state/thunks/authThunk';
import { selectUser, selectAuthLoading, selectAuthError } from '@/state/slices/authSlice';

const useProfile = () => {
  const dispatch = useAppDispatch();

  // Redux state
  const profile = useAppSelector(selectUser);
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const alreadyCalled = useRef(false);
  useEffect(() => {
    // Fetch profile from Redux if not already loaded
    if (!profile && !loading && !alreadyCalled.current) {
      dispatch(fetchUserProfile());
      alreadyCalled.current = true;
    }
  }, [dispatch, profile, loading]);

  const handleLogout = useCallback(() => {
    dispatch(performLogout());
  }, [dispatch]);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  const formatHeight = useCallback((height: number) => {
    const feet = Math.floor(height / 30.48);
    const inches = Math.floor((height % 30.48) / 2.54);
    return `${height} cm (${feet}'${inches}")`;
  }, []);

  const formatWeight = useCallback((weight: number) => {
    return `${weight} kg`;
  }, []);

  const maskSensitiveData = useCallback((data: string, visibleChars: number = 4) => {
    if (data.length <= visibleChars) return data;
    return data.substring(0, visibleChars) + '*'.repeat(data.length - visibleChars);
  }, []);

  return {
    profile,
    loading,
    error,
    handleLogout,
    formatDate,
    formatHeight,
    formatWeight,
    maskSensitiveData,
  };
};

export default useProfile;
