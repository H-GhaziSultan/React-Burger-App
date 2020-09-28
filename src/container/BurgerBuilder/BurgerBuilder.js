import React,{Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../component/Burger/Burger';
import BuilderControls from '../../component/Burger/BuildControls/BuildControls';
import Modal from '../../component/UI/Modal/Modal';
import OrderSummary from '../../component/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

const INGREDIENT_PRICE={
    salad:0.5,
    cheese:0.2,
    meat:1.2,
    bacon:0.5
};

class BurgerBuilder extends Component{

    state={
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice:4,
        purchasable:false,
        purchasing:false
    }

    updatePurchaseState(ingredients){
        const sum=Object.keys(ingredients).
        map(igkey => {
            return ingredients[igkey];
        })
        .reduce((sum,el) => {
            return sum+el;
        },0);
        this.setState({purchasable:sum > 0})

    }

    addIngredientHandler = (type) => {
        const oldCount=this.state.ingredients[type];
        const newIngredientCount=oldCount+1;
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=newIngredientCount;
        const oldPrice=INGREDIENT_PRICE[type];
        const newPrice=this.state.totalPrice+oldPrice;
        this.setState({
            totalPrice:newPrice,
            ingredients:updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    };
    removeIngredientHandler = (type) =>{

        if (this.state.ingredients[type]<=0){
            return;
        }
        const oldCount=this.state.ingredients[type];
        const newIngredientCount=oldCount-1;
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=newIngredientCount;
        const oldPrice=INGREDIENT_PRICE[type];
        const newPrice=this.state.totalPrice-oldPrice;
        this.setState({
            totalPrice:newPrice,
            ingredients:updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    };

    purchaseHandler = () => {
        this.setState({purchasing:true});
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }
    purchaseContinueHandler = () => {
        // const order={
        //     ingredients:this.state.ingredients,
        //     price:this.state.totalPrice,
        //     Customer:{
        //         name:'XYZ',
        //         address:'Test strett1'
        //     }
        // };
        // axios.post('/orders.json',order)
        // .then(responce => console.log(responce))
        // .catch(error => console.log(error));
        const queryParam=[];
        for(let i in this.state.ingredients)
        {
            queryParam.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParam.push("price"+ '=' + this.state.totalPrice)
        const queryString=queryParam.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search: '?' + queryString
        })
    }

    render(){
        const ingredientDisabledInfo={...this.state.ingredients};
        for(let key in ingredientDisabledInfo){
            ingredientDisabledInfo[key]=ingredientDisabledInfo[key] <=0;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuilderControls
                 ingredientAdded={this.addIngredientHandler}
                 ingredientRemoved={this.removeIngredientHandler}
                 disabled={ingredientDisabledInfo}
                 price={this.state.totalPrice}
                 ordered={this.purchaseHandler}
                 purchasable={this.state.purchasable}/>
            </Aux>
        );
    }
};

export default BurgerBuilder;