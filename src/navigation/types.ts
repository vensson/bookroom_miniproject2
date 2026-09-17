export type RootStackParamList = {
  Home: undefined;
  RoomDetail: { roomId: string };
  BookingConfirm: { roomId: string; slotId: string };
};