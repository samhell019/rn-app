import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useAuthContext } from "../providers/AuthProvider";

export const requireLogout = (WrappedComponent) => props  => {
    const [{accessToken, profile}] = useAuthContext();
    if (accessToken !== null) {
        return (
            <View style={styles.container}>
                <Text>Už jsi přihlášen. (Jste {profile.unique_name})</Text>
            </View>
        );
    } else {
        return(
            <WrappedComponent {...props}>
                {props.children}
            </WrappedComponent>
        );
    }
    
}

export default requireLogout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});