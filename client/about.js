var React = require('react');
var createReactClass = require('create-react-class');

var About = createReactClass({
  render: function() {
    return (
      <div className="about">
        <h1>This is the Hexo Admin Plugin</h1>
        <div>
          <strong>
            Goal: Provide an awesome admin experience for managing your blog.
          </strong>
        </div>
        <div>
          Useful links:
          <ul>
            <li>
              <a href="http://hexo.io">Hexo site</a>
            </li>
            <li>
              <a href="https://github.com/nthung2112/hexo-admin">
                Github page for this plugin
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = About;
