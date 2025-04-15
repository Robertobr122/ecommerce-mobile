import { useLocalSearchParams } from 'expo-router'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, InteractionManager } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'

class Message {
  text: string
  sentBy: string
  constructor(text: string, sentBy: string) {
    this.text = text
    this.sentBy = sentBy
  }
}

let ws: WebSocket;
const Chat = () => {
  const scrollRef = useRef<FlatList>(null)
  const params = useLocalSearchParams()
  const [messages, setMessages] = useState<Message[]>([])
  const [text, setText] = useState('')
  const [userData, setUserData] = useState(
    typeof params.username === 'string' ? params.username : params.username?.[0] ?? ''
  ) // FORÇA userData a ser uma string
  

  useEffect(() => {
    ws = new WebSocket("ws://192.168.0.49:3000")
    ws.onopen = () => {
      console.log("Websocket funcionando!")
    }

    ws.onmessage = ({ data }: any) => {
        const { text, sentBy } = JSON.parse(data)
        const msg = new Message(text, sentBy) // instância da classe Message
        setMessages(prev => [...prev, msg])
        InteractionManager.runAfterInteractions(() => {
          scrollRef.current?.scrollToEnd({ animated: true })
        })
      }
      
  }, [])

  const sendMessage = () => {
    const msg = new Message(text, userData)
    setMessages(prev => [...prev, msg])
    ws.send(JSON.stringify(msg))
    setText('')
    InteractionManager.runAfterInteractions(() => {
      scrollRef.current?.scrollToEnd({ animated: true })
    })
  }

  return (
    <Fragment>
      <FlatList
        ref={scrollRef}
        data={messages} // ALTERADO
        keyExtractor={(item, index) => `${item.sentBy}-${item.text}-${index}`}
        renderItem={({ item }) => <Balloon message={item} userLogged={userData} />}
        ListEmptyComponent={() => <Text style={{ alignSelf: 'center', color: '#848484' }}>Sem mensagens no momento</Text>} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        style={styles.messageTextInputContainer}>
        <TextInput
          style={styles.messageTextInput}
          placeholder="Digite sua mensagem..."
          placeholderTextColor={Colors.light}
          value={text}
          multiline
          onChangeText={(message) => setText(message)}
        />
        <TouchableOpacity
          style={styles.sendButton}
          disabled={!text}
          onPress={() => {
            sendMessage()
          }}>
          <Text style={{ color: Colors.white }}>Enviar</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Fragment>
  )
}

const Balloon = ({ message, userLogged }: any) => {
  const sent = userLogged === message.sentBy
  const balloonColor = sent
    ? styles.balloonSent
    : styles.balloonReceived;
  const balloonTextColor = sent
    ? styles.balloonTextSent
    : styles.balloonTextReceived;
  const bubbleWrapper = sent
    ? styles.bubbleWrapperSent
    : styles.bubbleWrapperReceived;

  return (
    <View style={{ marginBottom: '2%' }}>
      <View style={{ ...styles.bubbleWrapper, ...bubbleWrapper }}>
        <View style={{ ...styles.balloon, ...balloonColor }}>
          <Text>
            {message.sentBy}
          </Text>
          <Text style={{ ...styles.balloonText, ...balloonTextColor }}>
            {message.text}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bubbleWrapper: {
    flexDirection: 'column',
  },
  bubbleWrapperSent: {
    alignSelf: 'flex-end',
    marginLeft: 40,
  },
  bubbleWrapperReceived: {
    alignSelf: 'flex-start',
    marginRight: 40,
  },
  balloon: {
    padding: 8,
    borderRadius: 16
  },
  balloonSent: {
    backgroundColor: Colors.primary,
  },
  balloonReceived: {
    backgroundColor: Colors.white,
  },
  balloonText: {
    fontSize: 18,
  },
  balloonTextSent: {
    color: Colors.white
  },
  balloonTextReceived: {
    color: Colors.black
  },
  sendButton: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    height: 40,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginRight: 5,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#848484",
    borderWidth: 1,
    marginTop: "3%",
    marginBottom: "5%",
    padding: 10

  },
  changeNameView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
    backgroundColor: 'white'
  },
  container: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  scrollViewContainer: {
    padding: 10,
    top: 10,
  },

  messageTextInputContainer: {
    justifyContent: 'flex-end',
    padding: 5,
    marginBottom: 20,
    borderColor: 'transparent',
    borderTopColor: Colors.light,
    alignItems: 'center',
    flexDirection: 'row',
  },
  messageTextInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 90,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    fontSize: 17,
    borderColor: Colors.light,
    borderWidth: 1,
    backgroundColor: Colors.white,
    borderRadius: 20,
  },
})

export default Chat
