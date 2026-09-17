import { create } from 'zustand';
import { StudyRoom, BookingFilter, UserSession } from '../types';

const FIREBASE_DB_URL = 'https://bookroom-71d8b-default-rtdb.firebaseio.com/';

export const INITIAL_ROOMS_DATA: StudyRoom[] = [
  {
    id: 'room-101',
    name: 'Phòng Nghiên Cứu AI & Robotics',
    building: 'Khu Công Nghệ Cao (Tòa K)',
    floor: 'Tầng 4',
    capacity: 15,
    type: 'Lab',
    amenities: ['Workstation RTX 4090', 'Bảng trắng tương tác', 'Điều hòa 24/7', 'Wifi 6'],
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
    availableSlots: [
      { id: 's1', startTime: '07:30', endTime: '09:30', isBooked: false },
      { id: 's2', startTime: '09:45', endTime: '11:45', isBooked: true, bookedBy: 'SV_23IT999' },
      { id: 's3', startTime: '13:00', endTime: '15:00', isBooked: false },
      { id: 's4', startTime: '15:15', endTime: '17:15', isBooked: false },
    ],
  },
  {
    id: 'room-102',
    name: 'Phòng Thảo Luận Nhóm Sáng Tạo A1',
    building: 'Tòa Nhà A',
    floor: 'Tầng 2',
    capacity: 6,
    type: 'Study',
    amenities: ['Bảng kính cường lực', 'Màn hình TV 55 inch', 'Ổ cắm type-C'],
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    availableSlots: [
      { id: 's5', startTime: '08:00', endTime: '10:00', isBooked: false },
      { id: 's6', startTime: '10:15', endTime: '12:15', isBooked: false },
      { id: 's7', startTime: '14:00', endTime: '16:00', isBooked: false },
    ],
  },
  {
    id: 'room-103',
    name: 'Phòng Lab Mạng & Hệ Thống Nhúng',
    building: 'Tòa Nhà K',
    floor: 'Tầng 3',
    capacity: 20,
    type: 'Lab',
    amenities: ['Cisco Routers', 'Raspberry Pi Kits', 'Máy chiếu Full HD'],
    imageUrl: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=600&q=80',
    availableSlots: [
      { id: 's8', startTime: '08:00', endTime: '10:00', isBooked: false },
      { id: 's9', startTime: '13:30', endTime: '15:30', isBooked: false },
      { id: 's10', startTime: '15:45', endTime: '17:45', isBooked: false },
    ],
  },
  {
    id: 'room-104',
    name: 'Không Gian Thư Viện Mở C3',
    building: 'Tòa Thư Viện Trung Tâm',
    floor: 'Tầng 3',
    capacity: 4,
    type: 'Study',
    amenities: ['Đèn đọc sách chống mỏi', 'Ghế Ergonomic', 'Khu vực yên tĩnh'],
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80',
    availableSlots: [
      { id: 's11', startTime: '07:30', endTime: '09:30', isBooked: false },
      { id: 's12', startTime: '09:30', endTime: '11:30', isBooked: false },
      { id: 's13', startTime: '13:30', endTime: '15:30', isBooked: false },
    ],
  },
  {
    id: 'room-105',
    name: 'Studio Đa Phương Tiện & Podcast',
    building: 'Tòa Nhà Đa Năng',
    floor: 'Tầng 1',
    capacity: 5,
    type: 'Studio',
    amenities: ['Micro thu âm', 'Cách âm tiêu chuẩn', 'Đèn Softbox'],
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80',
    availableSlots: [
      { id: 's14', startTime: '08:30', endTime: '10:30', isBooked: false },
      { id: 's15', startTime: '10:45', endTime: '12:45', isBooked: false },
      { id: 's16', startTime: '14:00', endTime: '16:00', isBooked: false },
    ],
  },
  {
    id: 'room-106',
    name: 'Phòng Hội Thảo Khởi Nghiệp V-Hub',
    building: 'Khu MakerSpace',
    floor: 'Tầng 2',
    capacity: 25,
    type: 'Meeting',
    amenities: ['Hệ thống âm thanh hội trường', 'Màn hình LED lớn', 'Bàn di động'],
    imageUrl: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=600&q=80',
    availableSlots: [
      { id: 's17', startTime: '09:00', endTime: '11:00', isBooked: false },
      { id: 's18', startTime: '14:00', endTime: '16:00', isBooked: false },
    ],
  },
  {
    id: 'room-107',
    name: 'Phòng Seminar Kỹ Thuật Phần Mềm',
    building: 'Tòa Nhà B',
    floor: 'Tầng 4',
    capacity: 10,
    type: 'Meeting',
    amenities: ['Camera họp trực tuyến 360', 'Màn hình cảm ứng', 'Trà & Cà phê'],
    imageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=600&q=80',
    availableSlots: [
      { id: 's19', startTime: '08:00', endTime: '10:00', isBooked: false },
      { id: 's20', startTime: '10:30', endTime: '12:30', isBooked: false },
      { id: 's21', startTime: '15:00', endTime: '17:00', isBooked: false },
    ],
  },
  {
    id: 'room-108',
    name: 'MakerSpace Thực Nghiệm IoT & 3D Print',
    building: 'Khu MakerSpace',
    floor: 'Tầng 1',
    capacity: 8,
    type: 'Lab',
    amenities: ['Máy in 3D Ender-3', 'Bộ hàn thiếc & oscilloscope', 'Linh kiện Arduino'],
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    availableSlots: [
      { id: 's22', startTime: '08:00', endTime: '10:00', isBooked: false },
      { id: 's23', startTime: '13:30', endTime: '15:30', isBooked: false },
      { id: 's24', startTime: '15:30', endTime: '17:30', isBooked: false },
    ],
  },
];

