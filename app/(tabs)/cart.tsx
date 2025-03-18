import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCart } from './cartContext';  // Certifique-se de que o hook useCart está sendo importado corretamente

const Cart = () => {
  const { cart, removeFromCart } = useCart();  // Obtendo o carrinho e a função de remover
  const [isCheckout, setIsCheckout] = useState(false);  // Adicionando um estado para controlar a finalização das compras

  const handleCheckout = () => {
    setIsCheckout(true);
    // Você pode adicionar lógica para a finalização de compras aqui, como redirecionamento, processamento do pedido, etc.
    console.log("Compra Finalizada!");
  };

  return (
    <LinearGradient colors={['#f0f4f7', '#d9e3f0']} style={styles.gradientBackground}>
      <View style={styles.container}>
        <Text style={styles.title}>Produtos no Carrinho</Text>

        {cart.length === 0 ? (
          <Text style={styles.emptyMessage}>Seu carrinho está vazio.</Text>
        ) : (
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.productItem}>
                <Text style={styles.productText}>
                  {item.name} {item.quantity > 1 && `(${item.quantity})`}
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => removeFromCart(item.id)} // Remover o produto do carrinho
                >
                  <Text style={styles.buttonText}>Remover</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}

        {/* Adicionando o botão de finalizar compras */}
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
          disabled={cart.length === 0} // Desabilita o botão caso o carrinho esteja vazio
        >
          <Text style={styles.checkoutButtonText}>
            Finalizar Compras
          </Text>
        </TouchableOpacity>
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
  emptyMessage: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
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
  checkoutButton: {
    backgroundColor: '#5bb7b6',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Cart;
