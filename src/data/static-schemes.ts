export type SchemeSectionKey =
  | "purpose"
  | "eligibility"
  | "benefits"
  | "documents"
  | "whereToApply"
  | "terms"
  | "procedure";

export type StaticScheme = {
  id: string;
  order: number;
  nameGu: string;
  onlineStatus: "open" | "closed";
  documents: {
    applicationFormLabel: string;
    attachmentsLabel: string;
    faqLabel: string;
    applicationFormUrl?: string;
    attachmentsUrl?: string;
    faqUrl?: string;
  };
  sections: Partial<Record<SchemeSectionKey, string>>;
  menuOptions: {
    key: string;
    order: number;
    labelGu: string;
    sectionKey?: SchemeSectionKey;
    special?: "downloads" | "main_menu";
  }[];
};

const DEFAULT_MENU = (): StaticScheme["menuOptions"] => [
  { key: "purpose", order: 1, labelGu: "યોજનાનો હેતુ", sectionKey: "purpose" },
  { key: "eligibility", order: 2, labelGu: "પાત્રતા", sectionKey: "eligibility" },
  { key: "benefits", order: 3, labelGu: "લાભ", sectionKey: "benefits" },
  { key: "documents", order: 4, labelGu: "જરૂરી દસ્તાવેજો", sectionKey: "documents" },
  { key: "procedure", order: 5, labelGu: "કાર્યપદ્ધતિ", sectionKey: "procedure" },
  { key: "whereToApply", order: 6, labelGu: "લાભ ક્યાંથી મેળવવો", sectionKey: "whereToApply" },
  { key: "downloads", order: 7, labelGu: "અરજી / FAQ ડાઉનલોડ", special: "downloads" },
  { key: "main_menu", order: 0, labelGu: "મુખ્ય મેનુ", special: "main_menu" },
];

