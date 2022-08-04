/* eslint-disable no-lone-blocks */
import React, { Component } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Button  } from 'react-native';

import axios from 'axios';

import Flatlistornek from './src/components/Flatlistornek';

export default class App extends Component {
 

  render() {
   
    return (
    
    <SafeAreaView style={styles.container}>
        <Flatlistornek/>
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  

});
