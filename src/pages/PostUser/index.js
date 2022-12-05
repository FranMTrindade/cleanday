import React, {useLayoutEffect, useState, useCallback, useContext} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {useRoute, useNavigation, useFocusEffect} from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'

import ListaAnuncio from '../../components/ListaAnuncios';
import { AuthContext } from '../../contexts/auth'

import {Container, ListAnuncio} from './style';

function PostUser(){
 const rotasAnuncio = useRoute();
 const navigation = useNavigation();
 
 const [titleAnuncio, setTitleAnuncio] = useState(rotasAnuncio.params?.title)
 const [ anuncios, setAnuncios] = useState([]);
 const [loading, setLoading] = useState(true);
 const {user} = useContext(AuthContext);


 useLayoutEffect(() => {
  navigation.setOptions({
    title: titleAnuncio === '' ? '' : titleAnuncio

  })

 }, [navigation, titleAnuncio])
 
 useFocusEffect(
  useCallback(() => {
   let isActive = true;
  
   firestore()
   .collection('anuncio')
   .where('user', '==', rotasAnuncio.params?.user )
   .orderBy('created', 'desc')
   .get()
   .then((snapshot) => {
   const anuncioList = [];

   snapshot.docs.map( y => {
    anuncioList.push({
      ...y.data(),
      id: y.id
    })
   })
  
   if(isActive){
    setAnuncios(anuncioList);
    setLoading(false);
   }
  
  })
  
  
   return () => {
    isActive = false;
   }
  }, [])
 )
  
 
 
 return(
      <Container>
        {loading ?  (
          <View style={{ flex:1, justifyContent:'center', alignItems: 'center'}}>
          <ActivityIndicator size={50} color="#242F64" />
          </View>    
       ):(
        <ListAnuncio
        
        showVerticalScrollIndicator={false}
        data={anuncios}
        renderItem={({item}) => <ListaAnuncio data={item} user={user.uid}/>}
        />
       )}
      </Container>
 )
}

export default PostUser;