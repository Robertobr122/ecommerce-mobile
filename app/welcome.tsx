import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
const welcome = () => {
    const router = useRouter()
  return (
    <LinearGradient colors={['#1b8798', '#44749d']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}

    >
   <View style={styles.formContainer}>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/images/logo.png')} style={styles.logo} />
                    <Text style={styles.title}>ClosetX</Text>
                    <Text style={styles.subtitle}>Seja Bem-vindo!</Text>
                </View>

                <TouchableOpacity onPress={() => router.replace('/login')} style={styles.loginButton}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.replace('/register')} style={styles.registerButton}>
                    <Text style={styles.registerText}>Registrar</Text>
                </TouchableOpacity>
            </View>   
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        width: '80%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    logo: {
        width: 140,  // Ajuste conforme necessário
        height: 140, // Ajuste conforme necessário
        resizeMode: 'contain'
    },
    title: {
        color: '#FFF',
        fontSize: 36,
        fontWeight: 'bold',
        marginTop: 0
    },
    subtitle: {
        color: '#FFF',
        fontSize: 18,
        marginBottom: 20
    },
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#5bb7b6',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    registerButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#5bb7b6',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold'
    },
    registerText: {
        color: '#5bb7b6',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default welcome