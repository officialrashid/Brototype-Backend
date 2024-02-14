import moment from "moment";

export const getDayTimeLineup_Usecase = (dependencies: any) => {
    const {
        repository: { reviewerRepository }
    } = dependencies;

    if (!reviewerRepository) {
        console.log("Error: Reviewer Repository not found");
        return;
    }

    const executeFunction = async (reviewerId: string, day: string) => {
        try {
            if (!reviewerId) {
                return { status: false, message: "Reviewer ID not found" };
            }

            const newEvent: any[] = [];
            const res = await reviewerRepository.getTimeLineUp(reviewerId, day);

            if (res) {

            
                // Filter events based on the specified day and booked property
                const filteredResponse = res.filter((data: { date: moment.MomentInput; bookedEvents: { booked: boolean; }[]; }) =>
                    moment(data.date, 'DD-MM-YYYY').isSame(moment(day, 'DD-MM-YYYY')) &&
                    data.bookedEvents && data.bookedEvents.length > 0 && data.bookedEvents.some((event: { booked: boolean; }) => event.booked === true)
                );
            

            
                if (filteredResponse.length > 0) {

            
                    // Extract only the bookedEvents objects
                    const bookedEventsOnly = filteredResponse.flatMap((data: { bookedEvents: any; }) => data.bookedEvents);
            
                    // Sort events based on createdAt date in ascending order
                    const sortedResponse = bookedEventsOnly.sort((a: { createdAt: moment.MomentInput; }, b: { createdAt: moment.MomentInput; }) => {
                        const dateA = moment(a.createdAt, 'DD-MM-YYYY');
                        const dateB = moment(b.createdAt, 'DD-MM-YYYY');
                        return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
                    });
            
                    if (sortedResponse.length > 0) {
              
            
                        return { status: true, sortedResponse };
                    } else {
                        return { status: false, message: "Events not found" };
                    }
                } else {
                    return { status: false, message: "No booked events found for the specified day" };
                }
            } else {
                return { status: false, message: "Invalid response format or events not found" };
            }
        } catch (err) {
            return { status: false, message: err };
        }
    };

    return {
        executeFunction
    };
};
