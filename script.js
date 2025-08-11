// Enhanced Islamic Tasbih App with all requested features
class IslamicTasbihApp {
    constructor() {
        this.currentPage = 'istighfar';
        this.backgroundIndex = 0;
        this.backgroundInterval = null;
        this.audioPlaying = false;
        this.groupKhatmaTarget = 30; // 30 parts for complete Quran
        
        // Surah texts
        this.surahTexts = {
            ikhlas: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
قُلْ هُوَ اللَّهُ أَحَدٌ
اللَّهُ الصَّمَدُ
لَمْ يَلِدْ وَلَمْ يُولَدْ
وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ`,
            
            falaq: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ
مِن شَرِّ مَا خَلَقَ
وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ
وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ
وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ`,
            
            nas: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
قُلْ أَعُوذُ بِرَبِّ النَّاسِ
مَلِكِ النَّاسِ
إِلَٰهِ النَّاسِ
مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ
الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ
مِنَ الْجِنَّةِ وَالنَّاسِ`,
            
            kafirun: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
قُلْ يَا أَيُّهَا الْكَافِرُونَ
لَا أَعْبُدُ مَا تَعْبُدُونَ
وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ
وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ
وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ
لَكُمْ دِينُكُمْ وَلِيَ دِينِ`,
            
            nasr: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ
وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا
فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا`,
            
            yaseen: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
يس
وَالْقُرْآنِ الْحَكِيمِ
إِنَّكَ لَمِنَ الْمُرْسَلِينَ
عَلَىٰ صِرَاطٍ مُسْتَقِيمٍ
تَنْزِيلَ الْعَزِيزِ الرَّحِيمِ
لِتُنذِرَ قَوْمًا مَا أُنذِرَ آبَاؤُهُمْ فَهُمْ غَافِلُونَ
لَقَدْ حَقَّ الْقَوْلُ عَلَىٰ أَكْثَرِهِمْ فَهُمْ لَا يُؤْمِنُونَ
إِنَّا جَعَلْنَا فِي أَعْنَاقِهِمْ أَغْلَالًا فَهِيَ إِلَى الْأَذْقَانِ فَهُم مُّقْمَحُونَ
وَجَعَلْنَا مِن بَيْنِ أَيْدِيهِمْ سَدًّا وَمِنْ خَلْفِهِمْ سَدًّا فَأَغْشَيْنَاهُمْ فَهُمْ لَا يُبْصِرُونَ
وَسَوَاءٌ عَلَيْهِمْ أَأَنذَرْتَهُمْ أَمْ لَمْ تُنذِرْهُمْ لَا يُؤْمِنُونَ
إِنَّمَا تُنذِرُ مَنْ اتَّبَعَ الذِّكْرَ وَخَشِيَ الرَّحْمَٰنَ بِالْغَيْبِ ۖ فَبَشِّرْهُ بِمَغْفِرَةٍ وَأَجْرٍ كَرِيمٍ
إِنَّا نَحْنُ نُحْيِي الْمَوْتَىٰ وَنَكْتُبُ مَا قَدَّمُوا وَآثَارَهُمْ ۚ وَكُلَّ شَيْءٍ أَحْصَيْنَاهُ فِي إِمَامٍ مُّبِينٍ
وَاضْرِبْ لَهُم مَّثَلًا أَصْحَابَ الْقَرْيَةِ إِذْ جَاءَهَا الْمُرْسَلُونَ
إِذْ أَرْسَلْنَا إِلَيْهِمُ اثْنَيْنِ فَكَذَّبُوهُمَا فَعَزَّزْنَا بِثَالِثٍ فَقَالُوا إِنَّا إِلَيْكُم مُّرْسَلُونَ
قَالُوا مَا أَنتُمْ إِلَّا بَشَرٌ مِّثْلُنَا وَمَا أَنزَلَ الرَّحْمَٰنُ مِن شَيْءٍ إِنْ أَنتُمْ إِلَّا تَكْذِبُونَ
قَالُوا رَبُّنَا يَعْلَمُ إِنَّا إِلَيْكُمْ لَمُرْسَلُونَ
وَمَا عَلَيْنَا إِلَّا الْبَلَاغُ الْمُبِينُ
... (سورة يس كاملة - 83 آية)
وَضَرَبَ لَنَا مَثَلًا وَنَسِيَ خَلْقَهُ ۖ قَالَ مَن يُحْيِي الْعِظَامَ وَهِيَ رَمِيمٌ
قُلْ يُحْيِيهَا الَّذِي أَنشَأَهَا أَوَّلَ مَرَّةٍ ۖ وَهُوَ بِكُلِّ خَلْقٍ عَلِيمٌ
الَّذِي جَعَلَ لَكُم مِّنَ الشَّجَرِ الْأَخْضَرِ نَارًا فَإِذَا أَنتُم مِّنْهُ تُوقِدُونَ
أَوَلَيْسَ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ بِقَادِرٍ عَلَىٰ أَن يَخْلُقَ مِثْلَهُم ۚ بَلَىٰ وَهُوَ الْخَلَّاقُ الْعَلِيمُ
إِنَّمَا أَمْرُهُ إِذَا أَرَادَ شَيْئًا أَن يَقُولَ لَهُ كُن فَيَكُونُ
فَسُبْحَانَ الَّذِي بِيَدِهِ مَلَكُوتُ كُلِّ شَيْءٍ وَإِلَيْهِ تُرْجَعُونَ`,
            
            fatiha: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ
الرَّحْمَٰنِ الرَّحِيمِ
مَالِكِ يَوْمِ الدِّينِ
إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ
اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ
صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ`
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadSavedData();
        this.startBackgroundRotation();
        this.updateStats();
        this.checkGroupKhatma();
    }
    
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchPage(e.target.dataset.page);
            });
        });
        
        // Dhikr buttons
        document.querySelectorAll('.dhikr-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.incrementDhikr(e.target.closest('.dhikr-card').dataset.id);
            });
        });
        
        // Dua buttons
        document.querySelectorAll('.dua-count-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.incrementDua(e.target.dataset.dua);
            });
        });
        
        // Quran reading buttons
        document.querySelectorAll('.read-complete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.completeSurah(e.target.dataset.surah || 'selected');
            });
        });
        
        // Surah selector
        document.getElementById('readSurah').addEventListener('click', () => {
            this.showSelectedSurah();
        });
        
        // Audio controls
        document.getElementById('audioToggle').addEventListener('click', () => {
            this.toggleAudio();
        });
        
        // Keyboard accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                if (e.target.classList.contains('dhikr-btn') || 
                    e.target.classList.contains('dua-count-btn') || 
                    e.target.classList.contains('read-complete-btn')) {
                    e.preventDefault();
                    e.target.click();
                }
            }
        });
    }
    
    switchPage(pageId) {
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-page="${pageId}"]`).classList.add('active');
        
        // Update pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(pageId).classList.add('active');
        
        this.currentPage = pageId;
    }
    
