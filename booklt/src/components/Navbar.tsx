import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const Navbar = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-8 py-4">
        <div className="flex items-center justify-between gap-8">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center">
              <svg width="18" height="22" viewBox="0 0 20 24" fill="none">
                <path d="M10 0C6.5 0 3.5 2.5 3.5 6C3.5 10.5 10 18 10 18C10 18 16.5 10.5 16.5 6C16.5 2.5 13.5 0 10 0ZM10 8C8.9 8 8 7.1 8 6C8 4.9 8.9 4 10 4C11.1 4 12 4.9 12 6C12 7.1 11.1 8 10 8Z" fill="white"/>
              </svg>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-black">highway</div>
              <div className="text-sm font-semibold text-black">delite</div>
            </div>
          </Link>
          
          <div className="flex items-center gap-3 flex-1 max-w-2xl">
            <input
              type="text"
              placeholder="Search experiences"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-5 py-2.5 bg-gray-100 rounded-lg text-sm text-gray-700 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all"
            />
            <button 
              onClick={handleSearch}
              className="bg-[#FDD835] hover:bg-[#FBC02D] text-black font-semibold px-10 py-2.5 rounded-lg transition-all hover:shadow-md whitespace-nowrap"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
