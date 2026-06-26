export type MacroTarget = {
  label: string
  month: string
  calories: number
  protein: number
  carbs: number
  fat: number
  weightKg: number
  bmi: number
}

export type HabitSeed = {
  id: string
  title: string
  why: string
  schedule: string
  defaultStreak: number
  category: "body" | "mind" | "nutrition" | "relationship" | "home"
}

export type RecipeSeed = {
  id: string
  title: string
  mode: "hers" | "his" | "both"
  meal: "breakfast" | "snack" | "lunch" | "dinner"
  protein: number
  carbs: number
  fat: number
  calories: number
  ingredients: string[]
  steps: string[]
  note: string
}

export type TrackSeed = {
  id: string
  title: string
  intention: string
  duration: string
  src: string
}

export type MealPlanDay = {
  day: string
  breakfast?: string
  snack1?: string
  lunch?: string
  snack2?: string
  dinner?: string
  notes?: string
}

export type MealPlanSeed = {
  id: string
  title: string
  focus: string
  targetCalories: number
  targetProtein: number
  days: MealPlanDay[]
  groceryList: string[]
  note: string
}

export const ivetteProfile = {
  name: "Ivette Milo",
  appName: "Metamorphosis",
  positioning: "Private wellness second brain and personal health tracker.",
  mission:
    "Turn scattered wellness data, nutrition plans, rituals, recipes, music, and reflections into one calm personal operating system.",
  defaultUserId: "ivette-milo-private-lab",
}

export const brandTokens = {
  colors: {
    void: "#071018",
    deepIndigo: "#08314D",
    morphoBlue: "#0EA5E9",
    electricCyan: "#38E8FF",
    chrysalisGold: "#C8913B",
    lotusViolet: "#A855F7",
    pearl: "#F8FBFF",
    mist: "#D8EAF1",
    slate: "#14212B",
  },
  fonts: {
    heading: "Newsreader",
    body: "Inter",
  },
}

export const macroTargets: MacroTarget[] = [
  {
    label: "Original cut",
    month: "Plan inicial",
    calories: 1500,
    protein: 115,
    carbs: 120,
    fat: 50,
    weightKg: 79.2,
    bmi: 28.7,
  },
  {
    label: "May performance phase",
    month: "Mayo",
    calories: 1850,
    protein: 155,
    carbs: 143,
    fat: 70,
    weightKg: 77.8,
    bmi: 28.2,
  },
  {
    label: "June recomposition phase",
    month: "Junio",
    calories: 1700,
    protein: 160,
    carbs: 130,
    fat: 65,
    weightKg: 76.8,
    bmi: 27.9,
  },
]

export const habitSeeds: HabitSeed[] = [
  {
    id: "hydration-2l",
    title: "2–3 L water",
    why: "Keep hydration aligned with the nutrition plans.",
    schedule: "Daily",
    defaultStreak: 0,
    category: "body",
  },
  {
    id: "protein-anchor",
    title: "Hit protein anchor",
    why: "Protect muscle while reducing fat.",
    schedule: "Daily",
    defaultStreak: 0,
    category: "nutrition",
  },
  {
    id: "movement-reset",
    title: "Movement reset",
    why: "Short, repeatable body activation instead of perfection pressure.",
    schedule: "4x/week",
    defaultStreak: 0,
    category: "body",
  },
  {
    id: "evening-reflection",
    title: "Evening reflection",
    why: "Convert the day into memory, insight, and release.",
    schedule: "Daily",
    defaultStreak: 0,
    category: "mind",
  },
  {
    id: "music-regulation",
    title: "One regulation track",
    why: "Use music intentionally for state shift.",
    schedule: "Daily",
    defaultStreak: 0,
    category: "mind",
  },
]

