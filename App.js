/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export default function App() {
  const {userInfo, setUserInfo} = useState(null);
  const {disabled, setDisabled} = useState(false);
  const connect = async () => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId:
        '978683698573-g09tm9jgom6he0bt0e6v4vandm2118bd.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  };

  const signIn = async () => {
    connect();
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // setUserInfo(userInfo);
      // setDisabled(true);
      console.log(JSON.stringify(userInfo));
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('error 1');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('error 2');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('error 3');
      } else {
        // some other error happened
        console.log(error);
      }
    }
  };
  return (
    <View>
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => signIn()}
        disabled={disabled}
      />
      <Text> hello all </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
