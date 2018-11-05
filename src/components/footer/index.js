import './footer.scss';
import React, { PureComponent } from 'react';

export default class Footer extends PureComponent {
  render() {
    return (
      <div className="footer-container">
        <span className="text header">Các kênh hỗ trợ khác</span>
        <div className="row">
          <span className="text">Holine</span>
          <a className="text">1900 54 54 36</a>
        </div>
        <div className="row">
          <span className="text">Email</span>
          <a className="text">hotro@zalopay.vn</a>
        </div>
        <div className="row">
          <span className="text">Hỗ trợ trực tuyền</span>
          <a className="text">
            <span className="sprt icofb" />
            /Zalopay
          </a>
        </div>
      </div>
    );
  }
}