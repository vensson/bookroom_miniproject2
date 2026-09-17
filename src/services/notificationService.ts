import { Alert, Platform } from 'react-native';

export const notificationService = {
  async requestPermissions(): Promise<boolean> {
    console.log('[NotificationService] Permission granted (Simulated for Expo Go)');
    return true;
  },

  async scheduleBookingReminder(roomName: string, timeSlot: string): Promise<string | null> {
    console.log(`[NotificationService] Lên lịch thông báo cho: ${roomName} (${timeSlot})`);

    // Hẹn giờ sau 3 giây để mô phỏng thông báo nhắc nhở phòng học
    setTimeout(() => {
      Alert.alert(
        '🔔 Nhắc nhở nhận phòng học!',
        `Bạn có lịch sử dụng [${roomName}] (${timeSlot}) sắp bắt đầu. Vui lòng có mặt đúng giờ!`,
        [{ text: 'Đã hiểu', style: 'default' }]
      );
    }, 3000);

    return 'mock-notification-id';
  },
};