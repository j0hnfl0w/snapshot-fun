import { defineStore, acceptHMRUpdate } from 'pinia'

export const useStore = defineStore('play', () => {
  const { log } = useLogger('store:play')

  const count = ref(0)
  const proposals = reactive([
    {
      id: 0,
      type: 'single-choice',
      title: 'When to ship The Merge?',
      choices: [
        'October 2022',
        'September 2022',
        'July 2023',
        'December 2022',
      ],
      scores_total: 20000,
    },
    {
      id: 1,
      type: 'single-choice',
      title: 'Do you love cats?',
      choices: ['Yes', 'No'],
      scores_total: 10000,
    },
    {
      id: 2,
      type: 'single-choice',
      title: 'How many fingers are on the hand?',
      choices: ['One', 'Two', 'Three', 'Four', 'Five', 'Six'],
      scores_total: 100,
    },
    {
      id: 3,
      type: 'single-choice',
      title: 'Who won the game?',
      choices: ['Mike', 'John'],
      scores_total: 10
    }
  ])

  const answers = reactive([
    {
      id: 0,
      scores: [1000, 10000, 8000, 1000],
    },
    {
      id: 1,
      scores: [8000, 2000],
    },
    {
      id: 2,
      scores: [10, 10, 10, 10, 10, 10],
    },
    {
      id: 3,
      scores: [9, 1]
    }
  ])
  
  function answer() {
    log(':answer')
  }

  return {
    count,
    proposals,
    answers,

    answer,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
