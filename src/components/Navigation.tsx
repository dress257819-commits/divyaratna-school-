import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, LogOut } from 'lucide-react';
import { useUserAuth } from '../auth/UserAuthProvider';
import { useFlash } from './Flash';
import { useSiteSettings } from '../theme/siteSettings';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { user, logout } = useUserAuth();
  const { success } = useFlash();
  const { getAssetUrl } = useSiteSettings();
  const handleLogout = () => { logout(); success('Successfully logged out'); };
  const initials = useMemo(() => {
    const name = user?.name || '';
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] || '';
    const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return (first + last).toUpperCase();
  }, [user]);

  const navigationItems = [
    {
      title: 'Home',
      path: '/',
      items: []
    },
    {
      title: 'About Us',
      path: '/about',
      items: [
        { label: 'Mission', path: '/mission' },
        { label: 'Accreditation', path: '/accreditation' },
        { label: 'Strategic Framework', path: '/strategic-framework' },
        { label: 'Governance', path: '/governance' },
        { label: 'School Profile', path: '/school-profile' },
        { label: 'Facilities', path: '/facilities' },
        { label: 'Faculty', path: '/faculty' }
      ]
    },
    {
      title: 'Academics',
      path: '/academics',
      items: [
        { label: 'Elementary School', path: '/academics/elementary' },
        { label: 'Middle School', path: '/academics/middle' },
        { label: 'High School', path: '/academics/high' },
        { label: 'Arts, Athletics, Activities', path: '/academics/activities' },
        { label: 'Curriculum', path: '/academics/curriculum' }
      ]
    },
    {
      title: 'Services',
      path: '/services',
      items: [
        { label: 'Arts, Athletics, Activities', path: '/services/activities' },
        { label: 'Student Services', path: '/services/student' },
        { label: 'Food and Nutrition', path: '/services/nutrition' },
        { label: 'Transportation', path: '/services/transportation' },
        { label: 'Health Services', path: '/services/health' },
        { label: 'Air Quality', path: '/services/air-quality' },
        { label: 'Child Protection', path: '/services/protection' },
        { label: 'Safety and Security', path: '/services/security' }
      ]
    },
    {
      title: 'Community',
      path: '/community',
      items: [
        { label: 'Parent Association', path: '/community/parents' },
        { label: 'Alumni', path: '/community/alumni' },
        { label: 'Community Voices', path: '/community/voices' },
        { label: 'Recently at DRESS', path: '/community/recent' },
        { label: 'Calendar', path: '/calendar' }
      ]
    },
    {
      title: 'Gallery',
      path: '/gallery',
      items: []
    },
    {
      title: 'Bulletins',
      path: '/bulletins',
      items: [
        { label: 'Notices', path: '/bulletins/notices' },
        { label: 'Events', path: '/bulletins/events' },
        { label: 'News & Media', path: '/bulletins/news' },
        { label: 'Achievements', path: '/bulletins/achievements' },
        { label: 'Routine', path: '/bulletins/routine' },
        { label: 'Results', path: '/bulletins/results' }
      ]
    },
    {
      title: 'Log In',
      path: '/login',
      items: [
        { label: 'Parent Login', path: '/login?type=parent' },
        { label: 'Staff Login', path: '/login?type=staff' },
        { label: 'Student Login', path: '/login?type=student' }
      ]
    }
  ];

  return (
    <nav className="site-navigation sticky top-0 z-30">
      <div className="site-navigation-inner mx-auto max-w-[1600px]">
        {/* Top utility bar */}
        <div className="site-utility-bar hidden items-center justify-end px-6 py-2.5 text-xs lg:flex xl:px-10">
          <div className="flex items-center gap-6">
            <Link to="/admission" className="site-utility-link">Admission</Link>
            <Link to="/calendar" className="site-utility-link">Calendar</Link>
            <Link to="/news-media" className="site-utility-link">News &amp; Media</Link>
            <Link to="/work-at-dress" className="site-utility-link">Work at DRESS</Link>
            <Link to="/contact" className="site-utility-link">Contact Us</Link>
          </div>
        </div>

        {/* Main navigation */}
        <div className="flex min-h-[76px] items-center justify-between gap-4 px-5 py-3 sm:px-7 lg:px-8 xl:px-10">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="site-brand flex shrink-0 items-center">
              <>
                <div className="site-school-mark mr-3 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full">
                  <img
                    src={getAssetUrl(
                      'logo',
                      'https://scontent.fbir7-1.fna.fbcdn.net/v/t39.30808-6/475770350_1106464641280060_8051712028946705424_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Egcm6c2e9xoQ7kNvwG2YD3R&_nc_oc=AdlIieyPmL3LDpjYcPAwmKY1MyCR8-CtXtwGYQRFgmZKlp9dgP6cLEmoouxXoyX3g4OMvr4Umv947XLrfrVBbPjM&_nc_zt=23&_nc_ht=scontent.fbir7-1.fna&_nc_gid=wT2Id1Gs9KkWEHupOu8ryg&oh=00_AfmHI4rhlZ4rzGI_nZ7eNpCzN2nuwUB579-MFiM6Yk6VGQ&oe=695146C7'
                    )}
                    className="h-full w-full object-cover"
                    alt="Divya Ratna school crest"
                  />
                </div>
                <div>
                  <div className="text-[17px] font-bold leading-tight tracking-[-0.025em] text-slate-900">Divya Ratna</div>
                  <div className="mt-0.5 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">English Secondary School</div>
                </div>
              </>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-2 lg:flex xl:gap-4 2xl:gap-6">
            {navigationItems.map((item) => (
              <div 
                key={item.title}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                  to={item.path}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                  className={`site-nav-link flex items-center whitespace-nowrap text-[13px] font-semibold ${
                    location.pathname === item.path ? 'site-nav-link-active' : ''
                  }`}>
                  {item.title}
                  {item.items.length > 0 && (
                    <ChevronDown 
                      className="h-3 w-3 ml-1 transition-transform duration-150 ease-in-out" 
                      style={{
                        transform: activeDropdown === item.title ? 'rotate(180deg)' : 'rotate(0deg)',
                        willChange: 'transform'
                      }}
                    />
                  )}
                </Link>
                
                {item.items.length > 0 && (
                  <div 
                    className={`absolute top-full left-0 mt-1 w-56 rounded-lg shadow-xl py-1 z-50 origin-top transition-all duration-150 ease-out ${
                      activeDropdown === item.title 
                        ? 'opacity-100 visible scale-y-100 translate-y-0' 
                        : 'opacity-0 invisible scale-y-95 -translate-y-2'
                    }`}
                    style={{
                      backgroundColor: 'var(--color-background-primary)',
                      border: '1px solid var(--color-border-default)',
                      transformOrigin: 'top center',
                      willChange: activeDropdown === item.title ? 'opacity, transform' : 'auto'
                    }}>
                    {item.items.map((subItem) => (
                      <Link
                        key={typeof subItem === 'object' ? subItem.path : String(subItem)}
                        to={typeof subItem === 'object' ? subItem.path : '#'}
                        className="site-dropdown-link block px-4 py-2.5 text-xs"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {typeof subItem === 'object' ? subItem.label : subItem}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* User badge (right) */}
          <div className="hidden items-center gap-3 lg:flex">
            {user && (
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-[4px] flex items-center justify-center text-sm font-semibold" style={{ 
                  color: 'var(--color-primary-800)',
                  backgroundColor: 'rgba(var(--color-primary-800), 0.07)', 
                  border: '1px solid rgba(var(--color-primary-800), 0.15)' 
                }}>
                  {initials}
                </div>
                <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{user.name}</span>
                <button
                  title="Log out"
                  aria-label="Log out"
                  onClick={handleLogout}
                  className="ml-1 transition-colors"
                  style={{ color: 'var(--color-text-secondary)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary-800)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            )}
            <Link to="/admission" className="site-admission-link inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold">
              Admissions
            </Link>
          </div>

          {/* Mobile menu button and small badge */}
          <div className="flex items-center gap-3 lg:hidden">
            {user && (
              <>
                <div className="w-8 h-8 rounded-[4px] flex items-center justify-center text-xs font-semibold" style={{ 
                  color: 'var(--color-primary-800)',
                  backgroundColor: 'rgba(var(--color-primary-800), 0.07)', 
                  border: '1px solid rgba(var(--color-primary-800), 0.15)' 
                }}>
                  {initials}
                </div>
                <button
                  title="Log out"
                  aria-label="Log out"
                  onClick={handleLogout}
                  className="transition-colors"
                  style={{ color: 'var(--color-text-secondary)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary-800)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              className="site-mobile-toggle rounded-xl p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className="site-mobile-navigation overflow-hidden transition-all duration-200 ease-out lg:hidden"
        style={{
          maxHeight: isOpen ? 'calc(100svh - 76px)' : '0px',
          opacity: isOpen ? 1 : 0,
          borderTop: isOpen ? '1px solid #e2e8f0' : 'none',
          willChange: isOpen ? 'max-height, opacity' : 'auto'
        }}
      >
        <div className="space-y-1 px-4 pb-5 pt-2 sm:px-7">
          {navigationItems.map((item) => (
            <div key={item.title} className="site-mobile-nav-item space-y-1">
              <div className="flex items-center justify-between border-b border-slate-100">
                <Link
                  to={item.path}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                  className={`site-mobile-nav-link flex-1 px-3 py-3 text-left text-sm font-medium ${
                    location.pathname === item.path ? 'site-mobile-nav-link-active' : ''
                  }`}
                  onClick={() => {
                    setActiveDropdown(null);
                    setIsOpen(false);
                  }}
                >
                  {item.title}
                </Link>
                {item.items.length > 0 && (
                  <button
                    type="button"
                    aria-label={`${activeDropdown === item.title ? 'Collapse' : 'Expand'} ${item.title} links`}
                    onClick={() => {
                      setActiveDropdown(activeDropdown === item.title ? null : item.title);
                    }}
                    className="site-mobile-expand px-3 py-3 transition-transform duration-150"
                    style={{ 
                      transform: activeDropdown === item.title ? 'rotate(180deg)' : 'rotate(0deg)',
                      willChange: 'transform'
                    }}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                )}
              </div>
              {item.items.length > 0 && activeDropdown === item.title && (
                <div className="site-mobile-subnav space-y-1 py-1 pl-6">
                  {item.items.map((subItem) => (
                    <Link
                      key={typeof subItem === 'object' ? subItem.path : String(subItem)}
                      to={typeof subItem === 'object' ? subItem.path : '#'}
                      className="site-mobile-subnav-link block px-3 py-2 text-xs"
                      onClick={() => {
                        setActiveDropdown(null);
                        setIsOpen(false);
                      }}
                    >
                      {typeof subItem === 'object' ? subItem.label : subItem}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            to="/admission"
            className="site-mobile-admission mt-4 flex min-h-12 items-center justify-center rounded-full px-5 text-sm font-semibold"
            onClick={() => setIsOpen(false)}
          >
            Admissions
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;