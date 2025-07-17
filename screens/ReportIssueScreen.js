import * as Location from 'expo-location';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-maps';
import Svg, { Path } from 'react-native-svg';
import { db } from '../firebase';

const { width, height } = Dimensions.get('window');

export default function ReportIssueScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('Fetching location...');
  const [region, setRegion] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);

  useEffect(() => {
    const fetchInitialLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setAddress('Permission denied');
          return;
        }
        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
        const initialRegion = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        };
        setRegion(initialRegion);
        setMarkerPosition({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
        fetchAddress(loc.coords.latitude, loc.coords.longitude);
      } catch (error) {
        console.error(error);
        setAddress('Failed to fetch location');
      }
    };
    fetchInitialLocation();
  }, []);

  const fetchAddress = async (lat, lon) => {
    try {
      let addr = await Location.reverseGeocodeAsync({
        latitude: lat,
        longitude: lon,
      });
      if (addr && addr.length > 0) {
        const a = addr[0];
        setAddress(
          `${a.name ? a.name + ', ' : ''}${a.street ? a.street + ', ' : ''}${
            a.city ? a.city + ', ' : ''
          }${a.region ? a.region + ', ' : ''}${a.country ? a.country : ''}`
        );
      } else {
        setAddress('Location not found');
      }
    } catch (err) {
      console.error(err);
      setAddress('Failed to fetch location');
    }
  };

  const onMarkerDragEnd = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerPosition({ latitude, longitude });
    fetchAddress(latitude, longitude);
  };


  // State for issue selection and description
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [description, setDescription] = useState('');
  // Submit handler
  const handleSubmit = async () => {
    if (!description.trim()) {
      alert('Please enter a description.');
      return;
    }
    try {
      await addDoc(collection(db, 'reports'), {
        issues: selectedIssues,
        description,
        address,
        markerPosition,
        timestamp: Timestamp.now(),
      });
      alert('Report submitted!');
      // Optionally reset form or navigate
    } catch (err) {
      alert('Failed to submit report');
      console.error(err);
    }
  };

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
              <Svg width={24} height={24} fill="#1D2B3A" viewBox="0 0 256 256">
                <Path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
              </Svg>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Report an Issue</Text>
          </View>
          <Text style={styles.title}>What's the issue?</Text>
          <MultiSelectIssues selected={selectedIssues} setSelected={setSelectedIssues} />
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              placeholder="Describe the issue in detail"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />
          </View>
          {/* Editable Address */}
          <View style={styles.textAreaContainer}>
            <TextInput
              value={address}
              onChangeText={setAddress}
              style={styles.textArea}
              placeholder="Search or type location"
            />
          </View>
          
          {/* Map Section */}
          <View style={styles.mapContainer}>
      {region && (
       <>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
        onRegionChangeComplete={(newRegion) => {
          setRegion(newRegion);
          setMarkerPosition({
            latitude: newRegion.latitude,
            longitude: newRegion.longitude,
          });
          fetchAddress(newRegion.latitude, newRegion.longitude);
        }}
      />
      {/* Center Pin Icon */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginLeft: -16,
          marginTop: -32,
          zIndex: 10,
        }}
      >
        <Text style={{ fontSize: 32, textAlign: 'center' }}>📍</Text>
      </View>
    </>
  )}
</View>

          
        </View>
        <View>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
          <View style={{ height: 20, backgroundColor: '#f8f9fc' }} />
        </View>
      </ScrollView>
    </View>
  );
}

// Multi-select issue cards with emoji and colored location icons
const ISSUE_OPTIONS = [
  {
    key: 'stray',
    label: 'Stray Animals',
    emoji: '🐕',
    color: '#FF3B30', // Red
  },
  {
    key: 'garbage',
    label: 'Garbage Overflow',
    emoji: '♻️', // recycling
    color: '#34C759', // Green
    image: require('../assets/recycling.png'),
  },
  {
    key: 'streetlight',
    label: 'Broken Streetlight',
    emoji: '💡',
    color: '#FFD600', // Yellow
    image: require('../assets/street-light.png'),
  },
  {
    key: 'drain',
    label: 'Open Drain',
    image: require('../assets/drain.png'),
    color: '#FF9500', // Orange
    height: 15,
    width: 20,
  },
  {
    key: 'others',
    label: 'Others',
    image: require('../assets/warning.png'),// warning
    color: '#007AFF', // Blue
  },
];

function MultiSelectIssues({ selected, setSelected }) {
  const toggleSelect = (key) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };
  return (
    <View style={styles.issueGrid}>
      {ISSUE_OPTIONS.map((option) => (
        <TouchableOpacity
          key={option.key}
          style={[
            styles.issueCard,
            selected.includes(option.key) && {
              borderColor: option.color,
              backgroundColor: '#e7ebf3',
            },
          ]}
          onPress={() => toggleSelect(option.key)}
          activeOpacity={0.8}
        >
          {option.image ? (
            <Image source={option.image} style={{ width: 30, height: 28, marginRight: 6 }} />
          ) : option.key === 'drain' ? (
            <Text style={{ fontSize: 30, marginRight: 6 }}>{option.emoji}</Text>
          ) : (
            <Text style={{ fontSize: 22, marginRight: 6 }}>{option.emoji}</Text>
          )}
          <Text style={styles.issueCardLabel}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f8f9fc',
    justifyContent: 'space-between',
    paddingTop: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fc',
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
    color: '#0d121b',
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
    marginRight: 48,
    fontFamily: 'Poppins-Bold',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  title: {
    color: '#0d121b',
    fontWeight: 'bold',
    fontSize: 22,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
    textAlign: 'left',
    fontFamily: 'Poppins-Bold',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  mapContainer: {
    height: 220,
    width: '100%',
    marginVertical: 12,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#e7ebf3',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  issueGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    padding: 16,
    justifyContent: 'space-between',
  },
  issueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#cfd8e7',
    backgroundColor: '#f8f9fc',
    padding: 12,
    marginBottom: 8,
    flex: 1,
    minWidth: 158,
  },
  issueCardLabel: {
    color: '#0d121b',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
    fontFamily: 'Poppins-Bold',
    includeFontPadding: false,
    textAlignVertical: 'center',
    flexShrink: 1,
    flexWrap: 'wrap',
    maxWidth: '70%',
  },
  textAreaContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  textArea: {
    backgroundColor: '#e7ebf3',
    borderRadius: 12,
    minHeight: 48,
    padding: 12,
    fontSize: 16,
    color: '#0d121b',
    fontFamily: 'Poppins-Regular',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionCol: {
    flex: 2,
    gap: 2,
  },
  sectionTitle: {
    color: '#0d121b',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  sectionSubtitle: {
    color: '#4c679a',
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  sectionImage: {
    flex: 1,
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#e7ebf3',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  submitButton: {
    backgroundColor: '#1398eb',
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 8,
  },
  submitButtonText: {
    color: '#f8f9fc',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});