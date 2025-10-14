export interface MemoryCard {
  id: number;
  type: 'verse' | 'reference';
  content: string;
  pairId: number; // Links verse and reference
}

// Easy level - 4 pairs (8 cards)
export const easyCards: MemoryCard[] = [
  { id: 1, type: 'verse', content: 'The Lord is my shepherd, I lack nothing.', pairId: 1 },
  { id: 2, type: 'reference', content: 'Psalm 23:1', pairId: 1 },
  { id: 3, type: 'verse', content: 'For God so loved the world that he gave his one and only Son.', pairId: 2 },
  { id: 4, type: 'reference', content: 'John 3:16', pairId: 2 },
  { id: 5, type: 'verse', content: 'I can do all this through him who gives me strength.', pairId: 3 },
  { id: 6, type: 'reference', content: 'Philippians 4:13', pairId: 3 },
  { id: 7, type: 'verse', content: 'Trust in the Lord with all your heart.', pairId: 4 },
  { id: 8, type: 'reference', content: 'Proverbs 3:5', pairId: 4 }
];

// Medium level - 6 pairs (12 cards)
export const mediumCards: MemoryCard[] = [
  { id: 1, type: 'verse', content: 'The Lord is my shepherd, I lack nothing.', pairId: 1 },
  { id: 2, type: 'reference', content: 'Psalm 23:1', pairId: 1 },
  { id: 3, type: 'verse', content: 'For God so loved the world that he gave his one and only Son.', pairId: 2 },
  { id: 4, type: 'reference', content: 'John 3:16', pairId: 2 },
  { id: 5, type: 'verse', content: 'I can do all this through him who gives me strength.', pairId: 3 },
  { id: 6, type: 'reference', content: 'Philippians 4:13', pairId: 3 },
  { id: 7, type: 'verse', content: 'Trust in the Lord with all your heart.', pairId: 4 },
  { id: 8, type: 'reference', content: 'Proverbs 3:5', pairId: 4 },
  { id: 9, type: 'verse', content: 'Be still and know that I am God.', pairId: 5 },
  { id: 10, type: 'reference', content: 'Psalm 46:10', pairId: 5 },
  { id: 11, type: 'verse', content: 'Love your neighbor as yourself.', pairId: 6 },
  { id: 12, type: 'reference', content: 'Mark 12:31', pairId: 6 }
];

// Hard level - 8 pairs (16 cards)
export const hardCards: MemoryCard[] = [
  { id: 1, type: 'verse', content: 'The Lord is my shepherd, I lack nothing.', pairId: 1 },
  { id: 2, type: 'reference', content: 'Psalm 23:1', pairId: 1 },
  { id: 3, type: 'verse', content: 'For God so loved the world that he gave his one and only Son.', pairId: 2 },
  { id: 4, type: 'reference', content: 'John 3:16', pairId: 2 },
  { id: 5, type: 'verse', content: 'I can do all this through him who gives me strength.', pairId: 3 },
  { id: 6, type: 'reference', content: 'Philippians 4:13', pairId: 3 },
  { id: 7, type: 'verse', content: 'Trust in the Lord with all your heart.', pairId: 4 },
  { id: 8, type: 'reference', content: 'Proverbs 3:5', pairId: 4 },
  { id: 9, type: 'verse', content: 'Be still and know that I am God.', pairId: 5 },
  { id: 10, type: 'reference', content: 'Psalm 46:10', pairId: 5 },
  { id: 11, type: 'verse', content: 'Love your neighbor as yourself.', pairId: 6 },
  { id: 12, type: 'reference', content: 'Mark 12:31', pairId: 6 },
  { id: 13, type: 'verse', content: 'In the beginning God created the heavens and the earth.', pairId: 7 },
  { id: 14, type: 'reference', content: 'Genesis 1:1', pairId: 7 },
  { id: 15, type: 'verse', content: 'For I know the plans I have for you, declares the Lord.', pairId: 8 },
  { id: 16, type: 'reference', content: 'Jeremiah 29:11', pairId: 8 }
];

export const shuffleCards = (cards: MemoryCard[]): MemoryCard[] => {
  const shuffled = [...cards].sort(() => Math.random() - 0.5);
  return shuffled;
};
