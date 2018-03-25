var React = require('react');
var createReactClass = require('create-react-class');

var SinceWhen = createReactClass({
  displayName: 'SinceWhen',

  componentDidMount: function() {
    this._iv = setInterval(this.tick, 5000);
  },

  componentWillUnmount: function() {
    clearInterval(this._iv);
  },

  getDefaultProps: function() {
    return {
      prefix: ''
    };
  },

  getInitialState: function() {
    return {
      time: this.props.time.fromNow()
    };
  },

  tick: function() {
    this.setState({ time: this.props.time.fromNow() });
  },

  render: function() {
    return (
      <span className={this.props.className}>{this.state.prefix + " " + this.props.time}</span>
    );
  },
});

module.exports = SinceWhen;
