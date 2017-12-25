var baseUrl = "/api/business"

export function postNewBusiness(values,cb){
    const request = fetch(baseUrl, {
        method:'POST',
        headers:{
            'Accept':"application/json",
            'Content-Type':"application/json"
        },
        body:JSON.stringify(values)
    }).then(()=>cb());

    return{
        type:'POST_BUSINESS',
        payload:'Business Posted'
    }
}

export function getBusinesses(){
    const request = fetch(baseUrl, {method:'GET'})
    .then(res=>res.json())

    // console.log(request)

    return {
        type:'GET_BUSINESS',
        payload: request
        
    }
}

export function getIndividualBusiness(businessId){
    const request = fetch(`${baseUrl}/${businessId}`, {method:'GET'})
    .then(res=>res.json())

    // console.log(request)

    return {
        type:'GET_INDIVIDUAL_BUSINESS',
        payload: request
        
    }
}

export function sendRating(values,id,cb){
    const request = fetch( `${baseUrl}/${id}/rating`, {
        method:'POST',
        headers:{
            'Accept':"application/json",
            'Content-Type':"application/json"
        },
        body:JSON.stringify(values)
    }).then(()=>cb());

    return{
        type:'SEND_RATING',
        payload:'Rating Posted'
    }
}

