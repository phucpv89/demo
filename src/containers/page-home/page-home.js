import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import injectReducer from '../../utils/inject-reducer';
import './page-home.scss';
import HomeActions, { reducer } from '../../reducers/home-reducer';
import ZPTextInput from '../../components/text-input';
import ZPButton from '../../components/full-width-button';
import QueryString from 'query-string';
import QRCode from 'qrcode.react';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// const { Card, CardTitle, CardText, CardActions, Button } = window.ReactMD;
// import { FontIcon, TabsContainer, Tabs, Tab } from 'react-md';
// import { Tabs, Tab, TabPanel, TabList } from 'react-re-super-tabs';
import { TabsContainer, Tabs, Tab, BottomNavigation } from 'react-md';
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
  // render() {
  //   return (
  //     <div className="md-grid">
  //       <Card className="md-cell">
  //         <CardTitle title="Hello, World!" />
  //         <CardText>Lorem ipsum... pretend more ...</CardText>
  //         <CardActions>
  //           <Button flat label="Action 1" />
  //           <Button flat label="Action 2" />
  //         </CardActions>
  //       </Card>
  //     </div>
  //   );
  // }

  // render() {
  //   const { indentifier, amount } = this.state;
  //   return (
  //     <div className="home-page">
  //       <img
  //         src={require('../../assets/bghome.jpg')}
  //         width="100%"
  //         alt="banner"
  //       />
  //       <Card className="md-cell">
  //         <CardTitle title="Hello, World!" />
  //       </Card>
  //       <QRCode value="http://facebook.github.io/react/" />
  //       <div className="text-input-wrapper">
  //         <ZPTextInput
  //           placeholder={IDENTIFIER_TITLE}
  //           className="cmnd-text-input"
  //           onChange={this.handleIdentifierChange}
  //         />
  //         <ZPTextInput
  //           placeholder={AMOUNT_TITLE}
  //           onChange={this.handleAmountChange}
  //           type="number"
  //         />
  //       </div>
  //       <div className="pay-button-wrapper">
  //         <ZPButton
  //           text="Thanh toán"
  //           onClick={this.createOrder}
  //           // disabled={!indentifier || !amount}
  //         />
  //       </div>
  //     </div>
  //   );
  // }
  // render() {
  //   return (
  //     <div className="home-page">
  //       {/* <div className="tabs-container" /> */}
  //       {/* <TabsContainer
  //         className="tabs-container"
  //         panelClassName="md-grid"
  //         colored
  //         fixed
  //         themed
  //         labelAndIcon
  //       >
  //         <Tabs
  //           tabId="simple-tab"
  //           mobile={true}
  //           className="tabs-container-tabs"
  //         >
  //           <Tab label="Tab one" className="tabs-container-tabs-tab">
  //             <h3>Hello, World!</h3>
  //           </Tab>
  //           <Tab label="Tab two" className="tabs-container-tabs-tab">
  //             <h3>Now look at me!</h3>
  //           </Tab>
  //         </Tabs>
  //       </TabsContainer> */}
  //       <TabsContainer panelClassName="md-grid" colored>
  //         <Tabs tabId="simple-tab" mobile={true}>
  //           <Tab label="Tab one">
  //             <h3>Hello, World!</h3>
  //           </Tab>
  //           <Tab label="Tab two">
  //             <h3>Now look at me!</h3>
  //           </Tab>
  //         </Tabs>
  //       </TabsContainer>
  //     </div>
  //   );
  // }
  render() {
    return (
      <div className="home-page">
        <TabsContainer
          style={{
            width: '100%',
            flexDirection: 'row'
            // background: 'blue'
          }}
          // panelClassName="md-grid"
          panelClassName="md-bottom-navigation-offset"
          colored
          mobile={true}
        >
          <Tabs tabId="simple-tab" mobile={true}>
            <Tab label="Thanh toán" className="tab-label">
              <div>
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
                    // disabled={!indentifier || !amount}
                  />
                </div>
              </div>
            </Tab>
            <Tab label="Mã QR" className="tab-label">
              <div className="tab-qr">
                <div className="tab-qr-qrcode">
                  <QRCode value="http://facebook.github.io/react/" size={280} />
                </div>
              </div>
            </Tab>
          </Tabs>
        </TabsContainer>
      </div>
    );
  }
}

const mapStateToProps = ({ home }) => ({
  testHome: home.testHome
});

const withConnect = connect(
  mapStateToProps,
  {
    setTestHome: HomeActions.setTestHome,
    asyncFunc: HomeActions.asyncFunc,
    saveHome: HomeActions.saveHome
  }
);

const withReducer = injectReducer({ key: 'home', reducer });

// export default compose(
//   withReducer,
//   withConnect
// )(PageHome);
const style = {
  padding: '10px 0',
  borderBottom: '3px solid transparent',
  display: 'inline-block',
  cursor: 'pointer',
  backgroundColor: '#1c90ec',
  width: '33.3%',
  color: 'rgba(255, 255, 255, .7)',
  textAlign: 'center'
};

const activeStyle = {
  ...style,
  color: 'white',
  borderBottom: '3px solid #d71356'
};

const CustomTab = ({ children, isActive }) => (
  <span style={isActive ? activeStyle : style}>{children}</span>
);
const Info = () => (
  <div style={{ backgroundColor: '#1c90ec', width: '100%', flex: 1 }} />
);

export default PageHome;
