import React from 'react';

const PrivateLayout: React.FC<{ children: React.ReactNode | React.ReactNodeArray }> = ({children}) => {
  return (
    <main>
      {children}
    </main>
  );
};

export default PrivateLayout;
