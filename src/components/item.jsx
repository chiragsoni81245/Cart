import React, { Component } from 'react';
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class Item extends Component {
    state = {
        style : {
            quantityControlButton : { 
                                    fontSize: 15,
                                    width : "3em"
                                },
            quantity :{ fontSize:20 },
            itemCard : { width: "20em" }
        }
    }

    quanityControler = () =>{
        const {item,quantity,onIncrement,onDecrement,onDelete} = this.props;
        return (
            <div>
                <h5 className="m-1">Quantity</h5>
                <h5 className="badge badge-primary m-1" style={this.state.style.quantity}>{ quantity }</h5><br/>
                <button 
                    onClick={()=>onIncrement(item.id)} 
                    className="btn btn-info px-1 mx-2 my-3" 
                    style={ this.state.style.quantityControlButton }>
                        <FontAwesomeIcon icon={faPlus} />
                </button>
                <button 
                    onClick={()=>onDecrement(item.id)} 
                    className="btn btn-danger px-1 mx-2 my-3" 
                    style={ this.state.style.quantityControlButton }>
                        <FontAwesomeIcon icon={faMinus} />
                </button>
                <button 
                    onClick={()=>onDelete(item.id)} 
                    className="btn btn-danger px-1 mx-2 my-3" 
                    style={ this.state.style.quantityControlButton }>
                        <FontAwesomeIcon icon={faTrash} />
                </button><br/>
                <h3 className="m-2">
                    <span className="badge badge-success">Total&nbsp;&nbsp;₹{ item.price*quantity }</span>
                </h3>    
            </div>
        );
    }
    
    render() { 
        const {item,quantity,onIncrement} = this.props;
        return ( 
            <div className="card text-center p-3 m-3 shadow-sm" style={this.state.style.itemCard}>
                <img src={ item.img } className="mx-auto img-fluid" alt="" />
                <h3 className="mt-2 mb-3"><b>{ item.name }</b></h3>
                <p>
                    Price&nbsp;&nbsp;
                    <span className="badge badge-info" style={{fontSize:14}}>₹{ item.price }</span>
                    &nbsp;&nbsp;{ item.priceDescription }
                </p>
                { (quantity===0) && <button 
                                                onClick={()=>onIncrement(item.id)} 
                                                className="btn btn-success m-1">
                                                    Add to Cart
                                            </button> }
                { (quantity!==0) && this.quanityControler() }
            </div>
        );
    }
}
 
export default Item;