import React, { ReactNode } from 'react';

const LoginLayout = ({ children }: { children: ReactNode; }) => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>{children}</div>
  );
};

export default LoginLayout;