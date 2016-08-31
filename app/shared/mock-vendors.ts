import { Vendor } from '../shared/model/vendor';

export class MockVendors {
    public static VENDORS: Vendor[] = [
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
                Locality: 'Banani',
                Point: {
                    type: 'Point',
                    coordinates: [1.23, 4.56]
                }
            },
            phone_number: '01678123456',
            isOpen: true,
            products: [
                'Coffee', 'Tea', 'Coca Cola', 'Pepsi', 'Fanta',
                'Cake', 'Pastry', 'Almond', 'Rice', 'Flour',
                'Chocolates'
            ],
            image: 'http://i.imgur.com/9Cfolu9.jpg',
            catagories: []
        },
        {
        id: 2,
        name: 'Izumi',
        address: {
            PostalCode: '1200',
            Floor: '0',
            HouseNumber: '',
            AddressLine1: '24/C Rd 113, Dhaka 1212',
            AddressLine2: 'Gulshan-1',
            Country: 'Bangladesh',
            City: 'Dhaka',
            State: 'NoWhere',
            Locality: 'Banani',
            Point: {
                type: 'Point',
                coordinates: [1.23, 4.56]
            }
        },
        phone_number: '01762-635083',
        isOpen: true,
        products: ['Coffee', 'Tea', 'Coca Cola', 'Pepsi', 'Fanta',
                'Cake', 'Pastry', 'Almond', 'Rice', 'Flour',
                'Chocolates'
        ],
        image: 'http://imgur.com/DvmzsbV.jpg',
        catagories: [
                {
                    catagory: "Rice bowls",
                    itemlist: [
                        {
                            item: "Chirashi Don",
                            price: 1800,
                            description: "Thinly sliced fresh fish on vinegarate rice served with wasabi and soya"
                        },
                        {
                            item: "Gyu Suteki Don",
                            price: 1500 ,
                            description: "Grilled premium beef, sliced and served on rice"
                        }
                    ]
                },
                {
                    catagory: "Hot udon",
                    itemlist: [
                        {
                            item: "Tempura Udon",
                            price: 1200,
                            description: "Udon with shrimp tempura"
                        },
                        {
                            item: "Curry Udon",
                            price: 1200,
                            description: "Udon with chicken and shrimp in hot and spicy Japanese curry soup."
                        },
                        {
                            item: "Khamo Negi Udon or Soba",
                            price: 1200,
                            description: "Duck breast and leek soup with choice of udon or soda noodles"
                        }
                    ]
                },
                {
                    catagory: "accompaniments",
                    itemlist: [
                        {
                            item: "Edamame (*subject to availability and season)",
                            price: 700,
                            description: "Boiled young soybeans in the pod"
                        },
                        {
                            item: "Gohan",
                            price: 250,
                            description: "Steamed rice"
                        },
                        {
                            item: "Gari",
                            price: 300,
                            description: "Pickled ginger"
                        },
                        {
                            item: "Garlic Fried Rice",
                            price: 700,
                            description: "For shrimp or chicken, add Tk 200"
                        },
                        {
                            item: "Fresh Wasabi (*subject to availability and season)",
                            price: 300,
                            description: ""
                        }
                    ]
                },
                {
                    catagory: "dessert",
                    itemlist: [
                        {
                            item: "Cheesecake",
                            price: 500,
                            description: ""
                        },
                        {
                            item: "Chocolate Cake",
                            price: 500,
                            description: ""
                        },
                        {
                            item: "Homemade ice Cream",
                            price: 400,
                            description: "Green Tea/Vanilla/Chocolate"
                        },
                        {
                            item: "Holey NY Cheesecake",
                            price: 700,
                            description: "100% philli cream cheese baked to prefection."
                        },
                        {
                            item: "Holey Death by Chocolate cake",
                            price: 800,
                            description: "Good for sharing. 70% Belgian Dark Chocolate"
                        }
                    ]
                },
                {
                    catagory: "beverages",
                    itemlist:
                    [
                        {
                            item: "Freshly Squeezed Seasonal Fruits",
                            price: 300,
                            description: ""
                        },
                        {
                            item: "Orange Blossom",
                            price: 300,
                            description: "orange, fresh mint, soda"
                        },
                        {
                            item: "Lemon Mint",
                            price: 300,
                            description: "lemon, fresh mint, crushed ice"
                        },
                        {
                            item: "Fresh Lime Soda",
                            price: 300,
                            description: ""
                        },
                        {
                            item: "Lemonade",
                            price: 200,
                            description: ""
                        },
                        {
                            item: "Perrier",
                            price: 450,
                            description: ""
                        },
                        {
                            item: "Soft Drinks",
                            price: 150,
                            description: ""
                        }
                    ]
                },
                {
                    catagory: "Tea / Coffee",
                    itemlist: [
                        {
                            item: "Espresso",
                            price: 250,
                            description: ""
                        },
                        {
                            item: "Americano",
                            price: 250,
                            description: ""
                        },
                        {
                            item: "Latte",
                            price: 300,
                            description: ""
                        },
                        {
                            item: "Cappuccino",
                            price: 300,
                            description: ""
                        },
                        {
                            item: "Macchiato",
                            price: 300,
                            description: ""
                        },
                        {
                            item: "Ice Cappuccino",
                            price: 350,
                            description: ""
                        },
                        {
                            item: "Black Tea",
                            price: 150,
                            description: ""
                        },
                        {
                            item: "Green Tea",
                            price: 175,
                            description: ""
                        }
                    ]
                },
                {
                    catagory: "nigiri and sashim",
                    itemlist: [
                        {
                            item: "Nigiri and Maki Sushi Platter",
                            price: 1900,
                            description: "6 nigiri nad 6 maki"
                        },
                        {
                            item: "Sushi and Sashimi Platter",
                            price: 2600,
                            description: "8 sushi and 8 sashimi"
                        },
                        {
                            item: "Sushi Izumi",
                            price: 1600,
                            description: "Selected 8 pieces of mixed sushi and 4 pieces of maki rolls."
                        },
                        {
                            item: "Chef's Sashimi Platter* - 12 pieces",
                            price: 3500,
                            description: "Izumi's best sashimi of the day."
                        },
                        {
                            item: "Chef's Sashimi Platter* - 15 pieces",
                            price: 4500,
                            description: "Izumi's best sashimi of the day."
                        },
                        {
                            item: "Tsukiji Sashimi Platter* 15 pieces",
                            price: 7000,
                            description: "Chilled maguro, botan ebi and more, imported weekly from Tsukiji, Tokyo"
                        }
                    ]
                },
                {
                    catagory: "individual sushi",
                    itemlist: [
                        {
                            item: "Tobiko*",
                            price: 600,
                            description: "2pieces per serving. Flying fish roe"
                        },
                        {
                            item: "Ikura",
                            price: 800,
                            description: "2pieces per serving. premium salmon roe"
                        },
                        {
                            item: "Tuna",
                            price: 500,
                            description: "2pieces per serving."
                        },
                        {
                            item: "Salmon",
                            price: 500,
                            description: "2pieces per serving."
                        },
                        {
                            item: "Hamachi",
                            price: 600,
                            description: "2pieces per serving."
                        },
                        {
                            item: "Scallop",
                            price: 600,
                            description: "2pieces per serving."
                        },
                        {
                            item: "Shrimp",
                            price: 400,
                            description: "2pieces per serving. boiled shrimp"
                        },
                        {
                            item: "Beef Tataki 5 pieces",
                            price: 1000,
                            description: "2pieces per serving."                        }
                    ]
                },
                {
                    catagory: "individual sashimi",
                    itemlist: [
                        {
                            item: "Tuna",
                            price: 1300,
                            description: "8 pieces per serving"
                        },
                        {
                            item: "Salmon",
                            price: 1300,
                            description: "8 pieces per serving"
                        },
                        {
                            item: "Scallop",
                            price: 1600,
                            description: "8 pieces per serving"
                        },
                        {
                            item: "Hamachi",
                            price: 1600,
                            description: "8 pieces per serving"
                        },
                        {
                            item: "Premium tuna sashimi 8 pieces per serving - Akami",
                            price: 2500,
                            description: "*Subject to availability and season."
                        },
                        {
                            item: "premium tuna sashimi 8 pieces per serving - Chutoro",
                            price: 3500,
                            description: "*Subject to availability and season."
                        },
                        {
                            item: "premium tuna sashimi 8 pieces per serving - Otoro",
                            price: 4000,
                            description: "*Subject to availability and season."
                        }
                    ]
                },
                {
                    catagory: "Sushi & sashimi | Sushi rolls 8 pieces",
                    itemlist: [
                        {
                            item: "Salmon, Avocado and Ikura Roll",
                            price: 1200,
                            description: ""
                        },
                        {
                            item: "Cucumber Roll",
                            price: 500,
                            description: "Vegetarian."
                        },
                        {
                            item: "Californian Roll",
                            price: 1200,
                            description: "An inside-our roll with crab, avocado and sprinkled with sesame seeds."
                        },
                        {
                            item: "Izumi Roll",
                            price: 1200,
                            description: "Inside-out roll coated with roasted black and white sesame seeds. Tempura prawn and avocado or chicken and avocado."
                        },
                        {
                            item: "Gyaku Roll",
                            price: 1600,
                            description: "Seared salmon outside, unagi and avocado inside, topped with salmon roe."
                        },
                        {
                            item: "Dragon Roll Unagi",
                            price: 1600,
                            description: "Grilled eel and avocado."
                        },
                        {
                            item: "Spicy Tuna Roll",
                            price: 1300,
                            description: "Spicy tuna roll coated with orange tobiko and spicy miso sauce."
                        },
                        {
                            item: "Tempura Roll",
                            price: 900,
                            description: "Shrimp tempura."
                        },
                        {
                            item: "Soft Shell Crab Roll",
                            price: 1600,
                            description: "With spicy miso sauce."
                        },
                        {
                            item: "Tuna Tempura Roll",
                            price: 1500,
                            description: "Fried maki with tuna filling."
                        },
                        {
                            item: "Wagyu Yakiniku Roll",
                            price: 1500,
                            description: "120 gsm of grilled Wagyu beef in sweet yakiniku sauce."
                        }
                    ]
                },
                {
                    catagory: "starters",
                    itemlist: [
                        {
                            item: "Edarname",
                            price: 700 ,
                            description: "Belled    soybeans in the pod."
                        },
                        {
                            item: "Mushroom Salad",
                            price: 900,
                            description: "Woof ...Now."
                        },
                        {
                            item: "Avocado Salad",
                            price: 1000,
                            description: "Sked eeeetuto and h. greens"
                        }
                    ]
                },
                {
                    catagory: "Maki",
                    itemlist: [
                        {
                            item: "Avocado Roll",
                            price: 900,
                            description: "Moos. rated ■terth he. wetat,"
                        },
                        {
                            item: "Kimpira Roll",
                            price: 800,
                            description: "carrot. paprta and ...rnr: s,red,"
                        },
                        {
                            item: "Oshinko Roll",
                            price: 800,
                            description: "Japhaese radish pickle.    "
                        }
                    ]
                },
                {
                    catagory: "Mains",
                    itemlist: [
                        {
                            item: "Vegetable Yaki Udon",
                            price: 1000,
                            description: "Grilled udon with fresh vegetables."
                        },
                        {
                            item: "Kinoko Udon or Soba",
                            price: 1200,
                            description: "Udon with onion and shoyu sauce."
                        },
                        {
                            item: "Eggplant",
                            price: 700,
                            description: "Grilled eggplants with miso."
                        }
                    ]
                },
                {
                    catagory: "Tea / Coffee",
                    itemlist: [
                        {
                            item: "CHICKEN TERIYAKI BENTO",
                            price: 800,
                            description: "with Steamed Rice, Kimpira Roll, Oshinko"
                        },
                        {
                            item: "CHICKEN KATSU (CUTLET) BENTO",
                            price: 800,
                            description: "with Steamed Rice, Cu, Sauce, Kimpira Roll, Oshinko"
                        },
                        {
                            item: "MIXED BENTO BOX",
                            price: 1200,
                            description: "Mixed Salad with Shrimp, Salmon in Asian Sauce, Chicken Teriyaki, Salmon Sushi & Kimpira Roll"
                        },
                        {
                            item: "OYAKU DON RICE BOWL",
                            price: 1000,
                            description: "Japanese Egg, Chicken, Onion on Rice"
                        },
                        {
                            item: "TEN DON RICE BOWL",
                            price: 1000,
                            description: "Shrimp & Vegetable Tempura on Rice"
                        },
                        {
                            item: "CHIRASHI DON RICE BOWL",
                            price: 1200,
                            description: "Mixed Sashimi on Rice"
                        },
                        {
                            item: "ZUKE DON RICE BOWL",
                            price: 1200,
                            description: "Marinated Aka. (Tuna) Sashimi on Rice"
                        },
                        {
                            item: "NOODLE BOWLS",
                            price: 1200,
                            description: "Shrimp & Vegetable Tempura & choice of Udon or Soba Kinoko (Mushroom) & Choice of Udon or Soba Duck Breast & Choice of Udon or Soba."
                        }
                    ]
                }
            ]
    },
        {
            id: 3,
            name: 'Döner and Gyros',
            address: {
                PostalCode: '1200',
                Floor: '0',
                HouseNumber: '',
                AddressLine1: 'Prasad Trade Center, 6 Kemal Attaturk Avenue',
                AddressLine2: 'Banani',
                Country: 'Bangladesh',
                City: 'Dhaka',
                State: 'NoWhere',
                Locality: 'Banani',
                Point: {
                    type: 'Point',
                    coordinates: [1.23, 4.56]
                }
            },
            phone_number: '01792188888',
            isOpen: true,
            products: ['any', 'food', 'you', 'want'],
            image: 'http://imgur.com/DvmzsbV.jpg',
            catagories: [
                {
                    catagory: "DÖNER",
                    itemlist: [
                        {
                            item: "Classic Berlin Döner - Chicken or Beef (Jr)",
                            price: 495,
                            description: ""
                        },
                        {
                            item: "Classic Berlin Döner - Chicken or Beef (reg)",
                            price: 650,
                            description: ""
                        },
                        {
                            item: "Garden Style Döner - Chicken or Beef (Jr)",
                            price: 495,
                            description: ""
                        },
                        {
                            item: "Garden Style Döner - Chicken or Beef (reg)",
                            price: 650,
                            description: ""
                        },
                        {
                            item: "Vegetarian Döner (Jr)",
                            price: 395,
                            description: ""
                        },
                        {
                            item: "Vegetarian Döner (reg)",
                            price: 495,
                            description: ""
                        },
                        {
                            item: "Döner Meat Box- Chicken or Beef",
                            price: 595,
                            description: ""
                        },
                        {
                            item: "Döner Rice Bowl - Chicken or Beef",
                            price: 495,
                            description: ""
                        },
                        {
                            item: "Döner In Dhakaya Style",
                            price: 795,
                            description: ""
                        },
                        {
                            item: "Shatkhora Döner",
                            price: 795,
                            description: ""
                        }
                    ]
                },
                {
                    catagory: "SALADS",
                    itemlist: [
                        {
                            item: "German Potato Salad",
                            price: 250,
                            description: ""
                        },
                        {
                            item: "Fresh Green Salad",
                            price: 350,
                            description: ""
                        }
                    ]
                },
                {
                    catagory: "GYROS",
                    itemlist: [
                        {
                            item: "Classic Chicago Gyros - Chicken or Beef",
                            price: 650,
                            description: ""
                        },
                        {
                            item: "Garden Style Gyros - Chicken or Beet ",
                            price: 650,
                            description: ""
                        }
                    ]
                },
                {
                    catagory: "WRAPS",
                    itemlist: [
                        {
                            item: "Classic Wrap - Chicken or Beef  (Jr)",
                            price: 495,
                            description: ""
                        },
                        {
                            item: "Classic Wrap - Chicken or Beef  (reg)",
                            price: 650,
                            description: ""
                        }
                    ]
                },
                {
                    catagory: "SIDES",
                    itemlist: [
                        {
                            item: "Crispy Fries (Jr)",
                            price: 150,
                            description: ""
                        },
                        {
                            item: "Crispy Fries (large)",
                            price: 225,
                            description: ""
                        },
                        {
                            item: "Mighty Fries (Jr)",
                            price: 195,
                            description: ""
                        },
                        {
                            item: "Mighty Fries (large)",
                            price: 250,
                            description: ""
                        },
                        {
                            item: "Onion Rings (Jr)",
                            price: 195,
                            description: ""
                        },
                        {
                            item: "Onion Rings (large)",
                            price: 250,
                            description: ""
                        }
                    ]
                }
            ]

        },
        {
            id: 4,
            name: 'Hakka Dhaka',
            address: {
                PostalCode: '1230',
                Floor: '5',
                HouseNumber: '45/6',
                AddressLine1: 'Road-10, House-35, Block-D',
                AddressLine2: 'Banani',
                Country: 'Bangladesh',
                City: 'Dhaka',
                State: 'NoWhere',
                Locality: 'Banani',
                Point: {
                    type: 'Point',
                    coordinates: [1.23, 4.56]
                }
            },
            phone_number: '01879134037',
            isOpen: true,
            products: ['any', 'food', 'you', 'want'],
            image: 'http://i.imgur.com/iW1euxZ.jpg',
            catagories: []
        },
        {
            id: 5,
            name: 'Farm Fresh',
            address: {
                PostalCode: '1230',
                Floor: '5',
                HouseNumber: '45/6',
                AddressLine1: 'House-123, Lane-1',
                AddressLine2: 'Baridhara DOHS',
                Country: 'Bangladesh',
                City: 'Dhaka',
                State: 'NoWhere',
                Locality: 'Baridhara',
                Point: {
                    type: 'Point',
                    coordinates: [1.23, 4.56]
                }
            },
            phone_number: '01819211525',
            isOpen: true,
            products: [
                'Coffee', 'Tea', 'Coca Cola', 'Pepsi', 'Fanta',
                'Cake', 'Pastry', 'Almond', 'Rice', 'Flour',
                'Chocolates', 'Flowers',
                'Electronics', 'TV'
            ],
            image: 'http://i.imgur.com/C1fbSZc.jpg',
            catagories: []
        },
        {
            id: 6,
            name: 'Oh Kitchen Pizza',
            address: {
                PostalCode: '1230',
                Floor: '5',
                HouseNumber: '45/6',
                AddressLine1: 'Road 79, House 5, Gulshan 2',
                AddressLine2: 'Gulshan 2',
                Country: 'Bangladesh',
                City: 'Dhaka',
                State: 'NoWhere',
                Locality: 'O.o',
                Point: {
                    type: 'Point',
                    coordinates: [1.23, 4.56]
                }
            },
            phone_number: 'N/A',
            isOpen: true,
            products: [
                'Coffee', 'Tea', 'Coca Cola', 'Pepsi', 'Fanta',
                'Cake', 'Pastry', 'Almond', 'Rice', 'Flour',
                'Chocolates', 'Flowers',
                'Electronics', 'TV'
            ],
            image: 'http://i.imgur.com/I1aOrmi.jpg',
            catagories: []
        },
        {
            id: 7,
            name: 'Family World',
            address: {
                PostalCode: '1230',
                Floor: '5',
                HouseNumber: '45/6',
                AddressLine1: 'Jahanara Kunjo, East Manik Nagar',
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
            phone_number: 'N/A',
            isOpen: true,
            products: [
                'Coffee', 'Tea', 'Coca Cola', 'Pepsi', 'Fanta',
                'Cake', 'Pastry', 'Almond', 'Rice', 'Flour',
                'Chocolates', 'Flowers',
                'Electronics', 'TV'
            ],
            image: 'http://i.imgur.com/1LGNGv8.jpg',
            catagories: []
        },
        {
            id: 8,
            name: 'FFC',
            address: {
                PostalCode: '1230',
                Floor: '5',
                HouseNumber: '45/6',
                AddressLine1: 'Road 55, House 12/B, U 1, Gulshan 2',
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
            phone_number: '02-9880777',
            isOpen: true,
            products: [
                'Coffee', 'Tea', 'Coca Cola', 'Pepsi', 'Fanta',
                'Cake', 'Pastry', 'Almond', 'Rice', 'Flour',
                'Chocolates', 'Flowers',
                'Electronics', 'TV'
            ],
            image: 'http://i.imgur.com/OrYcw8i.jpg',
            catagories: []
        },
        {
            id: 9,
            name: 'The Jar',
            address: {
                PostalCode: '1230',
                Floor: '5',
                HouseNumber: '45/6',
                AddressLine1: 'House-15, Road-7A, Block-F, Banani',
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
            phone_number: '01717-132380',
            isOpen: true,
            products: [
                'Coffee', 'Tea', 'Coca Cola', 'Pepsi', 'Fanta',
                'Cake', 'Pastry', 'Almond', 'Rice', 'Flour',
                'Chocolates', 'Flowers',
                'Electronics', 'TV'
            ],
            image: 'http://i.imgur.com/5ex18sL.jpg',
            catagories: []
        },
        {
            id: 10,
            name: 'Mad Chef',
            address: {
                PostalCode: '1230',
                Floor: '5',
                HouseNumber: '45/6',
                AddressLine1: 'House-6, Road- 17/A, Banani',
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
            phone_number: '01715-780379',
            isOpen: true,
            products: [
                'Coffee', 'Tea', 'Coca Cola', 'Pepsi', 'Fanta',
                'Cake', 'Pastry', 'Almond', 'Rice', 'Flour',
                'Chocolates', 'Flowers',
                'Electronics', 'TV'
            ],
            image: 'http://i.imgur.com/DvmzsbV.jpg',
            catagories: []
        },
        {
            id: 11,
            name: 'ZuumZuum',
            address: {
                PostalCode: '1230',
                Floor: '5',
                HouseNumber: '45/6',
                AddressLine1: 'House-28, Road-20, Block-K, Banani',
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
            phone_number: 'N/A',
            isOpen: true,
            products: [
                'Coffee', 'Tea', 'Coca Cola', 'Pepsi', 'Fanta',
                'Cake', 'Pastry', 'Almond', 'Rice', 'Flour',
                'Chocolates', 'Flowers',
                'Electronics', 'TV'
            ],
            image: 'http://i.imgur.com/DvmzsbV.jpg',
            catagories: []
        },
        {
            id: 12,
            name: 'Styline',
            address: {
                PostalCode: '1230',
                Floor: '5',
                HouseNumber: '45/6',
                AddressLine1: '"Styline Dhanmondi 4/A, Dhaka-1209, Bangladesh',
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
            phone_number: '8801979996565',
            isOpen: true,
            products: [
                'Coffee', 'Tea', 'Coca Cola', 'Pepsi', 'Fanta',
                'Cake', 'Pastry', 'Almond', 'Rice', 'Flour',
                'Chocolates', 'Flowers',
                'Electronics', 'TV'
            ],
            image: 'http://i.imgur.com/DvmzsbV.jpg',
            catagories: []
        },
        {
            id: 13,
            name: 'My Beats',
            address: {
                PostalCode: '1230',
                Floor: '5',
                HouseNumber: '45/6',
                AddressLine1: 'Bashundhara City',
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
            phone_number: 'N/A',
            isOpen: true,
            products: [
                'Coffee', 'Tea', 'Coca Cola', 'Pepsi', 'Fanta',
                'Cake', 'Pastry', 'Almond', 'Rice', 'Flour',
                'Chocolates', 'Flowers',
                'Electronics', 'TV'
            ],
            image: 'http://i.imgur.com/DvmzsbV.jpg',
            catagories: []
        }
    ];
}