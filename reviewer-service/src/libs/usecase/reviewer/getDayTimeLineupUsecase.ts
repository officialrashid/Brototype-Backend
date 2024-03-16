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

            const res = await reviewerRepository.getTimeLineUp(reviewerId, day);
            console.log(res, "res in get day time line");

            if (res && Array.isArray(res)) {
                const allBookedEvents: any[] = [];

                res.forEach((data: any) => {
                    const matchingDates = data.date.filter((eventDate: string) => moment(eventDate, 'DD-MM-YYYY').isSame(moment(day, 'DD-MM-YYYY')));
                    if (matchingDates.length > 0) {
                        const matchingBookedEvents = data.bookedEvents.filter((event: any) => event.booked === true && matchingDates.includes(event.date));
                        if (matchingBookedEvents.length > 0) {
                            allBookedEvents.push(...matchingBookedEvents);
                        }
                    }
                });

                if (allBookedEvents.length > 0) {
                    allBookedEvents.sort((a: any, b: any) => moment(a.startTime, 'hh:mma').diff(moment(b.startTime, 'hh:mma')));

                    return {
                        status: true,
                        allBookedEvents: allBookedEvents
                    };
                } else {
                    return { status: false, message: "No booked events found for the specified day" };
                }
            } else {
                return { status: false, message: "Invalid response format or events not found" };
            }
        } catch (err) {
            return { status: false, message: err || "An error occurred" };
        }
    };

    return {
        executeFunction
    };
};
