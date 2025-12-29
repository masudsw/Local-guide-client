import PublicNavbar from '@/components/shared/PublicNavbar';
import React from 'react';

const CommonLayout = ({children}:{children:React.ReactNode}) => {
    return (
        <>
        <PublicNavbar />
        <h1>Common layout</h1>
        {children}
        </>
    );
};

export default CommonLayout;