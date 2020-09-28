import React, {Component} from 'react';
import Button from '../../../component/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../component/UI/Input/Input'

class ContactData extends Component {
    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your name'
                },
                value:'',
                validation:{
                    required:true
                },
                isValid:false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                isValid:false,
                touched:false
            },
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Zip Code'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:3,
                    maxLength:6
                },
                isValid:false,
                touched:false
            },
            Country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required:true
                },
                isValid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your email'
                },
                value:'',
                validation:{
                    required:true
                },
                isValid:false,
                touched:false
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value: 'fastest' , displayValue:'Fastest'},
                        {value: 'cheapest' , displayValue:'Cheapest'}
                    ]
                },
                value:'',
                validation:{},
                isValid:true,
            },

        },
        formIsValid:false
    }

    checkValidity(value, rules){
        let isValid=true;
        if(rules.required){
            isValid= value.trim() !=='' && isValid;
        }

        if(rules.minLength){
            isValid=value.length >=  rules.minLength && isValid
        }

        if(rules.maxLength){
            isValid=value.length <= rules.maxLength && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) =>{
        const updateOrderForm={
            ...this.state.orderForm
        }
        const updatedFormElement={
            ...updateOrderForm[inputIdentifier]
        }
        updatedFormElement.value=event.target.value;
        updatedFormElement.isValid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation)
        updateOrderForm[inputIdentifier]=updatedFormElement;
        updatedFormElement.touched=true;

        let formIsValid=true;
        for(let inputIdentifier in updateOrderForm){
            formIsValid=updateOrderForm[inputIdentifier].isValid && formIsValid
        }

        console.log(formIsValid);
        this.setState({orderForm:updateOrderForm, formIsValid:formIsValid});
    }

    

    orderHandler =(event) =>{
        event.preventDefault();

        const formData={};
        for(let inputIdentifier in this.state.orderForm){
            formData[inputIdentifier]=this.state.orderForm[inputIdentifier].value;
        }

        const order={
            ingredients:this.props.ingredients,
            price:this.props.price,
            orderData:formData
        };
        axios.post('/orders.json',order)
        .then(responce => {
            console.log(responce);
            this.props.history.push('/')
        }).catch(error => console.log(error));
    }

    render(){

        const formElementsArray=[];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        };
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact Data</h4>
                <form onSubmit={this.orderHandler}> 
                    {formElementsArray.map( formElement => {
                       return( <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        inValid={!formElement.config.isValid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event,formElement.id)}
                        />)
                    })
                    }
                    <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;