import React from "react";
import { 
    Container, 
    Nome, 
    Header, 
    Avatar, 
    ConteudoView, 
    Proficao,
    ChatBotton,
    Interacoes,
    TimePost,
    Conteudo} from "./styles";

import {formatDistance} from 'date-fns';
import {ptBR} from 'date-fns/locale'



import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from "@react-navigation/native";

function ListaAnuncio({data, user}){
    const navigation = useNavigation();
    

function FormatarData(){


  const dataAnuncio = new Date (data.created.seconds*1000); //conversao de nanoSec pra Sec
  
  return formatDistance(  // criacao de data baseada na data atual
    new Date(),
    dataAnuncio,
    {
        locale: ptBR
    }
  )
}
  
  
    return(
        <Container>
            <Header onPress = {() => navigation.navigate("PostUser", {title: data.autor, user: data.user})}>
                {data.Urlavatar ? (
                 <Avatar 
                 source={{ uri: data.Urlavatar}}
                />   
                ) : (
                    <Avatar 
                 source={require('../../assets/avatar.png')}
                />
                )}
                
                <Nome>
                   {data?.autor} -         
                </Nome>
                <Proficao>  
                    {data?.area}
                </Proficao>
            </Header>  
        <ConteudoView>               
                <Conteudo> {data?.content} </Conteudo>         
        </ConteudoView>
  
    <Interacoes>
        <ChatBotton onPress={() => navigation.navigate("ChatIndividual", {title: data.autor, user: data.user})}>
            <Entypo name="chat" 
            size={25}
            color="#A0A0A0"
            />
        </ChatBotton>
    
        <TimePost>
            {FormatarData()}
        </TimePost>
   
    </Interacoes>
 
 
        </Container> 
  )
}

export default ListaAnuncio;