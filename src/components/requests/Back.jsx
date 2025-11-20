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
    <div className="fixed top-4 right-4 bg-green-600 shadow-lg rounded-full z-[9999]">
      <IconButton onClick={handleBack} >
        <ArrowBackIcon className='text-white'/>
      </IconButton>
    </div>
  );
}

export default Back;
