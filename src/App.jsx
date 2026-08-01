import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  Search, MapPin, Globe, Phone, Clock, Star, ExternalLink,
  Menu, X, Stethoscope, GraduationCap, ShieldCheck, Mail,
  Newspaper, TrendingUp, Zap, ArrowRight, BookOpen,
  DollarSign, Activity
} from 'lucide-react';

// -------------------- DATA --------------------
const DATA_STORE = [
  { id: 'h1', type: 'hospital', name: 'Shaukat Khanum Memorial Cancer Hospital', city: 'Lahore', area: 'Johar Town', specialty: ['Oncology', 'Emergency'], rating: 4.9, phone: '042-111155555', timing: '24/7', description: 'Pakistan’s leading cancer hospital founded by Imran Khan.' },
  { id: 'h2', type: 'hospital', name: 'Mayo Hospital', city: 'Lahore', area: 'Anarkali', specialty: ['General', 'Surgery', 'ER'], rating: 4.2, phone: '042-99211100', timing: '24/7', description: 'One of the oldest and largest public hospitals in Lahore.' },
  { id: 'h3', type: 'hospital', name: 'Doctors Hospital & Medical Centre', city: 'Lahore', area: 'Canal Road', specialty: ['Cardiac', 'Diagnostics'], rating: 4.5, phone: '042-111223344', timing: '24/7', description: 'Premium private hospital with advanced diagnostics.' },
  { id: 'h4', type: 'hospital', name: 'Aga Khan University Hospital', city: 'Karachi', area: 'Stadium Road', specialty: ['Multi-Specialty', 'Research'], rating: 4.9, phone: '021-111911911', timing: '24/7', description: 'World-class teaching hospital and research centre.' },
  { id: 'h5', type: 'hospital', name: 'Indus Hospital', city: 'Karachi', area: 'Korangi', specialty: ['Free Healthcare', 'General'], rating: 4.8, phone: '021-35112709', timing: '24/7', description: 'Quality free healthcare for all.' },
  { id: 'h6', type: 'hospital', name: 'Jinnah Postgraduate Medical Centre', city: 'Karachi', area: 'Cantt', specialty: ['Public', 'Emergency'], rating: 4.1, phone: '021-99201300', timing: '24/7', description: 'Major public tertiary care hospital.' },
  { id: 'h7', type: 'hospital', name: 'PIMS', city: 'Islamabad', area: 'G-8', specialty: ['Federal', 'Specialty'], rating: 4.0, phone: '051-9261170', timing: '24/7', description: 'Premier federal government hospital.' },
  { id: 'h8', type: 'hospital', name: 'Shifa International Hospital', city: 'Islamabad', area: 'H-8', specialty: ['Liver Transplant', 'Cardiac'], rating: 4.6, phone: '051-8463000', timing: '24/7', description: 'Leading private hospital with organ transplant facilities.' },
  { id: 's1', type: 'school', name: 'Aitchison College', city: 'Lahore', area: 'Mall Road', curriculum: ['Cambridge', 'Matric'], rating: 4.9, phone: '042-36317201', timing: '08:00 - 14:00', description: 'Historic elite boys school founded in 1886.' },
  { id: 's2', type: 'school', name: 'Lahore Grammar School (LGS)', city: 'Lahore', area: 'Gulberg', curriculum: ['O-Levels', 'A-Levels'], rating: 4.7, phone: '042-35712566', timing: '07:30 - 13:30', description: 'One of the largest private school networks in Pakistan.' },
  { id: 's3', type: 'school', name: 'Karachi Grammar School', city: 'Karachi', area: 'Saddar', curriculum: ['British'], rating: 4.9, phone: '021-32253732', timing: '08:00 - 14:00', description: 'Prestigious co-educational school established in 1847.' },
  { id: 's4', type: 'school', name: 'The City School', city: 'Karachi', area: 'PAF Chapter', curriculum: ['O/A Levels'], rating: 4.5, phone: '021-34544106', timing: '08:00 - 14:00', description: 'Large national private school network.' },
  { id: 's5', type: 'school', name: 'Roots Millennium Schools', city: 'Islamabad', area: 'E-11', curriculum: ['IB', 'Cambridge'], rating: 4.6, phone: '051-111111193', timing: '07:30 - 14:00', description: 'Modern international curriculum schools.' },
  { id: 's6', type: 'school', name: 'Beaconhouse Newlands', city: 'Islamabad', area: 'Bani Gala', curriculum: ['International'], rating: 4.7, phone: '051-2612989', timing: '08:00 - 15:00', description: 'Part of the Beaconhouse School System.' },
];

