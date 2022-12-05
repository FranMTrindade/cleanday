
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import firestore from '@react-native-firebase/firestore'
import Pesquisa from '../../components/Pesquisa';


import {Container, AreaInput, Input, Lista} from './styles'

function Search(){
  const [input, setInput] = useState('');
  const [usuarios, setUsuarios] = useState ([]);

  useEffect(() => {
    if(input === '' || input === undefined){
      setUsuarios([]);
      return;
    }
 
    const sub = firestore().collection('useres') //função para fazer pesquisa de acordo com o input baseado no nome, sobrenome ou profição
    
    .where('nome','>=', input)
    .where('nome','<=', input + "\uf8ff")

    
    
    
    .onSnapshot(snapshot => {
      const listaAchados = [];

      snapshot.forEach( doc => {
        listaAchados.push({
          ...doc.data(), 
          id: doc.id 
        })
      })   
      setUsuarios(listaAchados);
    })

   return () => sub();

 
  }, [input])
  
  
  return(
      <Container>
        <AreaInput>
          <Feather
          name="search"
          size={22}
          color= "#242F64" 
          />
        <Input 
        placeholder="Buscando por algum serviço ou pessoa?"
        value={input}
        onChangeText={(text) => setInput(text)}
        />
        </AreaInput>

      <Lista 
      data={usuarios}
      renderItem={ ({item}) => <Pesquisa data={item} /> }
      />
     
      </Container>
 )
}

export default Search;