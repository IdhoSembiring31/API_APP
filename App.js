import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  Image,
  RefreshControl,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://fakestoreapi.com/products';

// ---------- KOMPONEN KARTU (dengan fade-in) ----------
const ProductCard = ({ item, isFavorite, onToggleFavorite, onPress }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.cardWrapper, { opacity: fadeAnim }]}>
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
        <TouchableOpacity
          style={styles.favButton}
          onPress={() => onToggleFavorite(item.id)}
        >
          <Text style={styles.favIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
        <View style={styles.cardContent}>
          <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.price}>Rp {item.price.toLocaleString()}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {item.rating.rate} ({item.rating.count})</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ---------- SKELETON LOADING ----------
const SkeletonLoader = () => {
  const skeletonData = ['1','2','3','4','5','6'];
  const renderSkeletonItem = () => (
    <View style={styles.card}>
      <View style={[styles.skeletonImage, { backgroundColor: '#e0e0e0' }]} />
      <View style={styles.cardContent}>
        <View style={[styles.skeletonText, { width: '80%', height: 14, marginBottom: 6 }]} />
        <View style={[styles.skeletonText, { width: '60%', height: 16, marginBottom: 4 }]} />
        <View style={[styles.skeletonText, { width: '40%', height: 12 }]} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.searchInput, { backgroundColor: '#e0e0e0', height: 44 }]} />
      <FlatList
        data={skeletonData}
        keyExtractor={(item) => item}
        renderItem={renderSkeletonItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        scrollEnabled={false}
      />
    </SafeAreaView>
  );
};

