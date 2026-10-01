
/**
 * Types
 */
import type {
  ExperienceType,
  LinksType,
  ProjectType,
  ServiceType,
  StatsType,
  // TestimonialsType,
  ToolsType,
} from '@/types';

/**
 * Assets
 */
import {
  BarChart3,
  Briefcase,
  Code2,
  FileText,
  Headset,
  Home,
  Mail,
  Settings,
  ShieldCheck,
  User,
} from 'lucide-react';

import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

const navLinks: LinksType[] = [
  { label: 'Home', link: '#hero', icon: Home },
  { label: 'About', link: '#about', icon: User },
  { label: 'Services', link: '#services', icon: Settings },
  { label: 'Projects', link: '#projects', icon: Briefcase },
  { label: 'Resume', link: '#resume', icon: FileText },
  { label: 'Contact', link: '#contact', icon: Mail },
];

const socialLinks: LinksType[] = [
  {
    icon: FaFacebook,
    label: 'Facebook',
    link: 'https://www.facebook.com/johnxtian11',
  },
  {
    icon: FaInstagram,
    label: 'Instagram',
    link: 'https://www.instagram.com/jhnchrstn11',
  },
  {
    icon: FaTwitter,
    label: 'Twitter',
    link: 'https://twitter.com/johnxtn11',
  },
  {
    icon: FaYoutube,
    label: 'Youtube',
    link: 'https://www.youtube.com/@vlogstory-b4d',
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/john-christian-atienza/',
  },
];

const projectsData: ProjectType[] = [
  {
    imgSrc: '/images/landing-page.png',
    title: 'Restaurant Landing Page',
    description:
      'Responsive restaurant landing page built with React and Tailwind CSS, focused on creating a clean and user-friendly front-end experience.',
    category: 'Front-End',
    tags: ['Landing Page', 'React', 'Tailwind'],
    projectLink: 'https://food-biteiq.netlify.app/',
    featured: true,
  },
  {
    imgSrc: '/images/data-page.png',
    title: 'Hospital Dashboard',
    description:
      'Interactive hospital dashboard created for data analysis and reporting using Microsoft Power BI.',
    category: 'Data Analysis',
    tags: ['Dashboard', 'Power BI'],
    projectLink: '',
    featured: true,
  },
  {
    imgSrc: '/images/QA-1.png',
    title: 'Test Case Sample',
    description:
      'Software QA test case sample demonstrating manual testing, test case documentation, and User Acceptance Testing practices.',
    category: 'Software QA',
    tags: ['Manual QA', 'Test Case', 'UAT'],
    projectLink:
      'https://docs.google.com/spreadsheets/d/1P_n58js4aW7LpZ0H-h_KVAcKFLmnsss5EuH9BQzrWaY/edit?usp=sharing',
    featured: true,
  },
  {
    imgSrc: '/images/QA-2.png',
    title: 'Order Management & Sales System',
    description:
      'Software QA test case sample focused on manual testing, test case documentation, and User Acceptance Testing for an order management and sales system.',
    category: 'Software QA',
    tags: ['Manual QA', 'Test Case', 'UAT'],
    projectLink:
      'https://docs.google.com/spreadsheets/d/11LbLhudgqIenF3NoewDT9drN-f5jVhgl0vn-ESLEQq0/edit?usp=sharing',
    featured: false,
  },
  {
    imgSrc: '/images/landing-page-3.png',
    title: 'Construction Landing Page',
    description:
      'Responsive construction website landing page built with HTML, CSS, and JavaScript.',
    category: 'Front-End',
    tags: ['Landing Page', 'HTML', 'CSS', 'JavaScript'],
    projectLink: 'https://construction-jc.netlify.app/',
    featured: false,
  },
  {
    imgSrc: '/images/landing-page-2.png',
    title: 'Med Landing Page',
    description:
      'Responsive medical website landing page built with HTML, CSS, and JavaScript.',
    category: 'Front-End',
    tags: ['Landing Page', 'HTML', 'CSS', 'JavaScript'],
    projectLink: 'https://med-reach.netlify.app/',
    featured: false,
  },
];

const education: ExperienceType[] = [
  {
    year: '2006 – 2012',
    title: 'Elementary School',
    institute: 'Guiwanon Elementary School',
    desc: 'Guiwanon Tubigon, Bohol',
  },
  {
    year: '2012 – 2018',
    title: 'Jr-Sr High School',
    institute: 'Holy Cross Academy',
    desc: 'Pooc Oriental Tubigon, Bohol',
  },
  {
    year: '2018-2022',
    title: 'Bachelor of Science in Computer Science',
    institute: 'Bohol Island State Universityv (Calape Campus)',
    desc: 'San Isidro Calape, Bohol',
  },
];

