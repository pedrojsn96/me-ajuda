import Help from './screens/Help';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import RequestHelp from './screens/RequestHelp';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Setting from './screens/Setting';
import Home from './screens/home';

const Tab = createBottomTabNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName="inicio" 
        tabBarOptions={{
          activeBackgroundColor: "#6cd9ca",
          activeTintColor: "white"
        }}>
        <Tab.Screen 
          name="inicio" 
          component={Home} 
          options={{
            tabBarLabel: 'Inicio',
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            )
          }} />
        <Tab.Screen
          name="Ajudar"
          component={Help} 
          options={{
            tabBarLabel: 'Ajude',
            tabBarIcon: ({ color, size }) => (
              <Icon name="hand-holding-heart" color={color} size={size} />
            )
          }}/>
        <Tab.Screen 
          name="Pedir Ajuda" 
          component={RequestHelp} 
          options={{
            tabBarLabel: 'Me Ajuda',
            tabBarIcon: ({ color, size }) => (
              <Icon name="hands" color={color} size={size} />
            )
          }} />
        <Tab.Screen
            name="Setting"
            component={Setting} 
            options={{
              tabBarLabel: 'Configuração',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="md-settings" color={color} size={size} />
              )
            }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Router;