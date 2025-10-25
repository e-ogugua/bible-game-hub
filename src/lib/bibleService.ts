// Bible API Integration with local fallback
export interface BibleVerse {
  book: string
  chapter: number
  verse: number
  text: string
  reference: string
}

export interface BibleChapter {
  book: string
  chapter: number
  verses: BibleVerse[]
}

// Local fallback data
const localBibleVerses: Record<string, BibleVerse[]> = {
  genesis: [
    {
      book: 'Genesis',
      chapter: 1,
      verse: 1,
      text: 'In the beginning God created the heavens and the earth.',
      reference: 'Genesis 1:1',
    },
    {
      book: 'Genesis',
      chapter: 1,
      verse: 27,
      text: 'So God created mankind in his own image, in the image of God he created them; male and female he created them.',
      reference: 'Genesis 1:27',
    },
  ],
  exodus: [
    {
      book: 'Exodus',
      chapter: 3,
      verse: 14,
      text: 'God said to Moses, "I AM WHO I AM. This is what you are to say to the Israelites: \'I AM has sent me to you.\'"',
      reference: 'Exodus 3:14',
    },
  ],
  psalms: [
    {
      book: 'Psalms',
      chapter: 23,
      verse: 1,
      text: 'The Lord is my shepherd, I lack nothing.',
      reference: 'Psalm 23:1',
    },
  ],
  proverbs: [
    {
      book: 'Proverbs',
      chapter: 3,
      verse: 5,
      text: 'Trust in the Lord with all your heart and lean not on your own understanding.',
      reference: 'Proverbs 3:5',
    },
  ],
  matthew: [
    {
      book: 'Matthew',
      chapter: 5,
      verse: 3,
      text: 'Blessed are the poor in spirit, for theirs is the kingdom of heaven.',
      reference: 'Matthew 5:3',
    },
    {
      book: 'Matthew',
      chapter: 6,
      verse: 33,
      text: 'But seek first his kingdom and his righteousness, and all these things will be given to you as well.',
      reference: 'Matthew 6:33',
    },
  ],
  john: [
    {
      book: 'John',
      chapter: 3,
      verse: 16,
      text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
      reference: 'John 3:16',
    },
    {
      book: 'John',
      chapter: 14,
      verse: 6,
      text: 'Jesus answered, "I am the way and the truth and the life. No one comes to the Father except through me."',
      reference: 'John 14:6',
    },
  ],
}

// Bible API service
class BibleService {
  private apiKey?: string
  private baseUrl = 'https://bible-api.com'

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_BIBLE_API_KEY
  }

  async getVerse(
    book: string,
    chapter: number,
    verse: number
  ): Promise<BibleVerse | null> {
    try {
      // Try API first
      if (this.apiKey) {
        const response = await fetch(
          `${this.baseUrl}/${book}+${chapter}:${verse}?translation=kjv`
        )
        if (response.ok) {
          const data = await response.json()
          return {
            book,
            chapter,
            verse,
            text: data.text,
            reference: data.reference,
          }
        }
      }

      // Fallback to local data
      const localVerses = localBibleVerses[book.toLowerCase()]
      if (localVerses) {
        const verseData = localVerses.find(
          (v) => v.chapter === chapter && v.verse === verse
        )
        return verseData || null
      }

      return null
    } catch (error) {
      console.error('Error fetching Bible verse:', error)
      // Fallback to local data
      const localVerses = localBibleVerses[book.toLowerCase()]
      if (localVerses) {
        const verseData = localVerses.find(
          (v) => v.chapter === chapter && v.verse === verse
        )
        return verseData || null
      }
      return null
    }
  }

  async getChapter(
    book: string,
    chapter: number
  ): Promise<BibleChapter | null> {
    try {
      // Try API first
      if (this.apiKey) {
        interface ApiVerse {
          verse: number
          text: string
        }

        interface ApiResponse {
          verses: ApiVerse[]
        }

        const response = await fetch(
          `${this.baseUrl}/${book}+${chapter}?translation=kjv`
        )
        if (response.ok) {
          const data: ApiResponse = await response.json()
          return {
            book,
            chapter,
            verses: data.verses.map((v: ApiVerse) => ({
              book,
              chapter,
              verse: v.verse,
              text: v.text,
              reference: `${book} ${chapter}:${v.verse}`,
            })),
          }
        }
      }

      // Fallback to local data
      const localVerses = localBibleVerses[book.toLowerCase()]
      if (localVerses) {
        const chapterVerses = localVerses.filter((v) => v.chapter === chapter)
        return {
          book,
          chapter,
          verses: chapterVerses,
        }
      }

      return null
    } catch (error) {
      console.error('Error fetching Bible chapter:', error)
      // Fallback to local data
      const localVerses = localBibleVerses[book.toLowerCase()]
      if (localVerses) {
        const chapterVerses = localVerses.filter((v) => v.chapter === chapter)
        return {
          book,
          chapter,
          verses: chapterVerses,
        }
      }
      return null
    }
  }

  // Get daily verse based on current date
  async getDailyVerse(): Promise<BibleVerse | null> {
    const today = new Date()
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
        86400000
    )

    // Use day of year to select a verse (cycling through available verses)
    const availableBooks = Object.keys(localBibleVerses)
    const bookIndex = dayOfYear % availableBooks.length
    const book = availableBooks[bookIndex]
    const verses = localBibleVerses[book]
    const verseIndex = (dayOfYear * 7) % verses.length // Use a multiplier for more variety

    return verses[verseIndex] || null
  }

  // Get random verse for quiz questions
  async getRandomVerse(): Promise<BibleVerse | null> {
    const availableBooks = Object.keys(localBibleVerses)
    const randomBook =
      availableBooks[Math.floor(Math.random() * availableBooks.length)]
    const verses = localBibleVerses[randomBook]
    const randomVerse = verses[Math.floor(Math.random() * verses.length)]

    return randomVerse
  }
}

export const bibleService = new BibleService()
