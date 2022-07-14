import { Component } from "react";
import ErorrMessage from "../erorrMessage/errorMessage";

 class ErrorBoundery extends Component{
   state ={
      erorr: false
   }

   static getDerivateStateFromError(erorr){
      return {erorr: true}
   }

   componentDidCatch(erorr, erorrInfo){
      console.log(erorr, erorrInfo)
      this.setState({
         erorr: true
      })
   }
   render(){
      if(this.state.erorr){
         return(
            <ErorrMessage/>
         )
      }
      return this.props.children
   }
}
export default ErrorBoundery;