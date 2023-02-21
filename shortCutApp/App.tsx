/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
  DeviceEventEmitter,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

import QuickActions, { ShortcutItem } from 'react-native-quick-actions'

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): JSX.Element {
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
}

const ACTIVITIES = 'activities'
const NOTIFICATION = 'notification'

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    const processShortcut = ( item: ShortcutItem ) => {
        if(item.type === ACTIVITIES) {
          console.log('item')
          console.log(item)
          console.log('redirect to activities')
        } else if(item.type === NOTIFICATION) {
          console.log('item')
          console.log(item)
          console.log('redirect to notification')
        }
    }

    QuickActions.setShortcutItems([
      {
        type: ACTIVITIES,
        title: 'Atividades',
        subtitle: 'detalhes das atividades',
        icon: 'activities',
        userInfo: {
          url: 'url'
        }
      },
      {
        type: NOTIFICATION,
        title: 'Notificações',
        subtitle: 'detalhes notificações',
        icon: 'notification',
        userInfo: {
          url: 'url'
        }
      }
    ]);

    QuickActions.popInitialAction().then(item => {
      processShortcut(item);

    }).catch(error => {
      console.log('something went wrong')
    });

    DeviceEventEmitter.addListener('quickActionShortcut', (item: ShortcutItem) => {
    processShortcut(item);
    })

    return () => {
      QuickActions.clearShortcutItems();
      DeviceEventEmitter.removeAllListeners();
    }

  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
  }
});

export default App;
