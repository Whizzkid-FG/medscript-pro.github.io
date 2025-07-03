// MedScript Pro - Main Application Logic
class MedScriptPro {
    constructor() {
        this.speechManager = null;
        this.transcript = [];
        this.sessionStartTime = new Date();
        this.sessionId = this.generateSessionId();
        this.currentSpecialty = 'pediatrics';
        this.soapData = this.initializeSoapData();
        
        this.initializeApp();
    }
    
    generateSessionId() {
        return 'SOAP-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
    }
    
    initializeSoapData() {
        return {
            patientInfo: { name: '', dob: '', mrn: '' },
            subjective: { chiefComplaint: '', presentIllness: '', reviewSystems: '', pastMedicalHistory: '' },
            objective: { vitalSigns: '', physicalExam: '', diagnosticResults: '' },
            assessment: { primaryDiagnosis: '', differentialDx: '', clinicalImpression: '' },
            plan: { medications: '', procedures: '', followUp: '', patientEducation: '' }
        };
    }
    
    initializeApp() {
        this.loadSOAPNoteHTML();
        this.loadModalsHTML();
        this.setupEventListeners();
        this.initializeSpeechRecognition();
        this.startSessionTimer();
        this.updateCurrentDate();
        this.showWelcomeNotification();
    }
    
