export  const API_KEY = 'AIzaSyDsrnPTadq71yVu2bPWqSixSg6k5OjEv18'

export const value_converter =(value)=>{
    if(value >= 1000000){
        return Math.floor(value/1000000)+"M"

    }
    else if (value >= 1000){
        return Math.floor(value/1000)+"K"

    }
    else{
        return value
    }

}