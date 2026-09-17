import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StudyRoom } from '../types';

interface Props {
  room: StudyRoom;
  onPress: (roomId: string) => void;
}

export const CARD_TOTAL_HEIGHT = 112;

export const RoomCard = React.memo(({ room, onPress }: Props) => {
  const freeSlotsCount = room.availableSlots.filter((s) => !s.isBooked).length;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.card}
      onPress={() => onPress(room.id)}
    >
      <Image source={{ uri: room.imageUrl }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.name} numberOfLines={1}>{room.name}</Text>
          <View style={[styles.badge, freeSlotsCount > 0 ? styles.badgeGreen : styles.badgeRed]}>
            <Text style={[styles.badgeText, freeSlotsCount > 0 ? styles.textGreen : styles.textRed]}>
              {freeSlotsCount > 0 ? `${freeSlotsCount} slot trống` : 'Hết chỗ'}
            </Text>
          </View>
        </View>

        <Text style={styles.subText}>{room.building} • {room.floor}</Text>

        <View style={styles.footerRow}>
          <View style={styles.metaWrap}>
            <Text style={styles.capacityTag}>👥 {room.capacity} chỗ</Text>
            <View style={styles.typeBadge}>
              <Text style={styles.typeText}>{room.type}</Text>
            </View>
          </View>
          <Text style={styles.actionLink}>Đặt ngay →</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    height: 100,
    marginVertical: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
    height: '100%',
    paddingVertical: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
    marginRight: 6,
  },
  subText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: -2,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  capacityTag: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '600',
  },
  typeBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  typeText: {
    fontSize: 10,
    color: '#475569',
    fontWeight: '700',
  },
  actionLink: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '700',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgeGreen: { backgroundColor: '#ECFDF5' },
  badgeRed: { backgroundColor: '#FEF2F2' },
  badgeText: { fontSize: 10, fontWeight: '700' },
  textGreen: { color: '#059669' },
  textRed: { color: '#DC2626' },
});