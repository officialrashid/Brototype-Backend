import { IDistributeInteractor } from "../interfaces/IDistrbuteInteractor";
import { IDistributeRepository } from "../interfaces/IDistributeRepository";

export class DistributeInteractor implements IDistributeInteractor{

    private distributeRepository:IDistributeRepository
    constructor(distributeRepository:IDistributeRepository){
        this.distributeRepository=distributeRepository
    }

    distributeReviews(reviewData:any) {

        return this.distributeRepository.addReviewData(reviewData)
  
    }

}
