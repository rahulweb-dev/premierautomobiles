import { addDoc, collection, Timestamp } from 'firebase/firestore';

import { Link, useNavigate } from 'react-router-dom';
import { db } from './lib/firebase';
// import OffersCarousel from './OffersCarousel';

import { ToastContainer } from 'react-toastify';
import {
  ChevronLeft,
  ChevronRight,
  Facebook,
  Home,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Twitter,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CgSpinner } from 'react-icons/cg';
import PremiumBikesCarousel from './OffersCarousel';
// import Navbar from './components/Navbar';

// import Popup from "./popup";

const InterestForm = () => {
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    model: '',
    city: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitted(false);

    let newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.mobile.trim() || !/^\d{10}$/.test(form.mobile))
      newErrors.mobile = 'Valid 10-digit mobile number is required';
    if (!form.city) newErrors.city = 'Please select a city';
    if (!form.model) newErrors.model = 'Please select a car model';
    if (form.email && !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = 'Please enter a valid email address';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        await addDoc(collection(db, 'leads'), {
          name: form.name,
          email: form.email,
          mobile: form.mobile,
          model: form.model,
          city: form.city,
          timestamp: Timestamp.now(),
        });
        toast.success('Successfully submitted');
        navigate('/thank-you');
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong!');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <ToastContainer position='top-center' autoClose={5000} theme='dark' />
      <nav className='fixed top-0 left-0 z-50 flex items-center justify-between w-full px-6 py-3 shadow-md md:px-12 lg:px-16 bg-white/30 backdrop-blur-lg'>
        <Link to={'/'}>
          <img
            src={require('./images/logo.webp')}
            className='h-12'
            alt='Hyundai Logo'
          />
        </Link>
        <h1 className='text-xl font-semibold '>
          Booking for
          <a
            className='pl-4 text-lg font-semibold text-gray-900'
            href='tel:+9179972 83111'
          >
            📞 79972 83111
          </a>
        </h1>
      </nav>

      <img
        src='/images/Aprilia.webp'
        alt='Banner'
        className='hidden object-cover w-full mt-12 sm:block'
      />
      <img
        src='/images/WM_Hyundai__October_Offers__at_Bharat_Hyundai.webp'
        alt='Mobile Banner'
        className='block object-cover w-full mt-10 sm:hidden'
      />

      <div className='w-full bg-white flex justify-center 2xl:top-96 border xl:top-80 lg:absolute lg:left-72 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 lg:bg-white lg:p-6 lg:top-96 lg:rounded-2xl lg:shadow-lg lg:w-[90%] lg:max-w-sm lg:max-h-sm'>
        <div className='w-full max-w-sm p-3 bg-white shadow-lg sm:p-8 md:p-2 rounded-2xl lg:max-w-sm lg:max-h-sm '>
          <h3 className='pb-4 text-xl font-bold text-center text-black sm:text-2xl'>
            REGISTER YOUR INTEREST
          </h3>

          {!submitted && (
            <form onSubmit={handleSubmit} className='space-y-6'>
              <input
                type='text'
                name='name'
                placeholder='Name'
                value={form.name}
                onChange={handleChange}
                disabled={loading}
                className='w-full px-4 py-2 text-sm text-center text-black bg-transparent border-b-2 border-black sm:text-base focus:outline-none'
              />
              {errors.name && (
                <p className='text-xs text-red-500'>{errors.name}</p>
              )}

              <input
                type='text'
                name='mobile'
                placeholder='Mobile Number'
                value={form.mobile}
                disabled={loading}
                onChange={handleChange}
                className='w-full px-4 py-2 text-sm text-center text-black bg-transparent border-b-2 border-black sm:text-base focus:outline-none'
              />
              {errors.mobile && (
                <p className='text-xs text-red-500'>{errors.mobile}</p>
              )}

              <select
                name='city'
                value={form.city}
                disabled={loading}
                onChange={handleChange}
                className='w-full px-4 py-2 text-sm text-center text-black bg-transparent border-b-2 border-black sm:text-base focus:outline-none'
              >
                <option value='' disabled hidden>
                  Select City
                </option>
                <option value='Gachibowli'>Gachibowli(HYD)</option>
                <option value='Nampally'>Nampally(HYD)</option>
                <option value='KHAMMAM'>Khammam</option>
              </select>
              {errors.city && (
                <p className='text-xs text-red-500'>{errors.city}</p>
              )}

              <select
                name='model'
                value={form.model}
                onChange={handleChange}
                disabled={loading}
                className='w-full px-4 py-2 text-sm text-center text-black bg-transparent border-b-2 border-black sm:text-base focus:outline-none'
              >
                <option value=''>Select Model</option>
                <option value='I20'>I20</option>
                <option value='GRAND I10 NIOS'>GRAND I10 NIOS</option>
                <option value='AURA'>AURA</option>
                <option value='VERNA'>VERNA</option>
                <option value='ALCAZAR'>ALCAZAR</option>
                <option value='TUCSON'>TUCSON</option>
                <option value='CRETA N LINE'>CRETA N LINE</option>
                <option value='EXTER'>EXTER</option>
                <option value='VENUE N LINE'>VENUE N LINE</option>
                <option value='CRETA'>CRETA</option>
                <option value='CRETA ELECTRIC'>CRETA ELECTRIC</option>
                <option value='IONIQ 5'>IONIQ 5</option>
              </select>
              {errors.model && (
                <p className='text-xs text-red-500'>{errors.model}</p>
              )}

              <button
                type='submit'
                disabled={loading}
                className='w-full py-3 text-sm font-bold text-white transition duration-200 bg-blue-600 rounded-lg sm:text-base hover:bg-blue-700'
              >
                {loading ? (
                  <div className='flex items-center justify-center'>
                    <CgSpinner className='w-5 h-5 mr-2 text-white animate-spin' />
                    Submitting...
                  </div>
                ) : (
                  'Submit'
                )}
              </button>
            </form>
          )}

          <p className='mt-3 text-xs text-center text-gray-600'>
            *By clicking 'Submit', you agree to our Terms & Conditions.
          </p>
        </div>
      </div>

      <PremiumBikesCarousel />
      <BikeShowcase />
      <BikeFeaturesSection />
      <Footer />
    </>
  );
};

