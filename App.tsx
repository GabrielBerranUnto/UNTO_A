/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  useWindowDimensions,
  ActivityIndicator
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// --- TYPES ---
type AuthProps = {
  setLoggedIn: (val: boolean) => void;
};

// --- SCREENS ---

/**
 * LOGIN SCREEN
 * Uses a card-based layout that centers nicely on Tablets
 */
const LoginScreen = ({ setLoggedIn }: AuthProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { width } = useWindowDimensions();
  
  // Tablet optimization: Don't let the login card exceed 500px width
  const isTablet = width > 768;
  const cardWidth = isTablet ? 450 : '90%';

  const handleLogin = () => {
    if (email && password) {
      setLoggedIn(true);
    } else {
      alert("Please enter both email and password");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}
      >
        <View style={[styles.card, { width: cardWidth }]}>
          <Text style={styles.brandTitle}>UNTO_A</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>
          
          <TextInput 
            style={styles.input} 
            placeholder="Email Address" 
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput 
            style={styles.input} 
            placeholder="Password" 
            placeholderTextColor="#999"
            secureTextEntry 
            value={password}
            onChangeText={setPassword}
          />
          
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

/**
 * DASHBOARD SCREEN
 * Grid-style layout that looks great on wider tablet screens
 */
const DashboardScreen = ({ setLoggedIn }: AuthProps) => {
  const { width } = useWindowDimensions();
  const isTablet = width > 768;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.dashboardTitle}>Dashboard</Text>
        <TouchableOpacity onPress={() => setLoggedIn(false)}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.grid, { flexDirection: isTablet ? 'row' : 'column' }]}>
          <View style={[styles.statCard, isTablet && { flex: 1, marginHorizontal: 10 }]}>
            <Text style={styles.statLabel}>Active Sessions</Text>
            <Text style={styles.statValue}>12</Text>
          </View>
          <View style={[styles.statCard, isTablet && { flex: 1, marginHorizontal: 10 }]}>
            <Text style={styles.statLabel}>System Status</Text>
            <Text style={[styles.statValue, { color: '#4CAF50' }]}>Online</Text>
          </View>
        </View>

        <View style={styles.contentArea}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.placeholderRow} />
          <View style={styles.placeholderRow} />
          <View style={styles.placeholderRow} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- MAIN APP COMPONENT ---

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate checking for a saved session on startup
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="Dashboard">
            {(props) => <DashboardScreen {...props} setLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} setLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// --- STYLING ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  // Login Styles
  card: {
    backgroundColor: '#FFFFFF',
    padding: 40,
    borderRadius: 20,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10 },
      android: { elevation: 8 },
    }),
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#F1F3F5',
    padding: 18,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  // Dashboard Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  dashboardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  logoutText: {
    color: '#FF3B30',
    fontWeight: '600',
  },
  scrollContent: {
    padding: 20,
  },
  grid: {
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#FFF',
    padding: 25,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  contentArea: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 15,
    minHeight: 300,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  placeholderRow: {
    height: 60,
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    marginBottom: 10,
  }
});

function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
