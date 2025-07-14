export interface Product {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  category: string;
}

export const products: Product[] = [
  // Мясо и птица
  { id: '1', name: 'Куриная грудка', calories: 165, protein: 31, carbs: 0, fat: 3.6, category: 'Мясо' },
  { id: '2', name: 'Говядина', calories: 250, protein: 26, carbs: 0, fat: 15, category: 'Мясо' },
  { id: '3', name: 'Свинина', calories: 242, protein: 16, carbs: 0, fat: 21, category: 'Мясо' },
  { id: '4', name: 'Индейка', calories: 157, protein: 29, carbs: 0, fat: 2, category: 'Мясо' },
  { id: '5', name: 'Баранина', calories: 294, protein: 25, carbs: 0, fat: 21, category: 'Мясо' },
  
  // Рыба и морепродукты
  { id: '6', name: 'Лосось', calories: 208, protein: 20, carbs: 0, fat: 13, category: 'Рыба' },
  { id: '7', name: 'Тунец', calories: 144, protein: 23, carbs: 0, fat: 5, category: 'Рыба' },
  { id: '8', name: 'Треска', calories: 105, protein: 23, carbs: 0, fat: 0.9, category: 'Рыба' },
  { id: '9', name: 'Креветки', calories: 99, protein: 24, carbs: 0, fat: 0.3, category: 'Рыба' },
  { id: '10', name: 'Скумбрия', calories: 305, protein: 20, carbs: 0, fat: 25, category: 'Рыба' },
  
  // Молочные продукты
  { id: '11', name: 'Творог 5%', calories: 121, protein: 17, carbs: 1.8, fat: 5, category: 'Молочное' },
  { id: '12', name: 'Молоко 2.5%', calories: 52, protein: 2.8, carbs: 4.7, fat: 2.5, category: 'Молочное' },
  { id: '13', name: 'Кефир 2.5%', calories: 51, protein: 2.8, carbs: 4, fat: 2.5, category: 'Молочное' },
  { id: '14', name: 'Сметана 20%', calories: 206, protein: 2.8, carbs: 3.2, fat: 20, category: 'Молочное' },
  { id: '15', name: 'Йогурт натуральный', calories: 66, protein: 5, carbs: 3.5, fat: 3.3, category: 'Молочное' },
  
  // Яйца
  { id: '16', name: 'Яйцо куриное', calories: 157, protein: 12.7, carbs: 0.7, fat: 11.5, category: 'Яйца' },
  { id: '17', name: 'Яичный белок', calories: 52, protein: 11, carbs: 0.7, fat: 0.2, category: 'Яйца' },
  { id: '18', name: 'Яичный желток', calories: 322, protein: 16, carbs: 0.6, fat: 27, category: 'Яйца' },
  
  // Крупы и злаки
  { id: '19', name: 'Овсянка', calories: 389, protein: 17, carbs: 66, fat: 7, fiber: 10, category: 'Крупы' },
  { id: '20', name: 'Гречка', calories: 313, protein: 13, carbs: 62, fat: 3.3, fiber: 18, category: 'Крупы' },
  { id: '21', name: 'Рис белый', calories: 344, protein: 6.7, carbs: 78, fat: 0.7, fiber: 3, category: 'Крупы' },
  { id: '22', name: 'Рис бурый', calories: 337, protein: 6.3, carbs: 65, fat: 4.4, fiber: 8, category: 'Крупы' },
  { id: '23', name: 'Перловка', calories: 320, protein: 9.3, carbs: 67, fat: 1.1, fiber: 15, category: 'Крупы' },
  { id: '24', name: 'Киноа', calories: 368, protein: 14, carbs: 57, fat: 6, fiber: 7, category: 'Крупы' },
  
  // Хлеб и выпечка
  { id: '25', name: 'Хлеб черный', calories: 214, protein: 4.7, carbs: 40, fat: 3.9, fiber: 13, category: 'Хлеб' },
  { id: '26', name: 'Хлеб белый', calories: 242, protein: 8.1, carbs: 48, fat: 3.2, fiber: 9, category: 'Хлеб' },
  { id: '27', name: 'Хлебцы', calories: 295, protein: 10, carbs: 57, fat: 2.3, fiber: 18, category: 'Хлеб' },
  
  // Овощи
  { id: '28', name: 'Брокколи', calories: 34, protein: 2.8, carbs: 6.6, fat: 0.4, fiber: 2.6, category: 'Овощи' },
  { id: '29', name: 'Морковь', calories: 41, protein: 0.9, carbs: 9.6, fat: 0.2, fiber: 2.8, category: 'Овощи' },
  { id: '30', name: 'Помидоры', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2, category: 'Овощи' },
  { id: '31', name: 'Огурцы', calories: 15, protein: 0.8, carbs: 2.5, fat: 0.1, fiber: 1, category: 'Овощи' },
  { id: '32', name: 'Картофель', calories: 77, protein: 2, carbs: 17, fat: 0.1, fiber: 2.2, category: 'Овощи' },
  { id: '33', name: 'Лук', calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1, fiber: 1.7, category: 'Овощи' },
  { id: '34', name: 'Шпинат', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, category: 'Овощи' },
  
  // Фрукты
  { id: '35', name: 'Яблоко', calories: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4, category: 'Фрукты' },
  { id: '36', name: 'Банан', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, category: 'Фрукты' },
  { id: '37', name: 'Апельсин', calories: 47, protein: 0.9, carbs: 12, fat: 0.1, fiber: 2.4, category: 'Фрукты' },
  { id: '38', name: 'Груша', calories: 57, protein: 0.4, carbs: 15, fat: 0.1, fiber: 3.1, category: 'Фрукты' },
  { id: '39', name: 'Виноград', calories: 62, protein: 0.6, carbs: 16, fat: 0.2, fiber: 0.9, category: 'Фрукты' },
  { id: '40', name: 'Клубника', calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3, fiber: 2, category: 'Фрукты' },
  
  // Орехи и семена
  { id: '41', name: 'Миндаль', calories: 579, protein: 21, carbs: 22, fat: 49, fiber: 12, category: 'Орехи' },
  { id: '42', name: 'Грецкий орех', calories: 654, protein: 15, carbs: 14, fat: 65, fiber: 7, category: 'Орехи' },
  { id: '43', name: 'Фундук', calories: 628, protein: 15, carbs: 17, fat: 61, fiber: 10, category: 'Орехи' },
  { id: '44', name: 'Семена подсолнечника', calories: 584, protein: 21, carbs: 20, fat: 52, fiber: 9, category: 'Орехи' },
  { id: '45', name: 'Семена тыквы', calories: 559, protein: 19, carbs: 54, fat: 19, fiber: 6, category: 'Орехи' },
  
  // Бобовые
  { id: '46', name: 'Чечевица', calories: 353, protein: 24, carbs: 48, fat: 1.5, fiber: 11, category: 'Бобовые' },
  { id: '47', name: 'Нут', calories: 378, protein: 20, carbs: 46, fat: 6, fiber: 9.9, category: 'Бобовые' },
  { id: '48', name: 'Фасоль', calories: 245, protein: 21, carbs: 22, fat: 2, fiber: 16, category: 'Бобовые' },
  { id: '49', name: 'Горох', calories: 298, protein: 20, carbs: 49, fat: 2, fiber: 11, category: 'Бобовые' },
  
  // Масла и жиры
  { id: '50', name: 'Оливковое масло', calories: 884, protein: 0, carbs: 0, fat: 100, category: 'Масла' },
  { id: '51', name: 'Подсолнечное масло', calories: 884, protein: 0, carbs: 0, fat: 100, category: 'Масла' },
  { id: '52', name: 'Сливочное масло', calories: 717, protein: 0.8, carbs: 0.6, fat: 78, category: 'Масла' },
  { id: '53', name: 'Авокадо', calories: 160, protein: 2, carbs: 9, fat: 15, fiber: 7, category: 'Фрукты' },
];

export const searchProducts = (query: string): Product[] => {
  if (!query.trim()) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return products.filter(product => 
    product.name.toLowerCase().includes(normalizedQuery)
  ).slice(0, 10);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getAllCategories = (): string[] => {
  return [...new Set(products.map(product => product.category))];
};