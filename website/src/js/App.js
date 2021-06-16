import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages/Home';
import Presentation from './pages/Presentation';

const App = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/presentation/">
                        <Presentation />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;