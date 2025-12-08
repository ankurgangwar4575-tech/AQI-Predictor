function calculatePM25_AQI(pm25) {
    // Indian AQI breakpoints for PM2.5 (24-hour, μg/m³)
    const breakpoints = [
        { bpLow: 0, bpHigh: 30, iLow: 0, iHigh: 50 },
        { bpLow: 31, bpHigh: 60, iLow: 51, iHigh: 100 },
        { bpLow: 61, bpHigh: 90, iLow: 101, iHigh: 200 },
        { bpLow: 91, bpHigh: 120, iLow: 201, iHigh: 300 },
        { bpLow: 121, bpHigh: 250, iLow: 301, iHigh: 400 },
        { bpLow: 251, bpHigh: 350, iLow: 401, iHigh: 500 },
        // Extended for Severe+ (beyond 500)
        { bpLow: 351, bpHigh: 450, iLow: 501, iHigh: 600 }
    ];
    return calculateAQI(pm25, breakpoints);
}
        
        function calculatePM10_AQI(pm10) {
    // Indian AQI breakpoints for PM10 (24-hour, μg/m³)
    const breakpoints = [
        { bpLow: 0, bpHigh: 50, iLow: 0, iHigh: 50 },
        { bpLow: 51, bpHigh: 100, iLow: 51, iHigh: 100 },
        { bpLow: 101, bpHigh: 250, iLow: 101, iHigh: 200 },
        { bpLow: 251, bpHigh: 350, iLow: 201, iHigh: 300 },
        { bpLow: 351, bpHigh: 430, iLow: 301, iHigh: 400 },
        { bpLow: 431, bpHigh: 520, iLow: 401, iHigh: 500 },
        // Extended for Severe+
        { bpLow: 521, bpHigh: 600, iLow: 501, iHigh: 600 }
    ];
    return calculateAQI(pm10, breakpoints);
}
        
       function calculateNO2_AQI(no2) {
    // Indian AQI uses μg/m³, convert ppb to μg/m³: 1 ppb NO₂ ≈ 1.88 μg/m³
    const no2_ugm3 = no2 * 1.88;
    
    // Indian AQI breakpoints for NO₂ (24-hour, μg/m³)
    const breakpoints = [
        { bpLow: 0, bpHigh: 40, iLow: 0, iHigh: 50 },
        { bpLow: 41, bpHigh: 80, iLow: 51, iHigh: 100 },
        { bpLow: 81, bpHigh: 180, iLow: 101, iHigh: 200 },
        { bpLow: 181, bpHigh: 280, iLow: 201, iHigh: 300 },
        { bpLow: 281, bpHigh: 400, iLow: 301, iHigh: 400 },
        { bpLow: 401, bpHigh: 600, iLow: 401, iHigh: 500 }
    ];
    return calculateAQI(no2_ugm3, breakpoints);
}
        
       function calculateSO2_AQI(so2) {
    // Convert ppb to μg/m³: 1 ppb SO₂ ≈ 2.62 μg/m³
    const so2_ugm3 = so2 * 2.62;
    
    // Indian AQI breakpoints for SO₂ (24-hour, μg/m³)
    const breakpoints = [
        { bpLow: 0, bpHigh: 40, iLow: 0, iHigh: 50 },
        { bpLow: 41, bpHigh: 80, iLow: 51, iHigh: 100 },
        { bpLow: 81, bpHigh: 380, iLow: 101, iHigh: 200 },
        { bpLow: 381, bpHigh: 800, iLow: 201, iHigh: 300 },
        { bpLow: 801, bpHigh: 1600, iLow: 301, iHigh: 400 },
        { bpLow: 1601, bpHigh: 2400, iLow: 401, iHigh: 500 }
    ];
    return calculateAQI(so2_ugm3, breakpoints);
}
        
        function calculateO3_AQI(o3) {
    // Convert ppb to μg/m³: 1 ppb O₃ ≈ 1.96 μg/m³
    const o3_ugm3 = o3 * 1.96;
    
    // Indian AQI breakpoints for O₃ (8-hour, μg/m³)
    const breakpoints = [
        { bpLow: 0, bpHigh: 50, iLow: 0, iHigh: 50 },
        { bpLow: 51, bpHigh: 100, iLow: 51, iHigh: 100 },
        { bpLow: 101, bpHigh: 168, iLow: 101, iHigh: 200 },
        { bpLow: 169, bpHigh: 208, iLow: 201, iHigh: 300 },
        { bpLow: 209, bpHigh: 748, iLow: 301, iHigh: 400 },
        { bpLow: 749, bpHigh: 1000, iLow: 401, iHigh: 500 }
    ];
    return calculateAQI(o3_ugm3, breakpoints);
}
        
        function calculateCO_AQI(co) {
    // Convert ppb to mg/m³: 1 ppm = 1000 ppb, 1 ppm CO ≈ 1.15 mg/m³
    // So: 1 ppb CO ≈ 0.00115 mg/m³
    const co_mgm3 = co * 0.00115;
    
    // Indian AQI breakpoints for CO (8-hour, mg/m³)
    const breakpoints = [
        { bpLow: 0, bpHigh: 1.0, iLow: 0, iHigh: 50 },
        { bpLow: 1.1, bpHigh: 2.0, iLow: 51, iHigh: 100 },
        { bpLow: 2.1, bpHigh: 10, iLow: 101, iHigh: 200 },
        { bpLow: 10.1, bpHigh: 17, iLow: 201, iHigh: 300 },
        { bpLow: 17.1, bpHigh: 34, iLow: 301, iHigh: 400 },
        { bpLow: 34.1, bpHigh: 50, iLow: 401, iHigh: 500 }
    ];
    return calculateAQI(co_mgm3, breakpoints);
}
        
        function calculateAQI(C, breakpoints) {
    // Find the correct breakpoint range
    let bp = breakpoints.find(bp => C >= bp.bpLow && C <= bp.bpHigh);
    
    // If concentration is within a defined breakpoint range
    if (bp) {
        return Math.round(
            ((bp.iHigh - bp.iLow) / (bp.bpHigh - bp.bpLow)) * (C - bp.bpLow) + bp.iLow
        );
    }
    
    // If concentration is BELOW the lowest breakpoint
    if (C < breakpoints[0].bpLow) {
        return 0;
    }
    
    // If concentration is ABOVE the highest breakpoint
    // Use linear extrapolation beyond the last breakpoint
    const lastBp = breakpoints[breakpoints.length - 1];
    
    // Calculate slope from the last two breakpoints for extrapolation
    if (breakpoints.length >= 2) {
        const secondLastBp = breakpoints[breakpoints.length - 2];
        const slope = (lastBp.iHigh - secondLastBp.iHigh) / 
                      (lastBp.bpHigh - secondLastBp.bpHigh);
        
        const extrapolatedAQI = Math.round(
            lastBp.iHigh + slope * (C - lastBp.bpHigh)
        );
        
        // Cap at 1000 for safety (or adjust as needed)
        return Math.min(extrapolatedAQI, 1000);
    }
    
    // Fallback: Use last breakpoint's high AQI
    return lastBp.iHigh;
}
        function getAQICategory(aqi) {
    if (aqi <= 50) return { 
        category: "Good", 
        color: "#00e400",
        bgClass: "aqi-good-bg" 
    };
    if (aqi <= 100) return { 
        category: "Satisfactory", 
        color: "#9acd32",  // Yellow-green
        bgClass: "aqi-moderate-bg" 
    };
    if (aqi <= 200) return { 
        category: "Moderate", 
        color: "#ffff00",
        bgClass: "aqi-sensitive-bg" 
    };
    if (aqi <= 300) return { 
        category: "Poor", 
        color: "#ff7e00",
        bgClass: "aqi-unhealthy-bg" 
    };
    if (aqi <= 400) return { 
        category: "Very Poor", 
        color: "#ff0000",
        bgClass: "aqi-very-unhealthy-bg" 
    };
    if (aqi <= 500) return { 
        category: "Severe", 
        color: "#8f3f97",
        bgClass: "aqi-hazardous-bg" 
    };
    // Beyond 500 - Severe+
    return { 
        category: "Severe+", 
        color: "#7e0023",
        bgClass: "aqi-hazardous-bg" 
    };
}
        
        function getHealthImplications(category) {
    switch(category) {
        case "Good":
            return "Minimal impact on health. Air quality is considered satisfactory.";
        case "Satisfactory":
            return "Minor breathing discomfort to sensitive people. Air quality is acceptable.";
        case "Moderate":
            return "Breathing discomfort to people with lung disease, heart disease, children and older adults.";
        case "Poor":
            return "Breathing discomfort to most people on prolonged exposure.";
        case "Very Poor":
            return "Respiratory illness on prolonged exposure. Effects may be more pronounced in people with lung/heart disease.";
        case "Severe":
            return "Respiratory effects even on healthy people; serious health impacts on people with lung/heart disease.";
        case "Severe+":
            return "Health emergency conditions. Serious risk of respiratory effects in general population.";
        default:
            return "Unknown health implications.";
    }
}
       function getCautionaryStatement(category) {
    switch(category) {
        case "Good":
            return "No precautions needed. Enjoy outdoor activities.";
        case "Satisfactory":
            return "Sensitive individuals should consider reducing prolonged or heavy exertion.";
        case "Moderate":
            return "People with heart or lung disease, older adults, and children should reduce prolonged or heavy exertion.";
        case "Poor":
            return "Everyone should reduce prolonged or heavy exertion. Sensitive groups should avoid outdoor activities.";
        case "Very Poor":
            return "Avoid prolonged or heavy exertion. Everyone, especially sensitive groups, should limit outdoor activities.";
        case "Severe":
            return "Avoid all physical activity outdoors. Move activities indoors or reschedule.";
        case "Severe+":
            return "Health emergency: Avoid all outdoor activities. Stay indoors with windows closed. Use air purifiers if available.";
        default:
            return "Precautions unknown.";
    }
}
        
        // DOM elements
        const pm25Slider = document.getElementById('pm25-slider');
        const pm10Slider = document.getElementById('pm10-slider');
        const no2Slider = document.getElementById('no2-slider');
        const so2Slider = document.getElementById('so2-slider');
        const o3Slider = document.getElementById('o3-slider');
        const coSlider = document.getElementById('co-slider');
        
        const pm25Value = document.getElementById('pm25-value');
        const pm10Value = document.getElementById('pm10-value');
        const no2Value = document.getElementById('no2-value');
        const so2Value = document.getElementById('so2-value');
        const o3Value = document.getElementById('o3-value');
        const coValue = document.getElementById('co-value');
        
        const calculateBtn = document.getElementById('calculate-btn');
        const resetBtn = document.getElementById('reset-btn');
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        
        const aqiValueDisplay = document.getElementById('aqi-value');
        const aqiCategoryDisplay = document.getElementById('aqi-category');
        const primaryPollutantDisplay = document.getElementById('primary-pollutant');
        const healthImplicationsDisplay = document.getElementById('health-implications');
        const cautionaryStatementDisplay = document.getElementById('cautionary-statement');
        
        // Individual AQI displays
        const pm25AqiDisplay = document.getElementById('pm25-aqi');
        const pm10AqiDisplay = document.getElementById('pm10-aqi');
        const no2AqiDisplay = document.getElementById('no2-aqi');
        const so2AqiDisplay = document.getElementById('so2-aqi');
        const o3AqiDisplay = document.getElementById('o3-aqi');
        const coAqiDisplay = document.getElementById('co-aqi');
        
        // Update value displays when sliders change
        pm25Slider.addEventListener('input', () => {
            pm25Value.textContent = pm25Slider.value;
        });
        
        pm10Slider.addEventListener('input', () => {
            pm10Value.textContent = pm10Slider.value;
        });
        
        no2Slider.addEventListener('input', () => {
            no2Value.textContent = no2Slider.value;
        });
        
        so2Slider.addEventListener('input', () => {
            so2Value.textContent = so2Slider.value;
        });
        
        o3Slider.addEventListener('input', () => {
            o3Value.textContent = o3Slider.value;
        });
        
        coSlider.addEventListener('input', () => {
            coValue.textContent = parseFloat(coSlider.value).toFixed(1);
        });
        
        // Theme toggle functionality
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            if (document.documentElement.classList.contains('dark')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Check for saved theme preference
        if (localStorage.getItem('theme') === 'dark' || 
            (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        
        // Calculate AQI when button is clicked
        calculateBtn.addEventListener('click', () => {
            const pm25 = parseFloat(pm25Slider.value);
            const pm10 = parseFloat(pm10Slider.value);
            const no2 = parseFloat(no2Slider.value);
            const so2 = parseFloat(so2Slider.value);
            const o3 = parseFloat(o3Slider.value);
            const co = parseFloat(coSlider.value);
            
            const aqiPM25 = calculatePM25_AQI(pm25);
            const aqiPM10 = calculatePM10_AQI(pm10);
            const aqiNO2 = calculateNO2_AQI(no2);
            const aqiSO2 = calculateSO2_AQI(so2);
            const aqiO3 = calculateO3_AQI(o3);
            const aqiCO = calculateCO_AQI(co);
            
            const aqiValues = [
                { pollutant: "PM2.5", aqi: aqiPM25 },
                { pollutant: "PM10", aqi: aqiPM10 },
                { pollutant: "NO₂", aqi: aqiNO2 },
                { pollutant: "SO₂", aqi: aqiSO2 },
                { pollutant: "O₃", aqi: aqiO3 },
                { pollutant: "CO", aqi: aqiCO }
            ];
            
            const maxAqi = Math.max(...aqiValues.map(item => item.aqi));
            const primaryPollutantObj = aqiValues.find(item => item.aqi === maxAqi);
            const primaryPollutant = primaryPollutantObj ? primaryPollutantObj.pollutant : "None";
            
            const categoryInfo = getAQICategory(maxAqi);
            
            // Update main AQI display
            aqiValueDisplay.textContent = maxAqi;
            aqiCategoryDisplay.textContent = categoryInfo.category;
            aqiCategoryDisplay.className = "text-xl font-semibold px-4 py-2 rounded-full";
            aqiCategoryDisplay.classList.add(categoryInfo.bgClass);
            aqiCategoryDisplay.style.color = maxAqi > 150 ? "white" : "black";
            
            primaryPollutantDisplay.textContent = primaryPollutant;
            healthImplicationsDisplay.textContent = getHealthImplications(categoryInfo.category);
            cautionaryStatementDisplay.textContent = getCautionaryStatement(categoryInfo.category);
            
            // Update individual AQI values
            pm25AqiDisplay.textContent = aqiPM25;
            pm10AqiDisplay.textContent = aqiPM10;
            no2AqiDisplay.textContent = aqiNO2;
            so2AqiDisplay.textContent = aqiSO2;
            o3AqiDisplay.textContent = aqiO3;
            coAqiDisplay.textContent = aqiCO;
            
            // Add color coding to individual AQI values
            const aqiDisplays = [
                { element: pm25AqiDisplay, value: aqiPM25 },
                { element: pm10AqiDisplay, value: aqiPM10 },
                { element: no2AqiDisplay, value: aqiNO2 },
                { element: so2AqiDisplay, value: aqiSO2 },
                { element: o3AqiDisplay, value: aqiO3 },
                { element: coAqiDisplay, value: aqiCO }
            ];
            
            aqiDisplays.forEach(item => {
                const category = getAQICategory(item.value);
                item.element.style.color = category.color;
            });
        });
        
        // Reset all values
        resetBtn.addEventListener('click', () => {
            pm25Slider.value = 0;
            pm10Slider.value = 0;
            no2Slider.value = 0;
            so2Slider.value = 0;
            o3Slider.value = 0;
            coSlider.value = 0;
            
            pm25Value.textContent = "0";
            pm10Value.textContent = "0";
            no2Value.textContent = "0";
            so2Value.textContent = "0";
            o3Value.textContent = "0";
            coValue.textContent = "0";
            
            aqiValueDisplay.textContent = "--";
            aqiCategoryDisplay.textContent = "Enter Values";
            aqiCategoryDisplay.className = "text-xl font-semibold px-4 py-2 rounded-full";
            aqiCategoryDisplay.style.color = "";
            aqiCategoryDisplay.style.backgroundColor = "";
            
            primaryPollutantDisplay.textContent = "--";
            healthImplicationsDisplay.textContent = "--";
            cautionaryStatementDisplay.textContent = "--";
            
            pm25AqiDisplay.textContent = "--";
            pm10AqiDisplay.textContent = "--";
            no2AqiDisplay.textContent = "--";
            so2AqiDisplay.textContent = "--";
            o3AqiDisplay.textContent = "--";
            coAqiDisplay.textContent = "--";
            
            // Reset colors
            const aqiDisplays = [pm25AqiDisplay, pm10AqiDisplay, no2AqiDisplay, so2AqiDisplay, o3AqiDisplay, coAqiDisplay];
            aqiDisplays.forEach(display => {
                display.style.color = "";
            });
        });
        
        // Initialize with default values
        window.addEventListener('load', () => {
            pm25Slider.value = 25;
            pm10Slider.value = 45;
            no2Slider.value = 30;
            so2Slider.value = 20;
            o3Slider.value = 40;
            coSlider.value = 2.5;
            
            pm25Value.textContent = pm25Slider.value;
            pm10Value.textContent = pm10Slider.value;
            no2Value.textContent = no2Slider.value;
            so2Value.textContent = so2Slider.value;
            o3Value.textContent = o3Slider.value;
            coValue.textContent = parseFloat(coSlider.value).toFixed(1);
            
            calculateBtn.click();
        });
         tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        'aqi-good': '#00e400',
                        'aqi-moderate': '#ffff00',
                        'aqi-sensitive': '#ff7e00',
                        'aqi-unhealthy': '#ff0000',
                        'aqi-very-unhealthy': '#8f3f97',
                        'aqi-hazardous': '#7e0023',
                        'primary': {
                            '50': '#f0f9ff',
                            '100': '#e0f2fe',
                            '200': '#bae6fd',
                            '300': '#7dd3fc',
                            '400': '#38bdf8',
                            '500': '#0ea5e9',
                            '600': '#0284c7',
                            '700': '#0369a1',
                            '800': '#075985',
                            '900': '#0c4a6e',
                            '950': '#082f49',
                        },
                        'dark': {
                            '50': '#f9fafb',
                            '100': '#f3f4f6',
                            '200': '#e5e7eb',
                            '300': '#d1d5db',
                            '400': '#9ca3af',
                            '500': '#6b7280',
                            '600': '#4b5563',
                            '700': '#374151',
                            '800': '#1f2937',
                            '900': '#111827',
                            '950': '#030712',
                        }
                    },
                    animation: {
                        'pulse-slow': 'pulse 3s ease-in-out infinite',
                        'fade-in': 'fadeIn 0.5s ease-in-out',
                        'slide-up': 'slideUp 0.3s ease-out',
                    },
                    keyframes: {
                        fadeIn: {
                            '0%': { opacity: '0' },
                            '100%': { opacity: '1' },
                        },
                        slideUp: {
                            '0%': { transform: 'translateY(10px)', opacity: '0' },
                            '100%': { transform: 'translateY(0)', opacity: '1' },
                        }
                    }
                }
            }
        }