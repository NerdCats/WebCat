import { Injectable } from '@angular/core'

@Injectable()
export class WrapHeaderService {
    WrapHeaderDetails = {
        featuredVendors: [
            {
                "Name": "North End",
                "Address": "Banani",
                "Image": "http://i.imgur.com/9Cfolu9.jpg",
                "Area": "Banani",
                "Category": "Coffee"
            },
            {
                "Name": "Dhaka Dough",
                "Address": "Rampura",
                "Image": "http://i.imgur.com/lzBNSsW.png",
                "Area": "Banani",
                "Category": "Premium grocery"
            },
            {
                "Name": "The Jar",
                "Address": "Gulshan",
                "Image": "http://i.imgur.com/vwhkzyk.jpg",
                "Area": "Gulshan",
                "Category": "Breakfast, Lunch"
            },
            {
                "Name": "Medicine Mart",
                "Address": "Banani",
                "Image": "http://i.imgur.com/lyqS3A7.jpg",
                "Area": "Banani",
                "Category": "Medicine"
            },
            {
                "Name": "Unimart",
                "Address": "Gulshan 2",
                "Image": "http://i.imgur.com/FFlqY6p.jpg",
                "Area": "Gulshan 2",
                "Category": "Daily Needs"
            },
            {
                "Name": "Farm Fresh",
                "Address": "Banani",
                "Image": "http://i.imgur.com/58PCC4d.jpg",
                "Area": "Banani",
                "Category": "Fresh fruits, vegetables"
            }
        ],
        areas: [
            "Banani",
            "Baridhara",
            "Dhanmondi",
            "Gulshan 1",
            "Gulshan 2",
            "Uttara"
        ],
        items: [
            "Add on", "Add ons", "Add ons with mains", "Addon items", "Ala carte", "All day breakfast", "All day set menu", "All time famous", "All time favourites", "American pizza", "American pizza thick", "American way burger", "Appetisers", "Appetixers", "Appetizer", "Appetizer and ttarter", "Appetizer gallery", "Appetizer or starter", "Appetizerchinese", "Appetizerindian", "Appetizers", "Appetizers cold starters and salads", "Appetizers gallery", "Appetizers or starters", "AppetizersChinese", "AppetizersThai", "Appetizerthai", "Appitizer", "Arabian", "Arabian shawarma", "Arabian style", "Arabina shawarma", "Asian flavor", "Assorted platter", "Baconwrapped shrimps", "Bakery item", "Bamboo food", "Bangali menu", "Bangla Food", "Bangla set menu", "Bangladeshi", "BanglaSpecial Bangla Set Lunch Box", "Bar b q s", "Barbq beef items", "Barbq chicken items", "Barbq mutton items", "Barbq vegetable items", "Basmati Ki khushboo", "Batter fried tempura", "Bbq", "Bbq and tandoori", "Bbq meat", "Beef", "Beef  chinese or thai items", "Beef  Indian Cusine", "Beef 2", "Beef and chicken lasagna", "Beef burger", "Beef burgers", "Beef curry", "Beef Dishes", "Beef dishes", "Beef entrees", "Beef gravy", "Beef kabab", "Beef lovers", "Beef main dishes", "Beef sausage and cold cut", "Beef sausages and cold cut", "Beef slice and sea food", "Beef steak", "Beefchinese", "Beefindian", "Beefthai", "Belgian waffle", "Bengali lunch", "Bento box", "Best of asia", "Beverage", "Beverage and other", "Beverage cold", "Beverage selection", "Beverages", "Beverages and desserts", "Beverages and Juice", "Beverages and other", "Bharta", "Bhath  Daal", "Bhorta", "Biriany", "Biriyani", "Biriyani and rice", "Biriyani or polaw", "Biriyani steam", "Biryani", "Biryani item", "Biryani selection", "BiryaniPolaw", "Biscuits and cookies", "Bites", "Bites and nibbles", "Bollywood spices", "Borta", "Bottle of drinks", "Bread", "bread and cake", "Bread and cake", "Breads", "Breakfast", "Broast and fried", "Broast chicken", "Broast Chicken", "Buffet menu", "Buns", "Burger", "Burger  beef", "Burger – chicken", "Burger (serves with french fries)", "Burger and chicken meals", "Burger and fries", "Burger and sandwich", "Burger and sandwiches", "Burger and Sandwiches", "Burger beef", "Burger chicken", "Burger Delight", "Burger fest", "Burger grilled sandwiches", "Burger item", "Burger sandwich and pasta counter", "Burger sandwich wraps and roll", "Burgers", "Burgers and fried chicken", "Burgers pithas wraps", "Butlers signature hot chocolate", "Butter grilled sandwich", "Cake", "Cake and pastry", "Calamari fries", "Captains Fried Chicken", "Captains Kebab", "Captains Special", "Captains Tandoori Chicken", "Carte nuevo", "Casata starters", "Catch of the day", "Celebration cakes", "Chaat", "Chaat phuchka", "Chao chao", "Charcoal bbq beef", "Charcoal bbq chicken", "Charcoal bbq mutton", "Charcoal bbq sea food", "Cheese backed rissoto", "Cheesy bites pizza", "Chefs special", "Chefs specials", "Chick a lichen", "Chicken", "Chicken  chinese or thai items", "Chicken and more", "Chicken burger", "Chicken burgers", "Chicken combo", "Chicken curry", "Chicken delight", "Chicken Dishes", "Chicken dishes", "Chicken entrees", "Chicken Fries", "Chicken fry", "Chicken fry or rioll", "Chicken goose and duck", "Chicken gravy", "Chicken Indian Cuisine", "Chicken kabab", "Chicken lovers", "Chicken main dishes", "Chicken Meal", "Chicken or beef selections", "Chicken or fish or vege burgers", "Chicken platter", "Chicken sausage and cold cut", "Chicken sausages and cold cut", "Chicken special", "Chicken wings", "Chicken with naan", "Chickenchinese", "Chickenindian", "Chickenthai", "Chinese", "Chinese  fish", "Chinese and thai and indian package", "Chinese appetizer", "chinese appetizer", "Chinese beef", "Chinese beef selection", "Chinese chicken", "Chinese chicken selection", "Chinese chopci", "Chinese chopsuey", "Chinese chowmein", "Chinese chowmein noodles", "Chinese chowmein or noodles", "Chinese cuisine appetizer", "Chinese cuisine beef", "Chinese cuisine chicken", "Chinese cuisine fish", "Chinese cuisine prawn", "Chinese cuisine rice", "Chinese cuisine soup", "Chinese curry", "Chinese fish", "Chinese fish or prawn", "Chinese fried rice", "Chinese main course", "Chinese main dishes", "Chinese noodles", "Chinese package menu", "Chinese prawn", "Chinese prawn and fish", "Chinese prawn fish selection", "Chinese prawns", "Chinese pure vegetarian dishes", "Chinese rice", "Chinese rice and noodles", "Chinese rice noodles selection", "Chinese salad", "Chinese salads", "Chinese set meals", "Chinese set menu", "Chinese soup", "Chinese starter", "Chinese starters", "Chinese takeout", "Chinese vegetable", "Chinese vegetable selection", "Chinese vegetables", "Chinese vegetarian", "ChineseAppetizer", "ChineseBeef", "ChineseChicken", "ChineseFish", "ChineseNoodles", "ChinesePrawnFish", "ChineseRice", "ChineseSalad", "ChineseSoup", "ChineseVegetable", "Chingri", "Chitchats", "Choi card", "Choi curd", "Choose your side and more stromboli", "Chopsuey", "Chow mein", "Chowmein", "Chowmein and chopsuey", "Chowmein and dosa", "Chowmein and noodles", "Chowmein and pasta", "Chowmein noddles", "Chowmein or chopsuey", "Chowmein or chopsuey items", "Chowmien", "Chowmin noodles", "Chowmine or noodls", "Classic burgers", "Classic italian", "Clay pot", "Cocktails", "Coffee", "Coffes", "Cold beverage", "Cold coffee", "Cold refreshment", "Combo", "Combo meals", "Combo offer", "Combos", "Continental", "Continental cuisine", "Continental cuisine chicken", "Continental cuisine lobster", "Continental cuisine soup", "Continental cuisine spaghetti and pasta", "Continental cuisine steakbeef", "Continental gallery", "ContinentalChicken", "ContinentalPasta", "ContinentalPizza", "ContinentalSteak", "Cookies", "Couple meal", "Crab", "Create your own", "Cupcake", "Cupcakes", "Curries", "Curries from the streets of bangkok..", "Curry", "Curry item", "Curry masala", "Daal", "Dal", "Dal section", "Dalindian", "Deals", "Decadent desserts", "Deep fried", "Deep fry", "Desert", "Dessert", "Dessert for delight", "Desserts", "Desserts and sweets", "Desserts from the kitchen", "Dimsum", "Dip finger food", "Donburi rice bowl dishes", "Donuts", "Dosa", "Dosa n chat", "Double burger", "Drinks", "Drinks and beverages", "Drinks and desserts", "Drinks items", "Dry items", "Duck", "Entree", "Especiales del casa", "Exciting offer", "Exclusive", "Extra", "Extra toppings", "Fajitas", "Family Box", "Fast food", "Fast Food", "Fast food and others", "Fast food gallery", "Fast foodBurger", "Fast foodSandwich", "Favorites pizza", "Ffc specials", "Finger food", "Fire on ice special nan", "First appitiet", "Fish", "Fish and chips", "Fish and chips deal", "Fish and chips express", "Fish and finger food", "Fish and prawn", "Fish and sea food", "Fish and seafood", "Fish and squid", "Fish burger", "Fish curry", "Fish dishes", "Fish gravy", "Fish item", "Fish items", "Fish kabab", "Fish n sea food", "Fish or crab selections", "Fish or prawn", "Fish or prawnthai", "Fish or sea food", "Fishchinese", "Fishindian", "FishPrawn", "Florentine signature sandwich (served with french fries)", "Florentine specialties", "Floverd biryani", "Food book special", "Food item", "Formusa qq juice", "Frappes", "French Fries And Bread", "French fry", "French pastries", "Fresh cocktail or drinks", "Fresh hitzsides a la carte", "Fresh juice", "Fresh Juice", "Fresh water catch", "Fried", "Fried chicken", "Fried Chicken in Box", "Fried items", "Fries", "Fries and currys", "Fries and fast food", "Fries menu", "From the bakery", "From the garden", "Frozen food", "Frozen Items", "Fuchka", "Garden fresh salad", "Gastronomy", "Gelato and soft gelato", "Glamour burgers", "Golden aroama fried chicken", "Golden surprise pizza", "Good food special", "Gourment burger", "Gourment burgers", "Grab a snack", "Gravy", "Gravy chicken", "Gravy dar mojadaar", "Gravy dishes", "Grill and kabab", "Grilled", "Grilled and subs", "Grilled chicken", "Grilled sandwich lovers", "Hakka soups", "Hakka specials", "Halim", "Hand stretched thin pizza", "Hannibal lecture steaks", "Healthy bites", "Heavenly milk shake", "Hot coffee", "Hot dish", "Hot Dog", "Hot dog roll and shawarma", "Hot grilled sandwiches", "Hot plates", "Hot savory", "Hot sizzlers", "Hot specialty coffee", "Hot starters", "Hotti naughty", "House special", "Hunger burger", "Ice coffee", "Ice coffee shakerato", "Ice cream sundaes", "Ice tea", "Idly vada", "Iftar menu", "Iftar platter", "Imports", "Indian", "Indian appetizer", "Indian appetizers", "Indian bbq and tandoori", "Indian beef", "Indian beef curry", "Indian biriyani", "Indian biryani", "Indian biryani and pulao", "Indian chaat", "Indian chicken", "Indian chicken  curry", "Indian chicken curry", "Indian chicken or duck curry", "Indian Corner", "Indian cuisine", "Indian dosa", "Indian fish", "Indian fish curry", "Indian gravy", "Indian mains", "Indian mutton", "Indian mutton  curry", "Indian mutton curry", "Indian mutton curry or beef curry", "Indian naan", "Indian nan", "Indian panner or vegetable roll", "Indian platter", "Indian polao or biriyani", "Indian prawn", "Indian prawn curry", "Indian raita", "Indian raita or salad", "Indian roll", "Indian salmon", "Indian set menu", "Indian shobzi", "Indian soup", "Indian spicy", "Indian starter or appetizer", "Indian starters", "Indian style rolls", "Indian tandoori", "Indian vegetable and dal", "Indian vegetarian", "IndianBeef", "IndianBeverage", "IndianBiriyani  Polao", "IndianChicken", "IndianDal", "IndianFish", "IndianKabab N Tandoori", "IndianMutton", "IndianNan N Kulcha", "IndianNanBread", "IndianPrawn Fish", "IndianRicePolaoBiriyani", "IndianSalad", "IndianSpecial Grilled  By Charcola", "IndianTandoori Oven", "IndianVegetable", "Indulge yourself into our entrees", "Italian", "Italian backed pasta", "Italian oven fresh pizza", "Italian pasta", "Italian pastas", "Italian pizza", "Italian pizza thin", "Jacket potato", "Jacket potato and chicken wings", "Japanese", "Japanese bento box", "Japanese chicken or beef set menu", "Japanese soul foods", "Juice", "Juniors menu", "Kabab", "Kabab item", "Kabab items", "Kabab platter for 4", "Karai selection", "Kebab", "Kebab and curry", "Kebab and kofta", "Kebab and shashlik", "Kebab selections", "Kebabs", "Kennys chicken meal", "Khichuri pulao and biryani", "Kids booty", "Kids meal", "Kids menu", "Kids yummy", "King crab", "King prawn", "Kofta curry with butter fried rice", "Kopta", "Kulcha", "Lamb", "Lamb and steak", "Lassi", "Lebanese shawarma", "Liquids", "Lite bites", "Lite pizza", "Little italy", "Live saute pasta", "Lobster", "Lobster And Prawn", "Local chicken", "Lounge special set menu", "Lunch and dinner", "Lunch box", "Lunch Box", "Lunch combination", "Lunch combo", "Lunch express", "Lunch menu", "Lunch set menu for single person", "Lunch special only", "Luxury bento box", "Mach", "Machismo tacosenchiladas", "Mahi Murgh Aur Gosht Ki Mehfil", "Main", "Main course", "Main courses (with any 3 side dish or item)", "Main dish", "Main dishes", "Main DishesThai", "Main Dishs SZE CHUAN Dishes", "Mains", "Make it a combo", "Make your own khaoswe", "Make your own pasta", "Maki", "Mangsho", "Marble creations", "Meal", "Meal Special", "Meals", "Meat", "Meat and poultry", "Meat/fish", "Mega platter", "Menu item", "Mexican", "Mexican food", "Mexican items", "Mexican Items", "Mexican speciales", "Mexican speciales continued", "Mexican Style", "Mexican sub sandwich", "Mezbani cuisine", "Mineral water", "Mixed grilled platter", "Mixed platter", "Mixed sushi box and potato rosti 1 pc", "Mojito", "Momo", "Mongolian grill", "More", "More fishes", "Muffin and dry cakes", "Mutton", "Mutton  Indian Cuisine", "Mutton curry", "Mutton Dishes", "Mutton dishes", "Mutton gravy", "Mutton kabab", "Muttonindian", "Naan", "Naan and parata", "Naan and rice", "Naan or parata", "Naan or parata item", "Naan or paratha", "Naan or roti", "Naan or roti or parata", "Naan or ruti", "Naan or shawarma or paratha", "Naan paratha and roti", "Naan selection", "Naans And Paratha", "Nachos", "Nan", "Nan n parathas", "Nan or breadindian", "New food", "Nigiri or sashimi", "Non coffee based koolers", "Non coffee extraction", "Non vegetarian", "Non vegeterian", "NonVegetarian Kababs", "Noodle", "Noodles", "Noodles and dumpling", "Noodles Chop Sey", "Noodles or chowmien", "Noodles or rice", "Noodleschinese", "Noodlesthai", "On hot iron", "Only for lunch", "Organic tea", "Oriental delights", "Original italian oven fresh pizza", "Original italian wood fried oven fresh pizza", "Other", "Other dessert", "Others", "Our burgers", "Our kebab selection", "Our special", "Our special dishes", "Our variety s[ecial", "Oven baked pasta", "Oven fresh arabian pasta", "Oven fresh pizza and arabian shawarma", "Package", "Package menu", "Paneer", "Paneer and vegetable dishes", "Paneer Dishes", "Papad", "Parata", "Paratha", "Party Menu", "Party menu (pre order onlyminimum 10 person)", "Party package", "Pasta", "Pasta and chowmein", "Pasta and mains", "Pasta and spaghetti", "Pasta gallery", "Pasta item", "Pasta meal", "Pasta plus", "Pasta/spaghetti", "Pastry", "Pastry item ( up on availability)", "Pastry slice", "Patisseries", "Patties", "Peri peri chicken", "Peri tiffin", "Personal pizzas", "Pie", "Pita bread combo pakage", "Pizza", "Pizza  Beef", "Pizza  Chicken", "Pizza  Mixed", "Pizza  Vegetable", "Pizza (buy 1 get 1)", "Pizza and pasta", "Pizza ans pasta", "Pizza bar", "Pizza guy special", "Pizza item", "Pizza oilos recomandation", "Pizza on roll", "Pizza or sandwich", "Pizza roll", "Pizza Roll", "Pizza sandwich", "Pizza snacks", "Plato principal", "Platter", "Platter and combo", "Platters", "Poultry", "Poultry dishes", "Poutine", "Prawn", "Prawn and fish", "Prawn curry", "Prawn Dishes", "Prawn dishes", "Prawn entrees", "Prawn or fish", "Prawn or fishchinese", "Prawn or shrimp", "Premium rolls", "PulaoBiriyani And Rice", "Quesadilla", "Quesadillas Fried Chicken", "Quesadillas Pizza", "Quick bite", "Quick eats", "Quick meal", "Quick menu", "Quick set lunch", "Raita", "Refreshment", "Regular burger", "Regular menu", "Rice", "Rice and  noodles and paratha", "Rice and biriyani", "Rice and noodles", "Rice and pasta", "Rice and vegetable", "Rice bowls", "Rice bread dal", "Rice item", "Rice items", "Rice or bread gallery", "Rice or chowmein  chinese or thai items", "Rice or noodles", "Rice or pasta", "Rice or polaw or biriyaniindian", "Rice polao and biriyani", "Rice set menus", "Rice, bread and accompaniments", "Ricechinese", "Ricethai", "Risotto", "Roll", "Roll n roll", "Roll over roll", "Roll shawarma", "Roll sushi", "Rolls", "Rollsbuy 2 get 1 free", "Roti", "Roti items", "Rotiyon Ki Dawat", "Ruti", "Safa food menu", "Salad", "Salad and soup", "Salad and veggies", "Salad bar", "Salad gallery", "Salad item", "Salad items", "Salad or raita", "Salad sandwich", "Salad selection", "Saladchinese", "Saladindian", "Salads", "salads", "Salads or appetizer", "Saltz mocktails", "Saltz pasta and pizza", "Saltzy sensations lobster", "Samaosa singara and chop", "Samosa singara and chop", "Samurai rolls", "Sancks", "Sandwich", "Sandwich 12 inch", "Sandwich 6 inch", "Sandwich and burger", "Sandwich Items", "Sandwich lovers", "Sandwich serves with fries", "Sandwich/burger", "Sandwiches", "Sandwiches and panini", "Sandwiches and paninis", "Sandwiches and savories", "Sandwiches and wraps", "Sandwichs", "Sauces", "Savories", "Savory", "Savory crepes", "Savory delights", "Savoury crepes", "Savoury starters", "Sea fish", "Sea food", "Sea Food", "Sea food  chinese or thai items", "Sea Food Items", "Sea food platter", "Seafood", "Seafood gallery", "Seafood soup", "Seafood specialties", "Seasonal soup", "Selection of seafood", "Served only on advance order", "Set for four", "Set for two", "Set lunch", "Set lunch menu", "Set LunchChinese", "Set LunchIndian", "Set meal", "Set meal served with steamed rice", "Set meals", "Set menu", "Set Menu", "Set menu 1 plus", "Set menu for lunch", "Set menu for lunch only", "Sfc dessert and pasta item", "Sfc extra menu", "Sfc french fries and burger", "Sfc fried chicken and broast", "Sfc indian food", "Sfc noodles and sandwich", "Sfc rice item and curry item", "Sfc rice set", "Sfc salad", "Sfc soup", "Sfc tandoori special", "ShababEShorba", "Shak or bhaji", "Shakbharta", "Share platters", "Share set menu", "Shared mains", "Shared rice dishes", "Sharing platters", "Shawarma", "Shawarma bread", "Shawarma plate", "Shawarma roll", "Shawarma special italian oven baked", "Shawarma wrap", "Shawarma Wrap", "Shawarma wraps", "SheerEZannat", "Shrimp", "Shrimp or prawn", "Sichuan special", "Sicilian crust", "Side", "Side and accompaniment", "Side dish", "Side dishes", "Side kicks", "Side line", "Side menu", "Side order", "Side Order", "Side order or add ons", "Side orders", "Side Orders", "Sides", "Sides and snacks", "Signature", "Signature creations", "Signature dishes", "Single burger", "Single flavor creations", "Single platters", "Single set menu", "Sizzlers", "Sizzling", "Sizzling steak", "Sliced cakes", "Slider and burger", "Smoked beef", "Smoked chicken n pepper", "Smoothe", "Smooties and shakes", "Snacks", "Snacks and appetizer", "Snax and crax", "Sobzi", "Soft drinks", "Souce items", "Soup", "Soup  chinese or thai items", "Soup and broth", "Soup and salad", "Soup Chinese", "Soup gallery", "Soup in a breadbowl", "Soup item", "Soup items", "Soup of the day", "Soup rice items", "Soup salad", "Soup selection", "Soupchinese", "Soups", "Soups and salads", "Soupthai", "Spaghetti or noodles", "Spanish tapas", "Special", "Special attraction", "Special attraction by order", "Special biriyani and khichuri", "Special burgers", "Special Chicken", "Special combo menu", "Special cuisine", "Special dish", "Special Dish", "Special grilledby charcoalindian", "Special lunch box", "Special Lunch Menu", "Special lunch or dinner minimum order 2 person", "Special lunch set menu", "Special Order", "Special package menu", "Special pizza", "Special platterdinner packages", "Special salad", "Special set menu", "Special set menu lunch", "Specialities", "Specials", "Specialty ice blended koolers", "Spicy fried and crispy", "Spicy sefie chicken", "Splash", "Squid", "Squid or cuttle fish", "Starter", "Starters", "Starters  soup and salad", "StartersChinese", "Steak", "Steak (serves with creamy mash potato and saute vegies)", "Steak and grill", "Steak and grilled", "Steak and seafood", "Steak items", "Steak on fire", "Steak with mashed potato and saute veggies", "Steaks", "Steaks and grills", "Steaks and ribs", "Stir fried", "Stir fry", "Stuffed crust", "Sub and sandwich", "Sub sandwiches", "Submarine", "Submarine Sandwich", "Subz Bahar", "Super supreme pizzas", "Supreme pizza", "Surf and turf", "Sushi", "Sushi sashimi and makirolls", "Sweet", "Sweet crepes", "Sweet fiesta", "Sweet indulgence", "Sweet tooth", "Sweets", "Taco", "Tandoor dishes", "Tandoori", "Tandoori and kebab", "Tandoori and Kebab", "Tandoori and kebabs", "Tandoori chicken", "Tandoori from our clay oven", "Tandoori kabab", "Tandoori kabab and beef", "Tandoori kababs", "Tandoori Kebab", "Tandoori n kabab", "Tandoori ovenindian", "Tapas", "tart and eclairs", "Tart and eclairs", "Tarts", "Tasty fillers", "Tawa kabab", "Tawa kababs", "Tawa or gravy or kahrai", "Tawa platters", "Tea", "Teasers", "Teasers and sides", "Teasers or sides", "Teppanyaki", "Teriyaki", "Thai", "Thai and chinese", "Thai and chinese gallery", "Thai appetizer", "Thai appetizers", "Thai beef", "thai beef selection", "Thai chicken", "Thai chicken selection", "Thai crab", "Thai cuisine appetizer", "Thai curry", "Thai Dishes Soup", "Thai duck", "Thai fish", "Thai fish selection", "Thai flaming", "Thai flaming selection", "Thai food appetizer", "Thai fried rice and noodles", "Thai king prawn", "Thai meal", "Thai noodles", "Thai or chinese cuisine", "Thai package menu", "Thai prawn", "Thai prawn selection", "Thai prawns", "Thai rice", "Thai rice and noodles", "Thai rice noodles selection", "Thai salad", "Thai sea food or prawn", "Thai sizzling", "thai sizzling selection", "Thai soup", "Thai starter", "Thai vegetable", "Thai vegetable selection", "ThaiBeef", "ThaiBeef Dishes", "ThaiChicken", "ThaiChicken Dishes", "ThaiChowmein", "ThaiFish", "ThaiFried Rice", "ThaiHot Appetizers", "ThaiNoodles", "ThaiPrawn", "ThaiPrawn Dishes", "ThaiRice", "ThaiSalad", "ThaiSeafood", "ThaiSoup", "ThaiVegetable", "ThaiVegetable Dishes", "The new yorker special", "The sweet ending", "The wonder meal", "Tmnt pizza", "Toast", "Today&039;s lunch box", "Traditional", "Traditional espresso extraction", "Treasures from the underworld", "Triangle signature meals", "Try someting new", "Tummyteaser", "Twist burgers", "Twist chowmein", "Twist shakes", "Twist snacks", "Udon and ramen", "Uttapam", "Value meals", "Veg appatizer", "Veg delights", "Veg salad", "Veg soup", "Vegan and vegetarian rolls", "Vegetable", "Vegetable  chinese or thai items", "Vegetable  Indian Cuisine", "Vegetable burger", "Vegetable curry", "Vegetable Dishes", "Vegetable dishes", "Vegetable gravy", "Vegetablechinese", "Vegetableindian", "Vegetables", "Vegetablethai", "Vegetarian", "Vegetarian dishes", "Vegetarian Kababs", "Vegetarian specials", "Vegeterian", "Veggies", "Vorta or shak or vegetable", "Vorta vaat", "Waffels crepes", "Waffle addict", "Waffle addict items", "Waffle and crepes", "Whats new", "Whole cake", "Whole cakes", "Wings", "Wrap", "Wrap roll", "Wraps and rolls", "Yogurt Specialities"
        ]
    }
}