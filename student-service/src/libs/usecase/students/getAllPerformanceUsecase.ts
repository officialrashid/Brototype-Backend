
export const getAllPerformance_Usecase = (dependencies: any) => {

    const {
        repository: { studentsRepository },
    } = dependencies;

    if (!studentsRepository) {
        return console.log("Error: student Repository not found");
    }

    const executeFunction = async (studentId: string, batchId: string) => {
        try {
            let weekCompleted = 0;
            let repeatCount = 0;
            let lastWeekToatalMark = 0;
            let overallPerformance:any = 0;
            let totalPossibleScore = 0;
            let totalScore = 0;
            const response = await studentsRepository.getAllPerformance(studentId, batchId);
            if (response.status==true) {
                console.log("log map il ullill keriiii");
                
                response.allPerformance.map((data: any, index: number) => {
                    if (data.status === true) {
                        weekCompleted++;
                    }
                    if (data.repeat === true) {
                        repeatCount++;
                    }
                })
                const lastWeekPerformance = response.allPerformance[response.allPerformance.length - 1];
                if (lastWeekPerformance) {
                    lastWeekToatalMark = lastWeekPerformance.reviewScore + lastWeekPerformance.communicationScore + lastWeekPerformance.personalWorkoutsScore + lastWeekPerformance.miscellaneousWorkouts
                }

                response.allPerformance.forEach((data: any) => {
                    if (data.repeat === true) {
                        totalScore -= 5;
                    } else {
                        totalScore += data.totalScore * 50;
                        totalPossibleScore += 50;
                    }
                });

                overallPerformance = totalPossibleScore > 0 ? (totalScore / totalPossibleScore) * 100 : 0;
                console.log(weekCompleted , repeatCount , lastWeekToatalMark , overallPerformance,"set thatweeeeeee");
                
                // if(weekCompleted || !repeatCount || !lastWeekToatalMark || !overallPerformance){
                //     return {status:false,message:"The student details not found"}
                // }else{
                    console.log("de bugging ethiiiiiidshgsfsfdsdufsdugsdfugsdgsddsuygsdyugfsdfydsfdsufsdygdsdsugdsu");
                    
                    const data = {
                        weekCompleted,
                        repeatCount,
                        lastWeekToatalMark,
                        overallPerformance : parseInt(overallPerformance)

                    }
                    return {status:true,data}

                // }
            }
        } catch (err) {
            return { status: false, message: "The Some issue in the get Course completion graph" }
        }

    }
    return {
        executeFunction,
    };
};
