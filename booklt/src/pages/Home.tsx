import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { experienceService } from '../services/api';
import type { Experience } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const data = await experienceService.getAllExperiences();
      setExperiences(data);
      setError('');
    } catch (err) {
      setError('Failed to load experiences. Please make sure the backend server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filter experiences based on search query
  const filteredExperiences = useMemo(() => {
    if (!searchQuery.trim()) {
      return experiences;
    }

    const query = searchQuery.toLowerCase();
    return experiences.filter((experience) => {
      return (
        experience.title.toLowerCase().includes(query) ||
        experience.shortDescription.toLowerCase().includes(query) ||
        experience.location.toLowerCase().includes(query) ||
        experience.category.toLowerCase().includes(query)
      );
    });
  }, [experiences, searchQuery]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Error Message */}
      {error && (
        <div className="max-w-[1400px] mx-auto px-8 py-6">
          <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-3.5 rounded-xl">
            {error}
          </div>
        </div>
      )}

      {/* Search Results Info */}
      {searchQuery && (
        <div className="max-w-[1400px] mx-auto px-8 pt-6">
          <p className="text-gray-700">
            {filteredExperiences.length > 0 ? (
              <>
                Found <span className="font-semibold">{filteredExperiences.length}</span> result
                {filteredExperiences.length !== 1 ? 's' : ''} for "{searchQuery}"
              </>
            ) : (
              <>
                No results found for "<span className="font-semibold">{searchQuery}</span>"
              </>
            )}
          </p>
        </div>
      )}

      {/* Experiences Grid */}
      <div className="max-w-[1400px] mx-auto px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredExperiences.map((experience) => (
            <div
              key={experience._id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-56">
                <img
                  src={experience.imageUrl}
                  alt={experience.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-lg font-bold text-gray-900 leading-snug">
                    {experience.title}
                  </h3>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md whitespace-nowrap shrink-0">
                    {experience.location.split(',')[0]}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-5 line-clamp-2 leading-relaxed">
                  {experience.shortDescription}
                </p>
                
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 mb-0.5">From</span>
                    <span className="text-lg font-bold text-gray-900">₹{experience.basePrice}</span>
                  </div>
                  <Link
                    to={`/experience/${experience._id}`}
                    className="bg-[#FDD835] hover:bg-[#FBC02D] text-black font-semibold px-5 py-2.5 rounded-lg text-sm transition-all hover:shadow-md"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