    loadSOAPNoteHTML() {
        const container = document.getElementById('soapNoteContainer');
        container.innerHTML = `
            <div class="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                <!-- SOAP Header -->
                <div class="gradient-medical text-white p-8">
                    <div class="flex justify-between items-start">
                        <div>
                            <h1 class="text-3xl font-bold mb-2">SOAP NOTE</h1>
                            <div class="text-white/90 space-y-1">
                                <p id="currentDate">March 15, 2024</p>
                                <p>Session: <span id="sessionIdDisplay">${this.sessionId}</span></p>
                            </div>
                        </div>
                        <div class="text-right text-white/90">
                            <p class="font-semibold">MedScript Pro</p>
                            <p class="text-sm">AI-Generated Documentation</p>
                            <div id="specialtyBadge" class="mt-2 px-3 py-1 bg-white/20 rounded-full text-xs">
                                Pediatrics
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Patient Information -->
                <div class="p-8 bg-gray-50 border-b border-gray-200">
                    <h3 class="text-lg font-bold text-gray-900 mb-6 flex items-center">
                        <i class="fas fa-user-circle text-blue-500 mr-3"></i>
                        Patient Information
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Patient Name</label>
                            <div class="editable-field" contenteditable="true">Patient Name</div>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
                            <div class="editable-field" contenteditable="true">MM/DD/YYYY</div>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Medical Record #</label>
                            <div class="editable-field" contenteditable="true">MRN-123456</div>
                        </div>
                    </div>
                </div>
                
                <!-- SOAP Sections -->
                <div class="p-8 space-y-8">
                    ${this.generateSOAPSectionHTML('subjective', 'SUBJECTIVE', 'fas fa-comments', 'blue')}
                    ${this.generateSOAPSectionHTML('objective', 'OBJECTIVE', 'fas fa-stethoscope', 'green')}
                    ${this.generateSOAPSectionHTML('assessment', 'ASSESSMENT', 'fas fa-diagnoses', 'orange')}
                    ${this.generateSOAPSectionHTML('plan', 'PLAN', 'fas fa-clipboard-list', 'red')}
                </div>
                
                <!-- SOAP Footer -->
                <div class="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 p-8">
                    <div class="flex flex-col lg:flex-row justify-between items-center gap-6">
                        <div class="text-sm text-gray-600 space-y-1">
                            <p class="flex items-center">
                                <i class="fas fa-robot mr-2 text-purple-500"></i>
                                AI-Generated SOAP Note
                            </p>
                            <p class="flex items-center">
                                <i class="fas fa-clock mr-2 text-blue-500"></i>
                                Generated on <span id="generatedTime">${new Date().toLocaleString()}</span>
                            </p>
                            <p class="flex items-center">
                                <i class="fas fa-shield-alt mr-2 text-green-500"></i>
                                HIPAA Compliant • Encrypted
                            </p>
                        </div>
                        
                        <div class="flex flex-wrap gap-3">
                            <button id="validateSoapBtn" class="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium flex items-center gap-2 shadow-lg hover:shadow-xl">
                                <i class="fas fa-check-circle"></i>Validate
                            </button>
                            <button id="printSoapBtn" class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium flex items-center gap-2 shadow-lg hover:shadow-xl">
                                <i class="fas fa-print"></i>Print
                            </button>
                            <button id="exportSoapBtn" class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium flex items-center gap-2 shadow-lg hover:shadow-xl">
                                <i class="fas fa-download"></i>Export
                            </button>
                            <button id="clearSoapBtn" class="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-medium flex items-center gap-2 shadow-lg hover:shadow-xl">
                                <i class="fas fa-eraser"></i>Clear
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    generateSOAPSectionHTML(sectionType, title, icon, color) {
        const fields = this.getSOAPFieldsForSection(sectionType);
        const fieldsHTML = fields.map(field => `
            <div>
                <h4 class="font-bold text-gray-800 mb-3 flex items-center">
                    <span class="w-2 h-2 bg-${color}-500 rounded-full mr-2"></span>
                    ${field.label}
                </h4>
                <div class="editable-field" contenteditable="true" data-field="${field.id}">${field.placeholder}</div>
                <div class="word-count" id="${field.id}WordCount">0 words</div>
            </div>
        `).join('');
        
        return `
            <div class="soap-${sectionType} rounded-2xl p-6">
                <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <div class="w-10 h-10 bg-${color}-500 rounded-xl flex items-center justify-center mr-4">
                        <i class="${icon} text-white"></i>
                    </div>
                    ${title}
                    <button class="ml-auto w-8 h-8 bg-${color}-100 hover:bg-${color}-200 rounded-lg flex items-center justify-center">
                        <i class="fas fa-lightbulb text-${color}-600"></i>
                    </button>
                </h2>
                <div class="space-y-6">${fieldsHTML}</div>
            </div>
        `;
    }
    
    getSOAPFieldsForSection(section) {
        const fieldMaps = {
            subjective: [
                { id: 'chiefComplaint', label: 'Chief Complaint', placeholder: 'Chief complaint will appear here...' },
                { id: 'presentIllness', label: 'History of Present Illness', placeholder: 'History of present illness will appear here...' },
                { id: 'reviewSystems', label: 'Review of Systems', placeholder: 'Review of systems will appear here...' },
                { id: 'pastMedicalHistory', label: 'Past Medical History', placeholder: 'Past medical history will appear here...' }
            ],
            objective: [
                { id: 'vitalSigns', label: 'Vital Signs', placeholder: 'Vital signs will appear here...' },
                { id: 'physicalExam', label: 'Physical Examination', placeholder: 'Physical examination findings will appear here...' },
                { id: 'diagnosticResults', label: 'Diagnostic Results', placeholder: 'Laboratory and imaging results will appear here...' }
            ],
            assessment: [
                { id: 'primaryDiagnosis', label: 'Primary Diagnosis', placeholder: 'Primary diagnosis will appear here...' },
                { id: 'differentialDx', label: 'Differential Diagnoses', placeholder: 'Differential diagnoses will appear here...' },
                { id: 'clinicalImpression', label: 'Clinical Impression', placeholder: 'Clinical reasoning and impression will appear here...' }
            ],
            plan: [
                { id: 'medications', label: 'Medications', placeholder: 'Prescribed medications will appear here...' },
                { id: 'procedures', label: 'Procedures & Testing', placeholder: 'Procedures and treatments will appear here...' },
                { id: 'followUp', label: 'Follow-up', placeholder: 'Follow-up instructions will appear here...' },
                { id: 'patientEducation', label: 'Patient Education', placeholder: 'Patient education and instructions will appear here...' }
            ]
        };
        return fieldMaps[section] || [];
    }
    
    loadModalsHTML() {
        const container = document.getElementById('modalsContainer');
        container.innerHTML = `
            <!-- Templates Modal -->
            <div id="templatesModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 hidden">
                <div class="flex items-center justify-center min-h-screen p-4">
                    <div class="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-96 overflow-hidden">
                        <div class="bg-gradient-to-r from-green-500 to-green-600 text-white p-6">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-3">
                                    <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                        <i class="fas fa-file-medical"></i>
                                    </div>
                                    <div>
                                        <h3 class="text-lg font-bold">SOAP Templates</h3>
                                        <p class="text-green-100 text-sm">Quick start templates for common medical scenarios</p>
                                    </div>
                                </div>
                                <button id="closeTemplatesModal" class="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div class="p-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="templatesGrid"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- AI Suggestions Modal -->
            <div id="aiModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 hidden">
                <div class="flex items-center justify-center min-h-screen p-4">
                    <div class="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-96 overflow-hidden">
                        <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-3">
                                    <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                        <i class="fas fa-brain"></i>
                                    </div>
                                    <div>
                                        <h3 class="text-lg font-bold">AI Suggestions</h3>
                                        <p class="text-purple-100 text-sm">Improve your SOAP note with AI recommendations</p>
                                    </div>
                                </div>
                                <button id="closeAiModal" class="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div class="p-6 space-y-4 max-h-80 overflow-y-auto" id="aiSuggestionsContent">
                            <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 cursor-pointer hover:bg-blue-100">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <h4 class="font-semibold text-blue-900">Chief Complaint Enhancement</h4>
                                        <p class="text-sm text-blue-700 mt-1">Add onset duration and severity details</p>
                                    </div>
                                    <i class="fas fa-arrow-right text-blue-600"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    setupEventListeners() {
        // Helper function to safely add event listeners
        const safeAddListener = (id, event, handler) => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener(event, handler);
            } else {
                console.warn(`Element with id '${id}' not found`);
            }
        };

