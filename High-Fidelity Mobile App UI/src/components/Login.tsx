import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, Github, Chrome } from 'lucide-react';

interface LoginProps {
    onLogin: (user: any) => void;
    onSwitchToSignup: () => void;
}

export function Login({ onLogin, onSwitchToSignup }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate login
        onLogin({ name: 'User', email });
    };

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-black transition-colors duration-500">
            <div className="flex-1 px-6 pt-12">
                {/* Branding */}
                <div className="flex flex-col items-center mb-12 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#2563eb] to-[#1e40af] rounded-[24px] flex flex-shrink-0 items-center justify-center shadow-2xl shadow-blue-500/30 transform rotate-6 mb-8 group hover:rotate-12 transition-transform duration-500">
                        <span className="text-4xl font-black text-white -rotate-6 italic tracking-tighter">S</span>
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Welcome Back</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 font-bold opacity-80">Log in to access your scheme profile</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail size={18} className="text-gray-400 dark:text-gray-600 group-focus-within:text-[#2563eb] dark:group-focus-within:text-blue-400 transition-colors" />
                        </div>
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full pl-11 pr-4 py-4.5 bg-gray-50 dark:bg-gray-900 border border-transparent dark:border-gray-800 rounded-2xl text-base focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 focus:bg-white dark:focus:bg-gray-950 focus:border-[#2563eb] dark:focus:border-blue-500 transition-all font-bold text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600"
                            required
                        />
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock size={18} className="text-gray-400 dark:text-gray-600 group-focus-within:text-[#2563eb] dark:group-focus-within:text-blue-400 transition-colors" />
                        </div>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full pl-11 pr-12 py-4.5 bg-gray-50 dark:bg-gray-900 border border-transparent dark:border-gray-800 rounded-2xl text-base focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 focus:bg-white dark:focus:bg-gray-950 focus:border-[#2563eb] dark:focus:border-blue-500 transition-all font-bold text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 dark:text-gray-600 hover:text-[#2563eb] transition-colors"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <div className="flex justify-end pr-1">
                        <button type="button" className="text-xs font-black text-[#2563eb] dark:text-blue-400 hover:underline tracking-tight">
                            Forgot Password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#2563eb] dark:bg-blue-600 text-white py-4.5 rounded-2xl font-black shadow-2xl shadow-blue-500/20 flex items-center justify-center gap-3 hover:bg-[#1d4ed8] dark:hover:bg-blue-700 active:scale-95 transition-all mt-8"
                    >
                        <LogIn size={20} />
                        Sign In
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-10">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-100 dark:border-gray-800"></div>
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.2em]">
                        <span className="bg-white dark:bg-black px-6 text-gray-400 dark:text-gray-600 transition-colors">Or continue with</span>
                    </div>
                </div>

                {/* Social Logins */}
                <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-3 py-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all font-bold text-gray-700 dark:text-gray-200 active:scale-95">
                        <Chrome size={20} className="text-red-500" />
                        <span className="text-sm">Google</span>
                    </button>
                    <button className="flex items-center justify-center gap-3 py-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all font-bold text-gray-700 dark:text-gray-200 active:scale-95">
                        <Github size={20} className="text-black dark:text-white" />
                        <span className="text-sm">GitHub</span>
                    </button>
                </div>

                {/* Switch to Signup */}
                <div className="mt-12 text-center pb-10">
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-bold opacity-80">
                        Don't have an account?{' '}
                        <button
                            onClick={onSwitchToSignup}
                            className="text-[#2563eb] dark:text-blue-400 font-black hover:underline"
                        >
                            Sign Up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
