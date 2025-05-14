export const locations = [
  "Lagos",
  "Abuja",
  "Port Harcourt",
  "Ibadan",
  "Kano",
  "Enugu",
  "Benin City",
  "Kaduna",
  "Jos",
  "Abeokuta",
  "Ilorin",
  "Owerri",
  "Makurdi",
  "Akure",
  "Osogbo",
  "Uyo",
  "Calabar",
  "Warri",
  "Asaba",
  "Sokoto",
  "Maiduguri",
  "Yola",
  "Bauchi",
  "Minna",
  "Gombe",
  "Onitsha",
  "Awka",
  "Abakaliki",
  "Lokoja",
  "Katsina",
  "Zaria",
  "Eket",
  "Ado Ekiti",
  "Oshogbo",
  "Umuahia",
  "Jalingo",
  "Birnin Kebbi",
  "Gusau",
  "Damaturu",
  "Dutse",
];

export const services = [
  "Electrical",
  "Plumbing",
  "Carpentry",
  "Painting",
  "Masonry",
  "Tiling",
  "POP/False Ceiling",
  "Welding/Fabrication",
  "Generator Repair",
  "AC Repair",
  "Cleaning",
  "Laundry",
  "Hairdressing",
  "Tailoring",
  "Barbing",
  "Auto Mechanics",
  "Aluminum Works",
  "Furniture Making",
  "Upholstery",
  "Pest Control",
  "Satellite Installation",
  "Refrigerator Repair",
  "Gas Cooker Repair",
  "Door & Window Installation",
  "Iron Bending",
  "Roofing",
  "Block Moulding",
  "Landscaping",
  "Interlocking",
  "Screeding",
];

