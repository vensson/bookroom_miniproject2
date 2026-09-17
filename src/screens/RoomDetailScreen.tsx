import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useBookingStore } from '../store/useBookingStore';
import { TimeSlotPicker } from '../components/TimeSlotPicker';

type Props = NativeStackScreenProps<RootStackParamList, 'RoomDetail'>;

export const RoomDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { roomId } = route.params;
  const room = useBookingStore((state) => state.rooms.find((r) => r.id === roomId));
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  if (!room) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Không tìm thấy phòng học.</Text>
      </SafeAreaView>
    );
  }

  const handleProceed = () => {
    if (!selectedSlotId) {
      Alert.alert('Chưa chọn giờ', 'Vui lòng chọn một khung giờ còn trống.');
      return;
    }
    navigation.navigate('BookingConfirm', { roomId: room.id, slotId: selectedSlotId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: room.imageUrl }} style={styles.bannerImage} />

        <View style={styles.body}>
          <Text style={styles.title}>{room.name}</Text>
          <Text style={styles.location}>{room.building} • {room.floor}</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoBadge}>
              <Text style={styles.infoBadgeText}>👥 Sức chứa: {room.capacity} người</Text>
            </View>
            <View style={[styles.infoBadge, { backgroundColor: '#F1F5F9', marginLeft: 8 }]}>
              <Text style={[styles.infoBadgeText, { color: '#334155' }]}>Loại: {room.type}</Text>
            </View>
          </View>

          <Text style={styles.sectionHeader}>Trang thiết bị có sẵn</Text>
          <View style={styles.tagWrap}>
            {room.amenities.map((item, idx) => (
              <View key={idx} style={styles.tag}>
                <Text style={styles.tagText}>✓ {item}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionHeader}>Chọn khung giờ sử dụng</Text>
          <TimeSlotPicker
            slots={room.availableSlots}
            selectedSlotId={selectedSlotId}
            onSelectSlot={setSelectedSlotId}
          />
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.primaryBtn, !selectedSlotId && styles.disabledBtn]}
          disabled={!selectedSlotId}
          onPress={handleProceed}
        >
          <Text style={styles.primaryBtnText}>Tiếp tục xác nhận</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { paddingBottom: 100 },
  bannerImage: { width: '100%', height: 220, backgroundColor: '#E2E8F0' },
  body: { padding: 20 },
  title: { fontSize: 22, fontWeight: '800', color: '#0F172A' },
  location: { fontSize: 14, color: '#64748B', marginTop: 4 },
  infoRow: { flexDirection: 'row', marginVertical: 14 },
  infoBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  infoBadgeText: { color: '#1D4ED8', fontSize: 13, fontWeight: '600' },
  sectionHeader: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginTop: 18, marginBottom: 8 },
  tagWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { backgroundColor: '#F1F5F9', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8 },
  tagText: { fontSize: 13, color: '#334155' },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  primaryBtn: {
    backgroundColor: '#2563EB',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledBtn: { backgroundColor: '#94A3B8' },
  primaryBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});