// ---------- KOMPONEN UTAMA ----------
export default function App() {
  // State utama
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // State favorit (AsyncStorage)
  const [favorites, setFavorites] = useState([]);
  // State sorting
  const [sortOption, setSortOption] = useState('default');
  // State untuk menampilkan hanya favorit
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // --- LOAD FAVORIT DARI STORAGE ---
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const stored = await AsyncStorage.getItem('favorites');
        if (stored) {
          setFavorites(JSON.parse(stored));
        }
      } catch (error) {
        console.warn('Gagal load favorit:', error);
      }
    };
    loadFavorites();
  }, []);

  // --- TOGGLE FAVORIT & SIMPAN ---
  const toggleFavorite = async (productId) => {
    let newFavorites;
    if (favorites.includes(productId)) {
      newFavorites = favorites.filter(id => id !== productId);
    } else {
      newFavorites = [...favorites, productId];
    }
    setFavorites(newFavorites);
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.warn('Gagal simpan favorit:', error);
    }
  };

  // --- FETCH DATA ---
  const fetchProducts = async () => {
    try {
      setError(null);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Gagal memuat data. Periksa koneksi internet.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // --- FILTER + SORTIR (dengan fitur favorit) ---
  const getProcessedProducts = () => {
    // 1. Filter berdasarkan pencarian
    let processed = products.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 2. Filter hanya favorit jika tombol aktif
    if (showFavoritesOnly) {
      processed = processed.filter(item => favorites.includes(item.id));
    }

    // 3. Sorting
    if (sortOption === 'price-asc') {
      processed.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      processed.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name-asc') {
      processed.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'name-desc') {
      processed.sort((a, b) => b.title.localeCompare(a.title));
    }
    return processed;
  };

  const filteredProducts = getProcessedProducts();

  // --- RENDER KONDISIONAL ---
  if (loading) return <SkeletonLoader />;

  if (error) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchProducts}>
          <Text style={styles.retryButtonText}>Coba Lagi</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // --- RENDER SUKSES ---
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="🔍 Cari produk..."
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={setSearchQuery}
        clearButtonMode="always"
      />

      {/* Tombol Sorting + Favorit Filter */}
      <View style={styles.sortContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sortScrollContent}
        >
          {[
            { key: 'default', label: '📋 Default' },
            { key: 'price-asc', label: '💰 Harga ↑' },
            { key: 'price-desc', label: '💰 Harga ↓' },
            { key: 'name-asc', label: '🔤 A-Z' },
            { key: 'name-desc', label: '🔤 Z-A' },
          ].map((opt) => (
            <TouchableOpacity
              key={opt.key}
              style={[styles.sortButton, sortOption === opt.key && styles.sortButtonActive]}
              onPress={() => setSortOption(opt.key)}
            >
              <Text style={[styles.sortText, sortOption === opt.key && styles.sortTextActive]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
          {/* Tombol Toggle Favorit */}
          <TouchableOpacity
            style={[styles.sortButton, showFavoritesOnly && styles.sortButtonActive]}
            onPress={() => setShowFavoritesOnly(prev => !prev)}
          >
            <Text style={[styles.sortText, showFavoritesOnly && styles.sortTextActive]}>
              {showFavoritesOnly ? '❤️ Favorit' : '🤍 Semua'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            isFavorite={favorites.includes(item.id)}
            onToggleFavorite={toggleFavorite}
            onPress={() => {
              setSelectedProduct(item);
              setModalVisible(true);
            }}
          />
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchProducts();
            }}
            colors={['#6200ee']}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {showFavoritesOnly ? '😕 Belum ada produk favorit' : '😕 Tidak ada produk yang cocok'}
            </Text>
            <Text style={styles.emptySubtext}>
              {showFavoritesOnly ? 'Tambahkan dengan menekan ❤️ di kartu' : 'Coba kata kunci lain'}
            </Text>
          </View>
        }
      />

      {/* Modal Detail */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {selectedProduct && (
                <>
                  <Image source={{ uri: selectedProduct.image }} style={styles.modalImage} resizeMode="contain" />
                  <Text style={styles.modalTitle}>{selectedProduct.title}</Text>
                  <Text style={styles.modalPrice}>Rp {selectedProduct.price.toLocaleString()}</Text>
                  <View style={styles.modalRating}>
                    <Text>⭐ {selectedProduct.rating.rate} ({selectedProduct.rating.count} ulasan)</Text>
                  </View>
                  <Text style={styles.modalCategory}>Kategori: {selectedProduct.category}</Text>
                  <Text style={styles.modalDescription}>{selectedProduct.description}</Text>
                  <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                    <Text style={styles.closeButtonText}>Tutup</Text>
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ---------- STYLES ----------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  errorIcon: { fontSize: 48, marginBottom: 12 },
  errorText: { fontSize: 16, color: '#d32f2f', textAlign: 'center', marginBottom: 20 },
  retryButton: { backgroundColor: '#6200ee', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 8 },
  retryButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  searchInput: {
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginTop: 8,
    marginBottom: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },

  sortContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sortScrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  sortButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    minHeight: 36,
  },
  sortButtonActive: {
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  sortText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
  },
  sortTextActive: {
    color: '#fff',
  },

  listContent: { paddingHorizontal: 8, paddingBottom: 20 },
  row: { justifyContent: 'space-between' },
  cardWrapper: { flex: 1, maxWidth: '48%', marginVertical: 6 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    position: 'relative',
  },
  image: { width: '100%', height: 120, marginBottom: 8 },
  cardContent: { alignItems: 'flex-start' },
  title: { fontSize: 14, fontWeight: '600', color: '#222', marginBottom: 4 },
  price: { fontSize: 15, fontWeight: 'bold', color: '#2e7d32', marginBottom: 2 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  rating: { fontSize: 12, color: '#777' },

  favButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
    padding: 4,
    zIndex: 10,
  },
  favIcon: { fontSize: 22 },

  skeletonImage: { width: '100%', height: 120, borderRadius: 8, marginBottom: 8, backgroundColor: '#e0e0e0' },
  skeletonText: { borderRadius: 4, backgroundColor: '#e0e0e0' },

  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 60 },
  emptyText: { fontSize: 18, color: '#666', marginBottom: 4 },
  emptySubtext: { fontSize: 14, color: '#999' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 16 },
  modalContent: { backgroundColor: '#fff', borderRadius: 20, padding: 20, maxHeight: '90%', width: '100%', shadowColor: '#000', shadowOpacity: 0.3, shadowOffset: { width: 0, height: 4 }, shadowRadius: 10, elevation: 8 },
  modalImage: { width: '100%', height: 220, marginBottom: 16 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 6 },
  modalPrice: { fontSize: 18, fontWeight: 'bold', color: '#2e7d32', marginBottom: 4 },
  modalRating: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  modalCategory: { fontSize: 14, color: '#555', textTransform: 'capitalize', marginBottom: 8 },
  modalDescription: { fontSize: 15, lineHeight: 22, color: '#333', marginBottom: 16 },
  closeButton: { backgroundColor: '#6200ee', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  closeButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});