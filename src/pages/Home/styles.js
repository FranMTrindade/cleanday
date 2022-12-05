import styled from "styled-components/native";


export const Container = styled.View` 
  flex: 1;
  //background-color: #242F64;
  background-color: #FFF;
`;

export const ButtonAnuncio = styled.TouchableOpacity`
position: absolute;
bottom: 5%;
right: 6%;
height: 60px;
width: 60px;
background-color: #242F64;
border-radius: 30px;
justify-content: center;
align-items: center;
z-index: 99;
`;

export const ListAnuncio = styled.FlatList`
flex: 1;
background-color: #F1F1F1;
`;