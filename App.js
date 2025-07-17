
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeScreen from './screens/homescreen';
import IssueDetailsScreen from './screens/IssueDetailsScreen';
import ReportIssueScreen from './screens/ReportIssueScreen';
import TopIssuesScreen from './screens/TopIssuesScreen';
import ViewReportedIssuesScreen from './screens/ViewReportedIssuesScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ReportIssue" component={ReportIssueScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ViewReportedIssues" component={ViewReportedIssuesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="IssueDetails" component={IssueDetailsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TopIssuesScreen" component={TopIssuesScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