    incrementDhikr(dhikrId) {
        const card = document.querySelector(`[data-id="${dhikrId}"]`);
        const countEl = card.querySelector('.count');
        const targetEl = card.querySelector('.target');
        
        let currentCount = parseInt(localStorage.getItem(`dhikr_${dhikrId}`) || '0');
        const target = parseInt(targetEl.textContent.replace('/', ''));
        
        currentCount++;
        if (currentCount > target) {
            currentCount = 0; // Reset after reaching target
            this.showCompletionMessage(card, 'تم إكمال العدد المطلوب! بارك الله فيك');
        }
        
        countEl.textContent = currentCount;
        localStorage.setItem(`dhikr_${dhikrId}`, currentCount.toString());
        
        // Visual feedback
        card.style.transform = 'scale(1.05)';
        card.style.boxShadow = '0 6px 30px rgba(212, 175, 55, 0.4)';
        setTimeout(() => {
            card.style.transform = '';
            card.style.boxShadow = '';
        }, 200);
        
        this.updateStats();
    }
    
    incrementDua(duaId) {
        const btn = document.querySelector(`[data-dua="${duaId}"]`);
        const countEl = btn.parentElement.querySelector('.dua-count');
        
        let currentCount = parseInt(localStorage.getItem(`dua_${duaId}`) || '0');
        currentCount++;
        
        countEl.textContent = currentCount;
        localStorage.setItem(`dua_${duaId}`, currentCount.toString());
        
        // Visual feedback
        btn.textContent = 'تم بارك الله فيك ✓';
        btn.style.background = '#27ae60';
        setTimeout(() => {
            btn.textContent = 'تم الدعاء';
            btn.style.background = '';
        }, 1500);
        
        this.updateStats();
    }
    
