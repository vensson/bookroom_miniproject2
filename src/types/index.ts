export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  bookedBy?: string;
}

export interface StudyRoom {
  id: string;
  name: string;
  building: string;
  floor: string;
  capacity: number;
  type: 'Lab' | 'Study' | 'Meeting' | 'Studio';
  amenities: string[];
  imageUrl: string;
  availableSlots: TimeSlot[];
}

export interface BookingFilter {
  searchQuery: string;
  selectedCategory: string;
  minCapacity: number;
}

export interface UserSession {
  userId: string;
  userName: string;
}