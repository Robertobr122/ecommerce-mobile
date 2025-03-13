import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
const register = () => {
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
            <Text style={{color: '#FFF', fontSize:32, marginBottom: 20}}>ClosetX</Text>
        </View>
        <TextInput style={styles.input} placeholder='Nome Completo*'/>
        <TextInput style={styles.input} placeholder='E-mail'/>
        <TextInput style={styles.input} placeholder='Senha' />
        <TextInput style={styles.input} placeholder='Repetir Senha' secureTextEntry/>
        <TouchableOpacity onPress={()=> router.replace('/(tabs)/home')} style={styles.loginButton}><Text style={{color: '#FFF'}}>Enviar</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=> router.replace('/')} style={styles.backButton}><Text style={{color: '#0EDFBD'}}>Voltar</Text></TouchableOpacity>
    
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
    
    loginButton: {
        width: '100%',
        height: 50,
        marginBottom: 10,
        backgroundColor: '#5bb7b6',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    backButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#5bb7b6',
    },
    input: {
        width: '100%',
        backgroundColor: 'white',
        height: 40,
        borderRadius: 5,
        marginBottom: 10
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
    }
    

})

export default register