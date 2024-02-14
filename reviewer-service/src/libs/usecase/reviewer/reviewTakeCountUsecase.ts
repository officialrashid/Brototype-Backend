
export const reviewTakeCount_Usecase = (dependencies: any) => {
  const {
    repository: { reviewerRepository }
  } = dependencies;

  if (!reviewerRepository) {
    return console.log("Error: Fumigation Repository not found");
  }

  const executeFunction = async (reviewerId:string) => {

    try {
      if (!reviewerId) {
        return { status: false, message: "reviewer  not found" }
      }

      const response = await reviewerRepository.getReviewTakeCount(reviewerId)
      if (response) {
        return { response }
      }
    } catch (err) {
      return { status: false, message: err }
    }

  };

  return {
    executeFunction
  };
};
