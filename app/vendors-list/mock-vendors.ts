import { Vendor } from '../shared/model/vendor';

export const VENDORS: Vendor[] = [
    {
        id: 1,
        name: 'Northend Coffee',
        address: {
            PostalCode: '1230',
            Floor: '5',
            HouseNumber: '23',
            AddressLine1: 'Banani',
            AddressLine2: 'Kakoli',
            Country: 'Bangladesh',
            City: 'Dhaka',
            State: 'NoWhere',
            Locality: 'O.o',
            Point: {
                type: 'Point',
                coordinates: [1.23, 4.56]
            }
        },
        phone_number: '01678123456',
        isOpen: true,
        products: ['any', 'thing', 'you', 'want']
    }
];