"use client";
import { Sun, Moon, Linkedin, Instagram, Send, Code, LayoutGrid, Palette, X, Menu, Mail, Zap, ChevronUp, Star, Award, MessageSquare } from "lucide-react" // Added 'MessageSquare' icon for testimonials
import React, { useState, useEffect } from "react"


// --- Certificate File Paths ---
const udacityCert = '/certificates/Abreham_Solomon_Udacty.pdf'
const mernComlete = '/certificates/MERN_Completion.pdf'
const mernTop = '/certificates/MERN_TOP_SCORRER.pdf'




// --- Image Placeholder Data (Replaces local imports) ---
const placeholderImages = {
    avatar: 'ppt.jpg',
    works: [
        { id: 1, url: "pit2.png" },
        { id: 2, url: "expo.png" },
        { id: 3, url: "mira.jpg" },
        { id: 4, url: "note.png" },
        { id: 5, url: "pit.png" },
        { id: 6, url: "pro.png" },
        { id: 7, url: "flow.png" },
    ]
}

// Data for three testimonials
const testimonialsData = [
    {
        name: "Yohannes Sebsebe",
        title: "Project Manager, Creative Agency",
        quote: "Abreham's system architecture was flawless. He turned our complex requirements into a beautifully simple and highly performant application.",
        avatarUrl: "https://placehold.co/48x48/f472b6/1e293b?text=JD",
    },
    {
        name: "Nuredin Emamu",
        title: "Founder, Startup XYZ",
        quote: "The full stack application Abreham delivered was robust, scalable, and deployed ahead of schedule. Professionalism and technical skill in equal measure.",
        avatarUrl: "https://placehold.co/48x48/34d399/1e293b?text=MC",
    },
    {
        name: "Sisay Koti",
        title: "Marketing Director, Global Firm",
        quote: "His design work has a future-forward edge. The attention to detail in the interface design is something my team is still talking about.",
        avatarUrl: "https://placehold.co/48x48/a855f7/1e293b?text=SL",
    },
];


// --- UPDATED Data for certificates ---
const certificatesData = [
    {
        id: 1,
        title: "Programming Fundamentals Nanodegree",
        issuer: "Udacity",
        description: "Successfully completed the Programming Fundamentals Nanodegree, demonstrating proficiency in core programming concepts, data structures, and algorithms.",
        icon: Star,
        downloadUrl: udacityCert
    },
    {
        id: 2,
        title: "MERN Stack Development Completion",
        issuer: "Sage Institute",
        description: "Certified completion of the MERN stack training, covering MongoDB, Express, React, and Node.js for scalable full-stack application development.",
        icon: Code,
        downloadUrl: mernComlete
    },
    {
        id: 3,
        title: "Top Scorer Recognition Award (IT Dept)",
        issuer: "Sage Institute",
        description: "Awarded for achieving the highest academic performance among all students in the Information Technology department.",
        icon: Award,
        downloadUrl: mernTop
    },
];
// --- END UPDATED Data for certificates ---


// --- UPDATED DATA STRUCTURES ---

const aboutMeData = {
    birthplace: "Adama, Ethiopia",
    age: 26,
    living: "Addis Ababa",
    graduation: {
        institution: "Wolkite University",
        degree: "Computer Science",
        year: "2021",
       
    },
    summary: "I am a dedicated System Architect and Full Stack Developer with a B.Sc. in Computer Science from Wolkite University, graduating in 2021. Born in Adama, I leverage my strong academic background and diverse skill set from fundamental programming to modern MERN architecture to engineer high-impact digital solutions. I am driven by performance, design integrity, and a commitment to continuous learning."
};

// --- END UPDATED DATA STRUCTURES ---

