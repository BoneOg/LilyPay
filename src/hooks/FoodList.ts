export interface FoodItem {
  code: string;
  name: string;
  price: number;
}

type MenuType = 'breakfast' | 'lunch' | 'dinner';
type Category = 'appetizer' | 'main-course' | 'desserts' | 'drinks';

// Breakfast Menu
const breakfastMenu = {
  appetizer: [
    { code: 'BA1', name: 'Fruit Platter of the sunrise of a good morning in every way of the island this is a test to see if the text is too long and will wrap around the card', price: 1200 },
    { code: 'BA2', name: 'Yogurt Parfait oh really', price: 95000 },
    { code: 'BA3', name: 'Granola Bowl', price: 8500 },
    { code: 'BA4', name: 'Smoothie Shot', price: 65 },
    { code: 'BA5', name: 'Toast Points', price: 75 },
  ],
  'main-course': [
    { code: 'BM1', name: 'Waffle Pancake', price: 150 },
    { code: 'BM2', name: 'French Toast', price: 120 },
    { code: 'BM3', name: 'Scrambled Eggs', price: 80 },
    { code: 'BM4', name: 'Bacon & Eggs', price: 200 },
    { code: 'BM5', name: 'Oatmeal Bowl', price: 90 },
    { code: 'BM6', name: 'Pancake Stack', price: 180 },
    { code: 'BM7', name: 'Breakfast Burrito', price: 160 },
    { code: 'BM8', name: 'Avocado Toast', price: 140 },
    { code: 'BM9', name: 'Eggs Benedict', price: 220 },
    { code: 'BM10', name: 'Breakfast Sandwich', price: 170 },
  ],
  desserts: [
    { code: 'BD1', name: 'Cinnamon Roll', price: 110 },
    { code: 'BD2', name: 'Muffin Assortment', price: 95 },
    { code: 'BD3', name: 'Croissant', price: 85 },
    { code: 'BD4', name: 'Donut Selection', price: 75 },
    { code: 'BD5', name: 'Fruit Tart', price: 130 },
  ],
  drinks: [
    { code: 'BR1', name: 'Coffee', price: 60 },
    { code: 'BR2', name: 'Orange Juice', price: 80 },
    { code: 'BR3', name: 'Smoothie Bowl', price: 130 },
    { code: 'BR4', name: 'Hot Chocolate', price: 90 },
    { code: 'BR5', name: 'Green Tea', price: 70 },
    { code: 'BR6', name: 'Milk', price: 50 },
  ],
};

// Lunch Menu
const lunchMenu = {
  appetizer: [
    { code: 'LA1', name: 'Bruschetta', price: 140 },
    { code: 'LA2', name: 'Soup of the Day', price: 120 },
    { code: 'LA3', name: 'Caesar Salad', price: 160 },
    { code: 'LA4', name: 'Garlic Bread', price: 80 },
    { code: 'LA5', name: 'Spring Rolls', price: 150 },
  ],
  'main-course': [
    { code: 'LM1', name: 'Grilled Chicken', price: 280 },
    { code: 'LM2', name: 'Pasta Carbonara', price: 220 },
    { code: 'LM3', name: 'Beef Burger', price: 250 },
    { code: 'LM4', name: 'Fish & Chips', price: 300 },
    { code: 'LM5', name: 'Pizza Margherita', price: 240 },
    { code: 'LM6', name: 'Steak Sandwich', price: 320 },
    { code: 'LM7', name: 'Vegetable Stir Fry', price: 200 },
    { code: 'LM8', name: 'Club Sandwich', price: 260 },
    { code: 'LM9', name: 'Salmon Fillet', price: 350 },
    { code: 'LM10', name: 'Rice Bowl', price: 180 },
  ],
  desserts: [
    { code: 'LD1', name: 'Chocolate Cake', price: 140 },
    { code: 'LD2', name: 'Ice Cream', price: 100 },
    { code: 'LD3', name: 'Cheesecake', price: 160 },
    { code: 'LD4', name: 'Apple Pie', price: 120 },
    { code: 'LD5', name: 'Tiramisu', price: 180 },
  ],
  drinks: [
    { code: 'LR1', name: 'Iced Tea', price: 80 },
    { code: 'LR2', name: 'Lemonade', price: 90 },
    { code: 'LR3', name: 'Soda', price: 70 },
    { code: 'LR4', name: 'Fresh Juice', price: 110 },
    { code: 'LR5', name: 'Mineral Water', price: 60 },
    { code: 'LR6', name: 'Coffee', price: 80 },
  ],
};

// Dinner Menu
const dinnerMenu = {
  appetizer: [
    { code: 'DA1', name: 'Shrimp Cocktail', price: 280 },
    { code: 'DA2', name: 'Bruschetta', price: 160 },
    { code: 'DA3', name: 'Spinach Dip', price: 140 },
    { code: 'DA4', name: 'Stuffed Mushrooms', price: 180 },
    { code: 'DA5', name: 'Calamari', price: 220 },
  ],
  'main-course': [
    { code: 'DM1', name: 'Grilled Salmon', price: 450 },
    { code: 'DM2', name: 'Beef Steak', price: 580 },
    { code: 'DM3', name: 'Chicken Marsala', price: 380 },
    { code: 'DM4', name: 'Pasta Primavera', price: 320 },
    { code: 'DM5', name: 'Lamb Chops', price: 520 },
    { code: 'DM6', name: 'Seafood Paella', price: 480 },
    { code: 'DM7', name: 'Vegetable Curry', price: 280 },
    { code: 'DM8', name: 'Pork Tenderloin', price: 420 },
    { code: 'DM9', name: 'Duck Confit', price: 550 },
    { code: 'DM10', name: 'Risotto', price: 340 },
  ],
  desserts: [
    { code: 'DD1', name: 'Chocolate Lava Cake', price: 200 },
    { code: 'DD2', name: 'Crème Brûlée', price: 180 },
    { code: 'DD3', name: 'New York Cheesecake', price: 160 },
    { code: 'DD4', name: 'Apple Crumble', price: 140 },
    { code: 'DD5', name: 'Tiramisu', price: 200 },
  ],
  drinks: [
    { code: 'DR1', name: 'Wine Selection', price: 300 },
    { code: 'DR2', name: 'Craft Beer', price: 180 },
    { code: 'DR3', name: 'Cocktail', price: 220 },
    { code: 'DR4', name: 'Fresh Juice', price: 120 },
    { code: 'DR5', name: 'Mineral Water', price: 80 },
    { code: 'DR6', name: 'Coffee', price: 100 },
  ],
};

export const useFoodList = () => {
  const getFoodItems = (menuType: MenuType, category: Category): FoodItem[] => {
    switch (menuType) {
      case 'breakfast':
        return breakfastMenu[category] || [];
      case 'lunch':
        return lunchMenu[category] || [];
      case 'dinner':
        return dinnerMenu[category] || [];
      default:
        return [];
    }
  };

  return { getFoodItems };
}; 