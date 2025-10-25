// src/modules/adventure/data.ts
export interface StoryStage {
  id: string
  character: 'moses' | 'david' | 'jesus'
  title: string
  narrative: string
  backgroundImage?: string // Placeholder for background art
  characterImage?: string // Placeholder for character image
  choices: {
    text: string
    consequence: string
    scoreImpact: number // Points gained or lost
    nextStage?: string
    endGame?: boolean
  }[]
}

export interface AdventureData {
  [key: string]: StoryStage
}

export const adventureData: AdventureData = {
  // Moses Story: From Egypt to the Burning Bush
  'moses-1': {
    id: 'moses-1',
    character: 'moses',
    title: 'Escape from Egypt',
    narrative:
      "You are Moses, raised in Pharaoh's palace but aware of your Hebrew heritage. The oppression of your people weighs heavily on your heart.",
    backgroundImage: '/images/egypt-palace.jpg', // Placeholder
    characterImage: '/images/moses-young.jpg', // Placeholder
    choices: [
      {
        text: 'Confront the Egyptian overseer abusing a Hebrew slave',
        consequence:
          'Your act of justice leads to conflict, forcing you to flee Egypt.',
        scoreImpact: 10,
        nextStage: 'moses-2',
      },
      {
        text: 'Seek counsel from the palace advisors',
        consequence:
          'You gain wisdom but delay action, missing an opportunity to help.',
        scoreImpact: -5,
        nextStage: 'moses-2',
      },
      {
        text: 'Pray for guidance in solitude',
        consequence: 'God begins to reveal His plan through quiet reflection.',
        scoreImpact: 15,
        nextStage: 'moses-2',
      },
    ],
  },
  'moses-2': {
    id: 'moses-2',
    character: 'moses',
    title: 'Life in the Desert',
    narrative:
      "Now a shepherd in Midian, you've found peace but still feel called to something greater. One day, you encounter a burning bush that is not consumed.",
    backgroundImage: '/images/desert-mountain.jpg',
    characterImage: '/images/moses-shepherd.jpg',
    choices: [
      {
        text: 'Approach the bush cautiously',
        consequence:
          "You hear God's voice calling you to lead your people out of Egypt.",
        scoreImpact: 20,
        nextStage: 'moses-3',
      },
      {
        text: 'Run away in fear',
        consequence: 'You miss the divine calling, but God is patient.',
        scoreImpact: -10,
        nextStage: 'moses-3',
      },
    ],
  },
  'moses-3': {
    id: 'moses-3',
    character: 'moses',
    title: 'The Burning Bush',
    narrative:
      'God speaks to you from the burning bush, revealing His name and commissioning you to free the Israelites.',
    backgroundImage: '/images/burning-bush.jpg',
    characterImage: '/images/moses-burning-bush.jpg',
    choices: [
      {
        text: 'Accept the mission with faith',
        consequence: "You embrace your role as God's chosen leader.",
        scoreImpact: 25,
        endGame: true,
      },
      {
        text: 'Express doubts and ask for signs',
        consequence: 'God provides reassurance, strengthening your resolve.',
        scoreImpact: 15,
        endGame: true,
      },
    ],
  },

  // David Story: Battle with Goliath
  'david-1': {
    id: 'david-1',
    character: 'david',
    title: 'The Young Shepherd',
    narrative:
      'You are David, the youngest son of Jesse, tending sheep in the hills of Bethlehem. Your brothers are at war with the Philistines.',
    backgroundImage: '/images/bethlehem-hills.jpg',
    characterImage: '/images/david-shepherd.jpg',
    choices: [
      {
        text: 'Practice your slingshot skills diligently',
        consequence: 'Your skill with the sling becomes legendary.',
        scoreImpact: 10,
        nextStage: 'david-2',
      },
      {
        text: 'Compose songs of praise to God',
        consequence: 'Your music brings peace and prepares your heart.',
        scoreImpact: 15,
        nextStage: 'david-2',
      },
    ],
  },
  'david-2': {
    id: 'david-2',
    character: 'david',
    title: 'Facing Goliath',
    narrative:
      'The Philistine giant Goliath taunts the Israelite army. Your father sends you to deliver food to your brothers.',
    backgroundImage: '/images/battlefield.jpg',
    characterImage: '/images/david-goliath.jpg',
    choices: [
      {
        text: 'Volunteer to fight Goliath with faith in God',
        consequence:
          'You step forward, trusting in divine strength over human might.',
        scoreImpact: 25,
        nextStage: 'david-3',
      },
      {
        text: 'Suggest seeking a diplomatic solution',
        consequence:
          "Peace is considered, but Goliath's challenge demands action.",
        scoreImpact: 5,
        nextStage: 'david-3',
      },
    ],
  },
  'david-3': {
    id: 'david-3',
    character: 'david',
    title: "The Stone's Flight",
    narrative:
      'Armed only with a sling and stones, you face the giant. "The Lord who delivered me from the paw of the lion and the paw of the bear will deliver me from the hand of this Philistine."',
    backgroundImage: '/images/valley-of-elah.jpg',
    characterImage: '/images/david-sling.jpg',
    choices: [
      {
        text: "Aim for Goliath's forehead with precision",
        consequence: 'Your stone finds its mark, and Goliath falls.',
        scoreImpact: 30,
        endGame: true,
      },
      {
        text: "Trust completely in God's timing",
        consequence: 'Divine intervention guides your hand.',
        scoreImpact: 25,
        endGame: true,
      },
    ],
  },

  // Jesus Story: Temptation in the Wilderness
  'jesus-1': {
    id: 'jesus-1',
    character: 'jesus',
    title: 'Baptism and Calling',
    narrative:
      "You are Jesus, baptized by John in the Jordan River. The heavens open, and God's voice declares you His beloved Son.",
    backgroundImage: '/images/jordan-river.jpg',
    characterImage: '/images/jesus-baptism.jpg',
    choices: [
      {
        text: 'Embrace your divine mission immediately',
        consequence:
          'You are led by the Spirit into the wilderness for preparation.',
        scoreImpact: 10,
        nextStage: 'jesus-2',
      },
      {
        text: 'Seek solitude to pray and reflect',
        consequence: "Your time of prayer strengthens you for what's ahead.",
        scoreImpact: 15,
        nextStage: 'jesus-2',
      },
    ],
  },
  'jesus-2': {
    id: 'jesus-2',
    character: 'jesus',
    title: 'The First Temptation',
    narrative:
      'In the wilderness, Satan tempts you to turn stones into bread after 40 days of fasting.',
    backgroundImage: '/images/wilderness.jpg',
    characterImage: '/images/jesus-wilderness.jpg',
    choices: [
      {
        text: 'Refuse, quoting Scripture: "Man shall not live by bread alone"',
        consequence: "You resist the temptation through God's Word.",
        scoreImpact: 25,
        nextStage: 'jesus-3',
      },
      {
        text: 'Consider the offer but ultimately decline',
        consequence: 'Your faith wavers but holds strong.',
        scoreImpact: 10,
        nextStage: 'jesus-3',
      },
    ],
  },
  'jesus-3': {
    id: 'jesus-3',
    character: 'jesus',
    title: 'The Pinnacle Temptation',
    narrative:
      "Satan takes you to the pinnacle of the temple, tempting you to test God's protection.",
    backgroundImage: '/images/temple-pinnacle.jpg',
    characterImage: '/images/jesus-temple.jpg',
    choices: [
      {
        text: 'Reject the temptation firmly with Scripture',
        consequence: 'You affirm that you will not put God to the test.',
        scoreImpact: 30,
        endGame: true,
      },
      {
        text: 'Pray for strength to overcome',
        consequence: 'Prayer sustains you through the trial.',
        scoreImpact: 20,
        endGame: true,
      },
    ],
  },
}

export const getStartingStage = (
  character: 'moses' | 'david' | 'jesus'
): string => {
  switch (character) {
    case 'moses':
      return 'moses-1'
    case 'david':
      return 'david-1'
    case 'jesus':
      return 'jesus-1'
    default:
      return 'moses-1'
  }
}
