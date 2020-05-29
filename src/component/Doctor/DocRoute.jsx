import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import { paths } from '../../config';

const DocRoute = () => {
    return ( 
        <Switch>
            <Route path={paths.doctor.dashboard} component={Dashboard}/>
            {/* <Route path="*" component={Dashboard}/> */}
        </Switch>
     );
}
 
export default DocRoute;