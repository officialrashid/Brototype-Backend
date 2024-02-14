import { Schedule } from "../../entities/schedule";
import { sendEmail } from "../../../nodemailer/nodemailer";
import moment from "moment";

export const getAllDetails_Usecase = (dependencies: any) => {
  const {
    repository: { reviewerRepository }
  } = dependencies;

  if (!reviewerRepository) {
    console.log("Error: Fumigation Repository not found");
    return;
  }

  const executeFunction = async (reviewerId: string) => {
    const currentDate = new Date()
    const currentMomemtoDate = moment();
    const currentMonth = currentMomemtoDate.format("MM"); // Get the current month


    let dayReviewCount = 0;
    let dayTakeReviewCount = 0;
    let oneMonthReviewCount = 0;
    let totalReviewCount = 0;
    try {
      if (!reviewerId) {
        return { status: false, message: "reviewer not found" };
      }
      const response = await reviewerRepository.getAllDetails(reviewerId);


      if (response.length > 0) {
        response[0].events.forEach((data: any) => {
          data.bookedEvents.forEach((bookedEvent: any) => {
           
            // Check if the review is booked, status is true, and it's in the current month
            if (
              bookedEvent.booked === true &&
              bookedEvent.status === true &&
              moment(bookedEvent.createdAt).format("MM") === currentMonth
            ) {
              oneMonthReviewCount++;
            }

            // Check if the review is booked and it's in the current day
            if (bookedEvent.booked === true && moment(bookedEvent.createdAt).isSame(currentDate, 'day')) {
              dayReviewCount++;
            }

            // Check if the review is booked, status is true, and it's in the current day
            if (bookedEvent.booked === true && bookedEvent.status === true && moment(bookedEvent.createdAt).isSame(currentDate, 'day')) {
              dayTakeReviewCount++;
            }

            if(bookedEvent.booked === true && bookedEvent.status === true){
              totalReviewCount++;
            }
          });
        });
      } else {
        return { status: false, message: "events not found" };
      }

      return {
        status: true,
        dayReviewCount,
        dayTakeReviewCount,
        oneMonthReviewCount,
        totalReviewCount
      };
    } catch (err) {
      return { status: false, message: err };
    }
  };

  return {
    executeFunction,
  };
};
