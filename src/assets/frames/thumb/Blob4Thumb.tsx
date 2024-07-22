import React from 'react';

const Blob4Thumb = ({ color }: IIconProps) => {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd"
            d="M7.31539 0.246907C8.52065 0.32261 9.32257 1.43173 10.3868 2.00595C11.6941 2.71135 13.4549 2.73348 14.2542 3.99087C15.1077 5.33367 15.421 7.27595 14.6051 8.64221C13.7929 10.0022 11.8232 9.87105 10.3719 10.4918C9.3322 10.9365 8.44507 11.7487 7.31539 11.7601C6.17932 11.7715 5.21359 11.0973 4.21418 10.5537C3.04039 9.91518 1.39887 9.60483 0.998716 8.32411C0.598307 7.04257 1.82716 5.87021 2.36698 4.64153C2.83831 3.56872 3.0781 2.378 3.95212 1.60179C4.8802 0.777581 6.07988 0.169305 7.31539 0.246907Z"
            fill={color} />
    </svg>
  );
};

export default Blob4Thumb;