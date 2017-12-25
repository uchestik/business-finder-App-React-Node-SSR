import React,{Component} from 'react'
import {Redirect, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm} from 'redux-form';
import { sendRating } from '../actions';




class RatingForm extends Component{
    

    submit(values){
        this.props.sendRating(values, this.props.businessId,()=>{
            this.props.reset();
        });
     
    }

    clear = ()=>{
        this.props.reset()
    }

    renderInputField(field){
        const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`

        return(
            <div className={className}>
                <input
                type='text'
                className='form-control'
                placeholder={field.placeholder}
                {...field.input}
                />
                <div className='error'>
                    {field.meta.touched ? field.meta.error:''}
                </div>
            </div>
        )
    }

    renderNumberField(field){
        const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`

        return(
            <div className={className}>
                <input
                type='number'
                className='form-control'
                placeholder={field.placeholder}
                {...field.input}
                />
                <div className='error'>
                    {field.meta.touched ? field.meta.error:''}
                </div>
            </div>
        )
    }



    render(){
        
        return(
            <div className='col-md-12 col-sm-12 col-xs-12 signInFormPosition'>
            <div className='signIn_form text-center'>
                <h3 id='signIn_form_header' style={{color:'gold'}} >Post a Rating</h3>
                <form onSubmit={this.props.handleSubmit((event)=>this.submit(event))}>
                    <div className='form-row'>
                        <div className='form-group col-md-6'>
                            <Field
                                placeholder='Name*'
                                name='name'
                                component={this.renderInputField}
                            />
                        </div>
                        <div className='form-group col-md-6'>
                            <Field
                                placeholder='Rating'
                                name='rating'
                                component={this.renderNumberField}
                            />
                        </div>
                    </div>
                   
                    <button type="submit" className="btn btn-primary submit" style={{marginRight:10}}>Submit</button>
                    <button type='button' className='btn btn-danger' onClick={()=>this.clear()}>Cancel </button>
                </form><br/>

            </div>
            </div>
        )
    }
}

function validate(values){
    const errors={}

    if(!values.name){
        errors.name = 'Please Enter Your Name'
    }
    if(!values.rating ||  values.rating < 0 || values.rating > 5){
        errors.rating = 'Enter a Number from 0 to 5'
    }
    
    return errors;
}

function mapStateToProps(state){
    return{
        success:state.data
    }
}

export default reduxForm({validate, form:'RatingForm'}) (
    connect(mapStateToProps,{sendRating})(RatingForm)
)