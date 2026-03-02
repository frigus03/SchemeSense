import { User, Settings, Globe, Shield, LogOut, ChevronRight, Bell, CreditCard, Heart } from 'lucide-react';

interface ProfileDashboardProps {
    user: {
        name: string;
        email: string;
    };
    onLogout: () => void;
}

export function ProfileDashboard({ user, onLogout }: ProfileDashboardProps) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black pb-24 transition-colors duration-500">
            {/* Header Profile Info */}
            <div className="bg-gradient-to-br from-[#2563eb] via-[#1e40af] to-[#1e3a8a] px-6 pt-12 pb-24 rounded-b-[50px] text-white relative shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-white/10 dark:bg-blue-400/10 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-inner text-2xl font-bold">
                        {user.name.charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold tracking-tight">{user.name}</h2>
                        <p className="text-white/60 text-sm font-medium">{user.email}</p>
                    </div>
                </div>

                {/* Quick Stats Overlay */}
                <div className="absolute -bottom-10 left-6 right-6 glass-card rounded-[32px] shadow-2xl p-6 flex justify-around border-white/30 dark:border-gray-800 transition-all duration-500">
                    <div className="text-center">
                        <span className="block text-xl font-black text-gray-800 dark:text-gray-100">12</span>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-widest">Schemes saved</span>
                    </div>
                    <div className="w-px h-10 bg-gray-100 dark:bg-gray-800 self-center"></div>
                    <div className="text-center">
                        <span className="block text-xl font-black text-gray-800 dark:text-gray-100">3</span>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-widest">Applied</span>
                    </div>
                    <div className="w-px h-10 bg-gray-100 dark:bg-gray-800 self-center"></div>
                    <div className="text-center">
                        <span className="block text-xl font-black text-gray-800 dark:text-gray-100">85%</span>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-widest">Profile Match</span>
                    </div>
                </div>
            </div>

            <div className="mt-16 px-6 space-y-6">
                {/* Settings Groups */}
                <div>
                    <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em] mb-4 ml-1">Account Settings</h3>
                    <div className="bg-white dark:bg-gray-900 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-800/50 overflow-hidden transition-colors">
                        <MenuButton icon={<User size={18} />} label="Personal Information" />
                        <MenuButton icon={<CreditCard size={18} />} label="Bank Details" />
                        <MenuButton icon={<Shield size={18} />} label="Security & Privacy" />
                    </div>
                </div>

                <div>
                    <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em] mb-4 ml-1">Preferences</h3>
                    <div className="bg-white dark:bg-gray-900 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-800/50 overflow-hidden transition-colors">
                        <MenuButton icon={<Globe size={18} />} label="Language" value="English" />
                        <MenuButton icon={<Bell size={18} />} label="Notifications" />
                        <MenuButton icon={<Heart size={18} />} label="My Favorites" />
                    </div>
                </div>

                {/* Support & Logout */}
                <div className="pt-4">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center justify-center gap-2 py-4.5 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-2xl font-bold hover:bg-red-100 dark:hover:bg-red-900/20 transition-all active:scale-[0.98]"
                    >
                        <LogOut size={20} />
                        Logout Account
                    </button>
                    <p className="text-center text-[9px] text-gray-400 dark:text-gray-600 mt-8 font-bold uppercase tracking-widest opacity-60">
                        Version 1.2.0 • Build 240302
                    </p>
                </div>
            </div>
        </div>
    );
}

function MenuButton({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string }) {
    return (
        <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b last:border-b-0 border-gray-50 dark:border-gray-800 group">
            <div className="flex items-center gap-3">
                <div className="text-[#2563eb] dark:text-blue-400 group-hover:scale-110 transition-all duration-300 transform">{icon}</div>
                <span className="text-sm font-bold text-gray-700 dark:text-gray-200">{label}</span>
            </div>
            <div className="flex items-center gap-2">
                {value && <span className="text-xs font-bold text-gray-400 dark:text-gray-500">{value}</span>}
                <ChevronRight size={16} className="text-gray-300 dark:text-gray-600 group-hover:translate-x-1 transition-transform" />
            </div>
        </button>
    );
}
