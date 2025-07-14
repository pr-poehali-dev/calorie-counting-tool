import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { Product, searchProducts, getProductById } from '@/data/products';

interface CalculatedNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
}

interface DiaryEntry {
  id: string;
  product: Product;
  weight: number;
  nutrition: CalculatedNutrition;
  timestamp: Date;
}

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [weight, setWeight] = useState<string>('100');
  const [calculatedNutrition, setCalculatedNutrition] = useState<CalculatedNutrition | null>(null);
  const [diary, setDiary] = useState<DiaryEntry[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const dailyTotals = diary.reduce((total, entry) => ({
    calories: total.calories + entry.nutrition.calories,
    protein: total.protein + entry.nutrition.protein,
    carbs: total.carbs + entry.nutrition.carbs,
    fat: total.fat + entry.nutrition.fat,
    fiber: total.fiber + (entry.nutrition.fiber || 0)
  }), { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });

  useEffect(() => {
    if (searchTerm.trim()) {
      const results = searchProducts(searchTerm);
      setSearchResults(results);
      setShowDropdown(true);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (selectedProduct && weight) {
      const weightNum = parseFloat(weight) || 0;
      const multiplier = weightNum / 100;
      
      setCalculatedNutrition({
        calories: Math.round(selectedProduct.calories * multiplier * 10) / 10,
        protein: Math.round(selectedProduct.protein * multiplier * 10) / 10,
        carbs: Math.round(selectedProduct.carbs * multiplier * 10) / 10,
        fat: Math.round(selectedProduct.fat * multiplier * 10) / 10,
        fiber: selectedProduct.fiber ? Math.round(selectedProduct.fiber * multiplier * 10) / 10 : undefined
      });
    } else {
      setCalculatedNutrition(null);
    }
  }, [selectedProduct, weight]);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setSearchTerm(product.name);
    setShowDropdown(false);
  };

  const handleAddToDiary = () => {
    if (selectedProduct && calculatedNutrition && weight) {
      const newEntry: DiaryEntry = {
        id: Date.now().toString(),
        product: selectedProduct,
        weight: parseFloat(weight),
        nutrition: calculatedNutrition,
        timestamp: new Date()
      };
      
      setDiary([newEntry, ...diary]);
      setSearchTerm('');
      setSelectedProduct(null);
      setWeight('100');
      setCalculatedNutrition(null);
    }
  };

  const handleRemoveFromDiary = (id: string) => {
    setDiary(diary.filter(entry => entry.id !== id));
  };

  const handleClearDiary = () => {
    setDiary([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Icon name="Calculator" className="text-primary" size={32} />
              <h1 className="text-2xl font-bold text-primary">Калькулятор КБЖУ</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="text-sm">
                Более 50 продуктов
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Быстрый подсчет <span className="text-primary">калорий и БЖУ</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Введи название продукта и вес — мгновенно получи полную информацию о калориях, белках, жирах и углеводах
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="Search" className="text-primary" size={24} />
                  <span>Калькулятор продуктов</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Product Search */}
                <div className="relative">
                  <div className="relative">
                    <Input
                      placeholder="Начни вводить название продукта..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                    <Icon name="Search" className="absolute left-3 top-3 text-slate-400" size={16} />
                  </div>
                  
                  {/* Search Results Dropdown */}
                  {showDropdown && searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => handleProductSelect(product)}
                          className="px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-b-0"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium text-slate-800">{product.name}</div>
                              <div className="text-sm text-slate-500">{product.category}</div>
                            </div>
                            <div className="text-sm text-slate-600">
                              {product.calories} ккал/100г
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Weight Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Вес продукта (грамм)</label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="100"
                      className="pr-12"
                      min="1"
                    />
                    <span className="absolute right-3 top-3 text-slate-500 text-sm">г</span>
                  </div>
                </div>

                {/* Calculated Results */}
                {calculatedNutrition && selectedProduct && (
                  <div className="space-y-4 p-4 bg-slate-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-slate-800">
                        {selectedProduct.name} ({weight}г)
                      </h3>
                      <Badge variant="outline">{selectedProduct.category}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-primary">
                          {calculatedNutrition.calories}
                        </div>
                        <div className="text-sm text-slate-600">ккал</div>
                      </div>
                      
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-secondary">
                          {calculatedNutrition.protein}
                        </div>
                        <div className="text-sm text-slate-600">белки (г)</div>
                      </div>
                      
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-accent">
                          {calculatedNutrition.carbs}
                        </div>
                        <div className="text-sm text-slate-600">углеводы (г)</div>
                      </div>
                      
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-orange-500">
                          {calculatedNutrition.fat}
                        </div>
                        <div className="text-sm text-slate-600">жиры (г)</div>
                      </div>
                    </div>

                    {calculatedNutrition.fiber && (
                      <div className="text-center">
                        <div className="text-sm text-slate-600">
                          Клетчатка: <span className="font-semibold">{calculatedNutrition.fiber}г</span>
                        </div>
                      </div>
                    )}

                    <Button onClick={handleAddToDiary} className="w-full">
                      <Icon name="Plus" className="mr-2" size={16} />
                      Добавить в дневник
                    </Button>
                  </div>
                )}

                {/* Popular Products */}
                <div className="space-y-3">
                  <h4 className="font-medium text-slate-800">Популярные продукты:</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Куриная грудка', 'Овсянка', 'Яйцо куриное', 'Творог 5%', 'Рис белый', 'Банан'].map((name) => (
                      <Badge
                        key={name}
                        variant="secondary"
                        className="cursor-pointer hover:bg-secondary/80"
                        onClick={() => setSearchTerm(name)}
                      >
                        {name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Daily Totals */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Calendar" className="text-primary" size={24} />
                    <span>Итого за день</span>
                  </div>
                  {diary.length > 0 && (
                    <Button variant="outline" size="sm" onClick={handleClearDiary}>
                      <Icon name="Trash2" size={14} />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-primary/10 rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        {Math.round(dailyTotals.calories)}
                      </div>
                      <div className="text-sm text-slate-600">ккал</div>
                    </div>
                    
                    <div className="text-center p-3 bg-secondary/10 rounded-lg">
                      <div className="text-2xl font-bold text-secondary">
                        {Math.round(dailyTotals.protein * 10) / 10}
                      </div>
                      <div className="text-sm text-slate-600">белки (г)</div>
                    </div>
                    
                    <div className="text-center p-3 bg-accent/10 rounded-lg">
                      <div className="text-2xl font-bold text-accent">
                        {Math.round(dailyTotals.carbs * 10) / 10}
                      </div>
                      <div className="text-sm text-slate-600">углеводы (г)</div>
                    </div>
                    
                    <div className="text-center p-3 bg-orange-500/10 rounded-lg">
                      <div className="text-2xl font-bold text-orange-500">
                        {Math.round(dailyTotals.fat * 10) / 10}
                      </div>
                      <div className="text-sm text-slate-600">жиры (г)</div>
                    </div>
                  </div>

                  {dailyTotals.fiber > 0 && (
                    <div className="text-center p-2 bg-slate-100 rounded-lg">
                      <div className="text-sm text-slate-600">
                        Клетчатка: <span className="font-semibold">{Math.round(dailyTotals.fiber * 10) / 10}г</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Diary */}
            {diary.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="BookOpen" className="text-secondary" size={24} />
                    <span>Дневник питания</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {diary.map((entry) => (
                      <div key={entry.id} className="p-3 bg-slate-50 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="font-medium text-slate-800">
                              {entry.product.name}
                            </div>
                            <div className="text-sm text-slate-600">
                              {entry.weight}г
                            </div>
                            <div className="text-sm text-slate-500">
                              {entry.nutrition.calories} ккал, {entry.nutrition.protein}г белка
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveFromDiary(entry.id)}
                          >
                            <Icon name="X" size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-slate-800 mb-8">Преимущества калькулятора</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <Icon name="Zap" className="text-primary mx-auto mb-4" size={40} />
              <h4 className="font-semibold text-slate-800 mb-2">Мгновенный расчет</h4>
              <p className="text-sm text-slate-600">Получай точные данные о КБЖУ в режиме реального времени</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <Icon name="Database" className="text-secondary mx-auto mb-4" size={40} />
              <h4 className="font-semibold text-slate-800 mb-2">Большая база продуктов</h4>
              <p className="text-sm text-slate-600">Более 50 популярных продуктов с точными данными</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <Icon name="BarChart3" className="text-accent mx-auto mb-4" size={40} />
              <h4 className="font-semibold text-slate-800 mb-2">Дневник питания</h4>
              <p className="text-sm text-slate-600">Отслеживай потребление калорий и БЖУ за день</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;