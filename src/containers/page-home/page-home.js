import React, { PureComponent } from 'react';
import './page-home.scss';
import ZPTextInput from '../../components/text-input';
import ZPButton from '../../components/full-width-button';
import QueryString from 'query-string';
import QRCode from 'qrcode.react';

import { TabBar } from 'antd-mobile';

import 'antd-mobile/dist/antd-mobile.css';

const ZaloPayApi = window.ZaloPay;

const CREATE_ORDER = 'https://devbus.zalopay.com.vn/api/v1/create_order';
const IDENTIFIER_TITLE = 'Chứng minh nhân dân';
const AMOUNT_TITLE = 'Số tiền';
const GET_BALANCE = '/api/v1/get_balance';
const BUS_BASE_URL = 'https://devbus.zalopay.com.vn';

class PageHome extends PureComponent {
  state = {};
  handleOnSubmitForm() {
    ZaloPayApi.showLoading();
  }
  componentDidMount() {
    const body = {
      client_id: 1,
      app_id: 1,
      amount: 10000,
      token: 11111,
      zalo_pay_id: 'ducdt'
    };
    fetch(`${BUS_BASE_URL}${GET_BALANCE}`, {
      body: JSON.stringify(body),
      method: 'POST'
    })
      .then((response) => response.json())
      .then((resp) => {
        console.log('createOrder', resp);
        // ZaloPayApi.showDialog({
        //   title: 'Giao dịch không thành công',
        //   message: JSON.stringify(resp),
        //   button: 'Đóng'
        // });
        ZaloPayApi.hideLoading();
        const { code, order } = resp;
        if (code === 1) {
          ZaloPayApi.payOrder(order, this.cb);
          return;
        }
        return Promise.reject(resp);
      })
      .catch((error) => {
        ZaloPayApi.hideLoading();
        ZaloPayApi.showDialog({
          title: 'Giao dịch không thành công',
          message: error.message,
          button: 'Đóng'
        });
        console.log('createOrder error', error);
      });
  }

  createOrder = () => {
    ZaloPayApi.showLoading();
    const { indentifier, amount } = this.state;
    console.log('createOrder', indentifier, amount);
    const body = {
      client_id: 1,
      app_id: 1,
      amount: 10000,
      token: 11111,
      zalo_pay_id: 'ducdt'
    };
    console.log('QueryString.stringify(body)', QueryString.stringify(body));
    fetch(CREATE_ORDER, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then((response) => response.json())
      .then((resp) => {
        console.log('createOrder', resp);
        // ZaloPayApi.showDialog({
        //   title: 'Giao dịch không thành công',
        //   message: JSON.stringify(resp),
        //   button: 'Đóng'
        // });
        ZaloPayApi.hideLoading();
        const { code, order } = resp;
        if (code === 1) {
          ZaloPayApi.payOrder(order, this.cb);
          return;
        }
        return Promise.reject(resp);
      })
      .catch((error) => {
        ZaloPayApi.hideLoading();
        ZaloPayApi.showDialog({
          title: 'Giao dịch không thành công',
          message: error.message,
          button: 'Đóng'
        });
        console.log('createOrder error', error);
      });
  };
  cb = (data) => {
    if (typeof data === 'object') {
      if (data.error === 1) {
        alert('Thanh toán đơn hàng thành công');
      } else if (data.error === 4) {
        alert('Người dùng huỷ việc thanh toán đơn hàng');
      } else {
        alert('Thanh toán đơn hàng thất bại với mã lỗi ' + data.errorCode);
        // Khi thanh toán thất bại, có thể xem nguyên nhân chi tiết trong bảng mã lỗi
      }
    }
  };
  handleIdentifierChange = (event) => {
    this.setState({
      indentifier: event.target.value
    });
  };
  handleAmountChange = (event) => {
    this.setState({
      amount: event.target.value
    });
  };
  renderContent(pageText) {
    return (
      <div
        style={{
          backgroundColor: 'white',
          height: 1000,
          textAlign: 'center'
          // flex: 1
        }}
      >
        <div style={{ paddingTop: 60 }}>
          Clicked “{pageText}” tab， show “{pageText}” information
        </div>
      </div>
    );
  }
  render() {
    const { indentifier, amount } = this.state;
    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <TabBar.Item
            title="QR"
            key="qr"
            selected={this.state.selectedTab === 'blueTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab'
              });
            }}
            data-seed="logId"
            icon={
              <Icon
                url={`https://upload.wikimedia.org/wikipedia/commons/3/31/QR_icon.svg`}
              />
            }
            selectedIcon={
              <Icon
                url={`https://upload.wikimedia.org/wikipedia/commons/3/31/QR_icon.svg`}
              />
            }
          >
            <div className="tab-qr">
              <div className="tab-qr-qrcode">
                <QRCode value="http://facebook.github.io/react/" size={280} />
              </div>
            </div>
          </TabBar.Item>
          <TabBar.Item
            icon={
              <Icon
                url={`https://www.svgrepo.com/show/125026/debit-card.svg`}
              />
            }
            selectedIcon={
              <Icon
                url={`https://www.svgrepo.com/show/125026/debit-card.svg`}
              />
            }
            title="Thanh Toán"
            key="pay"
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab'
              });
            }}
            data-seed="logId1"
          >
            <img
              src={require('../../assets/bghome.jpg')}
              width="100%"
              alt="banner"
            />
            <div className="text-input-wrapper">
              <ZPTextInput
                placeholder={IDENTIFIER_TITLE}
                className="cmnd-text-input"
                onChange={this.handleIdentifierChange}
              />
              <ZPTextInput
                placeholder={AMOUNT_TITLE}
                onChange={this.handleAmountChange}
                type="number"
              />
            </div>
            <div className="pay-button-wrapper">
              <ZPButton
                text="Thanh toán"
                onClick={this.createOrder}
                disabled={!indentifier || !amount}
              />
            </div>
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}
const Icon = ({ url }) => (
  <div
    style={{
      width: '22px',
      height: '22px',
      background: `url(${url}) center center /  21px 21px no-repeat`
    }}
  />
);

export default PageHome;
