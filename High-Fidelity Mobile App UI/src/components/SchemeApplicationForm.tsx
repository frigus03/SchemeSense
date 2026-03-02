import { useState } from 'react';
import { User, CreditCard, FileText, CheckCircle, ArrowRight, ArrowLeft, Send } from 'lucide-react';

interface FormProps {
    scheme: any;
    onComplete: () => void;
    onCancel: () => void;
}

export function SchemeApplicationForm({ scheme, onComplete, onCancel }: FormProps) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        aadhaar: '',
        income: '',
        bankAccount: '',
        ifsc: '',
        agreed: false
    });

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
            {/* Step Header */}
            <div className="px-6 pt-12 pb-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center justify-between mb-4">
                    <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                        <ArrowLeft size={24} />
                    </button>
                    <div className="flex gap-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className={`h-1.5 w-12 rounded-full transition-all duration-700 ease-out ${step >= i ? 'bg-[#2563eb] dark:bg-blue-500 shadow-sm' : 'bg-gray-200 dark:bg-gray-700'
                                }`} />
                        ))}
                    </div>
                    <div className="w-6" /> {/* Spacer */}
                </div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Apply for</h1>
                <p className="text-sm font-semibold text-[#2563eb] dark:text-blue-400 truncate tracking-tight">{scheme.name}</p>
            </div>

            <div className="flex-1 px-6 py-8 overflow-y-auto">
                {step === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                                <User size={20} className="text-[#2563eb] dark:text-blue-400" />
                            </div>
                            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Personal Details</h2>
                        </div>

                        <div className="space-y-4">
                            <Field label="Full Name" placeholder="As per Aadhaar" value={formData.fullName} onChange={v => setFormData({ ...formData, fullName: v })} />
                            <Field label="Aadhaar Number" placeholder="12-digit number" value={formData.aadhaar} onChange={v => setFormData({ ...formData, aadhaar: v })} />
                            <Field label="Annual Income (₹)" placeholder="e.g. 150000" type="number" value={formData.income} onChange={v => setFormData({ ...formData, income: v })} />
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                                <CreditCard size={20} className="text-[#2563eb] dark:text-blue-400" />
                            </div>
                            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Bank Information</h2>
                        </div>

                        <div className="space-y-4">
                            <Field label="Bank Account Number" placeholder="Your account number" value={formData.bankAccount} onChange={v => setFormData({ ...formData, bankAccount: v })} />
                            <Field label="IFSC Code" placeholder="SBIN0001234" value={formData.ifsc} onChange={v => setFormData({ ...formData, ifsc: v })} />

                            <div className="p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/50 mt-6 shadow-sm">
                                <p className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold leading-relaxed">
                                    Benefits will be deposited directly into this account via DBT (Direct Benefit Transfer).
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
                                <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
                            </div>
                            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Review & Submit</h2>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 space-y-4 border border-gray-100 dark:border-gray-800 shadow-sm">
                            <SummaryItem label="Name" value={formData.fullName} />
                            <SummaryItem label="Aadhaar" value={formData.aadhaar} />
                            <SummaryItem label="Income" value={`₹${formData.income}`} />
                            <SummaryItem label="Bank" value={formData.bankAccount} />
                        </div>

                        <label className="flex gap-3 items-start mt-6 p-2 bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.agreed}
                                onChange={e => setFormData({ ...formData, agreed: e.target.checked })}
                                className="mt-1 w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-[#2563eb] focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700"
                            />
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                                I declare that the information provided is true to the best of my knowledge and I am eligible for this scheme.
                            </span>
                        </label>
                    </div>
                )}
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-6 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 backdrop-blur-md transition-colors duration-500">
                <div className="flex gap-3">
                    {step > 1 && (
                        <button
                            onClick={prevStep}
                            className="flex-1 py-4 px-6 border-2 border-gray-100 dark:border-gray-800 rounded-2xl font-bold text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-300"
                        >
                            Back
                        </button>
                    )}
                    <button
                        onClick={step === 3 ? onComplete : nextStep}
                        disabled={step === 3 && !formData.agreed}
                        className={`flex-[2] py-4 rounded-2xl font-bold shadow-xl flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-95 ${step === 3 && !formData.agreed ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600' : 'bg-[#2563eb] dark:bg-blue-600 text-white hover:bg-[#1d4ed8] dark:hover:bg-blue-700 hover:shadow-2xl'
                            }`}
                    >
                        {step === 3 ? (
                            <>
                                <Send size={20} />
                                Submit Application
                            </>
                        ) : (
                            <>
                                Next Step
                                <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

function Field({ label, placeholder, type = 'text', value, onChange }: { label: string, placeholder: string, type?: string, value: string, onChange: (v: string) => void }) {
    return (
        <div className="space-y-1.5 group">
            <label className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1 transition-colors group-focus-within:text-[#2563eb] dark:group-focus-within:text-blue-400">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl text-base focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 focus:bg-white dark:focus:bg-gray-800 focus:border-[#2563eb] dark:focus:border-blue-500 transition-all font-medium text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-600"
            />
        </div>
    );
}

function SummaryItem({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex justify-between items-center text-sm py-1">
            <span className="text-gray-400 dark:text-gray-500 font-medium">{label}</span>
            <span className="text-gray-800 dark:text-gray-200 font-bold">{value || 'Not provided'}</span>
        </div>
    );
}
