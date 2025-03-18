import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCart } from './cartContext'; 

const products = [
  { id: '1', name: 'Produto 1', price: 10.0 },
  { id: '2', name: 'Produto 2', price: 15.5 },
  { id: '3', name: 'Produto 3', price: 20.0 },
];

const Home = () => {
  const { addToCart } = useCart(); 

  return (
    <LinearGradient colors={['#f0f4f7', '#d9e3f0']} style={styles.gradientBackground}>
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Produtos Disponíveis</Text>

        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <View>
                <Text style={styles.productText}>{item.name}</Text>
                <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => addToCart({ ...item, quantity: 1 })}
              >
                <Text style={styles.buttonText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
  },
  container: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#e8f0fe',
    borderRadius: 8,
  },
  productText: {
    fontSize: 18,
    color: '#333',
  },
  button: {
    backgroundColor: '#ffffff88',
    padding: 10,
    borderRadius: 8,
    minWidth: 90,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },

  productPrice: {
    fontSize: 16,
    color: '#555',
  },

});

export default Home;