export const detailedServices = [
  {
    title: "Home Repairs",
    description: "Professional repairs for your home maintenance needs",
    longDescription: "Our skilled artisans provide comprehensive home repair services to address all your maintenance needs. From fixing leaky faucets to repairing electrical issues, our professionals ensure your home stays in perfect condition with quality workmanship and reliable service.",
    icon: "🛠️",
    category: "Maintenance",
    popularityRank: 1,
    averageRating: 4.8,
    priceRange: "₦2,000 - ₦50,000",
    estimatedTime: "1-8 hours depending on complexity",
    relatedServices: ["Renovations & Finishing", "Emergency Services"],
    features: [
      "Plumbing repairs",
      "Electrical fixes",
      "Carpentry work",
      "Painting services",
      "Roof leakage repairs",
      "Door & window installation",
    ],
    includedServices: [
      {
        name: "Plumbing",
        description: "Fix leaks, unclog drains, repair or replace pipes and fixtures",
        icon: "🚿"
      },
      {
        name: "Electrical",
        description: "Repair wiring, fix outlets, install lighting fixtures, troubleshoot electrical issues",
        icon: "⚡"
      },
      {
        name: "Carpentry",
        description: "Repair wooden structures, fix furniture, install shelving and cabinets",
        icon: "🪚"
      },
      {
        name: "Painting",
        description: "Interior and exterior painting, touch-ups, and complete repainting services",
        icon: "🖌️"
      },
      {
        name: "Door & Window Installation",
        description: "Install, repair, or replace doors and windows for improved security and aesthetics",
        icon: "🚪"
      },
      {
        name: "Roofing",
        description: "Fix leaks, replace damaged tiles, and repair roof structures",
        icon: "🏠"
      }
    ]
  },
  {
    title: "Renovations & Finishing",
    description: "Transform your space with our renovation and finishing services",
    longDescription: "Revitalize your living or working space with our comprehensive renovation and finishing services. Our expert artisans specialize in transforming outdated or damaged areas into beautiful, functional spaces that reflect your style and meet your needs.",
    icon: "🏗️",
    category: "Construction",
    popularityRank: 2,
    averageRating: 4.7,
    priceRange: "₦15,000 - ₦500,000+",
    estimatedTime: "1 day to several weeks",
    relatedServices: ["Home Repairs", "Furniture & Interiors"],
    features: [
      "Masonry work",
      "Tiling installation",
      "POP/False ceiling fitting",
      "Screeding & wall finishing",
      "Flooring & interlocking",
      "Block moulding",
    ],
    includedServices: [
      {
        name: "Masonry",
        description: "Brick and block laying, concrete work, and structural repairs",
        icon: "🧱"
      },
      {
        name: "Tiling",
        description: "Install ceramic, porcelain, or stone tiles for floors, walls, and backsplashes",
        icon: "🔲"
      },
      {
        name: "POP/False Ceiling",
        description: "Design and install decorative ceilings and wall features",
        icon: "🌟"
      },
      {
        name: "Screeding",
        description: "Level floors and prepare surfaces for finishing materials",
        icon: "📏"
      },
      {
        name: "Interlocking",
        description: "Install paving stones for driveways, walkways, and patios",
        icon: "🧩"
      },
      {
        name: "Block Moulding",
        description: "Custom block production for construction projects",
        icon: "🧊"
      }
    ]
  },
  {
    title: "Mechanical & Technical",
    description: "Get expert mechanical and technical servicing for your machines and appliances",
    longDescription: "Keep your machines and appliances running efficiently with our specialized mechanical and technical services. Our certified technicians diagnose and repair issues with precision, ensuring optimal performance and extending the lifespan of your valuable equipment.",
    icon: "🔧",
    category: "Appliance & Equipment",
    popularityRank: 3,
    averageRating: 4.6,
    priceRange: "₦3,000 - ₦75,000",
    estimatedTime: "1-5 hours per service",
    relatedServices: ["Emergency Services", "Smart Home & Electronics"],
    features: [
      "Auto mechanic services",
      "Generator repair & servicing",
      "AC installation & repairs",
      "Refrigerator & freezer repairs",
      "Gas cooker repairs",
    ],
    includedServices: [
      {
        name: "Auto Mechanics",
        description: "Comprehensive vehicle maintenance, diagnostics, and repair services",
        icon: "🚗"
      },
      {
        name: "Generator Repair",
        description: "Troubleshooting, maintenance, and repair of power generators",
        icon: "⚡"
      },
      {
        name: "AC Repair",
        description: "Installation, servicing, and repair of air conditioning units",
        icon: "❄️"
      },
      {
        name: "Refrigerator Repair",
        description: "Fix cooling issues, replace parts, and maintain refrigerators and freezers",
        icon: "🧊"
      },
      {
        name: "Gas Cooker Repair",
        description: "Repair gas lines, burners, and other components of gas cooking appliances",
        icon: "🔥"
      }
    ]
  },
  {
    title: "Fabrication & Metal Works",
    description: "High-quality welding and metal fabrication services",
    longDescription: "Our skilled metalworkers and fabricators create custom metal solutions for your home, business, or project needs. From security gates to decorative elements, we combine functionality with aesthetic appeal to deliver durable, high-quality metal products.",
    icon: "⚙️",
    category: "Construction",
    popularityRank: 4,
    averageRating: 4.7,
    priceRange: "₦10,000 - ₦350,000",
    estimatedTime: "2 days to 2 weeks",
    relatedServices: ["Renovations & Finishing", "Furniture & Interiors"],
    features: [
      "Welding and iron works",
      "Gate and fence fabrication",
      "Aluminum doors and windows",
      "Iron bending and installation",
    ],
    includedServices: [
      {
        name: "Welding/Fabrication",
        description: "Custom metal fabrication, welding repairs, and structural steel work",
        icon: "🔥"
      },
      {
        name: "Iron Bending",
        description: "Custom shaping of iron bars and rods for construction and decorative purposes",
        icon: "↩️"
      },
      {
        name: "Aluminum Works",
        description: "Fabrication and installation of aluminum doors, windows, and other structures",
        icon: "🪟"
      },
      {
        name: "Gate and Fence Fabrication",
        description: "Design and create custom security gates and decorative fencing",
        icon: "🚧"
      }
    ]
  },
  {
    title: "Cleaning & Environmental",
    description: "Ensure your environment stays clean, fresh, and pest-free",
    longDescription: "Maintain a healthy, clean environment with our comprehensive cleaning and environmental services. From regular home cleaning to specialized pest control, our professionals use effective, eco-friendly methods to create spaces that are both beautiful and hygienic.",
    icon: "🧼",
    category: "Maintenance",
    popularityRank: 5,
    averageRating: 4.8,
    priceRange: "₦5,000 - ₦100,000",
    estimatedTime: "2 hours to 1 day",
    relatedServices: ["Home Repairs", "Furniture & Interiors"],
    features: [
      "Residential & office cleaning",
      "Deep cleaning services",
      "Laundry pickup & delivery",
      "Pest control & fumigation",
      "Landscaping and gardening",
    ],
    includedServices: [
      {
        name: "Cleaning",
        description: "Thorough cleaning of homes and offices, including deep cleaning services",
        icon: "🧹"
      },
      {
        name: "Laundry",
        description: "Washing, ironing, and delivery of clothes, linens, and other textiles",
        icon: "👕"
      },
      {
        name: "Pest Control",
        description: "Elimination and prevention of pests through safe, effective methods",
        icon: "🐜"
      },
      {
        name: "Landscaping",
        description: "Garden design, maintenance, and plant care for beautiful outdoor spaces",
        icon: "🌳"
      }
    ]
  },
  {
    title: "Furniture & Interiors",
    description: "Beautiful, custom-built furniture and interior solutions",
    longDescription: "Enhance your space with custom furniture and interior solutions tailored to your style and needs. Our skilled craftsmen create beautiful, functional pieces that elevate your home or office, combining traditional craftsmanship with contemporary design.",
    icon: "🪑",
    category: "Home Improvement",
    popularityRank: 6,
    averageRating: 4.9,
    priceRange: "₦15,000 - ₦500,000",
    estimatedTime: "3 days to 3 weeks",
    relatedServices: ["Renovations & Finishing", "Fabrication & Metal Works"],
    features: [
      "Furniture making & repairs",
      "Upholstery & re-upholstery",
      "Curtain & blind installation",
      "Interior décor support",
    ],
    includedServices: [
      {
        name: "Furniture Making",
        description: "Custom design and creation of wooden furniture for homes and offices",
        icon: "🪑"
      },
      {
        name: "Upholstery",
        description: "Fabric covering for furniture, including repairs and re-upholstery",
        icon: "🛋️"
      },
      {
        name: "Interior Décor",
        description: "Professional advice and implementation of interior design elements",
        icon: "🏠"
      },
      {
        name: "Curtain & Blind Installation",
        description: "Measuring, creating, and installing window treatments",
        icon: "🪟"
      }
    ]
  },
  {
    title: "Beauty & Grooming",
    description: "Stay stylish with our mobile beauty and grooming experts",
    longDescription: "Look and feel your best with our professional beauty and grooming services delivered to your location. Our skilled stylists and barbers provide personalized services that enhance your natural beauty and keep you looking polished for any occasion.",
    icon: "💇‍♀️",
    category: "Personal Care",
    popularityRank: 7,
    averageRating: 4.8,
    priceRange: "₦1,500 - ₦25,000",
    estimatedTime: "30 minutes to 3 hours",
    relatedServices: [],
    features: [
      "Hairdressing services",
      "Barbing for men and kids",
      "Tailoring & fashion design",
      "Mobile makeup & gele tying",
    ],
    includedServices: [
      {
        name: "Hairdressing",
        description: "Professional hair styling, treatments, and maintenance for all hair types",
        icon: "💇‍♀️"
      },
      {
        name: "Barbing",
        description: "Haircuts, shaves, and grooming services for men and children",
        icon: "💇‍♂️"
      },
      {
        name: "Tailoring",
        description: "Custom clothing creation, alterations, and repairs",
        icon: "👔"
      },
      {
        name: "Makeup & Styling",
        description: "Professional makeup application and traditional headwrap styling",
        icon: "💄"
      }
    ]
  },
  {
    title: "Smart Home & Electronics",
    description: "Installation and repairs for your electronics and smart systems",
    longDescription: "Modernize your home with professional installation and maintenance of electronic systems and smart devices. Our technicians help you integrate technology seamlessly into your living space, enhancing convenience, security, and entertainment.",
    icon: "📡",
    category: "Technology",
    popularityRank: 8,
    averageRating: 4.7,
    priceRange: "₦5,000 - ₦150,000",
    estimatedTime: "1-8 hours",
    relatedServices: ["Mechanical & Technical", "Home Repairs"],
    features: [
      "Satellite dish installation",
      "TV wall mounting",
      "Home sound systems",
      "Basic CCTV installation",
    ],
    includedServices: [
      {
        name: "Satellite Installation",
        description: "Setup and alignment of satellite dishes for optimal signal reception",
        icon: "📡"
      },
      {
        name: "TV & Audio Setup",
        description: "Wall mounting TVs and installing home theater and sound systems",
        icon: "📺"
      },
      {
        name: "Security Systems",
        description: "Installation of CCTV cameras and basic security monitoring equipment",
        icon: "🔒"
      },
      {
        name: "Smart Device Integration",
        description: "Setup and configuration of smart home devices and systems",
        icon: "🏠"
      }
    ]
  },
  {
    title: "Emergency Services",
    description: "24/7 emergency repair and rescue services for urgent needs",
    longDescription: "Count on our rapid response team for urgent repairs and emergency situations at any hour. Our skilled professionals arrive quickly to address critical issues, preventing further damage and restoring safety and functionality to your home or business.",
    icon: "🚨",
    category: "Urgent Care",
    popularityRank: 9,
    averageRating: 4.9,
    priceRange: "₦5,000 - ₦100,000",
    estimatedTime: "30 minutes to 4 hours",
    relatedServices: ["Home Repairs", "Mechanical & Technical"],
    features: [
      "Burst pipe & plumbing leaks",
      "Power outage assistance",
      "Generator & AC breakdown",
      "Roof/storm damage repair",
    ],
    includedServices: [
      {
        name: "Emergency Plumbing",
        description: "Immediate response to water leaks, burst pipes, and flooding issues",
        icon: "💧"
      },
      {
        name: "Electrical Emergencies",
        description: "Urgent repairs for power outages, electrical failures, and safety hazards",
        icon: "⚡"
      },
      {
        name: "Equipment Breakdown",
        description: "Rapid repair of essential equipment like generators and air conditioners",
        icon: "🔧"
      },
      {
        name: "Structural Emergencies",
        description: "Quick response to roof damage, broken windows, and other structural issues",
        icon: "🏚️"
      }
    ]
  },
]
