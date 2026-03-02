import { ArrowLeft, CheckCircle2, Info, FileText, CreditCard, ExternalLink, Share2, Bookmark, ArrowRight } from 'lucide-react';

interface SchemeDetailsProps {
    scheme: {
        id: string;
        name: string;
        category: string;
        summary: string;
        benefits: string;
    };
    onBack: () => void;
    onCheckEligibility: () => void;
    onApply: () => void;
}

export function SchemeDetails({ scheme, onBack, onCheckEligibility, onApply }: SchemeDetailsProps) {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 pb-6 z-50 transition-colors duration-500">
            {/* Sticky Header */}
            <div className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-4 py-4 flex items-center justify-between z-20 transition-colors">
                <button onClick={onBack} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors group">
                    <ArrowLeft size={24} className="text-gray-700 dark:text-gray-300 group-hover:-translate-x-1 transition-transform" />
                </button>
                <div className="flex gap-1">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-400 dark:text-gray-500 group">
                        <Bookmark size={22} className="group-hover:scale-110 transition-transform" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-400 dark:text-gray-500 group">
                        <Share2 size={22} className="group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pb-24">
                {/* Banner Section */}
                <div className="bg-gradient-to-br from-[#2563eb] via-[#1e40af] to-[#1e3a8a] px-6 py-12 text-white shadow-lg overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                    <span className="inline-block px-3 py-1 bg-white/20 dark:bg-blue-400/20 rounded-lg text-xs font-black uppercase tracking-[0.15em] mb-4 backdrop-blur-md border border-white/20">
                        {scheme.category}
                    </span>
                    <h1 className="text-2xl font-black leading-tight mb-3 tracking-tight">{scheme.name}</h1>
                    <p className="text-sm text-white/70 leading-relaxed font-bold opacity-90">Department of Agriculture & Farmers Welfare</p>
                </div>

                {/* Content Tabs-like sections */}
                <div className="px-6 -mt-8 relative z-10">
                    <div className="glass-card rounded-[32px] p-8 shadow-2xl transition-all duration-500">
                        <div className="flex items-center gap-2 mb-4 text-[#2563eb] dark:text-blue-400">
                            <Info size={20} className="animate-pulse" />
                            <h2 className="text-lg font-black tracking-tight">About Scheme</h2>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-8 font-medium">
                            {scheme.summary} The scheme aims at providing financial assistance to beneficiaries to stabilize their income and ensure sustainable growth in the {scheme.category.toLowerCase()} sector.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl p-4 border border-blue-100 dark:border-blue-800/50 group hover:shadow-md transition-all">
                                <span className="text-[9px] uppercase font-black text-blue-500 dark:text-blue-400 block mb-1 tracking-widest">Benefit Type</span>
                                <span className="text-sm font-bold text-gray-800 dark:text-gray-100">Financial Grant</span>
                            </div>
                            <div className="bg-green-50/50 dark:bg-green-900/20 rounded-2xl p-4 border border-green-100 dark:border-green-800/50 group hover:shadow-md transition-all">
                                <span className="text-[9px] uppercase font-black text-green-500 dark:text-green-400 block mb-1 tracking-widest">Match Score</span>
                                <span className="text-sm font-bold text-gray-800 dark:text-gray-100">High Relevance</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Eligibility Criteria */}
                <div className="px-6 mt-12">
                    <div className="flex items-center gap-2 mb-6">
                        <CheckCircle2 size={20} className="text-[#2563eb] dark:text-blue-400" />
                        <h2 className="text-lg font-black text-gray-800 dark:text-gray-100 tracking-tight">Eligibility Criteria</h2>
                    </div>
                    <div className="space-y-3">
                        {[
                            'Must be a permanent resident of India.',
                            'Total annual family income should not exceed ₹6.00 Lakhs.',
                            'Small and marginal farmers holding registered land.',
                            'Age should be between 18 to 60 years.'
                        ].map((item, idx) => (
                            <div key={idx} className="flex gap-4 items-start p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-2xl border border-transparent hover:border-gray-100 dark:hover:border-gray-800 transition-all group">
                                <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 flex-shrink-0 group-hover:scale-125 transition-transform" />
                                <p className="text-sm text-gray-600 dark:text-gray-300 font-semibold">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Required Documents */}
                <div className="px-6 mt-12">
                    <div className="flex items-center gap-2 mb-6">
                        <FileText size={20} className="text-[#2563eb] dark:text-blue-400" />
                        <h2 className="text-lg font-black text-gray-800 dark:text-gray-100 tracking-tight">Documents Needed</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        {['Aadhaar Card', 'Land Records / RTC', 'Bank Passbook', 'Income Certificate'].map((doc, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 group hover:border-[#2563eb] dark:hover:border-blue-400 transition-all">
                                <div className="p-2 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                                    <CreditCard size={18} className="text-gray-400 group-hover:text-[#2563eb] dark:group-hover:text-blue-400 transition-colors" />
                                </div>
                                <span className="text-sm font-bold text-gray-700 dark:text-gray-200">{doc}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* How to Apply */}
                <div className="px-6 mt-12 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800/40 dark:to-gray-900/40 rounded-[32px] p-8 border border-blue-100 dark:border-gray-800 shadow-inner">
                        <h3 className="text-base font-black text-[#2563eb] dark:text-blue-400 mb-5 flex items-center gap-2 uppercase tracking-wide">
                            <ExternalLink size={18} />
                            How to Apply
                        </h3>
                        <ol className="text-sm text-gray-700 dark:text-gray-300 space-y-4 list-decimal list-inside font-bold leading-relaxed">
                            <li>Visit the official portal using the link below.</li>
                            <li>Authenticate using your Aadhaar or Mobile number.</li>
                            <li>Fill the application form with accurate details.</li>
                            <li>Upload scan copies of all required documents.</li>
                        </ol>
                        <button className="w-full mt-8 py-4 text-sm font-black text-white bg-[#2563eb] dark:bg-blue-600 rounded-2xl shadow-xl hover:bg-[#1d4ed8] dark:hover:bg-blue-700 transition-all transform active:scale-[0.98]">
                            Visit Official Portal
                        </button>
                    </div>
                </div>
            </div>

            {/* Floating Action Buttons */}
            <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 flex gap-4 z-50 transition-colors">
                <button
                    onClick={onCheckEligibility}
                    className="flex-1 bg-white dark:bg-gray-800 text-[#2563eb] dark:text-blue-400 border-2 border-blue-50 dark:border-gray-700 py-4.5 rounded-2xl font-black shadow-sm flex items-center justify-center gap-2 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all active:scale-95"
                >
                    Check Eligibility
                </button>
                <button
                    onClick={onApply}
                    className="flex-[1.5] bg-[#2563eb] dark:bg-blue-600 text-white py-4.5 rounded-2xl font-black shadow-2xl flex items-center justify-center gap-2 hover:bg-[#1d4ed8] dark:hover:bg-blue-700 active:scale-95 transition-all hover:shadow-blue-500/20"
                >
                    Apply Now
                    <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
}
