import React, { Component } from 'react';
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class CartItem extends Component {
    state = { 
        style : { itemImg : { width:120,height:120 } }
    }

    render() { 
        const {item,onIncrement,onDecrement,onDelete} = this.props;
        return ( 
            <div className="card my-2 mx-0">
                <div className="d-flex flex-row">
                    <div className="mr-5">
                        <img src={item.img} alt="" style={this.state.style.itemImg} />
                    </div>
                    <div className="d-flex flex-column my-3 align-items-center text-dark">
                        <h2 className="">{item.name}</h2>
                        <div>
                            <button onClick={()=>onIncrement(item.id)} className="btn btn-info mr-3"><FontAwesomeIcon icon={faPlus}/></button>
                            <span className="badge badge-primary mr-3" style={{fontSize:15}}>{item.quantity}</span>
                            <button onClick={()=>onDecrement(item.id)} className="btn btn-secondary mr-3"><FontAwesomeIcon icon={faMinus}/></button>
                            <button onClick={()=>onDelete(item.id)} className="btn btn-danger mr-3"><FontAwesomeIcon icon={faTrash}/></button>
                            <span className="badge badge-success mr-3" style={{fontSize:20}}>Total: ₹{item.price*item.quantity}</span>    
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}
 
export default CartItem;
