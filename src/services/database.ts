import * as SQLite from 'expo-sqlite';

export interface User {
  id?: number;
  username: string;
  password: string;
  role: 'admin' | 'cashier';
  full_name: string;
  is_active?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id?: number;
  name: string;
  description?: string;
  is_active?: number;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Subcategory {
  id?: number;
  category_id: number;
  name: string;
  description?: string;
  is_active?: number;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface FoodItem {
  id?: number;
  subcategory_id: number;
  name: string;
  description?: string;
  price: number;
  cost?: number;
  image_path?: string;
  is_available?: number;
  stock_quantity?: number;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Transaction {
  id?: number;
  transaction_number: string;
  cashier_id: number;
  total_amount: number;
  tax_amount?: number;
  discount_amount?: number;
  payment_method?: 'cash' | 'card' | 'digital';
  payment_received: number;
  change_amount?: number;
  status?: 'completed' | 'cancelled' | 'refunded';
  notes?: string;
  created_at?: string;
}

export interface TransactionItem {
  id?: number;
  transaction_id: number;
  food_item_id: number;
  quantity: number;
  unit_price: number;
  subtotal: number;
  notes?: string;
  created_at?: string;
}

class DatabaseService {
  private db: SQLite.SQLiteDatabase | null = null;

  async initDatabase(): Promise<void> {
    try {
      this.db = await SQLite.openDatabaseAsync('lilypay.db');
      await this.createTables();
      await this.insertDefaultData();
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }

  private async createTables(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const schema = `
      -- Users table for authentication (Admin and Cashier)
      CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          role TEXT NOT NULL CHECK (role IN ('admin', 'cashier')),
          full_name TEXT NOT NULL,
          is_active INTEGER DEFAULT 1 CHECK (is_active IN (0, 1)),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      -- Categories table (Breakfast, Lunch, Dinner, etc.)
      CREATE TABLE IF NOT EXISTS categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT UNIQUE NOT NULL,
          description TEXT,
          is_active INTEGER DEFAULT 1 CHECK (is_active IN (0, 1)),
          display_order INTEGER DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      -- Subcategories table (Appetizer, Main Course, Desserts, Beverages)
      CREATE TABLE IF NOT EXISTS subcategories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          category_id INTEGER NOT NULL,
          name TEXT NOT NULL,
          description TEXT,
          is_active INTEGER DEFAULT 1 CHECK (is_active IN (0, 1)),
          display_order INTEGER DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
          UNIQUE(category_id, name)
      );

      -- Food items table
      CREATE TABLE IF NOT EXISTS food_items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          subcategory_id INTEGER NOT NULL,
          name TEXT NOT NULL,
          description TEXT,
          price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
          cost DECIMAL(10, 2) DEFAULT 0 CHECK (cost >= 0),
          image_path TEXT,
          is_available INTEGER DEFAULT 1 CHECK (is_available IN (0, 1)),
          stock_quantity INTEGER DEFAULT 0,
          display_order INTEGER DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (subcategory_id) REFERENCES subcategories(id) ON DELETE CASCADE
      );

      -- Transactions table (Sales records)
      CREATE TABLE IF NOT EXISTS transactions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          transaction_number TEXT UNIQUE NOT NULL,
          cashier_id INTEGER NOT NULL,
          total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0),
          tax_amount DECIMAL(10, 2) DEFAULT 0 CHECK (tax_amount >= 0),
          discount_amount DECIMAL(10, 2) DEFAULT 0 CHECK (discount_amount >= 0),
          payment_method TEXT DEFAULT 'cash' CHECK (payment_method IN ('cash', 'card', 'digital')),
          payment_received DECIMAL(10, 2) NOT NULL CHECK (payment_received >= 0),
          change_amount DECIMAL(10, 2) DEFAULT 0 CHECK (change_amount >= 0),
          status TEXT DEFAULT 'completed' CHECK (status IN ('completed', 'cancelled', 'refunded')),
          notes TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (cashier_id) REFERENCES users(id)
      );

      -- Transaction items table (Items in each transaction)
      CREATE TABLE IF NOT EXISTS transaction_items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          transaction_id INTEGER NOT NULL,
          food_item_id INTEGER NOT NULL,
          quantity INTEGER NOT NULL CHECK (quantity > 0),
          unit_price DECIMAL(10, 2) NOT NULL CHECK (unit_price >= 0),
          subtotal DECIMAL(10, 2) NOT NULL CHECK (subtotal >= 0),
          notes TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE,
          FOREIGN KEY (food_item_id) REFERENCES food_items(id)
      );
    `;

    await this.db.execAsync(schema);
  }

  private async insertDefaultData(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    // Check if data already exists
    const userCount = await this.getUserCount();
    if (userCount > 0) return; // Data already exists

    const defaultData = `
      -- Insert default users (admin and cashier)
      INSERT INTO users (username, password, role, full_name) VALUES 
      ('admin', 'admin123', 'admin', 'System Administrator'),
      ('cashier', 'cashier123', 'cashier', 'Default Cashier');

      -- Insert default categories
      INSERT INTO categories (name, description, display_order) VALUES 
      ('Breakfast', 'Morning meals and items', 1),
      ('Lunch', 'Midday meals and items', 2),
      ('Dinner', 'Evening meals and items', 3);

      -- Insert default subcategories
      INSERT INTO subcategories (category_id, name, description, display_order) VALUES 
      -- Breakfast subcategories
      (1, 'Appetizer', 'Light breakfast starters', 1),
      (1, 'Main Course', 'Main breakfast dishes', 2),
      (1, 'Desserts', 'Sweet breakfast treats', 3),
      (1, 'Beverages', 'Morning drinks', 4),
      -- Lunch subcategories
      (2, 'Appetizer', 'Light lunch starters', 1),
      (2, 'Main Course', 'Main lunch dishes', 2),
      (2, 'Desserts', 'Lunch desserts', 3),
      (2, 'Beverages', 'Lunch drinks', 4),
      -- Dinner subcategories
      (3, 'Appetizer', 'Evening starters', 1),
      (3, 'Main Course', 'Main dinner dishes', 2),
      (3, 'Desserts', 'Evening desserts', 3),
      (3, 'Beverages', 'Evening drinks', 4);

      -- Insert sample food items
      INSERT INTO food_items (subcategory_id, name, description, price, cost, stock_quantity) VALUES 
      -- Breakfast items
      (1, 'Fresh Fruit Bowl', 'Seasonal mixed fruits', 8.50, 4.00, 20),
      (2, 'Pancake Stack', 'Three fluffy pancakes with syrup', 12.00, 5.50, 15),
      (2, 'Eggs Benedict', 'Poached eggs on English muffin', 14.50, 7.00, 10),
      (3, 'Blueberry Muffin', 'Fresh baked muffin', 4.50, 2.00, 25),
      (4, 'Fresh Orange Juice', 'Freshly squeezed orange juice', 3.50, 1.50, 30),
      (4, 'Coffee', 'House blend coffee', 2.50, 0.80, 50),
      -- Lunch items
      (6, 'Caesar Salad', 'Crisp romaine with Caesar dressing', 11.00, 5.50, 18),
      (7, 'Grilled Chicken Sandwich', 'Grilled chicken breast sandwich', 13.50, 6.75, 12),
      (7, 'Beef Burger', 'Quarter pound beef patty', 15.00, 7.50, 10),
      (8, 'Chocolate Cake', 'Rich chocolate layer cake', 6.50, 3.00, 8),
      (9, 'Iced Tea', 'Refreshing iced tea', 2.75, 1.00, 40);
    `;

    await this.db.execAsync(defaultData);
  }

  private async getUserCount(): Promise<number> {
    if (!this.db) throw new Error('Database not initialized');
    const result = await this.db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM users');
    return result?.count || 0;
  }

  // User methods
  async authenticateUser(username: string, password: string): Promise<User | null> {
    if (!this.db) throw new Error('Database not initialized');
    const user = await this.db.getFirstAsync<User>(
      'SELECT * FROM users WHERE username = ? AND password = ? AND is_active = 1',
      [username, password]
    );
    return user || null;
  }

  async getUsers(): Promise<User[]> {
    if (!this.db) throw new Error('Database not initialized');
    return await this.db.getAllAsync<User>('SELECT * FROM users ORDER BY created_at DESC');
  }

  async createUser(user: User): Promise<number> {
    if (!this.db) throw new Error('Database not initialized');
    const result = await this.db.runAsync(
      'INSERT INTO users (username, password, role, full_name) VALUES (?, ?, ?, ?)',
      [user.username, user.password, user.role, user.full_name]
    );
    return result.lastInsertRowId;
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    if (!this.db) throw new Error('Database not initialized');
    return await this.db.getAllAsync<Category>(
      'SELECT * FROM categories WHERE is_active = 1 ORDER BY display_order, name'
    );
  }

  async createCategory(category: Category): Promise<number> {
    if (!this.db) throw new Error('Database not initialized');
    const result = await this.db.runAsync(
      'INSERT INTO categories (name, description, display_order) VALUES (?, ?, ?)',
      [category.name, category.description, category.display_order || 0]
    );
    return result.lastInsertRowId;
  }

  // Subcategory methods
  async getSubcategories(categoryId?: number): Promise<Subcategory[]> {
    if (!this.db) throw new Error('Database not initialized');
    if (categoryId) {
      return await this.db.getAllAsync<Subcategory>(
        'SELECT * FROM subcategories WHERE category_id = ? AND is_active = 1 ORDER BY display_order, name',
        [categoryId]
      );
    }
    return await this.db.getAllAsync<Subcategory>(
      'SELECT * FROM subcategories WHERE is_active = 1 ORDER BY category_id, display_order, name'
    );
  }

  // Food item methods
  async getFoodItems(subcategoryId?: number): Promise<FoodItem[]> {
    if (!this.db) throw new Error('Database not initialized');
    if (subcategoryId) {
      return await this.db.getAllAsync<FoodItem>(
        'SELECT * FROM food_items WHERE subcategory_id = ? AND is_available = 1 ORDER BY display_order, name',
        [subcategoryId]
      );
    }
    return await this.db.getAllAsync<FoodItem>(
      'SELECT * FROM food_items WHERE is_available = 1 ORDER BY subcategory_id, display_order, name'
    );
  }

  async getFoodItemsWithDetails(): Promise<any[]> {
    if (!this.db) throw new Error('Database not initialized');
    return await this.db.getAllAsync(`
      SELECT 
        fi.id,
        fi.name as food_name,
        fi.description as food_description,
        fi.price,
        fi.cost,
        fi.is_available,
        fi.stock_quantity,
        sc.name as subcategory_name,
        c.name as category_name,
        c.id as category_id,
        sc.id as subcategory_id
      FROM food_items fi
      JOIN subcategories sc ON fi.subcategory_id = sc.id
      JOIN categories c ON sc.category_id = c.id
      WHERE fi.is_available = 1 AND sc.is_active = 1 AND c.is_active = 1
      ORDER BY c.display_order, sc.display_order, fi.display_order
    `);
  }

  // Transaction methods
  async createTransaction(transaction: Transaction, items: Omit<TransactionItem, 'id' | 'transaction_id' | 'created_at'>[]): Promise<number> {
    if (!this.db) throw new Error('Database not initialized');
    
    await this.db.runAsync('BEGIN TRANSACTION');
    
    try {
      // Create transaction
      const transactionResult = await this.db.runAsync(
        `INSERT INTO transactions (
          transaction_number, cashier_id, total_amount, tax_amount, discount_amount,
          payment_method, payment_received, change_amount, status, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          transaction.transaction_number,
          transaction.cashier_id,
          transaction.total_amount,
          transaction.tax_amount || 0,
          transaction.discount_amount || 0,
          transaction.payment_method || 'cash',
          transaction.payment_received,
          transaction.change_amount || 0,
          transaction.status || 'completed',
          transaction.notes
        ]
      );

      const transactionId = transactionResult.lastInsertRowId;

      // Create transaction items
      for (const item of items) {
        await this.db.runAsync(
          'INSERT INTO transaction_items (transaction_id, food_item_id, quantity, unit_price, subtotal, notes) VALUES (?, ?, ?, ?, ?, ?)',
          [transactionId, item.food_item_id, item.quantity, item.unit_price, item.subtotal, item.notes]
        );
      }

      await this.db.runAsync('COMMIT');
      return transactionId;
    } catch (error) {
      await this.db.runAsync('ROLLBACK');
      throw error;
    }
  }

  async getTransactions(limit: number = 50): Promise<any[]> {
    if (!this.db) throw new Error('Database not initialized');
    return await this.db.getAllAsync(`
      SELECT 
        t.id,
        t.transaction_number,
        t.total_amount,
        t.payment_method,
        t.status,
        t.created_at,
        u.full_name as cashier_name,
        COUNT(ti.id) as item_count
      FROM transactions t
      JOIN users u ON t.cashier_id = u.id
      LEFT JOIN transaction_items ti ON t.id = ti.transaction_id
      GROUP BY t.id, t.transaction_number, t.total_amount, t.payment_method, t.status, t.created_at, u.full_name
      ORDER BY t.created_at DESC
      LIMIT ?
    `, [limit]);
  }

  async getDailySales(): Promise<any[]> {
    if (!this.db) throw new Error('Database not initialized');
    return await this.db.getAllAsync(`
      SELECT 
        DATE(created_at) as sale_date,
        COUNT(*) as transaction_count,
        SUM(total_amount) as total_sales,
        AVG(total_amount) as average_sale,
        SUM(CASE WHEN payment_method = 'cash' THEN total_amount ELSE 0 END) as cash_sales,
        SUM(CASE WHEN payment_method = 'card' THEN total_amount ELSE 0 END) as card_sales
      FROM transactions 
      WHERE status = 'completed'
      GROUP BY DATE(created_at)
      ORDER BY sale_date DESC
    `);
  }

  // Utility methods
  async generateTransactionNumber(): Promise<string> {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const timeStr = date.toTimeString().slice(0, 8).replace(/:/g, '');
    return `TXN${dateStr}${timeStr}`;
  }

  async closeDatabase(): Promise<void> {
    if (this.db) {
      await this.db.closeAsync();
      this.db = null;
    }
  }
}

export const databaseService = new DatabaseService(); 