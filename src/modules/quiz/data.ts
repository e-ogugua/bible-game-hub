export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correct: number // Index of correct answer
  explanation: string
  reference: string // Bible verse reference
  difficulty: 'easy' | 'medium' | 'hard'
}

export const quizQuestions: QuizQuestion[] = [
  // Easy Questions
  {
    id: 1,
    question: 'Who built the ark?',
    options: ['Moses', 'Noah', 'Abraham', 'David'],
    correct: 1,
    explanation:
      'Noah built the ark as commanded by God to save his family and animals from the flood.',
    reference: 'Genesis 6:14',
    difficulty: 'easy',
  },
  {
    id: 2,
    question: 'How many disciples did Jesus have?',
    options: ['10', '11', '12', '13'],
    correct: 2,
    explanation:
      'Jesus chose 12 disciples to follow Him and spread His teachings.',
    reference: 'Matthew 10:1-4',
    difficulty: 'easy',
  },
  {
    id: 3,
    question: 'In which city was Jesus born?',
    options: ['Nazareth', 'Jerusalem', 'Bethlehem', 'Capernaum'],
    correct: 2,
    explanation:
      'Jesus was born in Bethlehem, as prophesied in the Old Testament.',
    reference: 'Micah 5:2',
    difficulty: 'easy',
  },
  {
    id: 4,
    question: 'What did Jesus turn water into at a wedding?',
    options: ['Bread', 'Fish', 'Wine', 'Oil'],
    correct: 2,
    explanation:
      'Jesus performed His first miracle by turning water into wine at a wedding in Cana.',
    reference: 'John 2:1-11',
    difficulty: 'easy',
  },
  {
    id: 5,
    question: 'Who was swallowed by a great fish?',
    options: ['Moses', 'Jonah', 'Daniel', 'Ezekiel'],
    correct: 1,
    explanation:
      "Jonah was swallowed by a great fish after trying to flee from God's command.",
    reference: 'Jonah 1:17',
    difficulty: 'easy',
  },

  // Genesis Questions - Easy
  {
    id: 6,
    question: 'How many days did God take to create the world?',
    options: ['5', '6', '7', '8'],
    correct: 2,
    explanation: 'God created the world in 6 days and rested on the 7th day.',
    reference: 'Genesis 1:1-2:3',
    difficulty: 'easy',
  },
  {
    id: 7,
    question: 'What was the first thing God created?',
    options: ['Animals', 'Light', 'Plants', 'Humans'],
    correct: 1,
    explanation:
      "God said 'Let there be light' and there was light on the first day of creation.",
    reference: 'Genesis 1:3',
    difficulty: 'easy',
  },
  {
    id: 8,
    question: 'Who was the first man created by God?',
    options: ['Moses', 'Abraham', 'Adam', 'Noah'],
    correct: 2,
    explanation: 'God formed Adam from the dust of the ground.',
    reference: 'Genesis 2:7',
    difficulty: 'easy',
  },

  // Medium Questions
  {
    id: 9,
    question: 'How many days and nights did Jesus fast in the wilderness?',
    options: ['7', '14', '21', '40'],
    correct: 3,
    explanation:
      'Jesus fasted for 40 days and nights in the wilderness before beginning His ministry.',
    reference: 'Matthew 4:1-2',
    difficulty: 'medium',
  },
  {
    id: 10,
    question: 'Which apostle denied Jesus three times?',
    options: ['Peter', 'John', 'James', 'Andrew'],
    correct: 0,
    explanation:
      'Peter denied knowing Jesus three times before the rooster crowed, as Jesus had predicted.',
    reference: 'Matthew 26:69-75',
    difficulty: 'medium',
  },
  {
    id: 11,
    question: "What was the name of Abraham's wife?",
    options: ['Rachel', 'Leah', 'Sarah', 'Rebecca'],
    correct: 2,
    explanation:
      "Sarah was Abraham's wife, originally named Sarai, and mother of Isaac.",
    reference: 'Genesis 17:15',
    difficulty: 'medium',
  },
  {
    id: 12,
    question: 'In the Book of Revelation, how many seals are there?',
    options: ['5', '7', '10', '12'],
    correct: 1,
    explanation:
      'The Book of Revelation describes seven seals that are opened during the end times.',
    reference: 'Revelation 5:1',
    difficulty: 'medium',
  },
  {
    id: 13,
    question: 'Who was the oldest person mentioned in the Bible?',
    options: ['Adam', 'Noah', 'Methuselah', 'Abraham'],
    correct: 2,
    explanation:
      'Methuselah lived to be 969 years old, making him the oldest person in the Bible.',
    reference: 'Genesis 5:27',
    difficulty: 'medium',
  },
  {
    id: 14,
    question: 'What was the first plague God sent to Egypt?',
    options: [
      'Frogs',
      'Water turned to blood',
      'Darkness',
      'Death of firstborn',
    ],
    correct: 1,
    explanation:
      'The first plague was turning the Nile River and all water in Egypt to blood.',
    reference: 'Exodus 7:14-25',
    difficulty: 'medium',
  },

  // Genesis Questions - Medium
  {
    id: 15,
    question: 'How old was Abraham when Isaac was born?',
    options: ['75', '90', '100', '120'],
    correct: 2,
    explanation:
      'Abraham was 100 years old when his son Isaac was born to Sarah.',
    reference: 'Genesis 21:5',
    difficulty: 'medium',
  },
  {
    id: 16,
    question: 'What did Joseph interpret for Pharaoh?',
    options: ['Stars', 'Dreams', 'Visions', 'Signs'],
    correct: 1,
    explanation:
      "Joseph interpreted Pharaoh's dreams about seven years of plenty followed by seven years of famine.",
    reference: 'Genesis 41:25-32',
    difficulty: 'medium',
  },

  // Psalms Questions - Easy
  {
    id: 17,
    question: 'The Lord is my shepherd, I lack nothing - is from which Psalm?',
    options: ['Psalm 1', 'Psalm 23', 'Psalm 100', 'Psalm 150'],
    correct: 1,
    explanation: 'This famous verse is the opening line of Psalm 23.',
    reference: 'Psalm 23:1',
    difficulty: 'easy',
  },

  // Proverbs Questions - Easy
  {
    id: 18,
    question: 'Trust in the Lord with all your heart - is from which book?',
    options: ['Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon'],
    correct: 1,
    explanation:
      'This verse is from Proverbs 3:5, a book of wisdom literature.',
    reference: 'Proverbs 3:5',
    difficulty: 'easy',
  },

  // New Testament - Easy
  {
    id: 19,
    question: 'How many books are in the New Testament?',
    options: ['25', '26', '27', '28'],
    correct: 2,
    explanation:
      "The New Testament contains 27 books written after Jesus' life.",
    reference: 'Various',
    difficulty: 'easy',
  },

  // Hard Questions
  {
    id: 20,
    question: 'Which apostle was a tax collector before following Jesus?',
    options: ['Peter', 'James', 'John', 'Matthew'],
    correct: 3,
    explanation:
      "Matthew was a tax collector who became one of Jesus' twelve apostles.",
    reference: 'Matthew 9:9',
    difficulty: 'hard',
  },
  {
    id: 21,
    question:
      'What was the name of the garden where Jesus prayed before His crucifixion?',
    options: [
      'Garden of Eden',
      'Gethsemane',
      'Garden of Olives',
      'Garden of Golgotha',
    ],
    correct: 1,
    explanation:
      'Jesus prayed in the Garden of Gethsemane before His arrest and crucifixion.',
    reference: 'Matthew 26:36',
    difficulty: 'hard',
  },
  {
    id: 22,
    question: 'How many chapters are in the Book of Psalms?',
    options: ['100', '120', '150', '180'],
    correct: 2,
    explanation:
      'The Book of Psalms contains 150 chapters, making it the longest book in the Bible.',
    reference: 'Psalms 1-150',
    difficulty: 'hard',
  },
  {
    id: 23,
    question: 'Who was the first Gentile convert in the early church?',
    options: [
      'Lydia',
      'Cornelius',
      'The Ethiopian eunuch',
      'Simon the sorcerer',
    ],
    correct: 1,
    explanation:
      "Cornelius, a Roman centurion, was the first Gentile convert through Peter's ministry.",
    reference: 'Acts 10:1-48',
    difficulty: 'hard',
  },

  // Genesis Questions - Hard
  {
    id: 24,
    question: 'How many sons did Jacob have?',
    options: ['10', '11', '12', '13'],
    correct: 2,
    explanation: 'Jacob had 12 sons who became the 12 tribes of Israel.',
    reference: 'Genesis 35:23-26',
    difficulty: 'hard',
  },
  {
    id: 25,
    question: "What was the name of Noah's wife?",
    options: ['Naamah', 'Sarah', 'Rachel', "The Bible doesn't specify"],
    correct: 3,
    explanation: "The Bible does not give the name of Noah's wife.",
    reference: 'Genesis 6-9',
    difficulty: 'hard',
  },

  // Exodus Questions - Medium
  {
    id: 26,
    question: 'How many plagues did God send to Egypt?',
    options: ['8', '9', '10', '12'],
    correct: 2,
    explanation:
      'God sent 10 plagues upon Egypt to convince Pharaoh to let the Israelites go.',
    reference: 'Exodus 7-12',
    difficulty: 'medium',
  },
  {
    id: 27,
    question: "What did Moses' rod turn into when he threw it on the ground?",
    options: ['A fish', 'A bird', 'A serpent', 'A tree'],
    correct: 2,
    explanation: "Moses' rod turned into a serpent as a sign to Pharaoh.",
    reference: 'Exodus 4:2-4',
    difficulty: 'medium',
  },

  // More Psalms Questions
  {
    id: 28,
    question: 'Which Psalm is the longest?',
    options: ['Psalm 23', 'Psalm 91', 'Psalm 119', 'Psalm 150'],
    correct: 2,
    explanation: 'Psalm 119 is the longest Psalm with 176 verses.',
    reference: 'Psalm 119',
    difficulty: 'medium',
  },

  // Gospel Questions - Medium
  {
    id: 29,
    question: 'How many miracles are recorded in the Gospel of John?',
    options: ['5', '7', '8', '10'],
    correct: 2,
    explanation: 'The Gospel of John records 8 miracles performed by Jesus.',
    reference: 'John 2-11',
    difficulty: 'medium',
  },
  {
    id: 30,
    question:
      "What was the first miracle Jesus performed according to John's Gospel?",
    options: [
      'Healing the blind',
      'Walking on water',
      'Turning water to wine',
      'Feeding 5000',
    ],
    correct: 2,
    explanation:
      "Jesus' first miracle was turning water into wine at a wedding in Cana.",
    reference: 'John 2:1-11',
    difficulty: 'medium',
  },

  // Acts Questions - Medium
  {
    id: 31,
    question: 'Who was the first Christian martyr?',
    options: ['James', 'Peter', 'Stephen', 'Paul'],
    correct: 2,
    explanation:
      'Stephen was the first Christian martyr, stoned to death for his faith.',
    reference: 'Acts 7:54-60',
    difficulty: 'medium',
  },

  // Revelation Questions - Hard
  {
    id: 32,
    question: 'How many churches are addressed in Revelation chapters 2-3?',
    options: ['5', '7', '9', '12'],
    correct: 1,
    explanation: 'Revelation addresses letters to 7 churches in Asia Minor.',
    reference: 'Revelation 2-3',
    difficulty: 'hard',
  },

  // Proverbs Questions - Medium
  {
    id: 33,
    question: 'How many chapters are in the Book of Proverbs?',
    options: ['25', '30', '31', '35'],
    correct: 2,
    explanation: 'The Book of Proverbs contains 31 chapters.',
    reference: 'Proverbs 1-31',
    difficulty: 'medium',
  },

  // Daniel Questions - Hard
  {
    id: 34,
    question: "How many weeks are mentioned in Daniel's prophecy of 70 weeks?",
    options: ['60', '65', '70', '75'],
    correct: 2,
    explanation:
      "Daniel's prophecy mentions 70 weeks (490 years) for God's plan.",
    reference: 'Daniel 9:24-27',
    difficulty: 'hard',
  },

  // More Genesis Questions - Medium
  {
    id: 35,
    question: "What was Esau's nickname?",
    options: ['The hairy one', 'The red one', 'The strong one', 'The wise one'],
    correct: 1,
    explanation:
      'Esau was called Edom (meaning red) because he was red and hairy at birth.',
    reference: 'Genesis 25:25',
    difficulty: 'medium',
  },

  // Exodus Questions - Hard
  {
    id: 36,
    question: 'How old was Moses when he died?',
    options: ['100', '110', '120', '130'],
    correct: 2,
    explanation:
      'Moses died at age 120, just before entering the Promised Land.',
    reference: 'Deuteronomy 34:7',
    difficulty: 'hard',
  },

  // New Testament Questions - Medium
  {
    id: 37,
    question: 'Which Gospel was written by a physician?',
    options: ['Matthew', 'Mark', 'Luke', 'John'],
    correct: 2,
    explanation: 'Luke was a physician and wrote the Gospel of Luke and Acts.',
    reference: 'Colossians 4:14',
    difficulty: 'medium',
  },

  // Psalms Questions - Hard
  {
    id: 38,
    question:
      "Which Psalm contains the verse 'The fool says in his heart, there is no God'?",
    options: ['Psalm 14', 'Psalm 51', 'Psalm 91', 'Psalm 119'],
    correct: 0,
    explanation:
      "Psalm 14:1 says 'The fool says in his heart, there is no God.'",
    reference: 'Psalm 14:1',
    difficulty: 'hard',
  },

  // More Gospel Questions - Hard
  {
    id: 39,
    question: 'What was the name of the high priest who questioned Jesus?',
    options: ['Annas', 'Caiaphas', 'Herod', 'Pilate'],
    correct: 1,
    explanation:
      'Caiaphas was the high priest who questioned Jesus before His crucifixion.',
    reference: 'Matthew 26:57-68',
    difficulty: 'hard',
  },

  // Old Testament Books - Medium
  {
    id: 40,
    question: 'How many books are in the Old Testament?',
    options: ['35', '37', '39', '41'],
    correct: 2,
    explanation:
      "The Old Testament contains 39 books, written before Jesus' time.",
    reference: 'Various',
    difficulty: 'medium',
  },
]

export const getQuestionsByDifficulty = (
  difficulty: 'easy' | 'medium' | 'hard'
): QuizQuestion[] => {
  return quizQuestions.filter((q) => q.difficulty === difficulty)
}
