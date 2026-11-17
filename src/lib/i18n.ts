export type Lang = "en" | "ar";

const en = {
  dir: "ltr",
  brand: "Writing Lab",
  nav: { pricing: "Pricing", compare: "Compare", sample: "Track Changes", process: "How it works", writing: "Writing Services", faq: "FAQ", quote: "Instant Quote", menu: "Menu", skip: "Skip to content" },
  settings: {
    title: "Display settings", open: "Display settings", theme: "Appearance", auto: "Auto", light: "Day", dark: "Night",
    fontSize: "Text size", sizes: { sm: "Small", md: "Default", lg: "Large", xl: "Extra large" },
    accent: "Colour scheme", colors: { cobalt: "Cobalt", violet: "Violet", teal: "Teal", rose: "Rose", amber: "Amber", slate: "Slate" },
    lang: "Language", reset: "Reset to defaults",
  },
  hero: {
    badge: "Native-speaker, PhD-qualified editors",
    h1: "Publication-ready English, edited by subject specialists",
    sub: "Every manuscript is edited by a native English speaker with a PhD in your field. Get a live price in seconds, track every change, and re-submit free.",
    points: ["Confidential: NDA available on request", "Tracked changes + editor comments", "Free sample edit before you commit"],
    sampleCta: "Get a free sample edit",
  },
  calc: {
    title: "Instant price calculator", tier: "Editing level", words: "Word count", wordsHint: "Count includes abstract, body and references",
    turn: "Turnaround", currency: "Currency", promo: "Promo code", promoApply: "Promo applied", promoBad: "Code not recognised",
    perWord: "per word", subtotal: "Subtotal", volume: "Volume discount", promoLine: "Promo discount", total: "Your price",
    delivery: "Delivered in about", hours: "hours", days: "days", save: "Save", cta: "Lock in this quote", note: "Final price is confirmed after we review your file. No payment is taken on this page.",
    popular: "Most popular", from: "from",
    turnLabels: { "24h": "24 hours", "7d": "7 days", "15d": "15 days" },
  },
  tiers: {
    standard: { name: "Standard Editing", tag: "Accurate, fast editing on a budget", desc: "A language editor from your subject area improves clarity and readability so your text is easy to understand and free of language errors. Includes free formatting." },
    premium: { name: "Premium Editing", tag: "Comprehensive editing & free re-editing", desc: "A senior editor from your field makes substantial improvements: correcting logic, structure and language, with detailed comments. Includes free formatting, free re-editing for 365 days and a free cover letter." },
    pro: { name: "Scientific Pro", tag: "For high-impact-factor journals", desc: "A senior editor plus a peer reviewer from your field strengthen the core science and novelty of your paper. Includes free re-editing, cover letter and response-to-reviewers editing after submission." },
  },
  planFeatures: {
    includes: { standard: "What's included:", premium: "Everything in Standard, plus:", pro: "Everything in Premium, plus:" },
    standard: ["Grammar, spelling & punctuation", "Clarity & readability", "Plagiarism check (similarity report)", "Free formatting to journal style", "Track Changes + clean copy", "Certificate of Editing", "NDA available", "30 days free re-editing"],
    premium: ["Logic, structure & flow", "Terminology consistency", "Detailed editor comments", "Human-voice rewrite", "Response-to-reviewers editing", "Free cover letter", "365 days free re-editing"],
    pro: ["Peer review by a subject expert", "Focus on high-impact journals", "Deeper review of core science and novelty"],
  },
  pricing: {
    wordsUnit: "words", compare: "Compare all features", controls: "Tailor your price",
    strip: {
      sample: { k: "Free", t: "Not sure yet?", d: "Send up to 500 words and get a free sample edit.", cta: "Get a free sample" },
      writing: { k: "Writing", t: "Need it written?", d: "Research papers, theses and more, written with you.", cta: "See writing services" },
      inst: { k: "Teams", t: "Universities & journals", d: "Bulk volumes and a dedicated editor team.", cta: "Contact us" },
    },
  },
  personas: {
    eyebrow: "Who it's for", title: "Built for researchers. Trusted by editors.",
    items: [
      { role: "For students", t: "Theses & dissertations", d: "Chapter-by-chapter editing so your argument reads clearly to your committee.", cta: "I'm a student" },
      { role: "For researchers", t: "Journal manuscripts", d: "Language and structure polished to your target journal's standards.", cta: "I'm a researcher" },
      { role: "For institutions", t: "Teams & journals", d: "Volume editing, consistent style and confidential handling.", cta: "I'm an institution" },
    ],
  },
  cta: { title: "Get your manuscript ready now", sub: "Edited by native-speaker, PhD-qualified specialists. Start with a free sample.", primary: "Get a free sample", secondary: "Get an instant quote", note: "No payment needed to start." },
  trust: {
    items: [
      { t: "NDA on request", d: "Signed non-disclosure agreement for every project" },
      { t: "Encrypted & private", d: "Files are protected in transit and access-controlled" },
      { t: "Journal-ready", d: "Edited to your target journal's language standards" },
      { t: "Specialist editors", d: "Native speakers, PhD-qualified, in your discipline" },
    ],
  },
  matrix: {
    title: "Compare editing levels", sub: "Pick the depth of editing that fits your manuscript and your target journal.",
    feature: "What's included", yes: "Included", no: "Not included", recommended: "Recommended",
    groups: [
      { g: "Language editing", rows: [
        { f: "Grammar, spelling & punctuation", v: [true, true, true] },
        { f: "Clarity & readability", v: [true, true, true] },
        { f: "Logic, structure & flow", v: [false, true, true] },
        { f: "Terminology consistency", v: [false, true, true] },
      ] },
      { g: "Integrity & quality", rows: [
        { f: "Plagiarism check (similarity report)", v: [true, true, true] },
        { f: "Human-voice rewrite (natural, human-edited style)", v: [false, true, true] },
      ] },
      { g: "Editor support", rows: [
        { f: "Detailed editor comments", v: [false, true, true] },
        { f: "Peer review by a subject expert", v: [false, false, true] },
        { f: "Response-to-reviewers editing", v: [false, true, true] },
      ] },
      { g: "Delivery & guarantees", rows: [
        { f: "Free formatting to journal style", v: [true, true, true] },
        { f: "Free cover letter", v: [false, true, true] },
        { f: "Free re-editing", v: ["30 days", "365 days", "365 days"] },
        { f: "Track Changes + clean copy", v: [true, true, true] },
        { f: "Certificate of Editing", v: [true, true, true] },
        { f: "NDA available", v: [true, true, true] },
      ] },
    ],
    cta: "Get a quote",
  },
  show: {
    title: "See exactly what we change", sub: "Real editing, shown the way you'll receive it: tracked changes in Word, with editor comments in the margin.",
    original: "Original", tracked: "Track Changes", clean: "Clean copy", comments: "Editor comments", hint: "Tap a highlighted change to read the editor's note.",
    noteLabel: "Editor's note", none: "Select a change to see the comment.",
  },
  live: { title: "Watch a sentence get edited", sub: "A loop of what happens inside your manuscript.", replay: "Live edit preview", before: "Before", after: "After" },
  flow: {
    title: "How it works", sub: "From upload to polished manuscript in four steps.",
    steps: [
      { t: "Get your quote", d: "Enter your word count and deadline. See the price instantly." },
      { t: "Submit your file", d: "Upload your .doc, .docx or .pdf securely, or send a free sample." },
      { t: "Expert editing", d: "A native-speaking, PhD-qualified specialist in your field edits it." },
      { t: "Receive & refine", d: "Get tracked changes, a clean copy and a Certificate of Editing." },
    ],
  },
  writing: {
    title: "Writing services in English", sub: "Beyond editing: our subject specialists can write with you, across every area of English-language academic work.",
    items: [
      { t: "Research paper writing", d: "Original, structured research papers written to your data, brief and target journal." },
      { t: "Thesis & dissertation writing", d: "Chapter-by-chapter support from proposal to final defence draft." },
      { t: "Literature reviews", d: "Systematic, critical and narrative reviews with a clear argument." },
      { t: "Abstracts & summaries", d: "Concise, keyword-optimised abstracts and executive summaries." },
      { t: "Proposals & grant writing", d: "Research proposals and funding applications that read persuasively." },
      { t: "Rewriting & paraphrasing", d: "Reworking text for clarity and originality while keeping your meaning." },
    ],
    cta: "Request a writing quote", note: "Delivered as your own work, kept confidential under NDA.",
  },
  sample: {
    title: "Try it free: send us a sample", sub: "Share up to 500 words and one of our editors will return a free sample edit, so you can judge the quality before you commit.",
    cta: "Get my free sample", perks: ["Up to 500 words", "Returned with tracked changes", "No payment, no obligation"],
  },
  testi: {
    title: "What researchers say", placeholder: "Sample reviews shown for design purposes. Replace with real testimonials before launch.",
    items: [
      { q: "The editor clearly understood my field. The comments taught me more than the corrections did.", n: "Dr. A. Rahman", r: "Biomedical sciences" },
      { q: "Fast turnaround and a polished thesis chapter. My supervisor noticed the difference immediately.", n: "S. Al-Harbi", r: "PhD candidate, Engineering" },
      { q: "Clear tracked changes and a thoughtful cover letter. The paper was accepted after one round.", n: "Prof. L. Moreau", r: "Social sciences" },
    ],
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      { q: "Who edits my manuscript?", a: "Every manuscript is edited by a native English speaker who holds a PhD and specialises in your subject area." },
      { q: "What is the difference between Standard, Premium and Scientific Pro?", a: "Standard corrects language and improves clarity. Premium also improves logic, structure and flow, adds detailed comments, response-to-reviewers editing, a cover letter and 365 days of free re-editing. Scientific Pro adds a subject-expert peer review of your paper's core science and novelty." },
      { q: "Is my manuscript confidential?", a: "Yes. We offer a signed non-disclosure agreement (NDA) on request, and your files are only accessible to your assigned editor and our project team." },
      { q: "Which file types can I upload?", a: "Word (.doc, .docx) and PDF files are accepted. Other formats can be sent on request." },
      { q: "How is the price calculated?", a: "Price = word count × the per-word rate for your editing level and turnaround, less any volume discount or promo code. There is no minimum order and no word cap." },
      { q: "How does the free sample work?", a: "Send up to 500 words through the free-sample form. An editor returns a tracked-changes sample so you can judge the quality before ordering." },
      { q: "Do you also write papers and theses?", a: "Yes. Our writing services cover research papers, theses, dissertations, literature reviews, abstracts and proposals in English." },
      { q: "What if I need more edits after delivery?", a: "Premium and Scientific Pro include free re-editing for 365 days; Standard includes 30 days." },
    ],
  },
  modal: {
    quoteTitle: "Lock in your quote", sampleTitle: "Get your free sample edit",
    quoteSub: "Share your details and manuscript. We'll confirm your quote within a few hours.", sampleSub: "Upload up to 500 words. No payment needed.",
    summary: "Your quote", name: "Full name", email: "Email address", whatsapp: "WhatsApp number (optional)", field: "Field / discipline",
    journal: "Target journal (optional)", deadline: "Deadline (optional)", file: "Manuscript file", fileHint: "DOC, DOCX or PDF, up to 25 MB", notes: "Notes for the editor (optional)",
    service: "Service", svcEdit: "English editing", svcWrite: "Writing service", consent: "I agree to the Terms and Privacy Policy.",
    submit: "Send my request", sending: "Sending…", close: "Close",
    errName: "Please enter your name.", errEmail: "Please enter a valid email address, e.g. name@example.com.", errFile: "Please attach a DOC, DOCX or PDF file under 25 MB.", errConsent: "Please tick the box to continue.",
    errServer: "We couldn't send your request. Please try again, or contact us on WhatsApp.",
    thanksTitle: "Thank you. We've got it!", thanksBody: "We've received your request and will email you shortly.", ref: "Your reference", whatsappCta: "Continue on WhatsApp", done: "Done",
  },
  footer: {
    tag: "English editing & writing services by native-speaker, PhD-qualified specialists.",
    services: "Services", company: "Company", contact: "Contact", legal: "Legal", terms: "Terms of Service", privacy: "Privacy Policy", refund: "Refund Policy",
    email: "Email", whatsapp: "WhatsApp", phone: "Phone", address: "Address", soon: "Coming soon", rights: "All rights reserved.", follow: "Follow us",
  },
  legal: {
    back: "Back to home", updated: "Last updated: November 2026",
    terms: {
      title: "Terms of Service",
      body: [
        { h: "1. Services", p: "Writing Lab provides English-language editing and academic writing services. By placing an order or submitting a file you agree to these terms." },
        { h: "2. Orders and pricing", p: "Prices are calculated from word count, editing level and turnaround, and are confirmed after we review your file. We may adjust a quote if the file differs materially from what was described." },
        { h: "3. Your content and ownership", p: "You retain full ownership of your manuscript and of all work delivered to you. You confirm that you have the right to submit the material to us." },
        { h: "4. Confidentiality", p: "We treat every manuscript as confidential and will sign a non-disclosure agreement on request. Files are accessible only to your assigned editor and our project staff." },
        { h: "5. Turnaround", p: "Delivery times begin once your file and payment are confirmed. We will tell you promptly if a deadline is at risk." },
        { h: "6. Free re-editing", p: "Free re-editing applies to the same manuscript for the period stated on your chosen service and covers changes of up to a reasonable extent, not substantially new content." },
        { h: "7. Academic integrity", p: "Our editing improves language and clarity; it does not alter your data or conclusions. Writing services are provided as drafting support and guidance, and you remain responsible for complying with your institution's and journal's policies." },
        { h: "8. Limitation of liability", p: "We do not guarantee acceptance by any journal or a particular grade. To the extent permitted by law, our liability is limited to the fee paid for the affected service." },
        { h: "9. Changes and contact", p: "We may update these terms from time to time. Questions can be sent through the contact details on our website." },
      ],
    },
    privacy: {
      title: "Privacy Policy",
      body: [
        { h: "1. What we collect", p: "We collect the details you provide in our forms (name, email, optional WhatsApp number, field, journal, deadline, notes) and the files you upload." },
        { h: "2. How we use it", p: "We use this information to prepare quotes, deliver services, communicate with you and improve our service. We do not sell your personal data." },
        { h: "3. Storage and security", p: "Uploaded files are stored in access-controlled cloud storage and transmitted over encrypted connections. Only your assigned editor and our project team can access them." },
        { h: "4. Sharing", p: "We share data only with service providers needed to run the service (for example email delivery and cloud storage), under appropriate safeguards, or when required by law." },
        { h: "5. Retention", p: "We keep project files only for as long as needed to deliver the service and any free re-editing period, then delete them unless you ask us to keep them." },
        { h: "6. Your rights", p: "You may request access to, correction of, or deletion of your personal data at any time by contacting us." },
        { h: "7. Cookies", p: "This site stores only your display preferences (language, theme, text size, colour) in your browser. We do not use advertising cookies." },
        { h: "8. Contact", p: "For privacy questions, please use the contact details on our website." },
      ],
    },
    refund: {
      title: "Refund Policy",
      body: [
        { h: "1. Before work begins", p: "If you cancel before an editor has started your project, you will receive a full refund." },
        { h: "2. After work begins", p: "If work has started, we refund the unused portion. Completed and delivered work is not refundable except as described below." },
        { h: "3. Quality concerns", p: "If you are unhappy with the quality of an edit, tell us within 7 days of delivery. We will re-edit at no charge, and if we cannot resolve the issue we will discuss a partial or full refund." },
        { h: "4. Late delivery", p: "If we miss the agreed turnaround without your agreement, you may request a refund of the express-delivery premium you paid." },
        { h: "5. Free samples", p: "Free samples carry no charge and no obligation." },
        { h: "6. How to request a refund", p: "Contact us with your reference number. Approved refunds are returned to the original payment method within 7–14 business days." },
      ],
    },
  },
};

