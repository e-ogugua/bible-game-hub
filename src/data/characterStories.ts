export interface StoryChoice {
  id: string
  text: string
  consequence: string
  nextChapter?: number | null
  score?: number
  faith?: number
  courage?: number
  obedience?: number
}

export interface StoryChapter {
  id: number
  title: string
  description: string
  bibleReference: string
  backgroundImage?: string
  choices: StoryChoice[]
}

export interface CharacterStory {
  id: string
  name: string
  description: string
  chapters: StoryChapter[]
}

// Moses Story Data
export const mosesStory: CharacterStory = {
  id: 'moses',
  name: 'Moses - From Egypt to Sinai',
  description:
    "Follow Moses' journey from Egyptian prince to leader of the Israelites",
  chapters: [
    {
      id: 1,
      title: 'The Burning Bush',
      description:
        'You are Moses, a shepherd in the desert when you encounter a miraculous burning bush that is not consumed by fire.',
      bibleReference: 'Exodus 3:1-22',
      choices: [
        {
          id: 'approach_bush',
          text: 'Approach the burning bush with curiosity and reverence',
          consequence:
            'The voice of God speaks to you, calling you to lead His people out of Egypt.',
          nextChapter: 2,
          score: 10,
          faith: 5,
          courage: 3,
        },
        {
          id: 'run_away',
          text: 'Run away in fear from this supernatural phenomenon',
          consequence:
            'You flee from the presence of God, but the call remains in your heart.',
          nextChapter: 2,
          score: 5,
          faith: 1,
          courage: 1,
        },
      ],
    },
    {
      id: 2,
      title: 'Confronting Pharaoh',
      description:
        'You stand before Pharaoh, demanding that he let the Israelites go free.',
      bibleReference: 'Exodus 5:1-23',
      choices: [
        {
          id: 'demand_freedom',
          text: 'Boldly declare "Let my people go!" with unwavering faith',
          consequence:
            "Pharaoh hardens his heart and increases the Israelites' burdens, but your faith grows stronger.",
          nextChapter: 3,
          score: 15,
          faith: 7,
          courage: 8,
          obedience: 5,
        },
        {
          id: 'negotiate_gently',
          text: 'Politely request better treatment for the Israelites',
          consequence:
            'Pharaoh mocks your request and the situation worsens, testing your resolve.',
          nextChapter: 3,
          score: 8,
          faith: 3,
          courage: 2,
          obedience: 2,
        },
      ],
    },
    {
      id: 3,
      title: 'The Ten Plagues',
      description:
        'God sends plagues upon Egypt. You witness the power of God firsthand.',
      bibleReference: 'Exodus 7-12',
      choices: [
        {
          id: 'trust_god',
          text: "Trust in God's timing and continue to obey His commands",
          consequence:
            "Each plague demonstrates God's power, and eventually Pharaoh relents.",
          nextChapter: 4,
          score: 20,
          faith: 10,
          obedience: 10,
          courage: 5,
        },
        {
          id: 'doubt_process',
          text: 'Question why God is taking so long and consider giving up',
          consequence:
            "Your doubt causes you to miss the full revelation of God's plan.",
          nextChapter: 4,
          score: 12,
          faith: 2,
          obedience: 3,
          courage: 1,
        },
      ],
    },
    {
      id: 4,
      title: 'Crossing the Red Sea',
      description:
        "The Israelites are trapped between Pharaoh's army and the Red Sea.",
      bibleReference: 'Exodus 14:1-31',
      choices: [
        {
          id: 'stand_firm',
          text: "Stand firm in faith and watch for God's deliverance",
          consequence:
            'God parts the Red Sea, and you lead the people to safety on dry ground.',
          nextChapter: 5,
          score: 25,
          faith: 15,
          courage: 10,
          obedience: 8,
        },
        {
          id: 'panic_escape',
          text: 'Panic and try to find another way to escape',
          consequence:
            'In your fear, you miss the miraculous deliverance God had planned.',
          nextChapter: 5,
          score: 15,
          faith: 3,
          courage: 2,
          obedience: 1,
        },
      ],
    },
    {
      id: 5,
      title: 'Mount Sinai',
      description:
        "You climb Mount Sinai to receive God's commandments for His people.",
      bibleReference: 'Exodus 19-20',
      choices: [
        {
          id: 'receive_commandments',
          text: 'Humbly receive the Ten Commandments and commit to teaching them',
          consequence:
            "You become the great lawgiver, establishing God's covenant with Israel.",
          nextChapter: null,
          score: 30,
          faith: 20,
          obedience: 15,
          courage: 8,
        },
        {
          id: 'question_calling',
          text: "Question if you're worthy of this great responsibility",
          consequence:
            'Though you doubt yourself, God affirms His choice and strengthens you.',
          nextChapter: null,
          score: 25,
          faith: 12,
          obedience: 8,
          courage: 5,
        },
      ],
    },
  ],
}

