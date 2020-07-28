import React, { Component } from 'react';

class CartSubmitBlock extends Component {
    state = {  }

    validateCouponCaller = ({target})=>{
        const {validateCoupon} = this.props;
        const value = target.value;
        const ifValid = validateCoupon(value);
        if( !ifValid ){
            target.classList.add("is-invalid")
        }else{
            target.classList.remove("is-invalid")
        }
    }

    render() { 
        const {totalAmount,couponApplied,removeCoupon,cartCredits,cartCreditsStatusToggle,GST} = this.props;
        let finalTotalAmount = couponApplied.length!==0 ? totalAmount-(couponApplied[0].discount*totalAmount)/100 : totalAmount
        const GSTApplied = (finalTotalAmount*GST)/100
        finalTotalAmount += GSTApplied
        let  creditUsed = 0;
        if(cartCredits.status){
            if(finalTotalAmount>=cartCredits.value){
                creditUsed = cartCredits.value;
                finalTotalAmount = finalTotalAmount - cartCredits.value  
            } else{
                creditUsed = finalTotalAmount
                finalTotalAmount = 0
            }
        }

        return ( 
            <div className="d-flex flex-column text-center bg-light text-dark">
                <div className="d-flex flex-column p-0">
                    { (couponApplied.length===0) && (
                        <React.Fragment>
                            <div className="row mx-0 mt-4 mb-2 align-items-center">
                                <div className="col-md-6">
                                    <h4><b>Discount Coupon</b></h4>
                                </div>
                                <div className="col-md-6">
                                    <input onKeyUp={this.validateCouponCaller} type="text" className="form-control" placeholder="Coupon"/>
                                </div>
                            </div>
                        </React.Fragment>
                    )}
                    
                    { (couponApplied.length!==0) && (
                        <React.Fragment>
                            <div className="row mx-0 my-2 align-items-center">
                                <div className="col-md-6 d-flex justify-content-center align-items-center">
                                    <h4><b>Coupon Applied</b></h4>
                                </div>
                                <div className="col-md-6 d-flex justify-content-center align-items-center">
                                    <span className="badge badge-primary p-2 mr-2" style={{fontSize:20}}>{couponApplied[0].name}</span>
                                    <button onClick={()=> removeCoupon(couponApplied[0].name) } className="btn btn-danger m-1">&times;</button>
                                </div>
                            </div>
                        </React.Fragment>
                    )}

                    <div className="row mx-0 my-2 align-items-center">
                        <div className="col-md-6 my-3">
                            <h4><b>Cart Credits</b></h4>
                        </div>
                        <div className="col-md-6 my-3">
                            <div className="row">
                                <h3 className="col-md-4"><b>₹{cartCredits.value}</b></h3>
                                { (cartCredits.status) && (<div className="col-md-2">
                                                                <span style={{fontSize:16}} className="badge badge-primary py-2">Used ₹{creditUsed}</span>
                                                        </div>) }
                                <div className="cartCreditToggler col-md-6">
                                    <label className="switch">
                                        <input type="checkbox" checked={ (cartCredits.status) ? true : "" } onChange={cartCreditsStatusToggle} />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row mx-0 mt-2 mb-4 align-items-center">
                        <div className="col-md-6 d-flex justify-content-center align-items-center">
                            <h4><b>GST Applied ({GST}%)</b></h4>
                        </div>
                        <div className="col-md-6 d-flex justify-content-center align-items-center">
                            <h4><b>₹{GSTApplied}</b></h4>
                        </div>
                    </div>

                    <div className="row m-0 align-items-center">
                        <div className="col-md-6">
                            <h4>Total Amount: ₹{ finalTotalAmount }</h4>
                        </div>
                        <div className="col-md-6 p-0">
                            <button className="btn btn-lg btn-block btn-success" style={{borderRadius:0}}>Order</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default CartSubmitBlock;