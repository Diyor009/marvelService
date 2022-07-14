import { Component } from "react";

class ErorrBoundery extends Component{
   state = {
      erorr : false
   }

   componentDidCatch(erorr, errorInfo){
      console.log(erorr, errorInfo)
      this.setState({
         erorr: true
      })
   }
   render(){
      if(this.state.erorr){
         return <h2>Somethisng went wrong</h2>
      }
      return this.props.childen
      
   }
}