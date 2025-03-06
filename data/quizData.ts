// // Define the module structure
// export interface Module {
//   id: number
//   title: string
//   description: string
// }

// // Define the question structure
// export interface Question {
//   id: number
//   question: string
//   videoUri: string
//   options: string[]
//   correctOptionIndex: number
// }

// // Define the modules
// export const modules: Module[] = [
//   {
//     id: 1,
//     title: "Introduction to ISL",
//     description: "Learn the basics of Indian Sign Language and its importance.",
//   },
//   {
//     id: 2,
//     title: "Alphabet & Numbers",
//     description: "Learn to sign the alphabet and numbers in Indian Sign Language.",
//   },
//   {
//     id: 3,
//     title: "Basic Greetings & Common Phrases",
//     description: "Learn everyday greetings and common phrases in ISL.",
//   },
//   {
//     id: 4,
//     title: "Days, Months & Time",
//     description: "Learn to sign days of the week, months, and time-related concepts.",
//   },
//   {
//     id: 5,
//     title: "Family & Relationships",
//     description: "Learn signs for family members and relationship terms.",
//   },
//   {
//     id: 6,
//     title: "Colors & Basic Adjectives",
//     description: "Learn to sign colors and basic descriptive words.",
//   },
//   {
//     id: 7,
//     title: "Common Objects & Places",
//     description: "Learn signs for everyday objects and common places.",
//   },
//   {
//     id: 8,
//     title: "Actions & Verbs",
//     description: "Learn to sign common actions and verbs in ISL.",
//   },
//   {
//     id: 9,
//     title: "Question Words & Sentences",
//     description: "Learn to form questions and basic sentences in ISL.",
//   },
//   {
//     id: 10,
//     title: "Sentence Formation & Grammar Basics",
//     description: "Learn the grammar rules and sentence structure in ISL.",
//   },
// ]

// // Sample questions for each module
// // In a real app, you would have a database with all questions
// // This is a simplified version with sample questions

// // This function generates questions for a specific module and set
// export const getQuizQuestions = (moduleId: string, setId: number): Question[] => {
//   // Define the module-to-folder mapping
//   const videoFolders = {
//     "Introduction to ISL": "Introduction to ISL",
//     "Alphabet & Numbers": "Alphabets & Numbers",
//     "Basic Greetings & Common Phrases": "Basic Greetings & Common Phrases",
//     "Days, Months & Time": "Days, Months & Time",
//     "Family & Relationships": "Family & Relationships",
//     "Colors & Basic Adjectives": "Colors & Basic Adjectives",
//     "Common Objects & Places": "Common Objects & Places",
//     "Actions & Verbs": "Actions & Verbs",
//     "Question Words & Sentences": "Question Words & Sentences",
//     "Sentence Formation & Grammar Basics": "Sentence Formation & Grammar Basics",
//   };

//   // Get the correct folder name for the module
//   const folderName = videoFolders[moduleId];
//   if (!folderName) {
//     console.error(`Module ID "${moduleId}" not found.`);
//     return [];
//   }

//   // Load all videos (assuming names are `video1.mp4`, `video2.mp4`, ..., `video22.mp4`)
//   const videos = Array.from({ length: 22 }, (_, i) =>
//     require(`../videos/${folderName}/video${i + 1}.mp4`)
//   );

//   // Define sample question prompts
//   const questionPrompts = [
//     "What does this sign mean?",
//     "Identify this sign.",
//     "Which of these represents the shown sign?",
//     "Choose the correct meaning of this sign.",
//     "This sign is used for?",
//   ];

//   // Generate 22 questions (1 per video)
//   const allQuestions: Question[] = videos.map((videoUri, index) => ({
//     id: index + 1,
//     videoUri,
//     question: questionPrompts[index % questionPrompts.length], // Cycle through prompts
//     options: shuffleArray(["Hello", "Goodbye", "Thank You", "Sorry"]), // Replace with real options
//     correctOptionIndex: Math.floor(Math.random() * 4), // Random correct answer
//   }));

//   // Shuffle and pick 10 questions for the selected set
//   const selectedQuestions = shuffleArray(allQuestions).slice((setId - 1) * 10, setId * 10);

//   return selectedQuestions;
// };


// // Function to shuffle an array (Fisher-Yates algorithm)
// export function shuffleArray<T>(array: T[]): T[] {
//   const newArray = [...array]
//   for (let i = newArray.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1))
//     ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
//   }
//   return newArray
// }

// Define the module structure
// Define the module structure
// Define the module structure
export interface Module {
  id: number;
  title: string;
  description: string;
}

// Define the question structure
export interface Question {
  id: number;
  question: string;
  videoUri: any;
  options: string[];
  correctOptionIndex: number;
}

// Define valid module names
export const moduleNames = [
  "Introduction to ISL",
  "Alphabets & Numbers",
  "Basic Greetings & Common Phrases",
  "Days, Months & Time",
  "Family & Relationships",
  "Colors & Basic Adjectives",
  "Common Objects & Places",
  "Actions & Verbs",
  "Question Words & Sentences",
  "Sentence Formation & Grammar Basics",
] as const;

export type ModuleName = (typeof moduleNames)[number];

// Define the modules
export const modules: Module[] = moduleNames.map((name, index) => ({
  id: index + 1,
  title: name,
  description: `Learn about ${name} in Indian Sign Language.`,
}));

