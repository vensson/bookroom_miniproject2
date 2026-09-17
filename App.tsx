import React, { useEffect } from 'react';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RootNavigator } from './src/navigation/RootNavigator';
import { notificationService } from './src/services/notificationService';
import { useBookingStore } from './src/store/useBookingStore';

const queryClient = new QueryClient();

function App() {
  const initRealtimeSync = useBookingStore((state) => state.initRealtimeSync);

  useEffect(() => {
    notificationService.requestPermissions();
    const unsubscribe = initRealtimeSync();
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [initRealtimeSync]);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <RootNavigator />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

// Bắt buộc có dòng này để Expo đăng ký tên component "main" với hệ điều hành (giải quyết triệt để lỗi '"main" has not been registered')
registerRootComponent(App);

export default App;