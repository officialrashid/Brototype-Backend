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

          if (response && response.length > 0) {
              console.log(response.students, "response coming from student all data usecase");

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

              // Use Promise.all to wait for all asynchronous operations to complete
              await Promise.all(topFiveStudents.map(async (student: { studentId: any; totalScore: number; }) => {
                  console.log(
                      `TotalScore:${student.totalScore.toFixed(2)}`, `studentId:${student.studentId}`, "tip top five studentssssssss"
                  );

                  const studentDetails = await studentsRepository.getBestStudentsDetails(student.studentId);
                  const studentCurrentWeek = await studentsRepository.getStudentCurrentWeek(student.studentId, batchId);

                  const { studentName, studentProfile } = studentDetails;
                  const { passedWeeksCount} = studentCurrentWeek
                  console.log(studentName, studentProfile, "cominggggggggssswwwwowww");
                  console.log(studentCurrentWeek, "student week coming yarr");

                  if (studentDetails && studentCurrentWeek) {
                      topStudents.push(`TotalScore: ${parseFloat(student.totalScore.toFixed(2))}, imageUrl: ${studentProfile},studentName: ${studentName},studentCurrentWeek: ${passedWeeksCount}`);
                  }
              }));

              console.log(topStudents, "top students comingg");

              return { status: true, topStudents };
          } else {
              return { status: false, message: "batch not students found" };
          }
      } catch (err) {
          return { status: false, message: "There is some issue in the get Profile" };
      }
  };

  return {
      executeFunction,
  };
};
