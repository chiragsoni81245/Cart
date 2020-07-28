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
        const totalItemsAmount = totalAmount
        const discountAmount = couponApplied.length!==0 ? Math.round(( ((couponApplied[0].discount*totalAmount)/100) + Number.EPSILON) * 100) / 100 : 0
        let finalTotalAmount = couponApplied.length!==0 ? totalAmount-(couponApplied[0].discount*totalAmount)/100 : totalAmount
        const GSTApplied = Math.round(( ((finalTotalAmount*GST)/100) + Number.EPSILON) * 100) / 100
        finalTotalAmount += GSTApplied
        finalTotalAmount = Math.round((finalTotalAmount + Number.EPSILON) * 100) / 100
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
            <div className="d-flex flex-column text-center text-dark">
                <div className="d-flex flex-column p-0">
                    
                    <div className="row mx-0 mb-2 align-items-center">
                        <div className="col-md-6 d-flex justify-content-center align-items-center">
                            <h5>Total Items Amount</h5>
                        </div>
                        <div className="col-md-6 d-flex justify-content-center align-items-center">
                            <h5><b>₹{totalItemsAmount}</b></h5>
                        </div>
                    </div>

                    { (couponApplied.length===0) && (
                        <React.Fragment>
                            <div className="row mx-0 m-1 align-items-center">
                                <div className="col-md-6">
                                    <h5>Discount Coupon</h5>
                                </div>
                                <div className="col-md-6">
                                    <input onKeyUp={this.validateCouponCaller} type="text" className="form-control" placeholder="Coupon"/>
                                </div>
                            </div>
                        </React.Fragment>
                    )}
                    
                    { (couponApplied.length!==0) && (
                        <React.Fragment>
                            <div className="row mx-0 m-1 align-items-center">
                                <div className="col-md-6 d-flex justify-content-center align-items-center">
                                    <h5>Coupon Applied</h5>
                                </div>
                                <div className="col-md-6 d-flex justify-content-center align-items-center">
                                    <span className="badge badge-primary p-2 mr-2" style={{fontSize:20}}>{couponApplied[0].name}</span>
                                    <span className="badge badge-primary p-2 mr-2" style={{fontSize:20}}>₹{discountAmount}</span>
                                    <button onClick={()=> removeCoupon(couponApplied[0].name) } className="btn btn-danger m-1">&times;</button>
                                </div>
                            </div>
                        </React.Fragment>
                    )}

                    <div className="row mx-0 m-2 align-items-center">
                        <div className="col-md-6">
                            <h5>Cart Credits (₹{cartCredits.value})</h5>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                { (cartCredits.status) && (<div className="col-md-2">
                                                                <span style={{fontSize:16}} className="badge badge-primary m-1 py-2">Used ₹{creditUsed}</span>
                                                        </div>) }
                                <div className={ cartCredits.status ? "cartCreditToggler m-1 col-md-6" : "cartCreditToggler m-1 col-md-12" }>
                                    <label className="switch">
                                        <input type="checkbox" checked={ (cartCredits.status) ? true : "" } onChange={cartCreditsStatusToggle} />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row mx-0 mb-2 align-items-center">
                        <div className="col-md-6 d-flex justify-content-center align-items-center">
                            <h5>GST Applied ({GST}%)</h5>
                        </div>
                        <div className="col-md-6 d-flex justify-content-center align-items-center">
                            <h5><b>₹{GSTApplied}</b></h5>
                        </div>
                    </div>

                    <div className="row m-0 align-items-center">
                        <div className="col-md-6">
                            <h5><b>Total Amount: ₹{ finalTotalAmount }</b></h5>
                        </div>
                        <div className="col-md-6 p-0">
                            <button className="btn btn-lg btn-block btn-success">Order</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default CartSubmitBlock;