var React = require('react');
var PT = require('prop-types');
var cx = require('classnames');
var createReactClass = require('create-react-class');

var Rendered = createReactClass({
  propTypes: {
    text: PT.string
  },
  render: function() {
    return (
      <div
        className={cx("post-content", this.props.className)}
        dangerouslySetInnerHTML={{
          __html:
            this.props.text ||
            '<h1 class="editor_no-content">There doesn\'t seem to be anything here</h1>'
        }}
      />
    );
  }
});

module.exports = Rendered;
