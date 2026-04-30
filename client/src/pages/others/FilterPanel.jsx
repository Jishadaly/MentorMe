
// ============================================
// 3. FilterPanel.jsx - New Component
// ============================================
import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

export default function FilterPanel({ mentors, filters, setFilters, onClose }) {
  const [allSkills, setAllSkills] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);

  useEffect(() => {
    // Extract unique skills and companies
    const skills = new Set();
    const companies = new Set();

    mentors.forEach(mentor => {
      if (mentor.mentorAdditional?.programmingLanguages) {
        mentor.mentorAdditional.programmingLanguages.forEach(lang => skills.add(lang));
      }
      if (mentor.mentorAdditional?.company) {
        companies.add(mentor.mentorAdditional.company);
      }
    });

    setAllSkills(Array.from(skills).sort());
    setAllCompanies(Array.from(companies).sort());
  }, [mentors]);

  const toggleSkill = (skill) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const toggleCompany = (company) => {
    setFilters(prev => ({
      ...prev,
      companies: prev.companies.includes(company)
        ? prev.companies.filter(c => c !== company)
        : [...prev.companies, company]
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6 animate-slideDown">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Filters</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FiX size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Skills Filter */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Skills</h4>
          <div className="max-h-48 overflow-y-auto space-y-2 custom-scrollbar">
            {allSkills.map(skill => (
              <label key={skill} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={filters.skills.includes(skill)}
                  onChange={() => toggleSkill(skill)}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">{skill}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Company Filter */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Company</h4>
          <div className="max-h-48 overflow-y-auto space-y-2 custom-scrollbar">
            {allCompanies.map(company => (
              <label key={company} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={filters.companies.includes(company)}
                  onChange={() => toggleCompany(company)}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">{company}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Rating and Price Filter */}
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Minimum Rating</h4>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={filters.minRating}
              onChange={(e) => setFilters(prev => ({ ...prev, minRating: parseFloat(e.target.value) }))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>0</span>
              <span className="font-semibold text-indigo-600">{filters.minRating}+</span>
              <span>5</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Max Price ($/hr)</h4>
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={filters.maxPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value) }))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>$0</span>
              <span className="font-semibold text-indigo-600">${filters.maxPrice}</span>
              <span>$10k+</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
