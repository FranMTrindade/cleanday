import React from "react";
import { Container, Name } from "./styles";

import {useNavigation} from '@react-navigation/native'

function Pesquisa({data}){
   const navigation = useNavigation();
   
   
    return(
   <Container onPress={() => navigation.navigate("PostUser", {title: data.nome, user: data.id})}>
        <Name>{data.nome}</Name>
    </Container>
    )
}

export default Pesquisa;