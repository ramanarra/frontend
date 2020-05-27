import React from 'react'
import { Switch, Route } from 'react-router-dom'
import DocDashboard from '../Doctor/Dashboard';

const HomeRoute = () => {
    return ( 
        <Switch>
            <Route path="dashboard" component={DocDashboard}/>
            <Route path="*" component={DocDashboard}/>
        </Switch>
     );
}
 
export default HomeRoute;