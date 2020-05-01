import Help from './screens/Help';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import RequestHelp from './screens/RequestHelp';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Pedir Ajuda">
        <Tab.Screen name="Pedir Ajuda" component={RequestHelp} />
        <Tab.Screen name="Ajudar" component={Help} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Router;