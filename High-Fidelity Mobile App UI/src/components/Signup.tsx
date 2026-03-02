import { useState } from 'react';
import { User, Mail, Lock, UserPlus, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface SignupProps {
    onSignup: (user: any) => void;
    onBackToLogin: () => void;
}

export function Signup({ onSignup, onBackToLogin }: SignupProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        onSignup({ name: formData.name, email: formData.email });
    };

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-black transition-colors duration-500">
            {/* Back Button */}
            <div className="px-4 py-6">
                <button
                    onClick={onBackToLogin}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors group"
                >
                    <ArrowLeft size={24} className="text-gray-700 dark:text-gray-300 group-hover:-translate-x-1 transition-transform" />
                </button>
            </div>

            <div className="flex-1 px-6">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Create Account</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 font-bold opacity-80">Join SchemeSense to track benefits</p>
                </div>

                {/* Signup Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <User size={18} className="text-gray-400 dark:text-gray-600 group-focus-within:text-[#2563eb] dark:group-focus-within:text-blue-400 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="block w-full pl-11 pr-4 py-4.5 bg-gray-50 dark:bg-gray-900 border border-transparent dark:border-gray-800 rounded-2xl text-base focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 focus:bg-white dark:focus:bg-gray-950 focus:border-[#2563eb] dark:focus:border-blue-500 transition-all font-bold text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600"
                            required
                        />
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail size={18} className="text-gray-400 dark:text-gray-600 group-focus-within:text-[#2563eb] dark:group-focus-within:text-blue-400 transition-colors" />
                        </div>
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="block w-full pl-11 pr-4 py-4.5 bg-gray-50 dark:bg-gray-900 border border-transparent dark:border-gray-800 rounded-2xl text-base focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 focus:bg-white dark:focus:bg-gray-950 focus:border-[#2563eb] dark:focus:border-blue-500 transition-all font-bold text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600"
                            required
                        />
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock size={18} className="text-gray-400 dark:text-gray-600 group-focus-within:text-[#2563eb] dark:group-focus-within:text-blue-400 transition-colors" />
                        </div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="block w-full pl-11 pr-4 py-4.5 bg-gray-50 dark:bg-gray-900 border border-transparent dark:border-gray-800 rounded-2xl text-base focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 focus:bg-white dark:focus:bg-gray-950 focus:border-[#2563eb] dark:focus:border-blue-500 transition-all font-bold text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600"
                            required
                        />
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <CheckCircle2 size={18} className="text-gray-400 dark:text-gray-600 group-focus-within:text-[#2563eb] dark:group-focus-within:text-blue-400 transition-colors" />
                        </div>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            className="block w-full pl-11 pr-4 py-4.5 bg-gray-50 dark:bg-gray-900 border border-transparent dark:border-gray-800 rounded-2xl text-base focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 focus:bg-white dark:focus:bg-gray-950 focus:border-[#2563eb] dark:focus:border-blue-500 transition-all font-bold text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600"
                            required
                        />
                    </div>

                    {/* Terms */}
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 px-1 leading-relaxed font-bold opacity-80">
                        By signing up, you agree to our <span className="text-[#2563eb] dark:text-blue-400 hover:underline cursor-pointer">Terms of Service</span> and <span className="text-[#2563eb] dark:text-blue-400 hover:underline cursor-pointer">Privacy Policy</span>.
                    </p>

                    <button
                        type="submit"
                        className="w-full bg-[#2563eb] dark:bg-blue-600 text-white py-4.5 rounded-2xl font-black shadow-2xl shadow-blue-500/20 flex items-center justify-center gap-3 hover:bg-[#1d4ed8] dark:hover:bg-blue-700 active:scale-95 transition-all mt-8"
                    >
                        <UserPlus size={20} />
                        Create Account
                    </button>
                </form>

                {/* Switch to Login */}
                <div className="mt-12 text-center pb-10">
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-bold opacity-80">
                        Already have an account?{' '}
                        <button
                            onClick={onBackToLogin}
                            className="text-[#2563eb] dark:text-blue-400 font-black hover:underline"
                        >
                            Log In
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
