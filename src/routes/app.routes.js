// controle rotas por tab - usuario logado


import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'

import Home from '../pages/Home';
import Search from '../pages/Search';
import Profile from '../pages/Profile';
import Chat from '../pages/PagChats';
import NewPost from '../pages/NewPost';
import PostUser from '../pages/PostUser';
import PagChats from '../pages/PagChats';
import ChatIndividual from '../pages/ChatIndividual'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

//rotas pelo stacknavigator

function StackRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen 
            name="Home" 
            component={Home}
            options={{ headerShown: false}}/>
            
            <Stack.Screen 
            name="NewPost" 
            component={NewPost}
            options={{
            title: 'Novo Anuncio',
            headerTintColor: '#FFF',
            headerStyle:{
            backgroundColor: '#242F64' 
                }
            }}
            />

            <Stack.Screen 
            name="PostUser" 
            component={PostUser}
            options={{
            headerTintColor: '#FFF',
            headerStyle:{
            backgroundColor: '#242F64' 
                }      
            }}
           
           />

           <Stack.Screen 
            name="ChatIndividual" 
            component={ChatIndividual}
            options={{
            headerTintColor: '#FFF',
            headerStyle:{
            backgroundColor: '#242F64' 
                }      
            }}  
           /> 
            
            
            
        
        </Stack.Navigator>


  )
}



// rotas pelo tab navigator
function AppRoutes(){
    return(
     <Tab.Navigator
     screenOptions={{
        headerShown: false,
        tabBarhideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#A0A0A0',
        
        tabBarStyle:{
            backgroundColor:'#242F64',
            borderTopWidth: 0
        }
     }}
     
    >
        <Tab.Screen 
        name="HomeTab" 
        component={StackRoutes} 
        options={{
            tabBarIcon: ({ color, size}) => {
                return <Entypo name="home" color={color} size={size} />
            }
        }}   />
        
        
        <Tab.Screen 
        name="Search" 
        component={Search} 
        options={{
            tabBarIcon: ({ color, size}) => {
                return <Feather name="search" color={color} size={size} />
            }
        }}/>
        
        <Tab.Screen 
        name="Chat" 
        component={Chat} 
        options={{
            tabBarIcon: ({ color, size}) => {
                return <Entypo name="chat" color={color} size={size} />
            }
        }}
        />
        
        
        
        <Tab.Screen 
        name="Profile" 
        component={Profile}
        options={{
            tabBarIcon: ({ color, size}) => {
                return <Feather name="user" color={color} size={size} />
            }
        }}/>
        
     </Tab.Navigator>
    )
}

export default AppRoutes;