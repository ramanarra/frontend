import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Doctor from '../Doctor';
import { paths } from '../../config';

const HomeRoute = () => {
    return ( 
        <Switch>
            <Route path={paths.home.doctor} component={Doctor}/>
            <Route path="*" component={Doctor}/>
        </Switch>
     );
}
 
export default HomeRoute;