export const davidStory: CharacterStory = {
  id: 'david',
  name: 'David - The Shepherd King',
  description: "Follow David's journey from shepherd boy to King of Israel",
  chapters: [
    {
      id: 1,
      title: 'The Anointing',
      description:
        'As the youngest son, you are chosen by God through the prophet Samuel.',
      bibleReference: '1 Samuel 16:1-13',
      choices: [
        {
          id: 'accept_calling',
          text: "Humbly accept God's calling despite being the youngest",
          consequence:
            "God's Spirit comes upon you, preparing you for greatness.",
          nextChapter: 2,
          score: 10,
          faith: 5,
          courage: 3,
        },
        {
          id: 'doubt_yourself',
          text: 'Doubt that God could choose someone as insignificant as you',
          consequence: "Your doubt delays God's plan, but His calling remains.",
          nextChapter: 2,
          score: 5,
          faith: 1,
          courage: 1,
        },
      ],
    },
    {
      id: 2,
      title: 'Facing Goliath',
      description:
        'The Philistine giant Goliath challenges the Israelite army.',
      bibleReference: '1 Samuel 17:1-58',
      choices: [
        {
          id: 'face_giant',
          text: 'Step forward in faith with just a sling and stones',
          consequence:
            'God gives you victory over the giant, making you a hero.',
          nextChapter: 3,
          score: 20,
          faith: 10,
          courage: 15,
        },
        {
          id: 'hide_fear',
          text: 'Hide among the soldiers, letting fear overcome your faith',
          consequence:
            'The giant continues to mock Israel until someone else steps up.',
          nextChapter: 3,
          score: 8,
          faith: 2,
          courage: 1,
        },
      ],
    },
    {
      id: 3,
      title: "King Saul's Court",
      description:
        "You serve in King Saul's court, playing music to soothe his troubled spirit.",
      bibleReference: '1 Samuel 18-19',
      choices: [
        {
          id: 'serve_humbly',
          text: "Serve the king humbly while waiting for God's timing",
          consequence:
            'Your patience and faithfulness are rewarded with promotion.',
          nextChapter: 4,
          score: 15,
          faith: 8,
          obedience: 10,
        },
        {
          id: 'seek_power',
          text: 'Try to advance your position through political maneuvering',
          consequence:
            "Your ambition creates enemies and complicates God's plan.",
          nextChapter: 4,
          score: 10,
          faith: 3,
          obedience: 2,
        },
      ],
    },
    {
      id: 4,
      title: 'Flight from Saul',
      description:
        'King Saul becomes jealous and seeks your life, forcing you to flee.',
      bibleReference: '1 Samuel 20-26',
      choices: [
        {
          id: 'spare_saul',
          text: 'Show mercy to Saul when you have the chance to kill him',
          consequence:
            "Your mercy demonstrates God's character and preserves your integrity.",
          nextChapter: 5,
          score: 25,
          faith: 12,
          obedience: 15,
          courage: 8,
        },
        {
          id: 'take_revenge',
          text: 'Take revenge when the opportunity presents itself',
          consequence: "Revenge corrupts your heart and delays God's blessing.",
          nextChapter: 5,
          score: 12,
          faith: 2,
          obedience: 1,
          courage: 3,
        },
      ],
    },
    {
      id: 5,
      title: 'King of Israel',
      description:
        "After Saul's death, you become king and establish Jerusalem as the capital.",
      bibleReference: '2 Samuel 5-7',
      choices: [
        {
          id: 'seek_god_first',
          text: "Seek God's guidance before making decisions as king",
          consequence:
            'God establishes your throne forever and blesses your reign.',
          nextChapter: null,
          score: 30,
          faith: 20,
          obedience: 15,
          courage: 10,
        },
        {
          id: 'rely_own_wisdom',
          text: 'Rely on your own wisdom and military might',
          consequence:
            'While successful, you miss the deeper relationship God desires.',
          nextChapter: null,
          score: 20,
          faith: 8,
          obedience: 5,
          courage: 12,
        },
      ],
    },
  ],
}

