import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import React, { Component } from 'react';
import { Button, View, TextInput } from 'react-native';
import { WebView } from 'react-native-webview';

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

class UrlScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props) {
    super(props);
    this.state = {
      url: "https://www.google.com",
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{padding: 10}}>
        <TextInput textContentType="URL" style={{height: 40}} placeholder="Vá escreve-la o url para testares..."
          onChangeText={
            (text) => {
              this.state.url = text;
              this.setState({text});
            }
          }
          value={this.state.url}
        />
        <Button title="Go to WebView" onPress={
          () => {
            if(validURL(this.state.url)){
              navigation.navigate('WebView', {
                url: this.state.url,
              });
            }else{
              alert("O minimo que podes fazer é colocar um URL válido!");
            }
          }
        } />
      </View>
    );
  }
}

class WebViewScreen extends Component {
  static navigationOptions = {
    title: 'WebView',
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{
            uri: navigation.getParam('url', 'https://www.google.com'),
          }}
        />
      </View>
    );
  }

}

const MainNavigator = createStackNavigator({
  "Url": {screen: UrlScreen},
  "WebView": {screen: WebViewScreen},
});

const App = createAppContainer(MainNavigator);

export default App;
