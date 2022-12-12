import styled from 'styled-components/native'


export const Button = styled.TouchableOpacity` 
box-sizing: border-box;

position: absolute;
width: 300px;
height: 111px;
left: 50px;
top: 90px;
background: #FFFFFF;
border: 1px solid #242F64;
border-radius: 20px;
`;

export const Avatar = styled.Image` 
width: 90px;
height: 90px;
border-radius: 80px;
opacity: 0.9;
left: 10px;
top: 10px;
border: 1px solid #242F64;
`;

export const Text1 = styled.Text`
position: absolute;
width: 90px;
height: 50px;
left: 160px;
top: 40px;
color: black;
text-align:center;

font-family: 'Cabin';
font-style: normal;
font-weight: 400;
font-size: 20px;
color: #242F64;
`;

export const Text2 = styled.Text`
position: absolute;
width: 130px;
height: 50px;
left: 80px;
top: 40px;
color: black;
font-size: 20px;
text-align:center;

font-family: 'Cabin';
font-style: normal;
font-weight: 400;
font-size: 20px;
`;
