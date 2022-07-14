import { Component } from 'react';
import PropTypes from 'prop-types'
import './charList.scss';
import Spinner from '../spinner/spinner';
import MarvelService from '../../services/MarvelService';
import ErorrMessage from '../erorrMessage/errorMessage';


class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        erorr: false,
        newItemLoading: false,
        offset: 1550,
        charEnded: false
    }   

    marvelService = new MarvelService()

    componentDidMount(){
        this.onRequest()
    }
    
    onRequest = (offset) => {
        this.onCharlistLoading()
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharlistLoaded)
            .catch(this.onErorr)
    }

    onCharlistLoading = () => {
        this.setState({
            newItemLoading: true
        })
    } 

    onCharlistLoaded = ( newCharList) => {
        let ended = false
        if(newCharList.lenth < 9){
            ended = true
        }       

        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false, 
            offset: offset + 9,
            charEnded : ended
        }))
    }

    onErorr = () => {
        this.setState({
            erorr: true,
            loading: false
        })
    }
    renderItems(arr){
        const items = arr.map((item) => {
            let imgStyle = {'objectFit': "cover"}
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            return (
                <li className="char__item"
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}
                    >                                      
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>  
            )
        })
        return(
            <ul className="char__grid">
                {items}                   
            </ul>
        )
    }

    render() {
        const {charList, loading, error, offset, newItemLoading, charEnded} = this.state;
        const items = this.renderItems(charList)

        const erorrMessage = error ? <ErorrMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null
        return (
            <div className="char__list">
                {erorrMessage}
                {spinner}
                {content}          
                <button                    
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
    
}
CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;