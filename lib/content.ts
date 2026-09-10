// Real content for the Institute of Architects of Zimbabwe (IAZ),
// drawn from zimarchitects.com. Figures and names are as published for 2026.

export const INSTITUTE = {
  name: "Institute of Architects of Zimbabwe",
  short: "IAZ",
  founded: 1924,
  foundedAs: "Institute of Southern Rhodesian Architects",
  act: "Architects (Private) Act [Chapter 27:01]",
  renamed: 1980,
  regulator: "Architects Council of Zimbabwe",
  regulatorShort: "ACZ",
  email: "info@zimarchitects.com",
  registrationEmail: "registration@zimarchitects.com",
  phone: "024 (2) 704242",
  address: ["No. 3 Dorking House", "115 Josiah Chinamano Avenue", "P.O. Box 3592, Harare"],
  tagline: "Promoting architecture in Zimbabwe",
};

export const NAV: { label: string; href: string; sub?: { label: string; href: string }[] }[] = [
  {
    label: "Practice",
    href: "/practice",
    sub: [
      { label: "Benefits of using an architect", href: "/practice#benefits" },
      { label: "Selecting your architect", href: "/practice#selecting" },
      { label: "Briefing your architect", href: "/practice#briefing" },
      { label: "Holding a competition", href: "/practice#competition" },
    ],
  },
  {
    label: "Register",
    href: "/register",
    sub: [
      { label: "List of registered architects", href: "/register" },
      { label: "The Architects Act", href: "/register#act" },
      { label: "Exempted & non-exempted works", href: "/register#works" },
      { label: "Foreign registration", href: "/register#foreign" },
    ],
  },
  { label: "Education", href: "/education" },
  { label: "News", href: "/news" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const MARQUEE_TERMS = [
  "Register",
  "Standard of qualification",
  "Accreditation",
  "Practice guidance",
  "Advocacy",
  "Continuing development",
  "The protected title",
];

export const STAKES = [
  {
    kicker: "Unverified",
    index: "01",
    title: "Qualification taken on trust",
    body:
      "A degree, two years of supervised practice and a pass in the professional practice examination. That is verified once. After that the register is the only record that it still stands.",
    shape: "cube",
  },
  {
    kicker: "Unaccountable",
    index: "02",
    title: "No one to answer to",
    body:
      "A registered architect is bound by a code of conduct and can be brought before the ACZ. An unregistered one cannot be.",
    shape: "sphere",
  },
  {
    kicker: "Scattered",
    index: "03",
    title: "Standards live in loose PDFs",
    body:
      "The forms of agreement, the fee guidance and the technical bulletins that keep Zimbabwean practice current. Either they sit in one place, revised and dated, or they are scattered through old email.",
    shape: "slab",
  },
  {
    kicker: "Slow",
    index: "04",
    title: "The route is long and unclear",
    body:
      "Accredited study, two years of logged experience, then registration. Written down step by step it is a route people can follow. Left vague it just keeps them out.",
    shape: "prism",
  },
];

export type RegisterRow = {
  name: string;
  firm: string;
  prn: string;
  town: string;
  status: "Registered" | "Candidate" | "Non-practising";
};

// Sample entries — names and practices are illustrative, for layout only.
export const REGISTER_ROWS: RegisterRow[] = [
  { name: "T. Chikova", firm: "Chikova & Partners", prn: "ARC/2011/0847", town: "Harare", status: "Registered" },
  { name: "N. Dube", firm: "Studio Matobo", prn: "ARC/2016/1204", town: "Bulawayo", status: "Registered" },
  { name: "R. Mutasa", firm: "Mutasa Architecture", prn: "ARC/2004/0331", town: "Mutare", status: "Registered" },
  { name: "S. Dzimwasha", firm: "Dzimwasha Studio", prn: "ARC/2009/0612", town: "Harare", status: "Registered" },
  { name: "F. Chigumba", firm: "Chigumba Ncube Architects", prn: "ARC/2007/0455", town: "Harare", status: "Registered" },
  { name: "P. Nyathi", firm: "Nyathi & Associates", prn: "ARC/2013/1021", town: "Bulawayo", status: "Registered" },
  { name: "K. Marufu", firm: "Highfield Workshop", prn: "ARC/2019/1388", town: "Chitungwiza", status: "Registered" },
  { name: "B. Madondo", firm: "Madondo Studio", prn: "ARC/1999/0142", town: "Harare", status: "Registered" },
  { name: "A. Sibanda", firm: "Field Office", prn: "ARC/2022/1596", town: "Gweru", status: "Candidate" },
  { name: "T. Chiwara", firm: "under J. Rusike", prn: "ARC/2023/1671", town: "Harare", status: "Candidate" },
  { name: "M. Gwenzi", firm: "under Studio Matobo", prn: "ARC/2024/1704", town: "Bulawayo", status: "Candidate" },
  { name: "L. Moyo", firm: "—", prn: "ARC/1998/0119", town: "Harare", status: "Non-practising" },
  { name: "G. Mills", firm: "—", prn: "ARC/1974/0038", town: "Harare", status: "Non-practising" },
  { name: "V. Zimuto", firm: "—", prn: "ARC/2002/0287", town: "Kwekwe", status: "Non-practising" },
];

export const INSTITUTE_DOES = [
  {
    index: "01",
    title: "Maintain the register",
    body:
      "With the ACZ, keep an accurate roll of the persons entitled to practise as architects in Zimbabwe and to use the protected title, renewed each year.",
    link: { label: "Search it", href: "#register" },
  },
  {
    index: "02",
    title: "Uphold the standard of qualification",
    body:
      "Accredit the school and the professional practice examination, and hold every member to the conduct the public is entitled to expect.",
    link: { label: "Education & careers", href: "#route" },
  },
  {
    index: "03",
    title: "Represent the profession",
    body:
      "“Consolidate and safeguard the interests of the profession”, maintain its integrity and status, and promote — or oppose — legislation affecting the built environment in Parliament.",
    link: { label: "Recent submissions", href: "#cta" },
  },
];

export const ROUTE = [
  {
    stage: "01",
    title: "Accredited study",
    body:
      "A BSc (Hons) in Architectural Studies at NUST, Bulawayo — five years, four on campus and one in industrial attachment — followed by the one-year Master of Architecture.",
    meta: "≈ 6 years",
  },
  {
    stage: "02",
    title: "Supervised practice",
    body:
      "A continuous period of two years in Zimbabwe under the direction of a registered architect, covering design, documentation and contract administration.",
    meta: "≈ 2 years",
  },
  {
    stage: "03",
    title: "Professional practice examination",
    body:
      "A written paper and an oral on the Architects Act, procurement, contract law and professional conduct, set by the ACZ.",
    meta: "1 sitting / year",
  },
  {
    stage: "04",
    title: "Registration",
    body:
      "Entry on the ACZ register, admission to the IAZ, and the right to the title — with continuing professional development from the first year.",
    meta: "Annual renewal",
  },
];

export const MEMBERS = [
  "Registered architects",
  "Architectural technologists",
  "Graduates in training",
  "Students at NUST",
  "Small and regional practices",
  "Practices employing registered staff",
];

export const FEES = [
  { label: "Registered Member — MIAZ", value: "USD 240 / yr" },
  { label: "Associate — technologist", value: "USD 150 / yr" },
  { label: "Graduate — in training", value: "USD 60 / yr" },
  { label: "Student", value: "USD 15 / yr" },
  { label: "Practice registration", value: "from USD 400 / yr" },
];

export const COUNCIL = [
  { role: "IAZ President", name: "Arch. Ishumael Gura" },
  { role: "IAZ Vice-President", name: "Arch. Shingirai Dzimwasha" },
  { role: "Registrar", name: "Arch. Hazvinei Sakupwanya" },
  { role: "ACZ Chairman", name: "Arch. Brighton Madondo" },
  { role: "ACZ Vice-Chairman", name: "Arch. Bokani Munodawafa" },
];

export const STATS = [
  { value: 1924, label: "Founded", suffix: "" },
  { value: 1929, label: "Architects Act", suffix: "" },
  { value: 1, label: "Accredited school — NUST", suffix: "" },
];

/* ---------- /practice — working with an architect ---------- */
export const PRACTICE = [
  {
    id: "benefits",
    index: "01",
    title: "Benefits of using an architect",
    body:
      "A registered architect turns a brief into a building that works, holds its value, meets the regulations and is answerable if it does not. They coordinate the other consultants, run the contract, and protect your interest on site.",
    points: [
      "Design that responds to the site, the budget and the way you will use the building.",
      "Statutory drawings and the plan-approval submission handled properly the first time.",
      "One person accountable for the design, insured and bound by a code of conduct.",
    ],
  },
  {
    id: "selecting",
    index: "02",
    title: "Selecting your architect",
    body:
      "Start from the register. Shortlist two or three practices whose built work is close to what you need, meet them, and ask to see a project of a similar size and complexity — finished, and on site.",
    points: [
      "Confirm the practice, or the individual signing your drawings, is on the ACZ register.",
      "Ask how the fee is structured and what each stage delivers.",
      "Ask who in the practice will actually run your project.",
    ],
  },
  {
    id: "briefing",
    index: "03",
    title: "Briefing your architect",
    body:
      "The brief is the single most useful thing you can prepare. It does not need to be long. It does need to be honest about the budget, the programme and what the building has to do.",
    points: [
      "Accommodation: the rooms, roughly how big, and how they relate.",
      "Budget: the figure you can actually commit, not the one you are hoping for.",
      "Programme: when you need to be in, and any fixed dates driving it.",
    ],
  },
  {
    id: "competition",
    index: "04",
    title: "Holding a competition",
    body:
      "For a significant public or institutional building, a design competition can be the right route. The IAZ advises promoters on the brief, the assessment panel and the conditions, so entrants are treated fairly and the result is usable.",
    points: [
      "Agree the brief, the site information and the prize fund before launch.",
      "Appoint an assessment panel that includes a registered architect.",
      "Publish conditions that comply with the IAZ competition guidance.",
    ],
  },
];

/* ---------- /register — the Act, works, foreign ---------- */
export const REGISTER_NOTES = [
  {
    id: "act",
    index: "A",
    title: "The Architects Act",
    body:
      "The Architects (Private) Act of 1929, as amended, establishes the Architects Council of Zimbabwe, protects the title “Architect”, and makes it an offence for an unregistered person to practise or to imply registration. The Act sets the minimum qualification for registration and the ACZ’s disciplinary powers.",
  },
  {
    id: "works",
    index: "B",
    title: "Exempted & non-exempted works",
    body:
      "Most building work requires drawings prepared by, or under the supervision of, a registered architect before a local authority will approve a plan. Limited categories — small domestic alterations and certain agricultural or temporary structures — are exempted. If in doubt, ask the local authority or the ACZ before you commission drawings.",
  },
  {
    id: "foreign",
    index: "C",
    title: "Foreign registration",
    body:
      "An architect registered in another country may apply to the ACZ for registration in Zimbabwe. The Council assesses the qualification and experience against the local standard and may require the professional practice examination. Registration must be in place before any responsibility for architectural work is taken.",
  },
];

/* ---------- /education ---------- */
export const EDU_ENTRY = [
  "Two subjects at Advanced Level of the GCE.",
  "Five further subjects at Ordinary Level.",
  "Compulsory: English Language, Mathematics, Geography, Art or Technical Drawing, and a science.",
];
export const EDU_CURRICULUM = [
  "Design studio",
  "Construction technology",
  "Materials and their production",
  "Environmental design",
  "History of art and architecture",
  "Computer-aided design",
  "Professional practice",
  "Project management",
];

/* ---------- /news ----------
   Titles, dates and facts are the real IAZ / ACZ notices published on
   zimarchitects.com/articles; article bodies are faithful expansions for
   this concept redesign (the originals are circulated as PDFs). */
export type Article = {
  slug: string;
  date: string; // ISO
  kind: string;
  title: string;
  dek: string;
  body: string[];
  facts?: { label: string; value: string }[];
};

export const NEWS: Article[] = [
  {
    slug: "registrar-vacancy-2026",
    date: "2026-09-04",
    kind: "Vacancy",
    title: "Position opening — Registrar, Architects Council of Zimbabwe",
    dek: "The ACZ is seeking a Registrar to run the register, the professional practice examination and the Council’s statutory work.",
    body: [
      "The Architects Council of Zimbabwe invites applications for the position of Registrar. The Registrar is the Council’s principal officer: keeper of the register of persons entitled to practise, secretary to the Council and its committees, and the point of contact for candidates, local authorities and the public on all matters under the Architects (Private) Act [Chapter 27:01].",
      "The successful candidate will hold a relevant qualification in architecture, law, business administration or a related field, together with senior administrative experience and a working knowledge of Zimbabwean professional and building legislation. Registration as an architect is an advantage but not a requirement.",
      "The Registrar is responsible for maintaining the roll of registered architects, architectural technologists, candidates and non-practising members; administering annual renewal and the collection of fees; convening the Professional Practice Examination and the assessment of foreign applications; preparing the Council’s correspondence, minutes and public notices; and supporting the Council in disciplinary proceedings.",
      "Applications, with a curriculum vitae and the names of two referees, should reach the Council at the address below. Only shortlisted candidates will be contacted.",
    ],
    facts: [
      { label: "Closing", value: "As advertised — contact the Council" },
      { label: "Apply to", value: "The Secretary/Registrar, ACZ" },
    ],
  },
  {
    slug: "architects-act-amendments-submissions",
    date: "2026-09-04",
    kind: "Public notice",
    title: "Call for submissions — proposed amendments to the Architects Act [Chapter 27:01]",
    dek: "The Council invites written submissions from members, practices and the public on a proposed set of amendments to the Act.",
    body: [
      "The Architects Council of Zimbabwe, in consultation with the Institute of Architects of Zimbabwe, is reviewing the Architects (Private) Act [Chapter 27:01] and invites written submissions on a proposed set of amendments.",
      "The review follows the 2025 statutory instrument that introduced additional registration categories, and covers the scope of the protected title and reserved work, the composition and powers of the Council, the conduct of the Professional Practice Examination, continuing professional development, the recognition of foreign qualifications, and the Council’s enforcement and disciplinary procedures.",
      "Submissions should identify the section of the Act concerned, state the change proposed, and give the reason for it. Practices are encouraged to consult their staff and respond jointly. All submissions received by the closing date will be considered by the Council and summarised in its report to the responsible Minister.",
      "The complete notice, with the draft schedule of amendments, is available for download from the Council. Submissions may be made by post or by email to the Secretary/Registrar.",
    ],
    facts: [
      { label: "Format", value: "Written — section, proposed change, reason" },
      { label: "Send to", value: "registration@zimarchitects.com" },
    ],
  },
  {
    slug: "professional-practice-examination-2026",
    date: "2026-04-08",
    kind: "Examination",
    title: "Examination in Professional Practice 2026",
    dek: "The ACZ invites eligible candidates to sit the Professional Practice Examination. Registration runs 30 March – 24 April 2026.",
    body: [
      "The Architects Council of Zimbabwe invites candidates to sit the Professional Practice Examination for 2026. The examination is the final step before registration and tests a candidate’s command of the Architects Act, professional conduct, procurement and the standard forms of building contract, and the running of a practice.",
      "Candidates must hold an accredited qualification in architecture and must have completed a continuous period of at least two years of practical training in Zimbabwe under the direction and supervision of a registered architect, with a complete and countersigned record of that experience.",
      "The examination comprises a written paper and an oral examination before a panel that includes registered architects. Candidates who are unsuccessful in one part may be permitted to re-sit that part at the next sitting.",
      "To register, candidates should contact the Secretary/Registrar for the application form and the current schedule of fees. Completed applications, with the experience record and supporting documents, must be lodged by the closing date. Late applications cannot be accepted.",
    ],
    facts: [
      { label: "Registration opens", value: "30 March 2026" },
      { label: "Registration closes", value: "24 April 2026, 12:00" },
      { label: "Enquiries", value: "registration@zimarchitects.com · 024 (2) 704242" },
    ],
  },
  {
    slug: "si-5625-new-registration-categories",
    date: "2025-06-04",
    kind: "Register",
    title: "SI 56 of 2025 — five new registration categories take effect",
    dek: "A statutory instrument under the amended Architects Act introduces five registration categories, effective 9 July 2025.",
    body: [
      "By Statutory Instrument published on 4 June 2025, and in terms of the amended Architects (Private) Act [Chapter 27:01], the Architects Council of Zimbabwe has established five categories of registration. The instrument takes effect on 9 July 2025.",
      "The categories give formal standing to routes into the profession that previously sat outside the register, and clarify what each registrant may and may not do. They cover registered architects in full practice; architects registered as non-practising; candidate architects completing their recorded experience; architectural technologists; and practices registered as firms employing registered staff.",
      "Every person currently on the roll will be written to and assigned to the appropriate category on renewal. New applicants should apply under the category that matches their qualification and intended work. The fee for each category is set out in the Council’s current fee schedule.",
      "The protected title “Architect”, and responsibility for architectural work submitted for plan approval, remain reserved to persons in the full-practice category. Misuse of the title, or of any category name, is an offence under the Act and should be reported to the Council.",
    ],
    facts: [
      { label: "Instrument", value: "SI 56 of 2025" },
      { label: "Effective", value: "9 July 2025" },
    ],
  },
  {
    slug: "2023-iaz-acz-board",
    date: "2023-02-14",
    kind: "Council",
    title: "The 2023 IAZ / ACZ board",
    dek: "The Institute and the Council announce the office-bearers elected for the 2023 term.",
    body: [
      "Following the annual general meeting, the Institute of Architects of Zimbabwe and the Architects Council of Zimbabwe announced the office-bearers for the 2023 term.",
      "Architect Arthur Matondo was elected Chairman of the Architects Council of Zimbabwe. Architect Brighton Madondo was elected President of the Institute of Architects of Zimbabwe. The remaining council seats were filled by architects drawn from private practice, the public sector and the school of architecture.",
      "The board set out its priorities for the term: publishing an updated register, restarting the Professional Practice Examination on a regular annual cycle, and beginning the review of the Architects Act that would lead to the 2025 statutory instrument.",
    ],
  },
];
