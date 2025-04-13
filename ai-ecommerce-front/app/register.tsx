// app/register.tsx
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { API_BASE_URL } from './config';  // Importa a constante

const Register = () => {
  const router = useRouter();
  const [nome, setNome] = useState({ value: '', dirty: false });
  const [cpf, setCpf] = useState({ value: '', dirty: false });
  const [email, setEmail] = useState({ value: '', dirty: false });
  const [senha, setSenha] = useState({ value: '', dirty: false });
  const [confirmarSenha, setConfirmarSenha] = useState({ value: '', dirty: false });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

  const handleRegister = async () => {
    let hasError = false;
    if (!nome.value) { setNome({ value: nome.value, dirty: true }); hasError = true; }
    if (!cpf.value || !cpfRegex.test(cpf.value)) { setCpf({ value: cpf.value, dirty: true }); hasError = true; }
    if (!email.value || !emailRegex.test(email.value)) { setEmail({ value: email.value, dirty: true }); hasError = true; }
    if (!senha.value) { setSenha({ value: senha.value, dirty: true }); hasError = true; }
    if (!confirmarSenha.value || senha.value !== confirmarSenha.value) { setConfirmarSenha({ value: confirmarSenha.value, dirty: true }); hasError = true; }

    if (!hasError) {
      try {
        const response = await fetch(`${API_BASE_URL}/user/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: nome.value,
            cpf: cpf.value,
            login: email.value,  // Considerando que o e-mail será o login
            password: senha.value
          })
        });
        if (response.ok) {
          router.replace('/(tabs)/home');
        } else {
          const errorData = await response.json();
          Alert.alert('Erro no cadastro', errorData.message || 'Cadastro falhou.');
        }
      } catch (error) {
        console.error('Erro ao cadastrar:', error);
        Alert.alert('Erro', 'Não foi possível realizar o cadastro.');
      }
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
        {nome.dirty && nome.value.length < 2 && <Text style={styles.error}>Nome deve ter pelo menos 2 caracteres</Text>}
        <TextInput style={styles.input} placeholderTextColor={'#C7C7CD'} placeholder='CPF (XXX.XXX.XXX-XX)' value={cpf.value} onChangeText={(text) => setCpf({ value: text, dirty: true })} />
        {cpf.dirty && !cpfRegex.test(cpf.value) && <Text style={styles.error}>CPF inválido</Text>}
        <TextInput style={styles.input} placeholderTextColor={'#C7C7CD'} placeholder='E-mail*' value={email.value} onChangeText={(text) => setEmail({ value: text, dirty: true })} />
        {email.dirty && !emailRegex.test(email.value) && <Text style={styles.error}>E-mail inválido</Text>}
        <TextInput style={styles.input} placeholderTextColor={'#C7C7CD'} placeholder='Senha*' secureTextEntry value={senha.value} onChangeText={(text) => setSenha({ value: text, dirty: true })} />
        {senha.dirty && !senha.value && <Text style={styles.error}>Campo obrigatório</Text>}
        <TextInput style={styles.input} placeholderTextColor={'#C7C7CD'} placeholder='Repetir Senha*' secureTextEntry value={confirmarSenha.value} onChangeText={(text) => setConfirmarSenha({ value: text, dirty: true })} />
        {confirmarSenha.dirty && senha.value !== confirmarSenha.value && <Text style={styles.error}>Senhas não coincidem</Text>}
        <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
          <Text style={{ color: '#FFF' }}>Enviar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/')} style={styles.backButton}>
          <Text style={{ color: '#0EDFBD' }}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  formContainer: { width: '80%', height: '50%', justifyContent: 'center', alignItems: 'center' },
  registerButton: { width: '100%', height: 50, marginBottom: 10, backgroundColor: '#5bb7b6', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  backButton: { width: '100%', height: 50, backgroundColor: '#FFF', borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#5bb7b6' },
  input: { width: '100%', backgroundColor: 'white', height: 40, borderRadius: 5, marginBottom: 10, paddingHorizontal: 10 },
  logoContainer: { justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  logo: { width: 140, height: 140, resizeMode: 'contain' },
  error: { width: '100%', color: '#FF5733', fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
});

export default Register;
