import React from 'react';
import { Text, View, Image, ScrollView, StyleSheet } from 'react-native';

const Movie = (props) => (
        <View style={styles.container}>
            {console.log(props.movie.poster_path)}
            <View style={{ width:100 ,minHeight:140, justifyContent: 'center', alignItems: 'center' }}>
                { props.movie.poster_path && <Image style={{ width:100 ,minHeight:140, justifyContent: 'center', alignItems: 'center' }} source={{uri: `https://image.tmdb.org/t/p/original/${props.movie.poster_path}`}}/> }
            </View>
            {console.log(props.movie.poster_path)}
                <View style={styles.inner_container}>    
                    {<Text style={styles.h1}>{props.movie.title || props.movie.original_name}</Text>}
                    <ScrollView style={{flex: 1, height: 135}}>
                        <Text>
                            Overview: {props.movie.overview}
                        </Text>
                    </ScrollView>
                </View>
        </View>
)
const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingBottom:20,
        flex: 1, 
        flexDirection: 'row',
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    inner_container: {
        flex:1,
        paddingLeft: 10,
    },
    h1: {
        marginTop: 10,
        marginBottom:10,
        textAlign: 'center',
        fontSize: 14,
        color: '#444',
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
export default Movie;