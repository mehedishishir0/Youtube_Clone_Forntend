export const API_KEY = "AIzaSyCcZlGOcCiD2qwzWIyDOaHH48cNzROCU8s"

export const value_convart = ( value) => {
  if(value>=1000000){
    return Math.floor(value/1000000)+"M"
  }
  else if(value>=1000){
   return Math.floor(value/1000)+"K"
  }
  else{
    return value
  }
}