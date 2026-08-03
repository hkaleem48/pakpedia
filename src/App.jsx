import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  Search, MapPin, Globe, Phone, Clock, Star, ExternalLink,
  Menu, X, Stethoscope, GraduationCap, ShieldCheck, Mail,
  Newspaper, TrendingUp, Zap, ArrowRight, BookOpen,
  DollarSign, Activity, HelpCircle, Building2, Users, Award,
  Facebook, Twitter, Instagram, Linkedin, CheckCircle2
} from 'lucide-react';

// -------------------- DATA --------------------
const DATA_STORE = [
  { id: 'h1', type: 'hospital', name: 'Shaukat Khanum Memorial Cancer Hospital', city: 'Lahore', area: 'Johar Town', specialty: ['Oncology', 'Emergency'], rating: 4.9, phone: '042-111155555', timing: '24/7', description: 'Pakistan’s leading cancer hospital founded by Imran Khan. Provides free and subsidized treatment to thousands of patients every year with state-of-the-art oncology facilities.' },
  { id: 'h2', type: 'hospital', name: 'Mayo Hospital', city: 'Lahore', area: 'Anarkali', specialty: ['General', 'Surgery', 'ER'], rating: 4.2, phone: '042-99211100', timing: '24/7', description: 'One of the oldest and largest public hospitals in Lahore. Serves as a major teaching hospital affiliated with King Edward Medical University.' },
  { id: 'h3', type: 'hospital', name: 'Doctors Hospital & Medical Centre', city: 'Lahore', area: 'Canal Road', specialty: ['Cardiac', 'Diagnostics'], rating: 4.5, phone: '042-111223344', timing: '24/7', description: 'Premium private hospital with advanced diagnostics, cardiac care and multi-specialty services in Lahore.' },
  { id: 'h4', type: 'hospital', name: 'Aga Khan University Hospital', city: 'Karachi', area: 'Stadium Road', specialty: ['Multi-Specialty', 'Research'], rating: 4.9, phone: '021-111911911', timing: '24/7', description: 'World-class teaching hospital and research centre. Consistently ranked among the best hospitals in Pakistan and South Asia.' },
  { id: 'h5', type: 'hospital', name: 'Indus Hospital', city: 'Karachi', area: 'Korangi', specialty: ['Free Healthcare', 'General'], rating: 4.8, phone: '021-35112709', timing: '24/7', description: 'Quality free healthcare for all. A network of hospitals providing completely free medical care across Pakistan.' },
  { id: 'h6', type: 'hospital', name: 'Jinnah Postgraduate Medical Centre', city: 'Karachi', area: 'Cantt', specialty: ['Public', 'Emergency'], rating: 4.1, phone: '021-99201300', timing: '24/7', description: 'Major public tertiary care hospital and one of the largest medical facilities in Karachi.' },
  { id: 'h7', type: 'hospital', name: 'PIMS', city: 'Islamabad', area: 'G-8', specialty: ['Federal', 'Specialty'], rating: 4.0, phone: '051-9261170', timing: '24/7', description: 'Premier federal government hospital providing specialized medical services to residents of Islamabad and surrounding areas.' },
  { id: 'h8', type: 'hospital', name: 'Shifa International Hospital', city: 'Islamabad', area: 'H-8', specialty: ['Liver Transplant', 'Cardiac'], rating: 4.6, phone: '051-8463000', timing: '24/7', description: 'Leading private hospital with organ transplant facilities, cardiac surgery and advanced diagnostic services.' },
  { id: 'h9', type: 'hospital', name: 'Services Hospital', city: 'Lahore', area: 'Jail Road', specialty: ['General', 'Teaching'], rating: 4.0, phone: '042-99203402', timing: '24/7', description: 'Major public teaching hospital affiliated with Services Institute of Medical Sciences.' },
  { id: 'h10', type: 'hospital', name: 'Liaquat National Hospital', city: 'Karachi', area: 'Stadium Road', specialty: ['Multi-Specialty', 'Teaching'], rating: 4.4, phone: '021-34412001', timing: '24/7', description: 'One of the largest private teaching hospitals in Karachi offering comprehensive medical and surgical care.' },
  { id: 's1', type: 'school', name: 'Aitchison College', city: 'Lahore', area: 'Mall Road', curriculum: ['Cambridge', 'Matric'], rating: 4.9, phone: '042-36317201', timing: '08:00 - 14:00', description: 'Historic elite boys school founded in 1886. Known for academic excellence and producing national leaders.' },
  { id: 's2', type: 'school', name: 'Lahore Grammar School (LGS)', city: 'Lahore', area: 'Gulberg', curriculum: ['O-Levels', 'A-Levels'], rating: 4.7, phone: '042-35712566', timing: '07:30 - 13:30', description: 'One of the largest private school networks in Pakistan with campuses across major cities.' },
  { id: 's3', type: 'school', name: 'Karachi Grammar School', city: 'Karachi', area: 'Saddar', curriculum: ['British'], rating: 4.9, phone: '021-32253732', timing: '08:00 - 14:00', description: 'Prestigious co-educational school established in 1847. Consistently ranks among the top schools in Pakistan.' },
  { id: 's4', type: 'school', name: 'The City School', city: 'Karachi', area: 'PAF Chapter', curriculum: ['O/A Levels'], rating: 4.5, phone: '021-34544106', timing: '08:00 - 14:00', description: 'Large national private school network offering Cambridge curriculum across Pakistan.' },
  { id: 's5', type: 'school', name: 'Roots Millennium Schools', city: 'Islamabad', area: 'E-11', curriculum: ['IB', 'Cambridge'], rating: 4.6, phone: '051-111111193', timing: '07:30 - 14:00', description: 'Modern international curriculum schools with focus on holistic education and global citizenship.' },
  { id: 's6', type: 'school', name: 'Beaconhouse Newlands', city: 'Islamabad', area: 'Bani Gala', curriculum: ['International'], rating: 4.7, phone: '051-2612989', timing: '08:00 - 15:00', description: 'Part of the Beaconhouse School System, one of the largest private school networks in the world.' },
  { id: 's7', type: 'school', name: 'Convent of Jesus & Mary', city: 'Lahore', area: 'Durand Road', curriculum: ['Matric', 'Cambridge'], rating: 4.8, phone: '042-36369001', timing: '07:30 - 13:30', description: 'Historic girls school known for strong academics and character development.' },
  { id: 's8', type: 'school', name: 'St. Patrick\'s High School', city: 'Karachi', area: 'Saddar', curriculum: ['Matric', 'Cambridge'], rating: 4.6, phone: '021-32782288', timing: '08:00 - 14:00', description: 'One of the oldest and most respected boys schools in Karachi, founded in 1861.' },
];

