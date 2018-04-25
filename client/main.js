import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import api from './api';

export default class BasicTable extends Component {
  constructor() {
    super();
    this.state = { posts: [], selectedRows: [] };
  }

  componentDidMount() {
    api
      .posts()
      .then(posts =>
        _.sortBy(_.filter(posts, post => !post.isDiscarded), ['isDraft', 'date']).reverse()
      )
      .then(data => {
        this.setState({ posts: data });
      });
  }

  linkFormatter(cell, row) {
    return <Link to={`/post/${row._id}`}>{cell}</Link>;
  }

  formatDate(cell, row) {
    return moment(cell).format('hh:mm:ss DD-MM-YYYY');
  }

  handleSaveBtnClick = onModalClose => {
    api.newPost(this.inputRef.value).then(post => {
      onModalClose();
      this.props.history.push(`/post/${post._id}`);
    });
  };

  setInputRef = element => {
    this.inputRef = element;
  };

  createCustomModal = (onModalClose, onSave, columns, validateState) => {
    return (
      <div className="modal-content">
        <div className="modal-header ">
          <h4 className="modal-title">Please input post title</h4>
        </div>
        <div className="modal-body">
          <input
            autoFocus
            type="text"
            placeholder="Title"
            className="form-control"
            ref={this.setInputRef}
          />
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-default btn-secondary" onClick={onModalClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.handleSaveBtnClick(onModalClose)}
          >
            Create Post
          </button>
        </div>
      </div>
    );
  };

  handleConfirmDeleteRow = (onDelete, selectedRows) => {
    if (confirm('Are you sure you want to delete post ?')) {
      api.remove(selectedRows[0]).then(onDelete());
    }
  };

  render() {
    const options = {
      deleteBtn: () => <DeleteButton btnText="Delete Post" />,
      insertBtn: () => <InsertButton btnText="Create New Post" />,
      insertModal: this.createCustomModal,
      handleConfirmDeleteRow: this.handleConfirmDeleteRow
    };

    return (
      <div className="app_posts">
        <h3>Posts</h3>
        <BootstrapTable
          search
          pagination
          insertRow
          deleteRow
          options={options}
          data={this.state.posts}
          selectRow={{ mode: 'radio' }}
        >
          <TableHeaderColumn dataField="_id" searchable={false} isKey hidden>
            ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="title" dataFormat={this.linkFormatter}>
            Title
          </TableHeaderColumn>
          <TableHeaderColumn dataField="author" dataSort>
            Author
          </TableHeaderColumn>
          <TableHeaderColumn dataField="categories" dataSort>
            Categories
          </TableHeaderColumn>
          <TableHeaderColumn dataField="tags" dataSort>
            Tags
          </TableHeaderColumn>
          <TableHeaderColumn dataField="date" dataSort dataFormat={this.formatDate}>
            Date
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
