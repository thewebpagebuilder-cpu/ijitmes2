export const SITE = {
  name: "IJITMES",
  fullName:
    "International Journal of Innovative Technologies and Modern Trends in Engineering and Science",
  shortName: "Int. J. Innov. Technol. Mod. Trends Eng. Sci.",
  email: "editor@ijitmes.com",
  address: "Mahalaxmi Temple, Pimpalgoan Khamb, Nashik, Maharashtra, India",
  established: "2025",
  feeINR: "₹449",
  feeUSD: "$17",
  currentVolume: 2,
  currentIssue: 2,
  currentIssueLabel: "Volume 2 · Issue 2",
  currentIssuePeriod: "February 2026",
  url: "https://www.ijitmes.com",
} as const;

export const DOMAINS = [
  { id: "computer-engineering", name: "Computer Engineering", count: 52, image: "/images/live/computer.jpg" },
  { id: "civil-engineering", name: "Civil Engineering", count: 52, image: "/images/live/civil.jpg" },
  { id: "electrical-engineering", name: "Electrical Engineering", count: 44, image: "/images/live/electrical.webp" },
  { id: "artificial-intelligence", name: "Artificial Intelligence", count: 44, image: "/images/live/ai.jpg" },
  { id: "mechanical-engineering", name: "Mechanical Engineering", count: 37, image: "/images/live/mechanical.jpg" },
  { id: "science", name: "Science & Applied Sciences", count: 37, image: "/images/live/science.jpg" },
  { id: "electronics-telecommunication", name: "Electronics & Telecommunication", count: 34, image: "/images/live/electronics.jpg" },
  { id: "information-technology", name: "Information Technology", count: 34, image: "/images/live/it.jpg" },
] as const;

/* Photo strip — a mix of the live site's own imagery and editorial stock photography */
export const GALLERY_ROWS: [
  { src: string; alt: string; caption: string; remote?: boolean }[],
  { src: string; alt: string; caption: string; remote?: boolean }[],
] = [
  [
    { src: "/images/live/about.jpg", alt: "Researchers collaborating", caption: "Peer review by subject experts" },
    { src: "https://images.pexels.com/photos/3861457/pexels-photo-3861457.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", alt: "Scientist in a modern laboratory", caption: "Applied sciences & materials research", remote: true },
    { src: "/images/live/civil.jpg", alt: "Civil engineering project", caption: "Civil & structural engineering" },
    { src: "https://images.pexels.com/photos/8439001/pexels-photo-8439001.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", alt: "Scientists testing a robotic arm", caption: "Robotics & automation", remote: true },
    { src: "/images/live/ai.jpg", alt: "Artificial intelligence research", caption: "Artificial intelligence & machine learning" },
    { src: "https://images.pexels.com/photos/8851447/pexels-photo-8851447.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", alt: "Researcher working on a computer in a lab", caption: "Computational modelling & simulation", remote: true },
  ],
  [
    { src: "/images/live/current-issue.jpg", alt: "Current issue of IJITMES", caption: "Monthly issues — 12 per year" },
    { src: "https://images.pexels.com/photos/4031524/pexels-photo-4031524.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", alt: "Researchers discussing data", caption: "Interdisciplinary collaboration", remote: true },
    { src: "/images/live/electronics.jpg", alt: "Electronics engineering", caption: "Electronics & telecommunication" },
    { src: "https://images.pexels.com/photos/8533134/pexels-photo-8533134.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", alt: "Scientists analysing samples", caption: "Environmental & sustainable technology", remote: true },
    { src: "/images/live/it.jpg", alt: "Information technology", caption: "Information technology & networks" },
    { src: "https://images.pexels.com/photos/19895787/pexels-photo-19895787.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", alt: "Engineer in a modern laboratory", caption: "Smart systems & nanotechnology", remote: true },
  ],
];

export const PUBLICATION_STEPS = [
  {
    step: "01",
    title: "Submit Manuscript",
    time: "10 minutes",
    body: "Upload your .docx manuscript through the online submission portal. You receive a unique Paper ID instantly.",
  },
  {
    step: "02",
    title: "Screening & Peer Review",
    time: "7–8 hours",
    body: "Plagiarism screening followed by evaluation from subject reviewers. The acceptance decision is emailed to you.",
  },
  {
    step: "03",
    title: "Processing Fee",
    time: "Secure payment",
    body: "Pay the publication charge of ₹449 (Indian authors) or $17 (international authors) via UPI, cards or PayPal.",
  },
  {
    step: "04",
    title: "Online Publication",
    time: "3–4 hours",
    body: "Your paper is typeset, assigned a Published Paper ID and released in the current issue with e-certificates.",
  },
] as const;

export const MAIN_NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Current Issue", href: "/issues" },
  { label: "Charges", href: "/charges" },
  { label: "Contact", href: "/contact" },
] as const;

export const AUTHOR_LINKS = [
  { label: "How to Publish", href: "/how-to-publish", description: "A step-by-step guide from draft to publication" },
  { label: "Author Guidelines", href: "/guidelines", description: "Formatting, ethics and submission requirements" },
  { label: "Submit Manuscript", href: "/submit", description: "Start a new submission and receive a Paper ID" },
  { label: "Track Manuscript", href: "/track", description: "Follow your paper through the review pipeline" },
] as const;

export function paperIdFromSerial(serial: number, year: number) {
  return `IJITMES-${year}-${String(serial).padStart(4, "0")}`;
}
