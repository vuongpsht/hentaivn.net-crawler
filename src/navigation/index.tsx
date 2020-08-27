import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {HomeScreen} from '../screen/Home';
import {DetailScreen} from '../screen/Detail';

const Stack = createStackNavigator();

export const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={'Home'} component={HomeScreen} />
        <Stack.Screen name={'Detail'} component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
