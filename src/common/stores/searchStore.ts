import { create } from 'zustand';

interface ExampleState {
  exampleTerm: string;
  setExampleTerm: (term: string) => void;
}

export const useExampleStore = create<ExampleState>((set) => ({
  exampleTerm: '',
  setExampleTerm: (term) => set({ exampleTerm: term }),
}));
