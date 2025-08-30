import React from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Back() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="fixed top-4 left-4 bg-white shadow-lg rounded-full">
      <IconButton onClick={handleBack} color="primary">
        <ArrowBackIcon />
      </IconButton>
    </div>
  );
}

export default Back;
