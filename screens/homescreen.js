import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
export default function HomeScreen({ navigation }) {
    const [fontsLoaded] = Font.useFonts({
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <View style={styles.root}>
        <StatusBar style="auto" />
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>FixNow</Text>
        </View>
        <Text style={styles.welcomeTitle}>Welcome to FixNow</Text>
        <Text style={styles.welcomeSubtitle}>Report civic issues anonymously</Text>
        <View style={styles.imageContainerModern}>
          <Image
            source={require('../assets/banner.png')}
            style={styles.imageModern}
            resizeMode="cover"
          />
        </View>
        <View style={styles.buttonGroupModern}>
          <TouchableOpacity style={styles.reportButtonModern} onPress={() => navigation.navigate('ReportIssue')}>
            <Text style={styles.reportButtonTextModern}>Report an Issue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewButtonModern} onPress={() => navigation.navigate('ViewReportedIssues')}>
            <Text style={styles.viewButtonTextModern}>View Reported Issues</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footerModern}>
          <TouchableOpacity style={styles.footerItemModern}>
            <Svg width={24} height={24} fill="#0d161b" viewBox="0 0 256 256">
              <Path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z" />
            </Svg>
            <Text style={styles.footerTextModern}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItemModern}>
            <Svg width={24} height={24} fill="#4c7c9a" viewBox="0 0 256 256">
              <Path d="M183.89,153.34a57.6,57.6,0,0,1-46.56,46.55A8.75,8.75,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68ZM216,144a88,88,0,0,1-176,0c0-27.92,11-56.47,32.66-84.85a8,8,0,0,1,11.93-.89l24.12,23.41,22-60.41a8,8,0,0,1,12.63-3.41C165.21,36,216,84.55,216,144Zm-16,0c0-46.09-35.79-85.92-58.21-106.33L119.52,98.74a8,8,0,0,1-13.09,3L80.06,76.16C64.09,99.21,56,122,56,144a72,72,0,0,0,144,0Z" />
            </Svg>
            <Text style={[styles.footerTextModern, { color: '#4c7c9a' }]} onPress={() => navigation.navigate('TopIssuesScreen')}>Top Issues</Text>
          </TouchableOpacity>
        </View>
        </View>
    );
    }

    const styles = StyleSheet.create({
      root: {
        flex: 1,
        backgroundColor: '#f8fafc',
        justifyContent: 'space-between',
        paddingTop: 32,
      },
      headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        padding: 18,
        paddingTop:68,
        paddingBottom: 8,
        justifyContent: 'center',
      },
      iconBox: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
      },
      headerTitle: {
        color: '#0d161b',
        fontSize: 25,
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        textAlignVertical: 'center',
        zIndex: 100,
      },
      welcomeTitle: {
        color: '#0d161b',
        fontSize: 24,
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        paddingTop: 20,
        paddingBottom: 2,
        letterSpacing: -0.5,
      },
      welcomeSubtitle: {
        fontSize: 16,
        color: '#0d161b',
        textAlign: 'center',
        paddingBottom: 12,
        fontFamily: 'Poppins-Regular',
        fontWeight: 'normal',
      },
      imageContainerModern: {
        width: '100%',
        aspectRatio: 3 / 2,
        borderRadius: 16,
        overflow: 'hidden',
        padding: 16,
        backgroundColor: '#f8fafc',
      },
      imageModern: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
      },
      buttonGroupModern: {
        maxWidth: 480,
        alignSelf: 'center',
        flexDirection: 'column',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        paddingBottom: 24,
      },
      reportButtonModern: {
        backgroundColor: '#1398eb',
        borderRadius: 999,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
        width: '100%',
        minWidth: 84,
        maxWidth: 480,
        alignSelf: 'center',
        paddingHorizontal: 20,
      },
      reportButtonTextModern: {
        color: '#f8f9fc',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
        textAlignVertical: 'center',
        includeFontPadding: false,
        letterSpacing: 0.2,
      },
      viewButtonModern: {
        backgroundColor: '#e7eff3',
        borderRadius: 999,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minWidth: 84,
        maxWidth: 480,
        alignSelf: 'center',
        paddingHorizontal: 20,
      },
      viewButtonTextModern: {
        color: '#0d161b',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        textAlignVertical: 'center',
        includeFontPadding: false,
        letterSpacing: 0.2,
      },
      footerModern: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#e7eff3',
        backgroundColor: '#f8fafc',
        paddingHorizontal: 16,
        paddingBottom: 12,
        paddingTop: 8,
        justifyContent: 'space-between',
        gap: 8,
      },
      footerItemModern: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 2,
        paddingVertical: 2,
      },
      footerTextModern: {
        fontSize: 12,
        fontWeight: '500',
        color: '#0d161b',
        marginTop: 2,
        marginBottom: 0,
        fontFamily: 'Poppins-Regular',
        letterSpacing: 0.2,
      },
    });
