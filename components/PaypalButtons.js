import React from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';
// import Car from "/bowser1.jpg";
import Spinner from './Spinner';

const CLIENT = {
  sandbox: 'AUsPuJjZe3gcSsc0U7mt_tCdRiCZresx96fiv1FNIoRukORqqWMVQs074sCdd41aSWqcp2mGzvp2HKbh',
  production: 'AUsPuJjZe3gcSsc0U7mt_tCdRiCZresx96fiv1FNIoRukORqqWMVQs074sCdd41aSWqcp2mGzvp2HKbh',
};

const CLIENT_ID = process.env.NODE_ENV === 'production' ? CLIENT.production : CLIENT.sandbox;

let PayPalButton = null;
class PaypalButton extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.paymentAmount);

    this.state = {
      showButtons: false,
      loading: true,
      paid: false,
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      PayPalButton = window.paypal.Buttons.driver('react', { React, ReactDOM });
      this.setState({ loading: false, showButtons: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    const scriptJustLoaded = !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

    if (scriptJustLoaded) {
      if (isScriptLoadSucceed) {
        PayPalButton = window.paypal.Buttons.driver('react', {
          React,
          ReactDOM,
        });
        this.setState({ loading: false, showButtons: true });
      }
    }
  }
  createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: +'Mercedes G-Wagon',
          amount: {
            currency_code: 'USD',
            value: this.props.paymentAmount,
          },
        },
      ],
      application_context: {
        shipping_preference: 'NO_SHIPPING',
      },
    });
  };

  onApprove = (data, actions) => {
    this.props.onProcess();
    actions.order.capture().then((details) => {
      console.log('Data: ', data);
      console.log('Details: ', details);
      const paymentData = {
        payerID: data.payerID,
        orderID: data.orderID,
      };
      console.log('Payment Approved: ', paymentData);
      this.setState({ showButtons: false, paid: true });

      this.props.onSuccess();
    });
  };

  render() {
    const { showButtons, loading, paid } = this.state;

    return (
      <div className="main">
        {loading && <Spinner />}

        {showButtons && <PayPalButton createOrder={(data, actions) => this.createOrder(data, actions)} onApprove={(data, actions) => this.onApprove(data, actions)} />}
      </div>
    );
  }
}

export default scriptLoader(`https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`)(PaypalButton);
