import React from 'react';
import { AuthProvider } from './AuthContext';
import { PetProvider } from './PetContext';
import { PostProvider } from './PostContext';
import { ProfileProvider } from './ProfileContext';
import { ServiceProvider } from './ServiceProvider';

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <ProfileProvider>
        <PostProvider>
          <PetProvider>
            <ServiceProvider>
              {children}
            </ServiceProvider>
          </PetProvider>
        </PostProvider>
      </ProfileProvider>
    </AuthProvider>
  );
};

export default AppProviders;
