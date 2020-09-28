import React from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Tollbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
const layout = (props) => (
    <Aux>
       <Tollbar/>
       <SideDrawer/>
        <main className={classes.Content}>
         {props.children}
        </main>
    </Aux>
);

export default layout;