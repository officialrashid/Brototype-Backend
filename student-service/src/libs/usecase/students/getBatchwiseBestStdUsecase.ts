
export const getBatchwiseBestStd_Usecase = (dependencies: any) => {

    const {
        repository: { studentsRepository },
    } = dependencies;

    if (!studentsRepository) {
        return console.log("Error: student Repository not found");
    }

    const executeFunction = async (batchId: string) => {
        try {
          const topStudents: string[] = [];
            const response = await studentsRepository.getAllStudentDetails(batchId);
            if (response && response.length>0) {
                console.log(response.students,"response coming from student all data usecase");
                const calculateTotalScore = (student: { weeks: any[]; }) => {
                    let totalScore = 0;
                    let totalPossibleScore = 0;
                  
                    student.weeks.forEach((week) => {
                      if (week.repeat === true) {
                        // Deduct 5 marks for repeating the week
                        totalScore -= 5;
                      } else {
                        totalScore += week.totalScore * 50;
                        totalPossibleScore += 50;
                      }
                    });
                  
                    return totalPossibleScore > 0 ? (totalScore / totalPossibleScore) * 100 : 0;
                  };
                response.forEach((batch: { students: any[]; }) => {
                    batch.students.forEach((student) => {
                      student.totalScore = calculateTotalScore(student);
                    });
                  });
                  const flattenedData = response.reduce((acc: string | any[], batch: { students: any; }) => acc.concat(batch.students), []);

                  // Sort students by total score
                  const sortedStudents = flattenedData.sort((a: { totalScore: number; }, b: { totalScore: number; }) => b.totalScore - a.totalScore);
                  
                  // Get top five students
                  const topFiveStudents = sortedStudents.slice(0, 5);
                  
                  // Display top five students
                  
                  console.log("Top Five Students:");
                  topFiveStudents.forEach((student: { studentId: any; totalScore: number; }, index: number) => {
                    console.log(
                      `TotalScore:${student.totalScore.toFixed(2)}`,`studentId:${student.studentId}`
                    );
                  
                    topStudents.push(`TotalScore: ${parseFloat(student.totalScore.toFixed(2))}`);
                  });
                  
         
                  
                  return {status:true,topStudents}
            }else{
              return {status:false,message:"batch not students found"}
            }
        } catch (err) {
           return {status:false,message:"The Some issue in the get Profile"}
        }

    }
    return {
        executeFunction,
    };
};
