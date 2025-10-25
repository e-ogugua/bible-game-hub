export interface MemoryCard {
  id: number
  type: 'verse' | 'reference'
  content: string
  pairId: number // Links verse and reference
  book: string // Bible book category
  theme: 'classic' | 'new-testament' | 'old-testament' | 'psalms' | 'wisdom'
}

// Classic level - Mixed verses from different books
export const classicCards: MemoryCard[] = [
  {
    id: 1,
    type: 'verse',
    content: 'The Lord is my shepherd, I lack nothing.',
    pairId: 1,
    book: 'Psalms',
    theme: 'psalms',
  },
  {
    id: 2,
    type: 'reference',
    content: 'Psalm 23:1',
    pairId: 1,
    book: 'Psalms',
    theme: 'psalms',
  },
  {
    id: 3,
    type: 'verse',
    content: 'For God so loved the world that he gave his one and only Son.',
    pairId: 2,
    book: 'John',
    theme: 'new-testament',
  },
  {
    id: 4,
    type: 'reference',
    content: 'John 3:16',
    pairId: 2,
    book: 'John',
    theme: 'new-testament',
  },
  {
    id: 5,
    type: 'verse',
    content: 'I can do all this through him who gives me strength.',
    pairId: 3,
    book: 'Philippians',
    theme: 'new-testament',
  },
  {
    id: 6,
    type: 'reference',
    content: 'Philippians 4:13',
    pairId: 3,
    book: 'Philippians',
    theme: 'new-testament',
  },
  {
    id: 7,
    type: 'verse',
    content: 'Trust in the Lord with all your heart.',
    pairId: 4,
    book: 'Proverbs',
    theme: 'wisdom',
  },
  {
    id: 8,
    type: 'reference',
    content: 'Proverbs 3:5',
    pairId: 4,
    book: 'Proverbs',
    theme: 'wisdom',
  },
  {
    id: 9,
    type: 'verse',
    content: 'Be still and know that I am God.',
    pairId: 5,
    book: 'Psalms',
    theme: 'psalms',
  },
  {
    id: 10,
    type: 'reference',
    content: 'Psalm 46:10',
    pairId: 5,
    book: 'Psalms',
    theme: 'psalms',
  },
  {
    id: 11,
    type: 'verse',
    content: 'Love your neighbor as yourself.',
    pairId: 6,
    book: 'Mark',
    theme: 'new-testament',
  },
  {
    id: 12,
    type: 'reference',
    content: 'Mark 12:31',
    pairId: 6,
    book: 'Mark',
    theme: 'new-testament',
  },
  {
    id: 13,
    type: 'verse',
    content: 'In the beginning God created the heavens and the earth.',
    pairId: 7,
    book: 'Genesis',
    theme: 'old-testament',
  },
  {
    id: 14,
    type: 'reference',
    content: 'Genesis 1:1',
    pairId: 7,
    book: 'Genesis',
    theme: 'old-testament',
  },
  {
    id: 15,
    type: 'verse',
    content: 'For I know the plans I have for you, declares the Lord.',
    pairId: 8,
    book: 'Jeremiah',
    theme: 'old-testament',
  },
  {
    id: 16,
    type: 'reference',
    content: 'Jeremiah 29:11',
    pairId: 8,
    book: 'Jeremiah',
    theme: 'old-testament',
  },
]

