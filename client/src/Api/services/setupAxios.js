import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setupInterceptors } from '../axiosInstence';

const InterceptorSetup = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setupInterceptors(navigate, dispatch);
  }, [navigate, dispatch]);

  return children;
};

export default InterceptorSetup;