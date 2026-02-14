import { Category, CollectionRecipe, Recipe } from "@/types";

export const CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Main Dishes",
    slug: "main-dishes",
    description:
      "The heart of every meal. Discover hearty, soulful recipes designed to be the centerpiece of your dining table, from slow-cooked meats to artisanal pasta.",
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "2",
    name: "Desserts",
    slug: "desserts",
    description:
      "A sweet conclusion to your culinary journey. Explore delicate pastries, rich chocolates, and fruit-forward treats that celebrate the joy of baking.",
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "3",
    name: "Healthy",
    slug: "healthy",
    description:
      "Nourishment that feels like an indulgence. Fresh, seasonal ingredients brought together in vibrant bowls and light plates that fuel both body and spirit.",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "4",
    name: "Quick Meals",
    slug: "quick-meals",
    description:
      "Authentic flavor, prepared with efficiency. For the busy home cook who refuses to compromise on quality, even when time is of the essence.",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "5",
    name: "World Cuisine",
    slug: "world-cuisine",
    description:
      "A passport for your palate. Authentic recipes gathered from corners of the globe, bringing the spices and stories of far-off places to your kitchen.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "6",
    name: "Breakfast",
    slug: "breakfast",
    description:
      "The quiet beauty of the morning. Savor slow starts with recipes that turn the first meal of the day into a ritual of warmth and preparation.",
    image:
      "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=1200",
  },
];

export const CATEGORY_ITEMS = [
  { name: "Breakfast", icon: "🍳" },
  { name: "Main Dishes", icon: "🍲" },
  { name: "Healthy", icon: "🥗" },
  { name: "Desserts", icon: "🍰" },
  { name: "Quick Eats", icon: "⏱️" },
  { name: "World Cuisine", icon: "🌍" },
];

