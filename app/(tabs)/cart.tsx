import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCart } from './cartContext';

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentCard = () => {
    setShowPaymentModal(false);
    console.log("Pagamento com Cartão selecionado");
  };

  const handlePaymentPix = () => {
    setShowPaymentModal(false);
    console.log("Pagamento com PIX selecionado");
  };

  return (
    <LinearGradient colors={['#f0f4f7', '#d9e3f0']} style={styles.gradientBackground}>
      <View style={styles.container}>
        <Text style={styles.title}>Produtos no Carrinho</Text>

        {cart.length === 0 ? (
          <Text style={styles.emptyMessage}>Seu carrinho está vazio.</Text>
        ) : (
          <>
            <FlatList
              data={cart}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.productItem}>
                  <View style={styles.productInfo}>
                    <Text style={styles.productText}>{item.name}</Text>
                    <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
                    <Text style={styles.productSubtotal}>
                      Subtotal: R$ {(item.price * item.quantity).toFixed(2)}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => removeFromCart(item.id)}
                  >
                    <Text style={styles.buttonText}>Remover</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
            <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
          </>
        )}

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
          disabled={cart.length === 0}
        >
          <Text style={styles.checkoutButtonText}>Finalizar Compras</Text>
        </TouchableOpacity>

        <Modal
          visible={showPaymentModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowPaymentModal(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Opções de Pagamento</Text>
              <Text style={styles.modalTotal}>Total: R$ {total.toFixed(2)}</Text>
              <TouchableOpacity style={styles.paymentButton} onPress={handlePaymentCard}>
                <Text style={styles.paymentButtonText}>Cartão</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.paymentButton} onPress={handlePaymentPix}>
                <Text style={styles.paymentButtonText}>PIX</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowPaymentModal(false)}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  productInfo: {
    flex: 1,
  },
  productText: {
    fontSize: 18,
    color: '#333',
  },
  productPrice: {
    fontSize: 16,
    color: '#555',
  },
  productSubtotal: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
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
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  paymentButton: {
    backgroundColor: '#5bb7b6',
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  paymentButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#5bb7b6',
  },
});

export default Cart;
