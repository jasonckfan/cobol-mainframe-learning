// COBOL Mainframe Learning App - TypeScript 型別定義
// 參考 japanese-study-mobile 架構

export interface Scenario {
  id: string;
  title: string;
  titleEn: string;
  icon: string;
  stage: 1 | 2 | 3 | 4 | 5 | 6;
  context: string;
  contextEn: string;
  roles: Role[];
  concepts: Concept[];
  dialogues: Dialogue[];
  codeExamples: CodeExample[];
  quiz: QuizQuestion[];
}

export interface Role {
  id: string;
  name: string;
  nameEn: string;
  avatar: string;
}

export interface Concept {
  term: string;
  termEn: string;
  explanation: string;
  analogy?: string;
}

export interface Dialogue {
  roleId: string;
  text: string;
  textEn?: string;
  isQuestion?: boolean;
  options?: DialogueOption[];
}

export interface DialogueOption {
  text: string;
  isCorrect: boolean;
  feedback: string;
}

export interface CodeExample {
  title: string;
  language: 'cobol' | 'jcl' | 'copybook';
  code: string;
  explanation: string;
  annotations?: CodeAnnotation[];
}

export interface CodeAnnotation {
  line: number;
  text: string;
}

export interface QuizQuestion {
  id: string;
  type: 'single' | 'multiple' | 'scenario' | 'code-reading';
  question: string;
  options: QuizOption[];
  correctAnswer: string;
  explanation: string;
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface LearningProgress {
  userId: string;
  completedScenarios: string[];
  quizScores: Record<string, number>;
  currentStage: number;
  lastAccessed: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  termEn: string;
  category: 'mainframe' | 'cobol' | 'jcl' | 'cics' | 'vsam' | 'general';
  definition: string;
  example?: string;
  relatedTerms: string[];
}
