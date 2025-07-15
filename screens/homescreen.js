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
        <View style={styles.header}>
            <View style={styles.icon}>
                <Svg width={24} height={24} fill="currentColor" viewBox="0 0 256 256">
                    <Path d="M232,56V200a16,16,0,0,1-16,16H144a8,8,0,0,1,0-16h72V56H40V96a8,8,0,0,1-16,0V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56ZM32,184a8,8,0,0,0,0,16,8,8,0,0,1,8,8,8,8,0,0,0,16,0A24,24,0,0,0,32,184Zm0-32a8,8,0,0,0,0,16,40,40,0,0,1,40,40,8,8,0,0,0,16,0A56.06,56.06,0,0,0,32,152Zm0-32a8,8,0,0,0,0,16,72.08,72.08,0,0,1,72,72,8,8,0,0,0,16,0A88.1,88.1,0,0,0,32,120Z" />
                </Svg>
            </View>
            <Text style={styles.headerTitle}>
                FixNow
            </Text>
        </View>
        <Text style={styles.welcomeTitle}>Welcome to FixNow</Text>
        <Text style={styles.welcomeSubtitle}>Report civic issues anonymously</Text>
        <View style={styles.imageContainer}>
            <Image
                source={require('../assets/banner.png')}
                style={styles.image}
                resizeMode="cover"
            />
        </View>
        <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.reportButton} onPress={() => navigation.navigate('ReportIssue')}>
              <Text style={styles.reportButtonText}>Report an Issue</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>View Reported Issues</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.footer}>
            <View style={styles.footerItem}>
            <Svg width={24} height={24} fill="#0d121c" viewBox="0 0 256 256">
                <Path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z" />
            </Svg>
            <Text style={styles.footerText}>Home</Text>
            </View>
            <View style={styles.footerItem}>
            <Svg width={24} height={24} fill="#47669e" viewBox="0 0 256 256">
                <Path d="M228.92,49.69a8,8,0,0,0-6.86-1.45L160.93,63.52,99.58,32.84a8,8,0,0,0-5.52-.6l-64,16A8,8,0,0,0,24,56V200a8,8,0,0,0,9.94,7.76l61.13-15.28,61.35,30.68A8.15,8.15,0,0,0,160,224a8,8,0,0,0,1.94-.24l64-16A8,8,0,0,0,232,200V56A8,8,0,0,0,228.92,49.69ZM104,52.94l48,24V203.06l-48-24ZM40,62.25l48-12v127.5l-48,12Zm176,131.5-48,12V78.25l48-12Z" />
            </Svg>
            <Text style={[styles.footerText, { color: '#47669e' }]}>Map</Text>
            </View>
        </View>
        </View>
    );
    }

    const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'space-between',
        paddingTop: 32,
        // fontFamily removed to use system default
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 16,
        paddingBottom: 8,
        position: 'relative',
    },
    icon: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        color: '#0d121c',
        fontWeight: 'bold',
        fontSize: 20,
        fontFamily: 'Poppins-Regular',
        includeFontPadding: false,
        textAlign: 'center',
        textAlignVertical: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        // marginBottom removed to prevent clipping
    },
    welcomeTitle: {
        color: '#0d121c',
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: 'Poppins-Regular',
        includeFontPadding: false,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    welcomeSubtitle: {
        fontSize: 16,
        color: '#0d121c',
        textAlign: 'center',
        paddingBottom: 8,
        marginBottom: 12,
        fontFamily: 'Poppins-Regular',
    },
    imageContainer: {
        width: '100%',
        aspectRatio: 3 / 2,
        borderRadius: 16,
        overflow: 'hidden',
        padding: 16,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
    },
    buttonGroup: {
        maxWidth: 480,
        alignSelf: 'center',
        flexDirection: 'column',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        paddingBottom: 24,
    },
    reportButton: {
        backgroundColor: '#065bf8',
        borderRadius: 12,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    reportButtonText: {
        color: '#f8f9fc',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
        textAlignVertical: 'center',
        includeFontPadding: false,
        // marginBottom removed to prevent clipping
    },
    viewButton: {
        backgroundColor: '#e6ebf4',
        borderRadius: 12,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewButtonText: {
        color: '#0d121c',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        textAlignVertical: 'center',
        includeFontPadding: false,
        // marginBottom removed to prevent clipping
    },
    footer: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#e6ebf4',
        backgroundColor: '#f8f9fc',
        paddingHorizontal: 16,
        paddingBottom: 12,
        paddingTop: 8,
        justifyContent: 'space-between',
    },
    footerItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    footerText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#0d121c',
        marginTop: 2,
        marginBottom: 8,
        fontFamily: 'Poppins-Regular',
    },
    });
