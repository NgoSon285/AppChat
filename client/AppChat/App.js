import React, {Component} from 'react';
import {Text, View, TextInput, Image, StyleSheet, Platform} from 'react-native';
import io from 'socket.io-client';
import {GiftedChat} from 'react-native-gifted-chat';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessages: [],
    };
  }

  componentDidMount() {
    this.socket = io('http://10.28.164.66:5000');
    this.socket.on('chat message', (msg) => {
      this.setState((previousState) => ({
        chatMessages: GiftedChat.append(previousState.chatMessages, msg),
      }));
      if (msg[0]['text'] === 'Skill') {
        const skills = [
          {
            _id: 1,
            text: 'Choose your skills',
            createdAt: new Date(),
            user: {
              _id: 2,
            },
            quickReplies: {
              type: 'radio', // or 'checkbox',
              keepIt: true,
              values: [
                {
                  title: 'NodeJS',
                  value: 'NodeJS',
                },
                {
                  title: '📷 ReactNative',
                  value: 'ReactNative',
                },
                {
                  title: 'Flutter',
                  value: 'Flutter',
                },
              ],
            },
          },
        ];
        this.setState((previousState) => ({
          chatMessages: GiftedChat.append(previousState.chatMessages, skills),
        }));
      }
    });
  }
  onSend = (messages) => {
    this.socket.emit('chat message', messages);
  };
  onQuickReply(quickReply) {
    if (quickReply[0].title === 'NodeJS') {
      const skill = [
        {
          _id: Math.floor(Math.random() * 100) + 3,
          text: 'NodeJS',
          createdAt: new Date(),
          user: {
            _id: 1,
          },
        },
      ];
      this.socket.emit('chat message', skill);
    } else if (quickReply[0].title === '📷 ReactNative') {
      const skill = [
        {
          _id: 84,
          text: 'ReactNAtive',
          createdAt: new Date(),
          user: {
            _id: 1,
          },
        },
      ];
      this.socket.emit('chat message', skill);
    } else if (quickReply[0].title === 'Flutter') {
      const skill = [
        {
          _id: 85,
          text: 'Flutter',
          createdAt: new Date(),
          user: {
            _id: 1,
          },
        },
      ];
      this.socket.emit('chat message', skill);
    }
    // infinite possibilities
  }
  customSend = () => {
    return (
      <View>
        <Image
          source={{
            uri:
              'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iconfinder.com%2Ficons%2F1495053%2Fcircle_content_send_icon&psig=AOvVaw0d4K_aqHDE8yOLNmMqfxYa&ust=1615147756837000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKik_LS8nO8CFQAAAAAdAAAAABAD',
          }}
        />
      </View>
    );
  };
  render() {
    return (
      <GiftedChat
        messages={this.state.chatMessages}
        onSend={this.onSend}
        user={{
          _id: Platform.OS === 'ios' ? 1 : 2,
          avatar:
            Platform.OS === 'ios'
              ? 'https://scontent.fhan2-5.fna.fbcdn.net/v/t1.0-9/150768770_2855804291374039_3413872795230984273_o.jpg?_nc_cat=107&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=n1ebC59AiS8AX8ZgAq-&_nc_ht=scontent.fhan2-5.fna&oh=10bce7b62e99116285cc9fb3bab5a59d&oe=606AF809'
              : 'https://scontent.fhan2-6.fna.fbcdn.net/v/t1.0-9/71274265_2403494593271680_4495009808742612992_o.jpg?_nc_cat=100&ccb=1-3&_nc_sid=174925&_nc_ohc=kxBzsEIJOG0AX9yhvIw&_nc_ht=scontent.fhan2-6.fna&oh=68a4f48419e7b34047f6a2d28ffbb2c6&oe=6068EEDD',
          name: Platform.OS === 'ios' ? 'nhim' : 'oscar',
        }}
        onQuickReply={(quickReply) => this.onQuickReply(quickReply)}
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textIpnut: {
    width: 300,
    height: 70,
    borderColor: '#333',
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
    position: 'absolute',
    bottom: 30,
  },
});
