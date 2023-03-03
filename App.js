import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, DarkTheme, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useColorScheme } from 'react-native';
import { AuthProvider } from './providers/AuthProvider';
import { useState } from 'react';

import Home from './screens/Home';
import Users from './screens/Users';
import Login from './screens/Login';
import Register from './screens/Register';

export const SCREEN_HOME = "Home"
export const SCREEN_USERS = "Users"
export const SCREEN_LOGIN = "Login"
export const SCREEN_REGISTER = "Register"

const Tab = createBottomTabNavigator();

export default function App() {
  const scheme = useColorScheme();
  const [isVisible, setIsVisible] = useState(false);
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <NavigationContainer theme={scheme === 'light' ? DarkTheme : DefaultTheme}>
          <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
          <Tab.Navigator
            initialRouteName={SCREEN_HOME}
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                switch (route.name) {
                  // https://github.com/oblador/react-native-vector-icons/blob/master/glyphmaps/Ionicons.json
                  case SCREEN_HOME : iconName = "home-sharp"; break;
                  case SCREEN_USERS : iconName = "people-circle-sharp"; break;
                  case SCREEN_LOGIN : iconName = "people"; break;
                  case SCREEN_REGISTER : iconName = "person-add"; break;
                  case SCREEN_UNAUTHORIZED : iconName = "fast-food-sharp"; break;
                  default: iconName = "information-circle";
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: "#9ad1d4",
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen name={SCREEN_HOME} component={Home} options={{ title: 'Úvod', headerStyle: { backgroundColor: '#f4511e' } }} />
            <Tab.Screen name={SCREEN_USERS} component={Users} options={{ title: 'Seznam uživatelů', headerStyle: { backgroundColor: '#ff6666' } }} />
            <Tab.Screen name={SCREEN_LOGIN} component={Login} options={{ title: 'Přihlášení', headerStyle: { backgroundColor: '#00ff7f' } }} />
            <Tab.Screen name={SCREEN_REGISTER} component={Register} options={{ title: 'Registrace', headerStyle: { backgroundColor: '#3399ff' } }} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthProvider>
  );
}