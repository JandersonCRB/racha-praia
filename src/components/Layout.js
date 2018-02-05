import React from 'react';
import MyNavbar from './navbar';


const Layout = props =>
    <div id='Layout'>
        <MyNavbar />
        {props.children}
    </div>

export default Layout;