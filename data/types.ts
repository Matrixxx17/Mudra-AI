export type RootStackParamList = {
  Home: undefined;
  LessonScreen: undefined;
  RecordScreen: undefined;
  ModuleScreen: { moduleId: number }; // Change moduleId to number
  QuizScreen: { moduleId: number; setId: number }; // Change moduleId to number
  Result: { score: number; total: number; moduleId: number }; // Change moduleId to number
};