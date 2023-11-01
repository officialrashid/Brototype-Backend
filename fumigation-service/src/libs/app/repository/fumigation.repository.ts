import { Batch } from "mongodb";
import schema from "../dataBase/schema"


export default {

    Enqueries: async (data: any) => {
        console.log(data, "data coming to the stundent repositoryyyyyyy");

        const EnqueriesData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            qualification: data.qualification,
            prefferedLocation: data.preferredLocation
        }
        const response = await schema.Enqueries.create(EnqueriesData)
        return response;
    },
    getAllPendingStudents: async () => {
        const response = await schema.Enqueries.find({})
        return response
    },
    createBatch: async (data: any) => {
        const batchesData = {
            batchName: data.batchName,
            hubLocation: data.hubLocation,
        }
        const response = await schema.Batches.create(batchesData)
        return response;
    },
    addStudents: async (studentId: String, batchId: String) => {
        const batch = await schema.Batches.findById(batchId)
        if (!batch) {
            throw new Error("Batch not found")
        }
        let newFumigationStudents: any = {
            userId: studentId,
            Pattern: 0,
            Array: 0,
            Oops: 0,
            Communication: 0
        }
        batch.fumigationStudents.push(newFumigationStudents)
        await batch.save()
        return { status: true, message: "student batch wise added successfully" }
    },
    getBatchwiseStudents: async (batchId: String) => {

        const batch = await schema.Batches.findById(batchId)
        if (!batch) {
            throw new Error("Batch not found")
        }
        const studentId = await batch.fumigationStudents
        const studentDetails = await schema.Enqueries.find({ _id: { $in: studentId } });
        return studentDetails
    },
    updateStudentMark: async (studentId: string, batchId: string, type: string, mark: number) => {
        try {
            // Find the batch by its _id
            const batch = await schema.Batches.findById(batchId);

            if (!batch) {
                throw new Error("Batch not found");
            }

            // Find the student within the fumigationStudents array by userId
            const studentIndex = batch.fumigationStudents.findIndex((student) => student.userId === studentId);

            if (studentIndex === -1) {
                throw new Error("Student not found in the batch with the given userId");
            }
            switch (type) {
                case "Pattern":
                    batch.fumigationStudents[studentIndex].Pattern = mark;
                    break;
                case "Array":
                    batch.fumigationStudents[studentIndex].Array = mark;
                    break;
                case "Oops":
                    batch.fumigationStudents[studentIndex].Oops = mark;
                    break;
                case "Communication":
                    batch.fumigationStudents[studentIndex].Communication = mark;
                    break;
                default:
                    throw new Error("Invalid 'type' value");
            }
            await batch.save();
            return {message:"mark updated successfully"}

        } catch (error) {
            console.error("Error updating student's pattern:", error);
        }
    }
}