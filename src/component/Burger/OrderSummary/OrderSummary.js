import React,{Component} from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

    componentWillUpdate(){
        console.log('Order Summary Componennt will Update');
    }
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igkey => { 
        return (
            <li key={igkey}>
            <span style={{textTransform:'cap'}}>{igkey}</span>:{this.props.ingredients[igkey]}
            </li>)
        })
        return(
            <Aux>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Toal price is: {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Aux>
        );
    }
};

export default OrderSummary;