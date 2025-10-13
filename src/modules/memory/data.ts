export interface MemoryCard {
  id: number;
  type: 'verse' | 'reference';
  content: string;
  pairId: number; // Links verse and reference
}

export const memoryCards: MemoryCard[] = [
  // Pair 1
  { id: 1, type: 'verse', content: 'The Lord is my shepherd, I lack nothing.', pairId: 1 },
  { id: 2, type: 'reference', content: 'Psalm 23:1', pairId: 1 },

  // Pair 2
  { id: 3, type: 'verse', content: 'For God so loved the world that he gave his one and only Son.', pairId: 2 },
  { id: 4, type: 'reference', content: 'John 3:16', pairId: 2 },

  // Pair 3
  { id: 5, type: 'verse', content: 'I can do all this through him who gives me strength.', pairId: 3 },
  { id: 6, type: 'reference', content: 'Philippians 4:13', pairId: 3 },

  // Pair 4
  { id: 7, type: 'verse', content: 'Trust in the Lord with all your heart and lean not on your own understanding.', pairId: 4 },
  { id: 8, type: 'reference', content: 'Proverbs 3:5', pairId: 4 },

  // Pair 5
  { id: 9, type: 'verse', content: 'Be still and know that I am God.', pairId: 5 },
  { id: 10, type: 'reference', content: 'Psalm 46:10', pairId: 5 },

  // Pair 6
  { id: 11, type: 'verse', content: 'This is the day that the Lord has made; let us rejoice and be glad in it.', pairId: 6 },
  { id: 12, type: 'reference', content: 'Psalm 118:24', pairId: 6 },

  // Pair 7
  { id: 13, type: 'verse', content: 'Love your neighbor as yourself.', pairId: 7 },
  { id: 14, type: 'reference', content: 'Mark 12:31', pairId: 7 },

  // Pair 8
  { id: 15, type: 'verse', content: 'In the beginning God created the heavens and the earth.', pairId: 8 },
  { id: 16, type: 'reference', content: 'Genesis 1:1', pairId: 8 },

  // Pair 9 - Genesis
  { id: 17, type: 'verse', content: 'For I know the plans I have for you, declares the Lord.', pairId: 9 },
  { id: 18, type: 'reference', content: 'Jeremiah 29:11', pairId: 9 },

  // Pair 10 - Psalms
  { id: 19, type: 'verse', content: 'The Lord is my light and my salvation—whom shall I fear?', pairId: 10 },
  { id: 20, type: 'reference', content: 'Psalm 27:1', pairId: 10 },

  // Pair 11 - Proverbs
  { id: 21, type: 'verse', content: 'A gentle answer turns away wrath, but a harsh word stirs up anger.', pairId: 11 },
  { id: 22, type: 'reference', content: 'Proverbs 15:1', pairId: 11 },

  // Pair 12 - Matthew
  { id: 23, type: 'verse', content: 'Come to me, all you who are weary and burdened, and I will give you rest.', pairId: 12 },
  { id: 24, type: 'reference', content: 'Matthew 11:28', pairId: 12 },

  // Pair 13 - Romans
  { id: 25, type: 'verse', content: 'For all have sinned and fall short of the glory of God.', pairId: 13 },
  { id: 26, type: 'reference', content: 'Romans 3:23', pairId: 13 },

  // Pair 14 - Ephesians
  { id: 27, type: 'verse', content: 'For by grace you have been saved through faith.', pairId: 14 },
  { id: 28, type: 'reference', content: 'Ephesians 2:8', pairId: 14 },

  // Pair 15 - Philippians
  { id: 29, type: 'verse', content: 'Do not be anxious about anything, but in every situation, by prayer and petition.', pairId: 15 },
  { id: 30, type: 'reference', content: 'Philippians 4:6', pairId: 15 },

  // Pair 16 - Isaiah
  { id: 31, type: 'verse', content: 'But those who hope in the Lord will renew their strength.', pairId: 16 },
  { id: 32, type: 'reference', content: 'Isaiah 40:31', pairId: 16 },

  // Pair 17 - Joshua
  { id: 33, type: 'verse', content: 'Be strong and courageous. Do not be afraid; do not be discouraged.', pairId: 17 },
  { id: 34, type: 'reference', content: 'Joshua 1:9', pairId: 17 },

  // Pair 18 - 1 Corinthians
  { id: 35, type: 'verse', content: 'Love is patient, love is kind. It does not envy, it does not boast.', pairId: 18 },
  { id: 36, type: 'reference', content: '1 Corinthians 13:4', pairId: 18 },

  // Pair 19 - Galatians
  { id: 37, type: 'verse', content: 'But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness.', pairId: 19 },
  { id: 38, type: 'reference', content: 'Galatians 5:22-23', pairId: 19 },

  // Pair 20 - Hebrews
  { id: 39, type: 'verse', content: 'Now faith is confidence in what we hope for and assurance about what we do not see.', pairId: 20 },
  { id: 40, type: 'reference', content: 'Hebrews 11:1', pairId: 20 },

  // Pair 21 - James
  { id: 41, type: 'verse', content: 'Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds.', pairId: 21 },
  { id: 42, type: 'reference', content: 'James 1:2', pairId: 21 },

  // Pair 22 - 1 Peter
  { id: 43, type: 'verse', content: 'Cast all your anxiety on him because he cares for you.', pairId: 22 },
  { id: 44, type: 'reference', content: '1 Peter 5:7', pairId: 22 },

  // Pair 23 - Revelation
  { id: 45, type: 'verse', content: 'I am the Alpha and the Omega, the First and the Last, the Beginning and the End.', pairId: 23 },
  { id: 46, type: 'reference', content: 'Revelation 22:13', pairId: 23 },

  // Pair 24 - Deuteronomy
  { id: 47, type: 'verse', content: 'Love the Lord your God with all your heart and with all your soul and with all your strength.', pairId: 24 },
  { id: 48, type: 'reference', content: 'Deuteronomy 6:5', pairId: 24 }
];

export const shuffleCards = (): MemoryCard[] => {
  const shuffled = [...memoryCards].sort(() => Math.random() - 0.5);
  return shuffled;
};
