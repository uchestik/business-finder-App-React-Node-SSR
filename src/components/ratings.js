import React from 'react'

const Ratings = ({ratings, business})=>{
    if(ratings && business){
        return ratings.map((rating)=>{
            return(
                <div className='text-center' style={{fontSize:17,marginBottom:10}}>
                    {rating.name} rated {business} {rating.rating}/5
                </div>
            )
        })
    }
}

export default Ratings;