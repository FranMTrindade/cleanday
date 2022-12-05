import React,  {useState, useContext, useCallback} from 'react';
import {View, Text} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {AuthContext} from '../../contexts/auth'
import firestore from '@react-native-firebase/firestore'

import { Container, ButtonAnuncio, ListAnuncio } from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from '../../components/Header'
import ListaAnuncio from '../../components/ListaAnuncios';

function Home(){
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  
  
  const [anuncios, setAnuncios] = useState([ ])
  const [ Atualizar, setAtualizar] = useState(false)
  const [ lastAnuncio, setlastAnuncio] = useState('')
  const [ emptyList, setEmptyList] = useState(false)
 
useFocusEffect(
  useCallback(() => {
  let isActive = true;
  
  function fetchAnuncios(){
   firestore().collection('anuncio')
   .orderBy('created', 'desc')
   .limit(5)
   .get()
   .then((snapshot) => {
   
    if(isActive){
     setAnuncios([]);
     const listaAnuncios = [];
    
    snapshot.docs.map( i => {
     listaAnuncios.push({
      ...i.data(),
     id: i.id,
     
      })
     })
   
      setEmptyList(!!snapshot.empty)
      setAnuncios(listaAnuncios);
      setlastAnuncio(snapshot.docs[snapshot.docs.length - 1])
   
    }
   })  
  }
  
  fetchAnuncios();

  return () => {
    isActive = false;

  }


  }, [])
)
  
  
  function handleAtualizar(){ // atulizar posts

    setAtualizar(true);

    firestore().collection('anuncio')
    .orderBy('created', 'desc')
    .limit(5)
    .get()
    .then((snapshot) => {
    
      setAnuncios([]);
      const listaAnuncios = [];
  
      
     snapshot.docs.map( i => {
      listaAnuncios.push({
       ...i.data(),
      id: i.id,
      
       })
      })
    
       setEmptyList(false)
       setAnuncios(listaAnuncios);
       setlasAnuncio(snapshot.docs[snapshot.docs.length - 1])
     
     
    })  
  
    setAtualizar(false);
  
  }
  

async function getListAnuncio(){ // buscar post quando a lista chegar no final

  if(emptyList){ // garante que ao chegar no fim vai tirar o loading
    setAtualizar(false);
    return null;
  }

  if(Atualizar) return;

  firestore().collection('anuncio')
  .orderBy('created', 'desc')
  .limit(5)
  .startAfter(lastAnuncio)
  .get()
  .then ( (snapshot) => {
    const listadeAnuncios = [];

    snapshot.docs.map( x => {
      listadeAnuncios.push({
        ...x.data(),
        id: x.id,
      })
    })
    setEmptyList(!!snapshot.empty)
    setlastAnuncio(snapshot.docs[snapshot.docs.length - 1])
    setAnuncios( antigos => [...antigos, ...listadeAnuncios]);
    setAtualizar(false)
  })

}


return(
      <Container>
        <Header/>

         <ListAnuncio 
         data={anuncios}
         renderItem={({ item }) => ( <ListaAnuncio
           data={item}
           userId={user?.uid}
           />     
          )}
         
          refreshing={Atualizar}
          onRefresh={handleAtualizar}
         
          onEndReached={() => getListAnuncio() }
          onEndReachedThreshold={0.1}
         
         />
       
       
        <ButtonAnuncio 
        activeOpacity={0.6}
        onPress= { () => navigation.navigate("NewPost")}    
        >
       
        <Entypo 
        name="plus"
        color="#909298"
        size={25}
        
        />
       </ButtonAnuncio>
      </Container>
  )
}

export default Home;