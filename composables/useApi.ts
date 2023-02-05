// import { useQuery } from '@urql/vue'
import { useStorage } from '@vueuse/core'
import type { Client } from '@urql/core';
import { Ref } from 'vue'
import { wait } from '@/utils'

export interface AnswerPayload {
  id: string
  answer: number | null
  isWin: boolean | null
  ts: number
}

export async function useApi() {
  const { log } = useLogger('useApi')

  const urql = inject('$urql') as Ref<Client>
  // log(':urql', urql)

  const pageSize = 10
  const page = useStorage('snapshot.proposalsPage', 0 as number)
  const pageSkip = computed(() => {
    return pageSize * page.value
  })

  const proposals = ref([]) as any

  async function addProposals() {
    const { data } = await urql.value.query(
      `
        query Proposals($skip:Int, $first:Int) {
          proposals(
            first: $first,
            skip: $skip,
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
            space {
              id
            }
          }
        }
      `,
      {
        skip: pageSkip.value,
        first: pageSize,
      }
    ).toPromise()
    // log(':addProposals data', data)
    proposals.value = [...proposals.value, ...data?.proposals]
  }

  addProposals()

  const proposalsAnswered = useStorage('snapshot.proposalsAnswered', [] as AnswerPayload[])

  const proposalsAnsweredMeta = computed(() => {
    return proposalsAnswered.value.reduce((acc: any, val: AnswerPayload) => {

      acc.totalAnswers += 1

      if (val.isWin !== null) {
        if (val.isWin) acc.wins += 1
        else acc.loses += 1
        acc.winRate = acc.wins / (acc.wins + acc.loses)
      }

      return acc
    }, {
      winRate: 0,
      wins: 0,
      loses: 0,
      totalAnswers: 0,
    })
  })

  const proposalsFiltered = computed(() => {
    return proposals.value.filter((p: any) => {
      return !proposalsAnswered.value.find(a => a.id === p.id)
    })
  })

  const proposal = computed(() => {
    return proposalsFiltered.value?.[0] || null
  })

  const state = ref(null) as any

  async function answer(idx: number) {
    log(':answer', idx)
    // log(':answer', proposal.value)
    if (!proposal.value) return
    // TODO get scores from server by proposal.id
    const maxScoreIndex = proposal.value.scores.reduce((acc: any, val: number, i: number) => {
      if (val >= acc.value) {
        acc.value = val
        acc.idx = i
      }
      return acc
    }, {
      idx: 0,
      value: 0,
    })
    // log(':answer maxScoreIndex', maxScoreIndex)

    const isWin = maxScoreIndex.idx === idx
    if (isWin) {
      state.value = 'win'
    }
    else {
      state.value = 'lose'
    }

    await wait(1000)

    state.value = null

    await wait(200)
    skip(idx, isWin)
  }

  function skip(answer: number | null = null, isWin: boolean | null = null) {
    log(':skip')

    const answerPayload: AnswerPayload = {
      id: proposal.value.id,
      answer,
      isWin,
      ts: Date.now()
    }
    // log(':skip answerPayload', answerPayload)
    proposalsAnswered.value.push(answerPayload)

    if (proposalsFiltered.value.length === 0) {
      page.value += 1
      addProposals()
    }
  }

  return {
    state,
    proposals,
    // proposalsAnswered,
    proposalsAnsweredMeta,
    // proposalsFiltered,
    proposal,
    page,

    answer,
    skip,
  }
}
