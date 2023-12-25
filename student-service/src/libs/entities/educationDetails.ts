// entities/enquiries.ts

export class educationDetails {
    
    highestQualification: string;
    yearOfPassing: string;
    passPercentage: string;
    schoolOrCollegeOrInstituteName: string;
    
      constructor(highestQualification:string,yearOfPassing:string,passPercentage:string,schoolOrCollegeOrInstituteName:string) {
        this.highestQualification = highestQualification;
        this.yearOfPassing =yearOfPassing;
        this.passPercentage =passPercentage;
        this.schoolOrCollegeOrInstituteName =schoolOrCollegeOrInstituteName;
      }
    }
    
    interface EducationData {
        highestQualification: String;
        yearOfPassing: String;
        passPercentage: String;
        schoolOrCollegeOrInstituteName: String;

    }
    