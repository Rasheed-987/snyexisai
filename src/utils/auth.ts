'use client'

import { useEffect } from 'react';
import React, { ComponentType } from 'react';

const withAuth = (WrappedComponent: ComponentType<any>) => {
  const AuthenticatedComponent: React.FC = (props) => {
    useEffect(() => {
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      if (!isAuthenticated) {
        window.location.href = '/admin/login';
      }
    }, []);

    return React.createElement(WrappedComponent, props);
  };

  return AuthenticatedComponent;
};

export const logout = () => {
  localStorage.removeItem('isAuthenticated');
  window.location.href = '/'; // Redirect to home page
};

export default withAuth;