const cities = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan'];

const NEWS_HEADLINES = [
  { title: "Pakistan's economy shows signs of recovery in Q2", source: "Dawn", time: "2 hours ago" },
  { title: "New education policy aims to boost STEM in public schools", source: "The News", time: "4 hours ago" },
  { title: "Karachi heatwave alert issued by Met Office", source: "Geo News", time: "5 hours ago" },
  { title: "Gold prices remain high amid global uncertainty", source: "Business Recorder", time: "6 hours ago" },
  { title: "Punjab launches new hospital modernization drive", source: "Express Tribune", time: "8 hours ago" },
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
  "NADRA office near me", "Passport office appointment", "FBR tax calculator"
];

// -------------------- SEO --------------------
function SEO({ title, description }) {
  const fullTitle = title ? `${title} | PakPedia` : 'PakPedia – Schools, Hospitals, News & Rates in Pakistan';
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}

// -------------------- LAYOUT --------------------
function Layout({ children }) {
  const [mobileMenu, setMobileMenu] = useState(false);

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
            <Link to="/about" className="hover:text-emerald-700">About</Link>
            <Link to="/contact" className="bg-slate-900 text-white px-5 py-2 rounded-full hover:bg-emerald-700 transition text-sm">
              Contact
            </Link>
          </div>

          <button className="lg:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenu && (
          <div className="lg:hidden bg-white border-t px-4 py-4 space-y-3 font-bold">
            <Link to="/" onClick={() => setMobileMenu(false)} className="block">Home</Link>
            <Link to="/hospitals" onClick={() => setMobileMenu(false)} className="block">Hospitals</Link>
            <Link to="/schools" onClick={() => setMobileMenu(false)} className="block">Schools</Link>
            <Link to="/rates" onClick={() => setMobileMenu(false)} className="block">Gold Rates</Link>
            <Link to="/news" onClick={() => setMobileMenu(false)} className="block">News</Link>
            <Link to="/about" onClick={() => setMobileMenu(false)} className="block">About</Link>
            <Link to="/contact" onClick={() => setMobileMenu(false)} className="block">Contact</Link>
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
              <p className="text-slate-400 text-sm leading-relaxed">
                Pakistan’s all-in-one directory for schools, hospitals, gold rates, news and essential services.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-4 text-sm uppercase tracking-wider text-slate-300">Directories</h5>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/hospitals" className="hover:text-white">Hospitals</Link></li>
                <li><Link to="/schools" className="hover:text-white">Schools</Link></li>
                <li><Link to="/rates" className="hover:text-white">Gold & Silver Rates</Link></li>
                <li><Link to="/news" className="hover:text-white">News & Newspapers</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4 text-sm uppercase tracking-wider text-slate-300">Cities</h5>
              <ul className="space-y-2 text-sm text-slate-400">
                {cities.slice(0, 4).map(c => (
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
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} PakPedia • Built for a Digital Pakistan
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

  return (
    <>
      <SEO 
        title="Best Schools, Hospitals, Gold Rates & News in Pakistan" 
        description="PakPedia - Find verified schools & hospitals, live gold silver rates, today's newspapers and latest Pakistan news." 
      />

      {/* HERO */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 py-16 md:py-24 px-4 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-100 px-4 py-1.5 rounded-full text-xs font-bold mb-6">
            <ShieldCheck className="w-4 h-4" /> Pakistan’s Trusted Information Engine
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-5 leading-tight">
            Schools • Hospitals • Rates • News
          </h1>
          <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Everything you need — verified listings, live gold rates, today’s newspapers and more.
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

      {/* LIVE RATES BAR */}
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

      {/* QUICK LINKS */}
      <section className="max-w-7xl mx-auto px-4 py-10">
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

      {/* NEWS + NEWSPAPERS */}
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

      {/* MOST SEARCHED */}
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

      {/* RESULTS */}
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
    </>
  );
}

function ListPage({ type }) {
  const title = type === 'hospital' ? 'Hospitals' : 'Schools';
  const data = DATA_STORE.filter(item => item.type === type);
  return (
    <>
      <SEO title={`Best ${title} in Pakistan`} description={`Verified list of top ${title.toLowerCase()} across Pakistan with ratings, phone numbers and locations.`} />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-black mb-2">Best {title} in Pakistan</h1>
        <p className="text-slate-500 mb-8">{data.length} verified listings</p>
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
  return (
    <>
      <SEO title={`Schools & Hospitals in ${cityName}`} description={`Find the best schools and hospitals in ${cityName}, Pakistan.`} />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-black mb-2">Schools & Hospitals in {cityName}</h1>
        <p className="text-slate-500 mb-8">{data.length} listings found</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map(item => <EntityCard key={item.id} item={item} />)}
        </div>
      </div>
    </>
  );
}

function DetailPage() {
  const { id } = useParams();
  const item = DATA_STORE.find(i => i.id === id);
  if (!item) return <div className="p-20 text-center font-bold text-2xl">Not Found</div>;

  return (
    <>
      <SEO title={`${item.name} – ${item.city}`} description={item.description} />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link to={`/${item.type}s`} className="text-emerald-600 font-bold text-sm mb-6 inline-block">← Back to list</Link>
        <div className="bg-white rounded-2xl border p-8">
          <h1 className="text-3xl font-black mb-2">{item.name}</h1>
          <p className="text-slate-500 flex items-center gap-2 mb-6"><MapPin className="w-4 h-4" /> {item.area}, {item.city}</p>
          <p className="text-slate-600 mb-8">{item.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        </div>
      </div>
    </>
  );
}

function RatesPage() {
  return (
    <>
      <SEO title="Live Gold & Silver Rates in Pakistan" description="Today’s gold and silver rates in Pakistan. Updated regularly." />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-black mb-2">Gold & Silver Rates</h1>
        <p className="text-slate-500 mb-8">Live indicative rates (Pakistan)</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-8 text-center">
            <DollarSign className="w-10 h-10 text-amber-600 mx-auto mb-3" />
            <h2 className="text-xl font-bold mb-1">Gold 24K</h2>
            <p className="text-3xl font-black text-amber-700">Rs 2,85,400</p>
            <p className="text-sm text-amber-600 mt-1">per tola</p>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-2xl p-8 text-center">
            <Activity className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h2 className="text-xl font-bold mb-1">Silver</h2>
            <p className="text-3xl font-black text-slate-700">Rs 3,250</p>
            <p className="text-sm text-slate-500 mt-1">per tola</p>
          </div>
        </div>
        <p className="text-sm text-slate-400 mt-6 text-center">Rates are indicative and may vary by city and market.</p>
      </div>
    </>
  );
}

function NewsPage() {
  return (
    <>
      <SEO title="Pakistan News & Today’s Newspapers" description="Latest Pakistan news headlines and direct links to major newspapers." />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-black mb-8">News & Newspapers</h1>
        <div className="bg-white rounded-2xl border p-6 mb-8">
          <h2 className="font-bold text-lg mb-4">Latest Headlines</h2>
          <div className="space-y-4">
            {NEWS_HEADLINES.map((n, i) => (
              <div key={i} className="pb-4 border-b last:border-0">
                <h3 className="font-bold">{n.title}</h3>
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

function AboutPage() {
  return (
    <>
      <SEO title="About PakPedia" description="About Pakistan’s complete information directory for schools, hospitals, rates and news." />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-black mb-6">About PakPedia</h1>
        <div className="prose text-slate-600 space-y-4">
          <p>PakPedia is built to be Pakistan’s most useful everyday information platform.</p>
          <p>We help citizens quickly find verified schools, hospitals, check live gold & silver rates, read today’s newspapers and stay updated with national news.</p>
          <p>Our mission is simple: make reliable information easy to access for every Pakistani.</p>
        </div>
      </div>
    </>
  );
}

function ContactPage() {
  return (
    <>
      <SEO title="Contact Us" description="Contact the PakPedia team for listing updates or partnerships." />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-black mb-6">Contact Us</h1>
        <div className="bg-white border rounded-2xl p-8">
          <div className="flex items-center gap-4">
            <Mail className="w-6 h-6 text-emerald-600" />
            <div>
              <p className="text-sm text-slate-400 font-bold uppercase">Email</p>
              <a href="mailto:hello@pakpedia.pk" className="font-bold text-lg">hello@pakpedia.pk</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function PrivacyPage() {
  return (
    <>
      <SEO title="Privacy Policy" description="PakPedia Privacy Policy." />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-black mb-6">Privacy Policy</h1>
        <p className="text-slate-600">Last updated: July 2026. We respect your privacy. We do not sell personal data. Contact us for any data-related requests.</p>
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
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  );
}
