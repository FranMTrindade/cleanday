
import React, { useContext } from 'react';
import {View, ActivityIndicator} from 'react-native'; 

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import {AuthContext} from '../contexts/auth';

function Routes(){
    const { signed, loading } = useContext(AuthContext);
   
   
    if (loading){
        return(
            <View 
            style={{
            flex:1, 
            alignItems: 'center',
            justifyContent:'center', 
            backgroundColor: '#FFFFFF'
            }}>
        <ActivityIndicator size={50} color="#15173C"/>
        </View>
        )
    }
   
   return(
        signed ? <AppRoutes/> : <AuthRoutes/>
    )
}

export default Routes;