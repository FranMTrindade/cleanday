
import React,{useLayoutEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native'
import {Input} from './styles'

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
        <Input/>
      </View>
 )
}

export default ChatIndividual;