export type Language = 'fa' | 'en' | 'ar' | 'he';

export type MosaicPanel = {
    title: string;
    image: string;
    imageHint: string;
    gridArea: string;
};

export type Dyno = {
    id: string;
    slug: string;
    title: Record<Language, string>;
    description: Record<Language, string>;
    image: string;
    imageHint: string;
    htmlFile: string,
    pdfFile: string,
    infoFile: string,
    images: string[],
    textimages: string[],
    summaries: Summary[],
    html: string,
    size: number,
    categories: DynoCategory[],
    createdAt: string,
}

export type DynoCategory = {
    id: number;
    title: Record<Language, string>;
    description: Record<Language, string>;
    href: string;
    icon: string,
    image: string,
    imageHint: string
}

export type Summary = {
    id: number;
    content: string;
    createdAt: string;
}

export type MosaicPanelData = {
    title: Record<Language, string>;
    slug: string;
    image: string;
    imageHint: string;
    size: number;
    categories: number[];
};

const html = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>اینفوگرافیک: تحلیل شبهات و واقعیت‌های جنگ ایران و اسرائیل (نسخه هوشمند)</title>
    
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        body {
            font-family: 'Vazirmatn', sans-serif;
            background-color: #F2F2F2;
        }
        .chart-container {
            position: relative;
            width: 100%;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            height: 300px;
            max-height: 400px;
        }
        @media (min-width: 768px) {
            .chart-container {
                height: 350px;
            }
        }
        .timeline {
            position: relative;
            padding: 2rem 0;
        }
        .timeline::before {
            content: '';
            position: absolute;
            top: 0;
            right: 50%;
            transform: translateX(50%);
            width: 4px;
            height: 100%;
            background-color: #00A6ED;
        }
        .timeline-item {
            position: relative;
            width: 50%;
            padding: 1rem 2rem;
            box-sizing: border-box;
        }
        .timeline-item:nth-child(odd) {
            left: 50%;
            padding-left: 2rem;
            padding-right: 2rem;
            text-align: left;
        }
        .timeline-item:nth-child(even) {
            left: 0;
            padding-left: 2rem;
            padding-right: 2rem;
            text-align: right;
        }
        .timeline-content {
            padding: 1rem;
            background-color: white;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        }
         .timeline-item::after {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            background-color: white;
            border: 4px solid #FFC107;
            border-radius: 50%;
            top: 50%;
            transform: translateY(-50%);
            z-index: 1;
        }
        .timeline-item:nth-child(odd)::after {
            left: -10px;
        }
        .timeline-item:nth-child(even)::after {
            right: -10px;
        }
        .flowchart-item {
            border-right: 4px solid #FFC107;
            padding-right: 1.5rem;
            position: relative;
        }
        .flowchart-item::after {
            content: '◄';
            color: #FFC107;
            position: absolute;
            right: -11px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 1.25rem;
        }
        .gemini-btn {
            background-color: #00A6ED;
            color: white;
            transition: background-color 0.3s;
        }
        .gemini-btn:hover {
            background-color: #0077B6;
        }
        .gemini-output {
            background-color: #e3f2fd;
            border-right: 4px solid #00A6ED;
        }
    </style>
