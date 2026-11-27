// Search-targeted landing pages (one page per search term we want to rank for).
// Each page is written around ONE main search phrase — keep it in the title,
// h1, description and first paragraph if you edit the copy.
//
// To add a page: add an entry here. Industry pages appear automatically at
// /industries/<slug>; the Pune page has its own route at /erp-software-pune.

export type LandingPage = {
  slug: string;
  /** short label for nav, breadcrumbs and cross-links */
  name: string;
  /** the main search phrase this page targets */
  keyword: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  highlight: string;
  intro: string;
  /** "Sound familiar?" — problems this audience searches about */
  painPoints: { title: string; text: string }[];
  /** what the ERP covers for this audience */
  features: { title: string; text: string; points: string[] }[];
  /** keyword-rich explainer paragraph(s) */
  explainerTitle: string;
  explainer: string[];
  /** matches caseStudies[].industry (case-insensitive) to show a related story */
  caseStudyIndustry?: string;
  faqs: { q: string; a: string }[];
  extraKeywords: string[];
};

export const INDUSTRY_PAGES: LandingPage[] = [
  {
    slug: "textile-erp",
    name: "Textile ERP",
    keyword: "ERP for textile industry",
    metaTitle: "ERP Software for Textile Industry — Spinning, Weaving & Garments",
    metaDescription:
      "Customised ERP software for the textile industry: lot-wise inventory, job work, production planning, GST e-invoicing and payroll for ginning, spinning, weaving and garment units in India.",
    eyebrow: "ERP for textile industry",
    title: "Textile ERP built around",
    highlight: "your mill, not a template.",
    intro:
      "From ginning and spinning to weaving, processing and garments, every textile unit tracks lots, counts, shades and job work differently. We build ERP for the textile industry that follows your exact process, so stock, production and billing finally match what is happening on the floor.",
    painPoints: [
      {
        title: "Lots and counts tracked in spreadsheets",
        text: "Yarn count, lot number, shade and bale details live in separate sheets, so nobody trusts the stock figure.",
      },
      {
        title: "Job work goes out and comes back blind",
        text: "Material sent for sizing, dyeing or stitching is hard to reconcile against what comes back, and wastage goes unmeasured.",
      },
      {
        title: "Multi-unit stock doesn't add up",
        text: "Each plant or godown keeps its own ledger, and month-end consolidation takes days.",
      },
      {
        title: "GST reconciliation eats the first week of the month",
        text: "Invoices, e-way bills and returns are prepared by hand from data that already exists somewhere else.",
      },
    ],
    features: [
      {
        title: "Lot-wise inventory",
        text: "Raw material to finished goods tracked by lot, count, shade and grade, across every godown.",
        points: ["Bale, cone and roll level tracking", "Multi-plant stock ledger", "Ageing and slow-moving reports"],
      },
      {
        title: "Production planning",
        text: "Sales-order-linked planning for each process stage, with machine and labour efficiency on one screen.",
        points: ["Process-wise work orders", "Machine utilisation", "Yield and wastage analysis"],
      },
      {
        title: "Job work management",
        text: "Outward and inward job work with challans, so material at every vendor is accounted for.",
        points: ["Job work challans", "Vendor-wise balance", "Process loss tracking"],
      },
      {
        title: "Billing, GST & e-invoicing",
        text: "GST-compliant invoices, e-invoicing and statutory reports generated from the same transactions.",
        points: ["E-invoice & e-way bill", "GST return reports", "Rate & margin analysis"],
      },
      {
        title: "Payroll for shift workers",
        text: "Biometric attendance flows straight into payroll, including piece-rate and shift calculations.",
        points: ["Biometric integration", "PF / ESI compliance", "Piece-rate & shift wages"],
      },
      {
        title: "Owner dashboards",
        text: "Live view of orders, production, stock and receivables for management, on desktop or mobile.",
        points: ["Daily MIS", "Deviation alerts", "Mobile access"],
      },
    ],
    explainerTitle: "Why generic ERP struggles in textiles",
    explainer: [
      "Textile businesses run on details that off-the-shelf ERP rarely models well: yarn counts, lot and shade matching, process losses at each stage, and a large share of work done outside the mill through job workers. When the software can't represent those details, teams fall back to spreadsheets and the ERP becomes a billing tool only.",
      "A textile ERP from JSS Innovative Solutions starts with mapping how material actually moves through your units — then we build the inventory, production, job work and billing modules around that map. The result is one system where the stock figure, the production report and the GST return all come from the same data.",
    ],
    caseStudyIndustry: "Textiles",
    faqs: [
      {
        q: "Which textile segments do you build ERP for?",
        a: "Ginning, spinning, weaving, processing and garment manufacturing units, as well as textile traders. Each build is customised to the stages your business actually runs.",
      },
      {
        q: "Can the ERP track material sent out for job work?",
        a: "Yes. Outward and inward job work is recorded with challans, so you can see the balance lying with every job worker and the process loss on each lot.",
      },
      {
        q: "Does it support GST e-invoicing and e-way bills?",
        a: "Yes. Billing is GST-compliant, with e-invoicing and statutory GST reports generated from the same sales and purchase transactions.",
      },
      {
        q: "We have more than one plant. Can stock be managed together?",
        a: "Yes. Stock is tracked per plant and godown, and consolidated into a single inventory ledger for management reporting.",
      },
    ],
    extraKeywords: ["textile ERP software", "ERP for spinning mill", "garment manufacturing ERP", "weaving ERP India"],
  },
  {
    slug: "sheet-metal-fabrication-erp",
    name: "Sheet Metal ERP",
    keyword: "ERP for sheet metal fabrication",
    metaTitle: "ERP Software for Sheet Metal & Fabrication Companies",
    metaDescription:
      "Customised ERP for sheet metal and fabrication shops: BOM and routing, job-wise costing, production planning, machine utilisation, inventory and GST billing — built around your shop floor.",
    eyebrow: "ERP for sheet metal fabrication",
    title: "Sheet metal & fabrication ERP that",
    highlight: "plans the floor for you.",
    intro:
      "Laser cutting, punching, bending, welding, powder coating — every job in a sheet metal and fabrication shop follows its own route. Our ERP for sheet metal fabrication links each sales order to its BOM, routing and machines, so you know what to run next, what each job really cost, and when it will ship.",
    painPoints: [
      {
        title: "Work orders planned on a whiteboard",
        text: "Scheduling lives in one person's head, and a single urgent order reshuffles the whole week.",
      },
      {
        title: "Machine idle time goes untracked",
        text: "You know the laser or press brake is busy — but not how much of the shift it actually ran.",
      },
      {
        title: "Job costing is a guess",
        text: "Sheet consumption, scrap, labour hours and outsourced coating are never added up per job.",
      },
      {
        title: "Customers chase you for delivery dates",
        text: "Without live order status, every follow-up call becomes a walk around the shop floor.",
      },
    ],
    features: [
      {
        title: "BOM & routing",
        text: "Multi-level bills of material and process routing for every part and assembly.",
        points: ["Multi-level BOM", "Process routing", "Revision control"],
      },
      {
        title: "Sales-order-linked planning",
        text: "Production plans generated from confirmed orders, with material and machine requirements.",
        points: ["Order-wise work orders", "Material requirement planning", "Priority rescheduling"],
      },
      {
        title: "Machine & labour efficiency",
        text: "Track run time, idle time and output per machine and operator, shift by shift.",
        points: ["Machine utilisation", "Operator efficiency", "Downtime reasons"],
      },
      {
        title: "Job-wise costing",
        text: "Actual material, scrap, labour and outsourced costs rolled up per job against the quoted price.",
        points: ["Sheet & scrap tracking", "Variance analysis", "Margin per job"],
      },
      {
        title: "Quality & deviations",
        text: "Inspection stages and deviation alerts so rework is caught before dispatch.",
        points: ["Stage-wise inspection", "Rejection tracking", "Deviation alerts"],
      },
      {
        title: "Inventory, billing & GST",
        text: "Raw material, WIP and finished goods stock with GST-compliant billing and dispatch.",
        points: ["Sheet & coil inventory", "E-invoice & e-way bill", "Dispatch tracking"],
      },
    ],
    explainerTitle: "What a fabrication shop needs from its ERP",
    explainer: [
      "Sheet metal and fabrication work is high-mix and order-driven: the same machines run dozens of different parts a week, each with its own routing and sheet nesting. Generic ERP treats production as a single step, so planning, costing and delivery commitments all end up back in spreadsheets.",
      "We build ERP for sheet metal fabrication around your actual routings and machines. Sales orders drive work orders, machines report what they ran, and every job carries its real cost — so you can quote with confidence and give customers a delivery date you'll keep.",
    ],
    caseStudyIndustry: "Manufacturing",
    faqs: [
      {
        q: "Can the ERP handle multi-level BOMs for assemblies?",
        a: "Yes. Parts, sub-assemblies and final assemblies can each have their own BOM and routing, and requirements roll up from the sales order.",
      },
      {
        q: "Can we see machine utilisation on the shop floor?",
        a: "Yes. Machine run time, idle time and output can be recorded per shift, and with IIoT integration it can be captured directly from the machines.",
      },
      {
        q: "Will it show the actual cost of each job?",
        a: "Yes. Material, scrap, labour and outsourced process costs are collected against each job so you can compare actual cost with the quoted price.",
      },
      {
        q: "Is the system customised to our processes?",
        a: "Every build starts with mapping your process — routings, approvals and reports are built around how your shop runs rather than a fixed template.",
      },
    ],
    extraKeywords: ["fabrication ERP software", "sheet metal ERP India", "job shop ERP", "production planning software for fabrication"],
  },
  {
    slug: "forging-erp",
    name: "Forging ERP",
    keyword: "ERP for forging industry",
    metaTitle: "ERP Software for Forging Industry — Hot & Cold Forging",
    metaDescription:
      "ERP for the forging industry: heat-number traceability, die management, yield and burning-loss tracking, production planning, quality and GST billing for hot and cold forging units.",
    eyebrow: "ERP for forging industry",
    title: "Forging ERP with traceability",
    highlight: "from billet to dispatch.",
    intro:
      "In forging, every component has to be traced back to its heat number, and every kilo lost to scale, flash and machining eats margin. Our ERP for the forging industry tracks material, dies, yield and quality through each stage — so traceability reports and true cost per piece are always one click away.",
    painPoints: [
      {
        title: "Heat-number traceability is manual",
        text: "When a customer asks which heat a batch came from, someone has to dig through registers.",
      },
      {
        title: "Yield and burning loss aren't measured",
        text: "Input weight versus finished weight is rarely tracked per job, so losses stay hidden.",
      },
      {
        title: "Die life is managed from memory",
        text: "No record of strokes per die means unplanned die failures and stoppages.",
      },
      {
        title: "Quality records sit in separate files",
        text: "Inspection, heat-treatment and rejection data can't be pulled together for audits.",
      },
    ],
    features: [
      {
        title: "Heat-number traceability",
        text: "Raw material heat numbers carried through cutting, forging, heat treatment and machining to dispatch.",
        points: ["Heat-wise stock", "Batch genealogy", "Traceability reports"],
      },
      {
        title: "Yield & loss tracking",
        text: "Input and output weights at each stage to measure burning loss, flash and machining loss.",
        points: ["Stage-wise weight", "Yield per job", "Loss analysis"],
      },
      {
        title: "Die management",
        text: "Die register with strokes, maintenance history and life alerts.",
        points: ["Die-wise strokes", "Maintenance schedule", "Die life alerts"],
      },
      {
        title: "Production planning",
        text: "Order-linked planning across hammers and presses, heat treatment and machining.",
        points: ["Hammer & press scheduling", "Outsourced process tracking", "WIP visibility"],
      },
      {
        title: "Quality management",
        text: "Inspection plans, heat-treatment records and rejection analysis in one place.",
        points: ["Inspection records", "Rejection & rework", "Audit-ready reports"],
      },
      {
        title: "Billing, GST & payroll",
        text: "GST-compliant billing plus biometric attendance and statutory payroll for your workforce.",
        points: ["E-invoice & e-way bill", "PF / ESI payroll", "Shift-wise attendance"],
      },
    ],
    explainerTitle: "Why forging units need more than accounting software",
    explainer: [
      "Forging margins depend on things accounting software never sees: how much steel turns into scale and flash, how many strokes a die has left, and whether every part can be traced to its heat number. Hot and cold forging units that run on registers and spreadsheets lose both money and audit readiness.",
      "JSS Innovative Solutions builds ERP for the forging industry around your stages — cutting, forging, trimming, heat treatment and machining — so traceability, yield and quality are recorded as work happens, not reconstructed afterwards.",
    ],
    faqs: [
      {
        q: "Does the ERP support heat-number traceability?",
        a: "Yes. Heat numbers are recorded at material inward and carried through every production stage, so any dispatched batch can be traced back to its raw material.",
      },
      {
        q: "Can we measure burning loss and yield per job?",
        a: "Yes. Input and output weights are captured at each stage, giving yield and loss figures per job, part and period.",
      },
      {
        q: "Is it suitable for both hot and cold forging?",
        a: "Yes. The stages and reports are configured to your process, whether you run hot forging, cold forging or both.",
      },
      {
        q: "Can it track outsourced heat treatment or machining?",
        a: "Yes. Material sent out for outsourced processes is tracked with challans, and returns are matched back to the original job.",
      },
    ],
    extraKeywords: ["forging ERP software", "cold forging ERP", "forging industry software India", "heat number traceability software"],
  },
];

