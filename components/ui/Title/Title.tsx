import React, { ReactNode } from 'react';

interface Props {
  variant?: 'sm' | 'md' | 'lg';
  children?: ReactNode;
}

const Title: React.FC<Props> = ({ variant, children }) => {
  let fontSize = '';
  switch (variant) {
    case 'sm':
      fontSize = 'text-2xl';
      break;
    case 'md':
      fontSize = 'text-3xl';
      break;
    case 'lg':
      fontSize = 'text-5xl';
      break;
    default:
      fontSize = 'text-xl';
  }

  return (
    <h1 className={`${fontSize} font-extrabold text-white sm:text-center`}>
      {children}
    </h1>
  );
};

export default Title;
