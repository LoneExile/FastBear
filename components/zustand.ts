import create from 'zustand'

const counterStore = (
  set: (arg0: {
    (state: any): {count: number}
    (state: any): {count: number}
  }) => any
) => ({
  count: 0,
  increment: () => set((state: any) => ({count: state.count + 1})),
  decrement: () => set((state: any) => ({count: state.count - 1}))
})

export const useCounterStore = create(counterStore)
