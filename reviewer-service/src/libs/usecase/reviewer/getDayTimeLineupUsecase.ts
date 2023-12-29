import moment from "moment";

export const getDayTimeLineup_Usecase = (dependencies: any) => {
    const {
      repository: { reviewerRepository }
    } = dependencies;
  
    if (!reviewerRepository) {
      return console.log("Error: Fumigation Repository not found");
    }
  
    const executeFunction = async (reviewerId: string, day: string) => {
        try {
            if (!reviewerId) {
                return { status: false, message: "Event data not found" };
            }
            const res = await reviewerRepository.getTimeLineUp(reviewerId, day);
            console.log(res, "bsbfshbfdvdfhjgdfjhjds");
            if(res.length>0){
                const filteredResponse = res[0].events.filter((data: any) => data.booked === true);
    
                if (filteredResponse.length > 0) {
                    console.log("keriyannuuuuuu");
        
                    // Sort events based on createdAt date in ascending order
                    const sortedResponse = filteredResponse.sort((a: { createdAt: moment.MomentInput; }, b: { createdAt: moment.MomentInput; }) => {
                        const dateA = moment(a.createdAt, 'DD-MM-YYYY');
                        const dateB = moment(b.createdAt, 'DD-MM-YYYY');
                        return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
                    });
        
                    if (sortedResponse.length > 0) {
                        console.log("set aayannuuuuuuu");
        
                        return { status: true, sortedResponse };
                    } else {
                        return { status: false, message: "Events not found" };
                    }
                } else {
                    return { status: false, message: "No booked events found" };
                }
            }else{
                return { status: false, message: "Events not found" }
            }
            // Filter events where booked is true
           
        } catch (err) {
            return { status: false, message: err };
        }
    };
    
  
    return {
      executeFunction
    };
  };
  