



export interface ICoordinatorRepository{
    addCoordinatorProfile(coordinatorData:any):any
    editCoordiantorProfile(coordinatorData:any):any
    getCoordinatorProfile(id:string):any,
    findTopcoordinators():any
    findAllCoordinators():any

}