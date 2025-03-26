import React, { useEffect } from 'react';
import { Animated, ImageBackground } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import IntroductionScreen from './src/screens/IntroductionScreen';
import MainScreen from './src/screens/MainScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import MyStoriesScreen from './src/screens/MyStoriesScreen';
import DragonsScreen from './src/screens/DragonsScreen';
import CreateDragonScreen from './src/screens/CreateDragonScreen';
import CreateStoryScreen from './src/screens/CreateStoryScreen';

import { MusicProvider } from './src/constants/music';
import Player from './src/components/Player';

enableScreens();

const Stack = createStackNavigator();

const LogoScreen = ({ navigation }) => {
  const progress = new Animated.Value(0);

  useEffect(() => {
      Animated.timing(progress, {
          toValue: 100,
          duration: 1700,
          useNativeDriver: false,
      }).start(() => {
          navigation.replace('IntroductionScreen');
      });
  }, []);

  return (
    <ImageBackground source={require('./src/assets/loader.png')} style={{flex: 1}} />
  );
};

const App = () => {

  return (
      <MusicProvider>
          <Player />
          <NavigationContainer>
              <Stack.Navigator initialRouteName={"LogoScreen" }>    
                  <Stack.Screen 
                        name="LogoScreen" 
                        component={LogoScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="IntroductionScreen" 
                        component={IntroductionScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="MainScreen" 
                        component={MainScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="SettingsScreen" 
                        component={SettingsScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="MyStoriesScreen" 
                        component={MyStoriesScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="DragonsScreen" 
                        component={DragonsScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="CreateDragonScreen" 
                        component={CreateDragonScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="CreateStoryScreen" 
                        component={CreateStoryScreen} 
                        options={{ headerShown: false }} 
                  />
              </Stack.Navigator>
          </NavigationContainer>
      </MusicProvider>
    );
};

export default App;
