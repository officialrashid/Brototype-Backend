interface Counts {
    activeCount: number;
    placedCount: number;
}
export const getStudentsAndPlacedStudents_Usecase = (dependencies: any) => {
    const {
        repository: { authenticationRepository }
    } = dependencies;

    if (!authenticationRepository) {
        return console.log("Error: Fumigation Repository not found");
    }

    const executeFunction = async (uniqueId: string) => {
        const response = await authenticationRepository.getPlacedStudentsAndCurrentStudents(uniqueId)
        if (response && response.length != 0) {


            const countsByMonth: Record<string, Counts> = {};

            // Initialize counts for each month
            for (let i = 1; i <= 12; i++) {
                countsByMonth[i] = { activeCount: 0, placedCount: 0 };
            }
            // Iterate through response data
            response?.response?.forEach((data: { createdDate: string; isStatus: string; placedDate: string; }) => {
                const month = parseInt(data.createdDate.split('-')[1]);
                const isActive = data.isStatus === "Active";
                const isPlaced = data.isStatus === "Placed";

                // Increment counts based on status and month
                if (isActive) {
                    countsByMonth[month].activeCount++;
                } else if (isPlaced) {
                    const placedMonth = parseInt(data.placedDate.split('-')[1]);
                    countsByMonth[placedMonth].placedCount++;
                }
            });

            // Convert countsByMonth object to array of objects and sort by month
            const countsArray: { month: string; activeCount: number; placedCount: number }[] = Object.entries(countsByMonth).map(([month, counts]) => ({
                month: parseInt(month) < 10 ? '0' + parseInt(month) : '' + parseInt(month),
                activeCount: counts.activeCount,
                placedCount: counts.placedCount
            }));
            // Sort the array by month in ascending order
            countsArray.sort((a: { month: string; }, b: { month: string; }) => parseInt(a.month) - parseInt(b.month));
            if (countsArray && countsArray.length > 0) {
                console.log("successil keriii");
                
                return { status: true, countsArray }
            } else {
                return { status: false, messge: "study students and placed students not found" }
            }

        } else {
            return { status: false, messge: "study students and placed students not found" }
        }
    }
    return {
        executeFunction
    };
};