export default InterestForm;

const bikeColors = [
  {
    name: 'Racing Red',
    code: '#D32F2F',
    img: '/images/aprilia-rs-660-right-side-view0.avif',
  },
  {
    name: 'Prism Black',
    code: '#000000',
    img: '/images/aprilia-rs-660-right-side-view0.avif',
  },
  {
    name: 'Opalescent Light',
    code: '#E0E0E0',
    img: '/images/aprilia-rs-660-right-side-view0.avif',
  },
];

export function BikeShowcase() {
  const [selectedBike, setSelectedBike] = useState(bikeColors[0]);

  return (
    <section className='bg-gradient-to-b from-white to-gray-100 px-6 sm:px-10 py-16 relative max-w-[1400px] mx-auto overflow-hidden'>
      <div className='flex flex-col items-center justify-between gap-10 lg:flex-row'>
        {/* Text Section */}
        <div className='px-4 text-center lg:w-1/2 lg:text-left'>
          <h2 className='text-3xl font-bold text-gray-900 uppercase sm:text-4xl md:text-5xl'>
            Aprilia RS 457
          </h2>
          <p className='mt-3 text-lg font-semibold text-gray-700'>
            Born to Rule the Streets
          </p>
          <p className='max-w-lg mx-auto mt-4 text-gray-500 lg:mx-0'>
            Inspired by the legendary RS series, the all-new Aprilia RS 457
            combines Italian design, advanced technology, and track performance.
            Lightweight, powerful, and ready to conquer every corner.
          </p>

          {/* Buttons */}
          <div className='flex flex-col items-center gap-4 mt-6 sm:flex-row lg:items-start'>
            <button className='px-6 py-2 font-semibold text-red-500 transition border border-red-500 rounded-lg hover:bg-red-500 hover:text-white'>
              Download Brochure
            </button>
            <a
              href='/'
              className='flex items-center text-lg font-medium text-red-500 hover:underline'
            >
              Book a Test Ride <span className='ml-2'>→</span>
            </a>
          </div>
        </div>

        {/* Bike Image Section */}
        <div className='relative flex justify-center mt-8 lg:w-1/2 lg:mt-0'>
          {/* Background Glow */}
          <div
            className='absolute top-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[440px] rounded-full blur-3xl opacity-60 -z-10'
            style={{ backgroundColor: selectedBike.code }}
          ></div>

          {/* Bike Image */}
          <img
            src={selectedBike.img}
            alt={`Aprilia RS 457 - ${selectedBike.name}`}
            className='w-[90%] sm:w-[75%] lg:w-[90%] max-w-lg drop-shadow-2xl'
          />
        </div>
      </div>

      {/* Color Selector */}
      <div className='flex justify-center mt-8 space-x-4'>
        {bikeColors.map((bike) => (
          <button
            key={bike.name}
            className={`w-8 h-8 rounded-full border-2 transition-transform duration-300 focus:ring focus:ring-gray-300 ${
              selectedBike.name === bike.name
                ? 'border-black scale-110 ring-2 ring-black'
                : 'border-gray-400 hover:scale-105'
            }`}
            style={{ backgroundColor: bike.code }}
            onClick={() => setSelectedBike(bike)}
            aria-label={`Select ${bike.name} color`}
          ></button>
        ))}
      </div>

      {/* Bike Name */}
      <p className='mt-4 font-medium text-center text-gray-700'>
        Selected Color:{' '}
        <span className='font-semibold text-black'>{selectedBike.name}</span>
      </p>
    </section>
  );
}

