import { useState } from 'react';
import { MessageSquare, Search, CheckCircle, Upload, Clock, User as UserIcon } from 'lucide-react';
import { SchemeDiscovery } from './components/SchemeDiscovery';
import { ChatInterface } from './components/ChatInterface';
import { DocumentUpload } from './components/DocumentUpload';
import { EligibilityResult } from './components/EligibilityResult';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { ProfileDashboard } from './components/ProfileDashboard';
import { MyApplications } from './components/MyApplications';
import { SchemeApplicationForm } from './components/SchemeApplicationForm';
import { Toast } from './components/Toast';
import { ThemeToggle } from './components/ThemeToggle';

type Screen = 'chat' | 'discovery' | 'document' | 'eligibility' | 'profile' | 'applications' | 'applying';
type AuthScreen = 'login' | 'signup';

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [authView, setAuthView] = useState<AuthScreen>('login');
  const [currentScreen, setCurrentScreen] = useState<Screen>('chat');
  const [selectedScheme, setSelectedScheme] = useState<any>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="flex w-full max-w-5xl bg-white rounded-[40px] shadow-2xl overflow-hidden min-h-[600px]">
          {/* Desktop Left Side - Branding Hero */}
          <div className="hidden md:flex flex-1 bg-gradient-to-br from-[#2563eb] to-[#1e40af] p-12 text-white flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>

            <div className="relative z-10">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-lg transform rotate-3">
                <span className="text-2xl font-bold text-[#2563eb] -rotate-3 italic tracking-tighter">S</span>
              </div>
              <h2 className="text-4xl font-black leading-tight mb-4">Discover Your Future with SchemeSense</h2>
              <p className="text-lg text-blue-100 font-medium leading-relaxed max-w-sm">
                Empowering citizens to access government benefits through AI-driven guidance and seamless application tracking.
              </p>
            </div>

            <div className="relative z-10 pt-8 border-t border-white/20">
              <div className="flex gap-4">
                <div className="text-center">
                  <span className="block text-2xl font-bold">500+</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-blue-200">Active Schemes</span>
                </div>
                <div className="w-px h-8 bg-white/20"></div>
                <div className="text-center">
                  <span className="block text-2xl font-bold">1M+</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-blue-200">Users Served</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Forms */}
          <div className="w-full md:w-[450px] bg-white flex flex-col items-center justify-center relative">
            <div className="w-full h-full max-w-sm">
              {authView === 'login' ? (
                <Login
                  onLogin={setUser}
                  onSwitchToSignup={() => setAuthView('signup')}
                />
              ) : (
                <Signup
                  onSignup={setUser}
                  onBackToLogin={() => setAuthView('login')}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex justify-center transition-colors duration-500">
      {/* Main Desktop Container Overlay */}
      <div className="hidden lg:flex fixed left-0 top-0 bottom-0 w-80 glass-card p-8 flex-col justify-between z-50">
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="w-10 h-10 bg-[#2563eb] rounded-xl flex items-center justify-center shadow-md">
              <span className="text-xl font-bold text-white italic tracking-tighter">S</span>
            </div>
            <ThemeToggle />
          </div>
          <nav className="space-y-4">
            <NavDesktopButton icon={<MessageSquare />} label="AI Assistant" active={currentScreen === 'chat'} onClick={() => setCurrentScreen('chat')} />
            <NavDesktopButton icon={<Search />} label="Scheme Browser" active={currentScreen === 'discovery'} onClick={() => setCurrentScreen('discovery')} />
            <NavDesktopButton icon={<Upload />} label="Document Vault" active={currentScreen === 'document'} onClick={() => setCurrentScreen('document')} />
            <NavDesktopButton icon={<Clock />} label="Track Applications" active={currentScreen === 'applications'} onClick={() => setCurrentScreen('applications')} />
            <NavDesktopButton icon={<UserIcon />} label="My Profile" active={currentScreen === 'profile'} onClick={() => setCurrentScreen('profile')} />
          </nav>
        </div>
        <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-[#2563eb] dark:text-blue-400 font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="truncate">
              <p className="text-sm font-bold text-gray-800 dark:text-gray-100 truncate">{user.name}</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <button onClick={() => setUser(null)} className="w-full py-2.5 text-xs font-bold text-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">Logout</button>
        </div>
      </div>

      {/* Primary View Area */}
      <div className="w-full max-w-md bg-white dark:bg-gray-900 min-h-screen shadow-2xl relative lg:ml-40 lg:mr-[-80px] border-x border-gray-100 dark:border-gray-800 transition-all duration-300">
        <div className="pb-20 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <div className="lg:hidden absolute top-6 right-6 z-50">
            <ThemeToggle />
          </div>
          {currentScreen === 'chat' && <ChatInterface />}
          {currentScreen === 'discovery' && (
            <SchemeDiscovery
              onCheckEligibility={() => setCurrentScreen('document')}
              onApply={(scheme) => {
                setSelectedScheme(scheme);
                setCurrentScreen('applying');
              }}
            />
          )}
          {currentScreen === 'document' && (
            <DocumentUpload onBack={() => setCurrentScreen('chat')} />
          )}
          {currentScreen === 'eligibility' && <EligibilityResult />}
          {currentScreen === 'applications' && <MyApplications />}
          {currentScreen === 'applying' && selectedScheme && (
            <SchemeApplicationForm
              scheme={selectedScheme}
              onComplete={() => {
                setCurrentScreen('applications');
                showToast('Application Submitted Successfully!', 'success');
              }}
              onCancel={() => setCurrentScreen('discovery')}
            />
          )}
          {currentScreen === 'profile' && (
            <ProfileDashboard user={user} onLogout={() => setUser(null)} />
          )}

        </div>

        {/* Bottom Navigation (Mobile Only) */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 shadow-[0_-8px_30px_rgb(0,0,0,0.04)] z-50 transition-colors">
          <div className="flex justify-around items-center h-20">
            <NavButton icon={<MessageSquare size={22} />} label="Chat" active={currentScreen === 'chat'} onClick={() => setCurrentScreen('chat')} />
            <NavButton icon={<Search size={22} />} label="Explore" active={currentScreen === 'discovery'} onClick={() => setCurrentScreen('discovery')} />
            <NavButton icon={<Upload size={22} />} label="Vault" active={currentScreen === 'document'} onClick={() => setCurrentScreen('document')} />
            <NavButton icon={<Clock size={22} />} label="Tracking" active={currentScreen === 'applications'} onClick={() => setCurrentScreen('applications')} />
            <NavButton icon={<UserIcon size={22} />} label="Profile" active={currentScreen === 'profile'} onClick={() => setCurrentScreen('profile')} />
          </div>
        </nav>

        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </div>
  );
}

function NavButton({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-full h-full transition-all duration-300 ${active ? 'text-[#2563eb] dark:text-blue-400 scale-110' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
        }`}
    >
      {icon}
      <span className={`text-[10px] mt-1 font-bold tracking-tight ${active ? 'opacity-100' : 'opacity-60'}`}>{label}</span>
    </button>
  );
}

function NavDesktopButton({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold text-sm ${active ? 'bg-blue-50 dark:bg-blue-900/30 text-[#2563eb] dark:text-blue-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
        }`}
    >
      <div className={`${active ? 'scale-110' : ''} transition-transform duration-300`}>
        {icon}
      </div>
      {label}
    </button>
  );
}
