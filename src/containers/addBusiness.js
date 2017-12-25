import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm} from 'redux-form';
import { postNewBusiness } from '../actions';




class BusinessForm extends Component{
    

    submit(values){
        this.props.postNewBusiness(values,()=>{
            this.props.history.push('/');
        });
     
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

    renderTextAreaField(field){
        const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`

        return(
            <div className={className}>
                <textarea
                type='text'
                rows='5'
                className='form-control text-area'
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
            <div className='container'>
            <div className='col-md-12 col-sm-12 col-xs-12 text-center'>
                <h3 id='signIn_form_header'>Add a business to the Database</h3>
                <form onSubmit={this.props.handleSubmit((event)=>this.submit(event))}>
                    <div className='form-row'>
                        <div className='form-group col-md-6'>
                            <Field
                                placeholder='Business Name*'
                                name='name'
                                component={this.renderInputField}
                            />
                        </div>
                        <div className='form-group col-md-6'>
                            <Field
                                placeholder='Zipcode*'
                                name='zipcode'
                                component={this.renderNumberField}
                            />
                        </div>
                    </div>
                    
                    <div className='form-group'>
                            <Field
                                placeholder='Enter business description ....'
                                name='description'
                                component={this.renderTextAreaField}
                            />
                    </div>
                    <button type="submit" className="btn btn-primary submit" style={{marginRight:15}}>Submit</button>
                    <Link to='/'><button type='button' className='btn btn-danger'>Cancel </button></Link>
                </form><br/><br/>

                <span  className='copyright'>Copyright <i  className="fa fa-copyright" aria-hidden="true"></i> 2017 <br/>Business Finder Project</span><br /> <br/>

            </div>
            </div>
        )
    }
}

function validate(values){
    const errors={}

    if(!values.name || values.name > 100){
        errors.name = 'Business name under 100 characters Required'
    }
    if(!values.zipcode || values.zipcode.length > 5 ||  values.zipcode.length < 5){
        errors.zipcode = 'Enter a valid 5 digit zipcode'
    }
    if(!values.description || values.description.length > 400){
        errors.description='Business description under 400 characters required'
    }
    return errors;
}

function mapStateToProps(state){
    return{
        success:state.data
    }
}

export default reduxForm({validate, form:'BusinessForm'}) (
    connect(mapStateToProps,{postNewBusiness})(BusinessForm)
)