const ar: typeof en = {
  dir: "rtl",
  brand: "Writing Lab",
  nav: { pricing: "الأسعار", compare: "المقارنة", sample: "تتبّع التعديلات", process: "كيف نعمل", writing: "خدمات الكتابة", faq: "الأسئلة الشائعة", quote: "عرض سعر فوري", menu: "القائمة", skip: "تخطَّ إلى المحتوى" },
  settings: {
    title: "إعدادات العرض", open: "إعدادات العرض", theme: "المظهر", auto: "تلقائي", light: "نهاري", dark: "ليلي",
    fontSize: "حجم الخط", sizes: { sm: "صغير", md: "افتراضي", lg: "كبير", xl: "كبير جدًا" },
    accent: "نظام الألوان", colors: { cobalt: "كوبالت", violet: "بنفسجي", teal: "فيروزي", rose: "وردي", amber: "كهرماني", slate: "رمادي" },
    lang: "اللغة", reset: "استعادة الإعدادات الافتراضية",
  },
  hero: {
    badge: "محرّرون ناطقون بالإنجليزية وحاصلون على الدكتوراه",
    h1: "إنجليزية جاهزة للنشر، يحرّرها متخصصون في مجالك",
    sub: "يحرّر كل بحث محرّر ناطق بالإنجليزية يحمل دكتوراه في تخصصك. احصل على السعر فورًا، وتتبّع كل تعديل، وأعد الإرسال مجانًا.",
    points: ["سرّية تامة: اتفاقية عدم إفصاح عند الطلب", "تتبّع التعديلات مع ملاحظات المحرّر", "عيّنة تحرير مجانية قبل الالتزام"],
    sampleCta: "احصل على عيّنة تحرير مجانية",
  },
  calc: {
    title: "حاسبة السعر الفورية", tier: "مستوى التحرير", words: "عدد الكلمات", wordsHint: "يشمل الملخص والمتن والمراجع",
    turn: "مدة التسليم", currency: "العملة", promo: "رمز الخصم", promoApply: "تم تطبيق الرمز", promoBad: "الرمز غير معروف",
    perWord: "للكلمة", subtotal: "المجموع الفرعي", volume: "خصم الكمية", promoLine: "خصم الرمز", total: "سعرك",
    delivery: "التسليم خلال نحو", hours: "ساعات", days: "أيام", save: "وفّر", cta: "ثبّت هذا السعر", note: "يتأكد السعر النهائي بعد مراجعة ملفك. لا يتم أي دفع في هذه الصفحة.",
    popular: "الأكثر طلبًا", from: "ابتداءً من",
    turnLabels: { "24h": "24 ساعة", "7d": "7 أيام", "15d": "15 يومًا" },
  },
  tiers: {
    standard: { name: "التحرير القياسي", tag: "تحرير دقيق وسريع بسعر مناسب", desc: "يحسّن محرّر لغوي من تخصصك وضوح النص وقابليته للقراءة ليكون سهل الفهم وخاليًا من الأخطاء اللغوية. يشمل التنسيق مجانًا." },
    premium: { name: "التحرير المتميز", tag: "تحرير شامل وإعادة تحرير مجانية", desc: "يجري محرّر أول من مجالك تحسينات جوهرية: تصحيح المنطق والبنية واللغة مع تعليقات مفصّلة. يشمل التنسيق وإعادة التحرير مجانًا لمدة 365 يومًا ورسالة تقديم مجانية." },
    pro: { name: "المحترف العلمي", tag: "للمجلات ذات معامل التأثير العالي", desc: "يعمل محرّر أول ومراجع أقران من مجالك على تقوية الجوهر العلمي وجِدّة بحثك. يشمل إعادة التحرير ورسالة التقديم وتحرير الرد على المحكّمين بعد التقديم." },
  },
  planFeatures: {
    includes: { standard: "ما يشمله:", premium: "كل ما في القياسي، بالإضافة إلى:", pro: "كل ما في المتميز، بالإضافة إلى:" },
    standard: ["القواعد والإملاء وعلامات الترقيم", "الوضوح وسهولة القراءة", "فحص الانتحال (تقرير التشابه)", "تنسيق مجاني وفق أسلوب المجلة", "تتبّع التعديلات + نسخة نظيفة", "شهادة تحرير", "اتفاقية عدم إفصاح متاحة", "إعادة تحرير مجانية 30 يومًا"],
    premium: ["المنطق والبنية والتسلسل", "اتساق المصطلحات", "تعليقات مفصّلة من المحرّر", "إعادة صياغة بأسلوب بشري طبيعي", "تحرير الرد على المحكّمين", "رسالة تقديم مجانية", "إعادة تحرير مجانية 365 يومًا"],
    pro: ["مراجعة أقران من خبير في المجال", "تركيز على المجلات عالية التأثير", "مراجعة أعمق للجوهر العلمي والجِدّة"],
  },
  pricing: {
    wordsUnit: "كلمة", compare: "قارن كل المزايا", controls: "خصّص سعرك",
    strip: {
      sample: { k: "مجاني", t: "لست متأكدًا بعد؟", d: "أرسل حتى 500 كلمة واحصل على عيّنة تحرير مجانية.", cta: "احصل على عيّنة مجانية" },
      writing: { k: "كتابة", t: "تحتاج من يكتب؟", d: "أبحاث ورسائل وأكثر، تُكتب معك.", cta: "تعرّف على خدمات الكتابة" },
      inst: { k: "فرق", t: "الجامعات والمجلات", d: "كميات كبيرة وفريق محرّرين مخصص.", cta: "تواصل معنا" },
    },
  },
  personas: {
    eyebrow: "لمن هذه الخدمة", title: "مصمّمة للباحثين. موثوقة لدى المحرّرين.",
    items: [
      { role: "للطلاب", t: "الرسائل والأطروحات", d: "تحرير فصلًا بفصل لتُقرأ حجتك بوضوح أمام لجنتك.", cta: "أنا طالب" },
      { role: "للباحثين", t: "أبحاث المجلات", d: "لغة وبنية مصقولة وفق معايير مجلتك المستهدفة.", cta: "أنا باحث" },
      { role: "للمؤسسات", t: "الفرق والمجلات", d: "تحرير بكميات كبيرة وأسلوب موحّد وتعامل سرّي.", cta: "أنا مؤسسة" },
    ],
  },
  cta: { title: "جهّز بحثك الآن", sub: "يحرّره متخصصون ناطقون بالإنجليزية وحاصلون على الدكتوراه. ابدأ بعيّنة مجانية.", primary: "احصل على عيّنة مجانية", secondary: "احصل على عرض سعر فوري", note: "لا حاجة للدفع للبدء." },
  trust: {
    items: [
      { t: "اتفاقية عدم إفصاح", d: "اتفاقية موقّعة لكل مشروع عند الطلب" },
      { t: "مشفّر وخاص", d: "الملفات محمية أثناء النقل ومقيّدة الوصول" },
      { t: "جاهز للمجلات", d: "يُحرَّر وفق معايير اللغة في مجلتك المستهدفة" },
      { t: "محرّرون متخصصون", d: "ناطقون بالإنجليزية وحاصلون على الدكتوراه في تخصصك" },
    ],
  },
  matrix: {
    title: "قارن مستويات التحرير", sub: "اختر عمق التحرير المناسب لبحثك ومجلتك المستهدفة.",
    feature: "ما يشمله", yes: "مشمول", no: "غير مشمول", recommended: "موصى به",
    groups: [
      { g: "التحرير اللغوي", rows: [
        { f: "القواعد والإملاء وعلامات الترقيم", v: [true, true, true] },
        { f: "الوضوح وسهولة القراءة", v: [true, true, true] },
        { f: "المنطق والبنية والتسلسل", v: [false, true, true] },
        { f: "اتساق المصطلحات", v: [false, true, true] },
      ] },
      { g: "النزاهة والجودة", rows: [
        { f: "فحص الانتحال (تقرير التشابه)", v: [true, true, true] },
        { f: "إعادة صياغة بأسلوب بشري طبيعي", v: [false, true, true] },
      ] },
      { g: "دعم المحرّر", rows: [
        { f: "تعليقات مفصّلة من المحرّر", v: [false, true, true] },
        { f: "مراجعة أقران من خبير في المجال", v: [false, false, true] },
        { f: "تحرير الرد على المحكّمين", v: [false, true, true] },
      ] },
      { g: "التسليم والضمانات", rows: [
        { f: "تنسيق مجاني وفق أسلوب المجلة", v: [true, true, true] },
        { f: "رسالة تقديم مجانية", v: [false, true, true] },
        { f: "إعادة تحرير مجانية", v: ["30 يومًا", "365 يومًا", "365 يومًا"] },
        { f: "تتبّع التعديلات + نسخة نظيفة", v: [true, true, true] },
        { f: "شهادة تحرير", v: [true, true, true] },
        { f: "اتفاقية عدم إفصاح متاحة", v: [true, true, true] },
      ] },
    ],
    cta: "احصل على عرض سعر",
  },
  show: {
    title: "شاهد بالضبط ما نغيّره", sub: "تحرير حقيقي كما ستستلمه: تتبّع التعديلات في Word مع تعليقات المحرّر على الهامش.",
    original: "الأصل", tracked: "تتبّع التعديلات", clean: "نسخة نظيفة", comments: "تعليقات المحرّر", hint: "المس أي تعديل مظلّل لقراءة ملاحظة المحرّر.",
    noteLabel: "ملاحظة المحرّر", none: "اختر تعديلًا لعرض التعليق.",
  },
  live: { title: "شاهد جملة تُحرَّر", sub: "عرض متكرر لما يحدث داخل بحثك.", replay: "معاينة التحرير المباشر", before: "قبل", after: "بعد" },
  flow: {
    title: "كيف نعمل", sub: "من الرفع إلى بحث مصقول في أربع خطوات.",
    steps: [
      { t: "احصل على سعرك", d: "أدخل عدد الكلمات وموعد التسليم وشاهد السعر فورًا." },
      { t: "أرسل ملفك", d: "ارفع ملف doc أو docx أو pdf بأمان، أو أرسل عيّنة مجانية." },
      { t: "تحرير الخبراء", d: "يحرّره متخصص ناطق بالإنجليزية وحاصل على الدكتوراه في مجالك." },
      { t: "استلم وحسّن", d: "احصل على التعديلات المتتبَّعة ونسخة نظيفة وشهادة تحرير." },
    ],
  },
  writing: {
    title: "خدمات الكتابة بالإنجليزية", sub: "أبعد من التحرير: يكتب معك متخصصونا في كل مجالات العمل الأكاديمي باللغة الإنجليزية.",
    items: [
      { t: "كتابة الأبحاث العلمية", d: "أبحاث أصلية ومنظمة وفق بياناتك وتوجيهاتك ومجلتك المستهدفة." },
      { t: "كتابة الرسائل والأطروحات", d: "دعم فصلًا بفصل من الخطة حتى مسودة المناقشة النهائية." },
      { t: "مراجعات الأدبيات", d: "مراجعات منهجية ونقدية وسردية بحجة واضحة." },
      { t: "الملخصات", d: "ملخصات موجزة ومحسّنة بالكلمات المفتاحية وملخصات تنفيذية." },
      { t: "المقترحات البحثية والمنح", d: "مقترحات بحثية وطلبات تمويل مقنعة في أسلوبها." },
      { t: "إعادة الصياغة", d: "إعادة صياغة النص للوضوح والأصالة مع الحفاظ على معناك." },
    ],
    cta: "اطلب عرض سعر للكتابة", note: "تُسلَّم كعمل خاص بك وتبقى سرّية بموجب اتفاقية عدم الإفصاح.",
  },
  sample: {
    title: "جرّبنا مجانًا: أرسل لنا عيّنة", sub: "شارك حتى 500 كلمة وسيعيد لك أحد محرّرينا عيّنة تحرير مجانية لتحكم على الجودة قبل الالتزام.",
    cta: "احصل على عيّنتي المجانية", perks: ["حتى 500 كلمة", "تُعاد مع تتبّع التعديلات", "بلا دفع وبلا التزام"],
  },
  testi: {
    title: "ماذا يقول الباحثون", placeholder: "آراء تجريبية لأغراض التصميم فقط. استبدلها بشهادات حقيقية قبل الإطلاق.",
    items: [
      { q: "فهم المحرّر مجالي بوضوح. علّمتني التعليقات أكثر مما علّمتني التصحيحات.", n: "د. أ. رحمن", r: "العلوم الطبية الحيوية" },
      { q: "تسليم سريع وفصل رسالة مصقول. لاحظ مشرفي الفرق فورًا.", n: "س. الحربي", r: "طالب دكتوراه، الهندسة" },
      { q: "تعديلات متتبَّعة واضحة ورسالة تقديم مدروسة. قُبل البحث بعد جولة واحدة.", n: "أ.د. ل. موريو", r: "العلوم الاجتماعية" },
    ],
  },
  faq: {
    title: "الأسئلة الشائعة",
    items: [
      { q: "من يحرّر بحثي؟", a: "يحرّر كل بحث محرّر ناطق بالإنجليزية يحمل دكتوراه ومتخصص في مجالك." },
      { q: "ما الفرق بين القياسي والمتميز والمحترف العلمي؟", a: "القياسي يصحّح اللغة ويحسّن الوضوح. المتميز يحسّن المنطق والبنية والتسلسل ويضيف تعليقات مفصّلة وتحرير الرد على المحكّمين ورسالة تقديم وإعادة تحرير مجانية 365 يومًا. المحترف العلمي يضيف مراجعة أقران من خبير للجوهر العلمي وجِدّة بحثك." },
      { q: "هل بحثي سرّي؟", a: "نعم. نوفّر اتفاقية عدم إفصاح موقّعة عند الطلب، ولا يصل إلى ملفاتك سوى المحرّر المكلّف وفريق المشروع." },
      { q: "ما أنواع الملفات المقبولة؟", a: "ملفات Word (doc, docx) وPDF. يمكن إرسال صيغ أخرى عند الطلب." },
      { q: "كيف يُحسب السعر؟", a: "السعر = عدد الكلمات × سعر الكلمة لمستوى التحرير ومدة التسليم، بعد أي خصم كمية أو رمز خصم. لا حد أدنى للطلب ولا حد أقصى للكلمات." },
      { q: "كيف تعمل العيّنة المجانية؟", a: "أرسل حتى 500 كلمة عبر نموذج العيّنة المجانية، ويعيد لك محرّر عيّنة بتتبّع التعديلات لتحكم على الجودة قبل الطلب." },
      { q: "هل تكتبون الأبحاث والرسائل أيضًا؟", a: "نعم. تشمل خدمات الكتابة الأبحاث والرسائل والأطروحات ومراجعات الأدبيات والملخصات والمقترحات باللغة الإنجليزية." },
      { q: "ماذا لو احتجت تعديلات إضافية بعد التسليم؟", a: "يشمل المتميز والمحترف العلمي إعادة تحرير مجانية لمدة 365 يومًا، ويشمل القياسي 30 يومًا." },
    ],
  },
  modal: {
    quoteTitle: "ثبّت عرض سعرك", sampleTitle: "احصل على عيّنة التحرير المجانية",
    quoteSub: "شاركنا بياناتك وبحثك وسنؤكد السعر خلال ساعات قليلة.", sampleSub: "ارفع حتى 500 كلمة. لا حاجة للدفع.",
    summary: "عرض سعرك", name: "الاسم الكامل", email: "البريد الإلكتروني", whatsapp: "رقم واتساب (اختياري)", field: "المجال / التخصص",
    journal: "المجلة المستهدفة (اختياري)", deadline: "الموعد النهائي (اختياري)", file: "ملف البحث", fileHint: "DOC أو DOCX أو PDF حتى 25 ميجابايت", notes: "ملاحظات للمحرّر (اختياري)",
    service: "الخدمة", svcEdit: "التحرير الإنجليزي", svcWrite: "خدمة كتابة", consent: "أوافق على الشروط وسياسة الخصوصية.",
    submit: "أرسل طلبي", sending: "جارٍ الإرسال…", close: "إغلاق",
    errName: "يُرجى إدخال اسمك.", errEmail: "يُرجى إدخال بريد إلكتروني صالح، مثل name@example.com.", errFile: "يُرجى إرفاق ملف DOC أو DOCX أو PDF أقل من 25 ميجابايت.", errConsent: "يُرجى تحديد الخانة للمتابعة.",
    errServer: "تعذّر إرسال طلبك. حاول مرة أخرى أو تواصل معنا عبر واتساب.",
    thanksTitle: "شكرًا لك، استلمنا طلبك!", thanksBody: "استلمنا طلبك وسنراسلك عبر البريد قريبًا.", ref: "رقمك المرجعي", whatsappCta: "تابع عبر واتساب", done: "تم",
  },
  footer: {
    tag: "خدمات التحرير والكتابة بالإنجليزية على يد متخصصين ناطقين بها وحاصلين على الدكتوراه.",
    services: "الخدمات", company: "الشركة", contact: "تواصل معنا", legal: "القانونية", terms: "شروط الخدمة", privacy: "سياسة الخصوصية", refund: "سياسة الاسترداد",
    email: "البريد", whatsapp: "واتساب", phone: "الهاتف", address: "العنوان", soon: "قريبًا", rights: "جميع الحقوق محفوظة.", follow: "تابعنا",
  },
  legal: {
    back: "العودة إلى الرئيسية", updated: "آخر تحديث: نوفمبر 2026",
    terms: {
      title: "شروط الخدمة",
      body: [
        { h: "1. الخدمات", p: "تقدّم Writing Lab خدمات التحرير والكتابة الأكاديمية باللغة الإنجليزية. بإرسال طلب أو ملف فإنك توافق على هذه الشروط." },
        { h: "2. الطلبات والأسعار", p: "تُحسب الأسعار من عدد الكلمات ومستوى التحرير ومدة التسليم، وتُؤكَّد بعد مراجعة ملفك. قد نعدّل العرض إذا اختلف الملف جوهريًا عما وُصف." },
        { h: "3. محتواك وملكيته", p: "تحتفظ بالملكية الكاملة لبحثك ولكل ما يُسلَّم إليك. وتقرّ بأن لك الحق في إرسال المادة إلينا." },
        { h: "4. السرّية", p: "نتعامل مع كل بحث بسرّية ونوقّع اتفاقية عدم إفصاح عند الطلب. لا يصل إلى الملفات سوى المحرّر المكلّف وفريق المشروع." },
        { h: "5. مدة التسليم", p: "تبدأ مدة التسليم بعد تأكيد الملف والدفع. سنبلغك فورًا إذا كان الموعد معرّضًا للتأخر." },
        { h: "6. إعادة التحرير المجانية", p: "تسري إعادة التحرير المجانية على البحث نفسه للمدة المذكورة في خدمتك، وتغطي تعديلات بقدر معقول لا محتوى جديدًا بالكامل." },
        { h: "7. النزاهة الأكاديمية", p: "يحسّن تحريرنا اللغة والوضوح ولا يغيّر بياناتك أو استنتاجاتك. تُقدَّم خدمات الكتابة كدعم وتوجيه، وتبقى مسؤولًا عن الالتزام بسياسات مؤسستك والمجلة." },
        { h: "8. حدود المسؤولية", p: "لا نضمن قبول أي مجلة أو درجة معينة. وفي حدود ما يسمح به القانون تقتصر مسؤوليتنا على الرسوم المدفوعة عن الخدمة المعنية." },
        { h: "9. التعديلات والتواصل", p: "قد نحدّث هذه الشروط من وقت لآخر. يمكن إرسال الاستفسارات عبر بيانات التواصل في موقعنا." },
      ],
    },
    privacy: {
      title: "سياسة الخصوصية",
      body: [
        { h: "1. ما نجمعه", p: "نجمع البيانات التي تقدّمها في نماذجنا (الاسم والبريد ورقم واتساب الاختياري والمجال والمجلة والموعد والملاحظات) والملفات التي ترفعها." },
        { h: "2. كيف نستخدمها", p: "نستخدمها لإعداد العروض وتقديم الخدمة والتواصل معك وتحسين خدمتنا. لا نبيع بياناتك الشخصية." },
        { h: "3. التخزين والأمان", p: "تُخزَّن الملفات في تخزين سحابي مقيّد الوصول وتُنقل عبر اتصالات مشفّرة. لا يصل إليها سوى المحرّر المكلّف وفريق المشروع." },
        { h: "4. المشاركة", p: "لا نشارك البيانات إلا مع مزوّدي الخدمة اللازمين لتشغيلها (كالبريد والتخزين السحابي) بضمانات مناسبة، أو عند اشتراط القانون." },
        { h: "5. الاحتفاظ", p: "نحتفظ بملفات المشروع بقدر ما يلزم لتقديم الخدمة وفترة إعادة التحرير المجانية، ثم نحذفها ما لم تطلب إبقاءها." },
        { h: "6. حقوقك", p: "يمكنك في أي وقت طلب الاطلاع على بياناتك الشخصية أو تصحيحها أو حذفها بالتواصل معنا." },
        { h: "7. ملفات تعريف الارتباط", p: "يخزّن هذا الموقع تفضيلات العرض فقط (اللغة والمظهر وحجم الخط واللون) في متصفحك. ولا نستخدم ملفات تعريف ارتباط إعلانية." },
        { h: "8. التواصل", p: "لأسئلة الخصوصية، يُرجى استخدام بيانات التواصل في موقعنا." },
      ],
    },
    refund: {
      title: "سياسة الاسترداد",
      body: [
        { h: "1. قبل بدء العمل", p: "إذا ألغيت قبل أن يبدأ محرّر العمل على مشروعك، تسترد المبلغ كاملًا." },
        { h: "2. بعد بدء العمل", p: "إذا بدأ العمل نردّ الجزء غير المستخدم. العمل المنجز والمسلَّم غير قابل للاسترداد إلا وفق ما يلي." },
        { h: "3. ملاحظات الجودة", p: "إذا لم ترضَ عن جودة التحرير فأبلغنا خلال 7 أيام من التسليم. سنعيد التحرير دون رسوم، وإن تعذّر الحل ناقشنا استردادًا جزئيًا أو كليًا." },
        { h: "4. التأخر في التسليم", p: "إذا فاتنا موعد التسليم المتفق عليه دون موافقتك، يمكنك طلب استرداد علاوة التسليم العاجل التي دفعتها." },
        { h: "5. العيّنات المجانية", p: "العيّنات المجانية بلا رسوم وبلا التزام." },
        { h: "6. كيفية طلب الاسترداد", p: "تواصل معنا مع رقمك المرجعي. تُعاد المبالغ المعتمدة إلى وسيلة الدفع الأصلية خلال 7–14 يوم عمل." },
      ],
    },
  },
};

export const DICT: Record<Lang, typeof en> = { en, ar };
export type Dict = typeof en;
