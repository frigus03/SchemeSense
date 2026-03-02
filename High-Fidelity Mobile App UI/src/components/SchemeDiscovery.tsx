import { useState, useEffect } from 'react';
import { Search, Filter, Bookmark, ArrowRight, Star, Heart } from 'lucide-react';
import { SchemeDetails } from './SchemeDetails';
import { SchemeDiscoverySkeleton } from './Skeleton';

interface Scheme {
    id: string;
    name: string;
    category: string;
    summary: string;
    matchScore: number;
    benefits: string;
}

const MOCK_SCHEMES: Scheme[] = [
    {
        id: '1',
        name: 'Pradhan Mantri Fasal Bima Yojana',
        category: 'Farmers',
        summary: 'Comprehensive insurance cover against failure of the crop thus helping in stabilizing the income of the farmers.',
        matchScore: 95,
        benefits: 'Financial support to farmers'
    },
    {
        id: '2',
        name: 'PM-Kisan Samman Nidhi',
        category: 'Farmers',
        summary: 'Income support of ₹6,000 per year in three equal installments to all landholding farmer families.',
        matchScore: 88,
        benefits: '₹6,000/year income support'
    },
    {
        id: '3',
        name: 'Post Matric Scholarship',
        category: 'Students',
        summary: 'Financial assistance to the Scheduled Caste students studying at post matriculation or post-secondary stage.',
        matchScore: 72,
        benefits: 'Full tuition fee coverage'
    },
    {
        id: '4',
        name: 'Sukanya Samriddhi Yojana',
        category: 'Women',
        summary: 'A small deposit scheme for the girl child launched as a part of the Beti Bachao Beti Padhao campaign.',
        matchScore: 65,
        benefits: 'High interest rate savings'
    },
    {
        id: '5',
        name: 'Ayushman Bharat (PM-JAY)',
        category: 'Healthcare',
        summary: 'Provides health cover of ₹5 Lakhs per family per year for secondary and tertiary care hospitalization.',
        matchScore: 90,
        benefits: '₹5 Lakhs health insurance'
    }
];

const CATEGORIES = ['All', 'Farmers', 'Students', 'Women', 'Healthcare', 'Business'];

export function SchemeDiscovery({ onCheckEligibility, onApply }: { onCheckEligibility: () => void, onApply: (scheme: any) => void }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [bookmarked, setBookmarked] = useState<string[]>([]);
    const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const filteredSchemes = MOCK_SCHEMES.filter(scheme => {
        const matchesSearch = scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            scheme.summary.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'All' || scheme.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const toggleBookmark = (id: string) => {
        setBookmarked(prev =>
            prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
        );
    };

    if (selectedScheme) {
        return (
            <SchemeDetails
                scheme={selectedScheme}
                onBack={() => setSelectedScheme(null)}
                onCheckEligibility={() => {
                    setSelectedScheme(null);
                    onCheckEligibility();
                }}
                onApply={() => {
                    setSelectedScheme(null);
                    onApply(selectedScheme);
                }}
            />
        );
    }

    return (
        <div className="flex flex-col h-screen bg-gray-50 dark:bg-black pb-20 transition-colors duration-500">
            {/* Header */}
            <div className="bg-gradient-to-br from-[#2563eb] via-[#1e40af] to-[#1e3a8a] pt-8 pb-8 px-6 rounded-b-[40px] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                <h1 className="text-2xl font-black text-white mb-6 tracking-tight">Discover Schemes</h1>
                {/* Search Bar */}
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-[#2563eb] dark:group-focus-within:text-blue-400 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search for schemes, benefits..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white dark:bg-gray-900 rounded-[20px] py-4 pl-12 pr-4 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 border border-transparent focus:border-white/20 shadow-xl font-bold transition-all"
                    />
                </div>
            </div>

            {/* Category Filters */}
            <div className="px-6 py-6 overflow-x-auto no-scrollbar">
                <div className="flex gap-3 whitespace-nowrap">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all transform active:scale-95 ${activeCategory === cat
                                ? 'bg-[#2563eb] dark:bg-blue-600 text-white shadow-xl shadow-blue-500/20'
                                : 'bg-white dark:bg-gray-900 text-gray-400 dark:text-gray-500 border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {!isLoading && (
                <div className="px-6 mb-4 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.15em]">
                    <span className="text-gray-400 dark:text-gray-600">{filteredSchemes.length} schemes found</span>
                    <button className="flex items-center gap-1.5 text-[#2563eb] dark:text-blue-400 hover:scale-105 transition-transform">
                        <Filter size={14} />
                        Sort by Relevance
                    </button>
                </div>
            )}

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto px-6 pb-24">
                {isLoading ? (
                    <SchemeDiscoverySkeleton />
                ) : filteredSchemes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {filteredSchemes.map(scheme => (
                            <div key={scheme.id} className="bg-white dark:bg-gray-900 rounded-[28px] p-6 shadow-sm border border-gray-50 dark:border-gray-800/50 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col h-full relative group">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-[#2563eb] dark:text-blue-400 text-[9px] font-black rounded-lg uppercase tracking-widest border border-blue-100 dark:border-blue-900/30">
                                        {scheme.category}
                                    </span>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); toggleBookmark(scheme.id); }}
                                        className={`${bookmarked.includes(scheme.id) ? 'text-yellow-500' : 'text-gray-200 dark:text-gray-700'} transition-all transform hover:scale-110 active:scale-95`}
                                    >
                                        <Bookmark size={22} fill={bookmarked.includes(scheme.id) ? 'currentColor' : 'none'} className="drop-shadow-sm" />
                                    </button>
                                </div>
                                <h3 className="text-lg font-black text-gray-900 dark:text-gray-100 mb-2 leading-tight tracking-tight">{scheme.name}</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-6 leading-relaxed font-semibold opacity-80">{scheme.summary}</p>
                                <div className="flex items-center justify-between mt-auto pt-5 border-t border-gray-50 dark:border-gray-800">
                                    <div className="flex items-center gap-1.5">
                                        <div className="flex items-center gap-1 text-green-600 dark:text-green-500">
                                            <Star size={14} fill="currentColor" />
                                            <span className="text-[10px] font-black uppercase tracking-wider">{scheme.matchScore}% Match</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedScheme(scheme)}
                                        className="flex items-center gap-2 text-[#2563eb] dark:text-blue-400 text-sm font-black hover:gap-3 transition-all"
                                    >
                                        Details
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-64 flex flex-col items-center justify-center text-gray-400">
                        <Search size={48} className="mb-2 opacity-20" />
                        <p className="text-sm font-bold">No schemes match your search</p>
                    </div>
                )}
            </div>
        </div>
    );
}
