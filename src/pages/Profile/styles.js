import styled from 'styled-components/native';


export const Container = styled.View` 
flex: 1;
align-items: center;
background-color: #FFF;
`;


export const Servico = styled.Text` 
margin-top: 10px;
margin-left: 20px;
margin-right: 20px;
font-size: 25px;
font-weight: bold;
color: #242F64;
`;

export const Name = styled.Text` 
margin-top: 5px;
margin-left: 20px;
margin-right: 20px;
font-size: 25px;
font-weight: bold;
color: #242F64;
`;



export const Email = styled.Text` 
color: #242F64;
margin-top: 5px;
margin-left: 20px;
margin-right: 20px;
font-size: 22px;
font-weight: bold;
`;


export const Button = styled.TouchableOpacity` 
margin-top: 20px;
background-color: ${props => props.bg};
width: 70%;
height: 40px;
border-radius: 5px;
align-items: center;
justify-content: center;
`;


export const ButtonText = styled.Text` 
color: ${props => props.color};
font-size: 18px;
`;


export const UpLoadButton = styled.TouchableOpacity` 
margin-top: 20%;
background-color: #242F64;
width: 165px;
height: 165px;
border-radius: 90px;
justify-content: center;
align-items: center;
z-index: 8;
`;

export const UpLoadText = styled.Text` 
font-size: 55px;
position: absolute;
color: #000;
z-index: 99;
`;

export const Avatar = styled.Image` 
width: 140px;
height: 140px;
border-radius: 80px;
opacity: 0.9;
`;

export const ModalContainer = styled.View`
width: 100%;
height: 70%;
background-color: #D3D3D3;
position: absolute;
bottom: 0;
align-items: center;
justify-content: center;
`;

export const ButtonVoltar = styled.TouchableOpacity`
width: 90%;
height: 50px;
position: absolute;
top: 15px;
flex-direction: row;
align-items: center;
`;

export const Input = styled.TextInput`
background-color: #A0A0A0;
width: 70%;
border-radius: 10px;
font-size: 18px;
text-align: center;
margin-top: 10px;
`;










