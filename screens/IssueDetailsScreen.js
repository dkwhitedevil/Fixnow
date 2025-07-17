import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { db } from '../firebase';

export default function IssueDetailsScreen({ route, navigation }) {
  const { report } = route.params;

  let icon = require('../assets/warning.png');
  if (report.issues?.includes('garbage')) icon = require('../assets/recycling.png');
  if (report.issues?.includes('streetlight')) icon = require('../assets/street-light.png');
  if (report.issues?.includes('drain')) icon = require('../assets/drain.png');

  // Comments and likes state
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [posting, setPosting] = useState(false);
  const [likes, setLikes] = useState(report.likes || 0);

  // Fetch comments and likes from Firestore for this report
  useEffect(() => {
    const commentsRef = collection(db, 'reports', report.id, 'comments');
    const q = query(commentsRef, orderBy('timestamp', 'desc'));
    const unsubscribeComments = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Listen for likes changes
    const reportDocRef = collection(db, 'reports');
    const unsubscribeLikes = onSnapshot(query(reportDocRef), (snapshot) => {
      const doc = snapshot.docs.find(d => d.id === report.id);
      if (doc) {
        setLikes(doc.data().likes || 0);
      }
    });

    return () => {
      unsubscribeComments();
      unsubscribeLikes();
    };
  }, [report.id]);
  // Handle like button press
  const handleLike = async () => {
    try {
      const reportDocRef = collection(db, 'reports');
      const docRef = reportDocRef.doc ? reportDocRef.doc(report.id) : null;
      // Fallback for modular Firestore
      const { doc, updateDoc, increment } = await import('firebase/firestore');
      const reportRef = doc(db, 'reports', report.id);
      await updateDoc(reportRef, {
        likes: increment(1),
      });
    } catch (e) {
      // Optionally handle error
    }
  };

  // Add comment to Firestore
  const handleAddComment = async () => {
    if (!commentInput.trim()) return;
    setPosting(true);
    try {
      const commentsRef = collection(db, 'reports', report.id, 'comments');
      await addDoc(commentsRef, {
        name: 'Anonymous',
        message: commentInput.trim(),
        timestamp: serverTimestamp(),
      });
      setCommentInput('');
    } catch (e) {
      // Optionally handle error
    }
    setPosting(false);
  };

  const openInMaps = () => {
    const lat = report.markerPosition?.latitude || 0;
    const lng = report.markerPosition?.longitude || 0;
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      {/* Top space */}
      <View style={{ height: 32 }} />
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconBox}>
          <Ionicons name="arrow-back" size={28} color="#0d161c" />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
      </View>
      {/* Main Content with FlatList */}
      <FlatList
        data={comments}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.commentRow}>
            {/* No avatar, just initials */}
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#e7eff3', justifyContent: 'center', alignItems: 'center', marginRight: 8 }}>
              <Text style={[styles.commentName, styles.poppins]}>{item.name?.[0] || '?'}</Text>
            </View>
            <View style={styles.commentContent}>
              <View style={styles.commentHeader}>
                <Text style={[styles.commentName, styles.poppins, { fontWeight: undefined }]}>{item.name}</Text>
                <Text style={[styles.commentTime, styles.poppins]}>{item.timestamp?.toDate ? timeAgo(item.timestamp.toDate()) : ''}</Text>
              </View>
              <Text style={[styles.commentText, styles.poppins]}>{item.message}</Text>
            </View>
          </View>
        )}
        style={{ flex: 1, paddingHorizontal: 8 }}
        ListEmptyComponent={<Text style={{ textAlign: 'center', color: '#888', marginTop: 12, fontFamily: 'Poppins-Regular' }}>No comments yet. Be the first to comment!</Text>}
        ListHeaderComponent={
          <>
            <View style={styles.card}>
              <Image source={icon} style={styles.smallCardImage} resizeMode="contain" />
              <View style={styles.cardContent}>
                <Text style={[styles.cardTitle, styles.poppins, { fontWeight: undefined }]}>{report.issues?.[0]?.toUpperCase() || 'ISSUE'}</Text>
                <Text style={[styles.cardDesc, styles.poppins]}>{report.description || 'No description provided'}</Text>
                <View style={styles.cardRow}>
                  <Ionicons name="location" size={20} color="#47669e" style={styles.cardRowIcon} />
                  <Text style={[styles.cardRowText, styles.poppins]}>{report.address || 'Unknown location'}</Text>
                </View>
                <View style={styles.cardRow}>
                  <Ionicons name="time-outline" size={18} color="#4b7c9b" style={styles.cardRowIcon} />
                  <Text style={[styles.cardRowText, styles.poppins]}>{report.timestamp?.toDate ? report.timestamp.toDate().toLocaleString() : ''}</Text>
                </View>
                <View style={[styles.cardRow, { justifyContent: 'flex-start', marginTop: 8 }]}> 
                  <TouchableOpacity style={styles.likesButton} onPress={handleLike}>
                    <Text style={[styles.likesText, styles.poppins, { fontWeight: undefined }]}> 👍 {likes} votes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Text style={[styles.commentsTitle, styles.poppins, { fontWeight: undefined }]}>Comments</Text>
          </>
        }
        ListFooterComponent={
          <View style={styles.addCommentRow}>
            <View style={styles.commentAvatar}>
              <Text style={[styles.commentName, styles.poppins, { width: 40, height: 40, lineHeight: 40, textAlign: 'center' }]}>A</Text>
            </View>
            <TextInput
              style={[styles.addCommentInput, styles.poppins]}
              placeholder="Add a comment..."
              placeholderTextColor="#4b7c9b"
              value={commentInput}
              onChangeText={setCommentInput}
              editable={!posting}
            />
            <TouchableOpacity style={styles.addCommentButton} onPress={handleAddComment} disabled={posting}>
              <Text style={[styles.addCommentButtonText, styles.poppins, { fontWeight: undefined }]}>{posting ? 'Posting...' : 'Post'}</Text>
            </TouchableOpacity>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 32 }}
      />
    </View>
  );
}