        // Recording controls
        safeAddListener('clinicianBtn', 'click', () => this.toggleRecording('Clinician'));
        safeAddListener('patientBtn', 'click', () => this.toggleRecording('Patient'));
        safeAddListener('pauseBtn', 'click', () => this.pauseRecording());
        safeAddListener('stopBtn', 'click', () => this.stopRecording());
        safeAddListener('generateBtn', 'click', () => this.generateSOAPNote());
        
        // Quick Action buttons
        safeAddListener('newSessionBtn', 'click', () => this.startNewSession());
        safeAddListener('templatesBtn', 'click', () => this.showTemplatesModal());
        safeAddListener('aiAssistBtn', 'click', () => this.showAIModal());
        
        // Modal controls
        safeAddListener('closeTemplatesModal', 'click', () => this.hideTemplatesModal());
        safeAddListener('closeAiModal', 'click', () => this.hideAIModal());
        
        // Specialty selector
        safeAddListener('specialtySelect', 'change', (e) => this.onSpecialtyChange(e.target.value));
        
        // SOAP actions
        safeAddListener('validateSoapBtn', 'click', () => this.validateSOAPNote());
        safeAddListener('printSoapBtn', 'click', () => this.printSOAPNote());
        safeAddListener('exportSoapBtn', 'click', () => this.exportSOAPNote());
        safeAddListener('clearSoapBtn', 'click', () => this.clearSOAPNote());
        
        // Emergency stop
        safeAddListener('emergencyStop', 'click', () => this.emergencyStop());
        
