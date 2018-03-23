var React = require('react');
var createReactClass = require('create-react-class');

var Modal = createReactClass({
  displayName: 'Modal',
  backdrop: function() {
    return <div className="modal-backdrop in" />;
  },

  modal: function() {
    var style = { display: 'block' };
    return (
      <div
        className="modal in"
        tabIndex="-1"
        role="dialog"
        aria-hidden="false"
        ref="modal"
        style={style}
      >
        <div className="modal-dialog">
          <div className="modal-content">{this.props.children}</div>
        </div>
      </div>
    );
  },

  render: function() {
    return (
      <div>
        {this.backdrop()}
        {this.modal()}
      </div>
    );
  }
});

module.exports = Modal;
