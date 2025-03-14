import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const Register = () => {
    const router = useRouter();
    const [nome, setNome] = useState({ value: '', dirty: false });
    const [cpf, setCpf] = useState({ value: '', dirty: false });
    const [email, setEmail] = useState({ value: '', dirty: false });
    const [senha, setSenha] = useState({ value: '', dirty: false });
    const [confirmarSenha, setConfirmarSenha] = useState({ value: '', dirty: false });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    const handleNomeError = () => {
        if (!nome.value && nome.dirty) return <Text style={styles.error}>Campo obrigatório</Text>;
        if (nome.value.length < 2 && nome.dirty) return <Text style={styles.error}>Nome deve ter pelo menos 2 caracteres</Text>;
        return null;
    };

    const handleCpfError = () => {
        if (!cpf.value && cpf.dirty) return <Text style={styles.error}>Campo obrigatório</Text>;
        if (!cpfRegex.test(cpf.value) && cpf.dirty) return <Text style={styles.error}>CPF inválido</Text>;
        return null;
    };

    const handleEmailError = () => {
        if (!email.value && email.dirty) return <Text style={styles.error}>Campo obrigatório</Text>;
        if (!emailRegex.test(email.value) && email.dirty) return <Text style={styles.error}>E-mail inválido</Text>;
        return null;
    };


    const handleSenhaError = () => {
        if (!senha.value && senha.dirty) return <Text style={styles.error}>Campo obrigatório</Text>;
        return null;
    };

    const handleConfirmarSenhaError = () => {
        if (!confirmarSenha.value && confirmarSenha.dirty) return <Text style={styles.error}>Campo obrigatório</Text>;
        if (senha.value !== confirmarSenha.value && confirmarSenha.dirty) return <Text style={styles.error}>Senhas não coincidem</Text>;
        return null;
    };

    const handleRegister = () => {
        let hasError = false;
        
        if (!nome.value) setNome({ value: nome.value, dirty: true }), hasError = true;
        if (!cpf.value || !cpfRegex.test(cpf.value)) setCpf({ value: cpf.value, dirty: true }), hasError = true;
        if (!email.value || !emailRegex.test(email.value)) setEmail({ value: email.value, dirty: true }), hasError = true;
        if (!senha.value) setSenha({ value: senha.value, dirty: true }), hasError = true;
        if (!confirmarSenha.value || senha.value !== confirmarSenha.value) setConfirmarSenha({ value: confirmarSenha.value, dirty: true }), hasError = true;

        if (!hasError) {
            router.replace('/(tabs)/home');
        }
    };

    return (
        <LinearGradient 
            colors={['#1b8798', '#44749d']} 
            style={styles.container} 
            start={{ x: 0, y: 0 }} 
            end={{ x: 0, y: 1 }}>
                
            <View style={styles.formContainer}>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/images/logo.png')} style={styles.logo} />
                    <Text style={{ color: '#FFF', fontSize: 32, marginBottom: 20 }}>ClosetX</Text>
                </View>
                
                <TextInput style={styles.input} placeholderTextColor={'#C7C7CD'} placeholder='Nome Completo*' value={nome.value} onChangeText={(text) => setNome({ value: text, dirty: true })} />
                {handleNomeError()}

                <TextInput style={styles.input} placeholderTextColor={'#C7C7CD'} placeholder='CPF (XXX.XXX.XXX-XX)' value={cpf.value} onChangeText={(text) => setCpf({ value: text, dirty: true })} />
                {handleCpfError()}
                
                <TextInput style={styles.input} placeholderTextColor={'#C7C7CD'} placeholder='E-mail*' value={email.value} onChangeText={(text) => setEmail({ value: text, dirty: true })} />
                {handleEmailError()}
                
                <TextInput style={styles.input} placeholderTextColor={'#C7C7CD'} placeholder='Senha*' secureTextEntry value={senha.value} onChangeText={(text) => setSenha({ value: text, dirty: true })} />
                {handleSenhaError()}
                
                <TextInput style={styles.input} placeholderTextColor={'#C7C7CD'} placeholder='Repetir Senha*' secureTextEntry value={confirmarSenha.value} onChangeText={(text) => setConfirmarSenha({ value: text, dirty: true })} />
                {handleConfirmarSenhaError()}
                
                <TouchableOpacity onPress={handleRegister} style={styles.registerButton}><Text style={{ color: '#FFF' }}>Enviar</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => router.replace('/')} style={styles.backButton}><Text style={{ color: '#0EDFBD' }}>Voltar</Text></TouchableOpacity>
            </View>
        </LinearGradient>
    );
};
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
    
    registerButton: {
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
    },

    error: {
        width: '100%',
        color: '#FF5733',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5
    },
    
    
})

export default Register