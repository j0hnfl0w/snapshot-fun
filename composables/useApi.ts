export const useApi = () => {
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
  ]);

  const answers = reactive([
    {
      id: 1,
      scores: [8000, 2000],
    },
    {
      id: 2,
      scores: [10, 10, 10, 10, 10, 10],
    },
  ]);

  // answer()
  // getAnswer()

  // getProposals()
  // starProposal()

  async function answer() {
    // get proposal with answers fields...
  }

  return {
    proposals,
    answer,
  };
};