export const recipeSeeds: RecipeSeed[] = [
  {
    id: "avena-proteica",
    title: "Bowl de avena proteica",
    mode: "hers",
    meal: "breakfast",
    protein: 35,
    carbs: 39,
    fat: 10,
    calories: 380,
    ingredients: ["Avena", "Leche de almendra", "Proteína de vainilla", "Plátano", "Chía", "Nuez"],
    steps: ["Cocinar la avena", "Mezclar proteína", "Agregar fruta, chía y nuez"],
    note: "Based on the June nutrition plan breakfast option.",
  },
  {
    id: "poke-salmon",
    title: "Bowl tipo poke de salmón",
    mode: "hers",
    meal: "lunch",
    protein: 38,
    carbs: 42,
    fat: 19,
    calories: 500,
    ingredients: ["Salmón", "Arroz integral", "Edamames", "Zanahoria", "Pepino", "Lechuga", "Rábanos"],
    steps: ["Sellar el salmón", "Preparar arroz y edamames", "Montar verduras", "Agregar ajonjolí y soya baja en sodio"],
    note: "High-protein lunch template.",
  },
  {
    id: "his-and-hers-tacos",
    title: "His & Hers tacos de res",
    mode: "both",
    meal: "lunch",
    protein: 36,
    carbs: 30,
    fat: 18,
    calories: 430,
    ingredients: ["Carne magra", "Tortillas de nopal", "Guacamole", "Pico de gallo", "Pepino", "Zanahoria"],
    steps: ["Cocinar carne magra", "Calentar tortillas", "Separar porciones Hers/His", "Servir con guacamole y ensalada"],
    note: "Use portion multipliers for his-and-hers meal planning.",
  },
]


export const mealPlanSeeds: MealPlanSeed[] = [
  {
    id: "june-protein-anchor-week",
    title: "June protein anchor week",
    focus: "Keep meals aligned to the 1700 kcal / 160g protein recomposition target.",
    targetCalories: 1700,
    targetProtein: 160,
    days: [
      {
        day: "Monday",
        breakfast: "Bowl de avena proteica",
        snack1: "Rollitos de jamón + pepino + hummus",
        lunch: "Bowl tipo poke de salmón",
        snack2: "Yogur griego con linaza",
        dinner: "Ensalada con pechuga y garbanzos",
        notes: "Use June plan portions first.",
      },
      {
        day: "Tuesday",
        breakfast: "Omelette de clara + pan integral",
        snack1: "Licuado verde",
        lunch: "His & Hers tacos de res",
        snack2: "Manzana con crema de almendra",
        dinner: "Sopa de lentejas + queso panela",
        notes: "Keep dinner lighter and high fiber.",
      },
    ],
    groceryList: [
      "Avena",
      "Proteína de vainilla",
      "Salmón",
      "Pechuga de pollo",
      "Carne magra",
      "Yogur griego",
      "Garbanzos",
      "Lentejas",
      "Tortillas de nopal",
      "Pepino",
      "Zanahoria",
      "Papaya",
    ],
    note: "Seeded from Ivette's nutrition plan memory. Replace with live weekly plans as the app matures.",
  },
]

export const trackSeeds: TrackSeed[] = [
  {
    id: "arrival",
    title: "Metamorphosis Arrival",
    intention: "Center before tracking or journaling.",
    duration: "4:00",
    src: "https://storage.googleapis.com/sample-videos-2019/mp3/hollywood-symphony-orchestra.mp3",
  },
  {
    id: "evening-release",
    title: "Evening Release",
    intention: "Close the day and write one clear note.",
    duration: "6:00",
    src: "https://storage.googleapis.com/sample-videos-2019/mp3/hollywood-symphony-orchestra.mp3",
  },
]

export const secondBrainModules = [
  {
    id: "scribe",
    title: "Scribe",
    role: "Capture messy thoughts and convert them into clean notes.",
    status: "MVP: local capture queue",
  },
  {
    id: "seeker",
    title: "Seeker",
    role: "Search Ivette's rituals, recipes, reflections, and decisions.",
    status: "MVP: local semantic-style search",
  },
  {
    id: "librarian",
    title: "Librarian",
    role: "Run weekly health checks and identify stale routines.",
    status: "MVP: dashboard report",
  },
]