// New Testament focus
export const newTestamentCards: MemoryCard[] = [
  {
    id: 1,
    type: 'verse',
    content: 'For God so loved the world that he gave his one and only Son.',
    pairId: 1,
    book: 'John',
    theme: 'new-testament',
  },
  {
    id: 2,
    type: 'reference',
    content: 'John 3:16',
    pairId: 1,
    book: 'John',
    theme: 'new-testament',
  },
  {
    id: 3,
    type: 'verse',
    content: 'I can do all this through him who gives me strength.',
    pairId: 2,
    book: 'Philippians',
    theme: 'new-testament',
  },
  {
    id: 4,
    type: 'reference',
    content: 'Philippians 4:13',
    pairId: 2,
    book: 'Philippians',
    theme: 'new-testament',
  },
  {
    id: 5,
    type: 'verse',
    content: 'Love your neighbor as yourself.',
    pairId: 3,
    book: 'Mark',
    theme: 'new-testament',
  },
  {
    id: 6,
    type: 'reference',
    content: 'Mark 12:31',
    pairId: 3,
    book: 'Mark',
    theme: 'new-testament',
  },
  {
    id: 7,
    type: 'verse',
    content:
      'Come to me, all you who are weary and burdened, and I will give you rest.',
    pairId: 4,
    book: 'Matthew',
    theme: 'new-testament',
  },
  {
    id: 8,
    type: 'reference',
    content: 'Matthew 11:28',
    pairId: 4,
    book: 'Matthew',
    theme: 'new-testament',
  },
  {
    id: 9,
    type: 'verse',
    content: 'For all have sinned and fall short of the glory of God.',
    pairId: 5,
    book: 'Romans',
    theme: 'new-testament',
  },
  {
    id: 10,
    type: 'reference',
    content: 'Romans 3:23',
    pairId: 5,
    book: 'Romans',
    theme: 'new-testament',
  },
  {
    id: 11,
    type: 'verse',
    content: 'For by grace you have been saved through faith.',
    pairId: 6,
    book: 'Ephesians',
    theme: 'new-testament',
  },
  {
    id: 12,
    type: 'reference',
    content: 'Ephesians 2:8',
    pairId: 6,
    book: 'Ephesians',
    theme: 'new-testament',
  },
]

// Psalms focus
export const psalmsCards: MemoryCard[] = [
  {
    id: 1,
    type: 'verse',
    content: 'The Lord is my shepherd, I lack nothing.',
    pairId: 1,
    book: 'Psalms',
    theme: 'psalms',
  },
  {
    id: 2,
    type: 'reference',
    content: 'Psalm 23:1',
    pairId: 1,
    book: 'Psalms',
    theme: 'psalms',
  },
  {
    id: 3,
    type: 'verse',
    content: 'Be still and know that I am God.',
    pairId: 2,
    book: 'Psalms',
    theme: 'psalms',
  },
  {
    id: 4,
    type: 'reference',
    content: 'Psalm 46:10',
    pairId: 2,
    book: 'Psalms',
    theme: 'psalms',
  },
  {
    id: 5,
    type: 'verse',
    content: 'The Lord is my light and my salvation—whom shall I fear?',
    pairId: 3,
    book: 'Psalms',
    theme: 'psalms',
  },
  {
    id: 6,
    type: 'reference',
    content: 'Psalm 27:1',
    pairId: 3,
    book: 'Psalms',
    theme: 'psalms',
  },
  {
    id: 7,
    type: 'verse',
    content:
      'This is the day that the Lord has made; let us rejoice and be glad in it.',
    pairId: 4,
    book: 'Psalms',
    theme: 'psalms',
  },
  {
    id: 8,
    type: 'reference',
    content: 'Psalm 118:24',
    pairId: 4,
    book: 'Psalms',
    theme: 'psalms',
  },
]

// Wisdom literature focus
export const wisdomCards: MemoryCard[] = [
  {
    id: 1,
    type: 'verse',
    content:
      'Trust in the Lord with all your heart and lean not on your own understanding.',
    pairId: 1,
    book: 'Proverbs',
    theme: 'wisdom',
  },
  {
    id: 2,
    type: 'reference',
    content: 'Proverbs 3:5',
    pairId: 1,
    book: 'Proverbs',
    theme: 'wisdom',
  },
  {
    id: 3,
    type: 'verse',
    content:
      'A gentle answer turns away wrath, but a harsh word stirs up anger.',
    pairId: 2,
    book: 'Proverbs',
    theme: 'wisdom',
  },
  {
    id: 4,
    type: 'reference',
    content: 'Proverbs 15:1',
    pairId: 2,
    book: 'Proverbs',
    theme: 'wisdom',
  },
  {
    id: 5,
    type: 'verse',
    content: 'The fear of the Lord is the beginning of knowledge.',
    pairId: 3,
    book: 'Proverbs',
    theme: 'wisdom',
  },
  {
    id: 6,
    type: 'reference',
    content: 'Proverbs 1:7',
    pairId: 3,
    book: 'Proverbs',
    theme: 'wisdom',
  },
]

export const shuffleCards = (cards: MemoryCard[]): MemoryCard[] => {
  const shuffled = [...cards].sort(() => Math.random() - 0.5)
  return shuffled
}

export const getCardsForTheme = (theme: string): MemoryCard[] => {
  switch (theme) {
    case 'classic':
      return classicCards
    case 'new-testament':
      return newTestamentCards
    case 'psalms':
      return psalmsCards
    case 'wisdom':
      return wisdomCards
    default:
      return classicCards
  }
}
