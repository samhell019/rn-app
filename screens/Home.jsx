import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import {styles} from "./Login";
import { useAuthContext, LOGOUT } from '../providers/AuthProvider';

export const Home = props => {
    const [{profile, accessToken}] = useAuthContext();
    const [, dispatch] = useAuthContext();

    return (
        <View style={styles.container}>
            <Text>Domov, sladký domov...</Text>
            <View style={{margin: 20, maxWidth: 200}}>
                <Text numberOfLines={2}>Token</Text>
                <Text>{accessToken ? accessToken : "Uživatel není přihlášen."}</Text>
            </View>
            <View>
                <Text>Profil</Text>
                <Text>{profile ? JSON.stringify(profile, " ", 4) : "Uživatel není přihlášen."}</Text>
            </View>
            {accessToken ? <Button title="Odhlásit se" onPress={() => dispatch({type: LOGOUT})} /> : null }
        </View>
    );
};

export default Home;