import { View, Text, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ScaledSheet, scale, verticalScale, moderateScale } from 'react-native-size-matters';

const { width, height } = Dimensions.get('window');

// Defining color constants based on the theme
const PRIMARY_COLOR = '#ECDAC3';
const SECONDARY_COLOR = '#B38B6D';
const TEXT_COLOR = '#403D39';
const CARD_BACKGROUND_COLOR = '#F3EAE3';
const BUTTON_TEXT_COLOR = '#FFFFFF';

const LandingScreen = () => {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header with Welcome Message */}
        <LinearGradient colors={[PRIMARY_COLOR, PRIMARY_COLOR]} style={styles.header}>
          <Text style={styles.headerText}>Hi, Aaliyah</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/notifications')}>
              <Ionicons name="notifications-outline" size={scale(24)} color={TEXT_COLOR} />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Sales Summary Section */}
        <View style={styles.salesSummary}>
          <Text style={styles.sectionTitle}>Sales Summary</Text>
          <View style={styles.summaryCards}>
            <View style={styles.summaryCard}>
              <Ionicons name="cash-outline" size={scale(32)} color={SECONDARY_COLOR} />
              <Text style={styles.cardValue}>$12,345</Text>
              <Text style={styles.cardLabel}>Sales</Text>
            </View>
            <View style={styles.summaryCard}>
              <Ionicons name="cart-outline" size={scale(32)} color={SECONDARY_COLOR} onPress={() => router.push('/orders')} />
              <Text style={styles.cardValue}>28</Text>
              <Text style={styles.cardLabel}>Orders</Text>
            </View>
            <View style={styles.summaryCard}>
              <Ionicons name="cube-outline" size={scale(32)} color={SECONDARY_COLOR} />
              <Text style={styles.cardValue}>145</Text>
              <Text style={styles.cardLabel}>Products</Text>
            </View>
          </View>
        </View>

        {/* Recent Transactions Section */}
        <View style={styles.recentTransactions}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {[
            { id: '1234', status: 'Completed', amount: 120.0 },
            { id: '1235', status: 'Pending', amount: 85.5 },
            { id: '1236', status: 'Completed', amount: 200.75 },
          ].map((order) => (
            <View key={order.id} style={styles.transactionItem}>
              <View
                style={[
                  styles.transactionIcon,
                  { backgroundColor: order.status === 'Completed' ? SECONDARY_COLOR : '#D3A07E' },
                ]}
              >
                <Ionicons name="cube-outline" size={scale(24)} color={PRIMARY_COLOR} />
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.orderNumber}>Order #{order.id}</Text>
                <Text style={styles.orderStatus}>{order.status} - ${order.amount.toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="grid-outline" size={scale(28)} color={TEXT_COLOR} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={scale(28)} color={TEXT_COLOR} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/settings')}>
          <Ionicons name="settings-outline" size={scale(28)} color={TEXT_COLOR} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
  },
  scrollContent: {
    paddingBottom: verticalScale(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scale(20),
    paddingTop: verticalScale(40),
    paddingBottom: verticalScale(20),
    backgroundColor: PRIMARY_COLOR,
    borderBottomRightRadius: moderateScale(15),
    borderBottomLeftRadius: moderateScale(15),
    elevation: 3,
  },
  headerText: {
    fontFamily: 'Roboto_700Bold',
    fontSize: scale(20),
    color: TEXT_COLOR,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: scale(10),
  },
  salesSummary: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20),
  },
  sectionTitle: {
    fontFamily: 'Roboto_500Medium',
    fontSize: scale(18),
    color: TEXT_COLOR,
    marginBottom: verticalScale(15),
  },
  summaryCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryCard: {
    backgroundColor: CARD_BACKGROUND_COLOR,
    borderRadius: moderateScale(15),
    padding: scale(15),
    alignItems: 'center',
    width: width * 0.28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardValue: {
    fontFamily: 'Roboto_500Medium',
    fontSize: scale(16),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(5),
    color: TEXT_COLOR,
  },
  cardLabel: {
    fontFamily: 'Roboto_400Regular',
    fontSize: scale(14),
    color: TEXT_COLOR,
  },
  recentTransactions: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(20),
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(15),
    padding: scale(15),
    backgroundColor: CARD_BACKGROUND_COLOR,
    borderRadius: moderateScale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionIcon: {
    padding: scale(10),
    borderRadius: moderateScale(10),
    marginRight: scale(15),
  },
  transactionDetails: {
    flex: 1,
  },
  orderNumber: {
    fontFamily: 'Roboto_500Medium',
    fontSize: scale(14),
    color: TEXT_COLOR,
  },
  orderStatus: {
    fontFamily: 'Roboto_400Regular',
    color: TEXT_COLOR,
    fontSize: scale(12),
    marginTop: verticalScale(5),
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: verticalScale(10),
    backgroundColor: CARD_BACKGROUND_COLOR,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(10),
  },
});

export default LandingScreen;
