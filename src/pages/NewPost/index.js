import React,{useState, useLayoutEffect, useContext} from 'react';
import { useNavigation } from '@react-navigation/native';
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'

import {AuthContext} from '../../contexts/auth'

import { Container, Input, Button, ButtonText} from './style';

function NewPost(){
  
  const {user} = useContext(AuthContext)
  const navigation = useNavigation();
  const [anuncio, setAnuncio] = useState("");
  

  useLayoutEffect(() => {
 
    const options = navigation.setOptions({
      headerRight: () => (
        <Button
        onPress={() => handlePost ()}
        activeOpacity={0.6}
        >
          <ButtonText> Anunciar </ButtonText>
        </Button>
      )
    })

  }, [navigation, anuncio])
  
  async function handlePost(){
    if(anuncio === ''){
      console.log("Conteudo invalido");
      return;
    }
   let Urlavatar = null; 

   try{
   let response = await storage().ref('users').child(user?.uid).getDownloadURL();
   avatarUrl = response;
  
  }catch(err){
    Urlavatar = null;
   }
  
   await firestore().collection('anuncio').add({
    created: new Date(),
    content: anuncio,
    autor: user?.nome,
    area: user?.prof,
    user: user?.uid,
    Urlavatar,
   })
  .then(() => {
    setAnuncio('')
    console.log("Criado com sucesso")
  })
  .catch((error) => {
    console.log("Erro", error)
  })
  
    navigation.goBack();
}
  
  
  return(
      <Container>
        <Input
        placeholder= "Anuncie aqui o seu serviço"   
        value={anuncio}
        onChangeText={ (text) => setAnuncio(text)}
        multiline={true}
        maxLength={300}
        placeholderTextColor="#A0A0A0"
       />
      </Container>
 )
}

export default NewPost;