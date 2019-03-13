import React from 'react'
import { Text, View, StyleSheet } from 'react-native';

const Header = (props) => {
    return(
        <View style={styles.container}>
            <Text >React Native Movie App</Text>
            <Text style={styles.blue}>{props.screen}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        top: 0,
        position: 'absolute',
        width: '100%',
        height: 70,
        marginTop: 30,
        paddingBottom: 0,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    blue : {
        color: '#147efb',
        paddingTop: 10,
        fontSize: 14,
    }
})

export default Header
