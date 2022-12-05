import styled from 'styled-components/native';

export const Container = styled.View` 

margin-top: 8px;
margin: 8px 2%;
background-color: #FFF;
border-radius: 8px;
box-shadow: 1px 1px 3px rgba( 18,18,18);
padding: 11px;
`;

export const Proficao = styled.Text` 
margin-left: 12px;
color: #242f64;
font-size: 18px;
font-weight: bold;

`;


export const Nome = styled.Text` 
font-size: 18px;
font-weight: bold;
`;


export const Header = styled.TouchableOpacity` 
width: 100%;
flex-direction: row;
align-items: center;
margin-bottom: 6px;
`;

export const Avatar = styled.Image` 
width: 40px;
height: 40px;
border-radius: 20px;
margin-right: 6px;
`;


export const ConteudoView = styled.View` 

`;
    
export const Conteudo = styled.Text` 
font-style: italic;
color: #000;
margin-top: 10px;
`;

export const Interacoes = styled.View`
flex-direction: row;
align-items: baseline;
margin-top: 10px;
justify-content: space-around;

`;

export const ChatBotton = styled.TouchableOpacity`
width: 45px;
flex-direction: row;
margin-right: 70%;
`;


export const TimePost = styled.Text`
margin-right: 1px;
`;



