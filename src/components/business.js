import React from 'react'
import {Link} from 'react-router-dom'
import RatingForm from '../containers/ratingForm'
import Ratings from './ratings'

const businessRating = (ratings)=>{
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

const businessDetails = ({business,distance})=>{
    if(business){
        return(
            <div>
                <div className='text-center'>
                    <h1>{business.name}</h1>
                </div><br/>
                <div className='text-center'>
                    <p style={{fontSize:16}} >{business.description}</p>
                </div><br/>
                <div className='text-center'>
                    <h3>Rated <span style={{color:'red'}}>{businessRating(business.ratings)}</span>/5 by {business.ratings.length} people</h3>
                    
                </div><br/>
                <div className='text-center'>
                    <h3>{distance} Miles Away</h3>
                </div><br/><br/>
                <RatingForm businessId={business._id}/>
                <Ratings ratings={business.ratings} business={business.name}/>
            </div>
        )
    }
}


const Business = (props)=>{
    return(
        <div className='container'>
            <Link className='btn btn-success text-center' to={'/'} style={{marginTop:30,marginLeft:20}}>Return to Search Page</Link><br />
            {businessDetails(props)}
        </div>
    )
}

export default Business;