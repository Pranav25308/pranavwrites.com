// 'use client';

// import { Button } from '@/components/ui/button';
// import { Film, Book, Package, Moon, Sun } from 'lucide-react';
// import Link from "next/link";

// <li>
//   <Link href="/movies">Movies</Link>
// </li>


// export default function PublicNav({ 
//   currentPage, 
//   changePage, 
//   settings, 
//   darkMode, 
//   toggleDarkMode 
// }) {
//   return (
//     <nav className={`border-b sticky top-0 z-50 shadow-lg transition-all duration-300 ${
//       darkMode 
//         ? 'border-purple-500/20 bg-slate-950/95 backdrop-blur-xl shadow-purple-500/5' 
//         : 'border-purple-200/50 bg-white/95 backdrop-blur-xl shadow-purple-500/10'
//     }`}>
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           {/* Logo - Name Only */}
//           <div 
//             className="cursor-pointer group" 
//             onClick={() => changePage('home')}
//           >
//             <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:to-cyan-400 transition-all duration-300">
//               Pranav
//             </span>
//           </div>

//           {/* Navigation Links */}
//           <div className="flex space-x-1">
//             <button 
//               onClick={() => changePage('home')} 
//               className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
//                 currentPage === 'home' 
//                   ? darkMode 
//                     ? 'bg-purple-600/20 text-purple-400 shadow-inner shadow-purple-500/20' 
//                     : 'bg-purple-100 text-purple-700 shadow-inner shadow-purple-500/20'
//                   : darkMode 
//                     ? 'text-slate-400 hover:text-purple-400 hover:bg-purple-600/10' 
//                     : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'
//               }`}
//             >
//               Home
//             </button>