</head>
<body class="bg-gray-100 text-gray-800">

    <header class="bg-blue-900 text-white text-center py-8 shadow-lg">
        <h1 class="text-3xl md:text-5xl font-bold">جنگ ایران و اسرائیل: فراتر از روایت‌ها</h1>
        <p class="mt-4 text-lg md:text-xl text-blue-200">تحلیل بصری شبهات، واقعیت‌ها و پیامدها برای افکار عمومی ایران (نسخه هوشمند)</p>
    </header>

    <main class="container mx-auto p-4 md:p-8">

        <section id="history" class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 class="text-2xl font-bold text-blue-900 mb-4 text-center">بخش اول: از اتحاد تا خصومت - یک چرخه‌ی تاریخی</h2>
            <p class="text-center text-gray-600 mb-8">روابط ایران و اسرائیل همیشه خصمانه نبوده است. این اینفوگرافیک، مسیر پر فراز و نشیب این دو بازیگر منطقه‌ای را از همکاری استراتژیک تا دشمنی ایدئولوژیک به تصویر می‌کشد.</p>
            <div class="timeline relative flex flex-col items-center">
                <div class="timeline-item w-full md:w-1/2">
                    <div class="timeline-content text-right">
                        <h3 class="font-bold text-lg text-yellow-500">دوران پهلوی (قبل از ۱۹۷۹)</h3>
                        <p class="text-sm">همکاری استراتژیک بر اساس "دکترین پیرامون". ایران دومین کشور مسلمانی بود که اسرائیل را به رسمیت (دوفاکتو) شناخت. همکاری‌های اطلاعاتی (ساواک)، نظامی و اقتصادی گسترده بود.</p>
                    </div>
                </div>
                <div class="timeline-item w-full md:w-1/2">
                    <div class="timeline-content text-left">
                        <h3 class="font-bold text-lg text-blue-800">انقلاب اسلامی (۱۹۷۹)</h3>
                        <p class="text-sm">نقطه عطف بنیادین و گسست کامل روابط. در گفتمان جدید، اسرائیل به "رژیم صهیونیستی غاصب" و "شیطان کوچک" تبدیل شد و خصومتی آشتی‌ناپذیر آغاز گشت.</p>
                    </div>
                </div>
                <div class="timeline-item w-full md:w-1/2">
                    <div class="timeline-content text-right">
                        <h3 class="font-bold text-lg text-yellow-500">دهه ۱۹۸۰ تا ۲۰۲۰: جنگ در سایه</h3>
                        <p class="text-sm">شکل‌گیری "محور مقاومت" و حمایت از گروه‌های نیابتی. تمرکز درگیری بر نبردهای اطلاعاتی، سایبری، ترور دانشمندان و حملات محدود در سوریه بود.</p>
                    </div>
                </div>
                <div class="timeline-item w-full md:w-1/2">
                    <div class="timeline-content text-left">
                        <h3 class="font-bold text-lg text-blue-800">۲۰۲۴-۲۰۲۵: رویارویی مستقیم</h3>
                        <p class="text-sm">برای اولین بار، دو کشور وارد درگیری نظامی مستقیم شدند. عملیات "وعده صادق" ایران و پاسخ‌های اسرائیل، ماهیت منازعه را به کلی تغییر داد.</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="justification" class="bg-white rounded-lg shadow-md p-6 mb-8">
             <h2 class="text-2xl font-bold text-blue-900 mb-4 text-center">بخش دوم: چرا می‌جنگیم؟ شبهه‌ی "فلسطین به ما چه ربطی دارد؟"</h2>
             <p class="text-center text-gray-600 mb-8">یکی از بزرگترین پرسش‌ها در افکار عمومی ایران، چرایی پرداخت هزینه‌های سنگین برای مسئله فلسطین است. نظام حاکم دو لایه توجیه ایدئولوژیک و استراتژیک ارائه می‌دهد که با واقعیت‌های زندگی مردم در تضاد است.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-4 bg-blue-50 rounded-lg border-r-4 border-blue-800">
                    <h3 class="text-xl font-semibold text-blue-900 mb-2">توجیه ایدئولوژیک</h3>
                    <p class="text-gray-700">حمایت از فلسطین به عنوان یک "وظیفه اسلامی" برای دفاع از "مستضعفین" در برابر "ظلم" تعریف می‌شود.</p>
                </div>
                <div class="p-4 bg-yellow-50 rounded-lg border-r-4 border-yellow-500">
                    <h3 class="text-xl font-semibold text-yellow-600 mb-2">توجیه استراتژیک</h3>
                    <p class="text-gray-700">حمایت از "محور مقاومت" به عنوان یک "دفاع پیشگیرانه" برای دور نگه داشتن میدان نبرد از مرزهای ایران توصیف می‌شود.</p>
                </div>
                 <div class="md:col-span-2 text-center p-4 bg-gray-100 rounded-lg">
                    <p class="text-lg font-medium text-gray-800">در مقابل، بسیاری از مردم با مشاهده فشارهای اقتصادی، شعار <span class="font-bold text-red-600">"نه غزه، نه لبنان، جانم فدای ایران"</span> را مطرح می‌کنند.</p>
                </div>
                <div class="md:col-span-2 mt-6 text-center">
                    <button id="analyzeJustificationBtn" class="gemini-btn font-bold py-2 px-6 rounded-lg shadow-md">
                        ✨ تحلیل هوش مصنوعی از این دیدگاه‌ها
                    </button>
                    <div id="justificationAnalysisResult" class="hidden mt-4 p-4 text-right rounded-lg gemini-output"></div>
                </div>
            </div>
        </section>

        <section id="narratives" class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 class="text-2xl font-bold text-blue-900 mb-2 text-center">بخش سوم: جنگ روایت‌ها - واقعیت عملیات "وعده صادق"</h2>
             <p class="text-center text-gray-600 mb-8">پس از حمله مستقیم ایران، دو روایت کاملاً متضاد شکل گرفت. این تضاد، منشأ اصلی سردرگمی و شبهه در میان ایرانیان است.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div class="text-center">
                     <h3 class="text-2xl font-semibold text-blue-800 mb-4">روایت ایران: پیروزی قاطع</h3>
                     <div class="bg-blue-100 p-6 rounded-lg">
                        <span class="text-6xl font-bold text-blue-900">🏆</span>
                        <p class="mt-4 text-xl">اثبات قدرت بازدارندگی و تحقیر نظامی اسرائیل.</p>
                     </div>
                </div>
                 <div class="text-center">
                     <h3 class="text-2xl font-semibold text-yellow-600 mb-4">روایت اسرائیل: شکست نمایشی</h3>
                     <div class="bg-yellow-100 p-6 rounded-lg">
                        <span class="text-6xl font-bold text-yellow-500">۹۹٪</span>
                        <p class="mt-4 text-xl">رهگیری موفق پرتابه‌ها و وارد آمدن خسارات جزئی.</p>
                     </div>
                </div>
                <div class="md:col-span-2">
                    <p class="text-center text-gray-600 mt-4 mb-4">نمودار زیر تقابل ادعاها را نشان می‌دهد. هرچند ایران موفق به شکستن تابوی حمله مستقیم شد (یک دستاورد روانی)، اما از نظر نظامی، خسارات محدود بود.</p>
                    <div class="chart-container">
                        <canvas id="narrativeChart"></canvas>
                    </div>
                </div>
            </div>
        </section>

        <section id="military_balance" class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 class="text-2xl font-bold text-blue-900 mb-4 text-center">بخش چهارم: توازن قوا - واقعیت توان نظامی دشمن</h2>
            <p class="text-center text-gray-600 mb-8">پروپاگاندای رسمی سعی در کوچک‌نمایی قدرت اسرائیل دارد. اما بررسی‌های عینی، شکاف تکنولوژیک و کیفی قابل توجهی را به نفع اسرائیل نشان می‌دهد.</p>
             <div class="chart-container">
                <canvas id="militaryBalanceChart"></canvas>
            </div>
            <div class="mt-6 text-center bg-red-100 p-4 rounded-lg">
                 <p class="text-lg font-semibold text-red-700">مهم‌ترین عامل عدم تقارن: توان هسته‌ای اسرائیل (تخمین: ۹۰ تا ۴۰۰ کلاهک) یک بازدارنده نهایی است که هرگونه محاسبه نظامی را تغییر می‌دهد.</p>
            </div>
        </section>

        <section id="economy" class="bg-white rounded-lg shadow-md p-6 mb-8">
             <h2 class="text-2xl font-bold text-blue-900 mb-4 text-center">بخش پنجم: اقتصاد زیر آتش - هزینه جنگ برای مردم</h2>
             <p class="text-center text-gray-600 mb-8">ملموس‌ترین پیامد جنگ برای مردم، در حوزه اقتصاد قابل مشاهده است. هر دور از تنش، یک شوک ویرانگر به اقتصاد بیمار ایران وارد می‌کند.</p>
             <div class="chart-container">
                <canvas id="economyChart"></canvas>
            </div>
             <p class="text-center text-gray-600 mt-4">این نمودار سقوط ارزش ریال را در برابر دلار همزمان با تشدید تنش‌ها نشان می‌دهد. این شوک ارزی به تورم افسارگسیخته و کوچک شدن سفره مردم منجر شده است.</p>
        </section>

        <section id="alliances" class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 class="text-2xl font-bold text-blue-900 mb-4 text-center">بخش ششم: در جهان تنها؟ نقشه اتحادها در بحران</h2>
             <p class="text-center text-gray-600 mb-8">این درگیری، انزوای استراتژیک ایران را به وضوح نشان داد. در حالی که آمریکا و متحدانش حمایت از اسرائیل کردند، متحدان شرقی ایران به ابراز نگرانی بسنده کردند.</p>
            <div class="p-4 bg-gray-50 rounded-lg">
                <div class="flex flex-col md:flex-row justify-around items-center space-y-8 md:space-y-0">
                    <div class="text-center">
                        <div class="text-5xl mb-2">🇺🇸</div>
                        <div class="text-xl font-bold text-blue-800">بلوک غرب</div>
                         <div class="mt-2 text-gray-600">حمایت نظامی، اطلاعاتی و دیپلماتیک <span class="font-bold">همه‌جانبه</span>.</div>
                    </div>
                    <div class="text-4xl text-gray-400">↔️</div>
                    <div class="text-center">
                        <div class="text-5xl mb-2">🇮🇷</div>
                        <div class="text-xl font-bold text-gray-800">ایران</div>
                        <div class="mt-2 text-gray-600">متکی به "محور مقاومت" و متحدان غیردولتی.</div>
                    </div>
                     <div class="text-4xl text-gray-400">↔️</div>
                    <div class="text-center">
                         <div class="flex justify-center space-x-4 text-5xl mb-2"><span>🇨🇳</span><span>🇷🇺</span></div>
                         <div class="text-xl font-bold text-red-700">بلوک شرق</div>
                         <div class="mt-2 text-gray-600">مواضع <span class="font-bold">محتاطانه</span> و دیپلماتیک، بدون حمایت نظامی.</div>
                    </div>
                </div>
                 <div class="mt-8 border-t pt-4 text-center text-gray-700">
                    <p><span class="font-bold">کشورهای عربی منطقه:</span> در ظاهر محکومیت، در عمل همکاری پنهان با ائتلاف ضدایرانی.</p>
                </div>
            </div>
        </section>
        
        <section id="scenarios" class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 class="text-2xl font-bold text-blue-900 mb-4 text-center">بخش هفتم: آخرش چه می‌شود؟ سناریوهای آینده</h2>
            <p class="text-center text-gray-600 mb-8">آینده این منازعه، بزرگترین منبع اضطراب برای مردم است. تحلیل‌ها چهار سناریوی اصلی را با احتمالات متفاوت پیش‌بینی می‌کنند.</p>
            <div class="space-y-6">
                <div class="flowchart-item">
                    <h3 class="text-xl font-semibold text-blue-800">سناریو ۱: جنگ فرسایشی (احتمال بالا)</h3>
                    <p class="text-gray-600">درگیری کنترل‌شده با حملات محدود ادامه می‌یابد که به فرسایش تدریجی اقتصاد و توان ملی ایران منجر می‌شود.</p>
                </div>
                <div class="flowchart-item">
                    <h3 class="text-xl font-semibold text-yellow-600">سناریو ۲: شکست راهبردی ایران (احتمال متوسط)</h3>
                    <p class="text-gray-600">فشارهای نظامی و اقتصادی، ایران را مجبور به بازگشت به میز مذاکره از موضع ضعف می‌کند.</p>
                </div>
                <div class="flowchart-item">
                    <h3 class="text-xl font-semibold text-gray-500">سناریو ۳: پیروزی راهبردی ایران (احتمال پایین)</h3>
                    <p class="text-gray-600">ایران موفق به تثبیت بازدارندگی خود می‌شود، اما با توجه به عدم تقارن قوا، این سناریو کمترین احتمال را دارد.</p>
                </div>
                <div class="flowchart-item !border-red-500">
                    <h3 class="text-xl font-semibold text-red-600">سناریو ۴: جنگ تمام‌عیار منطقه‌ای (خطرناک‌ترین)</h3>
                    <p class="text-gray-600">یک محاسبه اشتباه، کل منطقه را به آتش می‌کشد و پیامدهای فاجعه‌باری برای همه خواهد داشت.</p>
                </div>
                <div class="mt-6 text-center">
                     <button id="analyzeScenarioBtn" class="gemini-btn font-bold py-2 px-6 rounded-lg shadow-md">
                        ✨ تحلیل هوش مصنوعی از سناریوی محتمل
                    </button>
                    <div id="scenarioAnalysisResult" class="hidden mt-4 p-4 text-right rounded-lg gemini-output"></div>
                </div>
            </div>
        </section>

    </main>
    
    <footer class="bg-blue-900 text-white text-center py-8 mt-8">
        <h2 class="text-2xl font-bold mb-4">نتیجه‌گیری: نیاز به تفکر انتقادی</h2>
        <div class="max-w-3xl mx-auto px-4">
             <p class="text-lg text-blue-200">میان روایت‌های رسمی و واقعیت‌های میدانی شکافی عمیق وجود دارد. در عصر جنگ روایت‌ها، بهترین راه برای شهروندان، تقویت سواد رسانه‌ای، زیر سوال بردن روایت‌های تک‌بعدی و جستجوی پاسخ‌های صادقانه است. آینده ایران در گرو رسیدن به درکی عقلانی از منافع ملی است.</p>
        </div>
    </footer>

    <script>
        const FONT_FAMILY = "'Vazirmatn', sans-serif";
        Chart.defaults.font.family = FONT_FAMILY;

        function wrapText(text, maxLength) {
            if (typeof text !== 'string' || text.length <= maxLength) {
                return text;
            }
            const words = text.split(' ');
            const lines = [];
            let currentLine = '';
            for (const word of words) {
                if ((currentLine + ' ' + word).trim().length > maxLength) {
                    lines.push(currentLine.trim());
                    currentLine = word;
                } else {
                    currentLine = (currentLine + ' ' + word).trim();
                }
            }
            if (currentLine) {
                lines.push(currentLine.trim());
            }
            return lines;
        }

        const tooltipTitleCallback = (tooltipItems) => {
            const item = tooltipItems[0];
            let label = item.chart.data.labels[item.dataIndex];
            if (Array.isArray(label)) {
              return label.join(' ');
            } else {
              return label;
            }
        };

        const SHARED_TOOLTIP_OPTIONS = {
            plugins: {
                tooltip: {
                    callbacks: {
                        title: tooltipTitleCallback
                    },
                    bodyFont: { family: FONT_FAMILY },
                    titleFont: { family: FONT_FAMILY }
                },
                legend: {
                    labels: {
                        font: { family: FONT_FAMILY }
                    }
                }
            }
        };

        const narrativeCtx = document.getElementById('narrativeChart').getContext('2d');
        new Chart(narrativeCtx, {
            type: 'bar',
            data: {
                labels: ['دستاورد روانی (شکستن تابو)', 'خسارت نظامی واقعی'],
                datasets: [{
                    label: 'روایت ایران (ادعای موفقیت)',
                    data: [90, 75],
                    backgroundColor: 'rgba(0, 70, 139, 0.7)',
                    borderColor: 'rgba(0, 70, 139, 1)',
                    borderWidth: 1
                }, {
                    label: 'تحلیل مستقل (واقعیت)',
                    data: [70, 15],
                    backgroundColor: 'rgba(255, 193, 7, 0.7)',
                    borderColor: 'rgba(255, 193, 7, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, ticks: { callback: (value) => value + '%', font: { family: FONT_FAMILY } } },
                    x: { ticks: { font: { family: FONT_FAMILY } } }
                },
                ...SHARED_TOOLTIP_OPTIONS
            }
        });

        const militaryBalanceCtx = document.getElementById('militaryBalanceChart').getContext('2d');
        const militaryLabels = [
            'بودجه دفاعی سالانه (میلیارد دلار)', 
            'تعداد جنگنده‌های مدرن (نسل ۴ و ۵)', 
            'نیروهای فعال نظامی (هزار نفر)'
        ].map(label => wrapText(label, 16));

        new Chart(militaryBalanceCtx, {
            type: 'bar',
            data: {
                labels: militaryLabels,
                datasets: [{
                    label: 'ایران',
                    data: [9.9, 160, 575], 
                    backgroundColor: 'rgba(0, 70, 139, 0.7)',
                }, {
                    label: 'اسرائیل',
                    data: [24.4, 339, 170],
                    backgroundColor: 'rgba(255, 193, 7, 0.7)',
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { ticks: { font: { family: FONT_FAMILY } } },
                    x: { ticks: { font: { family: FONT_FAMILY } } }
                },
                ...SHARED_TOOLTIP_OPTIONS
            }
        });

        const economyCtx = document.getElementById('economyChart').getContext('2d');
        new Chart(economyCtx, {
            type: 'line',
            data: {
                labels: ['قبل از تنش', 'حمله به کنسولگری', 'عملیات وعده صادق', 'پاسخ اسرائیل', 'وضعیت کنونی'],
                datasets: [{
                    label: 'نرخ دلار در بازار آزاد (تومان)',
                    data: [58000, 61000, 65000, 68000, 66000],
                    fill: true,
                    backgroundColor: 'rgba(0, 166, 237, 0.2)',
                    borderColor: 'rgba(0, 166, 237, 1)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { ticks: { font: { family: FONT_FAMILY } } },
                    x: { ticks: { font: { family: FONT_FAMILY } } }
                },
                ...SHARED_TOOLTIP_OPTIONS
            }
        });

        // Gemini API Integration
        const analyzeJustificationBtn = document.getElementById('analyzeJustificationBtn');
        const justificationAnalysisResult = document.getElementById('justificationAnalysisResult');
        const analyzeScenarioBtn = document.getElementById('analyzeScenarioBtn');
        const scenarioAnalysisResult = document.getElementById('scenarioAnalysisResult');

        const callGemini = async (prompt, resultElement, buttonElement) => {
            resultElement.classList.remove('hidden');
            resultElement.innerHTML = '<p class="text-center animate-pulse">در حال تحلیل توسط هوش مصنوعی...</p>';
            buttonElement.disabled = true;

            const apiKey = ""; 
            const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=';
            
            const payload = {
                contents: [{
                    role: "user",
                    parts: [{ text: prompt }]
                }]
            };

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                
                if (!response.ok) {
                    throw new Error('API request failed with status');
                }

                const result = await response.json();

                if (result.candidates && result.candidates.length > 0 && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts.length > 0) {
                    const text = result.candidates[0].content.parts[0].text;
                    // Using innerHTML to allow for basic formatting like paragraphs or lists from the model.
                    resultElement.innerHTML = '<h4 class="font-bold mb-2">✨ تحلیل هوش مصنوعی ✨</h4><div class="space-y-2"></div>';
                } else {
                     throw new Error('پاسخ معتبری از هوش مصنوعی دریافت نشد.');
                }
            } catch (error) {
                resultElement.innerHTML = '<p class="text-red-600">خطا در ارتباط با سرویس هوش مصنوعی. لطفاً دوباره تلاش کنید. </p>';
            } finally {
                 buttonElement.disabled = false;
            }
        };

        analyzeJustificationBtn.addEventListener('click', () => {
            const prompt = '
                Analyze the following two justifications for Iran's anti-Israel foreign policy: 
                1) Ideological: A religious duty to defend the oppressed Palestinians against a 'usurper regime.' 
                2) Strategic: A preemptive defense to keep the battlefield away from Iran's borders. 
                From the perspective of an average Iranian citizen struggling with economic hardship and international isolation, generate a concise analysis of the potential counter-arguments and criticisms against these justifications. Focus on the perceived conflict with national interests, such as economic well-being and diplomatic relations.
                Please provide the response in clear, well-structured Persian paragraphs.
            ';
            callGemini(prompt, justificationAnalysisResult, analyzeJustificationBtn);
        });

        analyzeScenarioBtn.addEventListener('click', () => {
            const prompt = '
                Based on the following scenario for the Iran-Israel conflict, which is considered the most probable: "War of Attrition (High Probability): Controlled conflict continues with limited attacks, leading to the gradual erosion of Iran's economy and national power."
                Elaborate on the potential long-term impacts of this "War of Attrition" on Iran and the wider Middle East. Discuss the consequences for:
                1.  Iran's domestic economy and society (e.g., inflation, brain drain, social unrest).
                2.  Regional stability and the role of other Arab nations.
                3.  The global energy market and international diplomacy.
                Please provide a nuanced analysis in clear, well-structured Persian paragraphs.
            ';
            callGemini(prompt, scenarioAnalysisResult, analyzeScenarioBtn);
        });

    </script>