export const jesusStory: CharacterStory = {
  id: 'jesus',
  name: 'Jesus - The Journey of Grace',
  description:
    'Walk in the footsteps of Jesus through His ministry and teachings',
  chapters: [
    {
      id: 1,
      title: 'The Baptism',
      description:
        'You are Jesus, beginning your public ministry with baptism by John.',
      bibleReference: 'Matthew 3:13-17',
      choices: [
        {
          id: 'humble_baptism',
          text: 'Humbly submit to baptism to fulfill all righteousness',
          consequence:
            "The heavens open, and God's Spirit descends upon you like a dove.",
          nextChapter: 2,
          score: 10,
          faith: 5,
          obedience: 8,
        },
        {
          id: 'question_necessity',
          text: 'Question whether baptism is necessary for you',
          consequence:
            'John convinces you of its importance for setting an example.',
          nextChapter: 2,
          score: 8,
          faith: 3,
          obedience: 5,
        },
      ],
    },
    {
      id: 2,
      title: 'Temptation in the Desert',
      description:
        'You face temptation from Satan during forty days in the wilderness.',
      bibleReference: 'Matthew 4:1-11',
      choices: [
        {
          id: 'resist_temptation',
          text: 'Resist each temptation by quoting Scripture and trusting God',
          consequence:
            'Angels minister to you, and you emerge spiritually stronger.',
          nextChapter: 3,
          score: 20,
          faith: 15,
          obedience: 10,
        },
        {
          id: 'give_in_weakness',
          text: 'Give in to the temptation of turning stones to bread',
          consequence:
            'You learn from your mistake but must continue the struggle.',
          nextChapter: 3,
          score: 10,
          faith: 2,
          obedience: 3,
        },
      ],
    },
    {
      id: 3,
      title: 'Calling the Disciples',
      description:
        'You call ordinary fishermen to become your disciples and follow you.',
      bibleReference: 'Matthew 4:18-22',
      choices: [
        {
          id: 'call_with_authority',
          text: 'Call them with authority: "Follow me and I will make you fishers of men"',
          consequence: 'They immediately leave their nets and follow you.',
          nextChapter: 4,
          score: 15,
          faith: 8,
          courage: 5,
        },
        {
          id: 'convince_gently',
          text: 'Gently convince them of the importance of your mission',
          consequence:
            'They need more time to understand but eventually follow.',
          nextChapter: 4,
          score: 12,
          faith: 5,
          courage: 3,
        },
      ],
    },
    {
      id: 4,
      title: 'Sermon on the Mount',
      description:
        'You teach the crowds about the kingdom of heaven and godly living.',
      bibleReference: 'Matthew 5-7',
      choices: [
        {
          id: 'teach_with_love',
          text: 'Teach with love, mercy, and wisdom, blessing the poor in spirit',
          consequence: 'The people are amazed at your teaching and authority.',
          nextChapter: 5,
          score: 25,
          faith: 12,
          obedience: 8,
          courage: 5,
        },
        {
          id: 'teach_with_judgment',
          text: 'Teach with strict judgment and condemnation of sinners',
          consequence: 'Many are offended and turn away from your message.',
          nextChapter: 5,
          score: 15,
          faith: 5,
          obedience: 3,
          courage: 8,
        },
      ],
    },
    {
      id: 5,
      title: 'The Cross and Resurrection',
      description:
        'You face betrayal, crucifixion, and ultimately resurrection.',
      bibleReference: 'Matthew 26-28',
      choices: [
        {
          id: 'embrace_gods_will',
          text: 'Embrace God\'s will, praying "Not my will, but yours be done"',
          consequence:
            'You rise from the dead, conquering sin and death forever.',
          nextChapter: null,
          score: 50,
          faith: 25,
          obedience: 20,
          courage: 15,
        },
        {
          id: 'resist_suffering',
          text: 'Try to avoid the suffering and find another way',
          consequence:
            "You learn that suffering is necessary for God's redemptive plan.",
          nextChapter: null,
          score: 35,
          faith: 15,
          obedience: 10,
          courage: 8,
        },
      ],
    },
  ],
}

export const characterStories = {
  moses: mosesStory,
  david: davidStory,
  jesus: jesusStory,
}