//             {/* Reviews Dropdown */}
//             {(settings.navbar.movies || settings.navbar.books || settings.navbar.products || settings.navbar.blogs) && (
//               <div className="relative group">
//                 <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
//                   darkMode 
//                     ? 'text-slate-400 hover:text-purple-400 hover:bg-purple-600/10' 
//                     : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'
//                 }`}>
//                   Reviews
//                 </button>
//                 <div className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 pt-2 left-1/2 -translate-x-1/2 z-50">
//                   <div className={`backdrop-blur-xl border rounded-xl shadow-2xl p-2 space-y-1 min-w-[160px] ${
//                     darkMode 
//                       ? 'bg-slate-900/95 border-purple-500/20 shadow-purple-500/10' 
//                       : 'bg-white/95 border-purple-200 shadow-purple-500/20'
//                   }`}>
//                     {settings.navbar.blogs && (
//                       <button 
//                         onClick={() => changePage('blogs')} 
//                         className={`flex items-center w-full text-left px-4 py-2.5 text-sm rounded-lg transition-all duration-200 ${
//                           darkMode 
//                             ? 'text-slate-400 hover:text-purple-400 hover:bg-purple-600/10' 
//                             : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'
//                         }`}
//                       >
//                         Blogs
//                       </button>
//                     )}
//                     {settings.navbar.movies && (
//                       <button 
//                         onClick={() => changePage('movies')} 
//                         className={`flex items-center w-full text-left px-4 py-2.5 text-sm rounded-lg transition-all duration-200 ${
//                           darkMode 
//                             ? 'text-slate-400 hover:text-purple-400 hover:bg-purple-600/10' 
//                             : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'
//                         }`}
//                       >
//                         <Film className="w-4 h-4 mr-3 text-purple-500" />Movies
//                       </button>
//                     )}
//                     {settings.navbar.books && (
//                       <button 
//                         onClick={() => changePage('books')} 
//                         className={`flex items-center w-full text-left px-4 py-2.5 text-sm rounded-lg transition-all duration-200 ${
//                           darkMode 
//                             ? 'text-slate-400 hover:text-purple-400 hover:bg-purple-600/10' 
//                             : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'
//                         }`}
//                       >
//                         <Book className="w-4 h-4 mr-3 text-cyan-500" />Books
//                       </button>
//                     )}
//                     {settings.navbar.products && (
//                       <button 
//                         onClick={() => changePage('products')} 
//                         className={`flex items-center w-full text-left px-4 py-2.5 text-sm rounded-lg transition-all duration-200 ${
//                           darkMode 
//                             ? 'text-slate-400 hover:text-purple-400 hover:bg-purple-600/10' 
//                             : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'
//                         }`}
//                       >
//                         <Package className="w-4 h-4 mr-3 text-pink-500" />Products
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {settings.navbar.about && (
//               <button 
//                 onClick={() => changePage('about')} 
//                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
//                   currentPage === 'about' 
//                     ? darkMode 
//                       ? 'bg-purple-600/20 text-purple-400 shadow-inner shadow-purple-500/20' 
//                       : 'bg-purple-100 text-purple-700 shadow-inner shadow-purple-500/20'
//                     : darkMode 
//                       ? 'text-slate-400 hover:text-purple-400 hover:bg-purple-600/10' 
//                       : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'
//                 }`}
//               >
//                 About
//               </button>
//             )}

//             <button 
//               onClick={() => changePage('contact')} 
//               className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
//                 currentPage === 'contact' 
//                   ? darkMode 
//                     ? 'bg-purple-600/20 text-purple-400 shadow-inner shadow-purple-500/20' 
//                     : 'bg-purple-100 text-purple-700 shadow-inner shadow-purple-500/20'
//                   : darkMode 
//                     ? 'text-slate-400 hover:text-purple-400 hover:bg-purple-600/10' 
//                     : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'
//               }`}
//             >
//               Contact
//             </button>
//           </div>

//           {/* Dark Mode Toggle */}
//           <Button 
//             onClick={toggleDarkMode} 
//             variant="ghost" 
//             size="icon"
//             className={`rounded-lg transition-all duration-300 ${
//               darkMode 
//                 ? 'text-slate-400 hover:text-yellow-400 hover:bg-yellow-500/10' 
//                 : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'
//             }`}
//           >
//             {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//           </Button>
//         </div>
//       </div>
//     </nav>
//   );
// }


'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from '@/components/ui/button';
import { Film, Book, Package, Moon, Sun } from 'lucide-react';
import { DUMMY_SETTINGS } from '@/app/config/siteSettings';
import { useTheme } from '@/components/theme/ThemeProvider';

export default function PublicNav({
  settings = DUMMY_SETTINGS,
}) {
  const pathname = usePathname();
  const { darkMode, toggleDarkMode } = useTheme();

  const isActive = (path) => pathname === path;

  const baseBtn = "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300";

  return (
    <nav
      className={`border-b sticky top-0 z-50 shadow-lg transition-all duration-300 ${
        darkMode
          ? 'border-purple-500/20 bg-slate-950/95 backdrop-blur-xl shadow-purple-500/5'
          : 'border-purple-200/50 bg-white/95 backdrop-blur-xl shadow-purple-500/10'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="group">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:to-cyan-400 transition-all duration-300">
              P
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex space-x-1">
        
            <Link
              href="/"
              className={`${baseBtn} ${
                isActive("/")
                  ? darkMode
                    ? 'bg-purple-600/20 text-purple-400 shadow-inner'
                    : 'bg-purple-100 text-purple-700 shadow-inner'
                  : darkMode
                  ? 'text-slate-400 hover:text-purple-400 hover:bg-purple-600/10'
                  : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              Home
            </Link>

            {settings.navbar.blogs && (
              <Link
                href="/blogs"
                className={`${baseBtn} ${
                  isActive("/blogs")
                    ? darkMode
                      ? 'bg-purple-600/20 text-purple-400 shadow-inner'
                      : 'bg-purple-100 text-purple-700 shadow-inner'
                    : darkMode
                    ? 'text-slate-400 hover:text-purple-400 hover:bg-purple-600/10'
                    : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                Blogs
              </Link>
            )}
          
            {/* Reviews Dropdown (Movies / Books / Products) */}
            {(settings.navbar.movies ||
              settings.navbar.books ||
              settings.navbar.products) && (
              <div className="relative group">
                <button
                  className={`${baseBtn} ${
                    darkMode
                      ? 'text-slate-400 hover:text-purple-400 hover:bg-purple-600/10'
                      : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  Recommendations
                </button>

                <div className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 pt-2 left-1/2 -translate-x-1/2 z-50">
                  <div
                    className={`backdrop-blur-xl border rounded-xl shadow-2xl p-2 space-y-1 min-w-[160px] ${
                      darkMode
                        ? 'bg-slate-900/95 border-purple-500/20'
                        : 'bg-white/95 border-purple-200'
                    }`}
                  >
                    {settings.navbar.movies && (
                      <Link
                        href="/movies"
                        className="flex items-center px-4 py-2.5 text-sm rounded-lg hover:bg-purple-500/10"
                      >
                        <Film className="w-4 h-4 mr-3 text-purple-500" />
                        Movies
                      </Link>
                    )}

                    {settings.navbar.books && (
                      <Link
                        href="/books"
                        className="flex items-center px-4 py-2.5 text-sm rounded-lg hover:bg-purple-500/10"
                      >
                        <Book className="w-4 h-4 mr-3 text-cyan-500" />
                        Books
                      </Link>
                    )}

                    {settings.navbar.products && (
                      <Link
                        href="/products"
                        className="flex items-center px-4 py-2.5 text-sm rounded-lg hover:bg-purple-500/10"
                      >
                        <Package className="w-4 h-4 mr-3 text-pink-500" />
                        Products
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}

            <Link
              href="/projects"
              data-testid="nav-projects-link"
              className={`${baseBtn} ${
                isActive("/projects")
                  ? darkMode
                    ? 'bg-purple-600/20 text-purple-400 shadow-inner'
                    : 'bg-purple-100 text-purple-700 shadow-inner'
                  : darkMode
                  ? 'text-slate-400 hover:text-purple-400 hover:bg-purple-600/10'
                  : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              Projects
            </Link>

            {settings.navbar.about && (
              <Link
                href="/about"
                className={`${baseBtn} ${
                  isActive("/about")
                    ? darkMode
                      ? 'bg-purple-600/20 text-purple-400 shadow-inner'
                      : 'bg-purple-100 text-purple-700 shadow-inner'
                    : darkMode
                    ? 'text-slate-400 hover:text-purple-400 hover:bg-purple-600/10'
                    : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                About
              </Link>
            )}

            <Link
              href="/contact"
              className={`${baseBtn} ${
                isActive("/contact")
                  ? darkMode
                    ? 'bg-purple-600/20 text-purple-400 shadow-inner'
                    : 'bg-purple-100 text-purple-700 shadow-inner'
                  : darkMode
                  ? 'text-slate-400 hover:text-purple-400 hover:bg-purple-600/10'
                  : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Dark mode */}
          <Button
            onClick={toggleDarkMode}
            variant="ghost"
            size="icon"
          >
            {darkMode ? <Sun /> : <Moon />}
          </Button>
        </div>
      </div>
    </nav>
  );
}
