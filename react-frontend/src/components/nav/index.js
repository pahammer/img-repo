import React from 'react';

import { 
    Container,
    Logo
 } from './styles/nav';


export default function Nav({ children, ...restProps }) {

    return (
        <Container {...restProps}>
            {children}
        </Container>
    );
};

Nav.Logo = function NavLogo({ ...restProps }){
    return <Logo {...restProps}></Logo>;
}