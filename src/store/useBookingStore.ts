import { create } from 'zustand';
import { StudyRoom, BookingFilter, UserSession } from '../types';

const FIREBASE_DB_URL = 'https://bookroom-71d8b-default-rtdb.firebaseio.com/';

export const INITIAL_ROOMS_DATA: StudyRoom[] = [
  // --- KHU CÔNG NGHỆ CAO (TÒA K) ---
 
  {
    id: 'room-102',
    name: 'Lab Mạngg & An Toàn Thông Tin K22',
    building: 'Khu Công Nghệ Cao (Tòa K)',
    floor: 'Tầng 3',
    capacity: 25,
    type: 'Lab',
    amenities: ['Cisco Routers & Switches', 'Tủ Rack chuyên dụng', 'Máy chiếu Full HD'],
    imageUrl: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=600&q=80',
    availableSlots: [
      { id: 's102_1', startTime: '08:00', endTime: '10:00', isBooked: false },
      { id: 's102_2', startTime: '10:15', endTime: '12:15', isBooked: false },
      { id: 's102_3', startTime: '13:30', endTime: '15:30', isBooked: false },
      { id: 's102_4', startTime: '15:45', endTime: '17:45', isBooked: false },
    ],
  },
  {
    id: 'room-103',
    name: 'Phòng Lab Hệ Thống Nhúng & IoT',
    building: 'Khu Công Nghệ Cao (Tòa K)',
    floor: 'Tầng 2',
    capacity: 18,
    type: 'Lab',
    amenities: ['Kit STM32 & ESP32', 'Máy hiện sóng Oscilloscope', 'Trạm hàn Hakko'],
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    availableSlots: [
      { id: 's103_1', startTime: '07:30', endTime: '09:30', isBooked: false },
      { id: 's103_2', startTime: '09:45', endTime: '11:45', isBooked: false },
      { id: 's103_3', startTime: '14:00', endTime: '16:00', isBooked: false },
    ],
  },
  {
    id: 'room-104',
    name: 'Phòng Lab Cloud Computing & DevOps',
    building: 'Khu Công Nghệ Cao (Tòa K)',
    floor: 'Tầng 5',
    capacity: 20,
    type: 'Lab',
    amenities: ['Màn hình kép Dell UltraSharp', 'Đường truyền 1Gbps', 'Bảng trắng di động'],
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    availableSlots: [
      { id: 's104_1', startTime: '08:00', endTime: '10:00', isBooked: false },
      { id: 's104_2', startTime: '10:30', endTime: '12:30', isBooked: false },
      { id: 's104_3', startTime: '13:30', endTime: '15:30', isBooked: false },
    ],
  },

  // --- TÒA NHÀ A ---
  {
    id: 'room-105',
    name: 'Phòng Thảo Luận Nhóm Sáng Tạo A1',
    building: 'Tòa Nhà A',
    floor: 'Tầng 2',
    capacity: 6,
    type: 'Study',
    amenities: ['Bảng kính cường lực', 'TV Sony 55 inch', 'Ổ cắm sạc type-C bàn'],
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    availableSlots: [
      { id: 's105_1', startTime: '08:00', endTime: '10:00', isBooked: false },
      { id: 's105_2', startTime: '10:15', endTime: '12:15', isBooked: false },
      { id: 's105_3', startTime: '13:00', endTime: '15:00', isBooked: false },
      { id: 's105_4', startTime: '15:15', endTime: '17:15', isBooked: false },
    ],
  },
  {
    id: 'room-106',
    name: 'Phòng Thảo Luận Nhóm Quốc Tế A2',
    building: 'Tòa Nhà A',
    floor: 'Tầng 2',
    capacity: 8,
    type: 'Study',
    amenities: ['Loa hội nghị Jabra', 'Màn hình chiếu', 'Ghế công thái học'],
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    availableSlots: [
      { id: 's106_1', startTime: '08:30', endTime: '10:30', isBooked: false },
      { id: 's106_2', startTime: '13:30', endTime: '15:30', isBooked: false },
    ],
  },
  {
    id: 'room-107',
    name: 'Phòng Hội Thảo Nghiên Cứu A3',
    building: 'Tòa Nhà A',
    floor: 'Tầng 3',
    capacity: 30,
    type: 'Meeting',
    amenities: ['Micro không dây UHF', 'Hệ thống âm thanh vòm', 'Bục diễn thuyết'],
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80',
    availableSlots: [
      { id: 's107_1', startTime: '08:00', endTime: '10:00', isBooked: false },
      { id: 's107_2', startTime: '10:00', endTime: '12:00', isBooked: false },
      { id: 's107_3', startTime: '14:00', endTime: '16:00', isBooked: false },
    ],
  },

  // --- TÒA THƯ VIỆN TRUNG TÂM ---
  {
    id: 'room-108',
    name: 'Không Gian Tự Học Yên Tĩnh Lib-1',
    building: 'Tòa Thư Viện',
    floor: 'Tầng 2',
    capacity: 4,
    type: 'Study',
    amenities: ['Vách ngăn tiêu âm riêng tư', 'Đèn LED chống mỏi', 'Cổng sạc siêu nhanh'],
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80',
    availableSlots: [
      { id: 's108_1', startTime: '07:30', endTime: '09:30', isBooked: false },
      { id: 's108_2', startTime: '09:30', endTime: '11:30', isBooked: false },
      { id: 's108_3', startTime: '13:30', endTime: '15:30', isBooked: false },
      { id: 's108_4', startTime: '15:30', endTime: '17:30', isBooked: false },
    ],
  },
  {
    id: 'room-109',
    name: 'Phòng Đọc & Nghiên Cứu Chuyên Sâu Lib-2',
    building: 'Tòa Thư Viện',
    floor: 'Tầng 3',
    capacity: 10,
    type: 'Study',
    amenities: ['Bàn gỗ sồi dài', 'Khu tra cứu luận văn số', 'Wifi chuyên dụng thư viện'],
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
    availableSlots: [
      { id: 's109_1', startTime: '08:00', endTime: '10:00', isBooked: false },
      { id: 's109_2', startTime: '10:15', endTime: '12:15', isBooked: false },
      { id: 's109_3', startTime: '14:00', endTime: '16:00', isBooked: false },
    ],
  },
  {
    id: 'room-110',
    name: 'Góc Tự Học Mở Creative Corner',
    building: 'Tòa Thư Viện',
    floor: 'Tầng 1',
    capacity: 12,
    type: 'Study',
    amenities: ['Ghế lười Beanbag', 'Bàn trà thảo luận', 'View vườn cây xanh mát'],
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80',
    availableSlots: [
      { id: 's110_1', startTime: '08:30', endTime: '10:30', isBooked: false },
      { id: 's110_2', startTime: '13:00', endTime: '15:00', isBooked: false },
      { id: 's110_3', startTime: '15:15', endTime: '17:15', isBooked: false },
    ],
  },

  // --- KHU MAKERSPACE & SÁNG TẠO ---
  {
    id: 'room-111',
    name: 'MakerSpace Thực Nghiệm 3D & Laser',
    building: 'Khu MakerSpace',
    floor: 'Tầng 1',
    capacity: 10,
    type: 'Lab',
    amenities: ['Máy in 3D FDM & Resin', 'Máy cắt Laser CNC', 'Tủ đồ nghề cơ khí mini'],
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    availableSlots: [
      { id: 's111_1', startTime: '08:00', endTime: '10:00', isBooked: false },
      { id: 's111_2', startTime: '10:30', endTime: '12:30', isBooked: false },
      { id: 's111_3', startTime: '14:00', endTime: '16:00', isBooked: false },
    ],
  },
  {
    id: 'room-112',
    name: 'Phòng Hội Thảo Khởi Nghiệp V-Hub',
    building: 'Khu MakerSpace',
    floor: 'Tầng 2',
    capacity: 35,
    type: 'Meeting',
    amenities: ['Màn hình LED P2.5', 'Bàn ghế bánh xe xếp gọn', 'Hệ thống livestream'],
    imageUrl: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=600&q=80',
    availableSlots: [
      { id: 's112_1', startTime: '09:00', endTime: '11:00', isBooked: false },
      { id: 's112_2', startTime: '14:00', endTime: '16:00', isBooked: false },
      { id: 's112_3', startTime: '16:00', endTime: '18:00', isBooked: false },
    ],
  },

  // --- TÒA NHÀ ĐA NĂNG & STUDIO ---
  {
    id: 'room-113',
    name: 'Studio Podcast & Voice Over S1',
    building: 'Tòa Nhà Đa Năng',
    floor: 'Tầng 1',
    capacity: 4,
    type: 'Studio',
    amenities: ['Micro Rode Procaster', 'Card thu âm Focusrite', 'Cách âm tiêu chuẩn thu thanh'],
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80',
    availableSlots: [
      { id: 's113_1', startTime: '08:00', endTime: '10:00', isBooked: false },
      { id: 's113_2', startTime: '10:15', endTime: '12:15', isBooked: false },
      { id: 's113_3', startTime: '13:30', endTime: '15:30', isBooked: false },
      { id: 's113_4', startTime: '15:45', endTime: '17:45', isBooked: false },
    ],
  },
  {
    id: 'room-114',
    name: 'Studio Ghi Hình & Phông Xanh S2',
    building: 'Tòa Nhà Đa Năng',
    floor: 'Tầng 1',
    capacity: 8,
    type: 'Studio',
    amenities: ['Phông xanh Chromakey điện', 'Hệ thống đèn Spotlight Aputure', 'Máy quay 4K'],
    imageUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80',
    availableSlots: [
      { id: 's114_1', startTime: '08:30', endTime: '11:00', isBooked: false },
      { id: 's114_2', startTime: '13:30', endTime: '16:00', isBooked: false },
    ],
  },
  {
    id: 'room-115',
    name: 'Phòng Dựng Phim & Đồ Họa 3D',
    building: 'Tòa Nhà Đa Năng',
    floor: 'Tầng 2',
    capacity: 16,
    type: 'Studio',
    amenities: ['Màn hình màu chuẩn DCI-P3', 'Bảng vẽ Wacom Intuos Pro', 'Card đồ họa Quadro'],
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    availableSlots: [
      { id: 's115_1', startTime: '07:30', endTime: '09:30', isBooked: false },
      { id: 's115_2', startTime: '10:00', endTime: '12:00', isBooked: false },
      { id: 's115_3', startTime: '14:00', endTime: '16:00', isBooked: false },
    ],
  },

  // --- TÒA NHÀ B ---
  {
    id: 'room-116',
    name: 'Phòng Seminar Kỹ Thuật Phần Mềm B1',
    building: 'Tòa Nhà B',
    floor: 'Tầng 4',
    capacity: 12,
    type: 'Meeting',
    amenities: ['Camera 360 Meeting Owl', 'Màn hình cảm ứng trình chiếu', 'Bàn tròn hội đàm'],
    imageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=600&q=80',
    availableSlots: [
      { id: 's116_1', startTime: '08:00', endTime: '10:00', isBooked: false },
      { id: 's116_2', startTime: '10:15', endTime: '12:15', isBooked: false },
      { id: 's116_3', startTime: '13:30', endTime: '15:30', isBooked: false },
    ],
  },
  {
    id: 'room-117',
    name: 'Phòng Báo Cáo Khóa Luận B2',
    building: 'Tòa Nhà B',
    floor: 'Tầng 3',
    capacity: 25,
    type: 'Meeting',
    amenities: ['2 Máy chiếu độc lập', 'Hệ thống micro đa hướng', 'Máy lạnh công suất lớn'],
    imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80',
    availableSlots: [
      { id: 's117_1', startTime: '07:30', endTime: '09:30', isBooked: false },
      { id: 's117_2', startTime: '09:45', endTime: '11:45', isBooked: false },
      { id: 's117_3', startTime: '14:00', endTime: '16:00', isBooked: false },
    ],
  },
  {
    id: 'room-118',
    name: 'Phòng Làm Việc Nhóm Đồ Án B3',
    building: 'Tòa Nhà B',
    floor: 'Tầng 2',
    capacity: 8,
    type: 'Study',
    amenities: ['Bảng viết kính lớn', 'Màn hình phụ HDMI', 'Wifi mesh phủ sóng cao'],
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80',
    availableSlots: [
      { id: 's118_1', startTime: '08:00', endTime: '10:00', isBooked: false },
      { id: 's118_2', startTime: '10:30', endTime: '12:30', isBooked: false },
      { id: 's118_3', startTime: '15:00', endTime: '17:00', isBooked: false },
    ],
  },

  // --- TÒA NHÀ C & HỘI TRƯỜNG ---
  {
    id: 'room-119',
    name: 'Hội Trường Workshop Sinh Viên C1',
    building: 'Tòa Nhà C',
    floor: 'Tầng 1',
    capacity: 40,
    type: 'Meeting',
    amenities: ['Sân khấu mini', 'Âm thanh ánh sáng sân khấu', 'Hệ thống điều hòa trung tâm'],
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80',
    availableSlots: [
      { id: 's119_1', startTime: '08:30', endTime: '11:30', isBooked: false },
      { id: 's119_2', startTime: '13:30', endTime: '16:30', isBooked: false },
    ],
  },
  {
    id: 'room-120',
    name: 'Phòng Nghiên Cứu Thuật Toán & Data C2',
    building: 'Tòa Nhà C',
    floor: 'Tầng 3',
    capacity: 14,
    type: 'Lab',
    amenities: ['Cụm máy trạm tính toán', 'Bàn tròn làm việc nhóm', 'Bảng từ 4 mặt'],
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
    availableSlots: [
      { id: 's120_1', startTime: '08:00', endTime: '10:00', isBooked: false },
      { id: 's120_2', startTime: '10:15', endTime: '12:15', isBooked: false },
      { id: 's120_3', startTime: '13:30', endTime: '15:30', isBooked: false },
      { id: 's120_4', startTime: '15:45', endTime: '17:45', isBooked: false },
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
    // 1. Tải dữ liệu ban đầu từ Firebase
    fetch(`${FIREBASE_DB_URL}rooms.json`)
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          set({ rooms: data });
        } else {
          // Nếu database chưa có dữ liệu hoặc đã xóa để reset, đẩy 20 phòng mới lên
          fetch(`${FIREBASE_DB_URL}rooms.json`, {
            method: 'PUT',
            body: JSON.stringify(INITIAL_ROOMS_DATA),
          });
        }
      })
      .catch((err) => console.log('Lỗi khởi tạo đồng bộ:', err));

    // 2. Định kỳ polling dữ liệu mỗi 1 giây để phản hồi nhanh giữa 2 máy
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${FIREBASE_DB_URL}rooms.json`);
        const remoteRooms = await res.json();
        if (remoteRooms && Array.isArray(remoteRooms)) {
          set({ rooms: remoteRooms });
        }
      } catch (e) {
        // Bỏ qua lỗi ngắt kết nối mạng tạm thời
      }
    }, 1000);

    return () => clearInterval(interval);
  },

  // Chống xung đột (Conflict Prevention) và Race Condition bằng khóa ETag
  bookSlot: async (roomId, slotId) => {
    const { userSession } = get();

    try {
      // Lấy toàn bộ danh sách phòng hiện tại từ Firebase
      const res = await fetch(`${FIREBASE_DB_URL}rooms.json`);
      const currentRooms: StudyRoom[] = await res.json();

      const roomIndex = currentRooms.findIndex((r) => r.id === roomId);
      if (roomIndex === -1) return { success: false, message: 'Phòng học không tồn tại!' };

      const slotIndex = currentRooms[roomIndex].availableSlots.findIndex((s) => s.id === slotId);
      if (slotIndex === -1) return { success: false, message: 'Khung giờ này không tồn tại!' };

      // Lấy slot đích kèm con tem phiên bản (ETag) trực tiếp từ máy chủ
      const slotUrl = `${FIREBASE_DB_URL}rooms/${roomIndex}/availableSlots/${slotIndex}.json`;
      const slotRes = await fetch(slotUrl, {
        headers: { 'X-Firebase-ETag': 'true' },
      });

      const etag = slotRes.headers.get('ETag');
      const serverSlot = await slotRes.json();

      // Kiểm tra lần 1: Nếu slot trên máy chủ đã có người đặt
      if (serverSlot && serverSlot.isBooked) {
        set({ rooms: currentRooms });
        return {
          success: false,
          message:
            'Rất tiếc! Khung giờ này vừa có bạn khác nhanh tay đặt trước mất rồi 🥺 Bạn vui lòng chọn khung giờ khác nhé!',
        };
      }

      // Chuẩn bị payload cập nhật
      const updatePayload = {
        ...serverSlot,
        isBooked: true,
        bookedBy: userSession.userId,
      };

      // Ghi có điều kiện If-Match: chỉ thành công nếu ETag tại máy chủ chưa bị máy khác thay đổi
      const putRes = await fetch(slotUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(etag ? { 'if-match': etag } : {}),
        },
        body: JSON.stringify(updatePayload),
      });

      // Bắt trường hợp máy khác nhanh tay hơn vài mili-giây (Firebase trả mã 412)
      if (putRes.status === 412) {
        return {
          success: false,
          message:
            'Rất tiếc! Khung giờ này vừa có bạn khác nhanh tay đặt trước mất rồi 🥺 Bạn vui lòng chọn khung giờ khác nhé!',
        };
      }

      if (!putRes.ok) {
        return { success: false, message: 'Không thể gửi yêu cầu đặt chỗ đến hệ thống!' };
      }

      // Cập nhật trạng thái cục bộ
      const updatedRooms = [...currentRooms];
      updatedRooms[roomIndex].availableSlots[slotIndex] = updatePayload;
      set({ rooms: updatedRooms });

      return {
        success: true,
        message: 'Tuyệt vời! Bạn đã đặt phòng thành công, hãy chuẩn bị nhận phòng đúng giờ nhé 🎉',
      };
    } catch (error) {
      return { success: false, message: 'Lỗi mạng: Không thể xác thực đặt chỗ lúc này!' };
    }
  },

  cancelBooking: async (roomId, slotId) => {
    const { userSession } = get();

    try {
      const res = await fetch(`${FIREBASE_DB_URL}rooms.json`);
      const currentRooms: StudyRoom[] = await res.json();

      const roomIndex = currentRooms.findIndex((r) => r.id === roomId);
      if (roomIndex === -1) return { success: false, message: 'Phòng học không tồn tại!' };

      const slotIndex = currentRooms[roomIndex].availableSlots.findIndex((s) => s.id === slotId);
      if (slotIndex === -1) return { success: false, message: 'Khung giờ không tồn tại!' };

      const slot = currentRooms[roomIndex].availableSlots[slotIndex];
      if (!slot.isBooked || slot.bookedBy !== userSession.userId) {
        return { success: false, message: 'Bạn không có quyền hủy lịch đặt phòng này.' };
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

      return { success: true, message: 'Đã hủy lịch đặt phòng thành công! ✨' };
    } catch (e) {
      return { success: false, message: 'Lỗi kết nối khi hủy lịch đặt phòng.' };
    }
  },
}));