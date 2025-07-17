import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { db } from '../firebase';


// ...existing code...

function IconSVG({ icon, color }) {
  if (icon === 'lightbulb') {
    return (
      <Svg width={24} height={24} fill={color || '#101418'} viewBox="0 0 256 256">
        <Path d="M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Zm-16,0a72,72,0,0,0-73.74-72c-39,.92-70.47,33.39-70.26,72.39a71.65,71.65,0,0,0,27.64,56.3A32,32,0,0,1,96,186v6h64v-6a32.15,32.15,0,0,1,12.47-25.35A71.65,71.65,0,0,0,200,104Zm-16.11-9.34a57.6,57.6,0,0,0-46.56-46.55,8,8,0,0,0-2.66,15.78c16.57,2.79,30.63,16.85,33.44,33.45A8,8,0,0,0,176,104a9,9,0,0,0,1.35-.11A8,8,0,0,0,183.89,94.66Z" />
      </Svg>
    );
  }
  if (icon === 'dog') {
    return (
      <Svg width={24} height={24} fill={color || '#101418'} viewBox="0 0 256 256">
        <Path d="M239.71,125l-16.42-88a16,16,0,0,0-19.61-12.58l-.31.09L150.85,40h-45.7L52.63,24.56l-.31-.09A16,16,0,0,0,32.71,37.05L16.29,125a15.77,15.77,0,0,0,9.12,17.52A16.26,16.26,0,0,0,32.12,144,15.48,15.48,0,0,0,40,141.84V184a40,40,0,0,0,40,40h96a40,40,0,0,0,40-40V141.85a15.5,15.5,0,0,0,7.87,2.16,16.31,16.31,0,0,0,6.72-1.47A15.77,15.77,0,0,0,239.71,125ZM32,128h0L48.43,40,90.5,52.37Zm144,80H136V195.31l13.66-13.65a8,8,0,0,0-11.32-11.32L128,180.69l-10.34-10.35a8,8,0,0,0-11.32,11.32L120,195.31V208H80a24,24,0,0,1-24-24V123.11L107.92,56h40.15L200,123.11V184A24,24,0,0,1,176,208Zm48-80L165.5,52.37,207.57,40,224,128ZM104,140a12,12,0,1,1-12-12A12,12,0,0,1,104,140Zm72,0a12,12,0,1,1-12-12A12,12,0,0,1,176,140Z" />
      </Svg>
    );
  }
  return null;
}

