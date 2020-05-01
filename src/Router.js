import * as React from 'react';

import Help from './screens/Help';
import { NavigationContainer } from '@react-navigation/native';
import RequestHelp from './screens/RequestHelp';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="RequestHelp">
        <Tab.Screen name="RequestHelp" component={RequestHelp} />
        <Tab.Screen name="Help" component={Help} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Router;