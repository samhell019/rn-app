import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native"
import { styles } from "./Login";
import { useForm, Controller } from 'react-hook-form';
import { useState } from "react";
import axios from "axios";
import { API } from "../configuration/api";
import { useNavigation } from '@react-navigation/native';
import { SCREEN_HOME } from "../App";
import { useAuthContext, SET_ACCESS_TOKEN } from "../providers/AuthProvider";

export const Register = () => { 
    const { /*register,*/ handleSubmit, control, formState: {errors} } = useForm();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [, dispatch] = useAuthContext();

    const navigation = useNavigation();

    const onSubmit = data => { 
        //console.log(data);
        setIsLoading(true);
        setError(null);

        axios.post(API + "/api/Auth/register", 
        {
            firstname: data.firstname,
            lastname: data.lastname,
            username: data.username,
            password: data.password,
            admin: false // todo
        })
            .then((response) => {
                console.log("OK, registrace", response.data);    
                axios.post(API + "/api/Auth/authenticate", // rovnou přihášení
                {
                    username: data.username,
                    password: data.password
                })
                    .then((response) => {
                        dispatch({type: SET_ACCESS_TOKEN, payload: response.data.value})
                        console.log("OK, přihášení", response.data.value);
                        navigation.navigate(SCREEN_HOME);
                })
                    .catch((error) => {
                        setError(error);
                        console.error(error);
                    })
                    .finally(() => {
                        setIsLoading(false);
                    })
                    //navigation.navigate(SCREEN_HOME);
                })
            .catch((error) => {
                setError(error)
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <View style={styles.container}>
            <Text>Registrace</Text>
            <View>
                <Text>Jméno</Text>
                <Controller name="firstname" control={control} rules={{required: true, minLength: 5}} 
                    render={({ field }) => <TextInput style={text.input} placeholder="Cyril" {...field} />} />
                {errors.firstname?.type === 'required' && <Text style={text.error}>Toto pole je povinné.</Text>}
                {errors.firstname?.type === 'minLength' && <Text style={text.error}>Minimální délka jména je 5 znaků.</Text>}
            </View>
            <View>
                <Text>Příjmení</Text>
                <Controller name="lastname" control={control} rules={{required: true, minLength: 5}} 
                    render={({ field }) => <TextInput style={text.input} placeholder="Cvrček" {...field} />} />
                {errors.lastname?.type === 'required' && <Text style={text.error}>Toto pole je povinné.</Text>}
                {errors.lastname?.type === 'minLength' && <Text style={text.error}>Minimální délka příjmení je 5 znaků.</Text>}
            </View>
            <View>
                <Text>Uživatelské jméno</Text>
                <Controller name="username" control={control} rules={{required: true, minLength: 6}} 
                    render={({ field }) => <TextInput style={text.input} placeholder="cyril123" {...field} />} />
                {errors.username?.type === 'required' && <Text style={text.error}>Toto pole je povinné.</Text>}
                {errors.username?.type === 'minLength' && <Text style={text.error}>Minimální délka uživatelského jména je 6 znaků.</Text>}
            </View>
            <View>
                <Text>Heslo</Text>
                <Controller name="password" control={control} rules={{required: true, minLength: 4, pattern: /\d/}} 
                    render={({ field }) => <TextInput style={text.input} secureTextEntry={true} placeholder='beruska' {...field} /> } />
                {errors.password?.type === 'required' && <Text style={text.error}>Toto pole je povinné.</Text>}
                {errors.password?.type === 'minLength' && <Text style={text.error}>Minimální délka hesla jsou 4 znaky.</Text>}
                {errors.password?.type === 'pattern' && <Text style={text.error}>Heslo musí obsahovat číslici.</Text>}
            </View>
            <Button title={isLoading ? "Počkejte prosím..." : "Registrovat"}
                onPress={handleSubmit(onSubmit)} disabled={isLoading ? true : false} />
                
            {error && <Text style={text.error}>Chyba: {error.message}</Text>}
        </View>
    );
}

const text = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10
    },
    error: {
        color: 'red'
    }
  });

export default Register;