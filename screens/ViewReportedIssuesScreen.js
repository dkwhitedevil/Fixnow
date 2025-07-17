import { addDoc, collection, doc, getDocs, increment, limit, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { db } from '../firebase';


const { width, height } = Dimensions.get('window');
const ISSUE_OPTIONS = [
  { key: 'stray', label: 'Stray Animals', emoji: '🐕', color: '#FF3B30' },
  { key: 'garbage', label: 'Garbage Overflow', emoji: '♻️', color: '#34C759' },
  { key: 'streetlight', label: 'Broken Streetlight', emoji: '💡', color: '#FFD600' },
  { key: 'drain', label: 'Open Drain', emoji: '🚧', color: '#FF9500' },
  { key: 'others', label: 'Others', emoji: '⚠️', color: '#007AFF' },
];


export default function ViewReportedIssuesScreen({ navigation }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCallout, setActiveCallout] = useState(null); // reportId
  const [comments, setComments] = useState({}); // { [reportId]: [comments] }
  const [commentInputs, setCommentInputs] = useState({}); // { [reportId]: { name, message } }

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'reports'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReports(data);
        // Set up listeners for comments for each report
        data.forEach((report) => {
          const commentsRef = collection(db, 'reports', report.id, 'comments');
          const q = query(commentsRef, orderBy('timestamp', 'desc'), limit(5));
          onSnapshot(q, (snapshot) => {
            setComments(prev => ({ ...prev, [report.id]: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) }));
          });
        });
      } catch (err) {
        console.error('Error fetching reports:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#065bf8" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Back button */}
      <View style={styles.backButton}>
        <Text onPress={() => navigation.goBack()} style={styles.backText}>←</Text>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: reports[0]?.markerPosition?.latitude || 20.5937,
          longitude: reports[0]?.markerPosition?.longitude || 78.9629,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
      >
        {reports.map((report) => {
          if (!report.markerPosition) return null;

          const issueKey = Array.isArray(report.issues) && report.issues.length > 0 ? report.issues[0] : 'others';
          const issueOption = ISSUE_OPTIONS.find(opt => opt.key === issueKey) || ISSUE_OPTIONS[4];

          let markerIcon;
          switch (issueKey) {
            case 'garbage':
              markerIcon = <Image source={require('../assets/recycling.png')} style={styles.iconImage} />;
              break;
            case 'streetlight':
              markerIcon = <Image source={require('../assets/street-light.png')} style={styles.iconImage} />;
              break;
            case 'drain':
              markerIcon = <Image source={require('../assets/drain.png')} style={styles.iconImage} />;
              break;
            case 'others':
              markerIcon = <Image source={require('../assets/warning.png')} style={styles.iconImage} />;
              break;
            default:
              markerIcon = <Text style={styles.emoji}>{issueOption.emoji}</Text>;
              break;
          }

          // Like handler
          const handleLike = async () => {
            const reportRef = doc(db, 'reports', report.id);
            await updateDoc(reportRef, { likes: increment(1) });
          };

          // Comment input state
          const commentInput = commentInputs[report.id] || { name: '', message: '' };
          const handleCommentInput = (field, value) => {
            setCommentInputs(prev => ({ ...prev, [report.id]: { ...commentInput, [field]: value } }));
          };
          const handleCommentSubmit = async () => {
            if (!commentInput.message.trim()) return;
            const commentsRef = collection(db, 'reports', report.id, 'comments');
            await addDoc(commentsRef, {
              name: commentInput.name.trim() || 'Anonymous',
              message: commentInput.message.trim(),
              timestamp: serverTimestamp(),
            });
            setCommentInputs(prev => ({ ...prev, [report.id]: { name: '', message: '' } }));
          };

          return (
            <Marker key={report.id} coordinate={report.markerPosition}>
              {markerIcon}
              <Callout onPress={() => setActiveCallout(report.id)}>
                <View style={styles.callout}>
                  {markerIcon}
                  <Text style={styles.issueTitle}>
                    {issueOption.emoji} {issueOption.label}
                  </Text>
                  <Text style={styles.desc}>
                    {report.description?.trim() || 'No description provided'}
                  </Text>
                  <Text style={styles.address}>
                    {report.address || 'No address'}
                  </Text>
                  {report.timestamp?.toDate && (
                    <Text style={styles.timestamp}>
                      {report.timestamp.toDate().toLocaleString()}
                    </Text>
                  )}
                  {/* Like button and count */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, marginBottom: 4, alignSelf: 'center' }}>
                    <TouchableOpacity onPress={handleLike} style={{ marginRight: 8 }}>
                      <Text style={{ fontSize: 24 }}>{'❤️'}</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 16 }}>{report.likes || 0} Likes</Text>
                  </View>
                  {/* Comments List */}
                  <View style={{ width: '100%', marginTop: 4 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 2, textAlign: 'center' }}>Comments</Text>
                    {comments[report.id]?.length ? (
                      <FlatList
                        data={comments[report.id]}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                          <View style={{ marginBottom: 4, backgroundColor: '#f3f6fa', borderRadius: 6, padding: 4 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 13 }}>{item.name}</Text>
                            <Text style={{ fontSize: 14 }}>{item.message}</Text>
                            {item.timestamp?.toDate && (
                              <Text style={{ fontSize: 10, color: '#888', textAlign: 'right' }}>{item.timestamp.toDate().toLocaleString()}</Text>
                            )}
                          </View>
                        )}
                        style={{ maxHeight: 80 }}
                      />
                    ) : (
                      <Text style={{ fontSize: 13, color: '#888', textAlign: 'center' }}>No comments yet.</Text>
                    )}
                  </View>
                  {/* Comment Form */}
                  <View style={{ marginTop: 6, width: '100%' }}>
                    <TextInput
                      placeholder="Your name (optional)"
                      value={commentInput.name}
                      onChangeText={v => handleCommentInput('name', v)}
                      style={{ borderWidth: 1, borderColor: '#cfd8e7', borderRadius: 8, padding: 6, marginBottom: 4, fontSize: 13 }}
                    />
                    <TextInput
                      placeholder="Add a comment..."
                      value={commentInput.message}
                      onChangeText={v => handleCommentInput('message', v)}
                      style={{ borderWidth: 1, borderColor: '#cfd8e7', borderRadius: 8, padding: 6, fontSize: 14, marginBottom: 4 }}
                      multiline
                    />
                    <TouchableOpacity onPress={handleCommentSubmit} style={{ backgroundColor: '#135feb', borderRadius: 8, paddingVertical: 6, alignItems: 'center' }}>
                      <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>Post</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
}

  

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 36,
    left: 12,
    right: 0,
    zIndex: 100,
    elevation: 10,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  backText: {
    fontSize: 38,
    left: 0,
    right: 0,
    bottom: 7,
    fontWeight: 'bold',
    color: '#222',

    textAlign: 'center',
    lineHeight: 44,
  },
  iconImage: {
    width: 36,
    height: 36,
    marginBottom: 2,
  },
  emoji: {
    fontSize: 32,
    marginBottom: 2,
  },
  callout: {
    maxWidth: 250,
    minWidth: 180,
    padding: 4,
    alignItems: 'center',
  },
  issueTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    textAlign: 'center',
  },
  desc: {
    fontSize: 18,
    marginBottom: 4,
    textAlign: 'center',
    flexWrap: 'wrap',
    fontWeight: '500',
    color: '#222',
  },
  address: {
    fontSize: 12,
    color: '#47669e',
    textAlign: 'center',
  },
  timestamp: {
    fontSize: 10,
    color: '#888',
    marginTop: 2,
    textAlign: 'center',
  },
});
