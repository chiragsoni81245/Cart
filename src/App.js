import React, { Component } from 'react';
import NavBar from './components/navBar'
import Cart from './components/cart'
import Item from './components/item'
import item1 from './imgs/item1.jpg'
import "./App.css"


class App extends Component {

  componentDidUpdate(prevProps, prevStates){
    delete prevStates["cartState"]
    delete prevStates["open"]
    delete prevStates["items"]
    delete prevStates["coupon"]
    const currentStates = {...this.state};
    delete currentStates["cartState"]
    delete currentStates["open"]
    delete currentStates["items"]
    delete currentStates["coupon"]
    if(JSON.stringify(prevStates) !== JSON.stringify(currentStates)){
      this.props.socket.emit("updateData",currentStates);
    }
  }

  state = {
    open: false,
    cartState : false,
    coupon :[
      { id:1, name:"GAUTAM50", discount: 50 }
    ],
    couponApplied: [],
    GST : 18,
    cartCredits : {
      value : 100,
      status : false
    },
    cartItems : [
      { id:1, img: item1, name:"Pizza", price: 100, priceDescription:"Per Piece", quantity: 1 },
      { id:2, img: item1, name:"Pizza", price: 200, priceDescription:"Per Piece", quantity: 1 },
    ],
    items : [
      { id:1, img: item1, name:"Pizza", price: 100, priceDescription:"Per Piece" },
      { id:2, img: item1, name:"Pizza", price: 200, priceDescription:"Per Piece" },
      { id:3, img: item1, name:"Pizza", price: 230, priceDescription:"Per Piece" },
      { id:4, img: item1, name:"Pizza", price: 240, priceDescription:"Per Piece" },
      { id:5, img: item1, name:"Pizza", price: 224, priceDescription:"Per Piece" },
      { id:6, img: item1, name:"Pizza", price: 211, priceDescription:"Per Piece" },
      { id:7, img: item1, name:"Pizza", price: 211, priceDescription:"Per Piece" },
      { id:8, img: item1, name:"Pizza", price: 221, priceDescription:"Per Piece" },
      { id:9, img: item1, name:"Pizza", price: 211, priceDescription:"Per Piece" },
      { id:10, img: item1, name:"Pizza", price: 211, priceDescription:"Per Piece" },
      { id:11, img: item1, name:"Pizza", price: 211, priceDescription:"Per Piece" },
      { id:12, img: item1, name:"Pizza", price: 211, priceDescription:"Per Piece" },
    ]
  }

  handleCouponValidation = (name) =>{
    const coupon = this.state.coupon.filter(c=>c.name===name.toUpperCase())
    if(coupon.length===0){
      return false;
    }else{
      this.setState({ couponApplied : coupon });
      return true;
    }
  }

  handleRemoveCoupon = (name) =>{
    const coupon = this.state.coupon.filter(c=>c.name===name)
    if(coupon.length!==0){
      this.setState({ couponApplied : [] });
    }
  }

  handleCartCreditsStatusToggle = () =>{
    const cartCredits = {...this.state.cartCredits};
    cartCredits.status = (this.state.cartCredits.status) ? false : true;
    this.setState({ cartCredits })
  }

  getItemQuantity = (id)=>{
    const item = this.state.cartItems.filter( c=> c.id===id );
    if( item.length===0 ) return 0;
    return item[0].quantity
  }

  getTotalAmount = () =>{
    let totalAmount = 0;
    this.state.cartItems.forEach(item=> {
            const price = this.state.items.filter(c=>c.id===item.id)[0].price;
            totalAmount += (price*item.quantity);
    })
    return totalAmount;
  }

  handleQuntityIncrement = (id) =>{
    let item = this.state.cartItems.filter(c=>c.id===id)
    if( item.length>0 ){
      item = item[0] 
      const cartItems = [...this.state.cartItems] 
      const index = cartItems.indexOf( item );
      cartItems[index] = {...item}
      cartItems[index].quantity++;
      this.setState({ cartItems })
    }else{
      const cartItems = [...this.state.cartItems];
      item = this.state.items.filter(c=>c.id===id)[0];
      item["quantity"] = 1;
      cartItems.push( item );
      this.setState({ cartItems })
    }
  }

  handleQuntityDecrement = (id) =>{
    let item = this.state.cartItems.filter(c=>c.id===id)
    if( item.length>0 ){
      item = item[0] 
      if( item.quantity>1 ){
        const cartItems = [...this.state.cartItems] 
        const index = cartItems.indexOf( item );
        cartItems[index] = {...item}
        cartItems[index].quantity--;
        this.setState({ cartItems })
      }else if( item.quantity===1 ){
        const cartItems = this.state.cartItems.filter(c=>c.id!==id)
        this.setState({ cartItems });
      }
    }
  }

  handleDelete = (id) =>{
    let item = this.state.cartItems.filter(c=>c.id===id)
    if( item.length>0 ){
        const cartItems = this.state.cartItems.filter(c=>c.id!==id)
        this.setState({ cartItems });
      }
  }

  handleShowCart = () =>{
    this.setState({ cartState : true })
  }

  handleHideCart = () =>{
    this.setState({ cartState : false })
  }

  render() { 
    return ( 
      <React.Fragment>
        <NavBar 
          totalItems={this.state.cartItems.length}
          totalAmount={ this.getTotalAmount() }
          showCart={this.handleShowCart}
        />
        <Cart 
            cartState={this.state.cartState}
            hideCart={this.handleHideCart}
            cartItems={this.state.cartItems}
            onIncrement={this.handleQuntityIncrement}  
            onDecrement={this.handleQuntityDecrement}  
            onDelete={this.handleDelete}
            totalAmount={this.getTotalAmount()}
            couponApplied={this.state.couponApplied}
            removeCoupon={this.handleRemoveCoupon}
            validateCoupon={this.handleCouponValidation}
            cartCredits={this.state.cartCredits}
            cartCreditsStatusToggle={this.handleCartCreditsStatusToggle}
            GST={this.state.GST}
        />
        <main className="container">
          <div className="d-flex flex-wrap flex-row  justify-content-center m-4">
            { this.state.items.map( item => <Item 
                                              key={item.id} 
                                              item={ item }
                                              quantity={ this.getItemQuantity(item.id) }
                                              onIncrement={this.handleQuntityIncrement}  
                                              onDecrement={this.handleQuntityDecrement}  
                                              onDelete={this.handleDelete}  
                                          /> ) }
          </div>
        </main>
      </React.Fragment>
    );
  }
}
 
export default App;