export const STATIC_SCHEMES: StaticScheme[] = [
  {
    id: "scheme_01",
    order: 1,
    nameGu: "શિક્ષણ સહાય",
    onlineStatus: "open",
    documents: {
      applicationFormLabel: "અરજી પત્રક",
      attachmentsLabel: "અરજી સાથેના બિડાણ",
      faqLabel: "FAQ",
    },
    sections: {
      purpose:
        "રાજયના ઉચ્ચ શિક્ષણના અભ્યાસક્રમોમાં પ્રવેશ મેળવવા માંગતા તેજસ્વી અને જરૂરીયાતમંદ બાંધકામ શ્રમિકના વિદ્યાર્થીઓની કારકિર્દીના ઘડતર માટે બાંધકામ શ્રમિકના કોઈ પણ બે બાળકને વર્ષમાં એક વાર માટે આર્થિક સહાય.",
      eligibility: "નોંધાયેલા બાંધકામ શ્રમિકના કોઈપણ બે બાળકોને વર્ષ માં એકવાર.",
      benefits:
        "ધોરણ 1–5: ₹1800, ધોરણ 6–8: ₹2400, ધોરણ 9–10: ₹8000, ધોરણ 11–12: ₹10000, સ્નાતક/અનુસ્નાતક/પ્રોફેશનલ કોર્સ માટે ₹10000–₹50000 (કોર્સ પ્રમાણે). હોસ્ટેલ સહાય ₹1200/મહિના. પુસ્તક સહાય ₹3000–₹10000.",
      documents:
        "બોર્નાફાઈડ, ફોટા, આધાર, પરીણામ, ફી પહોંચ, હોસ્ટેલ પ્રમાણપત્ર (જરૂર હોય તો), બેંક પાસબુક, એફીડેવીટ/સંમતિપત્ર (₹5000+ સહાય માટે).",
      whereToApply: "બાંધકામ બોર્ડની જિલ્લા કચેરી / સન્માન પોર્ટલ ઓનલાઈન.",
      terms:
        "નિયત સમયમાં અરજી, બે બાળકો માટે અલગ ફોર્મ, વય મર્યાદા 30 (અપંગતા કિસ્સામાં છૂટ), સમાન સહાય મેળવતા હોય તો લાભ નહીં.",
      procedure:
        "સન્માન પોર્ટલ / જિલ્લા કચેરી → verification → મંજૂરી → DBT દ્વારા ચુકવણી.",
    },
    menuOptions: DEFAULT_MENU(),
  },
  {
    id: "scheme_02",
    order: 2,
    nameGu: "પ્રસૂતિ સહાય યોજના (પ્રસૂતિ પહેલા)",
    onlineStatus: "open",
    documents: {
      applicationFormLabel: "અરજી પત્રક",
      attachmentsLabel: "બિડાણ",
      faqLabel: "FAQ",
    },
    sections: {
      purpose: "સગર્ભાવસ્થા દરમ્યાન નાણાકીય સહાય અને સામાજિક સ્થિરતા.",
      eligibility: "નોંધાયેલ બાંધકામ શ્રમિક / પત્ની — પ્રથમ બે પ્રસૂતિ.",
      benefits: "પત્ની: ₹6000 (પહેલા), મહિલા શ્રમિક: ₹37500; પ્રસૂતિ પછી ₹20000 / ₹6000.",
      documents: "ઈ-નિર્માણ, ડૉક્ટર/મમતા કાર્ડ, જન્મ પ્રમાણપત્ર, આધાર, બેંક, રેશન, સોગંદનામું.",
      whereToApply: "સન્માન પોર્ટલ / જિલ્લા કચેરી.",
      terms: "DBT ચુકવણી; ગર્ભાવસ્થાની તારીખથી 6 માસ; પ્રસૂતિ પછી 12 માસ.",
      procedure: "ઓનલાઈન/ઓફલાઈન અરજી → જિલ્લા/રાજ્ય મંજૂરી → DBT.",
    },
    menuOptions: DEFAULT_MENU(),
  },
  {
    id: "scheme_03",
    order: 3,
    nameGu: "તબીબી સહાય યોજના (ક્લેમ)",
    onlineStatus: "open",
    documents: {
      applicationFormLabel: "અરજી પત્રક",
      attachmentsLabel: "બિડાણ",
      faqLabel: "FAQ",
    },
    sections: {
      purpose: "બાંધકામ શ્રમિકો માટે સંપૂર્ણ તબીબી તપાસ અને વહેલી સારવાર.",
      eligibility: "નોંધાયેલ બાંધકામ શ્રમિક.",
      benefits: "પ્રતિ લાભાર્થી ₹1950 સુધી — empaneled હોસ્પિટલ/કેમ્પ તપાસ.",
      documents: "ઈ-નિર્માણ કાર્ડ.",
      whereToApply: "Empaneled સંસ્થા — કેમ્પ / construction site.",
      terms: "Ayushman/MOU હોસ્પિટલમાં તપાસ.",
      procedure: "સન્માન પોર્ટલ → North Star allotment → report → bill approval → payment.",
    },
    menuOptions: DEFAULT_MENU(),
  },
  {
    id: "scheme_04",
    order: 4,
    nameGu: "કુશળ શ્રમિક સહાય યોજના",
    onlineStatus: "open",
    documents: {
      applicationFormLabel: "અરજી પત્રક",
      attachmentsLabel: "બિડાણ",
      faqLabel: "FAQ",
    },
    sections: {
      purpose: "કૌશલ્ય શિક્ષણ અને રોજગારી માટે કારકિર્દી ઘડતર.",
      eligibility: "નોંધાયેલ શ્રમિક પોતે અથવા કોઈપણ બે બાળકો — Skill University/affiliate કોર્સ.",
      benefits: "કોર્સની સંપૂર્ણ ફી reimbursement (semester-wise જરૂર હોય તો).",
      documents: "ઈ-નિર્માણ, bonafide, ફી રસીદ, ફોટા, પરીણામ, આધાર, રેશન, affidavit.",
      whereToApply: "જિલ્લા કચેરી / સન્માન પોર્ટલ.",
      terms: "3 માસની અંદર અરજી; શિક્ષણ સહાય સાથે duplicate નહીં.",
      procedure: "ઓનલાઈન અરજી → verification → DBT reimbursement.",
    },
    menuOptions: DEFAULT_MENU(),
  },
  {
    id: "scheme_05",
    order: 5,
    nameGu: "અંત્યેષ્ઠી સહાય યોજના",
    onlineStatus: "open",
    documents: {
      applicationFormLabel: "અરજી પત્રક",
      attachmentsLabel: "બિડાણ",
      faqLabel: "FAQ",
    },
    sections: {
      purpose: "ચાલુ membership દરમ્યાન મૃત્યુ પર વારસદારને સહાય.",
      eligibility: "નોંધાયેલ બાંધકામ શ્રમિક.",
      benefits: "₹10,000.",
      documents: "મૃત્યુ પ્રમાણપત્ર, વારસદાર ID, સ્વઘોષણા, બેંક, રેશન, પેઢીનામું.",
      whereToApply: "સન્માન પોર્ટલ ઓનલાઈન.",
      procedure: "ઓનલાઈન અરજી → મંજૂરી → ચુકવણી.",
    },
    menuOptions: DEFAULT_MENU(),
  },
  {
    id: "scheme_06",
    order: 6,
    nameGu: "પ્રધાનમંત્રી જીવન જ્યોત બીમા યોજના",
    onlineStatus: "open",
    documents: {
      applicationFormLabel: "અરજી પત્રક",
      attachmentsLabel: "બિડાણ",
      faqLabel: "FAQ",
    },
    sections: {
      purpose: "કુદરતી મૃત્યુ પર ₹2 લાખ જીવન વીમા કવચ.",
      eligibility: "18–55 વર્ષ, PMJJBY માં જોડાયેલ નોંધાયેલ શ્રમિક.",
      benefits: "પ્રીમિયમ 100% DBT reimbursement (વarshik).",
      documents: "પ્રીમિયમ રસીદ/statement, PMJJBY બેંક ખાતું, આધાર, ફોટો.",
      whereToApply: "જિલ્લા કચેરી / સન્માન પોર્ટલ.",
      terms: "પ્રીમિયમ debit પછી 6 માસ内 અરજી.",
      procedure: "ઓનલાઈન અરજી → verification chain → DBT.",
    },
    menuOptions: DEFAULT_MENU(),
  },
  {
    id: "scheme_07",
    order: 7,
    nameGu: "વ્યવસાયિક રોગોમાં સહાય યોજના",
    onlineStatus: "open",
    documents: {
      applicationFormLabel: "અરજી પત્રક",
      attachmentsLabel: "બિડાણ",
      faqLabel: "FAQ",
    },
    sections: {
      purpose: "વ્યવસાયિક રોગો માટે સહાય (વિગતો ટૂંક સમયમાં અપડેટ).",
      eligibility: "નોંધાયેલ બાંધકામ શ્રમિક.",
      benefits: "યોજના પ્રમાણે નાણાકીય સહાય.",
      whereToApply: "સન્માન પોર્ટલ / જિલ્લા કચેરી.",
    },
    menuOptions: DEFAULT_MENU(),
  },
  {
    id: "scheme_08",
    order: 8,
    nameGu: "વિશિષ્ટ કોચિગ યોજના",
    onlineStatus: "open",
    documents: {
      applicationFormLabel: "અરજી પત્રક",
      attachmentsLabel: "બિડાણ",
      faqLabel: "FAQ",
    },
    sections: {
      purpose: "CA, GPSC, GSSSB, GPSSB જેવી સ્પર્ધાત્મક પરીક્ષાઓ માટે કોચિંગ.",
      eligibility: "નોંધાયેલ શ્રમિકના બાળકો.",
      benefits: "Registration + coaching/tuition fee reimbursement.",
      documents: "આધાર, ફી રસીદ, બેંક, રેશન, સોગંદનામું, bonafide.",
      whereToApply: "સન્માન પોર્ટલ.",
      terms: "એડમિશન પછી 6 માસ内 અરજી.",
      procedure: "ઓનલાઈન અરજી.",
    },
    menuOptions: DEFAULT_MENU(),
  },
  {
    id: "scheme_09",
    order: 9,
    nameGu: "નાનાજી દેશમુખ આવાસ યોજના",
    onlineStatus: "open",
    documents: {
      applicationFormLabel: "અરજી પત્રક",
      attachmentsLabel: "બિડાણ",
      faqLabel: "FAQ",
    },
    sections: {
      purpose: "EWS/LIG મકાન ફાળવણી પર કુટુંબને એકવાર સહાય.",
      eligibility: "નોંધાયેલ શ્રમિક, નોંધણી ≥2 વર્ષ.",
      benefits: "₹1,60,000.",
      documents: "ઈ-નિર્માણ, ફાળવણી પત્ર, હપ્તા પત્ર, ID, ટેક્સ બિલ, સોગંદનામું.",
      whereToApply: "સન્માન પોર્ટલ.",
      terms: "ફાળવણીના 1 વર્ષ内 અરજી; joint ownership rules.",
      procedure: "ઓનલાઈન → DPM/DIO/GLO → DD to authority.",
    },
    menuOptions: DEFAULT_MENU(),
  },
  {
    id: "scheme_10",
    order: 10,
    nameGu: "અકસ્માત મૃત્યુ સહાય યોજના",
    onlineStatus: "open",
    documents: {
      applicationFormLabel: "અરજી પત્રક",
      attachmentsLabel: "બિડાણ",
      faqLabel: "FAQ",
    },
    sections: {
      purpose: "અકસ્માત મૃત્યુ પર વારસદારને સહાય.",
      eligibility: "નોંધાયેલ બાંધકામ શ્રમિક.",
      whereToApply: "સન્માન પોર્ટલ.",
    },
    menuOptions: DEFAULT_MENU(),
  },
  {
    id: "scheme_11",
    order: 11,
    nameGu: "તબીબી સહાય યોજના",
    onlineStatus: "open",
    documents: {
      applicationFormLabel: "અરજી પત્રક",
      attachmentsLabel: "બિડાણ",
      faqLabel: "FAQ",
    },
    sections: {
      purpose: "તબીબી સારવાર માટે સહાય (મુખ્ય તબીબી ક્લેમ યોજના અલગ ID scheme_03).",
      eligibility: "નોંધાયેલ બાંધકામ શ્રમિક.",
      whereToApply: "સન્માન પોર્ટલ / જિલ્લા કચેરી.",
    },
    menuOptions: DEFAULT_MENU(),
  },
  {
    id: "scheme_12",
    order: 12,
    nameGu: "પ્રસુતિ સહાય અને મુખ્યમંત્રી ભાગ્યલક્ષ્મી બોન્ડ",
    onlineStatus: "open",
    documents: {
      applicationFormLabel: "અરજી પત્રક",
      attachmentsLabel: "બિડાણ",
      faqLabel: "FAQ",
    },
    sections: {
      purpose: "પ્રસૂતિ સહાય અને બોન્ડ યોજના (વિગતો અપડેટ થશે).",
      eligibility: "નોંધાયેલ મહિલા/પત્ની શ્રમિક.",
      whereToApply: "સન્માન પોર્ટલ.",
    },
    menuOptions: DEFAULT_MENU(),
  },
  {
    id: "scheme_13",
    order: 13,
    nameGu: "પી.એચ.ડી યોજના",
    onlineStatus: "open",
    documents: {
      applicationFormLabel: "અરજી પત્રક",
      attachmentsLabel: "બિડાણ",
      faqLabel: "FAQ",
    },
    sections: {
      purpose: "PHD અભ્યાસ માટે સહાય (વિગતો અપડેટ થશે).",
      eligibility: "નોંધાયેલ શ્રમિકના બાળક/શ્રમિક.",
      whereToApply: "સન્માન પોર્ટલ.",
    },
    menuOptions: DEFAULT_MENU(),
  },
  {
    id: "scheme_14",
    order: 14,
    nameGu: "હાઉસીંગ સબસીડી યોજના",
    onlineStatus: "open",
    documents: {
      applicationFormLabel: "અરજી પત્રક",
      attachmentsLabel: "બિડાણ",
      faqLabel: "FAQ",
    },
    sections: {
      purpose: "આવાસ સબસીડી (વિગતો અપડેટ થશે).",
      eligibility: "નોંધાયેલ બાંધકામ શ્રમિક.",
      whereToApply: "સન્માન પોર્ટલ.",
    },
    menuOptions: DEFAULT_MENU(),
  },
];

export function getSchemeByOrder(order: number) {
  return STATIC_SCHEMES.find((s) => s.order === order);
}

export function getSchemeById(id: string) {
  return STATIC_SCHEMES.find((s) => s.id === id);
}
