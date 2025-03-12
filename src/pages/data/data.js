export const companies = [
  {
    id: 1,
    name: "Tech Solutions Inc",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
    industry: "Information Technology",
    rating: 4.5,
    reviewCount: 245,
    location: "San Francisco, CA",
    description: "Leading technology solutions provider specializing in cloud computing and AI",
    benefits: ["Health Insurance", "401k", "Remote Work", "Gym Membership"],
    salaryRange: {
      min: 80000,
      max: 150000,
      currency: "USD"
    },
    roles: [
      {
        id: 1,
        title: "Senior Software Engineer",
        department: "Engineering",
        salaryRange: {
          min: 130000,
          max: 180000,
          currency: "USD"
        },
        benefits: ["Remote Work", "Stock Options", "Health Insurance"]
      },
      {
        id: 2,
        title: "Product Manager",
        department: "Product",
        salaryRange: {
          min: 120000,
          max: 160000,
          currency: "USD"
        },
        benefits: ["Flexible Hours", "Performance Bonus", "Health Insurance"]
      }
    ]
  },
  {
    id: 2,
    name: "Global Innovations Ltd",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop",
    industry: "Software Development",
    rating: 4.2,
    reviewCount: 189,
    location: "New York, NY",
    description: "Innovative software solutions company focused on digital transformation",
    benefits: ["Flexible Hours", "Stock Options", "Learning Budget", "Health Insurance"],
    salaryRange: {
      min: 90000,
      max: 180000,
      currency: "USD"
    },
    roles: [
      {
        id: 3,
        title: "Full Stack Developer",
        department: "Engineering",
        salaryRange: {
          min: 100000,
          max: 150000,
          currency: "USD"
        },
        benefits: ["Remote Work", "Learning Budget", "Health Insurance"]
      },
      {
        id: 4,
        title: "UX Designer",
        department: "Design",
        salaryRange: {
          min: 90000,
          max: 130000,
          currency: "USD"
        },
        benefits: ["Creative Environment", "Design Tools Budget", "Health Insurance"]
      }
    ]
  },
  {
    id: 3,
    name: "DataCraft Analytics",
    logo: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100&h=100&fit=crop",
    industry: "Data Analytics",
    rating: 4.7,
    reviewCount: 156,
    location: "Boston, MA",
    description: "Leading data analytics company transforming business intelligence",
    benefits: ["Remote First", "Unlimited PTO", "Health & Dental", "Education Allowance"],
    salaryRange: {
      min: 95000,
      max: 175000,
      currency: "USD"
    },
    roles: [
      {
        id: 5,
        title: "Data Scientist",
        department: "Data Science",
        salaryRange: {
          min: 120000,
          max: 170000,
          currency: "USD"
        },
        benefits: ["Research Budget", "Conference Allowance", "Health Insurance"]
      },
      {
        id: 6,
        title: "Machine Learning Engineer",
        department: "AI/ML",
        salaryRange: {
          min: 130000,
          max: 180000,
          currency: "USD"
        },
        benefits: ["GPU Access", "Research Publications", "Health Insurance"]
      }
    ]
  }
];