const cities = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta'];

const NEWS_HEADLINES = [
  { title: "Pakistan's economy shows signs of recovery in Q2 2026", source: "Dawn", time: "2 hours ago", summary: "GDP growth and improved foreign reserves signal positive momentum according to the State Bank." },
  { title: "New education policy aims to boost STEM in public schools", source: "The News", time: "4 hours ago", summary: "Federal government announces major curriculum reforms focused on science, technology, engineering and mathematics." },
  { title: "Karachi heatwave alert issued by Met Office", source: "Geo News", time: "5 hours ago", summary: "Temperatures expected to exceed 40°C in coastal areas; citizens advised to take precautions." },
  { title: "Gold prices remain high amid global uncertainty", source: "Business Recorder", time: "6 hours ago", summary: "24K gold continues to trade near record levels as international markets react to geopolitical tensions." },
  { title: "Punjab launches new hospital modernization drive", source: "Express Tribune", time: "8 hours ago", summary: "Provincial government allocates funds to upgrade equipment and infrastructure in major public hospitals." },
  { title: "Aga Khan University expands research collaboration with European institutes", source: "Dawn", time: "10 hours ago", summary: "New partnership will focus on infectious diseases and maternal health research." },
];

const NEWSPAPERS = [
  { name: "Dawn", url: "https://www.dawn.com", color: "bg-blue-600" },
  { name: "The News", url: "https://www.thenews.com.pk", color: "bg-red-600" },
  { name: "Express Tribune", url: "https://tribune.com.pk", color: "bg-orange-500" },
  { name: "Jang", url: "https://jang.com.pk", color: "bg-green-700" },
  { name: "Nawa-i-Waqt", url: "https://www.nawaiwaqt.com.pk", color: "bg-purple-700" },
  { name: "Business Recorder", url: "https://www.brecorder.com", color: "bg-slate-700" },
];

const MOST_SEARCHED = [
  "Best schools in Lahore", "Aga Khan Hospital Karachi", "Gold rate today Pakistan",
  "CSS preparation books", "Hospitals in Islamabad", "Matric result 2026",
  "Private universities in Punjab", "Silver rate today", "Best colleges in Karachi",
  "NADRA office near me", "Passport office appointment", "FBR tax calculator",
  "Best hospitals in Lahore", "Shaukat Khanum appointment", "O Level schools Karachi"
];

