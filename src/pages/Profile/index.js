import React, {useContext, useState, useEffect} from 'react';
import {View, Text, Modal} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import { AuthContext } from '../../contexts/auth'
import Feather from 'react-native-vector-icons/Feather'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage';

import Header from '../../components/Header'
import {
  Container, 
  Name, 
  Button, 
  ButtonText, 
  Email, 
  Servico,
  UpLoadText,
  UpLoadButton,
  Avatar,
  ModalContainer,
  ButtonVoltar,
  Input,
}from './styles'



function Perfil(){
  let isActive = true;
  
  const {sair, user, setUser, storageUser} = useContext(AuthContext);
  
  const [nome, setNome] = useState(user?.nome)
  const [url, setUrl] =  useState(null);
  const [area1, setArea1] = useState(null);
  const [aberto, setAberto] = useState(false);

  useEffect ( () => {
    async function loadAvatar (){
     try{
      if(isActive){
        let response = await storage().ref('useres').child(user?.uid).getDownloadURL();
        setUrl(response);
      }   
     }catch(error){
       //alert("Imagem não encontrada")
     }
    }
 
    loadAvatar();

    return () => isActive = false;
 
  }, [])
 
  async function handleSingOut(){ 
   await sair();
}

//para atualizar o perfil
async function AtualizaPerfil(){
alert("Teste")

}
 
 
  
  
 
 const uploadFile= () => {
  const options ={
   noData: true,
   mediaType: 'photo'
  };


  launchImageLibrary(options, response => {
    if(response.didCancel){
      alert('Aceite o Acesso');
    }else if(response.error){
      alert('Parece que algo deu errado, tente novamente')
    }else{
      enviarFoto(response)  
      .then(() => {
        uploadAvatar();
      })
     
      console.log("uri", response.assets[0].uri)
      setUrl(response.assets[0].uri)
   
    }
  })

}
 
const getFileLocalPath = (response) => {
  return response.assets[0].uri;
}


 const enviarFoto = async (response) =>{
 const fileSource = getFileLocalPath(response);


 const storageRef = storage().ref('useres').child(user?.uid);

 return await storageRef.putFile(fileSource)

 }


 const uploadAvatar = async () => {
  const storageRef = storage().ref('useres').child(user?.uid);
  const url = await storageRef.getDownloadURL() 
  .then(async (img) => {
      const postDocs = await firestore().collection('anuncio')
      .where('user', '==', user.uid).get();

      postDocs.forEach( async doc => {
          await firestore().collection('anuncio').doc(doc.id).update({
            Urlavatar: img
          })
      })
  })
  .catch((error) => {
    alert("Erro ao atualizar foto nos posts", error)
  })

 }
 
 return(      
     <Container>
        <Header/>
       
      {url ? (
       
       <UpLoadButton onPress = {() => uploadFile()}>
       <UpLoadText>+</UpLoadText>
       <Avatar
        source={{uri:url}} 
       />
       </UpLoadButton>

      ) : (
        <UpLoadButton onPress = {() => uploadFile()} >
        <UpLoadText>+</UpLoadText>
        </UpLoadButton>
      )}
       
       <Name>{user?.nome}</Name>
       <Servico>{user?.prof}</Servico>
       <Email>{user?.email}</Email>
       
       
        <Button bg=" #242F64" onPress={() => setAberto (true) }>
          <ButtonText color="#A0A0A0"> Atualize seu Perfil </ButtonText>
        </Button>

        <Button bg="#DDD" onPress={handleSingOut}>
          <ButtonText color="#000"> Sair </ButtonText>
        </Button>

        <Modal visible={aberto} animationType="slide" transparent={true}>
          <ModalContainer >
            <ButtonVoltar onPress={() => setAberto(false)}>
              <Feather 
                name="arrow-left"
                size={22}
                color="#242F64"
              />
                <ButtonText color="#000">  </ButtonText>
            </ButtonVoltar>
          
          <Input 
            placeholder= {user?.nome}
            value={nome}
            onChange={(text) => setNome(text)}
          />

          <Input
            placeholder= {user?.sobrename}
            value={area1}
            onChange={(text) => setArea1(text)}
          />

          <Input
            placeholder= {user?.prof}
            value={area1}
            onChange={(text) => setArea1(text)}
          />

          <Input
            placeholder= "Senha Antiga"
          />

          <Input
            placeholder="Nova Senha"
          />

       
       
       
       
       
        <Button bg=" #242F64" onPress={AtualizaPerfil}>
          <ButtonText color="#A0A0A0"> Salvar </ButtonText>
        </Button>
         
          </ModalContainer>
        </Modal>
     
     
      </Container>
 )
}

export default Perfil;