export const reviews = [
  {
    id: 1,
    companyId: 1,
    rating: 4.5,
    title: "Great work culture and benefits",
    pros: "Excellent work-life balance, competitive salary, and great learning opportunities. The company really invests in employee growth and development. Regular training sessions and workshops keep skills up to date.",
    cons: "Project deadlines can be tight sometimes. Communication between departments could be improved. Some legacy systems need updating.",
    authorRole: "Senior Software Engineer",
    date: "2024-02-15",
    helpful: 25,
    experience: "3+ years at company",
    location: "San Francisco, CA",
    verified: true,
    employmentStatus: "Current",
    recommendToFriend: true
  },
  {
    id: 2,
    companyId: 1,
    rating: 4.0,
    title: "Solid company with room for growth",
    pros: "Great benefits package, competitive pay, and opportunities for advancement. Strong technical team and interesting projects. Good work-life balance.",
    cons: "Some processes could be streamlined. Decision-making can be slow at times. Office location could be better.",
    authorRole: "Product Manager",
    date: "2024-02-10",
    helpful: 18,
    experience: "2 years at company",
    location: "San Francisco, CA",
    verified: true,
    employmentStatus: "Current",
    recommendToFriend: true
  },
  {
    id: 3,
    companyId: 2,
    rating: 4.8,
    title: "Fantastic learning environment",
    pros: "Cutting-edge technology stack, great mentorship program, excellent compensation. Regular team building activities and strong company culture.",
    cons: "Fast-paced environment might not suit everyone. Some projects can be challenging with tight deadlines.",
    authorRole: "Full Stack Developer",
    date: "2024-02-20",
    helpful: 32,
    experience: "1.5 years at company",
    location: "New York, NY",
    verified: true,
    employmentStatus: "Current",
    recommendToFriend: true
  },
  {
    id: 4,
    companyId: 2,
    rating: 4.2,
    title: "Good balance of challenge and support",
    pros: "Modern tech stack, friendly colleagues, good benefits. Regular opportunities to learn new technologies and work on different projects.",
    cons: "Communication between departments could be better. Some technical debt in older projects.",
    authorRole: "Senior Developer",
    date: "2024-02-18",
    helpful: 15,
    experience: "2.5 years at company",
    location: "New York, NY",
    verified: true,
    employmentStatus: "Current",
    recommendToFriend: true
  },
  {
    id: 5,
    companyId: 3,
    rating: 4.6,
    title: "Innovative and employee-focused",
    pros: "Cutting-edge projects in AI/ML, great team atmosphere, excellent benefits. Strong emphasis on work-life balance and professional development.",
    cons: "Some projects can be very challenging. Occasional long hours during critical releases.",
    authorRole: "Data Scientist",
    date: "2024-02-22",
    helpful: 28,
    experience: "2 years at company",
    location: "Boston, MA",
    verified: true,
    employmentStatus: "Current",
    recommendToFriend: true
  }
];

export const roles = [
  {
    id: 1,
    companyId: 1,
    title: "Senior Software Engineer",
    department: "Engineering",
    salaryRange: {
      min: 130000,
      max: 180000,
      currency: "USD"
    },
    benefits: ["Remote Work", "Stock Options", "Health Insurance"],
    requirements: [
      "5+ years of experience in software development",
      "Strong knowledge of JavaScript/TypeScript",
      "Experience with cloud platforms (AWS/Azure/GCP)"
    ],
    responsibilities: [
      "Lead development of key features",
      "Mentor junior developers",
      "Contribute to system architecture"
    ]
  },
  {
    id: 2,
    companyId: 1,
    title: "Product Manager",
    department: "Product",
    salaryRange: {
      min: 120000,
      max: 160000,
      currency: "USD"
    },
    benefits: ["Flexible Hours", "Performance Bonus", "Health Insurance"],
    requirements: [
      "3+ years of product management experience",
      "Strong analytical skills",
      "Experience with agile methodologies"
    ],
    responsibilities: [
      "Define product strategy",
      "Work with stakeholders",
      "Manage product roadmap"
    ]
  },
  {
    id: 3,
    companyId: 2,
    title: "Full Stack Developer",
    department: "Engineering",
    salaryRange: {
      min: 100000,
      max: 150000,
      currency: "USD"
    },
    benefits: ["Remote Work", "Learning Budget", "Health Insurance"],
    requirements: [
      "3+ years of full stack development experience",
      "Experience with React and Node.js",
      "Knowledge of database systems"
    ],
    responsibilities: [
      "Develop full stack applications",
      "Optimize application performance",
      "Write clean, maintainable code"
    ]
  },
  {
    id: 4,
    companyId: 3,
    title: "Data Scientist",
    department: "Data Science",
    salaryRange: {
      min: 120000,
      max: 170000,
      currency: "USD"
    },
    benefits: ["Research Budget", "Conference Allowance", "Health Insurance"],
    requirements: [
      "MS/PhD in Computer Science or related field",
      "Strong background in machine learning",
      "Experience with Python and data analysis tools"
    ],
    responsibilities: [
      "Develop machine learning models",
      "Analyze complex datasets",
      "Present findings to stakeholders"
    ]
  }
];