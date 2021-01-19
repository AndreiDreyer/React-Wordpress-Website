import React, { Component } from "react";
import PaypalButtons from "../../components/PaypalButtons";

class Prints extends Component {
    state = {
      showPaypal: false
    }; 
  
    showPaypalButtons = () => {
      this.setState({ showPaypal: true });
    };
  
    render() {
      const { showPaypal } = this.state;
      if (showPaypal) {
        return <PaypalButtons />;
      } else {
        return (
          <div className="main">
            <h2> Buy this Mercedes at a giveaway price (Super Cheap) </h2>
            <img alt="Mercedes G-Wagon" src={"/bowser1.jpg"} />
            <h3>
              <b>$200</b>
            </h3>
            <button onClick={this.showPaypalButtons}> Pay </button>
          </div>
        );
      }
    }
  }
  
  export default Prints;