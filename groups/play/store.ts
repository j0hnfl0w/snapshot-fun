import { defineStore, acceptHMRUpdate } from 'pinia'

export const useStore = defineStore('play', () => {
  const { log } = useLogger('store:play')

  const count = ref(0)
  const proposals = reactive([
    {
      id: 1,
      title: 'Do you cats?',
      choices: ['Yes', 'No'],
      scores_total: 10000,
    },
    {
      id: 2,
      title: 'How many fingers on your hand?',
      choices: ['One', 'Two', 'Three', 'Four', 'Five', 'Six'],
      scores_total: 100,
    },
    {
      id: 3,
      title: 'Who won the game?',
      choices: ['Mike', 'John'],
      scores_total: 10
    }
  ])

  const answers = reactive([
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
