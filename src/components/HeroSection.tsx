import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useSiteSettings } from '../theme/siteSettings';

type HeroSlideRow = {
  id: string;
  asset_key: string;
  image_url: string;
  title: string;
  subtitle: string;
  cta_text: string;
  sort_order: number;
  published: boolean;
};

type HeroSlide = {
  image: string;
  title: string;
  subtitle: string;
  cta: string;
};

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [slides, setSlides] = useState<HeroSlide[]>([]);

  const { getAssetUrl } = useSiteSettings();
  
  const fallbackSlides: HeroSlide[] = useMemo(() => {
    return [
      {
        image: getAssetUrl('hero_1', 'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
        title: 'Excellence in Education',
        subtitle: 'Nurturing minds, building futures at DRESS',
        cta: 'Discover Our Programs'
      },
      {
        image: getAssetUrl('hero_2', 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
        title: 'A passion for learning',
        subtitle: 'Where every student is encouraged to reach their full potential',
        cta: 'Virtual Tour'
      },
      {
        image: getAssetUrl('hero_3', 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
        title: 'The commitment to serve as a compassionate global citizen and leader',
        subtitle: 'Preparing students for success in an interconnected world',
        cta: 'Learn More'
      }
    ];
  }, [getAssetUrl]);

  useEffect(() => {
    let mounted = true;

    const fetchAll = async () => {
      const { data, error } = await supabase
        .from('home_hero_slides')
        .select('id,asset_key,image_url,title,subtitle,cta_text,sort_order,published')
        .eq('published', true)
        .order('sort_order', { ascending: true })
        .order('updated_at', { ascending: false });

      if (!mounted) return;

      if (error || !data) {
        console.warn('[HeroSection] Failed to load home_hero_slides', error);
        setSlides(fallbackSlides);
        return;
      }

      const hero1Fallback = getAssetUrl(
        'hero_1',
        'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      );

      const mapped = (data as unknown as HeroSlideRow[])
        .map((r) => {
          const assetKey = String(r.asset_key);
          const dbImage = (r.image_url || '').trim();
          return {
            image: dbImage || getAssetUrl(assetKey, hero1Fallback),
            title: String(r.title || ''),
            subtitle: String(r.subtitle || ''),
            cta: String(r.cta_text || ''),
          };
        });

      setSlides(mapped.length ? mapped : fallbackSlides);
      setCurrentSlide(0);
    };

    fetchAll();

    const ch = supabase
      .channel('realtime-home-hero')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'home_hero_slides' }, fetchAll)
      .subscribe();

    return () => {
      mounted = false;
      try {
        supabase.removeChannel(ch);
      } catch (e) {
        void e;
      }
    };
  }, [fallbackSlides, getAssetUrl]);

  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section
      aria-label="Welcome to Divya Ratna English Secondary School"
      className="hero-slider relative h-[calc(100svh-76px)] min-h-[560px] max-h-[840px] overflow-hidden md:h-[calc(100vh-112px)]"
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          aria-hidden={index !== currentSlide}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="h-full relative">
            <img
              src={slide.image}
              alt="Divya Ratna English Secondary School campus"
              className={`hero-image absolute inset-0 w-full h-full object-cover ${
                index === currentSlide ? 'hero-image-active' : ''
              }`}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={index === 0 ? 'high' : 'auto'}
            />
            <div className="hero-overlay absolute inset-0"></div>
            <div className="relative z-10 h-full flex items-center text-white">
              <div className="hero-copy w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
                {index === currentSlide && (
                  <div className="hero-copy-content max-w-3xl text-center lg:text-left">
                    <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-100 sm:text-sm">
                      Divya Ratna English Secondary School
                    </p>
                    <h1 className="site-hero-heading mb-5 text-4xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-6xl xl:text-7xl">
                      {slide.title}
                    </h1>
                    <p className="mx-auto mb-8 max-w-2xl text-base font-light leading-7 text-white/90 sm:text-lg sm:leading-8 lg:mx-0">
                      {slide.subtitle}
                    </p>
                    <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
                      <Link
                        to="/about"
                        className="hero-button hero-button-primary inline-flex min-h-12 items-center justify-center rounded-full px-7 text-sm font-semibold"
                      >
                        Explore Our School
                      </Link>
                      <Link
                        to="/admission"
                        className="hero-button hero-button-secondary inline-flex min-h-12 items-center justify-center rounded-full px-7 text-sm font-semibold"
                      >
                        Admissions
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        type="button"
        aria-label="Previous slide"
        className="hero-arrow absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full p-2.5 text-white backdrop-blur-md sm:left-6 sm:p-3 lg:left-10"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        type="button"
        aria-label="Next slide"
        className="hero-arrow absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full p-2.5 text-white backdrop-blur-md sm:right-6 sm:p-3 lg:right-10"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 md:bottom-8">
        <div className="hero-indicators flex items-center gap-2 rounded-full px-4 py-3 backdrop-blur-md">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? 'true' : undefined}
            className={`hero-indicator h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'hero-indicator-active w-8' : 'w-2.5'
            }`}
          />
        ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;