</body>
</html>
`

const createSlug = (text: string) => text.toLowerCase().trim().replace(/[\s\W-]+/g, '-');

// const images = {
//     missile: "https://i.postimg.cc/GhLxGFhP/Gemini-Generated-Image-6ui82b6ui82b6ui8.png",
//     drone: "https://i.postimg.cc/FRxJH6SM/Gemini-Generated-Image-iumdqliumdqliumd.png",
//     warship: "https://i.postimg.cc/0NDwLjy2/Gemini-Generated-Image-iumdqiiumdqiiumd.png",
//     cyber: "https://i.postimg.cc/xTpMmBZY/Gemini-Generated-Image-iumdqjiumdqjiumd.png",
//     tank: "https://i.postimg.cc/qMv2zpjj/Gemini-Generated-Image-iumdqhiumdqhiumd.png",
//     radar: "https://i.postimg.cc/gcqKxSdk/Gemini-Generated-Image-6ui8276ui8276ui8.png",
//     timeline: "https://i.postimg.cc/4xnvFXcm/Gemini-Generated-Image-iumdqmiumdqmiumd.png",
//     abstractData: "https://i.postimg.cc/8PYfcMFz/Gemini-Generated-Image-6ui82e6ui82e6ui8.png",
//     soldierSilhouette: "https://i.postimg.cc/PJ4b0xK8/Gemini-Generated-Image-6ui82c6ui82c6ui8.png",
//     soldierMap: "https://i.postimg.cc/rmTrcTDG/Gemini-Generated-Image-iumdqkiumdqkiumd-1.png",
//     soldierTech: "https://i.postimg.cc/d34d4ft2/Gemini-Generated-Image-iumdqgiumdqgiumd.png",
//     jet: "https://i.postimg.cc/GtcGPRr3/Gemini-Generated-Image-iumdqfiumdqfiumd.png",
//     questionMark: "https://i.postimg.cc/QMTQhS0D/Gemini-Generated-Image-iumdqniumdqniumd.png",
//     satellite: "https://i.postimg.cc/SNRzmDxP/Gemini-Generated-Image-6ui8266ui8266ui8.png",
// };



// export const allDynos: Dyno[] = dynos1;