export const ALL_RECIPES: Recipe[] = [
  {
    id: "r1",
    title: "Rustic Sourdough Panzanella",
    slug: "rustic-sourdough-panzanella",
    description:
      "A vibrant Tuscan classic featuring sun-ripened tomatoes and toasted artisanal sourdough cubes tossed in aged balsamic.",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
    additionalImages: [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800",
    ],
    prepTime: "20 min",
    difficulty: "Easy",
    isPremium: true,
    category: "healthy",
    isPopular: true,
    ingredients: [
      "4 cups cubed day-old sourdough",
      "2 lbs ripe heirloom tomatoes",
      "1/2 red onion, thinly sliced",
      "1/2 cup fresh basil leaves",
      "3 tbsp extra virgin olive oil",
      "2 tbsp aged balsamic vinegar",
      "Flaky sea salt & cracked pepper",
    ],
    instructions: [
      "Preheat your oven to 350°F and toast sourdough cubes until golden and crisp.",
      "Cut the tomatoes into bite-sized wedges and place in a large ceramic bowl.",
      "Add the sliced red onion and torn basil leaves to the tomatoes.",
      "Whisk olive oil and balsamic vinegar until emulsified, then drizzle over the vegetables.",
      "Toss in the toasted bread cubes and let sit for 10 minutes to absorb the juices before serving.",
    ],
  },
  {
    id: "r2",
    title: "Slow-Roasted Lamb with Herbs",
    slug: "slow-roasted-lamb-with-herbs",
    description:
      "Tender, succulent leg of lamb marinated in a secret blend of rosemary, garlic, and wild mountain honey.",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
    additionalImages: [
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800",
    ],
    prepTime: "3 hrs",
    difficulty: "Advanced",
    isPremium: true,
    category: "main-dishes",
    isPopular: true,
    ingredients: [
      "4lb bone-in leg of lamb",
      "6 cloves garlic, slivered",
      "3 sprigs fresh rosemary",
      "1/4 cup local honey",
      "1/2 cup dry white wine",
      "Coarse sea salt",
    ],
    instructions: [
      "Score the lamb and insert garlic slivers and rosemary sprigs into the cuts.",
      "Rub the entire joint with salt and honey, then let rest for 30 minutes.",
      "Roast at 320°F for 2.5 hours, basting occasionally with white wine.",
      "Increase heat to 425°F for the final 15 minutes to develop a dark, honeyed crust.",
      "Rest for at least 20 minutes before carving thin slices.",
    ],
  },
  {
    id: "r3",
    title: "Spring Pea & Mint Risotto",
    slug: "spring-pea-mint-risotto",
    description:
      "Creamy Arborio rice infused with a delicate pea purée and finished with fresh garden mint and parmesan.",
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800",
    prepTime: "35 min",
    difficulty: "Intermediate",
    isPremium: false,
    isPopular: true,
    category: "main-dishes",
    ingredients: [
      "1.5 cups Arborio rice",
      "1 cup fresh spring peas",
      "1/4 cup fresh mint, chopped",
      "1 liter vegetable stock",
      "1/2 cup grated Parmesan",
      "1 shallot, finely minced",
    ],
    instructions: [
      "Blanch half the peas and blend into a smooth purée with a splash of stock.",
      "Sauté shallots in butter until translucent, then toast the rice for 2 minutes.",
      "Add warm stock one ladle at a time, stirring constantly until absorbed.",
      "Stir in the pea purée and remaining whole peas during the last 5 minutes.",
      "Remove from heat and vigorously fold in cold butter and parmesan for a silky finish.",
    ],
  },
  {
    id: "r4",
    title: "Charred Heirloom Carrots",
    slug: "charred-heirloom-carrots",
    description:
      "Caramelized garden carrots served with a zesty lemon-yogurt dip and toasted cumin seeds.",
    image:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=800",
    prepTime: "25 min",
    difficulty: "Easy",
    isPremium: true,
    isPopular: false,
    category: "healthy",
    ingredients: [
      "1 bunch baby heirloom carrots",
      "1 cup Greek yogurt",
      "1 lemon, zested",
      "1 tsp cumin seeds, toasted",
      "Fresh dill for garnish",
      "Olive oil",
    ],
    instructions: [
      "Toss carrots with oil and salt, then roast at 425°F until charred and tender.",
      "Mix Greek yogurt with lemon zest and a pinch of salt.",
      "Spread the yogurt base on a serving platter.",
      "Arrange carrots on top and sprinkle with toasted cumin seeds and fresh dill.",
    ],
  },
  {
    id: "r5",
    title: "Rustic Sourdough Panzanella",
    slug: "rustic-sourdough-panzanella",
    description:
      "A vibrant Tuscan classic featuring sun-ripened tomatoes and toasted artisanal sourdough cubes tossed in aged balsamic.",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
    additionalImages: [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800",
    ],
    prepTime: "20 min",
    difficulty: "Easy",
    isPremium: true,
    category: "quick-meals",
    isPopular: true,
    ingredients: [
      "4 cups cubed day-old sourdough",
      "2 lbs ripe heirloom tomatoes",
      "1/2 red onion, thinly sliced",
      "1/2 cup fresh basil leaves",
      "3 tbsp extra virgin olive oil",
      "2 tbsp aged balsamic vinegar",
      "Flaky sea salt & cracked pepper",
    ],
    instructions: [
      "Preheat your oven to 350°F and toast sourdough cubes until golden and crisp.",
      "Cut the tomatoes into bite-sized wedges and place in a large ceramic bowl.",
      "Add the sliced red onion and torn basil leaves to the tomatoes.",
      "Whisk olive oil and balsamic vinegar until emulsified, then drizzle over the vegetables.",
      "Toss in the toasted bread cubes and let sit for 10 minutes to absorb the juices before serving.",
    ],
  },
  {
    id: "r6",
    title: "Slow-Roasted Lamb with Herbs",
    slug: "slow-roasted-lamb-with-herbs",
    description:
      "Tender, succulent leg of lamb marinated in a secret blend of rosemary, garlic, and wild mountain honey.",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
    additionalImages: [
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800",
    ],
    prepTime: "3 hrs",
    difficulty: "Advanced",
    isPremium: true,
    category: "breakfast",
    isPopular: true,
    ingredients: [
      "4lb bone-in leg of lamb",
      "6 cloves garlic, slivered",
      "3 sprigs fresh rosemary",
      "1/4 cup local honey",
      "1/2 cup dry white wine",
      "Coarse sea salt",
    ],
    instructions: [
      "Score the lamb and insert garlic slivers and rosemary sprigs into the cuts.",
      "Rub the entire joint with salt and honey, then let rest for 30 minutes.",
      "Roast at 320°F for 2.5 hours, basting occasionally with white wine.",
      "Increase heat to 425°F for the final 15 minutes to develop a dark, honeyed crust.",
      "Rest for at least 20 minutes before carving thin slices.",
    ],
  },
  {
    id: "r7",
    title: "Spring Pea & Mint Risotto",
    slug: "spring-pea-mint-risotto",
    description:
      "Creamy Arborio rice infused with a delicate pea purée and finished with fresh garden mint and parmesan.",
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800",
    prepTime: "35 min",
    difficulty: "Intermediate",
    isPremium: false,
    isPopular: false,
    category: "Main Dishes",
    ingredients: [
      "1.5 cups Arborio rice",
      "1 cup fresh spring peas",
      "1/4 cup fresh mint, chopped",
      "1 liter vegetable stock",
      "1/2 cup grated Parmesan",
      "1 shallot, finely minced",
    ],
    instructions: [
      "Blanch half the peas and blend into a smooth purée with a splash of stock.",
      "Sauté shallots in butter until translucent, then toast the rice for 2 minutes.",
      "Add warm stock one ladle at a time, stirring constantly until absorbed.",
      "Stir in the pea purée and remaining whole peas during the last 5 minutes.",
      "Remove from heat and vigorously fold in cold butter and parmesan for a silky finish.",
    ],
  },
];

// take randomly 4 recipes for featured recipes
export const FEATURED_RECIPES = ALL_RECIPES.sort(
  () => Math.random() - 0.5,
).slice(0, 4);
export const LATEST_RECIPES = ALL_RECIPES.slice(0, 4);
export const POPULAR_RECIPES = ALL_RECIPES.filter(
  (recipe: Recipe) => recipe.isPopular,
).slice(0, 4);

export const COLLECTIONS: CollectionRecipe[] = [
  {
    id: "c1",
    title: "Sunday Roast Traditions",
    slug: "sunday-roast-traditions",
    description:
      "Relive the warmth of family weekends with our curated roast menus.",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
    isLocked: false,
  },
  {
    id: "c2",
    title: "The Artisanal Baker Series",
    slug: "the-artisanal-baker-series",
    description:
      "Master the art of fermentation and pastry with expert-led guides.",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
    isLocked: true,
  },
  {
    id: "c3",
    title: "Quick Mediterrenean Evenings",
    slug: "quick-mediterrenean-evenings",
    description: "Fresh, 20-minute meals that bring the coast to your kitchen.",
    image:
      "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=800",
    isLocked: true,
  },
];
