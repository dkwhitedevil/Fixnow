import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function ReportIssueScreen({ navigation }) {
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
          <View style={styles.issueGrid}>
            <IssueCard icon={<Svg width={24} height={24} fill="#1D2B3A" viewBox="0 0 256 256"><Path d="M239.71,125l-16.42-88a16,16,0,0,0-19.61-12.58l-.31.09L150.85,40h-45.7L52.63,24.56l-.31-.09A16,16,0,0,0,32.71,37.05L16.29,125a15.77,15.77,0,0,0,9.12,17.52A16.26,16.26,0,0,0,32.12,144,15.48,15.48,0,0,0,40,141.84V184a40,40,0,0,0,40,40h96a40,40,0,0,0,40-40V141.85a15.5,15.5,0,0,0,7.87,2.16,16.31,16.31,0,0,0,6.72-1.47A15.77,15.77,0,0,0,239.71,125ZM32,128h0L48.43,40,90.5,52.37Zm144,80H136V195.31l13.66-13.65a8,8,0,0,0-11.32-11.32L128,180.69l-10.34-10.35a8,8,0,0,0-11.32,11.32L120,195.31V208H80a24,24,0,0,1-24-24V123.11L107.92,56h40.15L200,123.11V184A24,24,0,0,1,176,208Zm48-80L165.5,52.37,207.57,40,224,128ZM104,140a12,12,0,1,1-12-12A12,12,0,0,1,104,140Zm72,0a12,12,0,1,1-12-12A12,12,0,0,1,176,140Z" /></Svg>} label="Stray Animals" />
            <IssueCard icon={<Svg width={24} height={24} fill="#1D2B3A" viewBox="0 0 256 256"><Path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z" /></Svg>} label="Garbage Overflow" />
            <IssueCard icon={<Svg width={24} height={24} fill="#1D2B3A" viewBox="0 0 256 256"><Path d="M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Zm-16,0a72,72,0,0,0-73.74-72c-39,.92-70.47,33.39-70.26,72.39a71.65,71.65,0,0,0,27.64,56.3A32,32,0,0,1,96,186v6h64v-6a32.15,32.15,0,0,1,12.47-25.35A71.65,71.65,0,0,0,200,104Zm-16.11-9.34a57.6,57.6,0,0,0-46.56-46.55,8,8,0,0,0-2.66,15.78c16.57,2.79,30.63,16.85,33.44,33.45A8,8,0,0,0,176,104a9,9,0,0,0,1.35-.11A8,8,0,0,0,183.89,94.66Z" /></Svg>} label="Broken Streetlight" />
            <IssueCard icon={<Svg width={24} height={24} fill="#1D2B3A" viewBox="0 0 256 256"><Path d="M235.92,199A8,8,0,0,1,225,195.92L155.32,72H136v8a8,8,0,0,1-16,0V72H100.68L31,195.92A8,8,0,0,1,17,188.08L82.32,72H24a8,8,0,0,1,0-16H232a8,8,0,0,1,0,16H173.68L239,188.08A8,8,0,0,1,235.92,199ZM128,112a8,8,0,0,0-8,8v16a8,8,0,0,0,16,0V120A8,8,0,0,0,128,112Zm0,56a8,8,0,0,0-8,8v16a8,8,0,0,0,16,0V176A8,8,0,0,0,128,168Z" /></Svg>} label="Open Drain" />
            <IssueCard icon={<Svg width={24} height={24} fill="#1D2B3A" viewBox="0 0 256 256"><Path d="M220.27,158.54a8,8,0,0,0-7.7-.46,20,20,0,1,1,0-36.16A8,8,0,0,0,224,114.69V72a16,16,0,0,0-16-16H171.78a35.36,35.36,0,0,0,.22-4,36.11,36.11,0,0,0-11.36-26.24,36,36,0,0,0-60.55,23.62,36.56,36.56,0,0,0,.14,6.62H64A16,16,0,0,0,48,72v32.22a35.36,35.36,0,0,0-4-.22,36.12,36.12,0,0,0-26.24,11.36,35.7,35.7,0,0,0-9.69,27,36.08,36.08,0,0,0,33.31,33.6,35.68,35.68,0,0,0,6.62-.14V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V165.31A8,8,0,0,0,220.27,158.54ZM208,208H64V165.31a8,8,0,0,0-11.43-7.23,20,20,0,1,1,0-36.16A8,8,0,0,0,64,114.69V72h46.69a8,8,0,0,0,7.23-11.43,20,20,0,1,1,36.16,0A8,8,0,0,0,161.31,72H208v32.23a35.68,35.68,0,0,0-6.62-.14A36,36,0,0,0,204,176a35.36,35.36,0,0,0,4-.22Z" /></Svg>} label="Others" />
          </View>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              placeholder="Describe the issue (optional)"
              placeholderTextColor="#4c679a"
              multiline
              numberOfLines={4}
            />
          </View>
          <View style={styles.sectionRow}>
            <View style={styles.sectionCol}>
              <Text style={styles.sectionTitle}>Add Photo</Text>
              <Text style={styles.sectionSubtitle}>Optional</Text>
            </View>
            <View style={styles.sectionImage}>
              <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCK7SwoforfDNP8e72XLQVopnbhB0wc5tCbGOFhbUl14pQ2YwdMiDGOKfze8Ytm8xvOikJadLPVjmAVV_Tb443UmxW2sFpevV8mZzUaodq3eE64Wh2bAO_gWSSUvr0sWkckSpns0Omy_cMbMlH5DvDnFYnHgKqWEjOu5Lhgli80j8ZM8guVLBDionwVqcar7eKLghsDJI84RE186d1rp2pCU5xZ0SmESXcrY0XRLF7dusLBuUaEtgsPaZB-VOhGOWWD6evt_-UrDdNf' }} style={styles.bgImage} />
            </View>
          </View>
          <View style={styles.sectionRow}>
            <View style={styles.sectionCol}>
              <Text style={styles.sectionTitle}>Location auto-fetched</Text>
              <Text style={styles.sectionSubtitle}>123 Elm Street, Anytown</Text>
            </View>
            <View style={styles.sectionImage}>
              <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmraFPC5GzE0lppMZEvCFE20niqxlo36eTax5IsIOHStkWlwu63rx-7pIsV2xq1cuE_PUEyQ7UlpeE3HjRff603ZSOJz5KevMR2aCD1PJookU7WSuMsYuv5KTk0g10t6ljO2u9QMwtXstcbUQJL2CpHsZx0wJ-C6GJo9-dTME2U7lho19_rLGJkQwVhJAh04emMgErZIhANKBKH3UfGa8dmQGmlotECuBypth7rxt1c9_gda8mTsiZfq51XNkbZK5vu-QvIePN9k5M' }} style={styles.bgImage} />
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
          <View style={{ height: 20, backgroundColor: '#f8f9fc' }} />
        </View>
      </ScrollView>
    </View>
  );
}

function IssueCard({ icon, label }) {
  return (
    <View style={styles.issueCard}>
      {icon}
      <Text style={styles.issueCardLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f8f9fc',
    justifyContent: 'space-between',
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
  },
  title: {
    color: '#0d121b',
    fontWeight: 'bold',
    fontSize: 22,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
    textAlign: 'left',
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
  },
  textAreaContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  textArea: {
    backgroundColor: '#e7ebf3',
    borderRadius: 12,
    minHeight: 80,
    padding: 12,
    fontSize: 16,
    color: '#0d121b',
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
  },
  sectionSubtitle: {
    color: '#4c679a',
    fontSize: 13,
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
    backgroundColor: '#135feb',
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
  },
});