    completeSurah(surahId) {
        let surahCount = parseInt(localStorage.getItem('surah_count') || '0');
        surahCount++;
        localStorage.setItem('surah_count', surahCount.toString());
        
        // Update display
        document.getElementById('surahCount').textContent = surahCount;
        
        // Check for khatma completion (30 surahs = 1 khatma)
        const khatmaCount = Math.floor(surahCount / this.groupKhatmaTarget);
        const previousKhatmaCount = parseInt(localStorage.getItem('khatma_count') || '0');
        
        if (khatmaCount > previousKhatmaCount) {
            localStorage.setItem('khatma_count', khatmaCount.toString());
            document.getElementById('khatmaCount').textContent = khatmaCount;
            this.showKhatmaComplete();
        }
        
        // Visual feedback
        const btn = document.querySelector(`[data-surah="${surahId}"]`) || 
                   document.getElementById('selectedSurahComplete');
        btn.textContent = 'تم بارك الله فيك ✓';
        btn.disabled = true;
        btn.style.background = '#27ae60';
        setTimeout(() => {
            btn.textContent = 'تمت القراءة';
            btn.disabled = false;
            btn.style.background = '';
        }, 2000);
        
        this.updateStats();
        this.checkGroupKhatma();
    }
    
    showSelectedSurah() {
        const select = document.getElementById('surahSelect');
        const selectedValue = select.value;
        
        if (!selectedValue) return;
        
        const surahContainer = document.getElementById('selectedSurah');
        const titleEl = document.getElementById('selectedSurahTitle');
        const textEl = document.getElementById('selectedSurahText');
        const completeBtn = document.getElementById('selectedSurahComplete');
        
        titleEl.textContent = select.options[select.selectedIndex].text;
        textEl.textContent = this.surahTexts[selectedValue];
        completeBtn.dataset.surah = selectedValue;
        
        surahContainer.style.display = 'block';
        surahContainer.scrollIntoView({ behavior: 'smooth' });
    }
    
    showKhatmaComplete() {
        const khatmaCompleteEl = document.getElementById('khatmaComplete');
        khatmaCompleteEl.style.display = 'block';
        
        // Create celebration effect
        this.createCelebrationEffect();
        
        // Auto-hide after 8 seconds
        setTimeout(() => {
            khatmaCompleteEl.style.display = 'none';
        }, 8000);
    }
    
    createCelebrationEffect() {
        // Simple celebration animation
        const celebration = document.createElement('div');
        celebration.innerHTML = '🎉 الحمد لله تمت الختمة! 🎉';
        celebration.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #27ae60, #2ecc71);
            color: white;
            padding: 2rem;
            border-radius: 15px;
            font-size: 1.5rem;
            font-weight: 700;
            z-index: 1000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: celebrationPulse 3s ease-in-out;
        `;
        
        document.body.appendChild(celebration);
        
        setTimeout(() => {
            document.body.removeChild(celebration);
        }, 3000);
    }
    
    checkGroupKhatma() {
        const totalSurahs = parseInt(localStorage.getItem('surah_count') || '0');
        const progress = (totalSurahs % this.groupKhatmaTarget) / this.groupKhatmaTarget * 100;
        
        // Update progress display if element exists
        const progressEl = document.getElementById('khatmaProgress');
        if (progressEl) {
            progressEl.style.width = `${progress}%`;
        }
    }
    
    showCompletionMessage(element, message) {
        const messageEl = document.createElement('div');
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: absolute;
            top: -40px;
            left: 50%;
            transform: translateX(-50%);
            background: #27ae60;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-size: 0.9rem;
            white-space: nowrap;
            z-index: 100;
            animation: fadeInOut 2s ease-in-out;
        `;
        
        element.style.position = 'relative';
        element.appendChild(messageEl);
        
        setTimeout(() => {
            element.removeChild(messageEl);
        }, 2000);
    }
    
