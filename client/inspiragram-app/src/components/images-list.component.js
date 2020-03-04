import React, { Component } from 'react';
import axios from 'axios';
import Quotes from '../media/quotes.json';

const API_URL = "https://api.unsplash.com/photos/random"
const CLIENT_ID = ""

const Image = props => (
    <div className="overlay-image d-flex">
        <img className="image p-1 " alt={props.image.alt_description} src={props.image.urls.regular} />
        <div className="quote p-2">
            {props.quote.text}
            <br/>
            -{props.quote.author}
        </div>
    </div>
)

export default class ImagesList extends Component{

    constructor(props){
        super(props)
        this.state = {
            images: [],
            quotes: Quotes
        }

        this.getQuote = this.getQuote.bind(this);
    }

    //get images from api
    componentDidMount(){
        axios.get(API_URL,{
            params: {
                client_id: CLIENT_ID,
                count: "30",
                query: "nature"
            }
        })
        .then( response => {
            console.log(response.data)
            this.setState({
                images: response.data
            })
        })
    }

    getQuote(){
        return this.state.quotes[Math.floor(Math.random() * this.state.quotes.length)]
    }

    //create images
    imagesList(){
        return this.state.images.map( (currentImage => {
            return <Image image={currentImage} quote={this.getQuote()} key={currentImage.id}/>
        }))
    }

    render(){
        return(
            <div className="d-flex flex-wrap justify-content-center">
                { this.imagesList() }
            </div>
        )
    }
}

