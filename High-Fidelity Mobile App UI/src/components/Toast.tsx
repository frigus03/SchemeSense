import { useEffect } from 'react';
import { CheckCircle, AlertCircle, X, Info } from 'lucide-react';

interface ToastProps {
    message: string;
    type?: 'success' | 'error' | 'info';
    onClose: () => void;
    duration?: number;
}

export function Toast({ message, type = 'success', onClose, duration = 3000 }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [onClose, duration]);

    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm animate-in fade-in slide-in-from-top-4 duration-300">
            <div className={`p-4 rounded-2xl shadow-2xl flex items-center gap-3 border ${type === 'success' ? 'bg-green-50 border-green-100 text-green-800' :
                    type === 'error' ? 'bg-red-50 border-red-100 text-red-800' :
                        'bg-blue-50 border-blue-100 text-blue-800'
                }`}>
                <div className="flex-shrink-0">
                    {type === 'success' && <CheckCircle size={24} />}
                    {type === 'error' && <AlertCircle size={24} />}
                    {type === 'info' && <Info size={24} />}
                </div>
                <p className="text-sm font-bold flex-1">{message}</p>
                <button onClick={onClose} className="p-1 hover:bg-black/5 rounded-full transition-colors opacity-50">
                    <X size={16} />
                </button>
            </div>
        </div>
    );
}