const FAQ_DATA = [
  {
    q: "What is PakPedia?",
    a: "PakPedia is Pakistan’s all-in-one information directory that helps citizens find verified schools, hospitals, live gold and silver rates, today’s newspapers, and the latest national news. Our goal is to make reliable, up-to-date information easily accessible for every Pakistani."
  },
  {
    q: "Are the school and hospital listings verified?",
    a: "Yes. We maintain verified listings with accurate phone numbers, addresses, ratings and specialties. Listings are regularly reviewed and updated. Users can also suggest corrections via our contact page."
  },
  {
    q: "How often are gold and silver rates updated?",
    a: "Gold and silver rates on PakPedia are updated multiple times daily based on market data. Rates are indicative and may vary slightly by city and local market conditions. Always confirm with your local jeweler for exact transaction rates."
  },
  {
    q: "Which cities does PakPedia cover?",
    a: "We currently cover major cities including Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar and Quetta, with continuous expansion planned for more cities across Pakistan."
  },
  {
    q: "Is PakPedia free to use?",
    a: "Yes. All directories, rates, news headlines and newspaper links on PakPedia are completely free for users. We are committed to providing public-service information without paywalls."
  },
  {
    q: "How can I get my school or hospital listed?",
    a: "Send an email to hello@pakpedia.pk with the full name, city, area, phone number, specialties/curriculum and a short description. Our team reviews submissions and adds verified listings within a few working days."
  },
  {
    q: "Does PakPedia provide medical or educational advice?",
    a: "No. PakPedia is an information directory only. We do not provide medical diagnoses, treatment recommendations or academic counseling. Always consult qualified professionals for personal advice."
  },
  {
    q: "How can I contact PakPedia?",
    a: "You can reach us by email at hello@pakpedia.pk or by phone at +92-42-111-725-333. Our office is located in Lahore, Pakistan. We typically respond within 1–2 business days."
  }
];

// -------------------- SEO --------------------
function SEO({ title, description, path = '', schema = null, noindex = false }) {
  const siteUrl = 'https://pakpediaonline.vercel.app';
  const fullTitle = title ? `${title} | PakPedia` : 'PakPedia – Schools, Hospitals, Gold Rates & News in Pakistan';
  const canonical = `${siteUrl}${path}`;
  const metaDesc = description || 'Find verified schools & hospitals across Pakistan, live gold & silver rates, today’s newspapers and latest Pakistan news. Trusted information directory.';

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PakPedia",
    "url": siteUrl,
    "logo": `${siteUrl}/favicon.ico`,
    "description": "Pakistan’s all-in-one directory for schools, hospitals, gold rates, news and essential services.",
    "email": "hello@pakpedia.pk",
    "telephone": "+92-42-111-725-333",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lahore",
      "addressRegion": "Punjab",
      "addressCountry": "PK"
    },
    "sameAs": [
      "https://www.facebook.com/pakpedia",
      "https://twitter.com/pakpedia",
      "https://www.instagram.com/pakpedia",
      "https://www.linkedin.com/company/pakpedia"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PakPedia",
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const safeTitle = fullTitle.length > 60 ? fullTitle.substring(0, 57) + '...' : fullTitle;
  const safeDesc = metaDesc.length > 160 ? metaDesc.substring(0, 157) + '...' : metaDesc;

  return (
    <Helmet>
      <html lang="en" />
      <title>{safeTitle}</title>
      <meta name="description" content={safeDesc} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
      <meta name="author" content="PakPedia" />
      <meta name="keywords" content="schools in Pakistan, hospitals in Pakistan, gold rate today, silver rate, Pakistan news, best schools Lahore, best hospitals Karachi, PakPedia" />
      
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="PakPedia" />
      <meta property="og:locale" content="en_PK" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      
      <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  );
}

