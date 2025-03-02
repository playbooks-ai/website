import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Playbook {
  id: string;
  name: string;
  content: string;
}

interface PlaybookState {
  playbook: string;
  setPlaybook: (content: string) => void;
  examplePlaybooks: Playbook[];
  setExamplePlaybooks: (playbooks: Playbook[]) => void;
  loadExamplePlaybook: (id: string) => void;
  savedPlaybooks: Playbook[];
  savePlaybook: (name: string, content: string, existingId?: string) => void;
  deletePlaybook: (id: string) => void;
}

export const usePlaybookStore = create<PlaybookState>()(
  persist(
    (set, get) => ({
      playbook: '',
      setPlaybook: (content) => set({ playbook: content }),

      examplePlaybooks: [],
      setExamplePlaybooks: (playbooks) => set({ examplePlaybooks: playbooks }),

      loadExamplePlaybook: (id) => {
        const { examplePlaybooks } = get();
        const playbook = examplePlaybooks.find(p => p.id === id);
        if (playbook) {
          set({ playbook: playbook.content });
        }
      },

      savedPlaybooks: [],
      savePlaybook: (name, content, existingId) => {
        const { savedPlaybooks } = get();

        if (existingId) {
          // Update existing playbook
          const updatedPlaybooks = savedPlaybooks.map(p =>
            p.id === existingId ? { ...p, name, content } : p
          );
          set({ savedPlaybooks: updatedPlaybooks });
        } else {
          // Create new playbook
          const id = Date.now().toString();
          const newPlaybook = { id, name, content };
          set({ savedPlaybooks: [...savedPlaybooks, newPlaybook] });
        }
      },

      deletePlaybook: (id) => {
        const { savedPlaybooks } = get();
        set({ savedPlaybooks: savedPlaybooks.filter(p => p.id !== id) });
      },
    }),
    {
      name: 'playbook-storage',
    }
  )
); 