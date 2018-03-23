var App = require('./app');
var Post = require('./post');
var Posts = require('./posts');
var Page = require('./page');
var Pages = require('./pages');
var About = require('./about');
var Deploy = require('./deploy');
var Settings = require('./settings');
var AuthSetup = require('./auth-setup');
var Router = require('react-router-dom').BrowserRouter;
var HashRouter = require('react-router-dom').HashRouter;
var Route = require('react-router-dom').Route;
var Switch = require('react-router-dom').Switch;
var Link = require('react-router-dom').Link;

module.exports = () => {
  return (
    <HashRouter>
      <div className="app">
        <div className="app_header">
          <img src="logo.png" className="app_logo" />
          <span className="app_title">Hexo Admin</span>
          <ul className="app_nav">
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            <li>
              <Link to="/pages">Pages</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/deploy">Deploy</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
        </div>
        <div className="app_main">
          <Switch>
            <Route component={Posts} exact path="/" />
            <Route component={Posts} path="/posts" />
            <Route component={Post} path="/post/:postId" />
            <Route component={Page} path="/pages/:pageId" />
            <Route component={Pages} path="/pages" />
            <Route component={About} path="/about" />
            <Route component={Deploy} path="/deploy" />
            <Route component={Settings} path="/settings"/>
            <Route component={AuthSetup} path="/authsetup" />
          </Switch>
        </div>
      </div>
    </HashRouter>
  );
};