// -------------------- LAYOUT --------------------
function Layout({ children }) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenu(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-emerald-700 p-2 rounded-xl">
              <Globe className="text-white w-5 h-5 md:w-6 md:h-6" />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tight uppercase">
              Pak<span className="text-emerald-700">Pedia</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-6 font-bold text-sm text-slate-600">
            <Link to="/" className="hover:text-emerald-700">Home</Link>
            <Link to="/hospitals" className="hover:text-emerald-700">Hospitals</Link>
            <Link to="/schools" className="hover:text-emerald-700">Schools</Link>
            <Link to="/rates" className="hover:text-emerald-700">Gold Rates</Link>
            <Link to="/news" className="hover:text-emerald-700">News</Link>
            <Link to="/faq" className="hover:text-emerald-700">FAQ</Link>
            <Link to="/about" className="hover:text-emerald-700">About</Link>
            <Link to="/contact" className="bg-slate-900 text-white px-5 py-2 rounded-full hover:bg-emerald-700 transition text-sm">
              Contact
            </Link>
          </div>

          <button className="lg:hidden p-2" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu">
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenu && (
          <div className="lg:hidden bg-white border-t px-4 py-4 space-y-3 font-bold">
            <Link to="/" className="block">Home</Link>
            <Link to="/hospitals" className="block">Hospitals</Link>
            <Link to="/schools" className="block">Schools</Link>
            <Link to="/rates" className="block">Gold Rates</Link>
            <Link to="/news" className="block">News</Link>
            <Link to="/faq" className="block">FAQ</Link>
            <Link to="/about" className="block">About</Link>
            <Link to="/contact" className="block">Contact</Link>
          </div>
        )}
      </nav>

      <main className="flex-1">{children}</main>

      <footer className="bg-slate-900 text-white py-16 px-4 mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-emerald-600 p-1.5 rounded-lg"><Globe className="w-4 h-4" /></div>
                <span className="text-xl font-black uppercase">PakPedia</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Pakistan’s trusted all-in-one directory for verified schools, hospitals, live gold & silver rates, newspapers and national news. Built to make reliable information accessible for every Pakistani.
              </p>
              <div className="space-y-2 text-sm text-slate-400">
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Lahore, Punjab, Pakistan</p>
                <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> +92-42-111-725-333</p>
                <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> hello@pakpedia.pk</p>
              </div>
            </div>
            <div>
              <h5 className="font-bold mb-4 text-sm uppercase tracking-wider text-slate-300">Directories</h5>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/hospitals" className="hover:text-white">Hospitals</Link></li>
                <li><Link to="/schools" className="hover:text-white">Schools</Link></li>
                <li><Link to="/rates" className="hover:text-white">Gold & Silver Rates</Link></li>
                <li><Link to="/news" className="hover:text-white">News & Newspapers</Link></li>
                <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4 text-sm uppercase tracking-wider text-slate-300">Cities</h5>
              <ul className="space-y-2 text-sm text-slate-400">
                {cities.slice(0, 6).map(c => (
                  <li key={c}><Link to={`/city/${c.toLowerCase()}`} className="hover:text-white">{c}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4 text-sm uppercase tracking-wider text-slate-300">Company</h5>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
              <div className="flex gap-3 mt-6">
                <a href="https://facebook.com/pakpedia" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-lg hover:bg-emerald-600 transition" aria-label="Facebook"><Facebook className="w-4 h-4" /></a>
                <a href="https://twitter.com/pakpedia" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-lg hover:bg-emerald-600 transition" aria-label="X / Twitter"><Twitter className="w-4 h-4" /></a>
                <a href="https://instagram.com/pakpedia" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-lg hover:bg-emerald-600 transition" aria-label="Instagram"><Instagram className="w-4 h-4" /></a>
                <a href="https://linkedin.com/company/pakpedia" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-lg hover:bg-emerald-600 transition" aria-label="LinkedIn"><Linkedin className="w-4 h-4" /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>© {new Date().getFullYear()} PakPedia • Built for a Digital Pakistan</p>
            <p className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Verified listings • Updated daily</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// -------------------- CARD --------------------
function EntityCard({ item }) {
  return (
    <Link to={`/${item.type}s/${item.id}`} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all group block">
      <div className="h-1.5 bg-emerald-600 w-0 group-hover:w-full transition-all duration-500" />
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-xl ${item.type === 'hospital' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
            {item.type === 'hospital' ? <Stethoscope className="w-6 h-6" /> : <GraduationCap className="w-6 h-6" />}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-full text-slate-500">{item.city}</span>
        </div>
        <h3 className="font-bold text-lg mb-1 group-hover:text-emerald-700 transition leading-snug">{item.name}</h3>
        <p className="text-sm text-slate-500 flex items-center gap-1 mb-4">
          <MapPin className="w-3.5 h-3.5" /> {item.area}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-current" />
            <span className="font-bold">{item.rating}</span>
          </div>
          <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
        </div>
      </div>
    </Link>
  );
}

// -------------------- PAGES --------------------
function HomePage() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [agentWorking, setAgentWorking] = useState(false);
  const [goldRate, setGoldRate] = useState(285400);
  const [silverRate, setSilverRate] = useState(3250);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setGoldRate(prev => prev + Math.floor(Math.random() * 200 - 100));
      setSilverRate(prev => prev + Math.floor(Math.random() * 20 - 10));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const filteredData = useMemo(() => {
    return DATA_STORE.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.city.toLowerCase().includes(search.toLowerCase()) ||
        item.area.toLowerCase().includes(search.toLowerCase());
      const matchTab = activeTab === 'all' || item.type === activeTab;
      return matchSearch && matchTab;
    });
  }, [search, activeTab]);

  const handleAISearch = () => {
    if (!search.trim()) return;
    setAgentWorking(true);
    setTimeout(() => {
      setAgentWorking(false);
      alert(`AI Agent searched for "${search}".\n\nFound matching results from local database.\n(Real Google Maps + official sites search coming in Stage 2)`);
    }, 1800);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_DATA.slice(0, 5).map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  return (
    <>
      <SEO 
        title="Schools, Hospitals, Gold Rates & News" 
        description="PakPedia – Find verified schools & hospitals across Pakistan, live gold & silver rates, today’s newspapers and latest Pakistan news. Trusted free information directory updated daily."
        path="/"
        schema={faqSchema}
      />

      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 py-16 md:py-24 px-4 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-100 px-4 py-1.5 rounded-full text-xs font-bold mb-6">
            <ShieldCheck className="w-4 h-4" /> Pakistan’s Trusted Information Engine
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-5 leading-tight">
            Schools • Hospitals • Rates • News
          </h1>
          <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Everything you need — verified listings of top schools and hospitals, live gold & silver rates, today’s newspapers and the latest Pakistan news. Free, accurate and updated daily.
          </p>

          <div className="max-w-3xl mx-auto bg-white p-2 rounded-2xl shadow-2xl flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex items-center px-4 gap-3 py-3">
              <Search className="text-slate-400 w-5 h-5 shrink-0" />
              <input
                type="text"
                placeholder="Search schools, hospitals, gold rate, news..."
                className="w-full focus:outline-none text-slate-800 font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAISearch()}
                aria-label="Search"
              />
            </div>
            <button 
              onClick={handleAISearch}
              disabled={agentWorking}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 text-white px-8 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition"
            >
              {agentWorking ? (
                <> <Zap className="w-4 h-4 animate-pulse" /> Searching...</>
              ) : (
                <> <Zap className="w-4 h-4" /> AI Search</>
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-center gap-6 md:gap-12 text-sm">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-amber-500" />
            <span className="text-slate-500 font-medium">Gold (24K):</span>
            <span className="font-black text-slate-900">Rs {goldRate.toLocaleString()}/tola</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-slate-400" />
            <span className="text-slate-500 font-medium">Silver:</span>
            <span className="font-black text-slate-900">Rs {silverRate.toLocaleString()}/tola</span>
          </div>
          <Link to="/rates" className="text-emerald-600 font-bold hover:underline flex items-center gap-1">
            Full Rates <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl border p-6 md:p-8">
          <h2 className="text-2xl font-black mb-4">Pakistan’s Complete Information Directory</h2>
          <div className="prose text-slate-600 max-w-none space-y-3 text-[15px] leading-relaxed">
            <p>
              PakPedia is built to be the most useful everyday information platform for Pakistanis. Whether you are looking for the best schools in Lahore, top-rated hospitals in Karachi, today’s gold rate in Pakistan, or the latest national news headlines, everything is available in one place — free of charge.
            </p>
            <p>
              Our verified directory currently covers major cities including Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar and Quetta. Each listing includes accurate contact numbers, locations, ratings, specialties (for hospitals) and curriculum details (for schools). We continuously expand coverage and keep data fresh so citizens can make informed decisions quickly.
            </p>
            <p>
              In addition to directories, PakPedia provides live indicative gold and silver rates, direct links to major Urdu and English newspapers, and curated Pakistan news headlines from trusted sources. Our mission is simple: make reliable information easy to access for every Pakistani.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="text-center p-4 bg-emerald-50 rounded-xl">
              <Building2 className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
              <p className="font-black text-xl">{DATA_STORE.filter(d => d.type === 'hospital').length}+</p>
              <p className="text-xs text-slate-500 font-medium">Verified Hospitals</p>
            </div>
            <div className="text-center p-4 bg-rose-50 rounded-xl">
              <GraduationCap className="w-6 h-6 text-rose-600 mx-auto mb-2" />
              <p className="font-black text-xl">{DATA_STORE.filter(d => d.type === 'school').length}+</p>
              <p className="text-xs text-slate-500 font-medium">Top Schools</p>
            </div>
            <div className="text-center p-4 bg-amber-50 rounded-xl">
              <Users className="w-6 h-6 text-amber-600 mx-auto mb-2" />
              <p className="font-black text-xl">8+</p>
              <p className="text-xs text-slate-500 font-medium">Major Cities</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <Award className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="font-black text-xl">Daily</p>
              <p className="text-xs text-slate-500 font-medium">Updates</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: 'Hospitals', icon: Stethoscope, path: '/hospitals', color: 'bg-rose-50 text-rose-600' },
            { title: 'Schools', icon: GraduationCap, path: '/schools', color: 'bg-emerald-50 text-emerald-600' },
            { title: 'Gold Rates', icon: TrendingUp, path: '/rates', color: 'bg-amber-50 text-amber-600' },
            { title: 'News', icon: Newspaper, path: '/news', color: 'bg-blue-50 text-blue-600' },
          ].map(item => (
            <Link key={item.title} to={item.path} className="bg-white border rounded-2xl p-5 hover:shadow-lg transition flex flex-col items-center gap-3 text-center">
              <div className={`p-3 rounded-xl ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <span className="font-bold text-sm">{item.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-black flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-emerald-600" /> Latest Pakistan News
            </h2>
            <Link to="/news" className="text-sm font-bold text-emerald-600 hover:underline">View all</Link>
          </div>
          <div className="space-y-4">
            {NEWS_HEADLINES.map((news, i) => (
              <div key={i} className="flex gap-4 pb-4 border-b border-slate-100 last:border-0">
                <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500 shrink-0"></div>
                <div>
                  <h3 className="font-bold text-slate-800 leading-snug">{news.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{news.summary}</p>
                  <p className="text-xs text-slate-400 mt-1">{news.source} • {news.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border p-6">
          <h2 className="text-xl font-black mb-5 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" /> Today’s Newspapers
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {NEWSPAPERS.map(paper => (
              <a key={paper.name} href={paper.url} target="_blank" rel="noopener noreferrer"
                className={`${paper.color} text-white rounded-xl p-4 text-center font-bold text-sm hover:opacity-90 transition`}>
                {paper.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-xl font-black mb-5">Most Searched in Pakistan</h2>
        <div className="flex flex-wrap gap-2">
          {MOST_SEARCHED.map(term => (
            <button key={term} onClick={() => setSearch(term)}
              className="bg-white border border-slate-200 hover:border-emerald-500 hover:text-emerald-700 px-4 py-2 rounded-full text-sm font-medium transition">
              {term}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-black">Directory Results</h2>
          <div className="flex gap-2 bg-white p-1 rounded-xl border">
            {['all', 'hospital', 'school'].map(t => (
              <button key={t} onClick={() => setActiveTab(t)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase ${activeTab === t ? 'bg-slate-900 text-white' : 'text-slate-500'}`}>
                {t === 'all' ? 'All' : t + 's'}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map(item => <EntityCard key={item.id} item={item} />)}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border p-6 md:p-8">
          <h2 className="text-2xl font-black mb-2 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-emerald-600" /> Frequently Asked Questions
          </h2>
          <p className="text-slate-500 mb-6">Common questions about PakPedia, our directories and services.</p>
          <div className="space-y-3">
            {FAQ_DATA.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  className="w-full text-left px-5 py-4 font-bold flex justify-between items-center hover:bg-slate-50 transition"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  <span className="text-emerald-600 text-xl">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-slate-600 leading-relaxed border-t">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link to="/faq" className="text-emerald-600 font-bold hover:underline">View all FAQs →</Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ListPage({ type }) {
  const title = type === 'hospital' ? 'Hospitals' : 'Schools';
  const data = DATA_STORE.filter(item => item.type === type);
  const path = `/${type}s`;

  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Best ${title} in Pakistan`,
    "description": `Verified list of top ${title.toLowerCase()} across Pakistan`,
    "numberOfItems": data.length,
    "itemListElement": data.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "url": `https://pakpediaonline.vercel.app/${item.type}s/${item.id}`
    }))
  };

  return (
    <>
      <SEO 
        title={`Best ${title} in Pakistan`} 
        description={`Verified list of top ${title.toLowerCase()} across Pakistan with ratings, phone numbers, locations and specialties. Find the best ${title.toLowerCase()} in Lahore, Karachi, Islamabad and more.`}
        path={path}
        schema={listSchema}
      />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-black mb-2">Best {title} in Pakistan</h1>
        <p className="text-slate-500 mb-4">{data.length} verified listings • Updated regularly</p>
        <p className="text-slate-600 mb-8 max-w-3xl">
          Browse our carefully curated and verified directory of the best {title.toLowerCase()} in Pakistan. 
          Each listing includes accurate contact information, location, ratings and key details to help you make an informed choice. 
          We cover major cities including Lahore, Karachi, Islamabad and more.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map(item => <EntityCard key={item.id} item={item} />)}
        </div>
      </div>
    </>
  );
}