        // Add word count tracking for editable fields
        setTimeout(() => this.setupWordCountTracking(), 1000);
    }
    
    setupWordCountTracking() {
        document.querySelectorAll('[contenteditable="true"]').forEach(field => {
            field.addEventListener('input', () => {
                const fieldId = field.getAttribute('data-field');
                if (fieldId) {
                    this.updateWordCount(fieldId, field);
                }
            });
        });
    }
    
    updateWordCount(fieldId, field) {
        const text = field.textContent.trim();
        const wordCount = text ? text.split(/\s+/).length : 0;
        const countElement = document.getElementById(fieldId + 'WordCount');
        if (countElement) {
            countElement.textContent = `${wordCount} words`;
        }
    }
    
    initializeSpeechRecognition() {
        this.speechManager = new SpeechRecognitionManager({
            confidenceThreshold: MedScriptConfig.speech.confidenceThreshold
        });
        
        // Set up callbacks
        this.speechManager.setResultCallback((result) => this.handleSpeechResult(result));
        this.speechManager.setErrorCallback((error) => this.handleSpeechError(error));
        this.speechManager.setStatusChangeCallback((status, speaker) => this.handleStatusChange(status, speaker));
    }
    
    handleSpeechResult(result) {
        if (result.type === 'final') {
            this.addToTranscript(result);
        } else if (result.type === 'interim') {
            this.updateTranscriptDisplay(result.text);
        } else if (result.type === 'command') {
            this.handleVoiceCommand(result);
        }
    }
    
    handleSpeechError(error) {
        this.showNotification('error', 'Speech Recognition Error', error);
    }
    
    handleStatusChange(status, speaker) {
        this.updateRecordingUI(status, speaker);
    }
    
    handleVoiceCommand(result) {
        switch (result.command) {
            case 'switchToPatient':
                this.speechManager.switchSpeaker('Patient');
                break;
            case 'switchToClinician':
                this.speechManager.switchSpeaker('Clinician');
                break;
            case 'generateSOAPNote':
                this.generateSOAPNote();
                break;
            case 'pauseRecording':
                this.pauseRecording();
                break;
            case 'stopRecording':
                this.stopRecording();
                break;
            case 'addParagraphBreak':
                this.addParagraphBreak();
                break;
            case 'clearSOAPNote':
                this.clearSOAPNote();
                break;
        }
        
        this.showNotification('info', 'Voice Command', `Executed: "${result.commandText}"`);
    }
    
    // Continue with remaining methods...
    toggleRecording(speaker) {
        if (this.speechManager.isCurrentlyRecording() && this.speechManager.getCurrentSpeaker() === speaker) {
            this.stopRecording();
        } else {
            this.startRecording(speaker);
        }
    }
    
    startRecording(speaker) {
        if (this.speechManager.startRecording(speaker)) {
            this.showNotification('success', 'Recording Started', `Now recording ${speaker}`);
        }
    }
    
    pauseRecording() {
        if (this.speechManager.pauseRecording()) {
            this.showNotification('info', 'Recording Paused', 'Click a speaker to resume');
        }
    }
    
    stopRecording() {
        if (this.speechManager.stopRecording()) {
            this.showNotification('info', 'Recording Stopped', 'Ready to generate SOAP note');
        }
    }
    
    emergencyStop() {
        this.stopRecording();
        this.showNotification('warning', 'Emergency Stop', 'All recording stopped immediately');
    }
    
    addToTranscript(result) {
        const entry = {
            id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
            speaker: result.speaker,
            text: result.text,
            timestamp: result.timestamp,
            confidence: result.confidence
        };
        
        this.transcript.push(entry);
        this.updateTranscriptDisplay();
        this.updateWordCount();
        this.updateProgress();
    }
    
    updateTranscriptDisplay(interimText = '') {
        const container = document.getElementById('transcriptArea');
        let html = '';
        
        if (this.transcript.length > 0) {
            this.transcript.forEach((entry) => {
                const speakerClass = entry.speaker === 'Clinician' ? 'border-blue-500 bg-blue-50' : 'border-green-500 bg-green-50';
                const speakerTextClass = entry.speaker === 'Clinician' ? 'text-blue-900' : 'text-green-900';
                const iconClass = entry.speaker === 'Clinician' ? 'fas fa-user-md text-blue-600' : 'fas fa-user text-green-600';
                const confidenceIndicator = this.getConfidenceIndicator(entry.confidence);
                
                html += `
                    <div class="border-l-4 ${speakerClass} p-3 rounded-r-lg mb-3 transition-all duration-300">
                        <div class="flex items-center justify-between mb-2">
                            <div class="flex items-center space-x-2">
                                <i class="${iconClass} text-sm"></i>
                                <span class="font-semibold text-sm ${speakerTextClass}">${entry.speaker}</span>
                                ${confidenceIndicator}
                            </div>
                            <span class="text-xs text-gray-500">${new Date(entry.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <p class="text-sm text-gray-700 leading-relaxed">${entry.text}</p>
                    </div>
                `;
            });
        }
        
        if (interimText && this.speechManager.getCurrentSpeaker()) {
            const speaker = this.speechManager.getCurrentSpeaker();
            const speakerClass = speaker === 'Clinician' ? 'border-blue-300 bg-blue-25' : 'border-green-300 bg-green-25';
            const speakerTextClass = speaker === 'Clinician' ? 'text-blue-700' : 'text-green-700';
            const iconClass = speaker === 'Clinician' ? 'fas fa-user-md text-blue-600' : 'fas fa-user text-green-600';
            
            html += `
                <div class="border-l-4 ${speakerClass} p-3 rounded-r-lg mb-3 opacity-70">
                    <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center space-x-2">
                            <i class="${iconClass} text-sm"></i>
                            <span class="font-semibold text-sm ${speakerTextClass}">${speaker}</span>
                            <div class="flex space-x-1">
                                <div class="w-1 h-1 bg-current rounded-full animate-pulse"></div>
                                <div class="w-1 h-1 bg-current rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
                                <div class="w-1 h-1 bg-current rounded-full animate-pulse" style="animation-delay: 0.4s"></div>
                            </div>
                        </div>
                        <span class="text-xs text-gray-400 italic">speaking...</span>
                    </div>
                    <p class="text-sm text-gray-600 italic">${interimText}</p>
                </div>
            `;
        }
        
        if (this.transcript.length === 0 && !interimText) {
            html = `
                <div class="text-center text-gray-500 py-12">
                    <i class="fas fa-microphone-slash text-3xl mb-4 opacity-50"></i>
                    <p class="text-sm">Start recording to see live transcript</p>
                </div>
            `;
        }
        
        container.innerHTML = html;
        container.scrollTop = container.scrollHeight;
    }
    
    getConfidenceIndicator(confidence) {
        let color = 'bg-red-500';
        let title = 'Low confidence';
        
        if (confidence > 0.8) {
            color = 'bg-green-500';
            title = 'High confidence';
        } else if (confidence > 0.6) {
            color = 'bg-yellow-500';
            title = 'Medium confidence';
        }
        
        return `<div class="w-2 h-2 ${color} rounded-full" title="${title} (${Math.round(confidence * 100)}%)"></div>`;
    }
    
    updateRecordingUI(status, speaker) {
        const statusIndicator = document.getElementById('statusIndicator');
        const voiceViz = document.getElementById('voiceViz');
        const pauseBtn = document.getElementById('pauseBtn');
        const stopBtn = document.getElementById('stopBtn');
        const clinicianBtn = document.getElementById('clinicianBtn');
        const patientBtn = document.getElementById('patientBtn');
        
        // Reset pulse animations
        if (clinicianBtn) clinicianBtn.classList.remove('pulse-recording');
        if (patientBtn) patientBtn.classList.remove('pulse-recording');
        
        switch (status) {
            case 'recording':
                if (statusIndicator) {
                    statusIndicator.className = 'status-recording';
                    statusIndicator.innerHTML = `<i class="fas fa-circle text-xs"></i><span>Recording ${speaker}</span>`;
                }
                if (voiceViz) voiceViz.style.opacity = '1';
                if (pauseBtn) pauseBtn.classList.remove('hidden');
                if (stopBtn) stopBtn.classList.remove('hidden');
                
                if (speaker === 'Clinician' && clinicianBtn) {
                    clinicianBtn.classList.add('pulse-recording');
                } else if (speaker === 'Patient' && patientBtn) {
                    patientBtn.classList.add('pulse-recording');
                }
                break;
                
            case 'paused':
            case 'stopped':
                if (statusIndicator) {
                    statusIndicator.className = 'status-ready';
                    statusIndicator.innerHTML = '<i class="fas fa-circle text-xs"></i><span>Ready</span>';
                }
                if (voiceViz) voiceViz.style.opacity = '0';
                if (pauseBtn) pauseBtn.classList.add('hidden');
                if (stopBtn) stopBtn.classList.add('hidden');
                break;
                
            case 'error':
                if (statusIndicator) {
                    statusIndicator.className = 'status-indicator bg-red-100 text-red-800';
                    statusIndicator.innerHTML = '<i class="fas fa-exclamation-triangle text-xs"></i><span>Error</span>';
                }
                if (voiceViz) voiceViz.style.opacity = '0';
                if (pauseBtn) pauseBtn.classList.add('hidden');
                if (stopBtn) stopBtn.classList.add('hidden');
                break;
        }
    }
    
    // Additional methods for templates, SOAP generation, etc.
    showTemplatesModal() {
        const modal = document.getElementById('templatesModal');
        const grid = document.getElementById('templatesGrid');
        
        if (!modal || !grid) return;
        
        // Load templates from MedScriptTemplates
        const templates = Object.entries(MedScriptTemplates.soapTemplates).map(([name, template]) => ({
            name,
            ...template
        }));
        
        grid.innerHTML = templates.map((template, index) => `
            <div class="template-card bg-white border-2 border-gray-200 hover:border-${template.color}-300 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105" data-template-index="${index}">
                <div class="flex items-center mb-3">
                    <div class="w-10 h-10 bg-${template.color}-100 rounded-lg flex items-center justify-center mr-3">
                        <i class="${template.icon} text-${template.color}-600"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-gray-900 text-sm">${template.name}</h4>
                        <p class="text-xs text-gray-600">${template.specialty}</p>
                    </div>
                </div>
                <p class="text-xs text-gray-500">${template.description}</p>
                <div class="mt-3 pt-3 border-t border-gray-100">
                    <div class="flex items-center justify-between">
                        <span class="text-xs text-gray-500">Click to apply</span>
                        <i class="fas fa-arrow-right text-${template.color}-500 text-xs"></i>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Add click handlers
        grid.querySelectorAll('.template-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                card.classList.add('animate-pulse');
                setTimeout(() => card.classList.remove('animate-pulse'), 500);
                this.loadTemplate(templates[index]);
            });
        });
        
        modal.classList.remove('hidden');
    }
    
    hideTemplatesModal() {
        const modal = document.getElementById('templatesModal');
        if (modal) modal.classList.add('hidden');
    }
    
    loadTemplate(template) {
        this.showNotification('info', 'Loading Template', `Applying ${template.name} template...`);
        
        // Update specialty
        const specialtySelect = document.getElementById('specialtySelect');
        if (specialtySelect && template.specialty) {
            const specialtyMap = {
                'General Medicine': 'general',
                'Cardiology': 'cardiology',
                'Pediatrics': 'pediatrics',
                'Psychiatry': 'psychiatry',
                'Internal Medicine': 'general',
                'Endocrinology': 'endocrinology'
            };
            const specialtyValue = specialtyMap[template.specialty];
            if (specialtyValue) {
                specialtySelect.value = specialtyValue;
                this.onSpecialtyChange(specialtyValue);
            }
        }
        
        // Populate SOAP fields
        setTimeout(() => {
            if (template.data) {
                this.populateSOAPFields(template.data, template.specialty);
            }
            this.hideTemplatesModal();
            this.showNotification('success', 'Template Applied', `${template.name} template loaded successfully`);
            this.updateProgress();
        }, 300);
    }
    
    populateSOAPFields(data, specialty) {
        const fieldMap = {
            'chiefComplaint': data.chiefComplaint,
            'presentIllness': data.presentIllness,
            'reviewSystems': data.reviewSystems || this.getSpecialtySpecificContent(specialty, 'ros'),
            'vitalSigns': data.vitalSigns,
            'physicalExam': this.getSpecialtySpecificContent(specialty, 'exam'),
            'diagnosticResults': 'Laboratory and imaging studies as clinically indicated',
            'primaryDiagnosis': data.primaryDiagnosis,
            'differentialDx': this.getSpecialtySpecificContent(specialty, 'differential'),
            'clinicalImpression': `${specialty} evaluation completed as outlined above`,
            'medications': this.getSpecialtySpecificContent(specialty, 'medications'),
            'procedures': 'Procedures and interventions as indicated',
            'followUp': 'Follow-up as recommended for condition management',
            'patientEducation': 'Patient education provided regarding condition and treatment plan'
        };
        
        Object.entries(fieldMap).forEach(([fieldId, content]) => {
            const field = document.querySelector(`[data-field="${fieldId}"]`);
            if (field && content) {
                field.textContent = content;
                this.animateFieldUpdate(field);
                this.updateWordCount(fieldId, field);
            }
        });
    }
    
    getSpecialtySpecificContent(specialty, section) {
        const specialtyContent = {
            'Cardiology': {
                ros: 'Cardiovascular: Chest pain, palpitations, dyspnea, orthopnea, PND, lower extremity edema as per HPI. All other systems negative.',
                exam: 'Cardiovascular: Rate, rhythm, heart sounds, murmurs, peripheral pulses, JVD assessment. Respiratory: Breath sounds, signs of CHF.',
                differential: 'Coronary artery disease, heart failure, arrhythmias, valvular disease',
                medications: 'Cardiac medications as appropriate: ACE inhibitors, beta-blockers, statins, antiplatelet therapy'
            },
            'Pediatrics': {
                ros: 'Constitutional: Fever, appetite, energy level. Growth/Development: Meeting milestones. Behavioral: Age-appropriate responses.',
                exam: 'General: Growth parameters plotted. Developmental: Age-appropriate milestones assessed. Complete pediatric examination.',
                differential: 'Age-appropriate differential diagnoses considered',
                medications: 'Pediatric dosing and age-appropriate medications as indicated'
            },
            'Psychiatry': {
                ros: 'Psychiatric: Mood, anxiety, sleep patterns, appetite, concentration, suicidal ideation. Substance use reviewed.',
                exam: 'Mental Status: Appearance, behavior, speech, mood, affect, thought process/content, perceptions, cognition, insight, judgment.',
                differential: 'Mood disorders, anxiety disorders, adjustment disorders, substance use disorders',
                medications: 'Psychotropic medications as appropriate with consideration of side effects and monitoring'
            }
        };
        
        const content = specialtyContent[specialty] || {
            ros: 'Review of systems negative except as noted in HPI',
            exam: 'General: Well-appearing. Complete examination as appropriate.',
            differential: 'Differential diagnoses based on clinical presentation',
            medications: 'Medications as clinically appropriate'
        };
        
        return content[section] || 'Content appropriate for specialty evaluation';
    }
    
    animateFieldUpdate(field) {
        if (field) {
            field.style.borderColor = '#10b981';
            field.style.borderStyle = 'solid';
            field.style.backgroundColor = '#ecfdf5';
            field.classList.add('animate-pulse');
            
            setTimeout(() => {
                field.classList.remove('animate-pulse');
                field.style.backgroundColor = '';
                setTimeout(() => {
                    field.style.borderStyle = 'dashed';
                    field.style.borderColor = '#e5e7eb';
                }, 1000);
            }, 1000);
        }
    }
    
    showAIModal() {
        const modal = document.getElementById('aiModal');
        if (modal) modal.classList.remove('hidden');
    }
    
    hideAIModal() {
        const modal = document.getElementById('aiModal');
        if (modal) modal.classList.add('hidden');
    }
    
    onSpecialtyChange(specialty) {
        const specialtyNames = {
            'general': 'General Medicine',
            'cardiology': 'Cardiology',
            'pediatrics': 'Pediatrics',
            'psychiatry': 'Psychiatry',
            'orthopedics': 'Orthopedics',
            'dermatology': 'Dermatology',
            'neurology': 'Neurology',
            'emergency': 'Emergency Medicine',
            'oncology': 'Oncology',
            'endocrinology': 'Endocrinology'
        };
        
        const displayName = specialtyNames[specialty] || 'General Medicine';
        
        // Update specialty badge
        const specialtyBadge = document.getElementById('specialtyBadge');
        if (specialtyBadge) {
            specialtyBadge.textContent = displayName;
            specialtyBadge.style.transform = 'scale(1.1)';
            specialtyBadge.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            setTimeout(() => {
                specialtyBadge.style.transform = 'scale(1)';
                specialtyBadge.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            }, 300);
        }
        
        this.currentSpecialty = specialty;
        this.showNotification('info', 'Specialty Updated', `Documentation mode set to ${displayName}`);
    }
    
    async generateSOAPNote() {
        if (this.transcript.length === 0) {
            this.showNotification('warning', 'No Data', 'No conversation to analyze. Please record some dialogue first.');
            return;
        }
        
        const statusIndicator = document.getElementById('statusIndicator');
        if (statusIndicator) {
            statusIndicator.className = 'status-processing';
            statusIndicator.innerHTML = '<i class="fas fa-spinner fa-spin text-xs"></i><span>Generating SOAP...</span>';
        }
        
        try {
            const qualityLevel = document.getElementById('qualityLevel')?.value || 'standard';
            this.showNotification('info', 'AI Processing', 'Analyzing conversation with medical AI...');
            
            const conversationText = this.transcript
                .map(entry => `${entry.speaker}: ${entry.text}`)
                .join('\n');
            
            const soapNote = await this.processWithAI(conversationText, this.currentSpecialty, qualityLevel);
            this.populateSOAPNote(soapNote);
            
            if (statusIndicator) {
                statusIndicator.className = 'status-ready';
                statusIndicator.innerHTML = '<i class="fas fa-check text-xs"></i><span>Complete</span>';
            }
            
            this.showNotification('success', 'SOAP Note Generated', 'AI analysis complete');
            this.updateProgress();
            
        } catch (error) {
            console.error('SOAP generation error:', error);
            if (statusIndicator) {
                statusIndicator.className = 'status-ready';
                statusIndicator.innerHTML = '<i class="fas fa-exclamation-triangle text-xs"></i><span>Error</span>';
            }
            this.showNotification('error', 'Generation Failed', 'AI processing failed. Using mock data for demo.');
            this.populateSOAPNote(JSON.stringify(TemplateUtils.generateMockSOAP(this.currentSpecialty)));
        }
    }
    
    async processWithAI(conversationText, specialty, quality) {
        // This would normally call your AI API
        // For now, return mock data
        return JSON.stringify(TemplateUtils.generateMockSOAP(specialty));
    }
    
    populateSOAPNote(soapText) {
        try {
            const jsonMatch = soapText.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('No valid JSON found in AI response');
            }
            
            const soapData = JSON.parse(jsonMatch[0]);
            
            // Populate patient info
            if (soapData.patientInfo) {
                this.setFieldContent('patientName', soapData.patientInfo.name);
                this.setFieldContent('patientDOB', soapData.patientInfo.dob);
                this.setFieldContent('patientMRN', soapData.patientInfo.mrn);
            }
            
            // Populate SOAP sections
            const sectionMap = {
                subjective: ['chiefComplaint', 'presentIllness', 'reviewSystems', 'pastMedicalHistory'],
                objective: ['vitalSigns', 'physicalExam', 'diagnosticResults'],
                assessment: ['primaryDiagnosis', 'differentialDx', 'clinicalImpression'],
                plan: ['medications', 'procedures', 'followUp', 'patientEducation']
            };
            
            Object.entries(sectionMap).forEach(([section, fields]) => {
                if (soapData[section]) {
                    fields.forEach(field => {
                        if (soapData[section][field]) {
                            this.setFieldContent(field, soapData[section][field]);
                        }
                    });
                }
            });
            
            this.showNotification('success', 'SOAP Note Populated', 'All sections updated with AI analysis');
            
        } catch (error) {
            console.error('Error populating SOAP note:', error);
            this.showNotification('error', 'Parse Error', 'Failed to parse AI response');
        }
    }
    
    setFieldContent(fieldId, content) {
        const field = document.querySelector(`[data-field="${fieldId}"]`);
        if (field && content) {
            field.textContent = content;
            this.animateFieldUpdate(field);
            this.updateWordCount(fieldId, field);
        }
    }
    
    startNewSession() {
        if (this.transcript.length > 0) {
            if (!confirm('Start a new session? This will clear the current transcript and SOAP note. Are you sure?')) {
                return;
            }
        }
        
        this.transcript = [];
        this.sessionStartTime = new Date();
        this.sessionId = this.generateSessionId();
        
        this.stopRecording();
        this.clearSOAPNoteQuiet();
        this.updateProgress();
        
        const transcriptArea = document.getElementById('transcriptArea');
        if (transcriptArea) {
            transcriptArea.innerHTML = `
                <div class="text-center text-gray-500 py-12">
                    <i class="fas fa-microphone-slash text-3xl mb-4 opacity-50"></i>
                    <p class="text-sm">Start recording to see live transcript</p>
                </div>
            `;
        }
        
        this.updateWordCount();
        this.showNotification('success', 'New Session Started', 'Ready to begin a new medical documentation session');
    }
    
    clearSOAPNote() {
        if (confirm('Clear the current SOAP note? This action cannot be undone.')) {
            this.clearSOAPNoteQuiet();
            this.showNotification('success', 'SOAP Note Cleared', 'Ready for new conversation');
        }
    }
    
    clearSOAPNoteQuiet() {
        document.querySelectorAll('[contenteditable="true"]').forEach(field => {
            const fieldId = field.getAttribute('data-field');
            if (fieldId) {
                const placeholders = this.getSOAPFieldsForSection('subjective')
                    .concat(this.getSOAPFieldsForSection('objective'))
                    .concat(this.getSOAPFieldsForSection('assessment'))
                    .concat(this.getSOAPFieldsForSection('plan'));
                
                const placeholder = placeholders.find(p => p.id === fieldId);
                field.textContent = placeholder ? placeholder.placeholder : 'Content will appear here...';
            } else {
                // Patient info fields
                if (field.textContent.includes('Patient Name')) field.textContent = 'Patient Name';
                else if (field.textContent.includes('MM/DD/YYYY')) field.textContent = 'MM/DD/YYYY';
                else if (field.textContent.includes('MRN')) field.textContent = 'MRN-123456';
            }
            
            field.style.borderStyle = 'dashed';
            field.style.borderColor = '#e5e7eb';
        });
    }
    
    validateSOAPNote() {
        const issues = [];
        const requiredFields = ['chiefComplaint', 'presentIllness', 'physicalExam', 'primaryDiagnosis'];
        
        requiredFields.forEach(fieldId => {
            const field = document.querySelector(`[data-field="${fieldId}"]`);
            if (!field || field.textContent.trim().length < 10) {
                issues.push(`${fieldId.replace(/([A-Z])/g, ' $1').toLowerCase()} needs more detail`);
            }
        });
        
        if (issues.length === 0) {
            this.showNotification('success', 'Validation Passed', 'SOAP note meets quality standards');
        } else {
            this.showNotification('warning', 'Validation Issues', `${issues.length} items need attention`);
        }
    }
    
    printSOAPNote() {
        window.print();
    }
    
    exportSOAPNote() {
        const soapData = this.collectSOAPData();
        const exportData = {
            metadata: {
                sessionId: this.sessionId,
                generatedAt: new Date().toISOString(),
                specialty: this.currentSpecialty,
                provider: 'MedScript Pro'
            },
            ...soapData,
            originalTranscript: this.transcript
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        a.href = url;
        a.download = `soap-note-${this.sessionId}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('success', 'SOAP Note Exported', 'File downloaded successfully');
    }
    
    collectSOAPData() {
        const data = {};
        
        // Collect all SOAP field data
        document.querySelectorAll('[data-field]').forEach(field => {
            const fieldId = field.getAttribute('data-field');
            data[fieldId] = field.textContent.trim();
        });
        
        return data;
    }
    
    updateWordCount() {
        const totalWords = this.transcript.reduce((count, entry) => {
            return count + entry.text.split(/\s+/).length;
        }, 0);
        
        const avgConfidence = this.transcript.length > 0 ? 
            this.transcript.reduce((sum, entry) => sum + entry.confidence, 0) / this.transcript.length : 0;
        
        const wordCountEl = document.getElementById('wordCount');
        const confidenceEl = document.getElementById('confidence');
        
        if (wordCountEl) wordCountEl.textContent = `${totalWords} words`;
        if (confidenceEl) confidenceEl.textContent = `Confidence: ${Math.round(avgConfidence * 100)}%`;
    }
    
    updateProgress() {
        const progressFill = document.getElementById('progressFill');
        const progressPercent = document.getElementById('progressPercent');
        
        if (!progressFill || !progressPercent) return;
        
        // Calculate progress based on filled fields
        const allFields = document.querySelectorAll('[data-field]');
        const filledFields = Array.from(allFields).filter(field => 
            field.textContent.trim().length > 20 && 
            !field.textContent.includes('will appear here')
        );
        
        const progress = Math.round((filledFields.length / allFields.length) * 100);
        progressFill.style.width = `${progress}%`;
        progressPercent.textContent = `${progress}%`;
    }
    
    addParagraphBreak() {
        if (this.transcript.length > 0) {
            const lastEntry = this.transcript[this.transcript.length - 1];
            lastEntry.text += '\n\n[Paragraph Break]';
            this.updateTranscriptDisplay();
            this.showNotification('info', 'Paragraph Break', 'Added line break to transcript');
        }
    }
    
    startSessionTimer() {
        setInterval(() => {
            const elapsed = Math.floor((new Date() - this.sessionStartTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            const timeEl = document.getElementById('sessionTime');
            if (timeEl) {
                timeEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        }, 1000);
    }
    
    updateCurrentDate() {
        const dateEl = document.getElementById('currentDate');
        if (dateEl) {
            dateEl.textContent = new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    }
    
    showWelcomeNotification() {
        setTimeout(() => {
            this.showNotification('info', 'MedScript Pro Ready', 'Click on Clinician or Patient to start voice recording');
            
            // Force update specialty display
            const specialtySelect = document.getElementById('specialtySelect');
            if (specialtySelect) {
                this.onSpecialtyChange(specialtySelect.value);
            }
        }, 1000);
    }
    
    showNotification(type, title, message) {
        const notification = document.getElementById('notification');
        const icon = document.getElementById('notificationIcon');
        const titleEl = document.getElementById('notificationTitle');
        const messageEl = document.getElementById('notificationMessage');
        
        if (!notification || !icon || !titleEl || !messageEl) return;
        
        const icons = {
            success: '<i class="fas fa-check text-white"></i>',
            error: '<i class="fas fa-exclamation-circle text-white"></i>',
            warning: '<i class="fas fa-exclamation-triangle text-white"></i>',
            info: '<i class="fas fa-info-circle text-white"></i>'
        };
        
        const colors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            warning: 'bg-yellow-500',
            info: 'bg-blue-500'
        };
        
        icon.className = `w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colors[type]}`;
        icon.innerHTML = icons[type];
        titleEl.textContent = title;
        messageEl.textContent = message;
        
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, MedScriptConfig.ui.notificationDuration || 5000);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MedScriptPro;
}