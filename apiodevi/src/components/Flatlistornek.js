  /* eslint-disable no-lone-blocks */
import React, { Component } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Button, FlatList, TextInput, TouchableOpacity, Image, ActivityIndicator, StatusBar } from 'react-native';

import axios from 'axios';

export default class FlatListExample extends Component {
  state = {
    text: '',
    page: 1,
    contacts: [],
    allContacts: [],
    loading: true,
    refreshing: false

  };

  componentDidMount() {
    this.getContacts();
  }

  getContacts = async () => {
     const {data: { articles : contacts } } =  await axios.get('https://newsapi.org/v2/everything?q=tesla&from=2022-07-04&sortBy=publishedAt&apiKey=5bb889aa666c4325aa4563ab868a2ab6}');
     const users = [...this.state.allContacts, ...contacts];

if(this.state.refreshing){
  users.reverse();
}

    this.setState({
      contacts:users,
      allContacts:users,
      loading: false,
      refreshing: false
    });
  
 };


 loadMore = () => {
   if(!this.duringMomentum){
     this.setState({
       page: this.state.page + 1,
     }, () => {
       this.getContacts();
     });
     this.duringMomentum = true;
   }
 };
 
 

 renderContactsItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={
          ([styles.itemContainer,
          {backgroundColor: index % 2 === 1 ? '#fafadd' : ''}])
        }>
     <Image style={styles.avatar} source={{uri: item.urlToImage}} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.description} {item.content}</Text>
        
        </View>
      </TouchableOpacity>
    );
  };



  renderFooter = () => {
    if(!this.state.loading) return null;
    return(
      <View style={{
        paddingVertical: 20
        }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
      <StatusBar translucent={false} />
        <FlatList
          ListFooterComponent={this.renderFooter}
        
          renderItem={this.renderContactsItem}
          keyExtractor={item => item.login.uuid}
          data={this.state.contacts}
          stickyHeaderIndices={[0]}

          onEndReached={this.loadMore}
          onEndReachedThreshold={0}
          onMomentumScrollBegin={() => { this.duringMomentum = false }}

          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
   itemContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#63EE4455",
    margin: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  textContainer: {
    justifyContent: "space-around",
    flexDirection: "column",
  },
  name: {
    fontSize: 16,
  },
 
});