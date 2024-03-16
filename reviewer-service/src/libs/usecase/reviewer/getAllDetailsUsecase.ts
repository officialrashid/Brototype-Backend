import moment from "moment";

export const getAllDetails_Usecase = (dependencies: any) => {
  const {
    repository: { reviewerRepository }
  } = dependencies;

  if (!reviewerRepository) {
    console.log("Error: Reviewer Repository not found");
    return;
  }

  const executeFunction = async (reviewerId: string) => {
    try {
      if (!reviewerId) {
        return { status: false, message: "Reviewer ID not found" };
      }

      const response = await reviewerRepository.getAllDetails(reviewerId);

      let dayReviewCount = 0;
      let dayTakeReviewCount = 0;
      let oneMonthReviewCount = 0;
      let totalReviewCount = 0;

      if (Array.isArray(response) && response.length > 0) {
        const currentMonth = moment().format("MM"); // Get the current month
        const currentYear = moment().format("YYYY"); // Get the current year
        
        response[0].events.forEach((data: any) => {
          data.bookedEvents.forEach((bookedEvent: any) => {
            // Check if the review is booked, status is true, and it's in the current month and year
            if (
              bookedEvent.booked === true &&
              bookedEvent.status === true &&
              moment(bookedEvent.date, "DD-MM-YYYY").format("MM") === currentMonth &&
              moment(bookedEvent.date, "DD-MM-YYYY").format("YYYY") === currentYear
            ) {
              oneMonthReviewCount++;
            }

            // Check if the review is booked and it's in the current day
            if (bookedEvent.booked === true && moment(bookedEvent.date, "DD-MM-YYYY").isSame(moment(), "day")) {
              dayReviewCount++;
            }

            // Check if the review is booked, status is true, and it's in the current day
            if (bookedEvent.booked === true && bookedEvent.status === true && moment(bookedEvent.date, "DD-MM-YYYY").isSame(moment(), "day")) {
              dayTakeReviewCount++;
            }

            // Check if the review is booked and has a true status
            if (bookedEvent.booked === true && bookedEvent.status === true) {
              totalReviewCount++;
            }
          });
        });

        return {
          status: true,
          dayReviewCount,
          dayTakeReviewCount,
          oneMonthReviewCount,
          totalReviewCount
        };
      } else {
        return { status: false, message: "Events not found or invalid response" };
      }
    } catch (err) {
      console.log(err);
      return { status: false, message: "An error occurred while fetching details" };
    }
  };

  return {
    executeFunction,
  };
};
