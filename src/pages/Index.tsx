import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface FoodItem {
  id: string;
  name: string;
  nutrition: NutritionData;
  amount: number;
}

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dailyGoal] = useState({ calories: 2000, protein: 150, carbs: 250, fat: 67 });
  const [consumedToday] = useState({ calories: 1247, protein: 89, carbs: 156, fat: 32 });
  const [recentFoods] = useState<FoodItem[]>([
    { id: '1', name: 'Куриная грудка', nutrition: { calories: 165, protein: 31, carbs: 0, fat: 3.6 }, amount: 150 },
    { id: '2', name: 'Овсянка', nutrition: { calories: 389, protein: 17, carbs: 66, fat: 7 }, amount: 50 },
    { id: '3', name: 'Банан', nutrition: { calories: 96, protein: 1.3, carbs: 23, fat: 0.2 }, amount: 118 },
    { id: '4', name: 'Миндаль', nutrition: { calories: 579, protein: 21, carbs: 22, fat: 49 }, amount: 30 },
  ]);

  const calculatePercentage = (current: number, goal: number) => (current / goal) * 100;

  const handleFoodSearch = (query: string) => {
    setSearchTerm(query);
    // Здесь будет логика поиска продуктов
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Icon name="Dumbbell" className="text-primary" size={32} />
              <h1 className="text-2xl font-bold text-primary">FitTracker</h1>
            </div>
            <nav className="flex space-x-8">
              <Button variant="ghost" className="text-slate-600 hover:text-primary">
                <Icon name="Home" className="mr-2" size={18} />
                Главная
              </Button>
              <Button variant="ghost" className="text-slate-600 hover:text-primary">
                <Icon name="Search" className="mr-2" size={18} />
                Продукты
              </Button>
              <Button variant="ghost" className="text-slate-600 hover:text-primary">
                <Icon name="BookOpen" className="mr-2" size={18} />
                Дневник
              </Button>
              <Button variant="ghost" className="text-slate-600 hover:text-primary">
                <Icon name="TrendingUp" className="mr-2" size={18} />
                Статистика
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Твой персональный <span className="text-primary">фитнес-трекер</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Отслеживай калории, белки, жиры и углеводы. Достигай своих целей с нашим умным помощником!
          </p>
        </div>

        {/* Main Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Daily Progress */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon name="Target" className="text-primary" size={24} />
                <span>Прогресс за сегодня</span>
              </CardTitle>
              <CardDescription>
                Твой прогресс по основным показателям питания
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Calories */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Калории</span>
                    <span className="text-sm text-slate-600">
                      {consumedToday.calories} / {dailyGoal.calories}
                    </span>
                  </div>
                  <Progress 
                    value={calculatePercentage(consumedToday.calories, dailyGoal.calories)} 
                    className="h-3"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Осталось: {dailyGoal.calories - consumedToday.calories} ккал</span>
                    <span>{Math.round(calculatePercentage(consumedToday.calories, dailyGoal.calories))}%</span>
                  </div>
                </div>

                {/* Protein */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Белки</span>
                    <span className="text-sm text-slate-600">
                      {consumedToday.protein} / {dailyGoal.protein}г
                    </span>
                  </div>
                  <Progress 
                    value={calculatePercentage(consumedToday.protein, dailyGoal.protein)} 
                    className="h-3"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Осталось: {dailyGoal.protein - consumedToday.protein}г</span>
                    <span>{Math.round(calculatePercentage(consumedToday.protein, dailyGoal.protein))}%</span>
                  </div>
                </div>

                {/* Carbs */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Углеводы</span>
                    <span className="text-sm text-slate-600">
                      {consumedToday.carbs} / {dailyGoal.carbs}г
                    </span>
                  </div>
                  <Progress 
                    value={calculatePercentage(consumedToday.carbs, dailyGoal.carbs)} 
                    className="h-3"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Осталось: {dailyGoal.carbs - consumedToday.carbs}г</span>
                    <span>{Math.round(calculatePercentage(consumedToday.carbs, dailyGoal.carbs))}%</span>
                  </div>
                </div>

                {/* Fat */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Жиры</span>
                    <span className="text-sm text-slate-600">
                      {consumedToday.fat} / {dailyGoal.fat}г
                    </span>
                  </div>
                  <Progress 
                    value={calculatePercentage(consumedToday.fat, dailyGoal.fat)} 
                    className="h-3"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Осталось: {dailyGoal.fat - consumedToday.fat}г</span>
                    <span>{Math.round(calculatePercentage(consumedToday.fat, dailyGoal.fat))}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon name="Activity" className="text-secondary" size={24} />
                <span>Быстрая статистика</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
                <div className="text-3xl font-bold text-primary mb-1">
                  {dailyGoal.calories - consumedToday.calories}
                </div>
                <div className="text-sm text-slate-600">ккал до цели</div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-slate-800">{consumedToday.protein}г</div>
                  <div className="text-xs text-slate-500">Белки</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-slate-800">{consumedToday.carbs}г</div>
                  <div className="text-xs text-slate-500">Углеводы</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-slate-800">{consumedToday.fat}г</div>
                  <div className="text-xs text-slate-500">Жиры</div>
                </div>
              </div>

              <div className="space-y-2">
                <Badge variant="outline" className="w-full justify-center py-2">
                  <Icon name="Calendar" className="mr-2" size={16} />
                  День 15 из 30
                </Badge>
                <Badge variant="outline" className="w-full justify-center py-2">
                  <Icon name="Award" className="mr-2" size={16} />
                  Цель на месяц: -3кг
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Food Search and Recent Foods */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Food Search */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon name="Search" className="text-accent" size={24} />
                <span>Поиск продуктов</span>
              </CardTitle>
              <CardDescription>
                Найди продукт и узнай его питательную ценность
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    placeholder="Введи название продукта..."
                    value={searchTerm}
                    onChange={(e) => handleFoodSearch(e.target.value)}
                    className="pl-10"
                  />
                  <Icon name="Search" className="absolute left-3 top-3 text-slate-400" size={16} />
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-800">Популярные продукты:</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Яйцо', 'Рис', 'Творог', 'Гречка', 'Говядина', 'Молоко'].map((food) => (
                      <Badge key={food} variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                        {food}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full">
                  <Icon name="Plus" className="mr-2" size={16} />
                  Добавить продукт
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Foods */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon name="Clock" className="text-primary" size={24} />
                <span>Недавние продукты</span>
              </CardTitle>
              <CardDescription>
                Быстро добавь продукты, которые ты недавно ел
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentFoods.map((food) => (
                  <div key={food.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-800">{food.name}</h4>
                      <p className="text-sm text-slate-600">
                        {food.nutrition.calories} ккал, {food.nutrition.protein}г белка
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Icon name="Plus" size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Preview */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-slate-800 mb-8">Все возможности в одном приложении</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Icon name="Smartphone" className="text-primary mx-auto mb-4" size={40} />
              <h4 className="font-semibold text-slate-800 mb-2">Сканер штрих-кодов</h4>
              <p className="text-sm text-slate-600">Быстро сканируй продукты и получай всю информацию о БЖУ</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Icon name="Users" className="text-secondary mx-auto mb-4" size={40} />
              <h4 className="font-semibold text-slate-800 mb-2">Социальные функции</h4>
              <p className="text-sm text-slate-600">Соревнуйся с друзьями и участвуй в челленджах</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Icon name="Trophy" className="text-accent mx-auto mb-4" size={40} />
              <h4 className="font-semibold text-slate-800 mb-2">Достижения</h4>
              <p className="text-sm text-slate-600">Получай награды за достижение целей и мотивируйся</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;