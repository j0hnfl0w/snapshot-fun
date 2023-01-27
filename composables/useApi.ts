export const useApi = () => {
  const proposals = reactive([
    {
      id: 1,
      title: 'Do you cats?',
      options: ['Yes', 'No'],
    },
    {
      id: 2,
      title: 'How many fingers on your hand?',
      options: ['One', 'Two', 'Three', 'Four', 'Five', 'Six'],
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
