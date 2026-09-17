import React, { useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ListRenderItem,
  StatusBar,
  Platform,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { RoomCard, CARD_TOTAL_HEIGHT } from '../components/RoomCard';
import { useBookingStore, INITIAL_ROOMS_DATA } from '../store/useBookingStore';
import { StudyRoom } from '../types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, any>;
};

const CATEGORIES = ['Tất cả', 'Lab', 'Study', 'Meeting', 'Studio'];
const CAPACITY_FILTERS = [
  { label: 'Tất cả chỗ', min: 0 },
  { label: '≥ 5 chỗ', min: 5 },
  { label: '≥ 10 chỗ', min: 10 },
  { label: '≥ 15 chỗ', min: 15 },
];

const fetchStudyRooms = async (): Promise<StudyRoom[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return INITIAL_ROOMS_DATA;
};

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const rooms = useBookingStore((state) => state.rooms);
  const user = useBookingStore((state) => state.userSession);
  const { searchQuery, selectedCategory, minCapacity } = useBookingStore((state) => state.filters);
  const setSearchQuery = useBookingStore((state) => state.setSearchQuery);
  const setSelectedCategory = useBookingStore((state) => state.setSelectedCategory);
  const setMinCapacity = useBookingStore((state) => state.setMinCapacity);

  const { isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['campus-rooms'],
    queryFn: fetchStudyRooms,
  });

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchSearch =
        !searchQuery.trim() ||
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.building.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === 'Tất cả' || room.type === selectedCategory;

      const matchCapacity = room.capacity >= minCapacity;

      return matchSearch && matchCategory && matchCapacity;
    });
  }, [rooms, searchQuery, selectedCategory, minCapacity]);

  const handleRoomPress = useCallback(
    (roomId: string) => {
      navigation.navigate('RoomDetail', { roomId });
    },
    [navigation]
  );

  const renderItem: ListRenderItem<StudyRoom> = useCallback(
    ({ item }) => <RoomCard room={item} onPress={handleRoomPress} />,
    [handleRoomPress]
  );

  const keyExtractor = useCallback((item: StudyRoom) => item.id, []);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: CARD_TOTAL_HEIGHT,
      offset: CARD_TOTAL_HEIGHT * index,
      index,
    }),
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <View style={styles.topInfo}>
          <View>
            <Text style={styles.greeting}>Xin chào, {user.userName} 👋</Text>
            <Text style={styles.studentId}>Mã SV: {user.userId}</Text>
          </View>
          <View style={styles.badgeCampus}>
            <Text style={styles.badgeCampusText}>VKU Campus</Text>
          </View>
        </View>

        <Text style={styles.title}>Đặt Phòng Học & Lab</Text>

        <TextInput
          style={styles.searchBar}
          placeholder="🔍 Tìm theo tên phòng, lab hoặc tòa nhà..."
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCorrect={false}
          clearButtonMode="while-editing"
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}
        >
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.chip, active && styles.activeChip]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text style={[styles.chipText, active && styles.activeChipText]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.chipsRow, { marginTop: 8 }]}
        >
          {CAPACITY_FILTERS.map((item) => {
            const active = minCapacity === item.min;
            return (
              <TouchableOpacity
                key={item.label}
                style={[styles.smallChip, active && styles.activeSmallChip]}
                onPress={() => setMinCapacity(item.min)}
              >
                <Text style={[styles.smallChipText, active && styles.activeSmallChipText]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingText}>Đang tải dữ liệu phòng...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredRooms}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
          initialNumToRender={6}
          maxToRenderPerBatch={6}
          windowSize={5}
          removeClippedSubviews={true}
          onRefresh={refetch}
          refreshing={isRefetching}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyWrap}>
              <Text style={styles.emptyIcon}>🔍</Text>
              <Text style={styles.emptyText}>Không tìm thấy phòng phù hợp.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, color: '#64748B', fontSize: 13 },
  header: {
    paddingHorizontal: 18,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 10 : 12,
    paddingBottom: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  topInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  greeting: { fontSize: 13, color: '#64748B', fontWeight: '600' },
  studentId: { fontSize: 11, color: '#94A3B8' },
  badgeCampus: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeCampusText: { color: '#2563EB', fontSize: 11, fontWeight: '700' },
  title: { fontSize: 22, fontWeight: '800', color: '#0F172A', marginVertical: 4 },
  searchBar: {
    height: 44,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 13,
    color: '#0F172A',
    marginTop: 6,
  },
  chipsRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeChip: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  chipText: { fontSize: 12, color: '#475569', fontWeight: '600' },
  activeChipText: { color: '#FFFFFF' },
  smallChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  activeSmallChip: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  smallChipText: { fontSize: 11, color: '#64748B', fontWeight: '600' },
  activeSmallChipText: { color: '#FFFFFF' },
  listContainer: { paddingHorizontal: 16, paddingVertical: 8 },
  emptyWrap: { alignItems: 'center', marginTop: 60 },
  emptyIcon: { fontSize: 36, marginBottom: 8 },
  emptyText: { color: '#94A3B8', fontSize: 14 },
});