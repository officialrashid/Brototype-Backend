// entities/enquiries.ts

export class workDetails {
    
  experience: string;
  skills: string;
  CurrentWorkingCompanyName: string;
  PrefferedDomainsForReview: string;
    
      constructor(experience:string,skills:string,CurrentWorkingCompanyName:string,PrefferedDomainsForReview:string) {
        this.experience = experience;
        this.skills =skills;
        this.CurrentWorkingCompanyName =CurrentWorkingCompanyName;
        this.PrefferedDomainsForReview =PrefferedDomainsForReview;
      }
    }
    
    interface workData {
      experience: String;
      skills: String;
      CurrentWorkingCompanyName: String;
      PrefferedDomainsForReview: String;

    }
    