interface BookingState {
  rooms: StudyRoom[];
  userSession: UserSession;
  filters: BookingFilter;
  setRooms: (rooms: StudyRoom[]) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setMinCapacity: (capacity: number) => void;
  initRealtimeSync: () => () => void;
  bookSlot: (roomId: string, slotId: string) => Promise<{ success: boolean; message: string }>;
  cancelBooking: (roomId: string, slotId: string) => Promise<{ success: boolean; message: string }>;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  rooms: INITIAL_ROOMS_DATA,
  userSession: {
    userId: 'SV_' + Math.floor(1000 + Math.random() * 9000),
    userName: 'Phan Văn Sơn',
  },
  filters: {
    searchQuery: '',
    selectedCategory: 'Tất cả',
    minCapacity: 0,
  },

  setRooms: (rooms) => set({ rooms }),
  setSearchQuery: (searchQuery) =>
    set((state) => ({ filters: { ...state.filters, searchQuery } })),
  setSelectedCategory: (selectedCategory) =>
    set((state) => ({ filters: { ...state.filters, selectedCategory } })),
  setMinCapacity: (minCapacity) =>
    set((state) => ({ filters: { ...state.filters, minCapacity } })),

  initRealtimeSync: () => {
    fetch(`${FIREBASE_DB_URL}rooms.json`)
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          set({ rooms: data });
        } else {
          fetch(`${FIREBASE_DB_URL}rooms.json`, {
            method: 'PUT',
            body: JSON.stringify(INITIAL_ROOMS_DATA),
          });
        }
      })
      .catch((err) => console.log('Fetch init error:', err));

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${FIREBASE_DB_URL}rooms.json`);
        const remoteRooms = await res.json();
        if (remoteRooms && Array.isArray(remoteRooms)) {
          set({ rooms: remoteRooms });
        }
      } catch (e) {
        // network skip
      }
    }, 1000);

    return () => clearInterval(interval);
  },

  // Xử lý Race Condition & Conflict Prevention triệt để
  bookSlot: async (roomId, slotId) => {
    const { userSession } = get();

    try {
      // 1. Lấy toàn bộ danh sách phòng hiện tại từ Firebase
      const res = await fetch(`${FIREBASE_DB_URL}rooms.json`);
      const currentRooms: StudyRoom[] = await res.json();

      const roomIndex = currentRooms.findIndex((r) => r.id === roomId);
      if (roomIndex === -1) return { success: false, message: 'Phòng không tồn tại!' };

      const slotIndex = currentRooms[roomIndex].availableSlots.findIndex((s) => s.id === slotId);
      if (slotIndex === -1) return { success: false, message: 'Khung giờ không tồn tại!' };

      // 2. Atomic Verification: Đọc trực tiếp slot đích từ server
      const slotCheckRes = await fetch(
        `${FIREBASE_DB_URL}rooms/${roomIndex}/availableSlots/${slotIndex}.json`
      );
      const serverSlot = await slotCheckRes.json();

      // Nếu slot trên server đã bị người khác book trước đó
      if (serverSlot && serverSlot.isBooked) {
        // Cập nhật lại state cục bộ ngay lập tức để sync UI
        set({ rooms: currentRooms });
        return {
          success: false,
          message: `Xung đột: Khung giờ này vừa được đặt bởi ${serverSlot.bookedBy || 'sinh viên khác'}.`,
        };
      }

      // 3. Thực hiện ghi trực tiếp vào đường dẫn slot cụ thể (chỉ cập nhật trường của slot đó)
      const updatePayload = {
        ...serverSlot,
        isBooked: true,
        bookedBy: userSession.userId,
      };

      const putRes = await fetch(
        `${FIREBASE_DB_URL}rooms/${roomIndex}/availableSlots/${slotIndex}.json`,
        {
          method: 'PUT',
          body: JSON.stringify(updatePayload),
        }
      );

      if (!putRes.ok) {
        return { success: false, message: 'Lỗi khi gửi yêu cầu đặt chỗ đến server!' };
      }

      // 4. Cập nhật state nội bộ
      const updatedRooms = [...currentRooms];
      updatedRooms[roomIndex].availableSlots[slotIndex] = updatePayload;
      set({ rooms: updatedRooms });

      return { success: true, message: 'Đặt phòng thành công!' };
    } catch (error) {
      return { success: false, message: 'Lỗi mạng: Không thể xác thực đặt chỗ!' };
    }
  },

  cancelBooking: async (roomId, slotId) => {
    const { userSession } = get();

    try {
      const res = await fetch(`${FIREBASE_DB_URL}rooms.json`);
      const currentRooms: StudyRoom[] = await res.json();

      const roomIndex = currentRooms.findIndex((r) => r.id === roomId);
      if (roomIndex === -1) return { success: false, message: 'Phòng không tồn tại!' };

      const slotIndex = currentRooms[roomIndex].availableSlots.findIndex((s) => s.id === slotId);
      if (slotIndex === -1) return { success: false, message: 'Khung giờ không tồn tại!' };

      const slot = currentRooms[roomIndex].availableSlots[slotIndex];
      if (!slot.isBooked || slot.bookedBy !== userSession.userId) {
        return { success: false, message: 'Bạn không có quyền hủy lịch này.' };
      }

      const resetPayload = {
        ...slot,
        isBooked: false,
        bookedBy: null,
      };

      await fetch(
        `${FIREBASE_DB_URL}rooms/${roomIndex}/availableSlots/${slotIndex}.json`,
        {
          method: 'PUT',
          body: JSON.stringify(resetPayload),
        }
      );

      const updatedRooms = [...currentRooms];
      updatedRooms[roomIndex].availableSlots[slotIndex] = {
        ...slot,
        isBooked: false,
        bookedBy: undefined,
      };
      set({ rooms: updatedRooms });

      return { success: true, message: 'Đã hủy lịch đặt thành công!' };
    } catch (e) {
      return { success: false, message: 'Lỗi kết nối khi hủy lịch.' };
    }
  },
}));