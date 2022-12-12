
import React,{useLayoutEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native'
import {Input, Text1, Text2} from './styles'

function ChatIndividual(){ 
 
  const rotasChat = useRoute();
  const navigation = useNavigation();
  const [ title, setTitle] = useState(rotasChat.params?.title)
  
  useLayoutEffect(() => {
    navigation.setOptions({
      title:  title === '' ? '' : title
    })
  
   }, [navigation, title])
  
  return(
      <View>
        <Text2>Bom dia</Text2>
        <Text1>Olá</Text1>
        <Input/>
      </View>
 )
}

export default ChatIndividual;