import React,{Component} from 'react';
import Order from '../../component/Order/Order';
import axios from '../../axios-orders'

class Orders extends Component{
    state={
        orders:[]
    }

    componentDidMount(){
        axios.get('/orders.json')
        .then(responce => {
            console.log(responce.data);
            let fetchedOrders=[];
            for(let key in responce.data){
                fetchedOrders.push({
                    ...responce.data[key],
                    id:key
                })
            }
            this.setState({orders:fetchedOrders})
        }).catch(error => console.log(error));
    }
    render (){
        return (
            <div>
                {this.state.orders.map(order =>{
                     return <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price}
                    />
                     
                })}
            </div>
            
        );
    }
}

export default Orders;