// Component for the Contact Form
const ContactMe = ({ primaryTextColor, cardBg, shadowClass, gradientClass, darkMode }: { primaryTextColor: string; cardBg: string; shadowClass: string; gradientClass: string; darkMode: boolean }) => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle'); // idle, loading, success, error

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (status === 'loading') return;

        setStatus('loading');

      try {
        const res = await fetch('/api/contact' , {
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        })
        const data = await res.json();
        if (data.success) {
            setStatus('success');
            
        } else {
            console.log(data.error)
        }
      } catch (error) {
        console.log(error)
      }
    };

    // Dynamic input classes based on darkMode
    const inputClasses = darkMode ?
        "w-full p-4 rounded-xl border border-indigo-700/50 bg-gray-900/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/80 transition-colors text-gray-100 placeholder-gray-500" :
        "w-full p-4 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/80 transition-colors text-gray-900 placeholder-gray-400";

    const buttonClasses = "w-full text-lg py-4 rounded-full font-extrabold transition-all duration-300 transform active:scale-95 text-white shadow-xl";

    let buttonContent;
    let buttonGradientClass = `bg-gradient-to-r ${gradientClass} hover:opacity-90`;

    switch (status) {
        case 'loading':
            buttonContent = (
                <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Data...
                </div>
            );
            buttonGradientClass = 'bg-gray-600 cursor-not-allowed';
            break;
        case 'success':
            buttonContent = 'Signal Received! 🎉';
            buttonGradientClass = 'bg-green-600 cursor-not-allowed';
            break;
        case 'error':
            buttonContent = 'Transmission Failed. Retry.';
            buttonGradientClass = 'bg-red-600 cursor-not-allowed';
            break;
        case 'idle':
        default:
            buttonContent = 'SEND MESSAGE';
            break;
    }

    return (
        <section id="contact" className="py-20 flex justify-center scroll-mt-24">
            <div className={`w-full max-w-2xl p-10 rounded-3xl ${cardBg} ${shadowClass} text-center`}>
                <Mail className={`mx-auto w-14 h-14 mb-4 ${primaryTextColor} p-2 rounded-xl border border-current`} />
                <h3 className={`text-4xl font-extrabold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'} tracking-tight`}>Contact Me</h3>
                <p className={`text-xl leading-7 mb-10 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Ready to build the next generation of digital excellence? Let&apos;s discuss your project&apos;s potential.
                </p>

                {/* Status Message */}
                {status === 'success' && (
                    <div className="bg-green-900/50 text-green-300 p-4 rounded-xl mb-6 font-medium border border-green-700">
                        Signal Received! I&apos;ll process your request and respond ASAP.
                    </div>
                )}
                {status === 'error' && (
                    <div className="bg-red-900/50 text-red-300 p-4 rounded-xl mb-6 font-medium border border-red-700">
                        Transmission failed. Please check your data and retry.
                    </div>
                )}


                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className={inputClasses}
                            disabled={status === 'loading' || status === 'success'}
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className={inputClasses}
                            disabled={status === 'loading' || status === 'success'}
                        />
                    </div>
                    <div>
                        <textarea
                            name="message"
                            placeholder=" Message..."
                            rows={6}
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className={`${inputClasses} resize-none`}
                            disabled={status === 'loading' || status === 'success'}
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        disabled={status === 'loading' || status === 'success'}
                        className={`${buttonClasses} ${buttonGradientClass}`}
                    >
                        {buttonContent}
                    </button>
                </form>
            </div>
        </section>
    );
};

function App() {

    // Default to Dark Mode (true)
    const [darkMode, setDarkMode] = useState(true)
    const [open, setOpen] = useState<number | null>(null)
    const [showScroll, setShowScroll] = useState(false)
    // NEW STATE for Mobile Menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // --- Theme Variables for Cyber-Modern Aesthetic ---
    const themeClass = darkMode ? "bg-gray-950 text-gray-100" : "bg-gray-100 text-gray-900";
    const primaryTextColor = darkMode ? "text-cyan-400" : "text-indigo-600";
    // Stronger, more vibrant gradient
    const gradientClass = "from-indigo-600 to-cyan-500";

    // Card Background: Semi-transparent dark slate / Bright white
    const cardBg = darkMode ? "bg-gray-800/70 backdrop-blur-md border border-gray-700/50" : "bg-white/90 backdrop-blur-lg border border-gray-300";

    // Shadow: Subtle glow/sharp shadow for lifted effect
    const shadowClass = darkMode
        ? "shadow-2xl shadow-cyan-500/10 hover:shadow-cyan-400/20 transition-shadow duration-500"
        : "shadow-xl shadow-indigo-200 hover:shadow-indigo-300 transition-shadow duration-300";
    // -----------------------------------------------------------------------

    // Scroll to Top logic
    const checkScrollTop = () => {
        if (!showScroll && window.scrollY > 400) {
            setShowScroll(true)
        } else if (showScroll && window.scrollY <= 400) {
            setShowScroll(false)
        }
    };

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop)
        return () => window.removeEventListener('scroll', checkScrollTop)
    }, [showScroll]);


    // Component for the social links
    const SocialLinks = ({ large = false }) => (
        <div className="flex justify-center gap-4">
            <a href="#" aria-label="LinkedIn" className={`p-3 rounded-xl ${darkMode ? 'hover:bg-cyan-400/20' : 'hover:bg-indigo-100/50'} transition-colors ${large ? 'scale-125' : ''}`}>
                <Linkedin className={`w-6 h-6 ${primaryTextColor}`} />
            </a>
            <a href="#" aria-label="Instagram" className={`p-3 rounded-xl ${darkMode ? 'hover:bg-cyan-400/20' : 'hover:bg-indigo-100/50'} transition-colors ${large ? 'scale-125' : ''}`}>
                <Instagram className={`w-6 h-6 ${primaryTextColor}`} />
            </a>
            <a href="#" aria-label="Send Message" className={`p-3 rounded-xl ${darkMode ? 'hover:bg-cyan-400/20' : 'hover:bg-indigo-100/50'} transition-colors ${large ? 'scale-125' : ''}`}>
                <Send className={`w-6 h-6 ${primaryTextColor}`} />
            </a>
        </div>
    );

    // Component for Service Card
    const ServiceCard = ({
        icon: Icon,
        title,
        description,
        technologies
    }: {
        icon: React.ComponentType<{ className?: string }>,
        title: string,
        description: string,
        technologies: string[]
    }) => (
        <div className={`text-center p-8 rounded-3xl ${cardBg} ${shadowClass} transition-all duration-500 transform hover:scale-[1.03] ${darkMode ? 'hover:border-cyan-400' : 'hover:border-indigo-600'} flex flex-col items-center`}>
            {/* Icon with a clear container for visual weight */}
            <div className={`p-3 rounded-xl mb-4 ${darkMode ? 'bg-indigo-900/40 border border-cyan-400/30' : 'bg-indigo-100/70 border border-indigo-600/30'}`}>
                <Icon className={`w-10 h-10 ${primaryTextColor}`} />
            </div>

            <h3 className={`text-2xl font-extrabold pt-2 pb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{title}</h3>
            <p className={`text-base mb-6 leading-6 flex-grow ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>

            <div className="flex flex-wrap justify-center gap-2 mt-4 pt-4 border-t border-gray-700/50 w-full">
                {technologies.map((tech, index) => (
                    <span
                        key={index}
                        className={`px-3 py-1 text-xs font-mono rounded-full opacity-90 border font-semibold ${darkMode
                            ? 'bg-cyan-900/30 text-cyan-300 border-cyan-400/20'
                            : 'bg-indigo-100 text-indigo-700 border-indigo-700/50'}`}
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    );

    // Component for single testimonial card
    type TestimonialCardProps = {
        name: string;
        title: string;
        quote: string;
        avatarUrl: string;
    };

    const TestimonialCard = ({ name, title, quote, avatarUrl }: TestimonialCardProps) => (
        <div className={`p-8 rounded-3xl ${cardBg} ${shadowClass} transition-all duration-300 ${darkMode ? 'hover:ring-4 hover:ring-cyan-500/50' : 'hover:ring-4 hover:ring-indigo-600/50'} flex flex-col h-full border-l-4 ${darkMode ? 'border-cyan-400' : 'border-indigo-600'}`}>
            <MessageSquare className={`w-6 h-6 ${primaryTextColor} mb-4`} />
            <blockquote className={`text-lg italic mb-6 flex-grow ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                &ldquo;{quote}&rdquo;
            </blockquote>
            <div className={`flex items-center pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                <div className="w-12 h-12 rounded-full mr-4 flex-shrink-0">
                    <img src={avatarUrl} alt={`${name} Avatar`} className={`rounded-full w-full h-full object-cover border-2 ${darkMode ? 'border-cyan-400' : 'border-indigo-600'}`} />
                </div>
                <div>
                    <p className={`font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{name}</p>
                    <p className={`text-sm ${primaryTextColor} opacity-80 font-mono`}>{title}</p>
                </div>
            </div>
        </div>
    );

    // Component for Testimonials Section
    const TestimonialsSection = () => (
        <section id="testimonials" className="py-20 scroll-mt-24 border-b border-indigo-700/50">
            <div className="text-center mb-12">
                <h3 className="text-xl font-mono tracking-widest uppercase text-cyan-400 mb-2">Validation</h3>
                <h2 className={`text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>CLIENT ENDORSEMENTS</h2>
                <p className={`text-lg leading-8 max-w-4xl mx-auto mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Direct feedback from partners and clients confirming the quality and impact of executed work.
                </p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonialsData.map((testimonial, index) => (
                    <TestimonialCard key={index} {...testimonial} />
                ))}
            </div>
        </section>
    );

    // Component for Modal (Image Viewer)
    const ImageViewer = ({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) => (
        <div
            className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4 cursor-pointer backdrop-blur-lg"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <button
                onClick={onClose}
                className="absolute top-6 right-6 p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors z-50 ring-2 ring-white/50"
                aria-label="Close image viewer"
            >
                <X className="w-6 h-6" />
            </button>
            <div className="max-w-5xl w-full max-h-[90vh] flex items-center justify-center">
                <img
                    src={src}
                    alt={alt}
                    className={`rounded-2xl shadow-2xl max-w-full max-h-full object-contain pointer-events-none border-4 ${darkMode ? 'border-cyan-500/50' : 'border-indigo-600/50'}`}
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
                />
            </div>
        </div>
    );

    // Component for a single Certificate Card
    type Certificate = {
        id: number;
        title: string;
        issuer: string;
        description: string;
        icon: React.ComponentType<{ className?: string }>;
        downloadUrl: string;
    };

    const CertificateCard = ({ cert }: { cert: Certificate }) => (
        <div className={`p-8 rounded-3xl ${cardBg} ${shadowClass} flex flex-col h-full transition-all duration-300 transform hover:translate-y-[-5px] border-l-4 ${darkMode ? 'border-indigo-600' : 'border-cyan-500'}`}>
            <cert.icon className={`w-10 h-10 mb-4 ${primaryTextColor}`} />
            <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{cert.title}</h3>
            <p className={`text-sm mb-4 font-mono ${primaryTextColor} opacity-80`}>Issued by: {cert.issuer}</p>
            <p className={`text-base flex-grow mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{cert.description}</p>

            <a
                href={cert.downloadUrl}
                className={`mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold rounded-full bg-gradient-to-r ${gradientClass} text-white shadow-lg hover:opacity-90 transition-opacity duration-300 transform active:scale-95`}
                download
                target="_blank"
                rel="noopener noreferrer"
            >
                <ChevronUp className="w-4 h-4 rotate-180" />
                Download Verification
            </a>
        </div>
    );

    // Component for the Certificates Section
    const CertificatesSection = () => (
        <section id="certificates" className="py-20 scroll-mt-24 border-b border-indigo-700/50">
            <div className="text-center mb-12">
                <h3 className="text-xl font-mono tracking-widest uppercase text-cyan-400 mb-2">Credentials</h3>
                <h2 className={`text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>CERTIFICATES AND ACHIEVEMENTS</h2>
                <p className={`text-lg leading-8 max-w-4xl mx-auto mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Formal verification of expertise and recognition of academic success.
                </p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {certificatesData.map((cert) => (
                    <CertificateCard
                        key={cert.id}
                        cert={cert}
                    />
                ))}
            </div>
        </section>
    );

    // Component for About Me Section
    const AboutMeSection = () => (
        <section id="about" className="py-20 scroll-mt-24 border-b border-indigo-700/50">
            <div className="text-center mb-12">
                <h3 className="text-xl font-mono tracking-widest uppercase text-cyan-400 mb-2">Background</h3>
                <h2 className={`text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>ABOUT ME</h2>
            </div>
            <div className={`w-full max-w-6xl mx-auto p-10 rounded-3xl ${cardBg} ${shadowClass}`}>
                <p className={`text-xl leading-relaxed mb-10 ${darkMode ? 'text-gray-300' : 'text-gray-700'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-300'} pb-6`}>
                    {aboutMeData.summary}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center pt-4">
                    <div className="flex flex-col items-center">
                        <p className={`text-4xl font-extrabold ${primaryTextColor}`}>{aboutMeData.age}+</p>
                        <p className={`text-sm uppercase font-mono mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Years old</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className={`text-2xl font-extrabold ${primaryTextColor}`}>{aboutMeData.graduation.year}</p>
                        <p className={`text-sm uppercase font-mono mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{aboutMeData.graduation.degree.substring(0, 4)} Graduation</p>
                    </div>
                    <div className="flex flex-col items-center col-span-2 md:col-span-1">
                        <p className={`text-2xl font-extrabold ${primaryTextColor}`}>{aboutMeData.graduation.institution.split(' ')[0]}</p>
                        <p className={`text-sm uppercase font-mono mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>University</p>
                    </div>
                    <div className="flex flex-col items-center col-span-2 md:col-span-1">
                        <p className={`text-2xl font-extrabold ${primaryTextColor}`}>{aboutMeData.graduation.degree}</p>
                        <p className={`text-sm uppercase font-mono mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Field Of Study</p>
                    </div>
                    <div className="flex flex-col items-center col-span-2 md:col-span-1">
                        <p className={`text-2xl font-extrabold ${primaryTextColor}`}>{aboutMeData.living}</p>
                        <p className={`text-sm uppercase font-mono mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Living Place</p>
                    </div>
                    <div className="flex flex-col items-center col-span-2 md:col-span-1">
                        <p className={`text-2xl font-extrabold ${primaryTextColor}`}>{aboutMeData.birthplace.split(',')[0]}</p>
                        <p className={`text-sm uppercase font-mono mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Birth Place</p>
                    </div>
                </div>
            </div>
        </section>
    );

    const NavLinks = [
        { id: 'about', name: 'About', icon: Code },
        { id: 'services', name: 'Services', icon: Zap },
        { id: 'certificates', name: 'Certificates', icon: Star },
        { id: 'portfolio', name: 'Portfolio', icon: LayoutGrid },
        { id: 'testimonials', name: 'Reviews', icon: MessageSquare }, // Added Testimonials
        { id: 'contact', name: 'Contact', icon: Mail },
    ];

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu on click
        setIsMenuOpen(false);
    };


    return (
        <div className={`${themeClass} min-h-screen font-sans transition-colors duration-500`}>
            <main className="px-4 md:px-12 lg:px-24">

                {/* Navigation Bar */}
                <nav className={`py-6 sticky top-0 z-40 backdrop-blur-lg flex justify-between items-center border-b ${darkMode ? 'bg-gray-950/90 border-indigo-700/50' : 'bg-gray-100/90 border-gray-300'}`}>
                    <h1 className="text-4xl font-extrabold tracking-tight">
                        A<span className={primaryTextColor}>S</span>
                    </h1>

                    {/* Desktop Links */}
                    <ul className="hidden lg:flex items-center gap-4 font-semibold">
                        {NavLinks.map(link => (
                            <li key={link.id}>
                                <button
                                    onClick={() => scrollToSection(link.id)}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors font-medium text-base ${darkMode ? 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10' : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-100/70'}`}
                                >
                                    <link.icon className="w-4 h-4" />
                                    {link.name}
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-4">
                        {/* Theme Toggle */}
                        <li className={`list-none cursor-pointer p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-cyan-400/20' : 'hover:bg-indigo-100'}`} onClick={() => setDarkMode(!darkMode)}>
                            {darkMode ? <Sun className="w-6 h-6 text-yellow-300" /> : <Moon className="w-6 h-6 text-gray-700" />}
                        </li>
                        {/* Mobile Menu Toggle Button */}
                        <li className="list-none lg:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-cyan-400/20' : 'hover:bg-indigo-100'}`}
                                aria-label="Toggle navigation menu"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </li>
                        {/* Download CV Button (Hidden on XS devices for space) */}
                        <li className="list-none hidden sm:block">
                            <a
                                className={`bg-gradient-to-r ${gradientClass} text-white cursor-pointer font-extrabold px-6 py-2.5 rounded-full ml-2 transition-all duration-300 hover:opacity-95 shadow-lg ${darkMode ? 'shadow-indigo-500/50 hover:shadow-cyan-400/50' : 'shadow-indigo-300 hover:shadow-indigo-400/50'}`}
                                 onClick={() => scrollToSection('portfolio')}

                            >
                                Explore
                            </a>
                        </li>
                    </div>
                </nav>

                {/* Mobile Menu Drawer */}
                <div
                    className={`fixed inset-0 top-[76px] z-30 transform transition-transform duration-300 ease-in-out lg:hidden ${
                        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                        } ${darkMode ? 'bg-gray-950/95 border-l border-indigo-700/50' : 'bg-gray-100/95 border-l border-gray-300'} backdrop-blur-xl w-full h-full`}
                >
                    <ul className="flex flex-col items-center gap-2 pt-8 text-xl font-medium">
                        {NavLinks.map(link => (
                            <li key={link.id} className="w-full text-center">
                                <button
                                    onClick={() => scrollToSection(link.id)}
                                    className={`w-full flex items-center justify-center gap-3 p-4 transition-colors duration-200 text-lg font-bold ${darkMode ? 'text-gray-300 hover:bg-cyan-400/20 hover:text-cyan-400' : 'text-gray-700 hover:bg-indigo-100/70 hover:text-indigo-600'}`}
                                >
                                    <link.icon className="w-5 h-5" />
                                    {link.name.toUpperCase()}
                                </button>
                            </li>
                        ))}
                        <li className="mt-4 w-full text-center">
                            <a
                                 onClick={() => scrollToSection('portfolio')}
                                className={`inline-block bg-gradient-to-r ${gradientClass} text-white font-extrabold px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:opacity-95`}
                            
                            >
                                Explore 
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Hero Section - Split Layout */}
                <section className="min-h-[85vh] flex items-center pt-16 pb-24 border-b border-indigo-700/50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Text Content */}
                        <div className="order-2 lg:order-1">
                           
                            <h2 className={`text-6xl md:text-8xl font-extrabold pb-3 leading-tight bg-clip-text text-transparent bg-gradient-to-r ${gradientClass}`}>
                                Abreham Solomon
                            </h2>
                            <p className={`text-xl md:text-2xl py-6 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Building <strong>high-performance digital solutions</strong> at the intersection of full-stack development, intuitive UX/UI design, and compelling graphics.
                            </p>

                            <div className="flex items-center gap-6 mt-8">
                                <button
                                    onClick={() => scrollToSection('contact')}
                                    className={`flex items-center gap-2 px-8 py-3.5 text-lg font-bold rounded-full bg-gradient-to-r ${gradientClass} text-white shadow-xl ${darkMode ? 'shadow-indigo-500/40 hover:shadow-cyan-400/40' : 'shadow-indigo-300 hover:shadow-indigo-400/50'} transition-shadow duration-300 transform hover:scale-[1.03] active:scale-95`}
                                >
                                    <Send className="w-5 h-5" />
                                    Launch Project
                                </button>
                                <SocialLinks />
                            </div>
                        </div>

                        {/* Avatar/Profile Image */}
                        <div className="order-1 lg:order-2 flex justify-center relative">
                            {/* Stylish Background Geometric Shape */}
                            <div className={`w-full max-w-sm aspect-square rounded-[3rem] absolute inset-0 m-auto ${darkMode ? 'bg-indigo-900/30' : 'bg-indigo-300/30'} transform rotate-[4deg] scale-[1.08] shadow-2xl ${darkMode ? 'shadow-indigo-800/50' : 'shadow-indigo-400/50'}`}></div>
                            <div className={`w-full max-w-sm aspect-square rounded-[3rem] absolute inset-0 m-auto ${darkMode ? 'bg-cyan-700/20' : 'bg-cyan-300/20'} transform rotate-[-4deg] scale-[1.08] shadow-2xl ${darkMode ? 'shadow-cyan-800/50' : 'shadow-cyan-400/50'}`}></div>

                            <img
                                src={placeholderImages.avatar}
                                alt="Abreham Solomon Profile"
                                className={`rounded-[3rem] w-full max-w-sm aspect-square object-cover border-4 ${darkMode ? 'border-gray-950' : 'border-gray-100'} relative z-10 shadow-2xl shadow-black/60`}
                            />
                        </div>

                    </div>
                </section>

                {/* --- SECTION: ABOUT ME --- */}
                <AboutMeSection />

                {/* Services Section */}
                <section id="services" className="py-20 scroll-mt-24 border-b border-indigo-700/50">
                    <div className="text-center mb-12">
                        <h3 className="text-xl font-mono tracking-widest uppercase text-cyan-400 mb-2">Capabilities</h3>
                        <h2 className={`text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>CORE SERVICES</h2>
                        <p className={`text-lg leading-8 max-w-4xl mx-auto mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            I deliver comprehensive, high-quality digital assets across the entire project lifecycle, ensuring performance and design integrity.
                        </p>

                    </div>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* Card 1: Full Stack Web Development */}
                        <ServiceCard
                            icon={Code}
                            title="Full Stack System Development (WEB /APP)"
                            description="Engineering robust, scalable applications with a focus on cutting-edge technology stacks and microservice architectures."
                            technologies={["HTML" , "CSS" , "Tailwind Css" , "Vanilla Js","React", "Node.js", "Express js", "TypeScript", "MongoDb" , "Next Js" , "React Native" ]}
                        />

                        {/* Card 2: UX/UI Designer */}
                        <ServiceCard
                            icon={LayoutGrid}
                            title="UX/UI Design"
                            description="Crafting intuitive, user-centric interfaces. My designs prioritize accessibility and conversion, informed by data and empathy."
                            technologies={["Figma", "PhotoShope", "Adobe XD", "Illustrator"]}
                        />

                        {/* Card 3: Graphics Design */}
                        <ServiceCard
                            icon={Palette}
                            title="Visual & Graphics Design"
                            description="Delivering high-impact visual assets, branding, and motion graphics to create a distinctive and memorable digital identity."
                            technologies={["Photoshop", "Illustrator", "InDesign", "Branding"]}
                        />
                    </div>
                </section>

                {/* --- SECTION: CERTIFICATES --- */}
                <CertificatesSection />

                {/* Portfolio Section */}
                <section id="portfolio" className="py-20 scroll-mt-24 border-b border-indigo-700/50">
                    <div className="text-center mb-12">
                        <h3 className="text-xl font-mono tracking-widest uppercase text-cyan-400 mb-2">Workload</h3>
                        <h2 className={`text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>PROJECT GALLERY</h2>
                        <p className={`text-lg leading-8 max-w-4xl mx-auto mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            A curated selection of executed projects, demonstrating technical versatility and commitment to design excellence.
                        </p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                        {placeholderImages.works.map((item) => (
                            <div
                                key={item.id}
                                className={`rounded-2xl overflow-hidden cursor-pointer ${shadowClass} ${darkMode ? 'hover:ring-4 hover:ring-cyan-500/50 bg-gray-800/70' : 'hover:ring-4 hover:ring-indigo-600/50 bg-white/80'} transition-all duration-300 transform hover:scale-[1.02]`}
                                onClick={() => setOpen(item.id)}
                            >
                                <div className="relative">
                                    <img
                                        src={item.url}
                                        alt={`Portfolio Project ${item.id}`}
                                        className="w-full h-full object-cover aspect-[4/3] transition-transform duration-500 hover:scale-[1.1] opacity-90 hover:opacity-100"
                                    />
                                    <div className={`absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300`}>
                                        <span className={`text-xl font-semibold p-4 rounded-xl border ${darkMode ? 'text-white border-cyan-400/50 bg-cyan-400/10' : 'text-white border-indigo-400/50 bg-indigo-400/20'}`}>VIEW ARTIFACT</span>
                                    </div>
                                </div>
                                <div className={`p-4 ${darkMode ? 'text-white' : 'text-gray-900'} text-center`}>
                                    <p className="font-semibold">{item.url.split('?text=')[1]}</p>
                                    <p className={`text-xs font-mono ${primaryTextColor} opacity-70`}>Click to Enlarge</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- SECTION: TESTIMONIALS (NEW) --- */}
                <TestimonialsSection />

                {/* Contact Section */}
                <ContactMe
                    primaryTextColor={primaryTextColor}
                    cardBg={cardBg}
                    shadowClass={shadowClass}
                    gradientClass={gradientClass}
                    darkMode={darkMode}
                />


                {/* Footer */}
                <footer className={`py-10 border-t ${darkMode ? 'border-indigo-700/50' : 'border-gray-300'} text-center`}>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        &copy; {new Date().getFullYear()} Abreham Solomon. All Rights Reserved. <strong>System Engineered for Performance.</strong>
                    </p>
                    <SocialLinks large={false} />
                </footer>

                {/* Scroll to Top Button */}
                {showScroll && (
                    <button
                        onClick={scrollTop}
                        className={`fixed bottom-8 right-8 p-3 rounded-full bg-gradient-to-r ${gradientClass} text-white shadow-lg transition-all duration-300 transform hover:scale-110 z-50`}
                        aria-label="Scroll to top"
                    >
                        <ChevronUp className="w-6 h-6" />
                    </button>
                )}

                {/* Dynamic Modal Render */}
                {open !== null && (
                    <ImageViewer
                        src={placeholderImages.works.find(w => w.id === open)?.url || ''}
                        alt={`Portfolio Project ${open}`}
                        onClose={() => setOpen(null)}
                    />
                )}
            </main>
        </div>
    );
}

export default App;