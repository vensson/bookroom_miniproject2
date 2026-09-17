import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './types';
import { HomeScreen } from '../screens/HomeScreen';
import { RoomDetailScreen } from '../screens/RoomDetailScreen';
import { BookingConfirmScreen } from '../screens/BookingConfirmScreen';
import { useBookingStore } from '../store/useBookingStore';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const MyBookingsScreen = () => {
  const rooms = useBookingStore((state) => state.rooms);
  const user = useBookingStore((state) => state.userSession);
  const cancelBooking = useBookingStore((state) => state.cancelBooking);

  const myBookings = rooms.flatMap((room) =>
    room.availableSlots
      .filter((slot) => slot.bookedBy === user.userId)
      .map((slot) => ({ room, slot }))
  );

  const handleCancelPress = (roomId: string, slotId: string, roomName: string, time: string) => {
    Alert.alert(
      'Xác nhận hủy phòng',
      `Bạn có chắc chắn muốn hủy lịch đặt tại [${roomName}] lúc ${time}?`,
      [
        { text: 'Đóng', style: 'cancel' },
        {
          text: 'Hủy phòng',
          style: 'destructive',
          onPress: async () => {
            const res = await cancelBooking(roomId, slotId);
            Alert.alert(res.success ? 'Thành công' : 'Lỗi', res.message);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={tabStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={tabStyles.headerArea}>
        <Text style={tabStyles.header}>Lịch Đã Đặt Của Tôi 📅</Text>
        <Text style={tabStyles.subHeader}>
          {myBookings.length > 0
            ? `Bạn đang có ${myBookings.length} lịch đặt phòng đang hoạt động.`
            : 'Chưa có lịch đặt phòng nào.'}
        </Text>
      </View>

      <ScrollView contentContainerStyle={tabStyles.listContent}>
        {myBookings.length === 0 ? (
          <View style={tabStyles.emptyBox}>
            <Text style={tabStyles.emptyIcon}>🗓️</Text>
            <Text style={tabStyles.emptyTitle}>Chưa có lịch phòng nào</Text>
            <Text style={tabStyles.emptyDesc}>
              Các phòng bạn đặt thành công từ trang chủ sẽ xuất hiện tại đây để bạn tiện theo dõi hoặc hủy khi không dùng đến.
            </Text>
          </View>
        ) : (
          myBookings.map(({ room, slot }) => (
            <View key={slot.id} style={tabStyles.card}>
              <View style={tabStyles.cardHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={tabStyles.roomName}>{room.name}</Text>
                  <Text style={tabStyles.roomLoc}>📍 {room.building} • {room.floor}</Text>
                </View>
                <View style={tabStyles.statusBadge}>
                  <Text style={tabStyles.statusText}>Đã xác nhận</Text>
                </View>
              </View>

              <View style={tabStyles.divider} />

              <View style={tabStyles.cardFooter}>
                <View>
                  <Text style={tabStyles.timeLabel}>Khung giờ sử dụng:</Text>
                  <Text style={tabStyles.timeValue}>⏰ {slot.startTime} - {slot.endTime}</Text>
                </View>

                <TouchableOpacity
                  style={tabStyles.cancelBtn}
                  activeOpacity={0.7}
                  onPress={() =>
                    handleCancelPress(
                      room.id,
                      slot.id,
                      room.name,
                      `${slot.startTime} - ${slot.endTime}`
                    )
                  }
                >
                  <Text style={tabStyles.cancelBtnText}>Hủy phòng</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const tabStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  headerArea: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 12 : 16,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  header: { fontSize: 22, fontWeight: '800', color: '#0F172A' },
  subHeader: { fontSize: 13, color: '#64748B', marginTop: 4 },
  listContent: { padding: 16 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  roomName: { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  roomLoc: { fontSize: 12, color: '#64748B', marginTop: 4 },
  statusBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: { fontSize: 11, fontWeight: '700', color: '#059669' },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 12 },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeLabel: { fontSize: 11, color: '#94A3B8' },
  timeValue: { fontSize: 14, fontWeight: '700', color: '#2563EB', marginTop: 2 },
  cancelBtn: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  cancelBtnText: { color: '#DC2626', fontSize: 13, fontWeight: '700' },
  emptyBox: { alignItems: 'center', marginTop: 80, paddingHorizontal: 32 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 6 },
  emptyDesc: { fontSize: 13, color: '#94A3B8', textAlign: 'center', lineHeight: 20 },
});

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#64748B',
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 82 : 62,
          paddingBottom: Platform.OS === 'ios' ? 24 : 8,
          paddingTop: 8,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F1F5F9',
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
      }}
    >
      <Tab.Screen
        name="Explore"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Phòng học',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🏫</Text>,
        }}
      />
      <Tab.Screen
        name="MyBookings"
        component={MyBookingsScreen}
        options={{
          tabBarLabel: 'Lịch của tôi',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>📋</Text>,
        }}
      />
    </Tab.Navigator>
  );
};

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTintColor: '#0F172A',
          headerTitleStyle: { fontWeight: '700' },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RoomDetail"
          component={RoomDetailScreen}
          options={{ title: 'Chi Tiết Phòng Học' }}
        />
        <Stack.Screen
          name="BookingConfirm"
          component={BookingConfirmScreen}
          options={{ title: 'Xác Nhận Đặt Chỗ' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};