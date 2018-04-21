import React from 'react';
import Main from './main';
import Post from './post';
import Posts from './posts';
import Page from './page';
import Pages from './pages';
import About from './about';
import Deploy from './deploy';
import Settings from './settings';
import AuthSetup from './auth-setup';
import { BrowserRouter as Router, NavLink as Link, HashRouter, Route, Switch } from 'react-router-dom';

function Routers() {
  return (
    <HashRouter>
      <div className="app">
        <div className="app_header">
          <img src="logo.png" className="app_logo" />
          <Link to="/">
            <span className="app_title">Hexo Admin NTH</span>
          </Link>
          <ul className="app_nav">
            <li>
              <Link to="/posts" activeClassName="active">
                <span className="fa fa-pencil" />Posts
              </Link>
            </li>
            <li>
              <Link to="/pages" activeClassName="active">
                <span className="fa fa-file" />Pages
              </Link>
            </li>
            <li>
              <Link to="/deploy" activeClassName="active">
                <span className="fa fa-share-square" />Deploy
              </Link>
            </li>
            <li>
              <Link to="/settings" activeClassName="active">
                <span className="fa fa-cog" />Settings
              </Link>
            </li>
            <li>
              <Link to="/about" activeClassName="active">
                <span className="fa fa-info-circle" />About
              </Link>
            </li>
          </ul>
        </div>
        <div className="app_main">
          <Switch>
            <Route component={Main} exact path="/" />
            <Route component={Posts} path="/posts" />
            <Route component={Post} path="/post/:postId" />
            <Route component={Page} path="/pages/:pageId" />
            <Route component={Pages} path="/pages" />
            <Route component={About} path="/about" />
            <Route component={Deploy} path="/deploy" />
            <Route component={Settings} path="/settings" />
            <Route component={AuthSetup} path="/authsetup" />
          </Switch>
        </div>
      </div>
    </HashRouter>
  );
}

export default Routers;