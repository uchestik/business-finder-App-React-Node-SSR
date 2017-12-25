import React,{Component} from 'react'
import {getIndividualBusiness} from '../actions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Business from '../components/business'

class IndividualBusiness extends Component{

    componentDidMount(){
        this.props.getIndividualBusiness(this.props.match.params.businessId)
    }

   

    render(){
        // console.log(this.props.SingleBusiness.business)
        return(
            <div>
                <Business business={this.props.SingleBusiness.business} distance={this.props.match.params.businessDistance}/>
            </div>
        )
    }

}

function mapStateToProps(state){
    return{
        SingleBusiness:state.businesses
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getIndividualBusiness
    }, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(IndividualBusiness)