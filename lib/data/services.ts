export interface Service {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDesc: string;
  longDesc: string;
  eligibility?: string[];
  documents?: string[];
  process?: string[];
  timeline?: string;
  govtFees?: string;
  ourFees?: string;
  faqs?: { question: string; answer: string }[];
}

export const serviceCategories = [
  'Registration Services',
  'Strike Off',
  'NCLT',
  'Conversion',
  'Regional Director Approvals',
  'Secretarial Audit',
  'Intellectual Property Rights',
  'Annual Compliance',
  'Miscellaneous'
];

export const services: Service[] = [
  // Registration Services
  {
    id: 'opc-registration',
    title: 'One Person Company (OPC)',
    slug: 'one-person-company-registration',
    category: 'Registration Services',
    shortDesc: 'Register your OPC with single person ownership and limited liability protection for solo entrepreneurs.',
    longDesc: 'One Person Company (OPC) registration provides the perfect solution for individual entrepreneurs who want to start their business with limited liability protection. An OPC combines the benefits of a company structure with the simplicity of sole proprietorship.',
    eligibility: [
      'Only one person can be the member/director',
      'Must be an Indian citizen and resident',
      'Can have only one OPC',
      'Nominee is mandatory'
    ],
    documents: [
      'PAN Card of promoter',
      'Aadhaar Card',
      'Passport size photographs',
      'Registered office address proof',
      'Nominee consent and details'
    ],
    process: [
      'Name reservation with MCA',
      'Preparation of MOA & AOA',
      'Filing incorporation documents',
      'Certificate of incorporation',
      'PAN & TAN application'
    ],
    timeline: '15-20 working days',
    govtFees: '₹4,000 - ₹5,000',
    ourFees: 'Starting from ₹6,999',
    faqs: [
      {
        question: 'What is the minimum capital required for OPC?',
        answer: 'There is no minimum capital requirement for OPC registration.'
      },
      {
        question: 'Can a foreign national register an OPC?',
        answer: 'No, only Indian citizens who are residents in India can register an OPC.'
      }
    ]
  },
  {
    id: 'private-limited-company',
    title: 'Private Limited Company',
    slug: 'private-limited-company-registration',
    category: 'Registration Services',
    shortDesc: 'Incorporate your private limited company with professional guidance and complete compliance support.',
    longDesc: 'Private Limited Company registration offers the most preferred business structure in India, providing limited liability, credibility, and easier access to funding and investment opportunities.',
    eligibility: [
      'Minimum 2 directors required',
      'Minimum 2 shareholders required',
      'Maximum 200 shareholders allowed',
      'Directors can be foreign nationals'
    ],
    documents: [
      'PAN Card of all directors/shareholders',
      'Aadhaar Card/Passport',
      'Passport size photographs',
      'Registered office documents',
      'Director consent letters'
    ],
    process: [
      'Digital Signature Certificate (DSC)',
      'Director Identification Number (DIN)',
      'Name reservation',
      'MOA & AOA preparation',
      'Incorporation filing'
    ],
    timeline: '15-20 working days',
    govtFees: '₹8,000 - ₹10,000',
    ourFees: 'Starting from ₹8,999',
    faqs: [
      {
        question: 'What is the minimum paid-up capital required?',
        answer: 'There is no minimum paid-up capital requirement as per the new Companies Act.'
      },
      {
        question: 'Can husband and wife be the only two directors?',
        answer: 'Yes, husband and wife can be the two directors and shareholders of a private limited company.'
      }
    ]
  },
  {
    id: 'public-limited-company',
    title: 'Public Limited Company',
    slug: 'public-limited-company-registration',
    category: 'Registration Services',
    shortDesc: 'Establish your public limited company for large-scale operations and public fundraising capabilities.',
    longDesc: 'Public Limited Company registration enables businesses to raise capital from the public, list on stock exchanges, and operate at a larger scale with enhanced credibility and compliance standards.',
    eligibility: [
      'Minimum 3 directors required',
      'Minimum 7 shareholders required',
      'No maximum limit on shareholders',
      'Minimum paid-up capital ₹5 lakh'
    ],
    documents: [
      'PAN and Aadhaar of directors/subscribers',
      'Passport size photographs',
      'Registered office proof',
      'Consent of directors',
      'Subscriber details and shareholding'
    ],
    process: [
      'DSC and DIN for directors',
      'Name availability check',
      'MOA & AOA drafting',
      'Filing with ROC',
      'Certificate of incorporation'
    ],
    timeline: '25-30 working days',
    govtFees: '₹25,000 - ₹30,000',
    ourFees: 'Starting from ₹25,999',
    faqs: [
      {
        question: 'What is the minimum paid-up capital for Public Company?',
        answer: 'Minimum paid-up capital required is ₹5 lakh.'
      }
    ]
  },
  {
    id: 'section-8-company',
    title: 'Section 8 Company (NGO)',
    slug: 'section-8-company-ngo-registration',
    category: 'Registration Services',
    shortDesc: 'Register your non-profit organization under Section 8 for charitable and social welfare activities.',
    longDesc: 'Section 8 Company registration is ideal for non-profit organizations focusing on charitable activities, social welfare, education, healthcare, and other noble causes with tax exemptions and credibility.',
    eligibility: [
      'Minimum 2 directors required',
      'Objects must be charitable/social welfare',
      'Profits cannot be distributed to members',
      'License required from Central Government'
    ],
    documents: [
      'Directors PAN and Aadhaar',
      'Photographs of directors',
      'Registered office documents',
      'Objects of the company',
      'No profit distribution declaration'
    ],
    process: [
      'Name reservation',
      'Objects drafting and approval',
      'Section 8 license application',
      'MOA & AOA preparation',
      'Incorporation filing'
    ],
    timeline: '45-60 working days',
    govtFees: '₹5,000 - ₹8,000',
    ourFees: 'Starting from ₹12,999',
    faqs: [
      {
        question: 'Can Section 8 company earn profit?',
        answer: 'Yes, but profits must be used for charitable purposes only and cannot be distributed to members.'
      }
    ]
  },
  {
    id: 'subsidiary-foreign-company',
    title: 'Subsidiary of a Foreign Company',
    slug: 'subsidiary-foreign-company-registration',
    category: 'Registration Services',
    shortDesc: 'Establish Indian subsidiary of your foreign company with full compliance and regulatory support.',
    longDesc: 'Subsidiary company registration allows foreign companies to establish their Indian operations with complete ownership control while complying with Indian regulatory requirements and FDI norms.',
    eligibility: [
      'Foreign company must be incorporated outside India',
      'Compliance with FDI policy',
      'Minimum 2 directors (1 must be Indian resident)',
      'Board resolution from parent company'
    ],
    documents: [
      'Certificate of incorporation of parent company',
      'Board resolution of parent company',
      'Directors PAN/Passport',
      'Address proof of registered office',
      'Power of Attorney'
    ],
    process: [
      'FDI compliance check',
      'Name reservation',
      'DSC and DIN for directors',
      'MOA & AOA preparation',
      'ROC filing and incorporation'
    ],
    timeline: '30-45 working days',
    govtFees: '₹10,000 - ₹15,000',
    ourFees: 'Starting from ₹18,999',
    faqs: [
      {
        question: 'What is the minimum capital requirement?',
        answer: 'No minimum capital requirement, but must comply with FDI norms for the sector.'
      }
    ]
  },
  {
    id: 'llp-registration',
    title: 'LLP Registration',
    slug: 'llp-registration',
    category: 'Registration Services',
    shortDesc: 'Register your Limited Liability Partnership with flexibility and limited liability protection.',
    longDesc: 'LLP Registration provides the perfect blend of partnership flexibility and company-like limited liability protection, ideal for professional services and small to medium businesses.',
    eligibility: [
      'Minimum 2 partners required',
      'No maximum limit on partners',
      'At least 2 designated partners must be individuals',
      'One designated partner must be Indian resident'
    ],
    documents: [
      'PAN and Aadhaar of partners',
      'Passport size photographs',
      'Registered office proof',
      'Partner consent forms',
      'LLP agreement draft'
    ],
    process: [
      'Name reservation with MCA',
      'DPIN for designated partners',
      'LLP agreement drafting',
      'Incorporation filing',
      'Certificate of incorporation'
    ],
    timeline: '15-20 working days',
    govtFees: '₹1,500 - ₹2,500',
    ourFees: 'Starting from ₹5,999',
    faqs: [
      {
        question: 'What is the minimum contribution required in LLP?',
        answer: 'There is no minimum capital contribution requirement for LLP.'
      }
    ]
  },

  // Strike Off Services
  {
    id: 'company-strike-off',
    title: 'Strike off of Company',
    slug: 'company-strike-off',
    category: 'Strike Off',
    shortDesc: 'Close your dormant company legally through strike-off process with complete documentation support.',
    longDesc: 'Company strike-off process helps in legally closing inactive companies that have ceased operations, ensuring compliance with MCA regulations and avoiding penalties for non-filing.',
    eligibility: [
      'Company must be inactive for 2+ years',
      'No business transactions in last 2 years',
      'All statutory filings must be updated',
      'No pending proceedings against company'
    ],
    documents: [
      'Board resolution for strike-off',
      'Affidavit by all directors',
      'No dues certificate',
      'Bank closure certificate',
      'IT clearance certificate'
    ],
    process: [
      'Board resolution passing',
      'Notice publication in newspaper',
      'Filing STK-2 form',
      'Public notice for 30 days',
      'Final strike-off order'
    ],
    timeline: '6-8 months',
    govtFees: '₹5,000 - ₹8,000',
    ourFees: 'Starting from ₹12,999'
  },
  {
    id: 'llp-strike-off',
    title: 'Strike Off of LLP',
    slug: 'llp-strike-off',
    category: 'Strike Off',
    shortDesc: 'Legally wind up your inactive LLP through proper strike-off procedure with regulatory compliance.',
    longDesc: 'LLP strike-off process provides a legal way to close inactive Limited Liability Partnerships while ensuring all statutory obligations are fulfilled and avoiding future compliance burdens.',
    timeline: '4-6 months',
    govtFees: '₹2,000 - ₹3,000',
    ourFees: 'Starting from ₹8,999'
  },

  // NCLT Services
  {
    id: 'merger-amalgamation',
    title: 'Merger and Amalgamation',
    slug: 'merger-amalgamation-nclt',
    category: 'NCLT',
    shortDesc: 'Expert assistance for company mergers and amalgamations through NCLT with complete compliance support.',
    longDesc: 'NCLT merger and amalgamation services help companies combine operations, consolidate resources, and achieve business synergies through legally compliant merger processes.',
    timeline: '8-12 months',
    govtFees: 'Varies by case',
    ourFees: 'Contact us for quote'
  },
  {
    id: 'demerger',
    title: 'De-merger',
    slug: 'demerger-nclt',
    category: 'NCLT',
    shortDesc: 'Professional support for corporate de-merger transactions through NCLT approval process.',
    longDesc: 'De-merger services facilitate the division of company operations into separate entities, helping businesses focus on core activities and unlock shareholder value.',
    timeline: '10-15 months',
    govtFees: 'Varies by case',
    ourFees: 'Contact us for quote'
  },
  {
    id: 'revival-struck-off-company',
    title: 'Revival of a Strike Off Company',
    slug: 'revival-struck-off-company',
    category: 'NCLT',
    shortDesc: 'Revive your struck-off company through NCLT with proper documentation and legal compliance.',
    longDesc: 'Company revival services help restore struck-off companies to active status, enabling resumption of business operations with full legal compliance and regulatory approval.',
    timeline: '6-10 months',
    govtFees: '₹25,000 - ₹50,000',
    ourFees: 'Starting from ₹35,999'
  },
  {
    id: 'compounding-offence-nclt',
    title: 'Compounding of Offence',
    slug: 'compounding-offence-nclt',
    category: 'NCLT',
    shortDesc: 'Resolve corporate law violations through NCLT compounding process with expert legal guidance.',
    longDesc: 'Compounding of offence services help companies resolve statutory violations and non-compliances through NCLT, avoiding criminal prosecution and penalties.',
    timeline: '4-8 months',
    govtFees: 'Based on offence amount',
    ourFees: 'Contact us for quote'
  },

  // Conversion Services
  {
    id: 'llp-to-company-conversion',
    title: 'Conversion of LLP into Company',
    slug: 'llp-company-conversion',
    category: 'Conversion',
    shortDesc: 'Convert your LLP into Private/Public Limited Company with seamless transition and compliance.',
    longDesc: 'LLP to Company conversion enables businesses to change their structure for better funding opportunities, enhanced credibility, and corporate benefits while maintaining business continuity.',
    timeline: '45-60 days',
    govtFees: '₹15,000 - ₹20,000',
    ourFees: 'Starting from ₹18,999'
  },
  {
    id: 'private-to-public-conversion',
    title: 'Conversion of Private Company into Public Company',
    slug: 'private-public-company-conversion',
    category: 'Conversion',
    shortDesc: 'Convert your private limited company to public limited for public fundraising and stock listing.',
    longDesc: 'Private to Public conversion enables companies to raise capital from public, list on stock exchanges, and expand operations with enhanced market credibility.',
    timeline: '60-90 days',
    govtFees: '₹20,000 - ₹25,000',
    ourFees: 'Starting from ₹25,999'
  },
  {
    id: 'public-to-private-conversion',
    title: 'Conversion of Public Company into Private Company',
    slug: 'public-private-company-conversion',
    category: 'Conversion',
    shortDesc: 'Convert your public company to private limited for simplified compliance and operational flexibility.',
    longDesc: 'Public to Private conversion helps companies reduce compliance burden, simplify operations, and focus on core business activities with fewer regulatory requirements.',
    timeline: '90-120 days',
    govtFees: '₹15,000 - ₹20,000',
    ourFees: 'Starting from ₹22,999'
  },
  {
    id: 'company-to-llp-conversion',
    title: 'Conversion of Company into LLP',
    slug: 'company-llp-conversion',
    category: 'Conversion',
    shortDesc: 'Convert your company into LLP for operational flexibility and reduced compliance requirements.',
    longDesc: 'Company to LLP conversion provides businesses with partnership flexibility while retaining limited liability protection and reduced compliance obligations.',
    timeline: '60-90 days',
    govtFees: '₹10,000 - ₹15,000',
    ourFees: 'Starting from ₹16,999'
  },
  {
    id: 'unregistered-to-company-conversion',
    title: 'Conversion of unregistered entities into Company',
    slug: 'unregistered-entities-company-conversion',
    category: 'Conversion',
    shortDesc: 'Convert your unregistered business into a registered company with complete legal compliance.',
    longDesc: 'Conversion of unregistered entities helps formalize business operations, provide legal structure, and enable access to funding and business opportunities.',
    timeline: '30-45 days',
    govtFees: '₹8,000 - ₹12,000',
    ourFees: 'Starting from ₹12,999'
  },

  // Regional Director Approvals
  {
    id: 'registered-office-shifting',
    title: 'Shifting of Registered Office from One State to another',
    slug: 'registered-office-shifting-interstate',
    category: 'Regional Director Approvals',
    shortDesc: 'Shift your company registered office across states with Regional Director approval and compliance.',
    longDesc: 'Interstate registered office shifting requires Regional Director approval and involves complex documentation to ensure legal compliance and business continuity.',
    timeline: '3-6 months',
    govtFees: '₹10,000 - ₹15,000',
    ourFees: 'Starting from ₹18,999'
  },
  {
    id: 'fast-track-merger',
    title: 'Fast Track Merger',
    slug: 'fast-track-merger-rd-approval',
    category: 'Regional Director Approvals',
    shortDesc: 'Complete fast track merger process with Regional Director approval for eligible companies.',
    longDesc: 'Fast track merger process provides an expedited route for eligible company mergers with simplified documentation and faster approvals from Regional Director.',
    timeline: '4-6 months',
    govtFees: '₹25,000 - ₹40,000',
    ourFees: 'Starting from ₹45,999'
  },
  {
    id: 'compounding-offence-rd',
    title: 'Compounding of Offence upto 25 Lakh',
    slug: 'compounding-offence-regional-director',
    category: 'Regional Director Approvals',
    shortDesc: 'Resolve corporate offences up to ₹25 lakh through Regional Director compounding process.',
    longDesc: 'Regional Director compounding services help resolve statutory violations and defaults up to ₹25 lakh with proper documentation and legal compliance.',
    timeline: '2-4 months',
    govtFees: 'Based on penalty amount',
    ourFees: 'Contact us for quote'
  },

  // Secretarial Audit
  {
    id: 'secretarial-audit',
    title: 'Secretarial Audit',
    slug: 'secretarial-audit-services',
    category: 'Secretarial Audit',
    shortDesc: 'Comprehensive secretarial audit services for compliance verification and statutory reporting.',
    longDesc: 'Secretarial audit services ensure companies maintain proper statutory records, comply with applicable laws, and submit accurate annual secretarial audit reports as required by law.',
    eligibility: [
      'Listed companies (mandatory)',
      'Public companies with paid-up capital ≥ ₹50 crore',
      'Public companies with turnover ≥ ₹250 crore',
      'Private companies as per Rule 8A'
    ],
    timeline: '30-45 days',
    govtFees: 'No government fees',
    ourFees: 'Starting from ₹15,999'
  },

  // Intellectual Property Rights
  {
    id: 'trademark-registration',
    title: 'Trademark',
    slug: 'trademark-registration',
    category: 'Intellectual Property Rights',
    shortDesc: 'Protect your brand with trademark registration and comprehensive intellectual property services.',
    longDesc: 'Trademark registration provides legal protection for your brand name, logo, and business identity, ensuring exclusive rights and preventing unauthorized usage by competitors.',
    eligibility: [
      'Any individual, company, or entity',
      'Mark must be distinctive',
      'Should not be similar to existing trademarks',
      'Must be used in commerce'
    ],
    documents: [
      'Trademark application form',
      'Logo/wordmark specimen',
      'Power of attorney',
      'Applicant identity proof',
      'Business registration proof'
    ],
    process: [
      'Trademark search',
      'Application filing',
      'Examination by registrar',
      'Publication in journal',
      'Registration certificate'
    ],
    timeline: '12-18 months',
    govtFees: '₹4,500 - ₹9,000',
    ourFees: 'Starting from ₹6,999'
  },

  // Annual Compliance
  {
    id: 'llp-annual-compliance',
    title: 'Limited Liability Partnership (LLP)',
    slug: 'llp-annual-compliance',
    category: 'Annual Compliance',
    shortDesc: 'Complete LLP annual compliance including Form 8 and Form 11 filing with timely submission.',
    longDesc: 'LLP annual compliance ensures your Limited Liability Partnership meets all statutory filing requirements including annual returns, statement of accounts, and regulatory submissions.',
    timeline: 'Within 60 days of year-end',
    govtFees: '₹600 - ₹3,000',
    ourFees: 'Starting from ₹4,999'
  },
  {
    id: 'opc-annual-compliance',
    title: 'One Person Company (OPC)',
    slug: 'opc-annual-compliance',
    category: 'Annual Compliance',
    shortDesc: 'OPC annual compliance including AOC-4, MGT-7, and other statutory filings with MCA.',
    longDesc: 'OPC annual compliance covers all mandatory filings including financial statements, annual returns, and board resolutions required for One Person Companies.',
    timeline: 'Within 300 days of year-end',
    govtFees: '₹1,200 - ₹5,000',
    ourFees: 'Starting from ₹6,999'
  },
  {
    id: 'private-limited-annual-compliance',
    title: 'Private Limited Company',
    slug: 'private-limited-annual-compliance',
    category: 'Annual Compliance',
    shortDesc: 'Complete private limited company compliance including ROC filings and statutory submissions.',
    longDesc: 'Private Limited Company annual compliance includes all mandatory ROC filings, board meetings, AGM conduct, and statutory document maintenance.',
    timeline: 'Within 300 days of year-end',
    govtFees: '₹2,400 - ₹10,000',
    ourFees: 'Starting from ₹8,999'
  },
  {
    id: 'public-limited-annual-compliance',
    title: 'Public Limited Company',
    slug: 'public-limited-annual-compliance',
    category: 'Annual Compliance',
    shortDesc: 'Comprehensive public limited company compliance including all regulatory and statutory requirements.',
    longDesc: 'Public Limited Company compliance covers extensive regulatory requirements including ROC filings, stock exchange compliance, and various statutory submissions.',
    timeline: 'Within 300 days of year-end',
    govtFees: '₹5,000 - ₹25,000',
    ourFees: 'Starting from ₹18,999'
  },
  {
    id: 'dormant-company-compliance',
    title: 'Dormant Company',
    slug: 'dormant-company-annual-compliance',
    category: 'Annual Compliance',
    shortDesc: 'Maintain dormant company status with proper annual filings and compliance requirements.',
    longDesc: 'Dormant company compliance ensures inactive companies maintain their status with minimal regulatory filings while staying compliant with MCA requirements.',
    timeline: 'Within 300 days of year-end',
    govtFees: '₹300 - ₹1,200',
    ourFees: 'Starting from ₹3,999'
  },

  // Miscellaneous Services
  {
    id: 'dormant-status-attainment',
    title: 'Attainment of Dormant Status of a Company',
    slug: 'company-dormant-status-attainment',
    category: 'Miscellaneous',
    shortDesc: 'Apply for dormant status to reduce compliance burden for inactive companies with proper documentation.',
    longDesc: 'Dormant status application helps inactive companies reduce compliance requirements while maintaining corporate existence for future business opportunities.',
    timeline: '30-45 days',
    govtFees: '₹300 - ₹600',
    ourFees: 'Starting from ₹2,999'
  },
  {
    id: 'active-status-attainment',
    title: 'Attainment of Active Status of a Dormant Company',
    slug: 'dormant-company-active-status',
    category: 'Miscellaneous',
    shortDesc: 'Convert dormant company to active status for resuming business operations with regulatory approval.',
    longDesc: 'Active status conversion enables dormant companies to resume business operations with proper ROC notifications and compliance restoration.',
    timeline: '30-45 days',
    govtFees: '₹300 - ₹600',
    ourFees: 'Starting from ₹3,999'
  },
  {
    id: 'board-general-meetings',
    title: 'Conducting Board/General Meetings',
    slug: 'board-general-meetings-conduct',
    category: 'Miscellaneous',
    shortDesc: 'Professional assistance in conducting board meetings and general meetings with proper documentation.',
    longDesc: 'Expert support for conducting statutory meetings including board meetings, AGMs, and EGMs with proper notice, agenda preparation, and minute documentation.',
    timeline: 'As per requirement',
    govtFees: 'No government fees',
    ourFees: 'Starting from ₹2,999 per meeting'
  },
  {
    id: 'statutory-records-maintenance',
    title: 'Statutory Records of a Company',
    slug: 'company-statutory-records-maintenance',
    category: 'Miscellaneous',
    shortDesc: 'Maintain and update all statutory records and registers required under Companies Act compliance.',
    longDesc: 'Comprehensive statutory record maintenance including register of members, directors, charges, and other mandatory books and records as per Companies Act requirements.',
    timeline: 'Ongoing service',
    govtFees: 'No government fees',
    ourFees: 'Starting from ₹4,999 per year'
  }
];

export const getFeaturedServices = () => {
  return services.filter(service => 
    ['opc-registration', 'private-limited-company', 'llp-registration', 'trademark-registration'].includes(service.id)
  );
};

export const getServicesByCategory = (category: string) => {
  return services.filter(service => service.category === category);
};

export const getServiceBySlug = (slug: string) => {
  return services.find(service => service.slug === slug);
};