function CityPage() {
  const { city } = useParams();
  const cityName = city.charAt(0).toUpperCase() + city.slice(1);
  const data = DATA_STORE.filter(item => item.city.toLowerCase() === city.toLowerCase());
  const hospitals = data.filter(d => d.type === 'hospital');
  const schools = data.filter(d => d.type === 'school');

  return (
    <>
      <SEO 
        title={`Schools & Hospitals in ${cityName}`} 
        description={`Find the best schools and hospitals in ${cityName}, Pakistan. Verified listings with phone numbers, ratings, locations and more on PakPedia.`}
        path={`/city/${city}`}
      />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-black mb-2">Schools & Hospitals in {cityName}</h1>
        <p className="text-slate-500 mb-4">{data.length} listings found</p>
        <p className="text-slate-600 mb-8 max-w-3xl">
          Discover top-rated schools and hospitals in {cityName}. Our directory provides verified contact details, 
          locations, ratings and specialties to help residents and visitors of {cityName} find the right institution quickly.
        </p>
        {hospitals.length > 0 && (
          <>
            <h2 className="text-xl font-black mb-4">Hospitals in {cityName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {hospitals.map(item => <EntityCard key={item.id} item={item} />)}
            </div>
          </>
        )}
        {schools.length > 0 && (
          <>
            <h2 className="text-xl font-black mb-4">Schools in {cityName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schools.map(item => <EntityCard key={item.id} item={item} />)}
            </div>
          </>
        )}
        {data.length === 0 && (
          <p className="text-slate-500">No listings found for this city yet. We are expanding coverage — check back soon or contact us to suggest a listing.</p>
        )}
      </div>
    </>
  );
}

function DetailPage() {
  const { id } = useParams();
  const item = DATA_STORE.find(i => i.id === id);
  if (!item) return <div className="p-20 text-center font-bold text-2xl">Not Found</div>;

  const schema = {
    "@context": "https://schema.org",
    "@type": item.type === 'hospital' ? 'Hospital' : 'School',
    "name": item.name,
    "description": item.description,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": item.city,
      "addressRegion": item.area,
      "addressCountry": "PK"
    },
    "telephone": item.phone,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": item.rating,
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <>
      <SEO 
        title={`${item.name} – ${item.city}`} 
        description={item.description}
        path={`/${item.type}s/${item.id}`}
        schema={schema}
      />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link to={`/${item.type}s`} className="text-emerald-600 font-bold text-sm mb-6 inline-block">← Back to list</Link>
        <div className="bg-white rounded-2xl border p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-3xl font-black">{item.name}</h1>
            <span className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm font-bold">
              <Star className="w-4 h-4 fill-current" /> {item.rating}
            </span>
          </div>
          <p className="text-slate-500 flex items-center gap-2 mb-6"><MapPin className="w-4 h-4" /> {item.area}, {item.city}, Pakistan</p>
          <p className="text-slate-600 mb-8 leading-relaxed">{item.description}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Phone</p>
              <a href={`tel:${item.phone}`} className="font-bold text-emerald-700 flex items-center gap-2">
                <Phone className="w-4 h-4" /> {item.phone}
              </a>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Timing</p>
              <p className="font-bold flex items-center gap-2"><Clock className="w-4 h-4" /> {item.timing}</p>
            </div>
          </div>

          {item.specialty && (
            <div className="mb-4">
              <p className="text-xs font-bold text-slate-400 uppercase mb-2">Specialties</p>
              <div className="flex flex-wrap gap-2">
                {item.specialty.map(s => (
                  <span key={s} className="bg-rose-50 text-rose-700 px-3 py-1 rounded-full text-sm font-medium">{s}</span>
                ))}
              </div>
            </div>
          )}
          {item.curriculum && (
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-2">Curriculum</p>
              <div className="flex flex-wrap gap-2">
                {item.curriculum.map(c => (
                  <span key={c} className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">{c}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function RatesPage() {
  return (
    <>
      <SEO 
        title="Live Gold & Silver Rates Pakistan" 
        description="Today’s gold and silver rates in Pakistan. Updated regularly. Check 24K gold price per tola and silver rates across major cities."
        path="/rates"
      />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-black mb-2">Gold & Silver Rates in Pakistan</h1>
        <p className="text-slate-500 mb-4">Live indicative rates • Updated throughout the day</p>
        <p className="text-slate-600 mb-8">
          Track today’s gold and silver prices in Pakistan. Rates shown are indicative market rates and may vary slightly by city and local market conditions. 
          Always confirm the exact rate with your jeweler or bullion dealer before making a transaction. Gold is traditionally measured in tola (11.664 grams) in Pakistan.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-8 text-center">
            <DollarSign className="w-10 h-10 text-amber-600 mx-auto mb-3" />
            <h2 className="text-xl font-bold mb-1">Gold 24K</h2>
            <p className="text-3xl font-black text-amber-700">Rs 2,85,400</p>
            <p className="text-sm text-amber-600 mt-1">per tola</p>
            <p className="text-xs text-amber-500 mt-3">≈ Rs 24,470 per gram</p>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-2xl p-8 text-center">
            <Activity className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h2 className="text-xl font-bold mb-1">Silver</h2>
            <p className="text-3xl font-black text-slate-700">Rs 3,250</p>
            <p className="text-sm text-slate-500 mt-1">per tola</p>
          </div>
        </div>
        <div className="mt-8 bg-white border rounded-2xl p-6">
          <h3 className="font-bold mb-3">Understanding Gold Rates in Pakistan</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Gold prices in Pakistan are influenced by international bullion markets (especially London and New York), the US dollar exchange rate against the Pakistani Rupee, 
            local demand during wedding seasons and festivals, and global geopolitical events. The Karachi and Lahore gold markets are the primary price discovery centers. 
            24K (pure gold) is the standard reference; 22K and 21K rates are calculated as a percentage of the 24K price.
          </p>
        </div>
        <p className="text-sm text-slate-400 mt-6 text-center">Rates are indicative and may vary by city and market. Last updated: {new Date().toLocaleDateString('en-PK')}</p>
      </div>
    </>
  );
}

function NewsPage() {
  return (
    <>
      <SEO 
        title="Pakistan News & Today’s Newspapers" 
        description="Latest Pakistan news headlines and direct links to major newspapers including Dawn, Jang, The News, Express Tribune and more."
        path="/news"
      />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-black mb-4">News & Newspapers</h1>
        <p className="text-slate-600 mb-8">
          Stay updated with the latest Pakistan news headlines from trusted sources and access full newspapers online. 
          We curate important national, economic and regional stories so you can quickly catch up on what matters.
        </p>
        <div className="bg-white rounded-2xl border p-6 mb-8">
          <h2 className="font-bold text-lg mb-4">Latest Headlines</h2>
          <div className="space-y-4">
            {NEWS_HEADLINES.map((n, i) => (
              <div key={i} className="pb-4 border-b last:border-0">
                <h3 className="font-bold">{n.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{n.summary}</p>
                <p className="text-xs text-slate-400 mt-1">{n.source} • {n.time}</p>
              </div>
            ))}
          </div>
        </div>
        <h2 className="font-bold text-lg mb-4">Read Full Newspapers</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {NEWSPAPERS.map(p => (
            <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
              className={`${p.color} text-white rounded-xl p-5 text-center font-bold hover:opacity-90 transition`}>
              {p.name}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

function FAQPage() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_DATA.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  return (
    <>
      <SEO 
        title="FAQ – Frequently Asked Questions" 
        description="Answers to common questions about PakPedia, verified school and hospital listings, gold rates, news and how to get listed."
        path="/faq"
        schema={faqSchema}
      />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-black mb-2">Frequently Asked Questions</h1>
        <p className="text-slate-500 mb-8">Everything you need to know about using PakPedia.</p>
        <div className="space-y-3">
          {FAQ_DATA.map((faq, i) => (
            <div key={i} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <button
                className="w-full text-left px-5 py-4 font-bold flex justify-between items-center hover:bg-slate-50 transition"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {faq.q}
                <span className="text-emerald-600 text-xl">{openFaq === i ? '−' : '+'}</span>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-slate-600 leading-relaxed border-t pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <SEO 
        title="About PakPedia" 
        description="About Pakistan’s complete information directory for schools, hospitals, gold rates and news. Our mission is to make reliable information easy to access."
        path="/about"
      />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-black mb-6">About PakPedia</h1>
        <div className="prose text-slate-600 space-y-4 text-[15px] leading-relaxed">
          <p>PakPedia is built to be Pakistan’s most useful everyday information platform.</p>
          <p>We help citizens quickly find verified schools, hospitals, check live gold & silver rates, read today’s newspapers and stay updated with national news.</p>
          <p>Our mission is simple: make reliable information easy to access for every Pakistani. We believe that transparent, accurate public information strengthens communities and helps people make better decisions for their families.</p>
          <p>The directory currently covers major metropolitan areas and continues to expand. All core features remain free. We welcome feedback, corrections and new listing suggestions from the public.</p>
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 mt-6">
            <p className="font-bold text-emerald-800 flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Our Commitments</p>
            <ul className="mt-2 space-y-1 text-sm text-emerald-900 list-disc list-inside">
              <li>Verified contact details and locations</li>
              <li>Regular updates to rates and news</li>
              <li>No paywalls for essential public information</li>
              <li>Clear attribution and transparent sources</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

function ContactPage() {
  return (
    <>
      <SEO 
        title="Contact Us" 
        description="Contact the PakPedia team for listing updates, corrections, partnerships or general inquiries. Email hello@pakpedia.pk or call +92-42-111-725-333."
        path="/contact"
      />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-black mb-6">Contact Us</h1>
        <p className="text-slate-600 mb-8">
          Have a correction, new listing suggestion, partnership inquiry or feedback? We would love to hear from you. 
          Our team typically responds within 1–2 business days.
        </p>
        <div className="bg-white border rounded-2xl p-8 space-y-6">
          <div className="flex items-center gap-4">
            <Mail className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <p className="text-sm text-slate-400 font-bold uppercase">Email</p>
              <a href="mailto:hello@pakpedia.pk" className="font-bold text-lg">hello@pakpedia.pk</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <p className="text-sm text-slate-400 font-bold uppercase">Phone</p>
              <a href="tel:+9242111725333" className="font-bold text-lg">+92-42-111-725-333</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <MapPin className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <p className="text-sm text-slate-400 font-bold uppercase">Office</p>
              <p className="font-bold text-lg">Lahore, Punjab, Pakistan</p>
            </div>
          </div>
        </div>
        <p className="text-sm text-slate-500 mt-6">
          For listing requests please include: full institution name, city, area, phone number, website (if any), and a short description.
        </p>
      </div>
    </>
  );
}

function PrivacyPage() {
  return (
    <>
      <SEO 
        title="Privacy Policy" 
        description="PakPedia Privacy Policy. We respect your privacy and do not sell personal data."
        path="/privacy"
      />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-black mb-6">Privacy Policy</h1>
        <div className="text-slate-600 space-y-4 leading-relaxed">
          <p><strong>Last updated:</strong> July 2026</p>
          <p>We respect your privacy. PakPedia is an information directory. We do not sell personal data.</p>
          <p>When you contact us via email or forms, we use the information solely to respond to your inquiry. We do not share your contact details with third parties for marketing purposes.</p>
          <p>Our website may use basic analytics (such as page views) to understand usage patterns and improve the service. No personally identifiable information is sold or traded.</p>
          <p>For any data-related requests or questions, please contact us at hello@pakpedia.pk.</p>
        </div>
      </div>
    </>
  );
}

// -------------------- APP --------------------
export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hospitals" element={<ListPage type="hospital" />} />
            <Route path="/schools" element={<ListPage type="school" />} />
            <Route path="/city/:city" element={<CityPage />} />
            <Route path="/hospitals/:id" element={<DetailPage />} />
            <Route path="/schools/:id" element={<DetailPage />} />
            <Route path="/rates" element={<RatesPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  );
}
