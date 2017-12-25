import React, {Component} from 'react'
import {getBusinesses} from '../actions'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import BusinessList from '../components/businessList'

class Home extends Component{
    constructor(props){
        super(props);

        this.state={
            zipcode:'',
            marginTop:100,
            width:200
        }
    }

    componentDidMount(){
        this.props.getBusinesses()
    }

    changeInput = (event)=>{
        this.setState({
            zipcode:event.target.value
        })
    }

    searchForm = (state)=>{

        return(
            <div>
                <Link className='btn btn-primary' to={'/addbusiness'} style={{marginTop:15,marginBottom:15, color:'white'}} >Add a business to the Database</Link>
                <h1 className='text-center'>Find Businesses with Zipcode</h1>
                 <form>
                <div className='col-md-12 col-sm-12 col-xs-12 searchbox'>
                    <div className='search-container input-group'>
                        <input  type='text' className='form-control search text-center' 
                        placeholder='Enter a zipcode' id='searchbar' 
                        value={state.zipcode}
                        onChange={this.changeInput}/>
                        <div className='input-group-addon'><i className="fa fa-search" aria-hidden="true"></i></div>
                    </div>
                </div>
                </form>
            </div>
        )
    }

    businessList = (props)=>{
        const {zipcode} = this.state
        if(zipcode === ''){
            return(
                <div>
                    <h1 className='text-center' style={{marginTop:200}}>No Businesses Searched</h1>
                </div>
            )
            
        } else if(zipcode.length === 5){
            return(
                <div>
                    <BusinessList zipcode={zipcode} businesses={props.businesses.businesses}/>
                </div>
            )
            
        }
    }

    render(){
        const {zipcode} = this.state
        return(
            <div className='container'>
               {this.searchForm(this.state)}
               {this.businessList(this.props)}
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        businesses:state.businesses
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getBusinesses}, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps)(Home);