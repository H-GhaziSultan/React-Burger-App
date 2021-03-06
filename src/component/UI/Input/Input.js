import React from 'react';
import classes from './Input.css'

const input = (props) =>{
    let inputElement=null;
    let inputClasses=[classes.InputElement];
    if(props.inValid && props.shouldValidate && props.touched){
        inputClasses.push(classes.InValid)
    }
    switch (props.elementType){
        case ('input'):
            inputElement= <input className={inputClasses.join(' ')} onChange={props.changed} {...props.elementConfig} value={props.value} />;
            break;
        
        case ('textArea'):
            inputElement=<textarea className={inputClasses.join(' ')} onChange={props.changed} {...props.elementConfig} value={props.value} />;
            break;
        case ('select'):
            inputElement=(
                <select 
                className={inputClasses.join(' ')}
                onChange={props.changed}
                value={props.value}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </select>
            );
            
            break;
        default:
            inputElement= <input className={inputClasses.join(' ')} onChange={props.changed} {...props.elementConfig} value={props.value} />;
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}> {props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;