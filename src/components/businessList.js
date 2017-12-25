import React,{Component} from 'react'
import {Link} from 'react-router-dom'

var zipcodes = require('zipcodes')


class BusinessList extends Component{
    constructor(props){
        super(props);

        this.state={
            businessList:this.props.businesses,
            filtered:[],
            zipcode:this.props.zipcode
        }

    }

    componentDidMount(){
        var filtered = this.state.businessList;
        var zipcode = this.state.zipcode;
        var final;
        var distance=[];

    
        for (var i=0; i<filtered.length && zipcode.length === 5 && typeof Number(zipcode) === "number"; i++){
            distance.push(zipcodes.distance(zipcode, filtered[i].zipcode));
            filtered[i].distance = distance[i];
            final = filtered.sort(function (a, b) {
                return a.distance - b.distance;
              })
            
        }
            this.setState({
                filtered:final
            });     

    }

    businessRating = (ratings)=>{
        var ratingsSum=0;
        if(ratings){
            for (var i=0; i < ratings.length; i++){
                ratingsSum+=ratings[i].rating;
            }
            if(ratings.length > 0){
                return ratingsSum/ratings.length
            }else{
                return 0
            }
        }
        
    }


    parseBusinessList = (state, props)=>{
        const {filtered} = state;
        var zipcode = state.zipcode;
      
        if(filtered && !isNaN(zipcode) && zipcode.length === 5){
            return filtered.map((business)=>{
                return(
                        <Link classname="business_link col-md-8 col-xs-12 text-center" 
                        to={`/business/${business.distance}/${business._id}`} key={business._id}
                        style={{color:'gray', fontSize:17, marginBottom:20}}
                        >
                        <div className='row'>
                            <div className='col-md-4'>
                                <h3>{business.name}</h3>
                            </div>
                            <div className='col-md-4'>
                                <h3>{this.businessRating(business.ratings)}/5 Rating</h3>
                            </div>
                            <div className='col-md-4'>
                                <h3>{business.distance} miles away</h3>
                            </div>
                        </div>
                        <hr/>
                        </Link>
                )
            })
        } else{
            return(
                <div className='text-center' style={{marginTop:200, fontSize:20}} >Enter a valid 5 digit postal code</div>
            )
        }
    }

    render(){
        // console.log(this.state.filtered)
        return(
            <div>
                {this.parseBusinessList(this.state, this.props)}
            </div>
        )
    }
}

export default BusinessList;