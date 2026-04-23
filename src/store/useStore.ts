import { create } from "zustand";

export type ViewMode = "grid" | "list";

interface StoreState {
    search: string;
    selectedLines: string[];
    viewMode: ViewMode;
    setSearch: (search: string) => void;
    toggleLine: (lineId: string) => void;
    clearLines: () => void;
    setViewMode: (mode: ViewMode) => void;
}

export const useStore = create<StoreState>((set) => ({
    search: "",
    selectedLines: [],
    viewMode: "grid",
    setSearch: (search) => set({ search }),
    toggleLine: (lineId) =>
        set((state) => ({
            selectedLines: state.selectedLines.includes(lineId)
                ? state.selectedLines.filter((id) => id !== lineId)
                : [...state.selectedLines, lineId],
        })),
    clearLines: () => set({ selectedLines: [] }),
    setViewMode: (viewMode) => set({ viewMode }),
}));
