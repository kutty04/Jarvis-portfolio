document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. DOM ELEMENT SELECTIONS (Declared First)
    // ==========================================
    const preloader = document.getElementById('preloader');
    const preloaderLogs = document.getElementById('preloader-logs');
    const preloaderBar = document.getElementById('preloader-bar');
    
    const themeTrigger = document.getElementById('theme-trigger');
    const themeDropdown = document.getElementById('theme-dropdown');
    const themeOptions = document.querySelectorAll('.theme-option');
    
    const uptimeDisplay = document.getElementById('system-uptime');
    const typewriterElement = document.getElementById('typewriter');
    const tickerTrack = document.getElementById('ticker-track');
    
    const revealElements = document.querySelectorAll('.reveal');
    const skillFills = document.querySelectorAll('.skill-fill-progress');
    
    const cursor = document.getElementById('custom-cursor');
    const detailsToggles = document.querySelectorAll('.mission-details-toggle');
    
    const consoleInput = document.getElementById('console-input');
    const consoleBody = document.getElementById('console-body');
    const contactForm = document.getElementById('contact-form');
    const navbar = document.getElementById('navbar');

    // ==========================================
    // 2. HELPER & HANDLER FUNCTIONS
    // ==========================================

    // System Console Logger
    function logToConsole(text, isResponse = false) {
        if (!consoleBody) return;
        
        const line = document.createElement('div');
        if (isResponse) {
            line.style.color = 'var(--accent-primary)';
            line.innerHTML = `&gt;&gt; ${text}`;
        } else {
            line.style.color = 'var(--text-secondary)';
            line.innerHTML = `&gt; ${text}`;
        }
        
        consoleBody.appendChild(line);
        consoleBody.scrollTop = consoleBody.scrollHeight;
    }

    // Theme Application
    function applyTheme(themeName) {
        if (themeName === 'ai') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', themeName);
        }
        
        localStorage.setItem('mm_os_theme', themeName);
        
        themeOptions.forEach(opt => {
            if (opt.getAttribute('data-theme-value') === themeName) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });

        logToConsole(`Theme changed to [${themeName.toUpperCase()}_MODE]`);
    }

    // Scroll-based reveals
    function revealOnScroll() {
        const triggerBottom = window.innerHeight * 0.9;
        
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    }

    // Skills progress meters animation
    function triggerSkillFills() {
        const triggerBottom = window.innerHeight * 0.92;
        
        skillFills.forEach(fill => {
            const fillTop = fill.getBoundingClientRect().top;
            if (fillTop < triggerBottom) {
                const targetPercent = fill.getAttribute('data-percent');
                fill.style.width = `${targetPercent}%`;
            }
        });
    }

    // Uptime Diagnostics Timer
    let startTime = Date.now();
    function updateUptime() {
        let diff = Date.now() - startTime;
        let hours = Math.floor(diff / 3600000);
        let mins = Math.floor((diff % 3600000) / 60000);
        let secs = Math.floor((diff % 60000) / 1000);

        let hh = hours.toString().padStart(2, '0');
        let mm = mins.toString().padStart(2, '0');
        let ss = secs.toString().padStart(2, '0');

        if (uptimeDisplay) {
            uptimeDisplay.textContent = `${hh}:${mm}:${ss}`;
        }
    }

    // Typewriter
    const roles = [
        'Full-Stack Developer',
        'AI Systems Engineer',
        'Product Engineering Enthusiast',
        'Chennai Transit Solver'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function handleTypewriter() {
        if (!typewriterElement) return;
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 400;
        }

        setTimeout(handleTypewriter, typeSpeed);
    }

    // Ticker initialization
    const tickerFeeds = [
        { type: 'commit', repo: 'bus-crowding-app', text: 'feat: live crowding forecasts with metro timing links' },
        { type: 'deploy', repo: 'cerebro-rag', text: 'deploy: vercel static build compilation status: [LIVE]' },
        { type: 'cert', repo: 'mongodb', text: 'verified: C100DEV Associate Developer certification synced' },
        { type: 'status', repo: 'finance-flow', text: 'ml-train: clustering budget groups using local K-Means models' },
        { type: 'commit', repo: 'ipl-nlp-sql', text: 'patch: optimizing postgres schema parsing compiler scripts' },
        { type: 'deploy', repo: 'f1-intelligence', text: 'build: caching telemetry lap datasets with FastF1 compression' }
    ];

    function initTicker() {
        if (!tickerTrack) return;
        let rowHtml = '';
        tickerFeeds.forEach(feed => {
            rowHtml += `
                <span class="ticker-item">
                    <span class="ticker-label ${feed.type}">${feed.type.toUpperCase()}</span>
                    <span>${feed.repo} // <span class="highlight">${feed.text}</span></span>
                </span>
            `;
        });
        tickerTrack.innerHTML = rowHtml + rowHtml;
    }

    // Navigation and Scrolling helper
    function navigateToSection(selector) {
        const target = document.querySelector(selector);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }

    // Recruiter Easter Egg
    function triggerSudoEasterEgg() {
        const pulseOverlay = document.createElement('div');
        pulseOverlay.style.position = 'fixed';
        pulseOverlay.style.top = '0';
        pulseOverlay.style.left = '0';
        pulseOverlay.style.width = '100vw';
        pulseOverlay.style.height = '100vh';
        pulseOverlay.style.background = 'rgba(0, 240, 255, 0.04)';
        pulseOverlay.style.pointerEvents = 'none';
        pulseOverlay.style.zIndex = '99998';
        pulseOverlay.style.boxShadow = 'inset 0 0 100px rgba(0, 240, 255, 0.4)';
        pulseOverlay.style.transition = 'opacity 1.5s ease-out';
        
        document.body.appendChild(pulseOverlay);
        
        setTimeout(() => {
            pulseOverlay.style.opacity = '0';
            setTimeout(() => {
                pulseOverlay.remove();
            }, 1500);
        }, 300);
    }

    // Shell CLI command processor
    function processConsoleCommand(rawCmd) {
        logToConsole(rawCmd);
        
        const parts = rawCmd.toLowerCase().split(' ');
        const mainCmd = parts[0];
        
        switch (mainCmd) {
            case 'help':
                logToConsole('Available system commands:', true);
                logToConsole('  projects  - Navigation path to missions grid', true);
                logToConsole('  contact   - Scroll to transmission center', true);
                logToConsole('  cv        - Open developer resume in browser', true);
                logToConsole('  sudo      - Gain superuser clearance', true);
                logToConsole('  themes    - List customization commands', true);
                logToConsole('  clear     - Wipe console buffers', true);
                break;
                
            case 'projects':
                logToConsole('Redirecting viewport to active missions...', true);
                navigateToSection('#projects');
                break;
                
            case 'contact':
                logToConsole('Establishing communication signal coordinates...', true);
                navigateToSection('#contact');
                break;

            case 'cv':
                logToConsole('Loading resume compiler output...', true);
                window.open('https://kutty04.github.io/MY-CV/', '_blank');
                break;
                
            case 'sudo':
                logToConsole('CLEARANCE GRANTED. WELCOME, RECRUITER.', true);
                logToConsole('ACCESS KEY: [MADUMITHA_OPPORTUNITY_2026]', true);
                logToConsole('Secret Directive: Click "cv.exe" to view my qualifications!', true);
                triggerSudoEasterEgg();
                break;
                
            case 'themes':
                logToConsole('Visual theme commands:', true);
                logToConsole('  theme ai       - Switch style to AI Core (Cyan/Purple)', true);
                logToConsole('  theme midnight - Switch style to Midnight Gold', true);
                logToConsole('  theme formula  - Switch style to F1 Race Red', true);
                logToConsole('  theme transit  - Switch style to Transit Green', true);
                break;
                
            case 'theme':
                const themeVal = parts[1];
                if (['ai', 'midnight', 'formula', 'transit'].includes(themeVal)) {
                    applyTheme(themeVal);
                } else {
                    logToConsole('Invalid theme. Specify: theme [ai|midnight|formula|transit]', true);
                }
                break;
                
            case 'clear':
                if (consoleBody) {
                    consoleBody.innerHTML = '<div>System console registers cleared.</div>';
                }
                break;
                
            default:
                logToConsole(`Command not recognized: "${rawCmd}". Type 'help' for diagnostics instructions.`, true);
        }
    }

    // Preloader Boot Simulation execution
    const bootLogs = [
        { text: 'LOADING MM_OS SYSTEM SHELL...', delay: 80 },
        { text: 'INITIALIZING HARDWARE VECTORS... [OK]', delay: 180 },
        { text: 'ESTABLISHING SECURE PORTFOLIO GATEWAY...', delay: 150 },
        { text: 'FETCHING REPOSITORY DIRECTIVES... 6 DETECTED', delay: 250 },
        { text: 'VERIFYING CREDENTIAL ENCRYPTION CODES... [OK]', delay: 120 },
        { text: 'CONNECTING CHENNAI TRANSIT DATABASES... ONLINE', delay: 300 },
        { text: 'SYNCING FORMULA-1 TELEMETRY ENGINES...', delay: 220 },
        { text: 'OPTIMIZING LLM / RAG SYSTEM CONTEXT CONSTRAINTS...', delay: 200 },
        { text: 'WARPING COMPILER INTERFACE...', delay: 100 },
        { text: 'SYSTEM ONLINE. LAUNCHING IDENTITY COMPILER.', delay: 150 }
    ];

    function runBootSequence() {
        let currentLine = 0;
        let totalSteps = bootLogs.length;
        
        function printNextLog() {
            if (currentLine < totalSteps) {
                const log = bootLogs[currentLine];
                const lineDiv = document.createElement('div');
                lineDiv.className = 'log-line';
                
                if (log.text.includes('[OK]')) {
                    lineDiv.innerHTML = `&gt; ${log.text.replace('[OK]', '<span class="log-success">[OK]</span>')}`;
                } else if (log.text.includes('ONLINE') || log.text.includes('DETECTED')) {
                    lineDiv.innerHTML = `&gt; ${log.text.replace('ONLINE', '<span class="log-success">ONLINE</span>').replace('6 DETECTED', '<span class="log-success">6 DETECTED</span>')}`;
                } else {
                    lineDiv.innerHTML = `&gt; ${log.text}`;
                }
                
                if (preloaderLogs) {
                    preloaderLogs.appendChild(lineDiv);
                    preloaderLogs.scrollTop = preloaderLogs.scrollHeight;
                }
                
                if (preloaderBar) {
                    const progressPercent = ((currentLine + 1) / totalSteps) * 100;
                    preloaderBar.style.width = `${progressPercent}%`;
                }
                
                currentLine++;
                setTimeout(printNextLog, log.delay);
            } else {
                setTimeout(() => {
                    if (preloader) {
                        preloader.style.opacity = '0';
                    }
                    sessionStorage.setItem('mm_os_booted', 'true');
                    setTimeout(() => {
                        if (preloader) {
                            preloader.style.display = 'none';
                        }
                        initializePortfolio();
                    }, 600);
                }, 500);
            }
        }
        
        printNextLog();
    }

    function initializePortfolio() {
        revealOnScroll();
        triggerSkillFills();
    }

    // ==========================================
    // 3. LISTENERS & EVENTS BINDING (Declared Last)
    // ==========================================

    // Initialize scrolling components
    initTicker();
    setInterval(updateUptime, 1000);
    setTimeout(handleTypewriter, 1000);

    // Navbar Scroll checks
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        revealOnScroll();
        triggerSkillFills();
    });

    // Theme dropdown trigger
    if (themeTrigger && themeDropdown) {
        themeTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            themeDropdown.classList.toggle('show');
        });

        document.addEventListener('click', () => {
            themeDropdown.classList.remove('show');
        });
    }

    themeOptions.forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.stopPropagation();
            const theme = opt.getAttribute('data-theme-value');
            applyTheme(theme);
            if (themeDropdown) {
                themeDropdown.classList.remove('show');
            }
        });
    });

    // Custom Reactive Pointer Glow
    if (cursor) {
        if (window.matchMedia('(pointer: fine)').matches) {
            cursor.style.display = 'block';
            window.addEventListener('mousemove', (e) => {
                cursor.style.left = `${e.clientX}px`;
                cursor.style.top = `${e.clientY}px`;
            });

            const hoverableElements = document.querySelectorAll(
                'a, button, input, textarea, .mission-card, .theme-selector-trigger, .mission-details-toggle'
            );
            hoverableElements.forEach(el => {
                el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
                el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
            });
        }
    }

    // Mission Details Accordions
    detailsToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const targetId = toggle.getAttribute('data-target');
            const panel = document.getElementById(targetId);
            const chevron = toggle.querySelector('i');
            const toggleText = toggle.querySelector('.toggle-text');
            
            if (panel) {
                panel.classList.toggle('open');
            }
            if (chevron) {
                chevron.classList.toggle('fa-chevron-up');
                chevron.classList.toggle('fa-chevron-down');
            }
            
            if (panel && panel.classList.contains('open')) {
                if (toggleText) toggleText.textContent = 'Hide Details';
                logToConsole(`Opened architecture logs for [${targetId.replace('details-', '').toUpperCase()}]`);
            } else {
                if (toggleText) toggleText.textContent = 'Architecture';
            }
        });
    });

    // Shell Console inputs
    if (consoleInput) {
        consoleInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = consoleInput.value.trim();
                consoleInput.value = '';
                if (command.length > 0) {
                    processConsoleCommand(command);
                }
            }
        });
    }

    // Smooth scroll navigation binds
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 75,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Secure Signal Submit Transmitter
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = 'TRANSMITTING SIGNAL... <i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;

            const formData = new FormData(contactForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let resJson = await response.json();
                if (response.status == 200) {
                    btn.innerHTML = 'SIGNAL TRANSMITTED <i class="fas fa-check"></i>';
                    btn.style.background = '#22c55e';
                    btn.style.color = '#000000';
                    logToConsole('Transmission sent successfully to developer base.', true);
                    contactForm.reset();
                } else {
                    console.error(resJson);
                    btn.innerHTML = 'TRANSMISSION ERROR <i class="fas fa-times"></i>';
                    btn.style.background = '#ef4444';
                    logToConsole('Transmission error: Check network packet routing.', true);
                }
            })
            .catch(error => {
                console.error(error);
                btn.innerHTML = 'TRANSMISSION FAILED <i class="fas fa-times"></i>';
                btn.style.background = '#ef4444';
                logToConsole('Transmission error: Connection timed out.', true);
            })
            .then(() => {
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.style.color = '';
                    btn.disabled = false;
                }, 4000);
            });
        });
    }

    // ==========================================
    // 4. BOOT INITIALIZATION & CHECKS (Execute)
    // ==========================================
    
    // Load Saved Themes first
    const savedTheme = localStorage.getItem('mm_os_theme') || 'ai';
    
    // Select correct option indicator in dropdown and apply theme styles
    applyTheme(savedTheme);

    // Boot preloader triggers
    const hasVisited = sessionStorage.getItem('mm_os_booted');
    if (hasVisited) {
        if (preloader) {
            preloader.style.display = 'none';
        }
        initializePortfolio();
    } else {
        runBootSequence();
    }
});
