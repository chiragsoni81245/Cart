import React, { Component } from 'react';
import CartItem from "./cartItems"
import noItem from '../imgs/no_item_found.png'
import CartSubmitBlock from "./cartSubmitBlock"
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Cart extends Component {
    state={
        closeButtonStyle:{
            fontSize:45,
            margin : "0.8em"
        }
    }

    render() { 
        const {cartState,hideCart,onIncrement,onDecrement,onDelete,totalAmount,validateCoupon,couponApplied,removeCoupon,cartCredits,cartCreditsStatusToggle,GST} = this.props;
        const overlayStyle = cartState ? "block" : "none";
        return (
            <React.Fragment>
            <div id="overlay" style={{zIndex:1,display:overlayStyle}}></div>
            <div className="modal" role="dialog" style={ {display:overlayStyle} }>
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Cart</h5>
                        <button type="button" className="close" onClick={hideCart} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        { (this.props.cartItems.length===0) && (
                                <div className="row w-100 m-0">
                                    <img src={noItem} style={{borderRadius:35,opacity:0.8}} alt="" className='offset-md-3 col-md-6' />
                                </div>
                            )
                        }

                    { (this.props.cartItems.length!==0) && (
                                            <div id="cart"  className="rounded mx-auto">
                                                <div className="cartItemContainer card-deck rounded ">
                                                    { this.props.cartItems.map(item=><CartItem
                                                                                        key={item.id}
                                                                                        item={item}
                                                                                        onIncrement={onIncrement}
                                                                                        onDecrement={onDecrement}
                                                                                        onDelete={onDelete}
                                                                                    />) }
                                                </div><hr/>
                                                <CartSubmitBlock 
                                                    totalAmount={totalAmount}
                                                    validateCoupon={validateCoupon}
                                                    couponApplied={couponApplied}
                                                    removeCoupon={removeCoupon}
                                                    cartCredits={cartCredits}
                                                    cartCreditsStatusToggle={cartCreditsStatusToggle}
                                                    GST={GST}
                                                />
                                            </div>
                                        )}    
                    </div>
                    </div>
                </div>
            </div>
            </React.Fragment>

            // <div id="overlay" style={ {display:overlayStyle} }>
            //     {/* <button style={this.state.closeButtonStyle} onClick={hideCart} className="close text-light">&times;</button><br/><br/><br/><br/> */}
                
            //     <div className="text-light">
            //         { (this.props.cartItems.length===0) && (
            //                 <div className="row w-100 m-0">
            //                     <img src={noItem} style={{borderRadius:35,opacity:0.8}} alt="" className='offset-md-3 col-md-6' />
            //                 </div>
            //             )
            //         }   
                    
            //         { (this.props.cartItems.length!==0) && (
            //             <div id="cart"  className="w-50 rounded mx-auto">
            //                 <h1 className="text-center m-2"><FontAwesomeIcon icon={faCartPlus}/></h1>
            //                 <div className="cartItemContainer card-row p-5 rounded bg-light ">
            //                     { this.props.cartItems.map(item=><CartItem
            //                                                         key={item.id}
            //                                                         item={item}
            //                                                         onIncrement={onIncrement}
            //                                                         onDecrement={onDecrement}
            //                                                         onDelete={onDelete}
            //                                                     />) }
            //                 </div>
            //                 <CartSubmitBlock 
            //                     totalAmount={totalAmount}
            //                     validateCoupon={validateCoupon}
            //                     couponApplied={couponApplied}
            //                     removeCoupon={removeCoupon}
            //                     cartCredits={cartCredits}
            //                     cartCreditsStatusToggle={cartCreditsStatusToggle}
            //                     GST={GST}
            //                 />
            //             </div>
            //         )}    
            //     </div>
            // </div>
        );
    }
}
 
export default Cart;
