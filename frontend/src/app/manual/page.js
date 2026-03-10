'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function UserManual() {
    const chartRef = useRef(null);
    const canvasRef = useRef(null);

    const [activeView, setActiveView] = useState('view-farmers');
    const [activeAccordion, setActiveAccordion] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [voiceText, setVoiceText] = useState('"Take me to my profile"');
    const [fade, setFade] = useState(true);

    const VOICE_PHRASES = [
        '"Take me to my profile"',
        '"Show me the marketplace"',
        '"मुझे बाज़ार दिखाओ"',
        '"Search for organic potatoes"',
        '"Open my cart"',
        '"എന്റെ ഓർഡറുകൾ കാണിക്കുക"'
    ];

    useEffect(() => {
        // --- Voice Simulator Logic ---
        let phraseIndex = 0;
        const voiceInterval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                phraseIndex = (phraseIndex + 1) % VOICE_PHRASES.length;
                setVoiceText(VOICE_PHRASES[phraseIndex]);
                setFade(true);
            }, 400); // Wait for fade out
        }, 3500);

        // --- Admin Chart.js Implementation ---
        const initChart = async () => {
            const { Chart, registerables } = await import('chart.js');
            Chart.register(...registerables);
            
            if (canvasRef.current) {
                if (chartRef.current) {
                    chartRef.current.destroy();
                }

                const ctx = canvasRef.current.getContext('2d');
                
                chartRef.current = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Verified Farmers', 'Verified Buyers', 'Pending Approval'],
                        datasets: [{
                            data: [4500, 1200, 350],
                            backgroundColor: [
                                '#16a34a', // green-600
                                '#22c55e', // green-500
                                '#eab308'  // yellow-500
                            ],
                            borderWidth: 0,
                            hoverOffset: 4
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        cutout: '70%',
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: {
                                    font: { family: "'Inter', sans-serif" },
                                    usePointStyle: true,
                                    padding: 20
                                }
                            },
                            tooltip: {
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                titleColor: '#333',
                                bodyColor: '#666',
                                borderColor: '#e2e8f0',
                                borderWidth: 1,
                                padding: 12,
                            }
                        }
                    }
                });
            }
        };

        if (typeof window !== 'undefined') {
             initChart();
        }

        return () => {
             if (chartRef.current) chartRef.current.destroy();
             clearInterval(voiceInterval);
        };
    }, []);

    const toggleAccordion = (id) => {
        setActiveAccordion(activeAccordion === id ? null : id);
    };

    const navTo = (view) => {
        setActiveView(view);
        setIsSidebarOpen(false);
        setActiveAccordion(null); // Reset accordions when switching views
    };

    const getSidebarLinkClass = (view) => {
        return `w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${
            activeView === view ? 'bg-green-600 text-white font-semibold' : 'text-gray-700 hover:bg-white/60'
        }`;
    };

    const getSidebarIconClass = (view) => {
        return `w-8 h-8 rounded-lg flex items-center justify-center text-lg shadow-sm ${
            activeView === view ? 'bg-white/20' : 'bg-white'
        }`;
    };

    const getAccordionContentClass = (id) => {
        return `px-6 bg-white overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            activeAccordion === id ? 'max-h-[500px] pb-6' : 'max-h-0'
        }`;
    };

    const getAccordionChevronClass = (id) => {
        return `text-gray-400 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            activeAccordion === id ? 'rotate-180' : ''
        }`;
    };

    return (
        <div className="antialiased h-screen flex flex-col md:flex-row overflow-hidden bg-slate-50 text-[#333333] font-sans">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Merriweather:wght@700&display=swap');

                h1, h2, h3, .font-serif-custom {
                    font-family: 'Merriweather', serif;
                }

                .chart-container-manual {
                    position: relative;
                    width: 100%;
                    max-width: 400px;
                    margin-left: auto;
                    margin-right: auto;
                    height: 250px;
                    max-height: 300px;
                }

                @keyframes pulse-ring {
                    0% { transform: scale(0.8); box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.7); }
                    70% { transform: scale(1); box-shadow: 0 0 0 15px rgba(22, 163, 74, 0); }
                    100% { transform: scale(0.8); box-shadow: 0 0 0 0 rgba(22, 163, 74, 0); }
                }

                .mic-pulse {
                    animation: pulse-ring 2s infinite;
                }

                @keyframes smoothFadeIn {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .view-section {
                    animation: smoothFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>

            {/* Mobile Header */}
            <header className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center z-20">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">🌾</span>
                    <span className="font-serif-custom font-bold text-lg text-green-600">Farmer Connect Help</span>
                </div>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-600 focus:outline-none text-2xl">&#9776;</button>
            </header>

            {/* Sidebar Navigation */}
            <aside className={`bg-green-50 w-full md:w-80 h-auto md:h-full flex-shrink-0 border-r border-green-600/10 flex flex-col absolute md:relative z-30 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-y-auto`}>
                {/* Mobile close button inside sidebar */}
                <div className="md:hidden flex justify-end p-4">
                    <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 text-2xl">&times;</button>
                </div>
                
                <div className="px-6 pb-6 pt-2 md:pt-6 hidden md:block">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-3xl">🌾</span>
                        <span className="font-serif-custom font-bold text-xl text-green-600">Farmer Connect</span>
                    </div>
                    <p className="text-sm text-gray-600 font-medium">Official Documentation</p>
                </div>

                <nav className="flex-1 px-4 py-4 md:py-0 space-y-2 relative z-40 bg-green-50">
                    <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 mt-4 md:mt-0">Select your role</p>
                    
                    <button onClick={() => navTo('view-farmers')} className={getSidebarLinkClass('view-farmers')}>
                        <div className={getSidebarIconClass('view-farmers')}>👩‍🌾</div>
                        <span>For Farmers</span>
                    </button>

                    <button onClick={() => navTo('view-buyers')} className={getSidebarLinkClass('view-buyers')}>
                        <div className={getSidebarIconClass('view-buyers')}>🛒</div>
                        <span>For Buyers</span>
                    </button>

                    <button onClick={() => navTo('view-admins')} className={getSidebarLinkClass('view-admins')}>
                        <div className={getSidebarIconClass('view-admins')}>🛡️</div>
                        <span>For Administrators</span>
                    </button>

                    <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 mt-8">Platform Features</p>

                    <button onClick={() => navTo('view-voice')} className={getSidebarLinkClass('view-voice')}>
                        <div className={getSidebarIconClass('view-voice')}>🎙️</div>
                        <span>Voice Navigation</span>
                    </button>
                    
                    <div className="pt-8 px-2">
                        <Link href="/" className="block text-center px-4 py-2 bg-white/50 border border-green-600/20 hover:bg-white text-gray-800 rounded-lg text-sm font-bold transition-colors">
                            &larr; Back to App Home
                        </Link>
                    </div>
                </nav>
                
                <div className="p-6 text-xs text-gray-500 text-center border-t border-green-600/10">
                    Version 2.1 &bull; Last updated March 2026
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 h-full overflow-y-auto bg-slate-50 p-6 md:p-12 relative z-10 w-full">
                <div className="max-w-3xl mx-auto pb-20">
                    
                    {/* Welcome Banner */}
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8 flex items-center gap-6">
                        <div className="text-5xl hidden sm:block">📖</div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2 font-serif-custom">Welcome to the Help Center</h1>
                            <p className="text-gray-600">Select your role from the menu to discover tailored guides on how to register, trade, and navigate the Farmer Connect platform effectively.</p>
                        </div>
                    </div>

                    {/* View: Farmers */}
                    {activeView === 'view-farmers' && (
                        <section className="view-section">
                            <h2 className="text-3xl font-bold text-green-600 mb-2 font-serif-custom">Farmer Guide</h2>
                            <p className="text-gray-600 mb-8 text-lg">Learn how to set up your digital storefront, list your produce, and connect directly with verified buyers across the country.</p>

                            <div className="space-y-4">
                                {/* Accordion Item 1 */}
                                <div className="accordion-item bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                                    <button onClick={() => toggleAccordion('farmers-1')} className="w-full px-6 py-5 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors focus:outline-none">
                                        <span className="font-bold text-lg text-gray-900 flex items-center gap-3">
                                            <span className="bg-green-50 text-green-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                                            Registration & Login
                                        </span>
                                        <span className={getAccordionChevronClass('farmers-1')}>&#9660;</span>
                                    </button>
                                    <div className={getAccordionContentClass('farmers-1')}>
                                        <div className="border-t border-gray-100 pt-4 text-gray-600 space-y-3">
                                            <p><strong>Sign Up securely:</strong> Create your new account using your 10-digit mobile number, a memorable 4-digit PIN, and your Aadhaar details.</p>
                                            <p><strong>The Verification Process:</strong> After signing up, your account temporarily enters a &quot;pending&quot; state. Our administrative team will review your details to ensure community safety. You will be notified via SMS upon approval.</p>
                                            <p><strong>Accessing your account:</strong> Once approved, simply log in anytime using your registered mobile number and PIN.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Accordion Item 2 */}
                                <div className="accordion-item bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                                    <button onClick={() => toggleAccordion('farmers-2')} className="w-full px-6 py-5 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors focus:outline-none">
                                        <span className="font-bold text-lg text-gray-900 flex items-center gap-3">
                                            <span className="bg-green-50 text-green-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                                            Building Your Trust Score
                                        </span>
                                        <span className={getAccordionChevronClass('farmers-2')}>&#9660;</span>
                                    </button>
                                    <div className={getAccordionContentClass('farmers-2')}>
                                        <div className="border-t border-gray-100 pt-4 text-gray-600 space-y-3">
                                            <p>Your Trust Score is vital. Buyers look for high scores when deciding who to purchase from.</p>
                                            <ul className="list-disc pl-5 space-y-2" style={{ listStylePosition: 'inside' }}>
                                                <li><strong>Profile Completion:</strong> Keep your profile completely updated with your exact geographic location (State, District) and your primary agricultural preferences.</li>
                                                <li><strong>Upload Documents:</strong> Navigate to your <em>Profile</em> dashboard and securely upload a clear photo of your Aadhaar card. This simple step drastically improves your Trust Score and makes your crop listings significantly more attractive.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Accordion Item 3 */}
                                <div className="accordion-item bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                                    <button onClick={() => toggleAccordion('farmers-3')} className="w-full px-6 py-5 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors focus:outline-none">
                                        <span className="font-bold text-lg text-gray-900 flex items-center gap-3">
                                            <span className="bg-green-50 text-green-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                                            Creating & Managing Listings
                                        </span>
                                        <span className={getAccordionChevronClass('farmers-3')}>&#9660;</span>
                                    </button>
                                    <div className={getAccordionContentClass('farmers-3')}>
                                        <div className="border-t border-gray-100 pt-4 text-gray-600 space-y-3">
                                            <p><strong>Add a new Crop:</strong> Navigate to the <em>Marketplace</em> tab or your personal <em>Dashboard</em> and click the <strong>&quot;Add Listing&quot;</strong> button.</p>
                                            <p><strong>Detail your produce:</strong> Provide clear information including the crop name (e.g., Tomatoes), total quantity available, the unit of measurement (e.g., kg, quintal), your expected base price, and an honest short description of the quality.</p>
                                            <p><strong>Manage Status:</strong> You retain full control. Edit your active listings at any time, or update their status to &apos;sold&apos; or &apos;closed&apos; immediately once you&apos;ve successfully completed an offline or online transaction.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Accordion Item 4 */}
                                <div className="accordion-item bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                                    <button onClick={() => toggleAccordion('farmers-4')} className="w-full px-6 py-5 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors focus:outline-none">
                                        <span className="font-bold text-lg text-gray-900 flex items-center gap-3">
                                            <span className="bg-green-50 text-green-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
                                            Handling Orders & Delivery
                                        </span>
                                        <span className={getAccordionChevronClass('farmers-4')}>&#9660;</span>
                                    </button>
                                    <div className={getAccordionContentClass('farmers-4')}>
                                        <div className="border-t border-gray-100 pt-4 text-gray-600 space-y-3">
                                            <p><strong>Reviewing Orders:</strong> Your central <em>Dashboard</em> provides a clear view of all active orders placed by buyers for your listed crops.</p>
                                            <p><strong>Dispatching Produce:</strong> Once you have packed and handed over the crop to the agreed delivery service, it is crucial to update the order status in the app to <strong>&quot;Shipped&quot;</strong>. This notifies the buyer and tracks the progression of your payment.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* View: Buyers */}
                    {activeView === 'view-buyers' && (
                        <section className="view-section">
                            <h2 className="text-3xl font-bold text-green-600 mb-2 font-serif-custom">Buyer Guide</h2>
                            <p className="text-gray-600 mb-8 text-lg">Navigate the digital Mandi. Learn how to discover premium produce, place competitive bids, and manage your logistics seamlessly.</p>

                            <div className="space-y-4">
                                <div className="accordion-item bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                                    <button onClick={() => toggleAccordion('buyers-1')} className="w-full px-6 py-5 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors focus:outline-none">
                                        <span className="font-bold text-lg text-gray-900 flex items-center gap-3">
                                            <span className="bg-green-50 text-green-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                                            Registration & Login
                                        </span>
                                        <span className={getAccordionChevronClass('buyers-1')}>&#9660;</span>
                                    </button>
                                    <div className={getAccordionContentClass('buyers-1')}>
                                        <div className="border-t border-gray-100 pt-4 text-gray-600 space-y-3">
                                            <p><strong>Sign Up:</strong> Register your organization as a Buyer using a valid mobile number, a secure PIN, and your verifiable business details (Business Name, and GST/Tax ID).</p>
                                            <p><strong>Verification:</strong> To maintain a secure trading environment, your buyer account requires administrator approval to verify your business credentials before you can actively participate in trading.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                                    <button onClick={() => toggleAccordion('buyers-2')} className="w-full px-6 py-5 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors focus:outline-none">
                                        <span className="font-bold text-lg text-gray-900 flex items-center gap-3">
                                            <span className="bg-green-50 text-green-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                                            Browsing the Marketplace
                                        </span>
                                        <span className={getAccordionChevronClass('buyers-2')}>&#9660;</span>
                                    </button>
                                    <div className={getAccordionContentClass('buyers-2')}>
                                        <div className="border-t border-gray-100 pt-4 text-gray-600 space-y-3">
                                            <p><strong>Search & Filter:</strong> Utilize the comprehensive <em>Marketplace</em> page. Search for specific crops by name, or refine your view using robust filters by region (e.g., Karnataka) or agricultural category (e.g., Vegetables, Grains).</p>
                                            <p><strong>Interactive Map:</strong> Switch to the <em>Map View</em>. This powerful feature allows you to see exactly where available crops are located geographically, helping you optimize your logistics and shipping costs.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                                    <button onClick={() => toggleAccordion('buyers-3')} className="w-full px-6 py-5 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors focus:outline-none">
                                        <span className="font-bold text-lg text-gray-900 flex items-center gap-3">
                                            <span className="bg-green-50 text-green-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                                            Placing Bids & Negotiation
                                        </span>
                                        <span className={getAccordionChevronClass('buyers-3')}>&#9660;</span>
                                    </button>
                                    <div className={getAccordionContentClass('buyers-3')}>
                                        <div className="border-t border-gray-100 pt-4 text-gray-600 space-y-3">
                                            <p><strong>Negotiate transparently:</strong> Found a crop but want to negotiate a bulk price? Open the specific listing and click <strong>&quot;Place a Bid&quot;</strong> to submit your financial offer directly to the farmer.</p>
                                            <p><strong>Bid History:</strong> Access your dashboard to track all your active bids. On listing pages, you can also see anonymized data on how your offer compares to competitor bids to ensure you remain competitive.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                                    <button onClick={() => toggleAccordion('buyers-4')} className="w-full px-6 py-5 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors focus:outline-none">
                                        <span className="font-bold text-lg text-gray-900 flex items-center gap-3">
                                            <span className="bg-green-50 text-green-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
                                            Purchasing & Order Lifecycle
                                        </span>
                                        <span className={getAccordionChevronClass('buyers-4')}>&#9660;</span>
                                    </button>
                                    <div className={getAccordionContentClass('buyers-4')}>
                                        <div className="border-t border-gray-100 pt-4 text-gray-600 space-y-3">
                                            <ul className="list-disc pl-5 space-y-2" style={{ listStylePosition: 'inside' }}>
                                                <li><strong>Checkout:</strong> Add your desired, accepted listings to your cart and proceed through the secure checkout gateway.</li>
                                                <li><strong>Logistics:</strong> Ensure your delivery address is completely accurate before confirming. Once the farmer ships the order, you will receive an automated notification.</li>
                                                <li><strong>Completion:</strong> When the physical produce arrives at your facility, log in and change the order status to <strong>&quot;Delivered&quot;</strong> to release funds.</li>
                                                <li><strong>Disputes:</strong> If the produce is unfortunately damaged or missing quantity, immediately file a complaint directly from the specific order details page to trigger admin mediation.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* View: Admins */}
                    {activeView === 'view-admins' && (
                        <section className="view-section">
                            <h2 className="text-3xl font-bold text-green-600 mb-2 font-serif-custom">Administrator Guide</h2>
                            <p className="text-gray-600 mb-8 text-lg">Tools and protocols for moderating the ecosystem, verifying identities, and ensuring a safe, transparent marketplace for all users.</p>

                            <div className="space-y-4">
                                <div className="accordion-item bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                                    <button onClick={() => toggleAccordion('admins-1')} className="w-full px-6 py-5 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors focus:outline-none">
                                        <span className="font-bold text-lg text-gray-900 flex items-center gap-3">
                                            <span className="bg-green-50 text-green-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                                            Dashboard Overview & Statistics
                                        </span>
                                        <span className={getAccordionChevronClass('admins-1')}>&#9660;</span>
                                    </button>
                                    <div className={getAccordionContentClass('admins-1')}>
                                        <div className="border-t border-gray-100 pt-4 text-gray-600">
                                            <p className="mb-6">The main overview provides real-time platform health metrics. You can monitor total active users, the current number of active listings, total financial order volume, and pending verification queues.</p>
                                            
                                            <div className="bg-slate-50 p-4 rounded-xl border border-gray-200 mb-2">
                                                <h4 className="text-center font-bold text-sm text-gray-700 mb-2">Live Metric: User Verification Status</h4>
                                                <div className="chart-container-manual relative h-64 w-full max-w-sm mx-auto">
                                                    <canvas id="adminStatsChart" ref={canvasRef}></canvas>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                                    <button onClick={() => toggleAccordion('admins-2')} className="w-full px-6 py-5 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors focus:outline-none">
                                        <span className="font-bold text-lg text-gray-900 flex items-center gap-3">
                                            <span className="bg-green-50 text-green-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                                            User Verification Protocols
                                        </span>
                                        <span className={getAccordionChevronClass('admins-2')}>&#9660;</span>
                                    </button>
                                    <div className={getAccordionContentClass('admins-2')}>
                                        <div className="border-t border-gray-100 pt-4 text-gray-600 space-y-3">
                                            <p><strong>Approve Users:</strong> Systematically review new sign-ups in the queue. Carefully check the uploaded Aadhaar (Farmers) or GST documents (Buyers) for visual clarity, alignment with inputted data, and authenticity.</p>
                                            <p><strong>Reject Users:</strong> If documents are invalid, expired, or blurry, reject the application. It is mandatory to select or type a clear reason (e.g., <em>&quot;Aadhaar photo is blurry and unreadable&quot;</em>) so the user knows exactly how to correct their application.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                                    <button onClick={() => toggleAccordion('admins-3')} className="w-full px-6 py-5 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors focus:outline-none">
                                        <span className="font-bold text-lg text-gray-900 flex items-center gap-3">
                                            <span className="bg-green-50 text-green-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                                            Marketplace Safety & Complaints
                                        </span>
                                        <span className={getAccordionChevronClass('admins-3')}>&#9660;</span>
                                    </button>
                                    <div className={getAccordionContentClass('admins-3')}>
                                        <div className="border-t border-gray-100 pt-4 text-gray-600 space-y-3">
                                            <p><strong>Complaint Resolution:</strong> Actively monitor the <em>Complaints Queue</em>. When a dispute is raised, review the buyer&apos;s statement, photographic evidence, and the core order details.</p>
                                            <p>Communicate securely with both parties through the admin portal. Take appropriate mediation action (authorizing a refund, issuing a formal warning to a party), and subsequently mark the complaint status as <strong>&quot;Resolved&quot;</strong> to close the ticket.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* View: Voice Navigation */}
                    {activeView === 'view-voice' && (
                        <section className="view-section">
                            <div className="bg-gradient-to-br from-green-600 to-green-900 rounded-3xl p-8 md:p-12 text-white shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
                                
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-4 text-yellow-500">
                                        <span className="text-3xl">🎙️</span>
                                        <span className="font-bold tracking-widest uppercase text-sm">Global Feature</span>
                                    </div>
                                    
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif-custom">Multilingual Voice Navigation</h2>
                                    <p className="text-green-50 mb-8 text-lg max-w-xl leading-relaxed">
                                        Farmer Connect is built for everyone, regardless of technical literacy. You can navigate the entire application using your voice in <strong>10 Indian languages</strong> including English, Hindi, Tamil, Telugu, Kannada, Bengali, Marathi, Gujarati, Punjabi, and Haryanvi.
                                    </p>

                                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-8 max-w-xl">
                                        <h3 className="font-bold text-lg mb-3 text-yellow-500">How to use:</h3>
                                        <ol className="list-decimal pl-5 space-y-2 text-green-50" style={{ listStylePosition: 'inside' }}>
                                            <li>Click the persistent <strong>Microphone Icon</strong> located at the bottom right of your screen.</li>
                                            <li>Ensure your web browser has microphone permissions allowed.</li>
                                            <li>Speak a navigation command naturally and clearly.</li>
                                        </ol>
                                    </div>

                                    {/* Interactive Simulator */}
                                    <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-2xl text-gray-800 shadow-inner">
                                        <h4 className="font-bold text-gray-500 uppercase text-xs tracking-wider mb-6">Live Simulator Demo</h4>
                                        
                                        <div className="relative flex items-center justify-center w-24 h-24 mb-6">
                                            <div className="mic-pulse absolute w-full h-full rounded-full bg-green-600/20"></div>
                                            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg relative z-10 cursor-pointer hover:bg-green-900 transition-colors" title="Simulate Voice Input">
                                                🎙️
                                            </div>
                                        </div>

                                        <div className="h-12 flex items-center justify-center w-full max-w-sm">
                                            <p className={`text-xl font-medium text-gray-700 italic text-center px-4 py-2 bg-gray-100 rounded-lg whitespace-nowrap overflow-hidden text-ellipsis transition-opacity duration-400 ease ${fade ? 'opacity-100' : 'opacity-0'}`}>
                                                {voiceText}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section>
                    )}

                </div>
            </main>
        </div>
    );
}
