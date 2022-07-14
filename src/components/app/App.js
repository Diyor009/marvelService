import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundery from "../errorBoundery/ErrorBoundery";

import decoration from '../../resources/img/vision.png';

class App extends Component {
    state= {
        showRandomChar: true,
        selectedChar: null
    }

    onCharSelected = (id) => {
        this.setState({ 
            selectedChar: id
        })
    }    

    toggleRandomChar = () => {
        this.setState((state) => {
            return{
                showRandomChar: !state.showRandomChar
            }            
        }) 
    }

    render(){
          
        return (
            <div className="app">
                <AppHeader/>
                <main>   
                    {this.state.showRandomChar ? <RandomChar/> : null}
                    <div className="char__content">
                        <CharList onCharSelected={this.onCharSelected}/>
                        <ErrorBoundery>
                            <CharInfo charId={this.state.selectedChar}/>
                        </ErrorBoundery>
                        
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }    
}

export default App;