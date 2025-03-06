export type RootStackParamList = {
    Home: undefined;
    Quiz: { moduleId: string; setId: number };
    Result: { score: number; total: number; moduleId: string };
  };