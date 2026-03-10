'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function ProjectReport() {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    const [activeTab, setActiveTab] = useState('tab-trust');
    const [activeStep, setActiveStep] = useState(0);

    const TABS = [
        { id: 'tab-trust', icon: '🔐', label: 'Authentication & Trust' },
        { id: 'tab-market', icon: '🛒', label: 'Dynamic Marketplace' },
        { id: 'tab-bid', icon: '⚖️', label: 'Bidding Engine' },
        { id: 'tab-voice', icon: '🎙️', label: 'Voice Accessibility' },
        { id: 'tab-admin', icon: '🛡️', label: 'Admin Oversight' }
    ];

    const STEPS = [
        { id: 'step-1', icon: '🌾', label: 'Listing' },
        { id: 'step-2', icon: '🔍', label: 'Discovery' },
        { id: 'step-3', icon: '🤝', label: 'Agreement' },
        { id: 'step-4', icon: '🚚', label: 'Fulfillment' }
    ];

    useEffect(() => {
        const initChart = async () => {
            const { Chart, registerables } = await import('chart.js');
            Chart.register(...registerables);
            
            if (canvasRef.current) {
                if (chartRef.current) {
                    chartRef.current.destroy();
                }

                const ctx = canvasRef.current.getContext('2d');
                
                chartRef.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Traditional Supply Chain', 'Farmer Connect Model'],
                        datasets: [
                            {
                                label: 'Farmer Share',
                                data: [25, 85],
                                backgroundColor: '#16a34a',
                                borderWidth: 0,
                                borderRadius: { topLeft: 0, topRight: 0, bottomLeft: 4, bottomRight: 4 }
                            },
                            {
                                label: 'Middlemen / Platform Fee',
                                data: [60, 5],
                                backgroundColor: '#eab308',
                                borderWidth: 0
                            },
                            {
                                label: 'Retailer / Logistics',
                                data: [15, 10],
                                backgroundColor: '#22c55e',
                                borderWidth: 0,
                                borderRadius: { topLeft: 4, topRight: 4, bottomLeft: 0, bottomRight: 0 }
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        indexAxis: 'y', 
                        scales: {
                            x: {
                                stacked: true,
                                max: 100,
                                ticks: {
                                    callback: function(value) {
                                        return value + '%';
                                    },
                                    font: { family: "'Inter', sans-serif" }
                                },
                                grid: { display: false }
                            },
                            y: {
                                stacked: true,
                                ticks: {
                                    font: { family: "'Inter', sans-serif", weight: 'bold' }
                                },
                                grid: { display: false }
                            }
                        },
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
                                boxPadding: 6,
                                callbacks: {
                                    label: function(context) {
                                        return context.dataset.label + ': ' + context.raw + '% of Retail Price';
                                    }
                                }
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
        };

    }, []);

    const getTabBtnClass = (id) => {
        return `px-6 py-3 rounded-full border border-gray-300 font-semibold transition-all ${
            activeTab === id ? 'bg-green-600 text-white border-green-600 shadow-md' : 'text-gray-800 hover:bg-gray-100 bg-white'
        }`;
    };

    return (
        <div className="antialiased font-sans bg-slate-50 text-gray-800 min-h-screen">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Merriweather:wght@700&display=swap');
                
                h1, h2, h3, h4, .font-serif-custom {
                    font-family: 'Merriweather', serif;
                }

                .chart-container {
                    position: relative;
                    width: 100%;
                    max-width: 800px;
                    margin-left: auto;
                    margin-right: auto;
                    height: 350px;
                    max-height: 400px;
                }

                @media (min-width: 768px) {
                    .chart-container {
                        height: 400px;
                    }
                }

                @keyframes smoothFadeIn {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .view-section {
                    animation: smoothFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }

                .glass-card {
                    background: rgba(255, 255, 255, 0.8);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(0,0,0,0.05);
                }
            `}</style>

            <nav className="sticky top-0 z-50 bg-slate-50/95 backdrop-blur border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex-shrink-0 flex items-center gap-2">
                            <span className="text-2xl">🌾</span>
                            <span className="font-serif-custom font-bold text-xl text-green-600">Farmer Connect</span>
                        </div>
                        <div className="hidden md:flex space-x-8 items-center">
                            <a href="#overview" className="text-gray-600 hover:text-green-600 transition-colors font-medium">Overview</a>
                            <a href="#problem-solution" className="text-gray-600 hover:text-green-600 transition-colors font-medium">The Impact</a>
                            <a href="#modules" className="text-gray-600 hover:text-green-600 transition-colors font-medium">Modules</a>
                            <a href="#journey" className="text-gray-600 hover:text-green-600 transition-colors font-medium">User Journey</a>
                            <a href="#architecture" className="text-gray-600 hover:text-green-600 transition-colors font-medium">Architecture</a>
                            <Link href="/" className="ml-4 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-100 text-gray-800 rounded-lg text-sm font-bold transition-colors">
                                Back Home
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24 mb-20 scroll-smooth">

                <section id="overview" className="pt-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-green-50 text-green-600 text-sm font-bold mb-6 tracking-wide uppercase shadow-sm">
                            Project Report &bull; March 2026
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Digital Agricultural <span className="text-green-600">Marketplace</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed font-sans">
                            A full-stack web platform engineered to bridge the gap between Indian farmers and institutional/retail buyers. Built on the core pillars of <strong>Trust</strong>, <strong>Accessibility</strong>, and <strong>Transparency</strong>.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                            <div className="glass-card p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="text-3xl mb-3">🤝</div>
                                <h3 className="font-bold text-lg mb-2 text-gray-900">Direct Access</h3>
                                <p className="text-sm text-gray-600 font-sans">Connecting verified farmers directly with verified buyers, eliminating unnecessary middlemen.</p>
                            </div>
                            <div className="glass-card p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="text-3xl mb-3">⚖️</div>
                                <h3 className="font-bold text-lg mb-2 text-gray-900">Dynamic Pricing</h3>
                                <p className="text-sm text-gray-600 font-sans">An open bidding module allowing natural market forces to dictate fair crop prices.</p>
                            </div>
                            <div className="glass-card p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="text-3xl mb-3">🎙️</div>
                                <h3 className="font-bold text-lg mb-2 text-gray-900">Voice Accessibility</h3>
                                <p className="text-sm text-gray-600 font-sans">Microphone-enabled AI assistant translating 10 regional languages into navigation commands.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="problem-solution" className="scroll-mt-24 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-green-600 mb-4 font-serif-custom">The Problem vs. Our Solution</h2>
                        <p className="text-gray-600 text-lg max-w-3xl font-sans leading-relaxed">
                            In traditional agricultural supply chains, produce passes through multiple intermediaries. This creates a blind supply chain and severe margin erosion for the creators of the value—the farmers. The chart below illustrates how Farmer Connect digitizes the &quot;Mandi&quot; to redistribute retail value.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-5 space-y-8">
                            <div>
                                <h4 className="font-bold text-xl text-red-700 flex items-center gap-2 mb-4">
                                    <span>📉</span> The Reality Today
                                </h4>
                                <ul className="space-y-4 text-gray-600 font-sans">
                                    <li className="flex items-start gap-3 bg-red-50/50 p-3 rounded-xl">
                                        <span className="text-red-500 mt-1">▪</span>
                                        <span><strong>Eroding Margins:</strong> Farmers take home only 20% to 30% of the final retail price.</span>
                                    </li>
                                    <li className="flex items-start gap-3 bg-red-50/50 p-3 rounded-xl">
                                        <span className="text-red-500 mt-1">▪</span>
                                        <span><strong>Blind Supply Chain:</strong> Buyers rarely know the true market value or origin of produce.</span>
                                    </li>
                                    <li className="flex items-start gap-3 bg-red-50/50 p-3 rounded-xl">
                                        <span className="text-red-500 mt-1">▪</span>
                                        <span><strong>Digital Divide:</strong> Existing tech requires high literacy and operates mostly in English.</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="h-px w-full bg-gray-200 shadow-sm"></div>
                            <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                                <h4 className="font-bold text-xl text-green-600 flex items-center gap-2 mb-3">
                                    <span>📈</span> The Farmer Connect Shift
                                </h4>
                                <p className="text-gray-700 font-sans leading-relaxed">
                                    By facilitating direct trades and leveraging an open bidding system, we compress the supply chain. This transparency guarantees farmers receive the lion&apos;s share of the final retail price while giving buyers complete traceability.
                                </p>
                            </div>
                        </div>
                        
                        <div className="lg:col-span-7 bg-slate-50 p-6 rounded-2xl border border-gray-200 shadow-inner">
                            <h3 className="text-center font-bold text-gray-800 mb-6 font-sans">Revenue Distribution: Traditional vs. Farmer Connect</h3>
                            <div className="chart-container">
                                <canvas id="marginChart" ref={canvasRef}></canvas>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="modules" className="scroll-mt-24">
                    <div className="mb-10 text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-green-600 mb-4 font-serif-custom">Core Modules & Features</h2>
                        <p className="text-gray-600 text-lg font-sans">
                            Explore the functional pillars that make up the Farmer Connect ecosystem. Select a module below to view its specific features, mechanics, and role in the platform.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 mb-8 font-sans">
                        {TABS.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={getTabBtnClass(tab.id)}>
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-gray-100 min-h-[300px] font-sans relative overflow-hidden">
                        
                        {activeTab === 'tab-trust' && (
                            <div className="view-section active">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-3xl shadow-sm border border-green-100">🔐</div>
                                    <h3 className="text-2xl font-bold text-gray-900 font-serif-custom">Building Trust Through Authentication</h3>
                                </div>
                                <p className="text-gray-600 mb-8 text-lg">Because farmers and buyers use the platform very differently, we designed specialized registration flows to ensure security and compliance from day one.</p>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
                                        <h4 className="font-bold text-gray-900 mb-3 font-serif-custom text-lg">Dual Flow Registration</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">Separate schemas: Farmers register using Aadhaar details, while Buyers must provide a verified Business or Tax ID.</p>
                                    </div>
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
                                        <h4 className="font-bold text-gray-900 mb-3 font-serif-custom text-lg">Session Rehydration</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">Automatic background calls seamlessly restore 7-day user sessions without forcing repetitive, frustrating logins.</p>
                                    </div>
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
                                        <h4 className="font-bold text-gray-900 mb-3 font-serif-custom text-lg">Dynamic Trust Scores</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">Users actively build a &quot;Trust Score&quot; by uploading and verifying identity documents securely through the platform.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'tab-market' && (
                            <div className="view-section active">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-3xl shadow-sm border border-green-100">🛒</div>
                                    <h3 className="text-2xl font-bold text-gray-900 font-serif-custom">Creating a Dynamic Marketplace</h3>
                                </div>
                                <p className="text-gray-600 mb-8 text-lg">The marketplace is the heart of Farmer Connect, providing tools for inventory management, discovery, and geospatial tracking.</p>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
                                        <h4 className="font-bold text-gray-900 mb-3 font-serif-custom text-lg">Farmer Dashboard</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">An easy-to-use, intuitive interface allowing farmers to perform full CRUD operations to manage their crop inventory live.</p>
                                    </div>
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
                                        <h4 className="font-bold text-gray-900 mb-3 font-serif-custom text-lg">Advanced Search & Filter</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">Buyers can precisely search for specific crops or filter the market dynamically by category, yield size, and region.</p>
                                    </div>
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
                                        <h4 className="font-bold text-gray-900 mb-3 font-serif-custom text-lg">Geospatial Mapping</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">Integration with React-Leaflet allows buyers to visually see exactly where crops are available across the country on an interactive map.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'tab-bid' && (
                            <div className="view-section active">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-3xl shadow-sm border border-green-100">⚖️</div>
                                    <h3 className="text-2xl font-bold text-gray-900 font-serif-custom">The Bidding and Order Engine</h3>
                                </div>
                                <p className="text-gray-600 mb-6 text-lg">We replaced static, opaque pricing with a dynamic bidding engine and a fully traceable order lifecycle.</p>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
                                        <h4 className="font-bold text-gray-900 mb-3 font-serif-custom text-lg">Open Bidding System</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">Buyers submit competitive financial bids on active crop listings, ensuring farmers get the true market value for their yield.</p>
                                    </div>
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
                                        <h4 className="font-bold text-gray-900 mb-3 font-serif-custom text-lg">Strict Order Lifecycle</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">Complete traceability: Orders transition clearly from Placed to Shipped (farmer action) right up to Final Delivery (buyer action).</p>
                                    </div>
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
                                        <h4 className="font-bold text-gray-900 mb-3 font-serif-custom text-lg">Dispute Resolution</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">A built-in safety net where buyers can report damaged or missing produce, immediately escalating issues to the admin platform.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'tab-voice' && (
                            <div className="view-section active">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-3xl shadow-sm border border-green-100">🎙️</div>
                                    <h3 className="text-2xl font-bold text-gray-900 font-serif-custom">Voice Accessibility & Inclusion</h3>
                                </div>
                                <p className="text-gray-600 mb-6 text-lg">Our proudest feature: destroying the digital literacy barrier by allowing users to navigate the app purely through regional spoken language.</p>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
                                        <h4 className="font-bold text-gray-900 mb-3 font-serif-custom text-lg">Multilingual UI Support</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">Implemented i18next to provide full visual translation across the interface, ensuring comfort for non-English speakers.</p>
                                    </div>
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
                                        <h4 className="font-bold text-gray-900 mb-3 font-serif-custom text-lg">Custom Voice Intent Parser</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">Supports 10 regional Indian languages (Hindi, Tamil, Telugu, Kannada, etc.). The backend processes transcribed speech via the Web Speech API.</p>
                                    </div>
                                    <div className="bg-green-50 p-6 rounded-2xl border border-green-200 md:col-span-2 shadow-inner">
                                        <h4 className="font-bold text-green-700 mb-3 font-serif-custom text-lg flex items-center gap-2"><span>⚡</span> Actionable Intent Matching</h4>
                                        <p className="text-gray-700 leading-relaxed">A user taps the microphone and speaks. The system identifies key intents (e.g., recognizing the word &quot;बाज़ार&quot; / &quot;Market&quot;) and automatically executes the frontend routing instruction.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'tab-admin' && (
                            <div className="view-section active">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-3xl shadow-sm border border-green-100">🛡️</div>
                                    <h3 className="text-2xl font-bold text-gray-900 font-serif-custom">Administrative Oversight</h3>
                                </div>
                                <p className="text-gray-600 mb-6 text-lg">To keep the platform safe, compliant, and running smoothly, we built an exclusive, highly-privileged admin dashboard.</p>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
                                        <h4 className="font-bold text-gray-900 mb-3 font-serif-custom text-lg">Identity Verification</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">Moderation teams manually review and verify uploaded Aadhaar, Tax, and Business documents to approve new accounts.</p>
                                    </div>
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
                                        <h4 className="font-bold text-gray-900 mb-3 font-serif-custom text-lg">Dispute Management</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">Admins have specialized tools to review evidence, communicate with both parties, and resolve active buyer complaints fairly.</p>
                                    </div>
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
                                        <h4 className="font-bold text-gray-900 mb-3 font-serif-custom text-lg">Aggregate Analytics</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">Real-time monitoring of site-wide statistics, transaction volumes, and user growth to inform business strategy.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </section>

                <section id="journey" className="scroll-mt-24 bg-green-50/50 p-8 md:p-12 rounded-3xl border border-green-600/10 shadow-sm">
                    <div className="mb-12 text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-green-600 mb-4 font-serif-custom">User Journey: Lifecycle of a Crop</h2>
                        <p className="text-gray-600 text-lg font-sans">
                            See how the modules come together. Click through the steps below to experience the platform from the initial listing to the final delivery.
                        </p>
                    </div>

                    {/* Stepper Navigation */}
                    <div className="relative flex justify-between items-center mb-12 max-w-4xl mx-auto font-sans">
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 z-0 rounded-full"></div>
                        
                        {STEPS.map((step, index) => (
                            <button key={step.id} onClick={() => setActiveStep(index)} className="relative z-10 flex flex-col items-center group focus:outline-none">
                                <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-bold mb-2 transition-all duration-300 shadow-sm ${
                                    index <= activeStep ? 'bg-green-600 border-green-600 text-white' : 'bg-white border-gray-300 text-gray-500'
                                } ${index === activeStep ? 'scale-110 shadow-md' : 'scale-100'}`}>
                                    {index + 1}
                                </div>
                                <span className={`text-sm md:text-base transition-colors ${
                                    index === activeStep ? 'text-green-600 font-bold' : 'text-gray-500 font-medium'
                                }`}>
                                    {step.label}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Stepper Content */}
                    <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 max-w-4xl mx-auto min-h-[250px] font-sans flex items-center">
                        
                        {activeStep === 0 && (
                            <div className="view-section w-full flex flex-col md:flex-row gap-8 items-center">
                                <div className="text-6xl bg-slate-50 p-6 rounded-full border border-gray-200 shadow-inner">🌾</div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3 font-serif-custom">1. The Farmer Lists the Crop</h3>
                                    <p className="text-gray-600 mb-4 leading-relaxed text-lg">
                                        A verified farmer opens the app and uses the <strong>Voice Agent</strong>. Speaking in Marathi, they say, <em className="text-gray-800 font-medium">&quot;List 50 quintals of wheat.&quot;</em> The NLP engine parses this, automatically filling out the listing form. The farmer uploads a quick photo and sets a base minimum price.
                                    </p>
                                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 bg-green-50 px-4 py-1.5 rounded-full border border-green-200">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                        <span>Status:</span> <span className="text-gray-800">Active Listing</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeStep === 1 && (
                            <div className="view-section w-full flex flex-col md:flex-row gap-8 items-center">
                                <div className="text-6xl bg-slate-50 p-6 rounded-full border border-gray-200 shadow-inner">🔍</div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3 font-serif-custom">2. Buyers Discover and Bid</h3>
                                    <p className="text-gray-600 mb-4 leading-relaxed text-lg">
                                        A wholesale buyer logs into the web dashboard. Using the <strong>Geospatial Map</strong>, they search for wheat within a 100km radius. They find the farmer&apos;s listing, review their high &quot;Trust Score&quot;, and place a competitive financial bid above the base price.
                                    </p>
                                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-yellow-700 bg-yellow-50 px-4 py-1.5 rounded-full border border-yellow-200">
                                        <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                                        <span>Status:</span> <span className="text-gray-800">Bid Placed</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeStep === 2 && (
                            <div className="view-section w-full flex flex-col md:flex-row gap-8 items-center">
                                <div className="text-6xl bg-slate-50 p-6 rounded-full border border-gray-200 shadow-inner">🤝</div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3 font-serif-custom">3. Mutual Agreement</h3>
                                    <p className="text-gray-600 mb-4 leading-relaxed text-lg">
                                        The farmer receives an SMS alert regarding the new bid. They open the app, review the buyer&apos;s profile and price, and tap &quot;Accept&quot;. The platform&apos;s <strong>Order Engine</strong> locks the transaction, generates an invoice, and updates the database to prevent double-selling.
                                    </p>
                                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200">
                                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                                        <span>Status:</span> <span className="text-gray-800">Order Confirmed</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeStep === 3 && (
                            <div className="view-section w-full flex flex-col md:flex-row gap-8 items-center">
                                <div className="text-6xl bg-slate-50 p-6 rounded-full border border-gray-200 shadow-inner">🚚</div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3 font-serif-custom">4. Fulfillment and Payment</h3>
                                    <p className="text-gray-600 mb-4 leading-relaxed text-lg">
                                        The farmer ships the produce. Upon arrival, the buyer inspects the wheat and marks the order as &quot;Delivered&quot; on the platform. The funds are released securely. If there are issues, the buyer can flag them to trigger the <strong>Dispute Resolution</strong> protocol.
                                    </p>
                                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 bg-green-50 px-4 py-1.5 rounded-full border border-green-200">
                                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                        <span>Status:</span> <span className="text-gray-800">Delivered & Settled</span>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </section>

                <section id="architecture" className="scroll-mt-24">
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-green-600 mb-4 font-serif-custom">Architecture & Deployment Strategy</h2>
                        <p className="text-gray-600 text-lg max-w-3xl font-sans leading-relaxed">
                            To support a reliable and scalable platform handling financial transactions and personal IDs, we opted for a modern, decoupled Client-Server architecture focused on security, speed, and ACID compliance.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 font-sans">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-blue-500 hover:shadow-md transition-shadow">
                            <div className="text-2xl mb-4">🖥️</div>
                            <h3 className="font-bold text-gray-900 text-lg mb-4 font-serif-custom">Frontend (Client)</h3>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-slate-100 text-gray-700 text-xs rounded-md font-mono font-medium border border-slate-200">Next.js 16 (App)</span>
                                <span className="px-3 py-1 bg-slate-100 text-gray-700 text-xs rounded-md font-mono font-medium border border-slate-200">React 19</span>
                                <span className="px-3 py-1 bg-slate-100 text-gray-700 text-xs rounded-md font-mono font-medium border border-slate-200">Redux Toolkit</span>
                                <span className="px-3 py-1 bg-slate-100 text-gray-700 text-xs rounded-md font-mono font-medium border border-slate-200">TailwindCSS</span>
                            </div>
                        </div>
                        
                        <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-green-500 hover:shadow-md transition-shadow">
                            <div className="text-2xl mb-4">⚙️</div>
                            <h3 className="font-bold text-gray-900 text-lg mb-4 font-serif-custom">Backend (API)</h3>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-slate-100 text-gray-700 text-xs rounded-md font-mono font-medium border border-slate-200">Node.js</span>
                                <span className="px-3 py-1 bg-slate-100 text-gray-700 text-xs rounded-md font-mono font-medium border border-slate-200">Express.js</span>
                                <span className="px-3 py-1 bg-slate-100 text-gray-700 text-xs rounded-md font-mono font-medium border border-slate-200">Validations</span>
                                <span className="px-3 py-1 bg-slate-100 text-gray-700 text-xs rounded-md font-mono font-medium border border-slate-200">JWT / Auth</span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-purple-500 hover:shadow-md transition-shadow">
                            <div className="text-2xl mb-4">🗄️</div>
                            <h3 className="font-bold text-gray-900 text-lg mb-4 font-serif-custom">Database</h3>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-slate-100 text-gray-700 text-xs rounded-md font-mono font-medium border border-slate-200">PostgreSQL</span>
                                <span className="px-3 py-1 bg-slate-100 text-gray-700 text-xs rounded-md font-mono font-medium border border-slate-200">Neon DB</span>
                                <span className="px-3 py-1 bg-slate-100 text-gray-700 text-xs rounded-md font-mono font-medium border border-slate-200">Prisma</span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-orange-500 hover:shadow-md transition-shadow">
                            <div className="text-2xl mb-4">🚀</div>
                            <h3 className="font-bold text-gray-900 text-lg mb-4 font-serif-custom">DevOps</h3>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-slate-100 text-gray-700 text-xs rounded-md font-mono font-medium border border-slate-200">Git / GitHub</span>
                                <span className="px-3 py-1 bg-slate-100 text-gray-700 text-xs rounded-md font-mono font-medium border border-slate-200">Vercel</span>
                                <span className="px-3 py-1 bg-slate-100 text-gray-700 text-xs rounded-md font-mono font-medium border border-slate-200">OpenAPI</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-gray-100 font-sans">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3 font-serif-custom">
                            <span className="text-3xl">📋</span> Data Model Schema Overview
                        </h3>
                        <p className="text-gray-600 mb-8 max-w-4xl leading-relaxed text-lg">
                            We designed a highly normalized PostgreSQL schema to manage the complex relationships between our users, the crops they sell, and the financial transactions between them. Below are the primary entities in the database.
                        </p>

                        <div className="overflow-x-auto rounded-xl border border-gray-200">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 text-gray-800 border-b-2 border-green-600">
                                        <th className="p-5 font-bold w-1/4 uppercase tracking-wider text-xs">Table Name</th>
                                        <th className="p-5 font-bold uppercase tracking-wider text-xs">Role & Description</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-gray-600">
                                    <tr className="hover:bg-green-50/50 transition-colors">
                                        <td className="p-5 font-mono font-bold text-green-700">users</td>
                                        <td className="p-5 leading-relaxed">The core table for all accounts. Tracks user type (farmer/buyer), current approval status, and overall trust score.</td>
                                    </tr>
                                    <tr className="hover:bg-green-50/50 transition-colors">
                                        <td className="p-5 font-mono font-bold text-green-700">user_locations</td>
                                        <td className="p-5 leading-relaxed">Stores geospatial data, linking a user to their specific state, district, and exact coordinates.</td>
                                    </tr>
                                    <tr className="hover:bg-green-50/50 transition-colors">
                                        <td className="p-5 font-mono font-bold text-green-700">listings</td>
                                        <td className="p-5 leading-relaxed">The actual marketplace items. Tied directly to the farmer who posted them. Includes crop type, pricing, and availability status.</td>
                                    </tr>
                                    <tr className="hover:bg-green-50/50 transition-colors">
                                        <td className="p-5 font-mono font-bold text-green-700">bids</td>
                                        <td className="p-5 leading-relaxed">Records every financial offer made, linking a specific buyer&apos;s proposed financial amount to a specific crop listing.</td>
                                    </tr>
                                    <tr className="hover:bg-green-50/50 transition-colors">
                                        <td className="p-5 font-mono font-bold text-green-700">orders</td>
                                        <td className="p-5 leading-relaxed">Captures the finalized transaction. Includes delivery details, payment methods, a JSON array of listed items, and live status updates.</td>
                                    </tr>
                                    <tr className="hover:bg-green-50/50 transition-colors">
                                        <td className="p-5 font-mono font-bold text-green-700">complaints</td>
                                        <td className="p-5 leading-relaxed">Links an order and a user to a specific issue description, allowing admins to track dispute resolution statuses.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
                
                <footer className="text-center py-12 border-t border-gray-200 mt-12">
                    <p className="text-gray-500 font-serif-custom text-sm max-w-lg mx-auto leading-relaxed">
                        &quot;Laying the groundwork for a fairer, more transparent, and highly accessible ecosystem for Indian agriculture.&quot;
                    </p>
                    <p className="text-green-600 font-bold text-xs mt-6 uppercase tracking-widest font-sans">Farmer Connect Platform</p>
                </footer>

            </main>
        </div>
    );
}
