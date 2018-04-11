var path = require('path');
var React = require('react');
var ReactDOM = require('react-dom');
var cx = require('classnames');
var Promise = require('es6-promise').Promise;
var PT = require('prop-types');
var CodeMirror = require('./code-mirror');
var SinceWhen = require('./since-when');
var Rendered = require('./rendered');
var CheckGrammar = require('./check-grammar');
var ConfigDropper = require('./config-dropper');
var RenameFile = require('./rename-file');
var Portal = require('./portal');
var Confirm = require('./confirm');
var createReactClass = require('create-react-class');

var Editor = createReactClass({
  displayName: 'Editor',

  propTypes: {
    post: PT.object,
    raw: PT.string,
    updatedRaw: PT.string,
    onChangeTitle: PT.func,
    title: PT.string,
    updated: PT.object,
    isDraft: PT.bool,
    onPublish: PT.func.isRequired,
    onUnpublish: PT.func.isRequired,
    tagsCategoriesAndMetadata: PT.object,
    adminSettings: PT.object
  },

  getInitialState: function() {
    var url = window.location.pathname.split('/');
    var rootPath = url.slice(0, url.indexOf('admin')).join('/');
    rootPath = rootPath === '' ? '/' : rootPath;
    return {
      previewLink: path.join(rootPath, this.props.post.path),
      checkingGrammar: false,
      showConfirm: false
    };
  },

  handlePreviewLink: function(previewLink) {
    console.log('updating preview link');
    this.setState({
      previewLink: path.join(previewLink)
    });
  },

  handleChangeTitle: function(e) {
    return this.props.onChangeTitle(e.target.value);
  },

  handleScroll: function(percent) {
    if (!this.state.checkingGrammar) {
      var node = ReactDOM.findDOMNode(this.refs.rendered);
      var height = node.getBoundingClientRect().height;
      node.scrollTop = (node.scrollHeight - height) * percent;
    }
  },

  onCheckGrammar: function() {
    this.setState({
      checkingGrammar: !this.state.checkingGrammar
    });
  },

  onDownloadRaw: function() {
    var text = this.props.post.raw;
    var filename = this.props.post.slug + '.md';
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  },

  handleRemove: function() {
    this.setState(prevState => ({
      showConfirm: !prevState.showConfirm
    }))
  },

  hideConfirm: function() {
    this.setState({
      showConfirm: false
    })
  },

  render: function() {
    return (
      <div
        className={cx({
          editor: true,
          'editor--draft': this.props.isDraft
        })}
      >
        <div>
          <div className="editor_top">
            <input
              className="editor_title"
              value={this.props.title}
              onChange={this.handleChangeTitle}
            />
            {!this.props.isPage && (
              <ConfigDropper
                post={this.props.post}
                tagsCategoriesAndMetadata={this.props.tagsCategoriesAndMetadata}
                onChange={this.props.onChange}
              />
            )}
            <button
              className="editor_checkGrammar"
              title="Download file raw"
              onClick={this.onDownloadRaw}
            >
              <i className="fa fa-download" />
            </button>
            {!this.props.isPage &&
              (this.props.isDraft ? (
                <button className="editor_remove" title="Remove" onClick={this.handleRemove}>
                  <i className="fa fa-trash-o" aria-hidden="true" />
                </button>
              ) : (
                <button
                  className="editor_remove"
                  title="Can't Remove Published Post"
                  onClick={this.handleRemove}
                  disabled
                >
                  <i className="fa fa-trash-o" aria-hidden="true" />
                </button>
              ))}
            {!this.props.isPage && (
              <button
                className="editor_checkGrammar"
                title="Check for Writing Improvements"
                onClick={this.onCheckGrammar}
              >
                <i className="fa fa-check-circle-o" />
              </button>
            )}
            {!this.props.isPage &&
              (this.props.isDraft ? (
                <button className="editor_publish" onClick={this.props.onPublish}>
                  Publish
                </button>
              ) : (
                <button className="editor_unpublish" onClick={this.props.onUnpublish}>
                  Unpublish
                </button>
              ))}
          </div>
        </div>
        <div className="editor_main">
          <div className="editor_edit">
            <div className="editor_md-header">
              <span className="editor_filename">
                <div className="filename_display">
                  <span className="filename_mark">Markdown</span>
                  <RenameFile post={this.props.post} handlePreviewLink={this.handlePreviewLink} />
                </div>
              </span>
              {this.props.updated && (
                <SinceWhen className="editor_updated" prefix="saved" time={this.props.updated} />
              )}
            </div>
            <CodeMirror
              onScroll={this.handleScroll}
              initialValue={this.props.raw}
              onChange={this.props.onChangeContent}
              forceLineNumbers={this.state.checkingGrammar}
              adminSettings={this.props.adminSettings}
            />
          </div>
          <div className="editor_display">
            <div className="editor_display-header">
              <div className="editor_display-name">
                <div className="editor_filename">
                  <div className="filename_display">
                    <span className="filename_mark">Preview</span>
                    <a className="editor_perma-link fileRename" href={this.state.previewLink} target="_blank">
                      <i className="fa fa-link" /> {this.state.previewLink}
                    </a>
                  </div>
                </div>
                <span className="editor_word-count">{this.props.wordCount} words</span>
              </div>
            </div>
            {!this.state.checkingGrammar && (
              <Rendered ref="rendered" className="editor_rendered" text={this.props.rendered} />
            )}
            {this.state.checkingGrammar && (
              <CheckGrammar toggleGrammar={this.onCheckGrammar} raw={this.props.updatedRaw} />
            )}
          </div>
        </div>

        {this.state.showConfirm && (
          <Portal>
            <Confirm
              abortLabel={'No'}
              confirmLabel={'Yes'}
              description={'This operation will move current draft into source/_discarded folder.'}
              message={'Delete this post?'}
              onAccept={this.props.onRemove}
              onReject={this.hideConfirm}
            />
          </Portal>
        )}
      </div>
    );
  },
});

module.exports = Editor;
