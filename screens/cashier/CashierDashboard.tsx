import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { databaseService, User, FoodItem } from '../../services/database';

interface CashierDashboardProps {
  user: User;
  onLogout: () => void;
}

export const CashierDashboard: React.FC<CashierDashboardProps> = ({ user, onLogout }) => {
  const [foodItems, setFoodItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCashierData();
  }, []);

  const loadCashierData = async () => {
    try {
      setIsLoading(true);
      const [foodData, categoryData, transactionData] = await Promise.all([
        databaseService.getFoodItemsWithDetails(),
        databaseService.getCategories(),
        databaseService.getTransactions(10)
      ]);
      setFoodItems(foodData);
      setCategories(categoryData);
      setRecentTransactions(transactionData);
    } catch (error) {
      Alert.alert('Error', 'Failed to load cashier data');
      console.error('Cashier dashboard error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: onLogout }
      ]
    );
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center">
        <Text className="text-gray-600 text-lg">Loading cashier dashboard...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-200">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-2xl font-bold text-gray-900">Cashier Dashboard</Text>
            <Text className="text-gray-600">Welcome, {user.full_name}</Text>
          </View>
          <TouchableOpacity
            className="bg-red-500 px-4 py-2 rounded-lg"
            onPress={handleLogout}
          >
            <Text className="text-white font-semibold">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 py-4">
        {/* Cashier Info */}
        <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-2">Cashier Information</Text>
          <View className="space-y-1">
            <Text className="text-gray-600">Role: <Text className="text-gray-900 font-medium">{user.role}</Text></Text>
            <Text className="text-gray-600">Username: <Text className="text-gray-900 font-medium">{user.username}</Text></Text>
            <Text className="text-gray-600">Full Name: <Text className="text-gray-900 font-medium">{user.full_name}</Text></Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</Text>
          <View className="grid grid-cols-2 gap-3">
            <TouchableOpacity className="bg-green-500 p-4 rounded-lg">
              <Text className="text-white font-semibold text-center">New Order</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-blue-500 p-4 rounded-lg">
              <Text className="text-white font-semibold text-center">View Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-purple-500 p-4 rounded-lg">
              <Text className="text-white font-semibold text-center">Recent Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-orange-500 p-4 rounded-lg">
              <Text className="text-white font-semibold text-center">Daily Summary</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Overview */}
        <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-4">Menu Overview</Text>
          <View className="space-y-3">
            {categories.map((category) => (
              <View key={category.id} className="p-3 bg-gray-50 rounded-lg">
                <View className="flex-row justify-between items-center">
                  <Text className="font-medium text-gray-900">{category.name}</Text>
                  <Text className="text-sm text-gray-600">{category.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Popular Items */}
        <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-4">Popular Items</Text>
          <View className="space-y-3">
            {foodItems.slice(0, 5).map((item) => (
              <View key={item.id} className="p-3 bg-gray-50 rounded-lg">
                <View className="flex-row justify-between items-start mb-2">
                  <Text className="font-medium text-gray-900 flex-1">{item.food_name}</Text>
                  <Text className="font-bold text-green-600">${item.price}</Text>
                </View>
                <Text className="text-sm text-gray-600 mb-2">{item.food_description}</Text>
                <View className="flex-row justify-between items-center">
                  <Text className="text-xs text-gray-500">
                    {item.category_name} → {item.subcategory_name}
                  </Text>
                  <Text className="text-xs text-gray-500">Stock: {item.stock_quantity}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Transactions */}
        <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</Text>
          {recentTransactions.length > 0 ? (
            <View className="space-y-3">
              {recentTransactions.map((transaction) => (
                <View key={transaction.id} className="p-3 bg-gray-50 rounded-lg">
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="font-medium text-gray-900">{transaction.transaction_number}</Text>
                    <Text className="font-bold text-green-600">${transaction.total_amount}</Text>
                  </View>
                  <View className="flex-row justify-between text-sm text-gray-600">
                    <Text>{transaction.payment_method}</Text>
                    <Text>{transaction.item_count} items</Text>
                  </View>
                  <Text className="text-xs text-gray-500 mt-1">{transaction.created_at}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text className="text-gray-500 text-center py-4">No recent transactions</Text>
          )}
        </View>

        {/* Cashier Status */}
        <View className="bg-green-50 p-4 rounded-xl border border-green-200 mb-6">
          <Text className="text-lg font-semibold text-green-900 mb-2">Cashier Status</Text>
          <Text className="text-green-800 text-sm">
            POS system is ready for transactions!{'\n'}
            • {categories.length} categories available{'\n'}
            • {foodItems.length} food items loaded{'\n'}
            • Transaction processing active{'\n'}
            • All cashier functions operational
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}; 