const experience: ExperienceType[] = [
  {
    year: '2022 – Present',
    title: 'ATS II - Associate Technical Specialist II',
    institute: 'Alliance Software Inc',
    desc: 'Cebu Business Park, Cebu City, Philippines',
  },
];

const tools: ToolsType[] = [
  {
    label: 'CSS',
    imgSrc: '/images/tools/css.svg',
  },
  {
    label: 'HTML',
    imgSrc: '/images/tools/html5.svg',
  },
  {
    label: 'Javascript',
    imgSrc: '/images/tools/javascript.svg',
  },
  {
    label: 'PostgreSQL',
    imgSrc: '/images/tools/postgresql.svg',
  },
  {
    label: 'MS PowerBi',
    imgSrc: '/images/tools/powerbi.svg',
  },
  {
    label: 'MS Excel',
    imgSrc: '/images/tools/excel.svg',
  },
  {
    label: 'Python',
    imgSrc: '/images/tools/python.svg',
  },
];

const services: ServiceType[] = [
  {
    title: 'Software Quality Assurance',
    desc: 'Ensuring software quality through manual testing, test case creation, User Acceptance Testing, validation, and bug identification.',
    projects: '32 Projects',
    skills: [
      'Manual Testing',
      'Test Case Creation',
      'UAT',
      'Validation',
      'Bug Identification',
    ],
    icon: <ShieldCheck className='h-6 w-6 text-white' />,
  },
  {
    title: 'Application Support',
    desc: 'Providing reliable technical support through issue investigation, troubleshooting, system assistance, and problem resolution.',
    projects: '47 Projects',
    skills: [
      'Issue Investigation',
      'Technical Support',
      'Troubleshooting',
      'System Assistance',
    ],
    icon: <Headset className='h-6 w-6 text-white' />,
  },
  {
    title: 'Data Analysis & Reporting',
    desc: 'Transforming data into meaningful insights using Excel, Power BI, PostgreSQL, Python, and reporting techniques.',
    projects: '58 Projects',
    skills: [
      'Excel',
      'Power BI',
      'PostgreSQL',
      'Python',
      'Reporting',
    ],
    icon: <BarChart3 className='h-6 w-6 text-white' />,
  },
  {
    title: 'Front-End Development',
    desc: 'Building responsive and user-friendly web interfaces using HTML, CSS, JavaScript, React, and Tailwind CSS.',
    projects: '21 Projects',
    skills: [
      'HTML',
      'CSS',
      'JavaScript',
      'React',
      'Tailwind CSS',
    ],
    icon: <Code2 className='h-6 w-6 text-white' />,
  },
]

const statsData: StatsType[] = [
  {
    number: '3+',
    label: 'Happy Clients',
  },
  {
    number: '03+',
    label: 'Years Of Experience',
  },
  {
    number: '5+',
    label: 'Projects Done',
  },
];

// const testimonials: TestimonialsType[] = [
// //   {
// //     name: 'Alex Tomato',
// //     role: 'Brand Manager at Instant Design',
// //     image: 'https://randomuser.me/api/portraits/men/32.jpg',
// //     text: 'Working with David was an absolute pleasure. His attention to detail, creative insights, and ability to translate complex ideas into stunning visuals truly set him apart. He consistently went above and beyond to ensure the project exceeded expectations.',
// //     link: '#',
// //   },
// //   {
// //     name: 'Sara Bloom',
// //     role: 'Founder at Bloom Agency',
// //     image: 'https://randomuser.me/api/portraits/women/65.jpg',
// //     text: 'David brought my brand vision to life better than I could have imagined. He is not only professional and highly skilled but also incredibly responsive and collaborative. Every aspect of the project was handled with precision and creativity.',
// //     link: '#',
// //   },
// //   {
// //     name: 'John Park',
// //     role: 'CEO at PixelFlow',
// //     image: 'https://randomuser.me/api/portraits/men/45.jpg',
// //     text: 'From UI/UX design to front-end implementation, David handled every detail flawlessly. His problem-solving skills, innovative approach, and dedication made the entire process smooth and enjoyable. I would highly recommend him for any design-driven project.',
// //     link: '#',
// //   },
// // ];

export {
  socialLinks,
  projectsData,
  education,
  experience,
  tools,
  services,
  navLinks,
  statsData,
  // testimonials,
};