    toggleAudio() {
        const audio = document.getElementById('backgroundAudio');
        const btn = document.getElementById('audioToggle');
        const icon = btn.querySelector('.audio-icon');
        const text = btn.querySelector('.audio-text');
        
        if (this.audioPlaying) {
            audio.pause();
            btn.classList.remove('playing');
            icon.textContent = '🔊';
            text.textContent = 'تشغيل الخلفية الصوتية';
            this.audioPlaying = false;
        } else {
            // Set volume to be gentle
            audio.volume = 0.3;
            audio.play().then(() => {
                btn.classList.add('playing');
                icon.textContent = '🔇';
                text.textContent = 'إيقاف الخلفية الصوتية';
                this.audioPlaying = true;
            }).catch(error => {
                console.log('Audio playback failed:', error);
                this.showAudioError();
            });
        }
    }
    
    showAudioError() {
        const errorMsg = document.createElement('div');
        errorMsg.textContent = 'لا يمكن تشغيل الصوت. تأكد من الاتصال بالإنترنت.';
        errorMsg.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #e74c3c;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            z-index: 1000;
            font-weight: 600;
        `;
        
        document.body.appendChild(errorMsg);
        
        setTimeout(() => {
            document.body.removeChild(errorMsg);
        }, 3000);
    }
    
    startBackgroundRotation() {
        const backgrounds = ['', 'bg-2', 'bg-3'];
        
        this.backgroundInterval = setInterval(() => {
            document.body.className = backgrounds[this.backgroundIndex];
            this.backgroundIndex = (this.backgroundIndex + 1) % backgrounds.length;
        }, 30000); // Change every 30 seconds
    }
    
    loadSavedData() {
        // Load dhikr counts
        document.querySelectorAll('.dhikr-card').forEach(card => {
            const id = card.dataset.id;
            const count = localStorage.getItem(`dhikr_${id}`) || '0';
            card.querySelector('.count').textContent = count;
        });
        
        // Load dua counts
        document.querySelectorAll('.dua-count-btn').forEach(btn => {
            const duaId = btn.dataset.dua;
            const count = localStorage.getItem(`dua_${duaId}`) || '0';
            btn.parentElement.querySelector('.dua-count').textContent = count;
        });
        
        // Load surah and khatma counts
        const surahCount = localStorage.getItem('surah_count') || '0';
        const khatmaCount = localStorage.getItem('khatma_count') || '0';
        
        document.getElementById('surahCount').textContent = surahCount;
        document.getElementById('khatmaCount').textContent = khatmaCount;
    }
    
    updateStats() {
        // Calculate total dhikr
        let totalDhikr = 0;
        document.querySelectorAll('.dhikr-card').forEach(card => {
            const count = parseInt(card.querySelector('.count').textContent || '0');
            totalDhikr += count;
        });
        
        // Calculate total duas
        let totalDuas = 0;
        document.querySelectorAll('.dua-count').forEach(countEl => {
            const count = parseInt(countEl.textContent || '0');
            totalDuas += count;
        });
        
        // Update footer stats
        document.getElementById('totalDhikr').textContent = totalDhikr;
        document.getElementById('totalDuas').textContent = totalDuas;
        document.getElementById('totalSurahs').textContent = 
            localStorage.getItem('surah_count') || '0';
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes celebrationPulse {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.1); }
    }
    
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
        50% { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
`;
document.head.appendChild(style);

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new IslamicTasbihApp();
});

// Service Worker for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

