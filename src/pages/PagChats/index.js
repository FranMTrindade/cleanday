import React from 'react';
import {View, Text} from 'react-native';
import Header from '../../components/Header'
import { Avatar, Button, Text1, Text2 } from './styles';
import { NavigationContainer } from '@react-navigation/native';



function  PagChat({navigation}){
  
  
  return(
      <View>
        <Header/>
        <Button onPress={() => navigation.navigate("Ana")}>
        <Avatar source={require('../../assets/avatar.png')}  />
         <Text1>Diarista</Text1>
         <Text2>Ana -</Text2>
        </Button>
      </View>
 )
}

export default PagChat;