// **Manually Define Video Paths and Options**
const videoMap: Record<ModuleName, { videoUri: any; options: string[]; correctOptionIndex: number }[]> = {
  "Introduction to ISL": [
    {
      videoUri: require("../videos/Introduction to ISL/Fast.mp4"),
      options: ["A", "B", "C", "D"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Introduction to ISL/Help.mp4"),
      options: ["A.T.M. Card", "Credit Card", "Debit Card", "ID Card"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Introduction to ISL/Love.mp4"),
      options: ["A", "B", "C", "D"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Introduction to ISL/Morning.mp4"),
      options: ["A", "B", "C", "D"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Introduction to ISL/Night.mp4"),
      options: ["A", "B", "C", "D"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Introduction to ISL/No.mp4"),
      options: ["A", "B", "C", "D"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Introduction to ISL/Please.mp4"),
      options: ["A", "B", "C", "D"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Introduction to ISL/Slow.mp4"),
      options: ["A", "B", "C", "D"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Introduction to ISL/Sorry.mp4"),
      options: ["A", "B", "C", "D"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Introduction to ISL/ThankYou.mp4"),
      options: ["A", "B", "C", "D"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Introduction to ISL/Understand.mp4"),
      options: ["A", "B", "C", "D"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Introduction to ISL/Where.mp4"),
      options: ["A", "B", "C", "D"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Introduction to ISL/Who.mp4"),
      options: ["A", "B", "C", "D"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Introduction to ISL/Yes.mp4"),
      options: ["A", "B", "C", "D"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Introduction to ISL/Hello.mp4"),
      options: ["A", "B", "C", "D"],
      correctOptionIndex: 0,
    }
  ],

  "Alphabets & Numbers": [
    {
      videoUri: require("../videos/Alphabets & Numbers/A/A.mp4"),
      options: ["A", "B", "C", "D"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/A/A.T.M.Card.mp4"),
      options: ["A.T.M. Card", "Credit Card", "Passport", "Driving License"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/A/AadharCard.mp4"),
      options: ["Aadhar Card", "PAN Card", "Voter ID", "Ration Card"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/A/Absorb.mp4"),
      options: ["Absorb", "Release", "Throw", "Ignore"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/A/Accept.mp4"),
      options: ["Accept", "Reject", "Deny", "Ignore"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/A/Accuse.mp4"),
      options: ["Accuse", "Forgive", "Ignore", "Help"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/A/Agree.mp4"),
      options: ["Agree", "Disagree", "Argue", "Doubt"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/A/Allow.mp4"),
      options: ["Allow", "Forbid", "Block", "Stop"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/A/April.mp4"),
      options: ["April", "May", "June", "July"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/A/Arrest.mp4"),
      options: ["Arrest", "Release", "Rescue", "Ignore"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/A/August.mp4"),
      options: ["August", "September", "October", "November"],
      correctOptionIndex: 0,
    },
    

    {
      videoUri: require("../videos/Alphabets & Numbers/B/B.mp4"),
      options: ["A", "B", "C", "D"],
      correctOptionIndex: 1,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/B/Baby.mp4"),
      options: ["Child", "Baby", "Teen", "Adult"],
      correctOptionIndex: 1,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/B/Boy.mp4"),
      options: ["Girl", "Boy", "Man", "Woman"],
      correctOptionIndex: 1,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/B/Brother.mp4"),
      options: ["Sister", "Brother", "Uncle", "Father"],
      correctOptionIndex: 1,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/B/Brother-In-Law.mp4"),
      options: ["Brother-In-Law", "Father-In-Law", "Cousin", "Nephew"],
      correctOptionIndex: 1,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/B/Building.mp4"),
      options: ["Tree", "Building", "Bridge", "Mountain"],
      correctOptionIndex: 1,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/B/BusStand.mp4"),
      options: ["Railway Station", "Bus Stand", "Airport", "Metro Station"],
      correctOptionIndex: 1,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/B/But.mp4"),
      options: ["And", "But", "Or", "Because"],
      correctOptionIndex: 1,
    },
    


    {
      videoUri: require("../videos/Alphabets & Numbers/Numbers/10,000,000 or One Crore.mp4"),
      options: ["1 Million", "1 Crore", "100 Thousand", "10 Thousand"],
      correctOptionIndex: 1,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/Numbers/1000 or One Thousand.mp4"),
      options: ["1000", "10", "100", "10000"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/Numbers/0 or Zero - Copy.mp4"),
      options: ["Zero", "1000", "10", "10000"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/Numbers/1 or One.mp4"),
      options: ["1", "10", "100", "1000"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/Numbers/5,000,000 or Five Million.mp4"),
      options: ["5 Million", "50 Thousand", "1 Million", "500 Thousand"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/Numbers/6 or Six.mp4"),
      options: ["6", "16", "60", "600"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/Numbers/10 or Ten.mp4"),
      options: ["100", "1000", "10", "1"],
      correctOptionIndex: 2,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/Numbers/15 or Fifteen.mp4"),
      options: ["50", "15", "5", "500"],
      correctOptionIndex: 1,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/Numbers/20 or Twenty.mp4"),
      options: ["12", "22", "20", "200"],
      correctOptionIndex: 2,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/Numbers/50Th or Fiftieth.mp4"),
      options: ["5th", "50th", "15th", "55th"],
      correctOptionIndex: 1,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/Numbers/100 or One Hundred.mp4"),
      options: ["10", "100", "1000", "1"],
      correctOptionIndex: 1,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/Numbers/100,000 or One Lac.mp4"),
      options: ["10 Thousand", "1 Million", "100 Thousand", "10 Lac"],
      correctOptionIndex: 2,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/Numbers/1000 or One Thousand.mp4"),
      options: ["10000", "1000", "100", "10"],
      correctOptionIndex: 1,
    },
    


    {
      videoUri: require("../videos/Alphabets & Numbers/C/C.mp4"),
      options: ["O", "D", "P", "C"],
      correctOptionIndex: 3,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/C/Charger (Phone).mp4"),
      options: ["Charger", "Cable", "Pen", "Book"],
      correctOptionIndex: 3,
    },


    {
      videoUri: require("../videos/Alphabets & Numbers/Q/Q.mp4"),
      options: ["O", "D", "Q", "C"],
      correctOptionIndex: 2,
    }, 


    {
      videoUri: require("../videos/Alphabets & Numbers/V/V.mp4"),
      options: ["O", "D", "P", "V"],
      correctOptionIndex: 3,
    },


    {
      videoUri: require("../videos/Alphabets & Numbers/D/D.mp4"),
      options: ["O", "D", "P", "V"],
      correctOptionIndex: 1,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/D/Dangerous.mp4"),
      options: ["Safe", "Dangerous", "Careful", "Calm"],
      correctOptionIndex: 1,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/D/Daughter.mp4"),
      options: ["Son", "Mother", "Daughter", "Sister"],
      correctOptionIndex: 2,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/D/Day.mp4"),
      options: ["Night", "Week", "Month", "Day"],
      correctOptionIndex: 3,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/D/Deaf.mp4"),
      options: ["Blind", "Mute", "Deaf", "Lame"],
      correctOptionIndex: 2,
    },
    {
      videoUri: require("../videos/Alphabets & Numbers/D/December.mp4"),
      options: ["January", "March", "December", "July"],
      correctOptionIndex: 2,
    },
    

    {
  videoUri: require("../videos/Alphabets & Numbers/D/D.mp4"),
  options: ["O", "D", "P", "V"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/D/Dangerous.mp4"),
  options: ["Safe", "Dangerous", "Careful", "Calm"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/D/Daughter.mp4"),
  options: ["Son", "Mother", "Daughter", "Sister"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/D/Day.mp4"),
  options: ["Night", "Week", "Month", "Day"],
  correctOptionIndex: 3,
},
{
  videoUri: require("../videos/Alphabets & Numbers/D/Deaf.mp4"),
  options: ["Blind", "Mute", "Deaf", "Lame"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/D/December.mp4"),
  options: ["January", "March", "December", "July"],
  correctOptionIndex: 2,
},


{
  videoUri: require("../videos/Alphabets & Numbers/E/E.mp4"),
  options: ["A", "E", "I", "O"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/E/Earn.mp4"),
  options: ["Spend", "Earn", "Lose", "Borrow"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/E/Eat [VEB] or Food.mp4"),
  options: ["Drink", "Eat", "Cook", "Sleep"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/E/Enemy.mp4"),
  options: ["Friend", "Ally", "Enemy", "Partner"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/E/Evening.mp4"),
  options: ["Morning", "Afternoon", "Night", "Evening"],
  correctOptionIndex: 3,
},


{
  videoUri: require("../videos/Alphabets & Numbers/F/F.mp4"),
  options: ["A", "B", "F", "H"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/F/Family.mp4"),
  options: ["Friends", "Family", "Neighbors", "Relatives"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/F/Father.mp4"),
  options: ["Father", "Mother", "Uncle", "Grandfather"],
  correctOptionIndex: 0,
},
{
  videoUri: require("../videos/Alphabets & Numbers/F/February.mp4"),
  options: ["January", "March", "February", "April"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/F/Feed.mp4"),
  options: ["Eat", "Feed", "Cook", "Sleep"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/F/Follow.mp4"),
  options: ["Ignore", "Follow", "Lead", "Avoid"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/F/Friday.mp4"),
  options: ["Monday", "Friday", "Sunday", "Wednesday"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/F/Friend.mp4"),
  options: ["Enemy", "Stranger", "Friend", "Neighbor"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/F/Fry.mp4"),
  options: ["Boil", "Steam", "Fry", "Bake"],
  correctOptionIndex: 2,
},


{
  videoUri: require("../videos/Alphabets & Numbers/G/G.mp4"),
  options: ["Boil", "Steam", "Fry", "Bake"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/G/Get.mp4"),
  options: ["Boil", "Steam", "Fry", "Bake"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/G/Girl.mp4"),
  options: ["Boil", "Steam", "Fry", "Bake"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/G/Google.mp4"),
  options: ["Boil", "Steam", "Fry", "Bake"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/G/Granddaughter.mp4"),
  options: ["Boil", "Steam", "Fry", "Bake"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/G/Grandfather.mp4"),
  options: ["Boil", "Steam", "Fry", "Bake"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/G/Grandmother.mp4"),
  options: ["Boil", "Steam", "Fry", "Bake"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/G/Grandson.mp4"),
  options: ["Boil", "Steam", "Fry", "Bake"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/G/Group.mp4"),
  options: ["Boil", "Steam", "Fry", "Bake"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/G/Guest.mp4"),
  options: ["Boil", "Steam", "Fry", "Bake"],
  correctOptionIndex: 2,
},


{
  videoUri: require("../videos/Alphabets & Numbers/H/H.mp4"),
  options: ["A", "B", "H", "G"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/H/Handicapped.mp4"),
  options: ["Healthy", "Handicapped", "Strong", "Fit"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/H/Hello.mp4"),
  options: ["Goodbye", "Hello", "Thanks", "Sorry"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/H/Hide.mp4"),
  options: ["Show", "Search", "Hide", "Find"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/H/Holiday.mp4"),
  options: ["Work", "Holiday", "Meeting", "Exam"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/H/Home or House.mp4"),
  options: ["Office", "Hotel", "Home", "Market"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/H/How Many.mp4"),
  options: ["Where", "What", "How Many", "Who"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/H/How.mp4"),
  options: ["Where", "When", "What", "How"],
  correctOptionIndex: 3,
},
{
  videoUri: require("../videos/Alphabets & Numbers/H/Hungry.mp4"),
  options: ["Sleepy", "Thirsty", "Hungry", "Tired"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/H/Hurt.mp4"),
  options: ["Happy", "Hurt", "Fine", "Strong"],
  correctOptionIndex: 1,
},


{
  videoUri: require("../videos/Alphabets & Numbers/I/I (Person).mp4"),
  options: ["You", "I", "He", "She"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/I/If.mp4"),
  options: ["Then", "If", "Because", "When"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/I/Important.mp4"),
  options: ["Trivial", "Important", "Unnecessary", "Common"],
  correctOptionIndex: 1,
},


{
  videoUri: require("../videos/Alphabets & Numbers/J/J.mp4"),
  options: ["A", "J", "M", "Z"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/J/January.mp4"),
  options: ["March", "April", "January", "June"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/J/July.mp4"),
  options: ["July", "September", "November", "December"],
  correctOptionIndex: 0,
},
{
  videoUri: require("../videos/Alphabets & Numbers/J/June.mp4"),
  options: ["August", "June", "October", "May"],
  correctOptionIndex: 1,
},


{
  videoUri: require("../videos/Alphabets & Numbers/K/K.mp4"),
  options: ["A", "B", "K", "M"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/K/Kill or Murder.mp4"),
  options: ["Save", "Protect", "Kill", "Help"],
  correctOptionIndex: 2,
},


{
  videoUri: require("../videos/Alphabets & Numbers/L/L.mp4"),
  options: ["J", "L", "M", "N"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/L/Laptop.mp4"),
  options: ["Tablet", "Desktop", "Laptop", "Mobile"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/L/Lend.mp4"),
  options: ["Borrow", "Give", "Lend", "Take"],
  correctOptionIndex: 2,
},



{
  videoUri: require("../videos/Alphabets & Numbers/M/M.mp4"),
  options: ["A", "B", "M", "Z"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/M/Man.mp4"),
  options: ["Woman", "Boy", "Man", "Girl"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/M/March.mp4"),
  options: ["January", "March", "December", "July"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/M/May.mp4"),
  options: ["April", "June", "May", "July"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/M/Me.mp4"),
  options: ["You", "Me", "They", "We"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/M/Meet.mp4"),
  options: ["Ignore", "Meet", "Avoid", "Forget"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/M/Mobile.mp4"),
  options: ["Laptop", "Tablet", "Mobile", "Computer"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/M/Monday.mp4"),
  options: ["Sunday", "Tuesday", "Monday", "Friday"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/M/Month.mp4"),
  options: ["Week", "Year", "Month", "Day"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/M/Morning.mp4"),
  options: ["Evening", "Night", "Morning", "Afternoon"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/M/Mother.mp4"),
  options: ["Father", "Mother", "Brother", "Sister"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/M/Mother-In-Law.mp4"),
  options: ["Father-In-Law", "Mother-In-Law", "Sister-In-Law", "Uncle"],
  correctOptionIndex: 1,
},


{
  videoUri: require("../videos/Alphabets & Numbers/N/N.mp4"),
  options: ["M", "N", "O", "P"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/N/Name.mp4"),
  options: ["Address", "Age", "Name", "Gender"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/N/Necessary.mp4"),
  options: ["Unimportant", "Optional", "Necessary", "Rare"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/N/Neighbor.mp4"),
  options: ["Friend", "Stranger", "Neighbor", "Guest"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/N/New Year.mp4"),
  options: ["Christmas", "Diwali", "New Year", "Holi"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/N/Night.mp4"),
  options: ["Morning", "Afternoon", "Evening", "Night"],
  correctOptionIndex: 3,
},
{
  videoUri: require("../videos/Alphabets & Numbers/N/No.mp4"),
  options: ["Yes", "No", "Maybe", "Alright"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/N/Noon.mp4"),
  options: ["Morning", "Noon", "Evening", "Night"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/N/November.mp4"),
  options: ["September", "October", "November", "December"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/N/Number.mp4"),
  options: ["Letter", "Symbol", "Number", "Word"],
  correctOptionIndex: 2,
},


{
  videoUri: require("../videos/Alphabets & Numbers/O/O.mp4"),
  options: ["N", "O", "P", "Q"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/O/October.mp4"),
  options: ["August", "September", "October", "November"],
  correctOptionIndex: 2,
},


{
  videoUri: require("../videos/Alphabets & Numbers/P/P.mp4"),
  options: ["O", "P", "Q", "R"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/P/P.A.N. Card.mp4"),
  options: ["Aadhar Card", "Voter ID", "P.A.N. Card", "Ration Card"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/P/Paternal Aunt.mp4"),
  options: ["Maternal Uncle", "Paternal Aunt", "Cousin", "Grandmother"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/P/Pay.mp4"),
  options: ["Receive", "Borrow", "Pay", "Lend"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/P/Please.mp4"),
  options: ["Thank You", "Sorry", "Please", "Excuse Me"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/P/Police.mp4"),
  options: ["Doctor", "Firefighter", "Police", "Lawyer"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/P/Poor.mp4"),
  options: ["Rich", "Middle-Class", "Poor", "Wealthy"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/P/Promise.mp4"),
  options: ["Lie", "Break", "Promise", "Forget"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/P/Protect.mp4"),
  options: ["Harm", "Protect", "Attack", "Ignore"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/P/Prove.mp4"),
  options: ["Guess", "Doubt", "Prove", "Assume"],
  correctOptionIndex: 2,
},


{
  videoUri: require("../videos/Alphabets & Numbers/R/R.mp4"),
  options: ["P", "Q", "R", "S"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/R/Racket or Scam.mp4"),
  options: ["Fraud", "Honesty", "Racket or Scam", "Business"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/R/Reach.mp4"),
  options: ["Stop", "Reach", "Leave", "Ignore"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/R/Recognize.mp4"),
  options: ["Forget", "Recognize", "Ignore", "Deny"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/R/Repair.mp4"),
  options: ["Break", "Destroy", "Repair", "Replace"],
  correctOptionIndex: 2,
},


{
  videoUri: require("../videos/Alphabets & Numbers/S/S.mp4"),
  options: ["R", "S", "T", "U"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/S/Sad.mp4"),
  options: ["Happy", "Angry", "Sad", "Excited"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/S/Saturday.mp4"),
  options: ["Monday", "Friday", "Wednesday", "Saturday"],
  correctOptionIndex: 3,
},
{
  videoUri: require("../videos/Alphabets & Numbers/S/Save.mp4"),
  options: ["Spend", "Lose", "Save", "Waste"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/S/Search.mp4"),
  options: ["Find", "Search", "Ignore", "Forget"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/S/Send.mp4"),
  options: ["Receive", "Send", "Deliver", "Pick"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/S/September.mp4"),
  options: ["July", "August", "September", "October"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/S/Sister.mp4"),
  options: ["Brother", "Mother", "Sister", "Aunt"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/S/Society.mp4"),
  options: ["Community", "Village", "City", "Society"],
  correctOptionIndex: 3,
},
{
  videoUri: require("../videos/Alphabets & Numbers/S/Son.mp4"),
  options: ["Daughter", "Nephew", "Son", "Father"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/S/Sorry.mp4"),
  options: ["Thank You", "Please", "Sorry", "Excuse Me"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/S/Stop.mp4"),
  options: ["Go", "Stop", "Move", "Start"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/S/Sunday.mp4"),
  options: ["Saturday", "Monday", "Sunday", "Thursday"],
  correctOptionIndex: 2,
},


{
  videoUri: require("../videos/Alphabets & Numbers/T/T.mp4"),
  options: ["R", "S", "T", "U"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/T/Thank You.mp4"),
  options: ["Sorry", "Welcome", "Thank You", "Please"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/T/Thirsty.mp4"),
  options: ["Hungry", "Sleepy", "Thirsty", "Tired"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/T/Thursday.mp4"),
  options: ["Monday", "Thursday", "Saturday", "Tuesday"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/T/Time.mp4"),
  options: ["Clock", "Time", "Day", "Night"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/T/Today.mp4"),
  options: ["Tomorrow", "Yesterday", "Today", "Now"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/T/Tomorrow.mp4"),
  options: ["Yesterday", "Today", "Tomorrow", "Morning"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/T/Train Station.mp4"),
  options: ["Airport", "Bus Stand", "Train Station", "Metro Station"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/T/Tuesday.mp4"),
  options: ["Monday", "Tuesday", "Thursday", "Friday"],
  correctOptionIndex: 1,
},


{
  videoUri: require("../videos/Alphabets & Numbers/U/U.mp4"),
  options: ["T", "U", "V", "W"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/U/Use.mp4"),
  options: ["Throw", "Use", "Ignore", "Break"],
  correctOptionIndex: 1,
},


{
  videoUri: require("../videos/Alphabets & Numbers/W/W.mp4"),
  options: ["U", "V", "W", "X"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/W/Want.mp4"),
  options: ["Need", "Want", "Give", "Ignore"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/W/Wednesday.mp4"),
  options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/W/Week.mp4"),
  options: ["Day", "Month", "Year", "Week"],
  correctOptionIndex: 3,
},
{
  videoUri: require("../videos/Alphabets & Numbers/W/Welcome.mp4"),
  options: ["Goodbye", "Welcome", "Sorry", "Please"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/W/What.mp4"),
  options: ["Where", "When", "What", "Who"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/W/Whatsapp.mp4"),
  options: ["Instagram", "Facebook", "Whatsapp", "Twitter"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/W/When.mp4"),
  options: ["Where", "Who", "How", "When"],
  correctOptionIndex: 3,
},
{
  videoUri: require("../videos/Alphabets & Numbers/W/Where.mp4"),
  options: ["Where", "What", "Why", "Which"],
  correctOptionIndex: 0,
},
{
  videoUri: require("../videos/Alphabets & Numbers/W/Who.mp4"),
  options: ["When", "Who", "How", "What"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/W/Whom.mp4"),
  options: ["Where", "Whom", "Which", "Why"],
  correctOptionIndex: 1,
},
{
  videoUri: require("../videos/Alphabets & Numbers/W/Wifi.mp4"),
  options: ["Internet", "Bluetooth", "Wifi", "Hotspot"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/W/Woman.mp4"),
  options: ["Man", "Boy", "Woman", "Girl"],
  correctOptionIndex: 2,
},


{
  videoUri: require("../videos/Alphabets & Numbers/X/X.mp4"),
  options: ["A", "B", "X", "Z"],
  correctOptionIndex: 2,
},


{
  videoUri: require("../videos/Alphabets & Numbers/Y/Y.mp4"),
  options: ["W", "X", "Y", "Z"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/Y/Year.mp4"),
  options: ["Month", "Week", "Year", "Day"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/Y/Yes.mp4"),
  options: ["No", "Maybe", "Yes", "Never"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/Y/Yesterday.mp4"),
  options: ["Tomorrow", "Now", "Yesterday", "Today"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/Y/You.mp4"),
  options: ["I", "He", "You", "They"],
  correctOptionIndex: 2,
},
{
  videoUri: require("../videos/Alphabets & Numbers/Y/Youtube.mp4"),
  options: ["Facebook", "Instagram", "Youtube", "Twitter"],
  correctOptionIndex: 2,
},


{
  videoUri: require("../videos/Alphabets & Numbers/Z/Z.mp4"),
  options: ["S", "P", "Z", "B"],
  correctOptionIndex: 2,
},

  ],


  // "Basic Greetings & Common Phrases": [
  //   {
  //     videoUri: require("../videos/Basic Greetings & Common Phrases/Afternoon.mp4"),
  //     options: ["Night", "Good", "Thank No", "Afternoon"],
  //     correctOptionIndex: 3,
  //   },
  //   {
  //     videoUri: require("../videos/Basic Greetings & Common Phrases/Sorry.mp4"),
  //     options: ["Sorry", "Good Night", "See You", "Welcome"],
  //     correctOptionIndex: 0,
  //   },
  // ],
  "Basic Greetings & Common Phrases": [
    {
      videoUri: require("../videos/Basic Greetings & Common Phrases/Afternoon.mp4"),
      options: ["Morning", "Afternoon", "Evening", "Night"],
      correctOptionIndex: 1,
    },
    {
      videoUri: require("../videos/Basic Greetings & Common Phrases/Bad.mp4"),
      options: ["Good", "Bad", "Correct", "Wrong"],
      correctOptionIndex: 1,
    },
    {
      videoUri: require("../videos/Basic Greetings & Common Phrases/Correct.mp4"),
      options: ["Wrong", "Bad", "Correct", "Help"],
      correctOptionIndex: 2,
    },
    {
      videoUri: require("../videos/Basic Greetings & Common Phrases/Evening.mp4"),
      options: ["Morning", "Afternoon", "Evening", "Night"],
      correctOptionIndex: 2,
    },
    {
      videoUri: require("../videos/Basic Greetings & Common Phrases/Good.mp4"),
      options: ["Bad", "Good", "Correct", "Wrong"],
      correctOptionIndex: 1,
    },
    {
      videoUri: require("../videos/Basic Greetings & Common Phrases/Help.mp4"),
      options: ["Please", "Thank You", "Help", "Welcome"],
      correctOptionIndex: 2,
    },
    {
      videoUri: require("../videos/Basic Greetings & Common Phrases/Later.mp4"),
      options: ["Now", "Later", "Soon", "Never"],
      correctOptionIndex: 1,
    },
    {
      videoUri: require("../videos/Basic Greetings & Common Phrases/Morning.mp4"),
      options: ["Morning", "Afternoon", "Evening", "Night"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Basic Greetings & Common Phrases/Night.mp4"),
      options: ["Morning", "Afternoon", "Evening", "Night"],
      correctOptionIndex: 3,
    },
    {
      videoUri: require("../videos/Basic Greetings & Common Phrases/No.mp4"),
      options: ["Yes", "No", "Maybe", "Later"],
      correctOptionIndex: 1,
    },
    {
      videoUri: require("../videos/Basic Greetings & Common Phrases/Please.mp4"),
      options: ["Sorry", "Thank You", "Please", "Welcome"],
      correctOptionIndex: 2,
    },
    {
      videoUri: require("../videos/Basic Greetings & Common Phrases/Sorry.mp4"),
      options: ["Please", "Sorry", "Thank You", "Welcome"],
      correctOptionIndex: 1,
    },
    {
      videoUri: require("../videos/Basic Greetings & Common Phrases/Thank You.mp4"),
      options: ["Please", "Sorry", "Thank You", "Welcome"],
      correctOptionIndex: 2,
    },
    {
      videoUri: require("../videos/Basic Greetings & Common Phrases/Welcome.mp4"),
      options: ["Please", "Sorry", "Thank You", "Welcome"],
      correctOptionIndex: 3,
    },
    {
      videoUri: require("../videos/Basic Greetings & Common Phrases/Wrong.mp4"),
      options: ["Correct", "Bad", "Wrong", "Help"],
      correctOptionIndex: 2,
    },
    {
      videoUri: require("../videos/Basic Greetings & Common Phrases/Yes.mp4"),
      options: ["Yes", "No", "Maybe", "Later"],
      correctOptionIndex: 0,
    },
  ],


  // "Actions & Verbs": [
  //   {
  //     videoUri: require("../videos/Actions & Verbs/Borrow.mp4"),
  //     options: ["Call", "Borrow", "Eat", "Write"],
  //     correctOptionIndex: 1,
  //   },
  //   {
  //     videoUri: require("../videos/Actions & Verbs/Dislike.mp4"),
  //     options: ["Do", "Walk", "Drink", "Dislike"],
  //     correctOptionIndex: 3,
  //   },
  //   {
  //     videoUri: require("../videos/Actions & Verbs/Run.mp4"),
  //     options: ["Run", "Eat", "Stand", "Catch"],
  //     correctOptionIndex: 0,
  //   }, {
  //     videoUri: require("../videos/Actions & Verbs/Eat.mp4"),
  //     options: ["Write", "Touch", "Eat", "Call"],
  //     correctOptionIndex: 2,
  //   }, {
  //     videoUri: require("../videos/Actions & Verbs/Defend.mp4"),
  //     options: ["Jump", "Defend", "Call", "Doubt"],
  //     correctOptionIndex: 1,
  //   }, {
  //     videoUri: require("../videos/Actions & Verbs/Slap.mp4"),
  //     options: ["Slap", "Cross", "Draw", "Communicate"],
  //     correctOptionIndex: 0,
  //   }, {
  //     videoUri: require("../videos/Actions & Verbs/Disagree.mp4"),
  //     options: ["Drink", "Catch", "Stand", "Disagree"],
  //     correctOptionIndex: 3,
  //   }, {
  //     videoUri: require("../videos/Actions & Verbs/Walk.mp4"),
  //     options: ["Stand", "Walk", "Do", "Run"],
  //     correctOptionIndex: 1,
  //   }, {
  //     videoUri: require("../videos/Actions & Verbs/Call.mp4"),
  //     options: ["Run", "Jump", "Call", "Write"],
  //     correctOptionIndex: 2,
  //   }, {
  //     videoUri: require("../videos/Actions & Verbs/Touch.mp4"),
  //     options: ["Touch", "Dislike", "Sleep", "Walk"],
  //     correctOptionIndex: 0,
  //   },
  // ],

  "Actions & Verbs": [
    {
      videoUri: require("../videos/Actions & Verbs/Borrow.mp4"),
      options: ["Call", "Borrow", "Eat", "Write"],
      correctOptionIndex: 1,
    },
   {
      videoUri: require("../videos/Actions & Verbs/Catch.mp4"),
      options: ["Catch", "Do", "Eat", "Write"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Actions & Verbs/Dislike.mp4"),
      options: ["Do", "Walk", "Drink", "Dislike"],
      correctOptionIndex: 3,
    },
    {
      videoUri: require("../videos/Actions & Verbs/Run.mp4"),
      options: ["Run", "Eat", "Stand", "Catch"],
      correctOptionIndex: 0,
    }, {
      videoUri: require("../videos/Actions & Verbs/Eat.mp4"),
      options: ["Write", "Touch", "Eat", "Call"],
      correctOptionIndex: 2,
    }, {
      videoUri: require("../videos/Actions & Verbs/Defend.mp4"),
      options: ["Jump", "Defend", "Call", "Doubt"],
      correctOptionIndex: 1,
    }, {
      videoUri: require("../videos/Actions & Verbs/Slap.mp4"),
      options: ["Slap", "Cross", "Draw", "Communicate"],
      correctOptionIndex: 0,
    }, {
      videoUri: require("../videos/Actions & Verbs/Disagree.mp4"),
      options: ["Drink", "Catch", "Stand", "Disagree"],
      correctOptionIndex: 3,
    }, {
      videoUri: require("../videos/Actions & Verbs/Walk.mp4"),
      options: ["Stand", "Walk", "Do", "Run"],
      correctOptionIndex: 1,
    }, {
      videoUri: require("../videos/Actions & Verbs/Call.mp4"),
      options: ["Run", "Jump", "Call", "Write"],
      correctOptionIndex: 2,
    }, {
      videoUri: require("../videos/Actions & Verbs/Touch.mp4"),
      options: ["Touch", "Dislike", "Sleep", "Walk"],
      correctOptionIndex: 0,
    },
  {
      videoUri: require("../videos/Actions & Verbs/Communicate.mp4"),
      options: ["Doubt", "Communicate", "Eat", "Walk"],
      correctOptionIndex: 1,
    },
  {
      videoUri: require("../videos/Actions & Verbs/Cross.mp4"),
      options: ["Call", "Borrow", "Eat", "Cross"],
      correctOptionIndex: 3,
    },
  {
      videoUri: require("../videos/Actions & Verbs/Do.mp4"),
      options: ["Cross", "Borrow", "Do", "Touch"],
      correctOptionIndex: 2,
    },
  {
      videoUri: require("../videos/Actions & Verbs/Doubt.mp4"),
      options: ["Doubt", "Draw", "Jump", "Write"],
      correctOptionIndex: 0,
    },
  {
      videoUri: require("../videos/Actions & Verbs/Draw.mp4"),
      options: ["Communicate", "Run", "Draw", "Catch"],
      correctOptionIndex: 2,
    },  {
      videoUri: require("../videos/Actions & Verbs/Drink.mp4"),
      options: ["Drink", "Borrow", "Eat", "Write"],
      correctOptionIndex: 0,
    },
  {
      videoUri: require("../videos/Actions & Verbs/Jump.mp4"),
      options: ["Call", "Sleep", "Jump", "Do"],
      correctOptionIndex: 2,
    },
  {
      videoUri: require("../videos/Actions & Verbs/Sleep.mp4"),
      options: ["Sleep", "Borrow", "Eat", "Write"],
      correctOptionIndex: 0,
    },
  {
      videoUri: require("../videos/Actions & Verbs/Stand.mp4"),
      options: ["Catch", "Sleep", "Doubt", "Stand"],
      correctOptionIndex: 3,
    },
  {
      videoUri: require("../videos/Actions & Verbs/Write.mp4"),
      options: ["Cross", "Jump", "Slap", "Write"],
      correctOptionIndex: 3,
    },
  ],


  "Question Words & Sentences": [
    {
      videoUri: require("../videos/Question Words & Sentences/Where.mp4"),
      options: ["How", "Where", "If", "Why"],
      correctOptionIndex: 1,
    },
    {
      videoUri: require("../videos/Question Words & Sentences/What.mp4"),
      options: ["If", "Why", "Who", "What"],
      correctOptionIndex: 3,
    },
    {
      videoUri: require("../videos/Question Words & Sentences/How.mp4"),
      options: ["How", "Whom", "If", "Why"],
      correctOptionIndex: 0,
    },  {
      videoUri: require("../videos/Question Words & Sentences/Whose.mp4"),
      options: ["If", "Whose", "When", "Who"],
      correctOptionIndex: 1,
    },  {
      videoUri: require("../videos/Question Words & Sentences/Which.mp4"),
      options: ["Where", "Whom", "Which", "What"],
      correctOptionIndex: 2,
    },  {
      videoUri: require("../videos/Question Words & Sentences/If.mp4"),
      options: ["If", "When", "How", "Whose"],
      correctOptionIndex: 0,
    },  {
      videoUri: require("../videos/Question Words & Sentences/Whom.mp4"),
      options: ["How", "Where", "Whom", "Why"],
      correctOptionIndex: 2,
    },  {
      videoUri: require("../videos/Question Words & Sentences/When.mp4"),
      options: ["Whose", "What", "If", "When"],
      correctOptionIndex: 3,
    },  {
      videoUri: require("../videos/Question Words & Sentences/Who.mp4"),
      options: ["Who", "Where", "What", "Why"],
      correctOptionIndex: 0,
    },  {
      videoUri: require("../videos/Question Words & Sentences/Why.mp4"),
      options: ["How", "When", "Whom", "Why"],
      correctOptionIndex: 3,
    },
{
      videoUri: require("../videos/Question Words & Sentences/How Many.mp4"),
      options: ["How Many", "When", "Whom", "Why"],
      correctOptionIndex: 0,
    },{
      videoUri: require("../videos/Question Words & Sentences/Can.mp4"),
      options: ["What", "When", "Can", "Where"],
      correctOptionIndex: 2,
    },{
      videoUri: require("../videos/Question Words & Sentences/How Much.mp4"),
      options: ["How", "When", "How Much", "Why"],
      correctOptionIndex: 2,
    },
],


  "Common Objects & Places": [
    {
      videoUri: require("../videos/Common Objects & Places/Bag.mp4"),
      options: ["Bag", "Book", "Bottle", "Chair"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Common Objects & Places/Bank.mp4"),
      options: ["Hospital", "Bank", "Temple", "Market"],
      correctOptionIndex: 1,
    },
    {
      videoUri: require("../videos/Common Objects & Places/Book.mp4"),
      options: ["Pen", "Book", "Table", "Chair"],
      correctOptionIndex: 1,
    },
    {
      videoUri: require("../videos/Common Objects & Places/Bottle.mp4"),
      options: ["Water", "Bottle", "Bag", "Food"],
      correctOptionIndex: 1,
    },
    {
      videoUri: require("../videos/Common Objects & Places/Chair.mp4"),
      options: ["Chair", "Clothes", "Pen", "Door"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Common Objects & Places/Clothes.mp4"),
      options: ["Money", "Clothes", "School", "College"],
      correctOptionIndex: 1,
    },
    {
      videoUri: require("../videos/Common Objects & Places/College.mp4"),
      options: ["Market", "School", "College", "Park"],
      correctOptionIndex: 2,
    },
    {
      videoUri: require("../videos/Common Objects & Places/Door.mp4"),
      options: ["Temple", "Door", "Hospital", "Mobile"],
      correctOptionIndex: 1,
    },
    {
      videoUri: require("../videos/Common Objects & Places/Food.mp4"),
      options: ["Food", "Bag", "Water", "Bank"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Common Objects & Places/Hospital.mp4"),
      options: ["Market", "Temple", "Hospital", "School"],
      correctOptionIndex: 2,
    },
    {
      videoUri: require("../videos/Common Objects & Places/Market.mp4"),
      options: ["Park", "Market", "Chair", "Door"],
      correctOptionIndex: 1,
    },
    {
      videoUri: require("../videos/Common Objects & Places/Mobile.mp4"),
      options: ["Mobile", "Money", "Pen", "Book"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Common Objects & Places/Money.mp4"),
      options: ["Money", "Clothes", "Bottle", "School"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Common Objects & Places/Park.mp4"),
      options: ["Table", "Market", "Park", "Hospital"],
      correctOptionIndex: 2,
    },
    {
      videoUri: require("../videos/Common Objects & Places/Pen.mp4"),
      options: ["Chair", "Book", "Pen", "Temple"],
      correctOptionIndex: 2,
    },
    {
      videoUri: require("../videos/Common Objects & Places/School.mp4"),
      options: ["School", "College", "Market", "Bag"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Common Objects & Places/Table.mp4"),
      options: ["Table", "Door", "Temple", "Food"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Common Objects & Places/Temple.mp4"),
      options: ["Temple", "Hospital", "Chair", "Bottle"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Common Objects & Places/Water.mp4"),
      options: ["Water", "Pen", "School", "Money"],
      correctOptionIndex: 0,
    },
  ],


  "Colors & Basic Adjectives": [
    {
      videoUri: require("../videos/Colors & Basic Adjectives/Blue.mp4"),
      options: ["Red", "Blue", "Purple", "Green"],
      correctOptionIndex: 1,
    },
   {
      videoUri: require("../videos/Colors & Basic Adjectives/Fast.mp4"),
      options: ["Easy", "Sad", "Fast", "Small"],
      correctOptionIndex: 2,
    },
{
      videoUri: require("../videos/Colors & Basic Adjectives/Big.mp4"),
      options: ["Big", "Hot", "Cold", "Slow"],
      correctOptionIndex: 0,
    },
{
      videoUri: require("../videos/Colors & Basic Adjectives/Green.mp4"),
      options: ["Red", "Yellow", "Purple", "Green"],
      correctOptionIndex: 3,
    },
{
      videoUri: require("../videos/Colors & Basic Adjectives/Difficult.mp4"),
      options: ["Happy", "Difficult", "Slow", "Easy"],
      correctOptionIndex: 1,
    },
{
      videoUri: require("../videos/Colors & Basic Adjectives/Hot.mp4"),
      options: ["Hot", "Slow", "Sad", "Cold"],
      correctOptionIndex: 0,
    },
{
      videoUri: require("../videos/Colors & Basic Adjectives/Cold.mp4"),
      options: ["Small", "Cold", "Big", "Happy"],
      correctOptionIndex: 1,
    },
{
      videoUri: require("../videos/Colors & Basic Adjectives/Easy.mp4"),
      options: ["Hot", "Happy", "Sad", "Easy"],
      correctOptionIndex: 3,
    },
{
      videoUri: require("../videos/Colors & Basic Adjectives/Happy.mp4"),
      options: ["Happy", "Difficult", "Slow", "Easy"],
      correctOptionIndex: 0,
    },
{
      videoUri: require("../videos/Colors & Basic Adjectives/Purple.mp4"),
      options: ["Red", "Blue", "Purple", "Green"],
      correctOptionIndex: 2,
    },
{
      videoUri: require("../videos/Colors & Basic Adjectives/Red.mp4"),
      options: ["Red", "Blue", "Purple", "Green"],
      correctOptionIndex: 0,
    },
{
      videoUri: require("../videos/Colors & Basic Adjectives/Sad.mp4"),
      options: ["Happy", "Difficult", "Sad", "Easy"],
      correctOptionIndex: 1,
    },
{
      videoUri: require("../videos/Colors & Basic Adjectives/Slow.mp4"),
      options: ["Slow", "Big", "Hot", "Difficult"],
      correctOptionIndex: 0,
    },
{
      videoUri: require("../videos/Colors & Basic Adjectives/Small.mp4"),
      options: ["Cold", "Small", "Fast", "Sad"],
      correctOptionIndex: 1,
    },
{
      videoUri: require("../videos/Colors & Basic Adjectives/Yellow.mp4"),
      options: ["Yellow", "Blue", "Purple", "Green"],
      correctOptionIndex: 0,
    },
  ],


  "Days, Months & Time": [
    {
      videoUri: require("../videos/Days, Months & Time/April.mp4"),
      options: ["May", "June", "September", "April"],
      correctOptionIndex: 3,
    },
    {
      videoUri: require("../videos/Days, Months & Time/August.mp4"),
      options: ["April", "March", "August", "July"],
      correctOptionIndex: 2,
    },
     {
      videoUri: require("../videos/Days, Months & Time/February.mp4"),
      options: ["February", "June", "September", "July"],
      correctOptionIndex: 0,
    }, {
      videoUri: require("../videos/Days, Months & Time/Friday.mp4"),
      options: ["Monday", "Friday", "Saturday", "Tuesday"],
      correctOptionIndex: 1,
    }, {
      videoUri: require("../videos/Days, Months & Time/January.mp4"),
      options: ["May", "June", "September", "January"],
      correctOptionIndex: 3,
    }, {
      videoUri: require("../videos/Days, Months & Time/July.mp4"),
      options: ["July", "August", "September", "April"],
      correctOptionIndex: 0,
    }, {
      videoUri: require("../videos/Days, Months & Time/June.mp4"),
      options: ["May", "June", "January", "March"],
      correctOptionIndex: 1,
    }, {
      videoUri: require("../videos/Days, Months & Time/March.mp4"),
      options: ["August", "June", "March", "April"],
      correctOptionIndex: 2,
    }, {
      videoUri: require("../videos/Days, Months & Time/May.mp4"),
      options: ["May", "July", "September", "August"],
      correctOptionIndex: 0,
    }, {
      videoUri: require("../videos/Days, Months & Time/Monday.mp4"),
      options: ["Monday", "Friday", "Saturday", "Tuesday"],
      correctOptionIndex: 0,
    }, 
    {
      videoUri: require("../videos/Days, Months & Time/Saturday (1).mp4"),
      options: ["Sunday", "Thursday", "Saturday", "Tuesday"],
      correctOptionIndex: 2,
    }, 
    {
      videoUri: require("../videos/Days, Months & Time/September.mp4"),
      options: ["May", "June", "September", "April"],
      correctOptionIndex: 2,
    }, 
    {
      videoUri: require("../videos/Days, Months & Time/Thursday.mp4"),
      options: ["Thursday", "Friday", "Saturday", "Tuesday"],
      correctOptionIndex: 0,
    }, 
    {
      videoUri: require("../videos/Days, Months & Time/Tuesday.mp4"),
      options:  ["Monday", "Thursday", "Sunday", "Tuesday"],
      correctOptionIndex: 3,
    }, 
    {
      videoUri: require("../videos/Days, Months & Time/Wednesday.mp4"),
      options: ["Thursday", "Wednesday", "Saturday", "Monday"],
      correctOptionIndex: 1,
    }, 

  ],


  "Family & Relationships": [
    {
      videoUri: require("../videos/Family & Relationships/Brother.mp4"),
      options: ["Brother", "Sister", "Father", "Mother"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Family & Relationships/Family.mp4"),
      options: ["Friend", "Family", "Guest", "Husband"],
      correctOptionIndex: 1,
    },
    {
      videoUri: require("../videos/Family & Relationships/Father.mp4"),
      options: ["Father", "Grandfather", "Uncle", "Brother"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Family & Relationships/Friend.mp4"),
      options: ["Sister", "Brother", "Friend", "Guest"],
      correctOptionIndex: 2,
    },
    {
      videoUri: require("../videos/Family & Relationships/Granddaughter.mp4"),
      options: ["Granddaughter", "Grandson", "Niece", "Daughter"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Family & Relationships/Grandfather.mp4"),
      options: ["Father", "Grandfather", "Uncle", "Guest"],
      correctOptionIndex: 1,
    },
    {
      videoUri: require("../videos/Family & Relationships/Grandmother.mp4"),
      options: ["Grandmother", "Mother", "Sister", "Aunt"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Family & Relationships/Grandson.mp4"),
      options: ["Nephew", "Son", "Grandson", "Brother"],
      correctOptionIndex: 2,
    },
    {
      videoUri: require("../videos/Family & Relationships/Guest.mp4"),
      options: ["Guest", "Friend", "Stranger", "Family"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Family & Relationships/Husband.mp4"),
      options: ["Husband", "Wife", "Father", "Brother"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Family & Relationships/Mother.mp4"),
      options: ["Mother", "Grandmother", "Aunt", "Sister"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Family & Relationships/Paternal Aunt.mp4"),
      options: ["Paternal Aunt", "Maternal Aunt", "Grandmother", "Sister"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Family & Relationships/Paternal Uncle.mp4"),
      options: ["Paternal Uncle", "Father", "Grandfather", "Uncle"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Family & Relationships/Sister.mp4"),
      options: ["Sister", "Brother", "Cousin", "Friend"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Family & Relationships/Wife.mp4"),
      options: ["Husband", "Wife", "Mother", "Sister"],
      correctOptionIndex: 1,
    },
  ],

//   "Sentence Formation & Grammar Basics": [
//   {
//     videoUri: require("../videos/Sentence Formation & Grammar Basics/They.mp4"),
//     options: ["We", "I", "They", "You"],
//     correctOptionIndex: 2,
//   },
//   {
//     videoUri: require("../videos/Sentence Formation & Grammar Basics/Without.mp4"),
//     options: ["With", "Without", "For", "By"],
//     correctOptionIndex: 1,
//   },
// ],
"Sentence Formation & Grammar Basics": [
    {
      videoUri: require("../videos/Sentence Formation & Grammar Basics/And.mp4"),
      options: ["But", "Or", "And", "With"],
      correctOptionIndex: 2,
    },
    {
      videoUri: require("../videos/Sentence Formation & Grammar Basics/But.mp4"),
      options: ["But", "Without", "That", "Me"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Sentence Formation & Grammar Basics/Her or She.mp4"),
      options: ["Her or She","Or", "They", "Them"],
      correctOptionIndex: 1,
    },
    {
      videoUri: require("../videos/Sentence Formation & Grammar Basics/In.mp4"),
      options: ["In", "Out", "With", "Without"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Sentence Formation & Grammar Basics/Me.mp4"),
      options: ["Me", "You", "Them", "Those"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Sentence Formation & Grammar Basics/Or.mp4"),
      options: ["And", "Or", "With", "This"],
      correctOptionIndex: 1,
    },
    {
      videoUri: require("../videos/Sentence Formation & Grammar Basics/That.mp4"),
      options: ["That", "This", "Those", "These"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Sentence Formation & Grammar Basics/Them.mp4"),
      options: ["Them", "They", "Me", "Her"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Sentence Formation & Grammar Basics/These.mp4"),
      options: ["These", "Those", "This", "That"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Sentence Formation & Grammar Basics/They.mp4"),
      options: ["He", "She", "They", "It"],
      correctOptionIndex: 2,
    },
    {
      videoUri: require("../videos/Sentence Formation & Grammar Basics/This.mp4"),
      options: ["These", "This", "That", "Those"],
      correctOptionIndex: 1,
    },
    {
      videoUri: require("../videos/Sentence Formation & Grammar Basics/Those.mp4"),
      options: ["This", "That", "Those", "These"],
      correctOptionIndex: 2,
    },
    {
      videoUri: require("../videos/Sentence Formation & Grammar Basics/With.mp4"),
      options: ["With", "Without", "In", "Or"],
      correctOptionIndex: 0,
    },
    {
      videoUri: require("../videos/Sentence Formation & Grammar Basics/Without.mp4"),
      options: ["With", "Without", "And", "Or"],
      correctOptionIndex: 1,
    },
    {
      videoUri: require("../videos/Sentence Formation & Grammar Basics/You.mp4"),
      options: ["Me", "They", "You", "Them"],
      correctOptionIndex: 2,
    },
  ],

};

// **Updated Function to Get Quiz Questions**
export const getQuizQuestions = (moduleId: ModuleName, setId: number): Question[] => {
  const videos = videoMap[moduleId];
  if (!videos) {
    console.error(`Module "${moduleId}" not found.`);
    return [];
  }

  const questionPrompts = [
    "What does this sign mean?",
    "Identify this sign.",
    "Which of these represents the shown sign?",
    "Choose the correct meaning of this sign.",
    "This sign is used for?",
  ];

  // Generate questions with user-defined options
  const allQuestions: Question[] = videos.map((video, index) => ({
    id: index + 1,
    videoUri: video.videoUri,
    question: questionPrompts[index % questionPrompts.length],
    options: video.options,
    correctOptionIndex: video.correctOptionIndex,
  }));

  // Select 10 random questions
  return shuffleArray(allQuestions).slice((setId - 1) * 10, setId * 10);
};

// **Function to Shuffle an Array (Fisher-Yates Algorithm)**
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}


export interface Question {
  id: number;
  question: string;
  videoUri: any;
  options: string[];
  correctOptionIndex: number;
}
