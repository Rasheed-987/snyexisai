export interface JobListing {
  id: string;
  title: string;
  location: string;
  company: string;
  type: string;
  description: string;
  salary?: string;
  experience?: string;
  remote?: boolean;
  overview: string;
  responsibilities: string[];
  requirements: string[];
  qualifications: string[];
  benefits: string[];
  applicationDeadline?: string;
  department?: string;
}

export const jobListings: JobListing[] = [
  {
    id: '01',
    title: 'Software Engineer',
    location: '4140 Parker Rd, Allentown, New Mexico 31134',
    company: 'Human Capital',
    type: 'Full Time',
    salary: '$80,000 - $120,000',
    experience: '2-4 years',
    remote: true,
    department: 'Engineering',
    description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    overview: 'We are looking for an enthusiastic and detail-oriented Software Engineer to support our development team in driving innovative solutions for our clients. This entry-level role is ideal for someone with foundational programming knowledge who\'s eager to learn, grow, and make a measurable impact on software development.',
    responsibilities: [
      'Design, develop, and maintain scalable web applications using modern frameworks',
      'Collaborate with cross-functional teams to define, design, and ship new features',
      'Write clean, maintainable, and efficient code following best practices',
      'Participate in code reviews and contribute to technical documentation',
      'Debug and resolve technical issues across development and production environments',
      'Stay up-to-date with emerging technologies and industry trends'
    ],
    requirements: [
      'Bachelor\'s degree in Computer Science, Software Engineering, or related field',
      '2-4 years of experience in software development',
      'Proficiency in JavaScript, TypeScript, and modern web frameworks (React, Next.js)',
      'Experience with version control systems (Git)',
      'Understanding of RESTful APIs and database design',
      'Strong problem-solving skills and attention to detail'
    ],
    qualifications: [
      'Experience with cloud platforms (AWS, Azure, or GCP)',
      'Knowledge of containerization technologies (Docker, Kubernetes)',
      'Familiarity with CI/CD pipelines',
      'Experience with testing frameworks and methodologies',
      'Understanding of agile development methodologies'
    ],
    benefits: [
      'Competitive salary and performance bonuses',
      'Comprehensive health, dental, and vision insurance',
      'Flexible work arrangements and remote work options',
      '401(k) with company matching',
      'Professional development opportunities and conference attendance',
      'Generous paid time off and holiday schedule'
    ],
    applicationDeadline: '2025-10-15'
  },
  {
    id: '02',
    title: 'UI/UX Designer',
    location: '4140 Parker Rd, Allentown, New Mexico 31134',
    company: 'Human Capital',
    type: 'Full Time',
    salary: '$70,000 - $95,000',
    experience: '3-5 years',
    remote: false,
    department: 'Design',
    description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    overview: 'We are seeking a creative and user-focused UI/UX Designer to join our design team. You will be responsible for creating intuitive and engaging user experiences across our digital products.',
    responsibilities: [
      'Create wireframes, prototypes, and high-fidelity designs for web and mobile applications',
      'Conduct user research and usability testing to inform design decisions',
      'Collaborate with product managers and developers to ensure design feasibility',
      'Maintain and evolve our design system and component library',
      'Present design concepts and rationale to stakeholders',
      'Stay current with design trends and best practices'
    ],
    requirements: [
      'Bachelor\'s degree in Design, HCI, or related field',
      '3-5 years of UI/UX design experience',
      'Proficiency in design tools (Figma, Sketch, Adobe Creative Suite)',
      'Strong portfolio demonstrating user-centered design process',
      'Understanding of responsive design principles',
      'Excellent communication and collaboration skills'
    ],
    qualifications: [
      'Experience with prototyping tools (Framer, Principle)',
      'Knowledge of HTML/CSS and design systems',
      'Experience with user research methodologies',
      'Familiarity with accessibility standards (WCAG)',
      'Motion design and animation skills'
    ],
    benefits: [
      'Competitive salary and design tool allowances',
      'Health and wellness benefits package',
      'Flexible work hours and hybrid options',
      'Creative workspace and design resources',
      'Professional development and conference budget',
      'Team building events and company retreats'
    ],
    applicationDeadline: '2025-10-20'
  },
  {
    id: '03',
    title: 'Java Developer',
    location: '4140 Parker Rd, Allentown, New Mexico 31134',
    company: 'Human Capital',
    type: 'Full Time',
    salary: '$75,000 - $110,000',
    experience: '2-6 years',
    remote: true,
    department: 'Backend Development',
    description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    overview: 'Join our backend development team as a Java Developer where you\'ll build robust, scalable server-side applications that power our core business systems.',
    responsibilities: [
      'Develop and maintain Java-based backend services and APIs',
      'Design and implement database schemas and queries',
      'Optimize application performance and scalability',
      'Write comprehensive unit and integration tests',
      'Collaborate with frontend developers on API integration',
      'Participate in system architecture discussions and decisions'
    ],
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '2-6 years of Java development experience',
      'Strong knowledge of Spring Framework and Spring Boot',
      'Experience with relational databases (PostgreSQL, MySQL)',
      'Understanding of RESTful web services and API design',
      'Familiarity with version control and CI/CD processes'
    ],
    qualifications: [
      'Experience with microservices architecture',
      'Knowledge of message queues (RabbitMQ, Kafka)',
      'Familiarity with NoSQL databases (MongoDB, Redis)',
      'Experience with containerization and orchestration',
      'Understanding of security best practices'
    ],
    benefits: [
      'Competitive compensation with equity options',
      'Comprehensive benefits package',
      'Remote-first work culture',
      'Learning and development stipend',
      'Top-tier hardware and development tools',
      'Flexible PTO and sabbatical options'
    ],
    applicationDeadline: '2025-11-01'
  }
];

export function getJobById(id: string): JobListing | undefined {
  return jobListings.find(job => job.id === id);
}

export function getAllJobIds(): string[] {
  return jobListings.map(job => job.id);
}