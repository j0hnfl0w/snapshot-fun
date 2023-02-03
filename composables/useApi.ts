import { useQuery } from '@urql/vue'
import { useStorage } from '@vueuse/core'

export interface AnswerPayload {
  id: string
  answer: number | null
  isWin: boolean | null
  ts: number
}

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function useApi() {
  const { log } = useLogger('useApi')
  
  const { data, fetching, error } = useQuery({
    query: `
    query Proposals {
      proposals(
        first: 100,
        skip: 0,
        where: {
          state: "closed"
          type_in: ["single-choice"]
        },
        orderBy: "scores_total",
        orderDirection: asc
      ) {
        id
        title
        body
        body
        choices
        scores_total
        scores
        type
        start
		    end
        author
      }
    }
    `
  })

  const proposalsAnswered = useStorage('snapshot.proposalsAnswered', [] as AnswerPayload[])

  const proposalsAnsweredMeta = computed(() => {
    return proposalsAnswered.value.reduce((acc: any, val: AnswerPayload) => {

      acc.totalAnswers += 1
      if (val.isWin !== null) {
        if (val.isWin) acc.wins += 1
        else acc.loses += 1
      }

      acc.winRate = acc.wins / (acc.wins + acc.loses)

      return acc
    }, {
      winRate: 0,
      wins: 0,
      loses: 0,
      totalAnswers: 0,
    })
  })

  const proposals = computed(() => {
    return data.value?.proposals || []
  })

  const proposalsFiltered = computed(() => {
    // return proposals.value.filter((p: any) => {
    //   return !proposalsAnswered.value.find(a => a.id === p.id)
    // })
    return proposals.value
  })

  const proposalIndex = ref(0)

  const proposal = computed(() => {
    return proposalsFiltered.value[proposalIndex.value]
  })

  const state = ref(null) as any

  async function answer(idx: number) {
    log(':answer', idx)
    log(':answer', proposal.value)
    if (!proposal.value) return
    // TODO: get scores from server by proposal.id
    const maxScoreIndex = proposal.value.scores.reduce((acc: any, val: number, i: number) => {
      if (val >= acc.value) {
        log(':maxScoreIndex >=', val, i, acc)
        acc.value = val
        acc.idx = i
      }
      return acc
    }, {
      idx: 0,
      value: 0,
    })
    log(':answer maxScoreIndex', maxScoreIndex)

    const isWin = maxScoreIndex.idx === idx
    if (isWin) {
      state.value = 'win'
    }
    else {
      state.value = 'lose'
    }

    await wait(1000)

    const answerPayload: AnswerPayload = {
      id: proposal.value.id,
      answer: idx,
      isWin,
      ts: Date.now()
    }
    log(':answer answerPayload', answerPayload)
    proposalsAnswered.value.push(answerPayload)

    state.value = null
    await wait(500)

    skip(false)
  }

  function skip(saveAnswer = true) {
    log(':skip')
    if (saveAnswer) {
      const answerPayload: AnswerPayload = {
        id: proposal.value.id,
        answer: null,
        isWin: null,
        ts: Date.now()
      }
      log(':skip answerPayload', answerPayload)
      proposalsAnswered.value.push(answerPayload)
    }

    const proposalIndexNext = proposalIndex.value + 1
    if (proposalsFiltered.value.length - 1 >= proposalIndexNext) {
      proposalIndex.value = proposalIndexNext
    }
    else {
      log(':skip DONE need more')
    }
  }

  return {
    state,
    proposals,
    proposalsAnswered,
    proposalsAnsweredMeta,
    proposalsFiltered,
    proposal,

    answer,
    skip,
  }
}
