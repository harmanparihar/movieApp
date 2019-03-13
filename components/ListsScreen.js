import SegmentedControlTab from 'react-native-segmented-control-tab'
import React, {Component} from 'react';
import Header from './Header.js';
import Movie from './Movies.js';
import axios from 'axios'
import { Text, View, ScrollView, Image, StyleSheet } from 'react-native';
 
class ListsScreen extends Component {
 
    constructor(){
      super()
      this.state = {
        movies: [],
        heading: "Popular",
        selectedIndex: 0,
      };
    }
    
    componentDidMount(){
        this.get_movies('popular');
        this.setState({
            heading: "Popular",
        });
    }

    handleIndexChange = (index) => {
        switch(index){
            case 0: this.get_movies('popular');
                    this.setState({
                        heading: "Popular",
                    });
                    break;
            case 1: this.get_movies('top_rated');
                    this.setState({
                        heading: "Top Rated",
                    });
                    break;
            case 2: this.get_movies('upcoming');
                    console.log("Upcoming");
                    this.setState({
                        heading: "Upcoming",
                    });
                    break;
            default:console.log("Wrong Input");
                    break;
      }
      this.setState({
        selectedIndex: index,
      });
    }
    get_movies(url){
        axios.get(`https://api.themoviedb.org/3/movie/${url}?api_key=8367b1854dccedcfc9001204de735470&language=en-US&page=1`)
        .then(response => {
            if (!response.data.errmsg) {
            //   this.setState({movies : response.data.articles})
                console.log('get operation successful')
                console.log(response.data.results.length)
                this.setState({
                    movies: response.data.results,
                  });
            } else {
                console.log('resgister operation failed')
            }
        }).catch(error => {
                console.log('register error: ')
                console.log(error)
        })
    }
    render() {
        const mapped_movies = this.state.movies.map((a) =>
        <Movie key={this.state.movies.indexOf(a)} movie = {a}/>
        );
        return (
          <View style={{flex:1}}>
            <Header screen="Lists" />
            <View style={styles.container}>
                <SegmentedControlTab
                    values={['Popular', 'Top Rated', 'Upcoming']}
                    selectedIndex={this.state.selectedIndex}
                    onTabPress={this.handleIndexChange}
                />
                <Text style={styles.center}>{this.state.heading}</Text>
                <ScrollView>
                    {mapped_movies}
                </ScrollView>
                </View>
          </View>
        );
    }
}
const styles = StyleSheet.create({
  container: {
      marginTop: 120,
      paddingLeft: '5%',
      paddingRight: '5%',
      marginBottom: 70,

  },
  h1: {
      marginTop:20,
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
  },
  center : {
      marginTop:20,
      fontSize: 18,
      color: '#333',
      textAlign: 'center',
  },
  p: {
      marginTop: 20,
      fontSize: 12,
  }
})
export default ListsScreen
