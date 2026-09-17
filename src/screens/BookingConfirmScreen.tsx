import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useBookingStore } from '../store/useBookingStore';
import { notificationService } from '../services/notificationService';

type Props = NativeStackScreenProps<RootStackParamList, 'BookingConfirm'>;

export const BookingConfirmScreen: React.FC<Props> = ({ route, navigation }) => {
  const { roomId, slotId } = route.params;
  const room = useBookingStore((state) => state.rooms.find((r) => r.id === roomId));
  const slot = room?.availableSlots.find((s) => s.id === slotId);
  const bookSlot = useBookingStore((state) => state.bookSlot);
  const user = useBookingStore((state) => state.userSession);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async () => {
    if (!room || !slot) return;
    setIsSubmitting(true);

    const result = await bookSlot(room.id, slot.id);

    if (!result.success) {
      setIsSubmitting(false);
      Alert.alert('Xung đột đặt phòng ⚠️', result.message, [
        { text: 'Chọn giờ khác', onPress: () => navigation.goBack() },
      ]);
      return;
    }

    await notificationService.scheduleBookingReminder(
      room.name,
      `${slot.startTime} - ${slot.endTime}`
    );

    setIsSubmitting(false);
    Alert.alert('Thành công 🎉', 'Bạn đã đặt phòng thành công!', [
      { text: 'Về trang chủ', onPress: () => navigation.navigate('Home') },
    ]);
  };

  if (!room || !slot) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Xác Nhận Đặt Phòng</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Sinh viên đặt:</Text>
            <Text style={styles.value}>{user.userName} ({user.userId})</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phòng:</Text>
            <Text style={styles.value}>{room.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Vị trí:</Text>
            <Text style={styles.value}>{room.building} - {room.floor}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Khung giờ:</Text>
            <Text style={[styles.value, styles.timeHighlight]}>
              {slot.startTime} - {slot.endTime}
            </Text>
          </View>
        </View>

        <View style={styles.noticeBox}>
          <Text style={styles.noticeText}>
            ⚡ Hệ thống đồng bộ Real-time: Khung giờ sẽ lập tức bị khóa trên tất cả các thiết bị khác ngay khi bạn bấm xác nhận.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.confirmBtn, isSubmitting && styles.disabledBtn]}
          disabled={isSubmitting}
          onPress={handleConfirm}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.confirmBtnText}>Xác Nhận Đặt Chỗ</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 20 },
  header: { fontSize: 22, fontWeight: '800', color: '#0F172A', marginBottom: 20 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    gap: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: 14, color: '#64748B' },
  value: { fontSize: 15, fontWeight: '700', color: '#1E293B' },
  timeHighlight: { color: '#2563EB', fontSize: 16 },
  noticeBox: {
    backgroundColor: '#EFF6FF',
    padding: 14,
    borderRadius: 12,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  noticeText: { fontSize: 13, color: '#1E40AF', lineHeight: 18 },
  confirmBtn: {
    backgroundColor: '#10B981',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  disabledBtn: { opacity: 0.7 },
  confirmBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});