export default function TopIssuesScreen({ navigation }) {
  const [topIssues, setTopIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'reports'), orderBy('likes', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const issues = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(issue => (issue.likes || 0) >= 1);
      setTopIssues(issues);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headerIconBox}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
            <Svg width={24} height={24} fill="#101418" viewBox="0 0 256 256">
              <Path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
            </Svg>
          </TouchableOpacity>
        </View>
        <Text style={styles.topIssuesTitle}>Top Issues</Text>
      </View>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#1398eb" />
        </View>
      ) : (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 16 }}>
          {topIssues.length === 0 ? (
            <Text style={{ textAlign: 'center', color: '#888', marginTop: 24, fontFamily: 'Poppins-Regular' }}>No top issues yet.</Text>
          ) : (
            topIssues.map((issue, idx) => {
              // Determine type and icon/emoji/color
              const type = Array.isArray(issue.issues) && issue.issues.length > 0 ? issue.issues[0] : 'others';
              const typeMap = {
                stray: {
                  
                  emoji: '🐕',
                  color: '#FF3B30',
                  label: 'Stray Animals',
                },
                garbage: {
                  image: require('../assets/recycling.png'),
                  emoji: '♻️',
                  color: '#34C759',
                  label: 'Garbage Overflow',
                },
                streetlight: {
                  image: require('../assets/street-light.png'),
                  emoji: '💡',
                  color: '#FFD600',
                  label: 'Broken Streetlight',
                },
                drain: {
                  image: require('../assets/drain.png'),
                  emoji: '🚧',
                  color: '#FF9500',
                  label: 'Open Drain',
                },
                others: {
                  image: require('../assets/warning.png'),
                  emoji: '⚠️',
                  color: '#007AFF',
                  label: 'Others',
                },
              };
              const meta = typeMap[type] || typeMap.others;
              return (
                <TouchableOpacity
                  key={issue.id}
                  style={styles.issueRow}
                  activeOpacity={0.8}
                  onPress={() => {
                    if (issue.markerPosition) {
                      navigation.navigate('ViewReportedIssues', {
                        focusMarker: issue.markerPosition,
                        focusId: issue.id,
                        focusType: type // pass the type for correct icon
                      });
                    } else {
                      navigation.navigate('ViewReportedIssues');
                    }
                  }}
                >
                  <View style={styles.issueLeft}>
                    <Text style={{ fontSize: 18, fontFamily: 'Poppins-Bold', color: 'black', marginRight: 8 }}>{idx + 1}</Text>
                    <View style={[styles.issueIcon, { backgroundColor: '#eaedf1' }]}> 
                      <Image source={meta.image} style={{ width: 32, height: 32, resizeMode: 'contain' }} />
                    </View>
                    <View style={styles.issueTextCol}>
                      <Text style={styles.issueLabel}>{meta.label}</Text>
                      {issue.description ? (
                        <Text style={[styles.issueDescription, { fontFamily: 'Poppins-Regular' }]} numberOfLines={2} ellipsizeMode="tail">{issue.description}</Text>
                      ) : null}

                      
                      <Text style={styles.issueAddress}>📍 {issue.address || 'No address'}</Text>
                     
                    </View>
                  </View>
                  <Text style={styles.likesText}>👍 {issue.likes || 0} votes</Text>
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
      )}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Home')}>
          <Svg width={24} height={24} fill="#5c738a" viewBox="0 0 256 256">
            <Path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z" />
          </Svg>
          <Text style={styles.footerTextInactive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.footerItem, styles.footerActive]}>
          <Svg width={24} height={24} fill="#101418" viewBox="0 0 256 256">
            <Path d="M143.38,17.85a8,8,0,0,0-12.63,3.41l-22,60.41L84.59,58.26a8,8,0,0,0-11.93.89C51,87.53,40,116.08,40,144a88,88,0,0,0,176,0C216,84.55,165.21,36,143.38,17.85Zm40.51,135.49a57.6,57.6,0,0,1-46.56,46.55A7.65,7.65,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68Z" />
          </Svg>
          <Text style={styles.footerTextActive}>Top Issues</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingHorizontal: 12,
    paddingTop: 90, // more space at the top
    paddingBottom: 12,
    justifyContent: 'center',
    position: 'relative',
    minHeight: 64,
  },
  headerIconBox: {
    position: 'absolute',
    left: 16,
    top: 45,
    zIndex: 101,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // ...existing code...
  topIssuesTitle: {
    color: '#0d161b',
    fontSize: 25,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 40,
    bottom: 0,
    textAlignVertical: 'center',
    zIndex: 100,
  },
  issueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingHorizontal: 16,
    minHeight: 72,
    paddingVertical: 8,
    justifyContent: 'space-between',
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eaedf1',
  },
  issueLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  issueIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  issueTextCol: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    top: 4.5, // slight adjustment to align text vertically
  },
  issueLabel: {
    color: '#101418',
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    marginBottom: 2,
  },
  issueDescription: {
    color: '#5c738a',
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    marginTop: 1,
    marginBottom: 8,
    fontWeight: '400',
  },
  issueAddress: {
    color: '#5c738a',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  likesText: {
    color: '#101418',
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eaedf1',
    backgroundColor: '#f8fafc',
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 8,
    justifyContent: 'space-between',
    gap: 8,
  },
  footerItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 2,
    paddingVertical: 2,
  },
  footerTextInactive: {
    fontSize: 12,
    fontWeight: '500',
    color: '#5c738a',
    marginTop: 2,
    fontFamily: 'Poppins-Regular',
    letterSpacing: 0.2,
  },
  footerTextActive: {
    fontSize: 12,
    fontWeight: '500',
    color: '#101418',
    marginTop: 2,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.2,
  },
});
