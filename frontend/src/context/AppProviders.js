import React from 'react';
import { PetProvider } from './PetContext';
import { PostProvider } from './PostContext';
import { ProfileProvider } from './ProfileContext';
import { ServiceProvider } from './ServiceProvider';

const AppProviders = ({ children }) => {
  return (
    <ServiceProvider>
      <ProfileProvider>
        <PostProvider>
          <PetProvider>
            {children}
          </PetProvider>
        </PostProvider>
      </ProfileProvider>
    </ServiceProvider>
  );
};

export default AppProviders;