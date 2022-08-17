import Exponea from 'react-native-exponea-sdk';
import { PushTokenTrackingFrequency } from 'react-native-exponea-sdk/lib/Configuration';
import {LogLevel} from 'react-native-exponea-sdk/lib/ExponeaType';

console.log('app');
const isConfigured = Exponea.isConfigured();
console.log('is Exponea configured at start: ', isConfigured);
configureExponea({
    projectToken: 'c178a8c8-5cea-11e8-aa8c-ac1f6b02225e',
    authorizationToken:
        '684g7zqah5dz5hg52bswi14e1r5me25hudggwprde94nahrr5su7k3aohbwpikcj',
    // default baseUrl value is https://api.exponea.com
    baseUrl: 'https://api-cis.exponea.com',
    httpLoggingLevel: 'BODY',
    automaticSessionTracking: true,
    pushTokenTrackingFrequency: PushTokenTrackingFrequency.DAILY
});

async function configureExponea(configuration) {
    Exponea.setLogLevel(LogLevel.VERBOSE);
    console.log(configuration);
    try {
      if (!(await Exponea.isConfigured())) {
        console.log('Configuring Exponea');
        await Exponea.configure(configuration).catch(error => console.log(error));
        // Exponea.identifyCustomer(
        //   {registered: 'nikolay.semyonov@exponea.com'}, // customer identifiers
        //   {payingCustomer: true}, // customer properties
        // );
        Exponea.anonymize();
      } else {
        console.log('Exponea SDK already configured.');
        return true;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

