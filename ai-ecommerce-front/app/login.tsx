// app/login.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { API_BASE_URL } from './config';  // exemplo de import, se houver

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState({ value: '', dirty: false });
  const [password, setPassword] = useState({ value: '', dirty: false });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleErrorEmail = () => {
    if (!email.value && email.dirty) {
      return <Text style={styles.error}>Campo obrigatório</Text>;
    } else if (!emailRegex.test(email.value) && email.dirty) {
      return <Text style={styles.error}>E-mail inválido</Text>;
    } else {
      return null;
    }
  };

  const handleErrorPassword = () => {
    if (!password.value && password.dirty) {
      return <Text style={styles.error}>Campo obrigatório</Text>;
    } else {
      return null;
    }
  };

  const handleLogin = async () => {
    let hasError = false;

    if (!email.value) {
      setEmail({ value: email.value, dirty: true });
      hasError = true;
    }
    if (!password.value) {
      setPassword({ value: password.value, dirty: true });
      hasError = true;
    }
    if (!emailRegex.test(email.value)) {
      setEmail({ value: email.value, dirty: true });
      hasError = true;
    }

    if (!hasError) {
      try {
        const response = await fetch(`${API_BASE_URL}/user/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ login: email.value, password: password.value })
        });
        if (response.ok) {
          const user = await response.json();
          // Você pode salvar o usuário em um contexto global se necessário
          router.replace('/(tabs)/home');
        } else {
          Alert.alert('Login inválido', 'Confira suas credenciais.');
        }
      } catch (error) {
        console.error('Erro de login:', error);
        Alert.alert('Erro', 'Não foi possível fazer login.');
      }
    }
  };

  return (
    <LinearGradient
      colors={['#1b8798', '#44749d']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientBackground}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Entrar</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          placeholderTextColor="#999"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, dirty: true })}
        />
        {handleErrorEmail()}

        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#999"
          secureTextEntry
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, dirty: true })}
        />
        {handleErrorPassword()}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.replace('/')}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  error: {
    width: '100%',
    color: '#FF5733',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#ffffff88',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
