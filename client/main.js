import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import api from './api';

export default class BasicTable extends Component {
  constructor() {
    super();
    this.state = { posts: [] };
  }

  componentDidMount() {
    api
      .posts()
      .then(posts =>
        _.sortBy(
          _.filter(posts, function(post) {
            return !post.isDiscarded;
          }),
          ['isDraft', 'date']
        ).reverse()
      )
      .then(data => {
        this.setState({ posts: data });
      });
  }

  linkFormatter(cell, row) {
    return <Link to={`/post/${row._id}`}>{cell}</Link>;
  }

  formatDate(cell, row) {
    return moment(cell).format("hh:mm:ss DD-MM-YYYY");
  }

  render() {
    function onAfterDeleteRow(rowKeys) {
      alert('The rowkey you drop: ' + rowKeys);
    }

    const options = {
      afterDeleteRow: onAfterDeleteRow // A hook for after droping rows.
    };

    // If you want to enable deleteRow, you must enable row selection also.
    const selectRowProp = {
      mode: 'checkbox'
    };

    return (
      <div className="app_posts">
        <h3>Posts</h3>
        <BootstrapTable data={this.state.posts} pagination search selectRow={selectRowProp} options={options}>
          <TableHeaderColumn dataField="title" isKey searchable={false} dataFormat={this.linkFormatter}>
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
