import { CheckCircle, XCircle, AlertCircle, ArrowLeft } from 'lucide-react';

export function EligibilityResult() {
  return (
    <div className="flex flex-col min-h-screen pb-16 bg-gray-50">
      {/* Header */}
      <div className="bg-[#2563eb] text-white px-4 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <button className="p-1 hover:bg-white/20 rounded-lg transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">Eligibility Check</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {/* Scheme Name */}
        <div className="bg-white rounded-xl shadow-md px-4 py-3 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Pradhan Mantri Fasal Bima Yojana</h2>
          <p className="text-xs text-gray-500 mt-1">Crop Insurance Scheme</p>
        </div>

        {/* Eligibility Status Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-green-500">
          <div className="bg-green-50 px-4 py-4 border-b border-green-100">
            <div className="flex items-center gap-3">
              <div className="bg-green-500 p-2 rounded-full">
                <CheckCircle size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-green-700">Status: ELIGIBLE</h3>
                <p className="text-xs text-green-600 mt-0.5">You meet all requirements</p>
              </div>
            </div>
          </div>

          <div className="px-4 py-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Eligibility Criteria</h4>
            
            {/* Checklist */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <CheckCircle size={20} className="text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800 font-medium">Annual Income &lt; ₹6 Lakhs</p>
                  <p className="text-xs text-gray-500 mt-0.5">Your income: ₹3.5 Lakhs/year</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <CheckCircle size={20} className="text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800 font-medium">Land Ownership Verified</p>
                  <p className="text-xs text-gray-500 mt-0.5">2.5 acres registered land</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <CheckCircle size={20} className="text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800 font-medium">Active Farmer Status</p>
                  <p className="text-xs text-gray-500 mt-0.5">Verified through land records</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <CheckCircle size={20} className="text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800 font-medium">Bank Account Linked</p>
                  <p className="text-xs text-gray-500 mt-0.5">Aadhaar-linked account verified</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps Card */}
        <div className="bg-blue-50 rounded-xl shadow-md px-4 py-4 border border-blue-200">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-[#2563eb] mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-[#2563eb] mb-2">Next Steps</h4>
              <ol className="text-xs text-gray-700 space-y-2 list-decimal list-inside">
                <li>Visit your nearest Common Service Center (CSC)</li>
                <li>Carry original documents (Aadhaar, land records, bank passbook)</li>
                <li>Fill the application form with assistance</li>
                <li>Pay the premium amount (subsidized rates apply)</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="bg-white rounded-xl shadow-md px-4 py-4 border border-gray-100">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Required Documents</h4>
          <ul className="text-xs text-gray-600 space-y-1.5">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Aadhaar Card
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Land Ownership Documents
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Bank Account Passbook
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Recent Passport Size Photo
            </li>
          </ul>
        </div>

        {/* Action Button */}
        <button className="w-full bg-[#2563eb] text-white py-3.5 rounded-xl font-semibold shadow-lg hover:bg-[#1d4ed8] transition-colors">
          Proceed to Application
        </button>

        {/* Example of Not Eligible State */}
        <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden border-2 border-red-500">
          <div className="bg-red-50 px-4 py-4 border-b border-red-100">
            <div className="flex items-center gap-3">
              <div className="bg-red-500 p-2 rounded-full">
                <XCircle size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-red-700">Example: NOT ELIGIBLE</h3>
                <p className="text-xs text-red-600 mt-0.5">Some criteria not met</p>
              </div>
            </div>
          </div>

          <div className="px-4 py-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <CheckCircle size={20} className="text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800 font-medium">Criterion Met</p>
                  <p className="text-xs text-gray-500 mt-0.5">Example passing criterion</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <XCircle size={20} className="text-red-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800 font-medium">Criterion Not Met</p>
                  <p className="text-xs text-red-500 mt-0.5">Example failing criterion with explanation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
