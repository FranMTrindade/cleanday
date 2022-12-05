//pagina onde foi criado as funçoes para cadastrar, logar, e deslogar o usuario
// e deixando as funçoes disponiveis para ser chamada em outras paginas como a de login


import React, { useState, createContext, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const AuthContext = createContext({});

function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const [loadingAuth, setLoadingAuth] = useState(false);

    //função que mantem usuario logado até que se faça o logout
   
    useEffect(()=> {
    async function loadStorage(){
      const storageUser = await AsyncStorage.getItem('@apptcc');
    
     if(storageUser){
      setUser(JSON.parse(storageUser));
      setLoading(false);
    }
    
    setLoading(false);
    
  }
    
    loadStorage();
  }, [])
 
 // função para cadastrar usuario no banco de dados 
   
    async function cadastrar(email, senha, name, sobrenome, proficao){
     setLoadingAuth(true);
   
      await auth().createUserWithEmailAndPassword(email, senha)
    .then(async (value) => {
      let uid = value.user.uid;
      await firestore().collection('useres')
      .doc(uid).set({
        nome: name,
        sobrename: sobrenome,
        prof: proficao,
        creatdAt: new Date (),
      })
     .then(() => {
      let data = {
        uid: uid,
        nome: name,
        sobrename: sobrenome,
        prof: proficao,
        email: value.user.email,     
      }
     
      setUser(data);
      setLoadingAuth(false);
    
     })
    })
 
  .catch( ( error) => {
    console.log(error);
    setLoadingAuth(false);
  }) 
}
// apos cadastro vai pra tela home

// função para logar


  async function logar(email, senha){
  setLoadingAuth(true); 
  
  await auth().signInWithEmailAndPassword(email, senha)
  .then( async (value) => {
  let uid = value.user.uid;

  const userProfile = await firestore().collection('useres')
  .doc(uid).get();
  
  let data = {
   uid : uid,
   nome: userProfile.data().nome,
   sobrename: userProfile.data().sobrename,
   prof: userProfile.data().prof,
   email: value.user.email
  };

setUser(data);
storageUser(data);
setLoadingAuth(false);
// depois de logado vai pra tela home

})
  .catch((error)=>{
   console.log(error);
   setLoadingAuth(false);
  })

}  
 
// função que limpa o assyncstorage e consequentemente faz o logout
async function sair(){
  await auth().signOut();
  await AsyncStorage.clear()
  .then( () => {
    setUser(null);
  })
}

async function storageUser(data){
  await AsyncStorage.setItem('@apptcc', JSON.stringify(data)) // envia todas informções convertidas para strings
}
    
    return(
      <AuthContext.Provider value={{ 
        signed: !!user,
         cadastrar, 
         logar, 
         sair,
         loadingAuth, 
         loading, 
         user,
         setUser,
         storageUser
         }}>
        {children}
      </AuthContext.Provider>
    )
}

export default AuthProvider;