# LilyPay - React Native POS System

A complete Point of Sale (POS) system built with React Native, Expo, NativeWind, and SQLite for restaurant and retail businesses.

## 🚀 Features

- **React Native** with Expo for cross-platform development
- **NativeWind v4** for Tailwind CSS styling in React Native
- **SQLite Database** with comprehensive POS schema
- **TypeScript** for type safety and better development experience
- **User Authentication** (Admin and Cashier roles)
- **Menu Management** (Categories, Subcategories, Food Items)
- **Transaction Processing** with payment methods
- **Sales Analytics** and reporting
- **Modern UI** with responsive design
- **Hot Reload** for fast development

## 📦 Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <your-repo-url>
   cd LilyPay
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## 🏃‍♂️ Running the App

### Development
```bash
# Start the development server
npm start

# Or run specific platforms
npm run android
npm run ios
npm run web
```

### Using Expo Go App
1. Install the Expo Go app on your device
2. Scan the QR code that appears in the terminal
3. The app will load on your device

## 🗄️ Database Schema

The app uses SQLite with the following tables:

### Core Tables
- **users** - User authentication (admin/cashier)
- **categories** - Menu categories (Breakfast, Lunch, Dinner)
- **subcategories** - Menu subcategories (Appetizer, Main Course, etc.)
- **food_items** - Individual menu items with pricing
- **transactions** - Sales records
- **transaction_items** - Items in each transaction

### Features
- **Foreign key relationships** for data integrity
- **Automatic timestamps** with triggers
- **Data validation** with CHECK constraints
- **Indexes** for optimal performance
- **Views** for complex queries

## 🔐 Authentication

### Default Users
- **Admin**: `admin` / `admin123`
- **Cashier**: `cashier` / `cashier123`

### User Roles
- **Admin**: Full system access, user management, reports
- **Cashier**: Transaction processing, menu access

## 🎨 NativeWind Setup

This project uses NativeWind v4 for styling, which allows you to use Tailwind CSS classes directly in React Native components.

### Key Files:
- `tailwind.config.js` - Tailwind configuration with NativeWind preset
- `global.css` - Global CSS with Tailwind directives
- `babel.config.js` - Babel configuration with NativeWind plugin
- `metro.config.js` - Metro configuration with NativeWind wrapper

### Usage Example:
```tsx
import { View, Text } from 'react-native';

export default function MyComponent() {
  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-xl font-bold text-blue-600">
        Hello NativeWind!
      </Text>
    </View>
  );
}
```

## 📁 Project Structure

```
LilyPay/
├── App.tsx                 # Main app component with navigation
├── components/             # Reusable components
│   ├── Button.tsx         # Custom button component
│   ├── LoginScreen.tsx    # User authentication screen
│   └── DashboardScreen.tsx # Main dashboard with database data
├── services/              # Business logic and services
│   └── database.ts        # SQLite database service
├── assets/                # Images, fonts, etc.
├── global.css             # Global styles with Tailwind
├── tailwind.config.js     # Tailwind configuration
├── babel.config.js        # Babel configuration
├── metro.config.js        # Metro bundler configuration
├── nativewind-env.d.ts    # TypeScript declarations
└── package.json           # Dependencies and scripts
```

## 🛠️ Development

### Database Operations
The `databaseService` provides methods for all database operations:

```typescript
// User authentication
const user = await databaseService.authenticateUser(username, password);

// Get menu data
const categories = await databaseService.getCategories();
const foodItems = await databaseService.getFoodItemsWithDetails();

// Create transaction
const transactionId = await databaseService.createTransaction(transaction, items);
```

### Adding New Components
1. Create new components in the `components/` directory
2. Use NativeWind classes for styling
3. Export components with proper TypeScript interfaces

### Styling Guidelines
- Use Tailwind CSS classes via the `className` prop
- Follow mobile-first responsive design principles
- Use semantic color names and spacing scales

## 📱 Platform Support

- ✅ Android
- ✅ iOS  
- ✅ Web (via Expo)

## 🔧 Dependencies

- **React Native** - Mobile app framework
- **Expo** - Development platform and tools
- **NativeWind** - Tailwind CSS for React Native
- **expo-sqlite** - SQLite database for React Native
- **TypeScript** - Type safety and development experience

## 📊 Sample Data

The app comes with pre-loaded sample data:

### Categories
- Breakfast (Morning meals and items)
- Lunch (Midday meals and items)
- Dinner (Evening meals and items)

### Food Items
- Fresh Fruit Bowl ($8.50)
- Pancake Stack ($12.00)
- Eggs Benedict ($14.50)
- Caesar Salad ($11.00)
- Grilled Chicken Sandwich ($13.50)
- And more...

## 🚀 Getting Started

1. **Start the app**: `npm start`
2. **Login** with demo credentials
3. **Explore** the dashboard to see database data
4. **Test** user authentication and logout
5. **View** categories and food items

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

Happy coding! 🎉 