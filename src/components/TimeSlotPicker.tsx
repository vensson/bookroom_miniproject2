import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TimeSlot } from '../types';

interface Props {
  slots: TimeSlot[];
  selectedSlotId: string | null;
  onSelectSlot: (slotId: string) => void;
}

export const TimeSlotPicker: React.FC<Props> = ({ slots, selectedSlotId, onSelectSlot }) => {
  return (
    <View style={styles.container}>
      {slots.map((slot) => {
        const isSelected = selectedSlotId === slot.id;
        const isDisabled = slot.isBooked;

        return (
          <TouchableOpacity
            key={slot.id}
            disabled={isDisabled}
            onPress={() => onSelectSlot(slot.id)}
            style={[
              styles.slotBox,
              isSelected && styles.selectedBox,
              isDisabled && styles.disabledBox,
            ]}
          >
            <Text
              style={[
                styles.slotTime,
                isSelected && styles.selectedText,
                isDisabled && styles.disabledText,
              ]}
            >
              {slot.startTime} - {slot.endTime}
            </Text>
            <Text
              style={[
                styles.slotStatus,
                isSelected && styles.selectedSubText,
                isDisabled && styles.disabledText,
              ]}
            >
              {isDisabled ? 'Đã được book' : isSelected ? 'Đang chọn' : 'Còn trống'}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  slotBox: {
    width: '48%',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  selectedBox: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  disabledBox: {
    backgroundColor: '#F3F4F6',
    borderColor: '#E5E7EB',
    opacity: 0.6,
  },
  slotTime: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  slotStatus: {
    fontSize: 11,
    marginTop: 4,
    color: '#059669',
    fontWeight: '600',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  selectedSubText: {
    color: '#DBEAFE',
  },
  disabledText: {
    color: '#9CA3AF',
  },
});