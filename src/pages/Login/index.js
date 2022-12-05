import React, { useState, useContext } from 'react';

import {Container, Input, Button, ButtonText, Button1, Logo, ButtonText1} from './styles'
import { AuthContext } from '../../contexts/auth'
import { ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';

const LogoAnimated = Animatable.createAnimatableComponent(Logo)

function Login(){
  
  const [login, setLogin] = useState(true);
  const [name, setName] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [proficao, setProficao] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { cadastrar, logar, loadingAuth } = useContext(AuthContext);


  // inicio da funçaõ que faz troca da tela de login para tela de cadastro de acordo com a necessidade do usuario
  // limpa os campos ao trocar de tela
 
  function toggleLogin(){ 
    setLogin(!login)
    setName('')
    setProficao('')
    setSobrenome('')
    setEmail('')
    setSenha('')
  }
  //fim


 // verificação cadastro
 async function handleCadastrar(){
    if(email === '' || senha === '' || name === '' || sobrenome === '' ){
      console.log("preencha") 
    }
  
    await cadastrar(email, senha, name, sobrenome, proficao)
  
    //passando dessa verficação o usuario sera cadastrado e ira pra home
 
 
  }

 //verificação login
  async function handleEntrar(){
    if(email === '' || senha === ''){
      console.log("preencha")
      return;
    }
 
  await logar(email, senha)
    //passando dessa primeira verificação usario avança pra tela home
}  



  // tela de login 
  if(login){
    return(
      <Container>
      
      <LogoAnimated animation='bounceInLeft' source={require('../../assets/logo.jpeg')}/>
      

        <Input
        placeholder="EMAIL"
        value={email}
        onChangeText={ (text) => setEmail(text) }
        />

        <Input
        placeholder="SENHA"
        value={senha}
        secureTextEntry={true}
        onChangeText={ (text) => setSenha(text) }
        />

        <Button onPress={handleEntrar}>
         {loadingAuth ?(
          <ActivityIndicator size={20} color="#FFF"/>
         ) : (
          <ButtonText>Acessar</ButtonText>
         )} 
        </Button>
        
        
        <Button1>
         <ButtonText1 onPress={toggleLogin}>Cadastre-se</ButtonText1>
        </Button1>
      
      </Container>
 )
}
  
// tela de cadastro
  return(
      <Container>

     

      <Input
        placeholder="Seu Nome"
        value={name}
        onChangeText={ (text) => setName(text) }
        />

       <Input
        placeholder="Sobrenome"
        value={sobrenome}
        onChangeText={ (text) => setSobrenome(text) }
        />

        <Input
        placeholder="Area de Atuação(opcional)"
        value={proficao}
        onChangeText={ (text) => setProficao(text) }
        />


        <Input
        placeholder="Email"
        value={email}
        onChangeText={ (text) => setEmail(text) }
        />

        <Input
        placeholder="Senha"
        value={senha}
        secureTextEntry={true}
        onChangeText={ (text) => setSenha(text) }
        />

        <Button onPress={handleCadastrar}>
         {loadingAuth ?(
        <ActivityIndicator size={20} color="#FFF"/>
         ) : (
        <ButtonText>Cadastrar</ButtonText>
         )} 
        </Button>

        <Button>
         <ButtonText onPress={toggleLogin}>Voltar</ButtonText>
        </Button>
      
      </Container>
 )
}

export default Login;