export const Footer = () => {
  return (
    <footer className='py-10 text-white bg-black'>
      <div className='grid max-w-6xl grid-cols-1 gap-8 px-6 mx-auto md:grid-cols-4'>
        {/* Logo & Address */}
        <div>
          <h2 className='text-2xl font-bold text-red-600'>
            Aprilia Motorcycles
          </h2>
          <p className='flex items-start gap-2 mt-2 text-gray-300'>
            <Home className='w-5 h-5 mt-1' />
            <span>
              Plot No. 23, Auto Nagar Main Road, Gachibowli, Hyderabad - 500032,
              Telangana.
            </span>
          </p>
        </div>

        {/* Bikes List */}
        <div>
          <h3 className='mb-3 text-lg font-semibold text-white'>Bikes</h3>
          <ul className='space-y-2'>
            {[
              'Aprilia RS 660',
              'Aprilia Tuono 660',
              'Aprilia RSV4',
              'Aprilia SR 160',
              'Aprilia SR Storm 125',
            ].map((bike, index) => (
              <li
                key={index}
                className='pb-1 transition border-b border-gray-700 hover:text-red-500'
              >
                {bike}
              </li>
            ))}
          </ul>
        </div>

        {/* About Section */}
        <div>
          <h3 className='mb-3 text-lg font-semibold text-white'>About Us</h3>
          <ul className='space-y-2'>
            {[
              { label: 'About Aprilia', href: '/' },
              { label: 'Showroom Gallery', href: '/' },
              { label: 'Customer Reviews', href: '/' },
              { label: 'Contact Us', href: '/' },
              { label: 'Career Opportunities', href: '/' },
            ].map((item, index) => (
              <li
                key={index}
                className='pb-1 transition border-b border-gray-700 hover:text-red-500'
              >
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social & Contact */}
        <div className='space-y-8'>
          <h3 className='mb-3 text-lg font-semibold text-white'>Follow Us</h3>
          <div className='flex gap-4 mb-3'>
            <a
              href='https://www.facebook.com/Aprilia'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Facebook'
            >
              <Facebook className='w-6 h-6 cursor-pointer hover:text-red-500' />
            </a>
            <a
              href='https://x.com/ApriliaOfficial'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Twitter'
            >
              <Twitter className='w-6 h-6 cursor-pointer hover:text-red-500' />
            </a>
            <a
              href='https://www.linkedin.com/company/aprilia/'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='LinkedIn'
            >
              <Linkedin className='w-6 h-6 cursor-pointer hover:text-red-500' />
            </a>
            <a
              href='https://www.instagram.com/aprilia/'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Instagram'
            >
              <Instagram className='w-6 h-6 cursor-pointer hover:text-red-500' />
            </a>
          </div>

          <p className='flex items-center gap-2 text-gray-300'>
            <Phone className='w-5 h-5' />
            <a href='tel:+919876543210' className='hover:text-red-500'>
              +91 79972 83111
            </a>
          </p>

          <p className='flex items-center gap-2 mt-2 text-gray-300'>
            <Mail className='w-5 h-5' />
            <a
              className='hover:text-red-500'
              href='mailto:info@apriliahyderabad.in'
            >
              info@apriliahyderabad.in
            </a>
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='pt-4 mt-6 text-sm text-center text-gray-400 border-t border-gray-800'>
        <p>
          <a href='/' className='hover:text-red-500'>
            Terms & Conditions
          </a>{' '}
          |{' '}
          <a href='/PrivacyPolicy' className='hover:text-red-500'>
            Privacy Policy
          </a>
        </p>
        <p className='mt-2'>
          © 2025 All Rights Reserved by Aprilia Motorcycles India.
        </p>
        <p className='mt-1 text-gray-500'>
          Powered by
          <a
            href='https://broaddcast.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <span className='ml-4 hover:text-red-500'>
              BroaddCast Business Solutions LLP.
            </span>
          </a>
        </p>
      </div>
    </footer>
  );
};

export function BikeFeaturesSection() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  // 🏍️ Aprilia Bike Features Data
  const bikeFeatures = [
    {
      title: 'High-Performance Engine',
      description:
        'The powerful 660cc parallel-twin engine delivers outstanding performance and responsive acceleration for pure riding pleasure.',
      image: '/images/aprilia-rs-660-right-side-view0.avif',
    },
    {
      title: 'Lightweight Aluminum Frame',
      description:
        'Engineered for agility and precision, the lightweight aluminum frame enhances cornering stability and control.',
      image: '/images/aprilia-rs-660-right-side-view0.avif',
    },
    {
      title: 'Advanced Ride Modes',
      description:
        'Five customizable ride modes let you tailor performance and safety settings for road, track, or wet conditions.',
      image: '/images/aprilia-rs-660-right-side-view0.avif',
    },
    {
      title: 'Brembo Braking System',
      description:
        'Dual front discs with Brembo calipers ensure exceptional braking power with total confidence at high speeds.',
      image: '/images/aprilia-rs-660-right-side-view0.avif',
    },
    {
      title: 'Aerodynamic Design',
      description:
        'Sculpted bodywork inspired by Aprilia’s racing DNA provides superior aerodynamics and rider comfort.',
      image: '/images/aprilia-rs-660-right-side-view0.avif',
    },
  ];

  return (
    <div className='px-5 py-10 bg-gray-100 md:px-20'>
      <h2 className='mb-6 text-3xl font-bold text-center text-black uppercase'>
        Aprilia RS 660 — Key Features
      </h2>
      <div className='relative max-w-6xl mx-auto'>
        {/* Custom Navigation Buttons */}
        <button
          ref={prevRef}
          className='absolute left-0 z-10 p-3 transition -translate-y-1/2 bg-gray-200 rounded-full shadow-md top-1/2 hover:bg-gray-300'
        >
          <ChevronLeft size={24} />
        </button>
        <button
          ref={nextRef}
          className='absolute right-0 z-10 p-3 transition -translate-y-1/2 bg-gray-200 rounded-full shadow-md top-1/2 hover:bg-gray-300'
        >
          <ChevronRight size={24} />
        </button>

        {/* Swiper Component */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          onSwiper={setSwiperInstance}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        >
          {bikeFeatures.map((feature, index) => (
            <SwiperSlide key={index}>
              <div className='overflow-hidden transition-transform duration-300 transform bg-white rounded-lg shadow-md hover:scale-[1.03] hover:shadow-lg'>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className='object-cover w-full h-48'
                />
                <div className='p-5'>
                  <h3 className='text-lg font-semibold text-red-600'>
                    {feature.title}
                  </h3>
                  <p className='mt-2 text-sm text-gray-600'>
                    {feature.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
