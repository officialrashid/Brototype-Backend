export const getExtendDetails_Usecase = (dependencies: any) => {

    const {
        repository: { studentsRepository },
    } = dependencies;

    if (!studentsRepository) {
        return console.log("Error: student Repository not found");
    }

    const executeFunction = async (batchId: string, studentId: string) => {
        console.log(studentId, "dataaaaaaa", batchId, "batchIs");
        let currentWeek = 0;
        try {
            const response = await studentsRepository.getExtendDetails(studentId, batchId);
            console.log(response, "kkkkkkkk response llllllll");

            if (response !== null && response !== undefined) {
                console.log("enterrrrrrrrrrrrrrrrrr");
                if(response.length > 0){
                    response?.forEach((data: any) => {
                        if (data.status === true) {
                            currentWeek++;
                        }
                    });
                }
              
                console.log(currentWeek, "currentWeek");

                console.log(currentWeek, "currentWeek");

                const profileResponse = await studentsRepository.getProfile(studentId);
                console.log(profileResponse[0].firstName, "{}{}{}{}{}{}{}{}");

                if (profileResponse.length > 0) {
                    const data = {
                        firstName: profileResponse[0].firstName,
                        middleName: profileResponse[0].middleName,
                        lastName: profileResponse[0].lastName,
                        batch: profileResponse[0].batch,
                        domain: profileResponse[0].domain,
                        currentWeek: `week${currentWeek + 1}`
                    };
                    console.log(data, "dataaaaaaa");

                    return { status: true, data };
                } else {
                    return { status: false, message: "Student details not found" };
                }
            } else {
                return { status: false, message: "Student extend details not found or empty" };
            }
        } catch (err) {
            return { status: false, message: "There's some issue in getting the course completion graph" };
        }
    };
    return {
        executeFunction,
    };
};
