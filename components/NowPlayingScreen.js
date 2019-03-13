import React, {Component} from 'react';
import Header from './Header.js';
import { Text, View, ScrollView, Image, StyleSheet } from 'react-native';
import axios from 'axios'

class NowPlayingScreen extends Component {
    state={
        image: "",
        title: "",
        popularity: "",
        release_date: "",
        overview: ""
    }
    componentDidMount(){
        axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=8367b1854dccedcfc9001204de735470&language=en-US`)
        .then(response => {
            if (!response.data.errmsg) {
            //   this.setState({movies : response.data.articles})
                console.log('get operation successful')
                let movie = response.data.results[Math.floor(Math.random()*response.data.results.length)];
                console.log(movie)
                this.setState({image: movie.poster_path})
                this.setState({title: movie.original_title})
                this.setState({popularity: Math.floor(parseInt(movie.popularity))})
                this.setState({release_date: movie.release_date})
                this.setState({overview: movie.overview})

                // console.log(response.data.articles)
                
            } else {
                console.log('resgister operation failed')
            }
        }).catch(error => {
                console.log('register error: ')
                console.log(error)
        })
    }
    render(){
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Header screen="Now Playing"/>
                <ScrollView style={styles.container}>
                    <Image style={{ minWidth:250,minHeight:340, justifyContent: 'center', alignItems: 'center' }} source={{uri: `https://image.tmdb.org/t/p/original/${this.state.image}`}}/>
                    <Text style={styles.h1}>{this.state.title}</Text>
                    <Text style={styles.center}>Popularity: {this.state.popularity}</Text>
                    <Text style={styles.center}>Release Date: {this.state.release_date}</Text>
                    <Text style={styles.p}>Overview: {this.state.overview}</Text>
                </ScrollView>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100,
        padding: '10% 0%',
    },
    h1: {
        width:250,
        marginTop:20,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    center : {
        width:250,
        marginTop:5,
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
    },
    p: {
        width:250,
        marginTop: 20,
        fontSize: 13,
    }
})

export default NowPlayingScreen
