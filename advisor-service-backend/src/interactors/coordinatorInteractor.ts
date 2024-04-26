import { ICoordinatorRepository } from "../interfaces/ICoordinatorRepository"
import { ICoordinatorInteractor } from "../interfaces/ICoordinatorInteractor"

export class CoordinatorInteractor implements ICoordinatorInteractor{

    private coordinatorRepository:ICoordinatorRepository
    constructor(coordinatorRepository:ICoordinatorRepository){
        this.coordinatorRepository=coordinatorRepository
    }

    addCoordnatorProfile(coordiantorData: any) {
        
    }
    editCoordnatorProfile(coordiantorData: any) {
        return this.coordinatorRepository.editCoordiantorProfile(coordiantorData)
        
    }

    getCoordinatorProfile(id: string) {

        return this.coordinatorRepository.getCoordinatorProfile(id)
        
    }
    getTopCoordinators() {
        return this.coordinatorRepository.findTopcoordinators()
    }

    getAllCoordinators(){
        return this.coordinatorRepository.findAllCoordinators()
    }
}