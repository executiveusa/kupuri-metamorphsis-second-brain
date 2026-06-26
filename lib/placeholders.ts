export const PLACEHOLDERS = {
  hero: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
  card1: "https://images.unsplash.com/photo-1554344728-77d9032b062a",
  card2: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b",
  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
  programCover: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d",
} as const

type PlaceholderKey = keyof typeof PLACEHOLDERS

export const getPlaceholder = (key: PlaceholderKey) => PLACEHOLDERS[key]
