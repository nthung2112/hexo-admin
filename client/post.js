var DataFetcher = require('./data-fetcher');
var api = require('./api');
var React = require('react');
var ReactDOM = require('react-dom');
var cx = require('classnames');
var Promise = require('es6-promise').Promise;
var marked = require('marked');
var Editor = require('./editor');
var _ = require('lodash');
var moment = require('moment');
var Router = require('react-router-dom').BrowserRouter;
var createReactClass = require('create-react-class');

var Post = createReactClass({
  displayName: 'Post',

  componentWillMount: function() {
    this.loadData(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    this.loadData(nextProps);
  },

  loadData: function(props) {
    Promise.all([api.post(props.match.params.postId), api.tagsCategoriesAndMetadata(), api.settings()]).then(values => {
      this.setState({
        post: values[0],
        tagsCategoriesAndMetadata: values[1],
        settings: values[2]
      });

      this.dataDidLoad(values[0]);
    });
  },

  getInitialState: function() {
    return {
      updated: moment()
    };
  },

  componentDidMount: function() {
    this._post = _.debounce(
      update => {
        var now = moment();
        api.post(this.props.match.params.postId, update).then(() => {
          this.setState({
            updated: now
          });
        });
      },
      1000,
      { trailing: true, loading: true }
    );
  },

  handleChange: function(update) {
    var now = moment();
    api.post(this.props.match.params.postId, update).then(data => {
      var state = {
        tagsCategoriesAndMetadata: data.tagsCategoriesAndMetadata,
        post: data.post,
        updated: now,
        author: data.post.author,
        banner: data.post.banner,
        origin: data.post.origin
      };
      for (var i = 0; i < data.tagsCategoriesAndMetadata.metadata.length; i++) {
        var name = data.tagsCategoriesAndMetadata.metadata[i];
        state[name] = data.post[name];
      }
      this.setState(state);
    });
  },

  handleChangeContent: function(text) {
    if (text === this.state.raw) {
      return;
    }
    this.setState({
      raw: text,
      updated: null,
      rendered: marked(text)
    });
    this._post({ _content: text });
  },

  handleChangeTitle: function(title) {
    if (title === this.state.title) {
      return;
    }
    this.setState({ title: title });
    this._post({ title: title });
  },

  handlePublish: function() {
    if (!this.state.post.isDraft) return;
    api.publish(this.state.post._id).then(post => {
      this.setState({ post: post });
    });
  },

  handleUnpublish: function() {
    if (this.state.post.isDraft) return;
    api.unpublish(this.state.post._id).then(post => {
      this.setState({ post: post });
    });
  },

  handleRemove: function() {
    api.remove(this.state.post._id).then(this.props.history.push('/posts'));
  },

  dataDidLoad: function(data) {
    var parts = data.raw.split('---');
    var _slice = parts[0] === '' ? 2 : 1;
    var raw = parts
      .slice(_slice)
      .join('---')
      .trim();
    this.setState({
      title: data.title,
      initialRaw: raw,
      raw: raw,
      rendered: data.content
    });
  },

  render: function() {
    var post = this.state.post;
    var settings = this.state.settings;
    if (!post || !this.state.tagsCategoriesAndMetadata || !settings) {
      return <span>Loading...</span>;
    }
    var restProps = {
      post: this.state.post,
      raw: this.state.initialRaw,
      updatedRaw: this.state.raw,
      wordCount: this.state.raw ? this.state.raw.split(' ').length : 0,
      isDraft: post.isDraft,
      updated: this.state.updated,
      title: this.state.title,
      rendered: this.state.rendered,
      onChange: this.handleChange,
      onChangeContent: this.handleChangeContent,
      onChangeTitle: this.handleChangeTitle,
      onPublish: this.handlePublish,
      onUnpublish: this.handleUnpublish,
      onRemove: this.handleRemove,
      tagsCategoriesAndMetadata: this.state.tagsCategoriesAndMetadata,
      adminSettings: settings
    };
    return React.createElement(Editor, restProps);
  }
});

module.exports = Post;