// Helper to show time ago
function timeAgo(date) {
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
}

const styles = StyleSheet.create({
  poppins: {
    fontFamily: 'Poppins-Regular',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingTop: 16,
    paddingBottom: 8,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
   smallCardImage: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  headerIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    margin: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#e7eff3',
  },
  smallCardImage: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    // fontWeight: 'bold',
    color: '#0d161c',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 16,
    color: '#222',
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardRowIcon: {
    marginRight: 6,
  },
  cardRowText: {
    fontSize: 15,
    color: '#47669e',
    flex: 1,
    flexWrap: 'wrap',
  },
  likesButton: {
    backgroundColor: '#e7eff3',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginRight: 8,
  },
  likesText: {
    color: '#0d161c',
    // fontWeight: 'bold',
    fontSize: 15,
  },
  mapButton: {
    backgroundColor: '#e7eff3',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  mapButtonText: {
    color: '#0d161c',
    fontWeight: 'bold',
    fontSize: 15,
  },
  commentsTitle: {
    fontSize: 22,
    // fontWeight: 'bold',
    color: '#0d161c',
    marginTop: 18,
    marginBottom: 6,
    paddingHorizontal: 16,
  },
  commentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 12,
    paddingBottom: 0,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e7eff3',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentContent: {
    flex: 1,
    flexDirection: 'column',
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  commentName: {
    // fontWeight: 'bold',
    color: '#0d161c',
    fontSize: 14,
    marginRight: 8,
  },
  commentTime: {
    color: '#4b7c9b',
    fontSize: 13,
  },
  commentText: {
    color: '#0d161c',
    fontSize: 14,
  },
  addCommentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#f8fafc',
  },
  addCommentInput: {
    flex: 1,
    backgroundColor: '#e7eff3',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#0d161c',
    marginRight: 8,
    height: 40,
  },
  addCommentButton: {
    backgroundColor: '#1c9ff1',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 7,
  },
  addCommentButtonText: {
    color: '#fff',
    // fontWeight: 'bold',
    fontSize: 15,
  },
});
