import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Home from '../containers/home';
import IndividualBusiness from '../containers/individualBusiness';
import BusinessForm from '../containers/addBusiness'



const App = ()=>{
        return(
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path={'/addbusiness'} component={BusinessForm} />
                        <Route path={'/business/:businessDistance/:businessId'} component={IndividualBusiness} />
                        <Route path={'/'} component={Home} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    
}

export default App;