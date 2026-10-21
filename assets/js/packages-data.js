/**
 * ZORRO HOLIDAYS - Central Tour Packages Data
 * Editable, reusable data structure for Domestic and International Packages.
 * 
 * Note for Client:
 * To update any destination, price, itinerary, or food plan, simply edit
 * the respective object below. No HTML modification is required!
 */

const TOUR_PACKAGES = {
  domestic: [
    {
      id: "ooty",
      name: "Ooty",
      title: "Ooty - Queen of Nilgiris Hill Station",
      tagline: "Rolling tea gardens, misty toy train & heritage eucalyptus groves",
      category: "domestic",
      duration: "3 Days / 2 Nights",
      pricing: "Request a Quote",
      pricingNote: "Customised private quotes based on group size and vehicle choice",
      image: "assets/images/destinations/ooty.jpg",
      featured: true,
      badge: "Popular Hill Station",
      overview: "Nestled in the Nilgiri Hills at 2,240m altitude, Ooty is the quintessential mountain getaway from Coimbatore. Experience crisp highland air, endless tea plantations, heritage botanical gardens, and the famous Nilgiri Mountain Railway.",
      sightseeing: [
        "Government Botanical Garden & Rose Garden",
        "Ooty Lake & Boathouse",
        "Doddabetta Peak (Highest point in Nilgiris)",
        "Pykara Lake, Waterfalls & Speedboat rides",
        "Tea Factory & Tea Museum",
        "Shooting Point (Wenlock Downs)"
      ],
      photoSpots: [
        "Doddabetta Viewpoint telescope tower with panoramic valley vistas",
        "Pykara Lake boat dock with pine forest backdrop",
        "Wenlock Downs 9th Mile green rolling meadows",
        "Nilgiri Heritage Toy Train crossing arch stone bridges"
      ],
      itinerary: [
        {
          day: 1,
          title: "Coimbatore to Ooty & Scenic Ghat Road Ascent",
          desc: "Morning pickup from Coimbatore in your private AC taxi. Scenic mountain drive via Mettupalayam and Coonoor ghat road. Check-in at hotel, visit Ooty Lake, Rose Garden, and evening leisure stroll at Charring Cross."
        },
        {
          day: 2,
          title: "Doddabetta Peak & Pykara Excursion",
          desc: "Early breakfast. Visit Doddabetta Peak for sweeping valley views, explore the Tea Factory to sample fresh Nilgiri tea, followed by Pykara Waterfalls and boating at Pykara Lake."
        },
        {
          day: 3,
          title: "Botanical Garden & Return to Coimbatore",
          desc: "Explore the expansive Government Botanical Garden with 1,000+ exotic floral species. Enjoy scenic shopping for homemade chocolates and eucalyptus oils. Relaxed descent and drop-off in Coimbatore."
        }
      ],
      foodInclusions: "Complimentary breakfast at hotel. Authentic Nilgiri tea tasting included during tea estate visit. Lunch and dinner stops curated at verified local restaurants (cost on direct payment or all-inclusive quote).",
      accommodation: "2 Nights handpicked 3-Star or 4-Star mountain view resort (options customized on quote).",
      transport: "Private sanitized AC sedan or SUV from Coimbatore with experienced mountain-route chauffeur, including all toll, parking, and driver allowances.",
      inclusions: [
        "Private AC cab for entire duration (Coimbatore to Ooty & return)",
        "2 Nights accommodation with daily breakfast",
        "Dedicated professional hill-driver with local sightseeing expertise",
        "Fuel, toll fees, parking permits, and driver bata",
        "Pickup and drop at Coimbatore airport, railway station, or home"
      ],
      exclusions: [
        "Monument, garden, and boat ride entry tickets",
        "Lunches and dinners (unless specified in custom quote)",
        "Personal expenses, shopping, and guide tips",
        "Anything not mentioned in confirmed inclusions"
      ]
    },
    {
      id: "munnar",
      name: "Munnar",
      title: "Munnar - Emerald Tea Valleys & Waterfalls",
      tagline: "Cascading falls, misty Western Ghats peaks & spice gardens",
      category: "domestic",
      duration: "3 Days / 2 Nights",
      pricing: "Request a Quote",
      pricingNote: "Transparent quotes with hotel & private taxi options",
      image: "assets/images/destinations/munnar.jpg",
      featured: true,
      badge: "Best Seller",
      overview: "Located in the heart of God's Own Country, Munnar is famous for its sprawling carpet of tea plantations, cool misty climate, colonial-era bungalows, and sanctuary of the rare Nilgiri Tahr.",
      sightseeing: [
        "Mattupetty Dam & Eco Point (echo phenomenon)",
        "Eravikulam National Park (Home of Nilgiri Tahr)",
        "Kundala Lake & Shikara boating",
        "Cheeyappara & Valara Waterfalls",
        "Tata Tea Museum & live processing demonstration",
        "Blossom International Park & Spice Plantation walk"
      ],
      photoSpots: [
        "Photo Point surrounded by manicured emerald tea bushes",
        "Mattupetty Lake with reflections of surrounding Anamudi hills",
        "Kundala Arch Dam with vintage pedal and row boats",
        "Cheeyappara cascading multi-tier waterfall"
      ],
      itinerary: [
        {
          day: 1,
          title: "Coimbatore to Munnar via Udumalpet Ghats",
          desc: "Prompt morning departure from Coimbatore. Drive past Marayoor sandalwood forests and Chinnar sanctuary. Arrive in Munnar, visit spice plantations, check into resort, and relax amidst misty hills."
        },
        {
          day: 2,
          title: "Full Day Munnar Sightseeing & Wildlife",
          desc: "Morning excursion to Eravikulam National Park. Afternoon visit to Mattupetty Dam, Echo Point, and Kundala Lake. Visit the Tea Museum for an interactive tea-crafting tour."
        },
        {
          day: 3,
          title: "Waterfalls & Return Journey to Coimbatore",
          desc: "Visit Blossom Hydel Park and capture morning photography at Top Station view. Relaxed afternoon drive back down to Coimbatore with drop-off at your preferred location."
        }
      ],
      foodInclusions: "Daily buffet breakfast at resort. Welcome Kerala herbal drink upon arrival. Curated halts at hygienic restaurants for authentic Malabar and vegetarian South Indian thalis.",
      accommodation: "2 Nights in premium hill-facing room with private balcony.",
      transport: "Dedicated private cab (Sedan / Innova SUV) with hill-certified chauffeur.",
      inclusions: [
        "Dedicated private roundtrip taxi from Coimbatore",
        "2 Nights deluxe resort stay with morning breakfast",
        "Sightseeing as per itinerary without rushed schedules",
        "Tolls, state road taxes, interstate permits, and driver allowance",
        "Coimbatore doorstep or airport pickup & drop"
      ],
      exclusions: [
        "Eravikulam forest safari ticket & dam boat rides",
        "Lunch, dinner, and personal treats",
        "Optional Ayurvedic massage or Kathakali dance shows"
      ]
    },
    {
      id: "kodaikanal",
      name: "Kodaikanal",
      title: "Kodaikanal - The Princess of Hill Stations",
      tagline: "Misty pine forests, star-shaped lake & dramatic cliff viewpoints",
      category: "domestic",
      duration: "3 Days / 2 Nights",
      pricing: "Request a Quote",
      pricingNote: "Personalised packages tailored to your schedule",
      image: "assets/images/destinations/kodaikanal.jpg",
      featured: true,
      badge: "Romantic Escape",
      overview: "Perched high in the Palani Hills, Kodaikanal charms visitors with its tranquil star-shaped lake, fragrant pine groves, granite cliff viewpoints, and refreshing year-round cool breeze.",
      sightseeing: [
        "Kodaikanal Lake & Coaker's Walk",
        "Pillar Rocks (three giant vertical rock boulders)",
        "Guna Caves (Devil's Kitchen)",
        "Bryant Park botanical conservatory",
        "Silver Cascade Waterfall",
        "Pine Forest & Dolphin's Nose viewpoint"
      ],
      photoSpots: [
        "Coaker's Walk cloudy cliffside pathway overlooking the plains",
        "Pillar Rocks natural dramatic viewpoint through rising clouds",
        "Tall historic Pine Forest with canopy sunbeams",
        "Kodaikanal Lake promenade at twilight"
      ],
      itinerary: [
        {
          day: 1,
          title: "Coimbatore to Kodaikanal via Dharapuram & Palani",
          desc: "Morning pickup from Coimbatore. Stop by Silver Cascade waterfall during the ascent. Check in to your hotel, followed by an evening bicycle ride or boating on Kodai Lake and scenic walk on Coaker's Walk."
        },
        {
          day: 2,
          title: "Nature Wonders: Pillar Rocks, Pine Forest & Guna Caves",
          desc: "Full day sightseeing: discover the majestic Pillar Rocks, take unforgettable photos in the dense Pine Forest, view Guna Caves, and relax in the manicured gardens of Bryant Park."
        },
        {
          day: 3,
          title: "Dolphin's Nose & Return Drive to Coimbatore",
          desc: "Morning trek or view at Dolphin's Nose and Upper Lake View. Afternoon departure back to Coimbatore with memories of misty mountain pine trails."
        }
      ],
      foodInclusions: "Daily hot buffet breakfast included at hotel. Recommendations for famous Kodai homemade chocolate boutiques and wood-fired cafes.",
      accommodation: "2 Nights in tranquil hillside resort or heritage cottage.",
      transport: "Private AC vehicle with expert ghat-road driver.",
      inclusions: [
        "All transfers and local sightseeing in private AC cab",
        "2 Nights resort stay with breakfast",
        "Driver fees, fuel, tolls, and parking charges",
        "Coimbatore doorstep pickup and drop"
      ],
      exclusions: [
        "Lake boating and park entrance passes",
        "Lunch and dinner meals",
        "Personal shopping and souvenirs"
      ]
    },
    {
      id: "kolli-hills",
      name: "Kolli Hills",
      title: "Kolli Hills - The Mountain of 70 Hairpin Bends",
      tagline: "Serpentine thrills, medicinal herbs & the roaring Agaya Gangai waterfall",
      category: "domestic",
      duration: "2 Days / 1 Night",
      pricing: "Request a Quote",
      pricingNote: "Ideal weekend getaway from Coimbatore",
      image: "assets/images/destinations/kolli-hills.jpg",
      featured: false,
      badge: "Adventure & Nature",
      overview: "Known as 'Kolli Malai', this untouched mountain paradise features 70 continuous hairpin bends, medicinal herbal air, pepper and coffee plantations, and the dramatic 300-foot Agaya Gangai waterfall.",
      sightseeing: [
        "70 Hairpin Bends thrilling drive & viewpoint",
        "Agaya Gangai Waterfalls (Aiyaru river)",
        "Arapaleeswarar Ancient Shiva Temple",
        "Seekuparai & Selur Viewpoints",
        "Masila Falls & Herbal Botanical Garden",
        "Solakkadu Spice & Mountain Pepper Market"
      ],
      photoSpots: [
        "Hairpin bend vista point capturing the serpentine curves below",
        "Agaya Gangai waterfall base with misty spray and rocky cliffs",
        "Seekuparai watchtower overlooking deep forest valleys",
        "Solakkadu organic spice gardens and fruit orchards"
      ],
      itinerary: [
        {
          day: 1,
          title: "Coimbatore to Kolli Hills Ascent & Agaya Gangai",
          desc: "Early morning pickup from Coimbatore via Salem highway. Experience the legendary 70 hairpin bends. Visit Arapaleeswarar Temple and trek down to Agaya Gangai waterfalls. Check-in and evening bonfire (subject to weather)."
        },
        {
          day: 2,
          title: "Viewpoints, Spice Gardens & Return to Coimbatore",
          desc: "Morning sunrise at Seekuparai viewpoint. Visit Masila Falls and herbal farms. Purchase authentic wild mountain honey and farm-fresh pepper. Scenic descent and evening drop in Coimbatore."
        }
      ],
      foodInclusions: "Breakfast included at resort. Traditional South Indian country-style fresh dining stops.",
      accommodation: "1 Night comfortable eco-resort or valley-facing stay.",
      transport: "High-clearance private vehicle with expert ghat road driver.",
      inclusions: [
        "Coimbatore roundtrip in sanitized private vehicle",
        "1 Night accommodation with breakfast",
        "All ghat tolls, permits, driver allowances",
        "Full local sightseeing"
      ],
      exclusions: [
        "Entry fees to viewpoints and falls",
        "Lunch, dinner, and personal expenses"
      ]
    },
    {
      id: "vagamon",
      name: "Vagamon",
      title: "Vagamon - Serene Pine Meadows & Misty Glens",
      tagline: "Peaceful valleys, kurisumala hills & undisturbed natural tranquility",
      category: "domestic",
      duration: "3 Days / 2 Nights",
      pricing: "Request a Quote",
      pricingNote: "Custom group and family packages available",
      image: "assets/images/destinations/vagamon.jpg",
      featured: false,
      badge: "Hidden Gem",
      overview: "Often hailed as the 'Scotland of Asia', Vagamon is an idyllic hill station untouched by commercialization. Rolling velvety green pine meadows, mist-covered valleys, and tea plantations make it an oasis of serenity.",
      sightseeing: [
        "Vagamon Pine Forest",
        "Vagamon Green Meadows (Motta Kunnukal)",
        "Kurisumala Ashram & Dairy Farm",
        "Vagamon Lake & Boating",
        "Marmala Waterfalls",
        "Thangal Para & Murugan Mala viewpoint"
      ],
      photoSpots: [
        "Tall towering pine forest pathway with soft sunbeams",
        "Velvet green rounded meadows with infinite sky backdrop",
        "Marmala natural waterfall pool surrounded by rocks",
        "Vagamon lake bridge at sunset"
      ],
      itinerary: [
        {
          day: 1,
          title: "Coimbatore to Vagamon via Pollachi & Idukki",
          desc: "Scenic journey through picturesque Kerala rural landscapes. Check into your tranquil nature resort. Evening walk through the legendary Vagamon Pine Forest."
        },
        {
          day: 2,
          title: "Green Meadows, Marmala Falls & Boating",
          desc: "Explore the boundless Green Meadows, visit the serene Kurisumala Ashram, take a boat ride on Vagamon Lake, and marvel at the hidden Marmala Waterfalls."
        },
        {
          day: 3,
          title: "Murugan Mala Viewpoint & Return to Coimbatore",
          desc: "Enjoy breakfast overlooking the mist. Visit scenic tea gardens and viewpoint before a relaxed drive back to Coimbatore with evening drop."
        }
      ],
      foodInclusions: "Daily fresh breakfast included. Traditional Kerala sadhya stops on request.",
      accommodation: "2 Nights in tranquil eco-resort or plantation villa.",
      transport: "Private sanitized AC taxi from Coimbatore.",
      inclusions: [
        "Private AC cab for full 3-day circuit",
        "2 Nights resort stay with morning breakfast",
        "Interstate permits, road tolls, and driver fees",
        "Coimbatore pickup and return"
      ],
      exclusions: [
        "Boating tickets & optional off-road jeep rides",
        "Meals outside breakfast"
      ]
    },
    {
      id: "temple-tours",
      name: "Temple Tours",
      title: "Divine South Indian Temple Pilgrimage",
      tagline: "Sacred architecture, divine darshans & thousand-year Dravidian heritage",
      category: "domestic",
      duration: "4 Days / 3 Nights",
      pricing: "Request a Quote",
      pricingNote: "Specialised senior-citizen and family friendly pace",
      image: "assets/images/destinations/temple-tours.jpg",
      featured: true,
      badge: "Spiritual Heritage",
      overview: "Experience profound spiritual peace and admire magnificent Dravidian temple architecture. Our temple packages cover sacred shrines across Tamil Nadu including Palani Murugan Temple, Madurai Meenakshi Amman, Rameswaram Ramanathaswamy, and Thanjavur Brihadisvara.",
      sightseeing: [
        "Palani Dhandayuthapani Swamy Temple",
        "Madurai Meenakshi Amman Temple & Nayakar Mahal",
        "Rameswaram Ramanathaswamy Temple & 22 Theerthams",
        "Dhanushkodi Ghost Town & Ram Setu viewpoint",
        "Thanjavur Brihadisvara Great Living Chola Temple (UNESCO)",
        "Trichy Srirangam Ranganathaswamy Temple"
      ],
      photoSpots: [
        "Soaring sculptured towers (Gopurams) of Madurai Meenakshi",
        "Thanjavur Big Temple golden granite vimana at sunset",
        "Rameswaram third corridor (longest pillared hall in the world)",
        "Dhanushkodi meeting point of Bay of Bengal and Indian Ocean"
      ],
      itinerary: [
        {
          day: 1,
          title: "Coimbatore to Palani Darshan & Madurai",
          desc: "Early departure from Coimbatore. Special darshan at Palani Dhandayuthapani Temple (winch/rope-car assistance). Drive to Madurai, check in, and evening visit to the majestic Meenakshi Amman Temple."
        },
        {
          day: 2,
          title: "Madurai to Sacred Rameswaram & 22 Theerthams",
          desc: "Morning pooja at Madurai. Drive to Rameswaram over the historic Pamban Bridge. Sacred bath in the 22 holy water wells (theerthams) and Ramanathaswamy Temple darshan."
        },
        {
          day: 3,
          title: "Dhanushkodi & Thanjavur Chola Marvels",
          desc: "Early visit to Dhanushkodi and Ram Setu viewpoint. Drive towards Thanjavur. Marvel at the 1,000-year-old architectural wonder Brihadisvara Temple under floodlights."
        },
        {
          day: 4,
          title: "Srirangam Darshan & Return to Coimbatore",
          desc: "Morning darshan at Srirangam Ranganathaswamy Temple. Smooth drive back to Coimbatore with comfortable evening drop at your doorstep."
        }
      ],
      foodInclusions: "Pure vegetarian South Indian breakfast included daily. Chauffeur guides to the finest authentic traditional vegetarian messes and temple prasadams.",
      accommodation: "3 Nights comfortable 3-star AC hotel stays situated close to temple complexes.",
      transport: "Spacious private AC Sedan, Innova Crysta, or Tempo Traveller for comfortable family & senior pilgrim travel.",
      inclusions: [
        "Doorstep pickup & drop from Coimbatore in private vehicle",
        "3 Nights AC accommodation with breakfast",
        "Patient, experienced drivers accustomed to temple darshan schedules",
        "All toll, parking, inter-district road permits, and driver bata"
      ],
      exclusions: [
        "Special quick-darshan temple tickets and pooja items",
        "Lunch and dinner meals",
        "Rope-car / battery vehicle charges"
      ]
    },
    {
      id: "honeymoon-tours",
      name: "Honeymoon Tours",
      title: "Romantic Luxury Honeymoon Retreat",
      tagline: "Private candlelight dinners, floral suites & misty mountain vistas",
      category: "domestic",
      duration: "4 Days / 3 Nights",
      pricing: "Request a Quote",
      pricingNote: "Customised luxury inclusions and romantic setups",
      image: "assets/images/destinations/honeymoon-tours.jpg",
      featured: true,
      badge: "Romantic Luxury",
      overview: "Begin your life's greatest adventure with an enchanting honeymoon curated by Zorro Holidays. Enjoy private valley-facing luxury villas, romantic candlelight dining under starry skies, floral bed decoration, and private scenic drives through mist-clad Western Ghats.",
      sightseeing: [
        "Private panoramic viewpoints away from crowded tourist spots",
        "Sunset lake cruises with personalized touches",
        "Lush tea garden strolls with couple photo sessions",
        "Couples Ayurvedic spa & rejuvenation sessions (optional)",
        "Cozy mountain viewpoints with evening bonfire"
      ],
      photoSpots: [
        "Private candlelit dinner balcony with sweeping mountain backdrop",
        "Emerald tea plantation trails during golden morning light",
        "Private infinity pool overlooking floating clouds",
        "Scenic misty lake docks at dusk"
      ],
      itinerary: [
        {
          day: 1,
          title: "Coimbatore to Luxury Mountain Resort",
          desc: "Warm luxury pickup from Coimbatore in a polished private sedan. Scenic hill ascent to your 4-star honeymoon resort. Romantic floral welcome, welcome cake, and intimate private candlelit dinner."
        },
        {
          day: 2,
          title: "Scenic Couple Excursions & Private Boating",
          desc: "Relaxed champagne/tea breakfast on your private balcony. Private boat ride on serene mountain waters, scenic viewpoints, and peaceful walk through aromatic spice and tea estates."
        },
        {
          day: 3,
          title: "Spa Wellness, Sunsets & Bonfire",
          desc: "Optional morning couples rejuvenation session. Afternoon visit to secluded scenic overlooks and waterfalls. Cozy evening bonfire under the stars."
        },
        {
          day: 4,
          title: "Memories to Cherish & Return Journey",
          desc: "Leisurely morning with gourmet breakfast. Commemorative gift hamper from Zorro Holidays and smooth private drive back to Coimbatore."
        }
      ],
      foodInclusions: "Daily gourmet breakfast included. 1 Exclusive romantic Candlelight Dinner with floral table setup and custom cake included in package.",
      accommodation: "3 Nights luxury valley-view honeymoon suite with floral bed decoration.",
      transport: "Dedicated premium private AC sedan with courteous, discreet chauffeur.",
      inclusions: [
        "Exclusive private AC vehicle throughout the tour",
        "3 Nights luxury resort accommodation",
        "Daily breakfast & 1 Special Candlelight Dinner",
        "Honeymoon cake & romantic room decoration",
        "All tolls, parking fees, and driver allowances"
      ],
      exclusions: [
        "Spa treatments and optional adventure rides",
        "Meals other than specified above"
      ]
    }
  ],

  international: [
    {
      id: "singapore",
      name: "Singapore",
      title: "Singapore - Futuristic Metropolis & Sentosa Island",
      tagline: "Gardens by the Bay, Marina Bay Sands, Universal Studios & world-class dining",
      category: "international",
      duration: "4 Days / 3 Nights",
      pricing: "Request a Quote",
      pricingNote: "Custom flights, visa assistance, and luxury hotel packages",
      image: "assets/images/destinations/singapore.jpg",
      featured: true,
      badge: "Top International",
      overview: "Experience the glittering marvel of Southeast Asia. Singapore offers futuristic architecture, world-renowned botanical spectacles at Gardens by the Bay, thrilling island adventures on Sentosa, and vibrant multicultural shopping.",
      sightseeing: [
        "Marina Bay Sands SkyPark Observation Deck",
        "Gardens by the Bay (Cloud Forest, Flower Dome & Supertree Grove)",
        "Sentosa Island (Cable car ride, Wings of Time show)",
        "Universal Studios Singapore theme park",
        "Singapore River Cruise & Merlion Park",
        "Orchard Road & Jewel Changi Rain Vortex"
      ],
      photoSpots: [
        "Supertree Grove illuminated during the nightly Garden Rhapsody",
        "Merlion Park with iconic water spout and Marina Bay Sands backdrop",
        "Cloud Forest 35m indoor waterfall",
        "Sentosa Siloso Beach sunset"
      ],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Singapore & Night Marina Bay Cruise",
          desc: "Arrive at Changi Airport. Meet our airport representative, transfer to hotel. Evening Singapore River cruise and light show at Marina Bay."
        },
        {
          day: 2,
          title: "Gardens by the Bay & City Highlights",
          desc: "Full day exploring the Flower Dome, Cloud Forest, and evening light show at Supertrees. Stroll through vibrant Little India and Chinatown."
        },
        {
          day: 3,
          title: "Sentosa Island Wonders & Cable Car",
          desc: "Cable car ride into Sentosa Island. Enjoy Madame Tussauds, S.E.A. Aquarium, and the dazzling Wings of Time fireworks show."
        },
        {
          day: 4,
          title: "Jewel Changi Vortex & Departure",
          desc: "Visit the world's tallest indoor waterfall at Jewel Changi, duty-free shopping, and flight departure."
        }
      ],
      foodInclusions: "Daily international buffet breakfast at hotel. Curated restaurant options including authentic Indian vegetarian/non-vegetarian dining outlets across Singapore.",
      accommodation: "3 Nights 4-Star centrally located hotel (e.g. Orchard / Bugis / Marina area).",
      transport: "Air-conditioned tourist coach / private car airport transfers and sightseeing excursions.",
      travelRequirements: "Valid passport (min 6 months validity), Singapore electronic arrival card (SGAC), tourist visa guidance provided by Zorro Holidays.",
      inclusions: [
        "3 Nights 4-star hotel accommodation with breakfast",
        "Airport pick-up and drop-off transfers",
        "Gardens by the Bay 2-dome entry passes",
        "Sentosa cable car and Wings of Time show tickets",
        "Singapore Tourist Visa processing support"
      ],
      exclusions: [
        "International airfare (available on request quote)",
        "Universal Studios day pass (optional add-on)",
        "Personal expenses and travel insurance"
      ]
    },
    {
      id: "malaysia",
      name: "Malaysia",
      title: "Malaysia - Kuala Lumpur & Genting Highlands",
      tagline: "Petronas Twin Towers, Batu Caves, Genting SkyWorlds & tropical heritage",
      category: "international",
      duration: "4 Days / 3 Nights",
      pricing: "Request a Quote",
      pricingNote: "Visa-free entry available for eligible Indian passport holders",
      image: "assets/images/destinations/malaysia.jpg",
      featured: true,
      badge: "Family Favorite",
      overview: "Malaysia blends modern metropolis energy with rich multicultural roots and cool highland resorts. Stand beneath the gleaming Petronas Towers, climb the 272 colorful steps of Batu Caves, and ride the cable car into the clouds at Genting Highlands.",
      sightseeing: [
        "Petronas Twin Towers & KLCC Park",
        "Batu Caves with giant golden Lord Murugan statue",
        "Genting Highlands & Awana SkyWay Cable Car",
        "Merdeka Square & Sultan Abdul Samad Building",
        "Bukit Bintang shopping and entertainment district",
        "Putrajaya administrative city & pink Putra Mosque"
      ],
      photoSpots: [
        "Petronas Towers photo park at night with illuminated twin spires",
        "Vibrant rainbow steps and Murugan statue at Batu Caves",
        "Awana SkyWay glass-bottom cable car gliding over ancient rainforests",
        "Putrajaya lakeside bridge"
      ],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Kuala Lumpur & City Tour",
          desc: "Meet and greet at KLIA airport. Hotel transfer. Afternoon orientation city tour covering King's Palace, National Monument, and photo stop at Petronas Towers."
        },
        {
          day: 2,
          title: "Batu Caves & Genting Highlands Day Trip",
          desc: "Visit the sacred Batu Caves Murugan temple. Continue to Genting Highlands via Awana SkyWay cable car. Enjoy indoor theme parks, casino, and cool mountain weather."
        },
        {
          day: 3,
          title: "KL Tower & Shopping at Bukit Bintang",
          desc: "Visit KL Tower observation deck. Afternoon shopping at Pavilion KL, Suria KLCC, and street dining at Jalan Alor."
        },
        {
          day: 4,
          title: "Putrajaya Tour & Airport Transfer",
          desc: "En route to airport, tour the futuristic garden city of Putrajaya and majestic pink mosque. Departure flight."
        }
      ],
      foodInclusions: "Daily buffet breakfast at hotel. Indian meal vouchers and restaurant reservations arranged on request.",
      accommodation: "3 Nights in premium 4-Star Kuala Lumpur city hotel.",
      transport: "Private air-conditioned vehicle for transfers and day tours.",
      travelRequirements: "Valid passport with 6 months validity. Malaysia Digital Arrival Card (MDAC) assistance provided.",
      inclusions: [
        "3 Nights hotel accommodation with breakfast",
        "Airport transfers both ways",
        "Genting day tour with return cable car tickets",
        "Half-day Kuala Lumpur city tour with professional driver-guide"
      ],
      exclusions: [
        "International flight tickets",
        "Theme park ride tickets",
        "Tourism tax payable directly at hotel check-in"
      ]
    },
    {
      id: "australia",
      name: "Australia",
      title: "Australia - Sydney Harbour & Gold Coast Coastal Wonders",
      tagline: "Sydney Opera House, Bondi Beach, Blue Mountains & pristine reef wildlife",
      category: "international",
      duration: "7 Days / 6 Nights",
      pricing: "Request a Quote",
      pricingNote: "Comprehensive luxury packages with visa guidance",
      image: "assets/images/destinations/australia.jpg",
      featured: true,
      badge: "World Class",
      overview: "Experience Australia's iconic coastal beauty and world-famous landmarks. From sailing across Sydney Harbour and gazing at the Opera House to exploring the dramatic sandstone cliffs of the Blue Mountains and enjoying sun-kissed beaches on the Gold Coast.",
      sightseeing: [
        "Sydney Opera House & Harbour Bridge",
        "Sydney Harbour Dinner Cruise",
        "Bondi Beach & Coastal Cliff Walk",
        "Blue Mountains, Three Sisters & Scenic World cableway",
        "Gold Coast Surfers Paradise & Currumbin Wildlife Sanctuary",
        "Optional Great Barrier Reef day trip"
      ],
      photoSpots: [
        "Mrs Macquarie's Chair with Sydney Opera House and Bridge together",
        "Bondi Icebergs ocean pool overlooking crashing Pacific waves",
        "Echo Point lookout in Blue Mountains over the Three Sisters",
        "Gold Coast Surfers Paradise beach at sunset"
      ],
      itinerary: [
        {
          day: 1,
          title: "Arrive in Sydney & Darling Harbour",
          desc: "Arrive at Sydney International Airport. Private luxury transfer to your hotel. Evening stroll around Darling Harbour."
        },
        {
          day: 2,
          title: "Sydney Highlights, Bondi & Harbour Cruise",
          desc: "Guided tour of Sydney, Bondi Beach, The Rocks historic precinct, followed by an evening sunset dinner cruise on Sydney Harbour."
        },
        {
          day: 3,
          title: "Blue Mountains & Scenic World Adventure",
          desc: "Full day excursion to the UNESCO Blue Mountains. Ride the steepest passenger railway, explore Jamison Valley, and view the Three Sisters."
        },
        {
          day: 4,
          title: "Fly to Gold Coast & Beachfront Relaxation",
          desc: "Domestic flight to Gold Coast. Check in to beachfront resort. Relax on the pristine sands of Surfers Paradise."
        },
        {
          day: 5,
          title: "Wildlife Encounters & Koala Sanctuary",
          desc: "Visit Currumbin Wildlife Sanctuary to hand-feed kangaroos and see koalas. Afternoon shopping at Pacific Fair."
        },
        {
          day: 6,
          title: "Hinterland Rainforests & Glow Worm Caves",
          desc: "Scenic drive through Tamborine Mountain rainforests and skywalk."
        },
        {
          day: 7,
          title: "Departure from Australia",
          desc: "Breakfast, transfer to Brisbane/Gold Coast airport for your flight home."
        }
      ],
      foodInclusions: "Daily buffet breakfast at luxury hotels. 1 Deluxe Sydney Harbour 3-course dinner cruise included in package.",
      accommodation: "6 Nights in premium 4-Star and 5-Star hotels (Sydney & Gold Coast).",
      transport: "Private airport transfers and luxury coach day excursions.",
      travelRequirements: "Australian tourist visa (Subclass 600) required. Full documentation and application assistance provided by Zorro Holidays.",
      inclusions: [
        "6 Nights luxury accommodation with daily breakfast",
        "Airport and hotel transfers",
        "Sydney Harbour sunset cruise",
        "Blue Mountains full day tour with Scenic World passes",
        "Currumbin Wildlife Sanctuary admission"
      ],
      exclusions: [
        "International and domestic flights",
        "Australian visa fees",
        "Meals outside designated inclusions"
      ]
    },
    {
      id: "bali",
      name: "Bali",
      title: "Bali - Island of the Gods & Ubud Spiritual Haven",
      tagline: "Water temples, volcanic lakes, lush rice terraces & beach clubs",
      category: "international",
      duration: "5 Days / 4 Nights",
      pricing: "Request a Quote",
      pricingNote: "Featured island package with private pool villa options",
      image: "assets/images/destinations/bali.jpg",
      featured: true,
      badge: "Featured Island",
      overview: "Bali holds an extraordinary magnetic charm. Discover majestic water temples floating on volcanic lakes, explore the cultural soul of Ubud surrounded by emerald rice paddies, swing over jungle canopies, and watch fiery sunsets over the Indian Ocean at Uluwatu.",
      sightseeing: [
        "Ulun Danu Beratan Water Temple on Lake Beratan",
        "Ubud Tegalalang Rice Terraces & famous Bali Jungle Swing",
        "Uluwatu Cliff Temple with sunset Kecak Fire Dance",
        "Tanah Lot Sea Temple perched on rocky ocean outcrop",
        "Kintamani Volcano & Batur Lake viewpoint",
        "Nusa Dua and Seminyak beach clubs"
      ],
      photoSpots: [
        "Ulun Danu multi-tiered pagoda reflecting on misty mountain waters",
        "Tegalalang emerald rice terrace curves in early morning light",
        "Handara iconic Balinese stone gate",
        "Uluwatu cliff edge sunset with ocean waves below"
      ],
      itinerary: [
        {
          day: 1,
          title: "Welcome to Bali & South Coast Relaxation",
          desc: "Arrive at Ngurah Rai Airport, Denpasar. Flower garland welcome by our local Balinese representative. Transfer to resort in Kuta/Seminyak."
        },
        {
          day: 2,
          title: "Kintamani Volcano, Coffee Plantation & Tegalalang",
          desc: "Scenic tour to Kintamani overlooking Mount Batur caldera. Visit Luwak coffee plantation and enjoy the Bali swing over Tegalalang rice terraces."
        },
        {
          day: 3,
          title: "Ulun Danu Beratan & Tanah Lot Temple Sunset",
          desc: "Drive to the cool highlands of Bedugul to visit the iconic Ulun Danu Beratan water temple. Afternoon sunset at the breathtaking Tanah Lot ocean temple."
        },
        {
          day: 4,
          title: "Uluwatu Cliff Temple & Kecak Dance",
          desc: "Leisure morning. Afternoon tour to Uluwatu temple perched 70 meters above roaring ocean waves. Experience the dramatic Kecak Fire Dance at sunset."
        },
        {
          day: 5,
          title: "Balinese Souvenir Shopping & Departure",
          desc: "Morning shopping at Krishna Oleh Oleh market for Balinese handicrafts. Private airport transfer for your departure flight."
        }
      ],
      foodInclusions: "Daily buffet breakfast at resort. Indian restaurant stops arranged for lunch and dinner in Kuta and Seminyak.",
      accommodation: "4 Nights in luxury 4-star resort or private pool villa (villa options available on quote).",
      transport: "Private air-conditioned car with English/Hindi-speaking driver for all tours.",
      travelRequirements: "Passport with 6 months validity. Visa on Arrival (VoA) and Indonesian electronic customs declaration support.",
      inclusions: [
        "4 Nights hotel accommodation with daily breakfast",
        "Private AC car throughout for transfers & sightseeing",
        "All temple and attraction entrance tickets as per itinerary",
        "Airport pickup and drop-off"
      ],
      exclusions: [
        "International airfare",
        "Bali Visa on Arrival fee (~$35 USD)",
        "Optional water sports at Tanjung Benoa"
      ]
    },
    {
      id: "thailand",
      name: "Thailand",
      title: "Thailand - Bangkok City & Phuket Island Escape",
      tagline: "Emerald waters of Phi Phi, grand Buddhist temples & vibrant night markets",
      category: "international",
      duration: "5 Days / 4 Nights",
      pricing: "Request a Quote",
      pricingNote: "Visa-free entry available for Indian travelers",
      image: "assets/images/destinations/thailand.jpg",
      featured: true,
      badge: "Tropical Paradise",
      overview: "Thailand brings together the golden grandeur of ancient Buddhist temples with the world's most breathtaking tropical islands. Cruise on a traditional longtail boat through turquoise Phi Phi lagoons, relax on powder-white beaches, and dive into Bangkok's vibrant street markets.",
      sightseeing: [
        "Phi Phi Islands speedboat tour & Maya Bay lagoon",
        "James Bond Island & Phang Nga Bay limestone cliffs",
        "Phuket Big Buddha & Wat Chalong Temple",
        "Bangkok Grand Palace & Wat Arun (Temple of Dawn)",
        "Chao Phraya River luxury dinner cruise",
        "Chatuchak Weekend Market & IconSiam mall"
      ],
      photoSpots: [
        "Phi Phi Leh lagoon turquoise waters framed by limestone cliffs",
        "Wat Arun porcelain spire catching golden evening light across Chao Phraya",
        "Phuket Big Buddha marble statue overlooking Chalong Bay",
        "Maya Bay iconic beach alcove"
      ],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Phuket & Patong Beach",
          desc: "Land in Phuket. Transfer to your beach resort. Evening stroll along Patong Beach and Bangla Road vibrant atmosphere."
        },
        {
          day: 2,
          title: "Phi Phi Islands & Maya Bay by Speedboat",
          desc: "Full day island-hopping speedboat adventure to Phi Phi Don, Phi Phi Leh, Maya Bay, Viking Cave, and snorkeling in crystal clear waters. Buffet lunch on island."
        },
        {
          day: 3,
          title: "Phuket City Tour & Flight to Bangkok",
          desc: "Morning visit to Wat Chalong and Big Buddha. Afternoon short flight to Bangkok. Check into hotel and evening shopping."
        },
        {
          day: 4,
          title: "Bangkok Temples & Chao Phraya Dinner Cruise",
          desc: "Tour Wat Pho (Reclining Buddha) and Wat Arun. Evening luxury international buffet dinner cruise along the illuminated Chao Phraya River."
        },
        {
          day: 5,
          title: "Last Minute Shopping & Departure",
          desc: "Shopping at Pratunam market or MBK center. Transfer to Suvarnabhumi Airport for return flight."
        }
      ],
      foodInclusions: "Daily buffet breakfast at hotels. 1 Buffet lunch on Phi Phi island tour. 1 International buffet dinner on Bangkok Chao Phraya River Cruise.",
      accommodation: "2 Nights in Phuket beach resort + 2 Nights in 4-Star Bangkok city hotel.",
      transport: "Air-conditioned private transfers and shared speedboat excursion.",
      travelRequirements: "Passport with 6 months validity. Visa waiver guidelines provided.",
      inclusions: [
        "4 Nights hotel accommodation with breakfast",
        "Phuket to Bangkok domestic transfer guidance",
        "Full day Phi Phi island tour with speedboat and national park fees",
        "Bangkok Chao Phraya dinner cruise ticket",
        "All airport and sightseeing transfers"
      ],
      exclusions: [
        "International flight tickets",
        "Water sports (parasailing, jet ski)",
        "Personal expenses and porterage"
      ]
    },
    {
      id: "indonesia",
      name: "Indonesia",
      title: "Indonesia - Mount Bromo & Ancient Heritage",
      tagline: "Volcanic sea of clouds, ancient Borobudur temple & pristine islands",
      category: "international",
      duration: "5 Days / 4 Nights",
      pricing: "Request a Quote",
      pricingNote: "Custom adventurous & cultural itineraries",
      image: "assets/images/destinations/indonesia.jpg",
      featured: false,
      badge: "Wonder & Heritage",
      overview: "Beyond Bali, the Indonesian archipelago is home to some of Earth's most dramatic landscapes. Witness the surreal sunrise over Mount Bromo's smoking caldera, explore the 8th-century Borobudur Buddhist stupas, and immerse in Javanese royalty in Yogyakarta.",
      sightseeing: [
        "Mount Bromo 4x4 Jeep Sunrise Tour & Caldera rim trek",
        "Sea of Sand & volcanic smoking crater",
        "Borobudur Temple Compound (UNESCO World Heritage Site)",
        "Prambanan Hindu Temple complex",
        "Yogyakarta Sultan's Palace (Kraton) & Water Castle",
        "Malioboro cultural street & batik markets"
      ],
      photoSpots: [
        "King Kong Hill sunrise overlooking Mount Bromo and Mount Semeru",
        "Ascending the stone stairways to Bromo active crater rim",
        "Borobudur bell-shaped stone stupas with Buddha statues at misty dawn",
        "Prambanan towering temple spires silhouetted against twilight"
      ],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Surabaya & Drive to Mount Bromo Foothills",
          desc: "Arrive at Juanda International Airport, Surabaya. Scenic drive up to the highlands of Tosari / Cemoro Lawang near Mount Bromo. Relax in mountain lodge."
        },
        {
          day: 2,
          title: "Mount Bromo Sunrise & Sea of Sand Jeep Tour",
          desc: "3:00 AM 4WD Jeep departure to Penanjakan viewpoint for an unforgettable sunrise over smoking Mount Bromo. Walk or ride horseback across the Sea of Sand, climb the stairs to the crater rim. Afternoon flight to Yogyakarta."
        },
        {
          day: 3,
          title: "Borobudur Temple Sunrise & Village Tour",
          desc: "Sunrise visit to the magnificent Borobudur temple. Explore peaceful rural Javanese villages and learn traditional pottery and batik making."
        },
        {
          day: 4,
          title: "Prambanan Temples & Sultan's Palace",
          desc: "Visit the towering 9th-century Prambanan Hindu temples, followed by the Sultan's Palace and Taman Sari Water Castle."
        },
        {
          day: 5,
          title: "Cultural Shopping & Airport Departure",
          desc: "Explore Malioboro shopping street for authentic silver crafts and batik. Transfer to Yogyakarta airport for departure flight."
        }
      ],
      foodInclusions: "Daily breakfast at hotels. Authentic Javanese and international dining options curated by our local guides.",
      accommodation: "1 Night mountain lodge near Bromo + 3 Nights 4-Star boutique hotel in Yogyakarta.",
      transport: "Private AC car and dedicated 4x4 Jeep for Mount Bromo.",
      travelRequirements: "Passport with 6 months validity. Visa on Arrival assistance.",
      inclusions: [
        "4 Nights hotel accommodation with breakfast",
        "Private 4WD Jeep for Mount Bromo sunrise tour",
        "Bromo National Park entrance permits",
        "Borobudur and Prambanan temple admission tickets",
        "All airport transfers and private transport"
      ],
      exclusions: [
        "International airfare and domestic flight Surabaya-Yogyakarta",
        "Horse riding fee at Mount Bromo (optional)",
        "Personal expenses and tips"
      ]
    }
  ]
};

// Export to window
if (typeof window !== "undefined") {
  window.TOUR_PACKAGES = TOUR_PACKAGES;
}
