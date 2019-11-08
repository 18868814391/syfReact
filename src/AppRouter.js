import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Index from './pages/Index'
import List from './pages/List'
import NodeDetail from './pages/nodeDetail'
import Login from './pages/login'
import Register from './pages/register'

function AppRouter() {
  return (
    <Router>
        {/* <ul>
            <li> <Link to="/">首页</Link> </li>
            <li><Link to="/list/">列表</Link> </li>
        </ul> */}
        <Route path="/" exact component={Index} />
        <Route path="/list/" component={List} />
        <Route path="/nodeDetail/:id" component={NodeDetail} />
        <Route path="/login/" component={Login} />
        <Route path="/register/" component={Register} />
    </Router>
  );
}

export default AppRouter;