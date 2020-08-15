import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Feed from './pages/Feed';

import logo from './assets/images/instagram.png';
import { Image } from 'react-native';

const { Navigator, Screen } = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerTitle: () => <Image source={logo} />,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#f5f5f5',
          },
        }}
      >
        <Screen name="Feed" component={Feed} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;
