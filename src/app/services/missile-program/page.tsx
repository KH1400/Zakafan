"use client";

import React from 'react';

// The full HTML content provided by the user.
const infographicHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Infographic: Analysis of Operation True Promise III</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&family=Orbitron:wght@700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        body {
            font-family: 'Roboto', sans-serif;
            background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
            background-size: 400% 400%;
            animation: gradient-animation 20s ease infinite;
            color: #d1d5db;
        }
        @keyframes gradient-animation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .orbitron {
            font-family: 'Orbitron', sans-serif;
        }
        .card {
            background-color: rgba(27, 38, 59, 0.6);
            backdrop-filter: blur(10px);
            border: 1px solid #2B3B7A;
        }
        .text-glow {
            text-shadow: 0 0 8px #00FFFF;
        }
        .chart-container {
            position: relative;
            width: 100%;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
            height: 300px;
            max-height: 350px;
        }
        @media (min-width: 768px) {
            .chart-container {
                height: 350px;
                max-height: 400px;
            }
        }
        .flowchart-item {
            border: 1px solid #00FFFF;
            background-color: rgba(30, 0, 60, 0.6);
        }
        .flowchart-connector {
            flex-grow: 1;
            height: 2px;
            background: linear-gradient(to right, #00FFFF, #415A77);
            opacity: 0.6;
            min-width: 2rem;
        }
        .flowchart-connector-vertical {
            width: 2px;
            height: 2rem;
            background: linear-gradient(to bottom, #00FFFF, #415A77);
            opacity: 0.6;
        }
        .loading-spinner {
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid #00FFFF;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            animation: spin 1s linear infinite;
            display: inline-block;
            vertical-align: middle;
            margin-left: 8px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body class="bg-[#0D1B2A]">

    <div class="container mx-auto p-4 md:p-8">

        <header class="text-center mb-16">
            <h1 class="text-4xl md:text-6xl font-black orbitron text-[#FFA500] text-glow mb-4">OPERATION TRUE PROMISE III</h1>
            <p class="text-lg md:text-xl max-w-3xl mx-auto text-[#d1d5db]/80">An Infographic Analysis of Iran's Evolving Missile and Drone Capabilities</p>
        </header>

        <main class="space-y-16">

            <section id="kpis" class="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div class="card rounded-lg p-6 border border-[#2B3B7A]/30">
                    <p class="text-5xl md:text-6xl font-bold orbitron text-[#00FFFF] text-glow">>150</p>
                    <p class="mt-2 text-lg text-[#d1d5db]/80">Ballistic Missiles Launched</p>
                </div>
                <div class="card rounded-lg p-6 border border-[#2B3B7A]/30">
                    <p class="text-5xl md:text-6xl font-bold orbitron text-[#00FFFF] text-glow">>320</p>
                    <p class="mt-2 text-lg text-[#d1d5db]/80">Drones Deployed</p>
                </div>
                <div class="card rounded-lg p-6 border border-[#2B3B7A]/30">
                    <p class="text-5xl md:text-6xl font-bold orbitron text-[#00FFFF] text-glow">42%</p>
                    <p class="mt-2 text-lg text-[#d1d5db]/80">Launches with Decoy Warheads</p>
                </div>
            </section>

            <section id="doctrine" class="card rounded-lg p-8 border border-[#6A0DAD]/30">
                <h2 class="text-3xl font-bold mb-4 text-center orbitron text-[#FFA500] text-glow">The Asymmetric Doctrine</h2>
                <p class="text-center max-w-4xl mx-auto text-[#d1d5db]/90">
                    Iran's military strategy is shaped by decades of sanctions and conventional inferiority. Unable to modernize its air force, Iran has mastered asymmetric warfare, focusing on a cost-effective yet potent arsenal of missiles and drones. This allows Iran to project power, deter technologically superior adversaries, and maintain strategic leverage in the Middle East.
                </p>
            </section>
            
            <section id="ballistic" class="card rounded-lg p-8 border border-[#6A0DAD]/30">
                <h2 class="text-3xl font-bold mb-4 text-center orbitron text-[#FFA500] text-glow">Ballistic Arsenal: A Leap in Capability</h2>
                <p class="text-center max-w-4xl mx-auto text-[#d1d5db]/90 mb-8">
                    Operation True Promise III showcased Iran's shift from older systems to a new generation of ballistic missiles. These advanced weapons feature enhanced speed, precision, and evasive maneuvering, posing a significant challenge to multi-layered air defense systems.
                </p>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div class="chart-container">
                        <canvas id="ballisticComparisonChart"></canvas>
                    </div>
                    <div class="space-y-4 text-sm">
                        <div class="bg-black/20 p-4 rounded-lg border-l-4 border-[#00FFFF]">
                            <h3 class="font-bold text-lg text-[#00FFFF]">Qassem Basir</h3>
                            <p>An improved Haj Qassem variant with a sub-1-meter CEP. Its electro-optical seeker makes it GPS-independent and highly resistant to electronic warfare. A 22% lower radar cross-section and MaRV technology allow it to evade advanced defense systems.</p>
                        </div>
                        <div class="bg-black/20 p-4 rounded-lg border-l-4 border-[#FFA500]">
                            <h3 class="font-bold text-lg text-[#FFA500]">Haj Qassem</h3>
                            <p>A solid-fueled MRBM reaching Mach 12 on re-entry. Its combination of speed and radar-evasive features overwhelmed defenses in the June 2025 attacks, achieving a lower interception rate than older models.</p>
                        </div>
                        <div class="bg-black/20 p-4 rounded-lg border-l-4 border-[#6A0DAD]">
                            <h3 class="font-bold text-lg text-[#9C27B0]">Kheibar Shekan</h3>
                            <p>A solid-propellant MRBM with a MaRV designed to evade missile defenses. Its blast effect is estimated to be 20% greater than other MRBMs used by Iran, though its high cost limits production.</p>
                        </div>
                    </div>
                </div>
                <button id="analyzeBallisticTactics" class="mt-6 w-full bg-[#2B3B7A] hover:bg-[#415A77] text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center">
                    Tactical Analysis of Advanced Ballistic Missiles ✨
                    <span class="loading-spinner hidden" id="loadingBallisticTactics"></span>
                </button>
                <div id="ballisticTacticsInsight" class="mt-4 p-4 bg-gray-800 rounded-lg border border-[#00FFFF]/50 text-gray-300 hidden"></div>
            </section>

            <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <section id="drones" class="lg:col-span-3 card rounded-lg p-8 border border-[#2B3B7A]/30">
                    <h2 class="text-3xl font-bold mb-4 text-center orbitron text-[#FFA500] text-glow">Drone Swarms: The Saturation Strategy</h2>
                    <p class="text-center max-w-4xl mx-auto text-[#d1d5db]/90 mb-8">
                        Iran uses a cost-effective drone strategy focused on overwhelming defenses. Slower, cheaper drones like the Shahed-136 are launched in swarms to saturate and divert interceptors, paving the way for more valuable missile strikes. The June 2025 attacks featured the faster, jet-propelled Shahed-238, demonstrating an evolution of this tactic.
                    </p>
                    <div class="chart-container h-64 md:h-80">
                         <canvas id="droneEffectivenessChart"></canvas>
                    </div>
                    <button id="analyzeDroneCostEffectiveness" class="mt-6 w-full bg-[#2B3B7A] hover:bg-[#415A77] text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center">
                        Economic Impact of Drone Swarms ✨
                        <span class="loading-spinner hidden" id="loadingDroneCostEffectiveness"></span>
                    </button>
                    <div id="droneCostEffectivenessInsight" class="mt-4 p-4 bg-gray-800 rounded-lg border border-[#00FFFF]/50 text-gray-300 hidden"></div>
                </section>
                <section id="cruise" class="lg:col-span-2 card rounded-lg p-8 flex flex-col justify-center border border-[#6A0DAD]/30">
                     <h2 class="text-3xl font-bold mb-4 text-center orbitron text-[#FFA500] text-glow">Paveh Cruise Missile</h2>
                     <p class="text-center max-w-4xl mx-auto text-[#d1d5db]/90 mb-6">
                        This long-range cruise missile adds another layer of complexity, capable of low-altitude flight and mid-mission retargeting.
                    </p>
                    <div class="text-center my-auto">
                        <p class="text-7xl font-black orbitron text-[#00FFFF] text-glow">71%</p>
                        <p class="mt-2 text-lg max-w-xs mx-auto text-[#d1d5db]/80">Success rate in evading the Iron Dome's 4km altitude limit during test scenarios.</p>
                    </div>
                </section>
            </div>
            
            <section id="evolution" class="card rounded-lg p-8 border border-[#FFA500]/30">
                <h2 class="text-3xl font-bold mb-8 text-center orbitron text-[#FFA500] text-glow">Tactical Evolution</h2>
                <div class="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                    <div class="flowchart-item p-4 rounded-lg text-center max-w-sm">
                        <h3 class="font-bold text-xl orbitron text-[#d1d5db]">Promise I: Saturation</h3>
                        <p class="text-sm text-[#d1d5db]/80 mt-2">Relied on massive waves of older drones and missiles to overwhelm defenses through sheer volume.</p>
                    </div>
                    <div class="flowchart-connector-vertical md:hidden mx-auto"></div>
                    <div class="flowchart-connector hidden md:block"></div>
                    <div class="flowchart-item p-4 rounded-lg text-center max-w-sm">
                        <h3 class="font-bold text-xl orbitron text-[#d1d5db]">Hybrid Tactics</h3>
                        <p class="text-sm text-[#d1d5db]/80 mt-2">Combined drone swarms with cruise missiles to create breaches in air defense layers for follow-on attacks.</p>
                    </div>
                    <div class="flowchart-connector-vertical md:hidden mx-auto"></div>
                    <div class="flowchart-connector hidden md:block"></div>
                    <div class="flowchart-item p-4 rounded-lg text-center max-w-sm">
                        <h3 class="font-bold text-xl orbitron text-[#d1d5db]">Promise III: Precision & Evasion</h3>
                        <p class="text-sm text-[#d1d5db]/80 mt-2">Deployed hypersonic and maneuverable missiles with decoy warheads to strike key infrastructure with high accuracy.</p>
                    </div>
                </div>
            </section>

             <section id="defense_challenge" class="card rounded-lg p-8 border border-[#2B3B7A]/30">
                <h2 class="text-3xl font-bold mb-8 text-center orbitron text-[#FFA500] text-glow">The Air Defense Challenge</h2>
                 <p class="text-center max-w-4xl mx-auto text-[#d1d5db]/90 mb-8">
                    While Israel's multi-layered defense, supported by allies, maintains high interception rates, Iran's strategy creates a significant economic and logistical challenge. The cost of advanced interceptors far exceeds the cost of the offensive munitions, creating an unsustainable attrition model for defenders in a prolonged conflict.
                </p>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                     <div class="w-full">
                        <h3 class="text-xl font-bold text-center mb-4 text-[#d1d5db]">Cost Asymmetry: Offense vs. Defense</h3>
                        <div class="chart-container h-48">
                            <canvas id="costComparisonChart"></canvas>
                        </div>
                    </div>
                    <div class="w-full">
                         <h3 class="text-xl font-bold text-center mb-4 text-[#d1d5db]">Interception Rate vs. Advanced Missiles</h3>
                         <div class="chart-container h-64">
                            <canvas id="interceptionRateChart"></canvas>
                        </div>
                    </div>
                </div>
                <button id="analyzeFutureThreats" class="mt-6 w-full bg-[#2B3B7A] hover:bg-[#415A77] text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center">
                    Future Air Defense Scenarios ✨
                    <span class="loading-spinner hidden" id="loadingFutureThreats"></span>
                </button>
                <div id="futureThreatsInsight" class="mt-4 p-4 bg-gray-800 rounded-lg border border-[#00FFFF]/50 text-gray-300 hidden"></div>
            </section>

        </main>
    </div>

    <script>
        const vibrantPalette = {
            logoOrange: '#FFA500',
            logoDarkBlue: '#2B3B7A',
            vibrantCyan: '#00FFFF',
            accentPurple: '#6A0DAD',
            errorRed: '#FF3366',
            successGreen: '#00FF99',
            darkBackground: '#0f0c29',
            mediumBackground: '#302b63',
            lightBackground: '#24243e',
            textColor: '#d1d5db'
        };

        const globalChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: vibrantPalette.textColor,
                        font: { family: "'Roboto', sans-serif", size: 12 }
                    }
                },
                tooltip: {
                    titleFont: { family: "'Roboto', sans-serif", weight: 'bold' },
                    bodyFont: { family: "'Roboto', sans-serif" },
                    backgroundColor: 'rgba(27, 38, 59, 0.9)',
                    borderColor: vibrantPalette.logoDarkBlue,
                    borderWidth: 1,
                    padding: 10,
                    callbacks: {
                        title: function(tooltipItems) {
                            const item = tooltipItems[0];
                            let label = item.chart.data.labels[item.dataIndex];
                            if (Array.isArray(label)) {
                                return label.join(' ');
                            }
                            return label;
                        }
                    }
                },
                datalabels: {
                    color: '#ffffff',
                    font: { family: "'Orbitron', sans-serif", weight: 'bold', size: 16 },
                }
            },
        };

        Chart.register(ChartDataLabels);

        const ballisticCtx = document.getElementById('ballisticComparisonChart').getContext('2d');
        new Chart(ballisticCtx, {
            type: 'radar',
            data: {
                labels: ['Range', 'Speed', 'Evasion', 'Precision', 'Payload'],
                datasets: [{
                    label: 'Qassem Basir',
                    data: [8, 11, 9, 10, 8],
                    borderColor: vibrantPalette.vibrantCyan,
                    backgroundColor: 'rgba(0, 255, 255, 0.2)',
                    pointBackgroundColor: vibrantPalette.vibrantCyan,
                }, {
                    label: 'Haj Qassem',
                    data: [9, 12, 7, 7, 8],
                    backgroundColor: 'rgba(255, 165, 0, 0.2)',
                    borderColor: vibrantPalette.logoOrange,
                    pointBackgroundColor: vibrantPalette.logoOrange,
                }, {
                    label: 'Kheibar Shekan',
                    data: [9.5, 9, 8, 8, 9],
                    borderColor: vibrantPalette.accentPurple,
                    backgroundColor: 'rgba(106, 13, 173, 0.2)',
                    pointBackgroundColor: vibrantPalette.accentPurple,
                }]
            },
            options: {
                ...globalChartOptions,
                plugins: { ...globalChartOptions.plugins, datalabels: { display: false } },
                scales: {
                    r: {
                        angleLines: { color: 'rgba(224, 225, 221, 0.2)' },
                        grid: { color: 'rgba(224, 225, 221, 0.2)' },
                        pointLabels: { color: vibrantPalette.textColor, font: { size: 14, family: "'Orbitron', sans-serif" } },
                        ticks: {
                            backdropColor: 'rgba(0,0,0,0.5)',
                            color: vibrantPalette.textColor,
                            stepSize: 2,
                            font: { size: 14, family: "'Orbitron', sans-serif" }
                        },
                        suggestedMin: 0,
                        suggestedMax: 12,
                    }
                }
             }
        });

        const droneCtx = document.getElementById('droneEffectivenessChart').getContext('2d');
        new Chart(droneCtx, {
            type: 'bar',
            data: {
                labels: ['Shahed-238 Drones (June 2025)'],
                datasets: [{
                    label: 'Penetrated',
                    data: [38],
                    backgroundColor: vibrantPalette.errorRed,
                    borderColor: vibrantPalette.logoDarkBlue,
                    borderWidth: 2
                }, {
                    label: 'Intercepted',
                    data: [62],
                    backgroundColor: vibrantPalette.vibrantCyan,
                    borderColor: vibrantPalette.logoDarkBlue,
                    borderWidth: 2
                }]
            },
            options: {
                indexAxis: 'y',
                ...globalChartOptions,
                scales: {
                    x: {
                        stacked: true,
                        ticks: {
                            callback: value => value + '%',
                            color: vibrantPalette.textColor,
                            font: { size: 16, family: "'Orbitron', sans-serif" }
                        },
                        grid: { color: 'rgba(0, 255, 255, 0.1)' }
                    },
                    y: {
                        stacked: true,
                        grid: { display: false },
                        ticks: { color: vibrantPalette.textColor, font: { size: 16, family: "'Orbitron', sans-serif" } }
                    }
                },
                plugins: {
                    ...globalChartOptions.plugins,
                    datalabels: {
                        formatter: (value, context) => {
                             return value > 10 ? value + '%' : '';
                        },
                        color: '#ffffff',
                        font: { family: "'Orbitron', sans-serif", weight: 'bold', size: 18 },
                    }
                }
            }
        });

        const costCtx = document.getElementById('costComparisonChart').getContext('2d');
        new Chart(costCtx, {
            type: 'bar',
            data: {
                labels: ['Offensive Munition (Avg.)', 'Defensive Interceptor (Avg.)'],
                datasets: [{
                    label: 'Estimated Cost (USD)',
                    data: [110000, 2000000],
                    backgroundColor: [vibrantPalette.errorRed, vibrantPalette.vibrantCyan],
                    borderWidth: 0,
                    borderRadius: 5,
                }]
            },
            options: {
                indexAxis: 'y',
                ...globalChartOptions,
                scales: {
                    x: {
                        ticks: {
                             callback: function(value) {
                                if (value >= 1000000) return '$' + (value / 1000000) + 'M';
                                if (value >= 1000) return '$' + (value / 1000) + 'K';
                                return '$' + value;
                            },
                            color: vibrantPalette.textColor,
                            font: { size: 16, family: "'Orbitron', sans-serif" }
                        },
                         grid: { color: 'rgba(0, 255, 255, 0.1)' }
                    },
                    y: {
                        grid: { display: false },
                        ticks: { color: vibrantPalette.textColor, font: { size: 16, family: "'Orbitron', sans-serif" } }
                    }
                },
                 plugins: {
                    ...globalChartOptions.plugins,
                    legend: { display: false },
                     datalabels: {
                        anchor: 'end',
                        align: 'end',
                        offset: 4,
                        formatter: (value, context) => {
                             if (value >= 1000000) return '$' + (value / 1000000).toFixed(1) + 'M';
                             return '$' + (value / 1000) + 'K';
                        },
                        color: '#ffffff',
                        font: { family: "'Orbitron', sans-serif", weight: 'bold', size: 18 },
                    }
                }
            }
        });

        const interceptionCtx = document.getElementById('interceptionRateChart').getContext('2d');
        new Chart(interceptionCtx, {
            type: 'doughnut',
            data: {
                labels: ['Penetrated (Haj Qassem)', 'Intercepted (Arrow-3)', 'Intercepted (Iron Dome)'],
                datasets: [{
                    label: 'Effectiveness vs. Haj Qassem',
                    data: [30, 40, 30],
                    backgroundColor: [vibrantPalette.errorRed, vibrantPalette.vibrantCyan, vibrantPalette.successGreen],
                    borderColor: vibrantPalette.logoDarkBlue,
                    borderWidth: 5,
                    hoverOffset: 4
                }]
            },
            options: {
                ...globalChartOptions,
                cutout: '60%',
                plugins: {
                     ...globalChartOptions.plugins,
                     legend: { position: 'bottom' },
                     datalabels: {
                        formatter: (value, context) => {
                            return value + '%';
                        },
                        color: '#ffffff',
                        font: { family: "'Orbitron', sans-serif", weight: 'bold', size: 18 },
                    }
                }
            }
        });

        async function getLLMResponse(prompt, targetElementId, loadingSpinnerId) {
            const targetElement = document.getElementById(targetElementId);
            const loadingSpinner = document.getElementById(loadingSpinnerId);
            const buttonElement = document.querySelector(\`button[id="\${loadingSpinnerId.replace('loading', '')}"]\`);
            
            if (buttonElement) {
                let spinner = document.createElement('span');
                spinner.className = 'loading-spinner';
                loadingSpinner.classList.remove('hidden');
                buttonElement.disabled = true;
            }

            targetElement.textContent = '';
            targetElement.classList.add('hidden');

            try {
                // NOTE: The API key is intentionally left blank for security.
                // This feature will show a placeholder message.
                targetElement.textContent = 'AI analysis feature is currently disabled for security reasons.';
                targetElement.classList.remove('hidden');

            } catch (error) {
                targetElement.textContent = 'Error: Failed to connect to AI server. Please check your internet connection.';
                targetElement.classList.remove('hidden');
                console.error("Error fetching LLM response:", error);
            } finally {
                if (buttonElement) {
                    loadingSpinner.classList.add('hidden');
                    buttonElement.disabled = false;
                }
            }
        }

        // --- Event Listeners ---
        document.getElementById('analyzeBallisticTactics').addEventListener('click', () => {
            const prompt = "Based on the characteristics of Qassem Basir (upgraded), Haj Qassem, and Kheibar Shekan missiles used in Operation True Promise III, briefly analyze the main tactical advantages of each and how they impact enemy air defense capabilities. Keep the response to a maximum of 700 characters.";
            getLLMResponse(prompt, 'ballisticTacticsInsight', 'loadingBallisticTactics');
        });

        document.getElementById('analyzeDroneCostEffectiveness').addEventListener('click', () => {
            const prompt = "Considering the data from Operation True Promise III and the 38% penetration rate of Shahed-238 drones which caused $8 million in damage, provide a brief analysis of Iran's drone swarm saturation strategy and its cost-asymmetry against expensive air defense. Keep the response to a maximum of 600 characters.";
            getLLMResponse(prompt, 'droneCostEffectivenessInsight', 'loadingDroneCostEffectiveness');
        });

        document.getElementById('analyzeFutureThreats').addEventListener('click', () => {
            const prompt = "Given Iran's recent tactical evolution from saturation to precision and evasion, and information from Operation True Promise III, predict the main challenges for regional air defense in the next 5 years and potential new Iranian technologies or tactics. Keep the response to a maximum of 800 characters.";
            getLLMResponse(prompt, 'futureThreatsInsight', 'loadingFutureThreats');
        });

    </script>
</body>
</html>
`;


/**
 * Renders a self-contained infographic HTML page within an iframe.
 * This approach isolates the infographic's styles and scripts (like CDN Tailwind and Chart.js)
 * from the main Next.js application, preventing conflicts.
 */
export default function MissileProgramInfographicPage() {
  return (
    <div className="w-full h-screen">
      <iframe
        srcDoc={infographicHtml}
        title="Infographic: Analysis of Operation True Promise III"
        className="w-full h-full border-0"
      />
    </div>
  );
}
