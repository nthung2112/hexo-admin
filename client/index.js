import React from 'react';
import ReactDOM from 'react-dom';
import router from './router';
import api from './api';
import './less/index.less';
import 'react-bootstrap-table/css/react-bootstrap-table.css';

const url = window.location.href.replace(/^.*\/\/[^\/]+/, '').split('/');
const rootPath = url.slice(0, url.indexOf('admin')).join('/');
api.init('rest', `${rootPath}/admin/api`);

ReactDOM.render(router(), document.getElementById('root'));
