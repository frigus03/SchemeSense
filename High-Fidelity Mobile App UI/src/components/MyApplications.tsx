import { Clock, ChevronRight, FileSearch, Calendar, Star } from 'lucide-react';

interface Application {
    id: string;
    schemeName: string;
    status: 'pending' | 'verified' | 'approved' | 'rejected';
    date: string;
    progress: number;
    category: string;
}

const MOCK_APPLICATIONS: Application[] = [
    {
        id: 'APP-9821',
        schemeName: 'PM-Kisan Samman Nidhi',
        status: 'approved',
        date: '2024-02-15',
        progress: 100,
        category: 'Farmers'
    },
    {
        id: 'APP-4432',
        schemeName: 'Ayushman Bharat (PM-JAY)',
        status: 'pending',
        date: '2024-03-01',
        progress: 45,
        category: 'Healthcare'
    },
    {
        id: 'APP-1120',
        schemeName: 'Post Matric Scholarship',
        status: 'verified',
        date: '2024-02-28',
        progress: 75,
        category: 'Students'
    }
];

export function MyApplications() {
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'approved': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
            case 'rejected': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
            case 'verified': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
            default: return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400';
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black pb-24 transition-colors duration-500">
            {/* Header */}
            <div className="bg-gradient-to-br from-[#2563eb] via-[#1e40af] to-[#1e3a8a] px-6 pt-12 pb-10 shadow-lg rounded-b-[40px] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                <h1 className="text-2xl font-black text-white tracking-tight">My Applications</h1>
                <p className="text-sm text-blue-100 font-bold mt-1 opacity-90">Track your benefit status in real-time</p>
            </div>

            <div className="flex-1 px-4 py-8">
                {MOCK_APPLICATIONS.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {MOCK_APPLICATIONS.map(app => (
                            <div key={app.id} className="bg-white dark:bg-gray-900 rounded-[32px] p-6 shadow-sm border border-gray-100 dark:border-gray-800/50 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 relative overflow-hidden group flex flex-col h-full">
                                {/* Status Ribbon */}
                                <div className={`absolute top-0 right-0 px-4 py-2 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest ${getStatusStyle(app.status)} shadow-sm z-10`}>
                                    {app.status}
                                </div>

                                <div className="flex items-start gap-4 mb-6">
                                    <div className={`p-4 rounded-2xl flex-shrink-0 ${app.status === 'approved' ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 'bg-blue-50 dark:bg-blue-900/20 text-[#2563eb] dark:text-blue-400'}`}>
                                        <FileSearch size={24} />
                                    </div>
                                    <div className="flex-1 pr-12">
                                        <div className="text-[9px] font-black text-[#2563eb] dark:text-blue-400 uppercase tracking-[0.2em] mb-1.5">{app.category}</div>
                                        <h3 className="text-base font-black text-gray-900 dark:text-gray-100 leading-tight mb-2 line-clamp-1 tracking-tight">{app.schemeName}</h3>
                                        <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 font-bold">
                                            <Calendar size={14} />
                                            {app.date}
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Section */}
                                <div className="space-y-3 mt-auto">
                                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                                        <span className="text-gray-400 dark:text-gray-500">Application Progress</span>
                                        <span className="text-[#2563eb] dark:text-blue-400">{app.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 shadow-inner">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 shadow-sm ${app.status === 'approved' ? 'bg-green-500 dark:bg-green-600' : 'bg-[#2563eb] dark:bg-blue-600'}`}
                                            style={{ width: `${app.progress}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Action Bar */}
                                <div className="flex justify-between items-center mt-6 pt-5 border-t border-gray-50 dark:border-gray-800">
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className={`w-3 h-1 rounded-full transition-colors ${i <= (app.progress / 25) ? (app.status === 'approved' ? 'bg-green-500' : 'bg-[#2563eb] dark:bg-blue-600') : 'bg-gray-200 dark:bg-gray-800'}`} />
                                        ))}
                                    </div>
                                    <button className="flex items-center gap-1.5 text-[#2563eb] dark:text-blue-400 text-[10px] font-black group-hover:gap-3 transition-all uppercase tracking-[0.15em]">
                                        Track Details
                                        <ChevronRight size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center py-24 text-center">
                        <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-[40px] mb-8 shadow-inner">
                            <Clock size={48} className="text-gray-300 dark:text-gray-700" />
                        </div>
                        <h3 className="text-xl font-black text-gray-900 dark:text-gray-100 tracking-tight">No Applications Yet</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[240px] mt-3 font-bold leading-relaxed">
                            Start by discovering schemes that match your profile.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
