// Enhanced Islamic Tasbih App with all requested features
class IslamicTasbihApp {
    constructor() {
        this.currentPage = 'istighfar';
        this.backgroundIndex = 0;
        this.backgroundInterval = null;
        this.audioPlaying = false;
        this.groupKhatmaTarget = 30; // 30 parts for complete Quran
        
        // Surah texts
        this.surahTexts = {}; // Will be loaded dynamically
        this.surahAudioPlayers = {}; // To manage audio for each surah
        this.currentAudio = null;
        this.currentAudioSurahId = null;

        this.init();
    }

    async init() {
        await this.loadSurahTexts();
        this.setupEventListeners();
        this.loadSavedData();
        this.startBackgroundRotation();
        this.updateStats();
        this.checkGroupKhatma();
        this.populateFeaturedSurahs(); // Call this to populate initial surah texts
    }

    async loadSurahTexts() {
        const surahsToLoad = ['fatiha', 'yaseen', 'ikhlas', 'falaq', 'nas', 'kafirun', 'nasr'];
        for (const surahId of surahsToLoad) {
            try {
                const response = await fetch(`assets/quran_texts/${surahId}.txt`);
                if (!response.ok) {
                    throw new Error(`Failed to load ${surahId}.txt: ${response.statusText}`);
                }
                const text = await response.text();
                this.surahTexts[surahId] = text;
            } catch (error) {
                console.error(`Error loading surah ${surahId}:`, error);
                this.surahTexts[surahId] = `Failed to load surah ${surahId}. Please check the file.`;
            }
        }
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
        document.querySelectorAll(".read-complete-btn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                this.completeSurah(e.target.dataset.surah || "selected");
            });
        });

        // Add event listener for play audio button
        document.querySelectorAll(".play-surah-audio-btn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const surahId = e.target.dataset.surah;
                this.toggleSurahAudio(surahId);
            });
        });

        // Surah selector
        document.getElementById("readSurah").addEventListener("click", () => {
            this.showSelectedSurah();
        });

        // Event listener for "continue reading" in Yaseen
        document.querySelectorAll(".continue-reading").forEach(span => {
            span.addEventListener("click", (e) => {
                const surahId = e.target.dataset.surah;
                if (surahId === "yaseen") {
                    const yaseenTextEl = e.target.closest(".surah-card").querySelector(".surah-text");
                    yaseenTextEl.innerHTML = this.surahTexts.yaseen.replace(/\n/g, "  
");
                }
            });
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

    async showSelectedSurah() {
        const select = document.getElementById("surahSelect");
        const selectedValue = select.value;
        
        if (!selectedValue) return;
        
        const surahContainer = document.getElementById("selectedSurah");
        const titleEl = document.getElementById("selectedSurahTitle");
        const textEl = document.getElementById("selectedSurahText");
        const completeBtn = document.getElementById("selectedSurahComplete");
        const playAudioBtn = document.getElementById("selectedSurahPlayAudio");

        titleEl.textContent = select.options[select.selectedIndex].text;
        textEl.innerHTML = this.surahTexts[selectedValue].replace(/\n/g, "  
");
        completeBtn.dataset.surah = selectedValue;
        playAudioBtn.dataset.surah = selectedValue;
        
        surahContainer.style.display = "block";
        surahContainer.scrollIntoView({ behavior: "smooth" });
    }

    // New function to populate featured surahs
    populateFeaturedSurahs() {
        const fatihaTextEl = document.querySelector(".surah-text[data-surah=\"fatiha\"]");
        if (fatihaTextEl) {
            fatihaTextEl.innerHTML = this.surahTexts.fatiha.replace(/\n/g, "  
");
        }
        const yaseenTextEl = document.querySelector(".surah-text[data-surah=\"yaseen\"]");
        if (yaseenTextEl) {
            // Display only a portion of Yaseen initially, with a 'continue reading' option
            const yaseenLines = this.surahTexts.yaseen.split("\n");
            const displayLines = yaseenLines.slice(0, 10); // Display first 10 lines
            yaseenTextEl.innerHTML = displayLines.join("  
") +
                                     `  
<span class="continue-reading" data-surah="yaseen">... (اضغط لقراءة السورة كاملة)</span>`;
        }
    }

    toggleSurahAudio(surahId) {
        const audioUrl = `https://server8.mp3quran.net/afs/${this.getSurahAudioNumber(surahId )}.mp3`;

        if (this.currentAudio && this.currentAudioSurahId === surahId) {
            // Pause if the same surah is playing
            this.currentAudio.pause();
            this.currentAudio = null;
            this.currentAudioSurahId = null;
            document.querySelector(`[data-surah="${surahId}"].play-surah-audio-btn`).textContent = 'تشغيل الصوت';
        } else {
            // Stop any currently playing audio
            if (this.currentAudio) {
                this.currentAudio.pause();
                document.querySelector(`[data-surah="${this.currentAudioSurahId}"].play-surah-audio-btn`).textContent = 'تشغيل الصوت';
            }

            // Play new surah
            this.currentAudio = new Audio(audioUrl);
            this.currentAudio.volume = 0.5; // Adjust volume as needed
            this.currentAudio.play().then(() => {
                this.currentAudioSurahId = surahId;
                document.querySelector(`[data-surah="${surahId}"].play-surah-audio-btn`).textContent = 'إيقاف الصوت';
            }).catch(error => {
                console.error(`Error playing audio for surah ${surahId}:`, error);
                this.showAudioError("لا يمكن تشغيل صوت السورة. تأكد من الاتصال بالإنترنت.");
            });
        }
    }

    getSurahAudioNumber(surahId) {
        // This is a simplified mapping. A more robust solution would involve a comprehensive surah data object.
        const surahNumbers = {
            fatiha: "001",
            yaseen: "036",
            ikhlas: "112",
            falaq: "113",
            nas: "114",
            kafirun: "109",
            nasr: "110"
        };
        return surahNumbers[surahId] || "001"; // Default to Fatiha if not found
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
                console.log("Audio playback failed:", error);
                this.showAudioError("لا يمكن تشغيل الصوت. تأكد من الاتصال بالإنترنت.");
            });
        }
    }

    showAudioError(message) {
        const errorMsg = document.createElement("div");
        errorMsg.textContent = message;
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
        const backgrounds = ["mosque1.jpg", "mosque2.jpg", "mosque3.png"];
        const headerOverlay = document.querySelector(".header-overlay");

        this.backgroundInterval = setInterval(() => {
            this.backgroundIndex = (this.backgroundIndex + 1) % backgrounds.length;
            headerOverlay.style.backgroundImage = `url("assets/${backgrounds[this.backgroundIndex]}")`;
        }, 30000); // Change every 30 seconds

        // Set initial background
        headerOverlay.style.backgroundImage = `url("assets/${backgrounds[this.backgroundIndex]}")`;
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
        document.getElementById('totalSurahs').textContent = localStorage.getItem('surah_count') || '0';
    }
}

// Add CSS animations
const style = document.createElement("style");
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
document.addEventListener("DOMContentLoaded", () => {
    new IslamicTasbihApp();
});

// Service Worker for offline functionality
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js")
            .then(registration => {
                console.log("SW registered: ", registration);
            })
            .catch(registrationError => {
                console.log("SW registration failed: ", registrationError);
            });
    });
}
