import React, { Component } from 'react';
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class NavBar extends Component {
    state = {
        cartIcon : <FontAwesomeIcon icon={faCartPlus} />,
        style : {
            badgeStyle : {
                fontSize : 16,
                position : "absolute",
                top : -10,
                right : -16
            },
            badgeParent : {
                fontSize : 33,
                position : "relative"
            }
        }
    }
    render() { 
        const {totalItems,totalAmount,showCart} = this.props;
        return (
            <nav className="navbar navbar-dark bg-dark sticky-top">
                <a className="navbar-brand" onClick={showCart} href="#">
                    <span style={ this.state.style.badgeParent }>
                        {this.state.cartIcon}
                        <span style={this.state.style.badgeStyle} className="badge badge-warning">{ totalItems }</span>
                    </span>
                </a>
                <span style={{fontSize:20}} className="badge badge-info">₹{ totalAmount }</span>
            </nav>
        );
    }
}
 
export default NavBar;