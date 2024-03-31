import React from 'react';
import {ThemeProvider} from '@gravity-ui/uikit';

import './Wrapper.scss';

export type WrapperProps = {
    children: React.ReactNode;
};

export const Wrapper: React.FC<WrapperProps> = ({children, ...props}) => {
    return (
        <ThemeProvider theme="dark" {...props}>
            {children}
        </ThemeProvider>
    );
};
