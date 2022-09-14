/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import exponeaConfig from './exponea-config.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Exponea from 'react-native-exponea-sdk';
import {LogLevel} from 'react-native-exponea-sdk/lib/ExponeaType';

import analytics from '@react-native-firebase/analytics';

async function configureExponea(configuration) {
  Exponea.setLogLevel(LogLevel.VERBOSE);
  console.log(configuration);
  try {
    // Exponea.checkPushSetup();
    if (!(await Exponea.isConfigured())) {
      console.log('Configuring Exponea');
      await Exponea.configure(configuration).catch(error => console.log(error));
    } else {
      console.log('Exponea SDK already configured.');
      return true;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
  await Exponea.identifyCustomer(
    {
      registered: 'nikolay.semyonov@exponea.com',
    },
    {},
  );
  setSilentPushListener();
}
function setSilentPushListener() {
  console.log({message: 'Exponea silent push configured'});
  AsyncStorage.getItem('showBirthday').then(item => {
    console.log({item});
  });
  Exponea.setPushReceivedListener(data => {
    console.log({data});
    AsyncStorage.setItem('showBirthday', JSON.stringify(data));
    console.log('im here');
  });
}

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  console.log('app');
  const isConfigured = Exponea.isConfigured();
  console.log('is Exponea configured at start: ', isConfigured);
  configureExponea({
    projectToken: exponeaConfig.projectToken,
    authorizationToken: exponeaConfig.authorizationToken,
    // default baseUrl value is https://api.exponea.com
    baseUrl: exponeaConfig.baseUrl,
    httpLoggingLevel: 'BODY',
    automaticSessionTracking: true,
    pushTokenTrackingFrequency: 'EVERY_LAUNCH',
  });

  // Exponea.identifyCustomer({}, {
  //   "apple_push_notification_id": "2133"
  // });

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
