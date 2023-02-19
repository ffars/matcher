import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { signInWithEmailAndPassword } from 'firebase/auth'
import { authentication } from "../../firebase";

export default function LoginScreen({ setUser }) {

    const navigation = useNavigation();

    const [error, setError] = useState('')

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginHandler = async () => {
        try {
            const res = await signInWithEmailAndPassword(authentication, email, password);
            const user = {
                email: res.user.email,
                id: res.user.uid,
                token: res.user.stsTokenManager.accessToken
            }
            setUser(user)
        } catch (err){
            setError(err.message)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
            <View style={styles.inputBox}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder={'Email'}
                />
            </View>
            <View style={styles.inputBox}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    secureTextEntry
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder={'Password'}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={loginHandler}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerButton} onPress={() => { navigation.navigate('Register') }}>
                <Text style={styles.registerButtonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        paddingHorizontal: 30,
        backgroundColor: 'white',
    },
    label: {
        fontWeight: 'bold',
        color: '#3C5A99',
        marginBottom: 10,
        marginLeft: 10
    },
    inputBox: {
        margin: 12,
    },
    input: {
        borderRadius: 18,
        padding: 12,
        borderWidth: 2,
        borderColor: '#3C5A99',
        color: '#3C5A99'
    },
    button: {
        backgroundColor: '#3C5A99',
        borderRadius: 8,
        padding: 12,
        margin: 12,
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
    registerButton: {
        borderRadius: 8,
        padding: 12,
        margin: 12,
        marginBottom: 30,
        borderColor: '#3C5A99',
        borderWidth: 1
    },
    registerButtonText: {
        fontSize: 16,
        color: '#3C5A99',
        textAlign: 'center',
    },
    errorBox: {
        padding: 20,
    },
    errorText: {
        color: 'red',
        textAlign: 'center'
    }
})
