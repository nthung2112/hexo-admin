var React = require('react');
var createReactClass = require('create-react-class');

var SinceWhen = createReactClass({
  displayName: 'SinceWhen',

  getDefaultProps: function() {
    return {
      prefix: ''
    };
  },

  componentDidMount: function() {
    this._iv = setInterval(this.tick, 5000);
  },

  componentWillUnmount: function() {
    clearInterval(this._iv);
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
      <span className={this.props.className}>{this.state.time + " " + this.props.prefix}</span>
    );
  },
});

module.exports = SinceWhen;
