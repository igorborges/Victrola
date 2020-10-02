import React  from 'react';
import {NavigationContainer} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Jogos from './src/screens/Jogos'
import Classificacao from './src/screens/Classificacao'

const Tab = createBottomTabNavigator();

export default function App() {  
  
  return (
    
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#009',
        inactiveTintColor: '#000',
        activeBackgroundColor: "#008000",
        inactiveBackgroundColor: "#008000",
        labelPosition: "beside-icon",
        adaptive: false,
        tabBarVisible: false
      }}>        
        <Tab.Screen name="Home" component={Classificacao}
        options={{
          tabBarLabel: 'Classificação',          
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}/>

        <Tab.Screen name="Melhores" component={Jogos} options={{
          tabBarLabel: 'Séries A-F',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}/>

      </Tab.Navigator>
    </NavigationContainer>
    
  );
}

