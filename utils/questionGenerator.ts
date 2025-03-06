// This utility helps generate a large number of questions for the app
// In a real app, you would likely have a database or API for this

import type { Question } from "../data/quizData"

// Sample sign language concepts for each module
const concepts = {
  1: [
    // Introduction to ISL
    "Sign Language",
    "Deaf Culture",
    "Facial Expressions",
    "Hand Shapes",
    "Non-Manual Markers",
    "Signing Space",
    "Visual Vernacular",
    "Deaf Community",
    "Sign Language History",
    "Communication Barriers",
  ],
  2: [
    // Alphabet & Numbers
    "Letter A",
    "Letter B",
    "Letter C",
    "Letter D",
    "Letter E",
    "Number 1",
    "Number 2",
    "Number 3",
    "Number 4",
    "Number 5",
  ],
  3: [
    // Basic Greetings
    "Hello",
    "Good Morning",
    "Good Afternoon",
    "Good Evening",
    "How are you?",
    "Nice to meet you",
    "Thank you",
    "You're welcome",
    "Please",
    "Goodbye",
  ],
  4: [
    // Days & Time
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Morning",
    "Afternoon",
    "Evening",
    "Yesterday",
    "Tomorrow",
  ],
  5: [
    // Family
    "Mother",
    "Father",
    "Sister",
    "Brother",
    "Grandmother",
    "Grandfather",
    "Aunt",
    "Uncle",
    "Cousin",
    "Child",
  ],
  6: [
    // Colors & Adjectives
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Black",
    "Big",
    "Small",
    "Tall",
    "Short",
    "Beautiful",
  ],
  7: [
    // Objects & Places
    "House",
    "School",
    "Hospital",
    "Store",
    "Park",
    "Book",
    "Phone",
    "Computer",
    "Table",
    "Chair",
  ],
  8: [
    // Actions & Verbs
    "Eat",
    "Drink",
    "Sleep",
    "Walk",
    "Run",
    "Talk",
    "Listen",
    "Write",
    "Read",
    "Work",
  ],
  9: [
    // Questions
    "What",
    "Where",
    "When",
    "Why",
    "How",
    "Who",
    "Which",
    "How many",
    "How much",
    "How long",
  ],
  10: [
    // Grammar
    "Past Tense",
    "Present Tense",
    "Future Tense",
    "Negation",
    "Affirmation",
    "Question Formation",
    "Conditional",
    "Possessive",
    "Plural",
    "Classifier",
  ],
}

// Generate a full set of questions for a module
export function generateModuleQuestions(moduleId: number): Question[][] {
  // Create 5 sets of 10 questions each
  return Array.from({ length: 5 }, (_, setIndex) => {
    // For each set, create 10 questions
    return Array.from({ length: 10 }, (_, questionIndex) => {
      const conceptIndex = (setIndex * 10 + questionIndex) % concepts[moduleId as keyof typeof concepts].length
      const concept = concepts[moduleId as keyof typeof concepts][conceptIndex]

      // Create 4 options with one correct answer
      const correctOptionIndex = Math.floor(Math.random() * 4)
      const options = generateOptions(moduleId, concept, correctOptionIndex)

      return {
        id: setIndex * 10 + questionIndex + 1,
        question: `What sign is being shown in the video?`,
        videoUri: `asset:/videos/module${moduleId}/set${setIndex + 1}/question${questionIndex + 1}.mp4`,
        options,
        correctOptionIndex,
      }
    })
  })
}

// Generate options for a question with one correct answer
function generateOptions(moduleId: number, correctConcept: string, correctIndex: number): string[] {
  const moduleConcepts = concepts[moduleId as keyof typeof concepts]
  const options: string[] = Array(4).fill("")

  // Set the correct answer
  options[correctIndex] = correctConcept

  // Fill in the other options with different concepts
  const usedIndices = new Set<number>([moduleConcepts.indexOf(correctConcept)])

  for (let i = 0; i < 4; i++) {
    if (i !== correctIndex) {
      let randomIndex: number
      do {
        randomIndex = Math.floor(Math.random() * moduleConcepts.length)
      } while (usedIndices.has(randomIndex))

      usedIndices.add(randomIndex)
      options[i] = moduleConcepts[randomIndex]
    }
  }

  return options
}

