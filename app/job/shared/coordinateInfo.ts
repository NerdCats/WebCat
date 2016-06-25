import { Job } from './Job';

export class CoordinateInfo{
    public pickUpAddressAvailable: boolean;
    public deliveryAddressAvailable: boolean;
    public assetLocationAvailable: boolean;

    constructor(job: Job){
        if (job.Order.From.Point.coordinates != null) {
            this.pickUpAddressAvailable = true;
        } else{
            this.pickUpAddressAvailable = false;
        }

        if (job.Order.To.Point.coordinates != null) {
            this.deliveryAddressAvailable = true;
        } else {
            this.deliveryAddressAvailable = false;
        }
    }

    checkIfAssetLocationIsTrue(object: Object){
        if (object["Point"]["coordinates"] != null) {
            this.assetLocationAvailable = true;
        }
    }
}