export const PUNE_PAGE: LandingPage = {
  slug: "erp-software-pune",
  name: "ERP Software in Pune",
  keyword: "ERP software in Pune",
  metaTitle: "ERP Software Company in Pune — Customised ERP for Manufacturers",
  metaDescription:
    "Pune-based ERP software company building customised ERP, HRMS, CRM and IoT solutions for manufacturers across Pune, Pimpri-Chinchwad, Bhosari and Chakan. Talk to our local team for a demo.",
  eyebrow: "ERP software in Pune",
  title: "ERP software company in Pune,",
  highlight: "on your floor in person.",
  intro:
    "JSS Innovative Solutions is an ERP software company based in Dighi, Pune. We design, build and implement customised ERP, HRMS and CRM for manufacturers across Pune and Pimpri-Chinchwad — with a local team that visits your plant, maps your process and supports you after go-live.",
  painPoints: [
    {
      title: "Your vendor is a phone number in another city",
      text: "Remote-only support means every change request waits in a queue and nobody understands your floor.",
    },
    {
      title: "The software was configured, not customised",
      text: "Your team works around the ERP instead of the ERP working around your process.",
    },
    {
      title: "Data lives in Tally, Excel and WhatsApp",
      text: "Stock, production and sales are in different places, so reports are always a day late.",
    },
    {
      title: "Payroll and attendance are a monthly fire drill",
      text: "Biometric data is exported, cleaned and re-typed before salaries can be processed.",
    },
  ],
  features: [
    {
      title: "Customised ERP",
      text: "Inventory, production, purchase, sales and accounts built around how your plant runs.",
      points: ["Inventory & warehouse", "Production planning", "Financial accounting"],
    },
    {
      title: "HRMS & payroll",
      text: "Biometric attendance, statutory payroll and employee self-service in one system.",
      points: ["Biometric attendance", "PF / ESI compliance", "Leave management"],
    },
    {
      title: "CRM & sales",
      text: "Leads, quotations, orders and follow-ups in one pipeline linked to the ERP.",
      points: ["Lead tracking", "Quotation & order management", "Sales analytics"],
    },
    {
      title: "GST billing & e-invoicing",
      text: "GST-compliant invoices, e-invoicing and e-way bills generated from your transactions.",
      points: ["E-invoice", "E-way bill", "GST reports"],
    },
    {
      title: "IIoT for the shop floor",
      text: "Machine data from PLCs and sensors flowing straight into your production reports.",
      points: ["Machine uptime", "OEE dashboards", "Energy monitoring"],
    },
    {
      title: "Local implementation team",
      text: "Discovery, training and go-live support delivered on-site by our Pune team.",
      points: ["On-site process mapping", "Floor-level training", "Post go-live support"],
    },
  ],
  explainerTitle: "Why manufacturers in Pune choose a local ERP partner",
  explainer: [
    "Pune's industrial belt — Bhosari, Pimpri-Chinchwad, Chakan, Talegaon and beyond — is full of manufacturers whose processes don't fit a standard ERP template. Auto components, fabrication, forging, moulding and textiles all need software that understands their floor.",
    "As a Pune-based ERP software company, we can sit with your team on site, map your process before proposing a product, and stay close after go-live. That is the difference between an ERP that gets used every day and one that gets abandoned after six months.",
  ],
  faqs: [
    {
      q: "Where is JSS Innovative Solutions located?",
      a: "Our office is in Dighi, Pune, Maharashtra. We work with manufacturers across Pune and Pimpri-Chinchwad and serve clients across India.",
    },
    {
      q: "Do you visit our plant for implementation?",
      a: "Yes. Every engagement starts with discovery and process mapping on your premises, followed by on-site training before go-live.",
    },
    {
      q: "Which industries do you build ERP for?",
      a: "Textiles, sheet metal and fabrication, machining, injection and rubber moulding, forging, electronics, food processing, distributors and more.",
    },
    {
      q: "Can you customise the ERP to our processes?",
      a: "Yes — customisation is the core of what we do. Modules, workflows and reports are built around how your business actually runs.",
    },
  ],
  extraKeywords: [
    "ERP company in Pune",
    "ERP software Pimpri Chinchwad",
    "ERP implementation Pune",
    "custom ERP software Pune",
    "manufacturing ERP Pune",
  ],
};

export const ALL_LANDING_PAGES = [...INDUSTRY_PAGES, PUNE_PAGE];

export function landingPath(page: LandingPage) {
  return page.slug === PUNE_PAGE.slug ? `/${PUNE_PAGE.slug}` : `/industries/${page.slug}`;
}
