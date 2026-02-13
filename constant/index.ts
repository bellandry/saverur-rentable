import { Recipe } from "@/types";

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
    category: "Healthy",
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
    category: "Main Dishes",
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
    description:
      "Creamy Arborio rice infused with a delicate pea purée and finished with fresh garden mint and parmesan.",
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800",
    prepTime: "35 min",
    difficulty: "Intermediate",
    isPremium: false,
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
  {
    id: "r4",
    title: "Charred Heirloom Carrots",
    description:
      "Caramelized garden carrots served with a zesty lemon-yogurt dip and toasted cumin seeds.",
    image:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=800",
    prepTime: "25 min",
    difficulty: "Easy",
    isPremium: true,
    category: "Healthy",
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
];

export const FEATURED_RECIPES = ALL_RECIPES.slice(0, 4);
