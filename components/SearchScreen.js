import SegmentedControlTab from 'react-native-segmented-control-tab'
import React, {Component} from 'react';
import Header from './Header.js';
import Movie from './Movies.js';
import { Text, View, TextInput, ScrollView, SearchBar, StyleSheet } from 'react-native';
import axios from 'axios'
 
class SearchScreen extends Component {
 
    constructor(){
      super()
      this.state = {
            search: "",
            heading: "",
            movies: [],
            selectedIndex: 0,
      };
    }
componentDidMount(){
    this.handleIndexChange(0)
}
handleIndexChange = (index) => {
    if(this.state.search.length > 0){
        switch(index){
            case 0: this.get_movies(`movie?query=${this.state.search}&`);
                    this.setState({
                        heading: `Movie results for: ${this.state.search}`,
                    });
                    break;
            case 1: this.get_movies(`person?query=${this.state.search}&`);
                    this.setState({
                        heading: `${this.state.search} is in the following Movies`,
                    });
                    break;
            case 2: this.get_movies(`tv?query=${this.state.search}&`);
                    this.setState({
                        heading: `TV Show results for: ${this.state.search}`,
                    });
                    break;
            default:console.log("Wrong", index)
                    break;
        }
    } else{
        this.setState({
            heading: `No search keyword provided`,
            movies: [],
        });
    }
  this.setState({
    selectedIndex: index,
  });
}
get_movies(url){
    axios.get(`https://api.themoviedb.org/3/search/${url}api_key=8367b1854dccedcfc9001204de735470&language=en-US&page=1`)
    .then(response => {
        if (!response.data.errmsg) {
            console.log('get operation successful')
            console.log(response.data)
            this.setState({
                movies: response.data.results,
            });
            if(this.state.movies.length > 10){
                this.setState({
                    movies: this.state.movies.slice(0,10),
                });
                console.log(this.state.movies.length)
            }
        } else {
            console.log('resgister operation failed')
        }
    }).catch(error => {
            console.log('register error: ')
            console.log(error)
    })
}
handleSearch(text){
    this.handleIndexChange(this.state.selectedIndex)
    console.log("helllooooo")
}
render() {
    const mapped_movies = this.state.movies.map((a) => {
        if(this.state.selectedIndex == 1 && a.known_for){
            if(a.known_for[0]){
                return(
                    <Movie key={this.state.movies.indexOf(a)} movie = {a.known_for[0]}/>
               )
            }
            else{
                return(
                    <Text key={this.state.movies.indexOf(a)}> Nothing Found </Text>
                ) 
            }
        } else{
            if(a.overview)
            return(
                <Movie key={this.state.movies.indexOf(a)} movie = {a}/>
            )
        }
    }
    );
    return (
        <View style={{flex:1}}>
            <Header screen="Search" />
            <View style={styles.container} scrollEnabled={true}>
                <SegmentedControlTab
                    values={['Movies', 'People', 'TV Show']}
                    selectedIndex={this.state.selectedIndex}
                    onTabPress={this.handleIndexChange}
                />
                <TextInput style={styles.search_bar}
                returnKeyType='search'
                onChangeText={(text)=>{this.setState({search: text})}}
                value={this.state.search} onSubmitEditing={(text)=>{this.handleSearch(text)}} editable = {true}/>
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
        marginBottom: 120,
    },
    h1: {
        marginTop:20,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    center : {
        marginTop:10,
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    p: {
        marginTop: 20,
        fontSize: 12,
    },
    search_bar: {
        margin: 20,
        height: 40, 
        backgroundColor: '#eee',
        borderColor: '#ddd', 
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
  })
export default SearchScreen
