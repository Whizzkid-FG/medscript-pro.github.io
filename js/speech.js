// MedScript Pro - Speech Recognition Module
class SpeechRecognitionManager {
    constructor(config) {
        this.recognition = null;
        this.isRecording = false;
        this.currentSpeaker = null;
        this.confidenceThreshold = config.confidenceThreshold || 0.7;
        this.onResultCallback = null;
        this.onErrorCallback = null;
        this.onStatusChangeCallback = null;
        
        this.initializeSpeechRecognition();
    }

    initializeSpeechRecognition() {
        // Check if speech recognition is available
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            console.error('Speech recognition not supported in this browser');
            this.handleError('Browser not supported. Please use Chrome, Safari, or Edge.');
            return;
        }

        try {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            
            this.recognition.continuous = true;
            this.recognition.interimResults = true;
            this.recognition.lang = 'en-US';
            this.recognition.maxAlternatives = 3;
            
            this.recognition.onstart = () => {
                console.log('Speech recognition started');
                this.isRecording = true;
                this.notifyStatusChange('recording');
            };
            
            this.recognition.onresult = (event) => {
                this.processRecognitionResult(event);
            };
            
            this.recognition.onend = () => {
                console.log('Speech recognition ended');
                if (this.isRecording && this.currentSpeaker) {
                    // Restart recognition if we're still supposed to be recording
                    setTimeout(() => {
                        if (this.isRecording) {
                            try {
                                this.recognition.start();
                            } catch (e) {
                                console.error('Failed to restart recognition:', e);
                                this.handleError('Failed to restart speech recognition');
                            }
                        }
                    }, 100);
                } else {
                    this.notifyStatusChange('stopped');
                }
            };
            
            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event);
                this.handleRecognitionError(event);
            };
            
            // Test speech recognition availability
            this.testSpeechRecognition();
            
        } catch (error) {
            console.error('Error initializing speech recognition:', error);
            this.handleError('Failed to initialize speech recognition: ' + error.message);
        }
    }

    testSpeechRecognition() {
        try {
            // Try to create a test recognition instance
            const testRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            console.log('Speech recognition test successful');
            this.notifyStatusChange('ready');
        } catch (error) {
            console.error('Speech recognition test failed:', error);
            this.handleError('Speech recognition test failed: ' + error.message);
        }
    }

    startRecording(speaker) {
        if (!this.recognition) {
            this.handleError('Speech recognition not available');
            return false;
        }

        if (this.isRecording && this.currentSpeaker === speaker) {
            return true; // Already recording for this speaker
        }

        // Stop current recording if switching speakers
        if (this.isRecording) {
            this.recognition.stop();
        }

        this.currentSpeaker = speaker;
        
        try {
            this.recognition.start();
            return true;
        } catch (error) {
            console.error('Failed to start recognition:', error);
            this.handleError('Failed to start speech recognition');
            return false;
        }
    }

    pauseRecording() {
        if (this.isRecording && this.recognition) {
            this.recognition.stop();
            this.isRecording = false;
            this.notifyStatusChange('paused');
            return true;
        }
        return false;
    }

    stopRecording() {
        this.isRecording = false;
        this.currentSpeaker = null;
        
        if (this.recognition) {
            this.recognition.stop();
        }
        
        this.notifyStatusChange('stopped');
        return true;
    }

    processRecognitionResult(event) {
        let interimTranscript = '';
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            const transcript = result[0].transcript;
            const confidence = result[0].confidence || 0;
            
            if (result.isFinal) {
                // Check for voice commands first
                if (this.processVoiceCommand(transcript)) {
                    // Voice command was processed, don't add to transcript
                    continue;
                }
                
                if (confidence >= this.confidenceThreshold) {
                    finalTranscript += transcript;
                    this.notifyResult({
                        type: 'final',
                        speaker: this.currentSpeaker,
                        text: transcript.trim(),
                        confidence: confidence,
                        timestamp: new Date().toISOString()
                    });
                }
            } else {
                interimTranscript += transcript;
            }
        }
        
        // Send interim results
        if (interimTranscript && this.onResultCallback) {
            this.notifyResult({
                type: 'interim',
                speaker: this.currentSpeaker,
                text: interimTranscript,
                confidence: 0,
                timestamp: new Date().toISOString()
            });
        }
    }

    processVoiceCommand(text) {
        const command = text.toLowerCase().trim();
        
        // Define voice commands with their actions
        const voiceCommands = {
            'switch to patient': 'switchToPatient',
            'switch to clinician': 'switchToClinician',
            'switch to doctor': 'switchToClinician',
            'new paragraph': 'addParagraphBreak',
            'paragraph break': 'addParagraphBreak',
            'generate soap': 'generateSOAPNote',
            'generate soap note': 'generateSOAPNote',
            'pause recording': 'pauseRecording',
            'stop recording': 'stopRecording',
            'clear note': 'clearSOAPNote'
        };
        
        // Check if the command matches any voice commands
        for (const [commandText, action] of Object.entries(voiceCommands)) {
            if (command.includes(commandText)) {
                this.notifyResult({
                    type: 'command',
                    command: action,
                    commandText: commandText,
                    originalText: text
                });
                return true;
            }
        }
        
        return false; // No command found
    }

    handleRecognitionError(event) {
        console.error('Speech recognition error details:', event);
        let message = 'Speech recognition error occurred';
        let solution = '';
        
        switch (event.error) {
            case 'no-speech':
                return; // Don't handle this as an error
            case 'audio-capture':
                message = 'Microphone not accessible';
                solution = 'Check if microphone is connected and try refreshing the page';
                break;
            case 'not-allowed':
                message = 'Microphone permission denied';
                solution = 'Click the microphone icon in your address bar and allow access';
                break;
            case 'network':
                message = 'Network error during recognition';
                solution = 'Check your internet connection and try again';
                break;
            case 'service-not-allowed':
                message = 'Speech service not allowed';
                solution = 'Try using HTTPS instead of HTTP, or switch to Chrome browser';
                break;
            default:
                message = `Recognition error: ${event.error}`;
                solution = 'Try refreshing the page or switching to Chrome browser';
        }
        
        this.handleError(message + (solution ? '. ' + solution : ''));
        this.stopRecording();
    }

    handleError(message) {
        this.notifyStatusChange('error');
        if (this.onErrorCallback) {
            this.onErrorCallback(message);
        }
    }

    notifyResult(result) {
        if (this.onResultCallback) {
            this.onResultCallback(result);
        }
    }

    notifyStatusChange(status) {
        if (this.onStatusChangeCallback) {
            this.onStatusChangeCallback(status, this.currentSpeaker);
        }
    }

    // Public API methods
    setResultCallback(callback) {
        this.onResultCallback = callback;
    }

    setErrorCallback(callback) {
        this.onErrorCallback = callback;
    }

    setStatusChangeCallback(callback) {
        this.onStatusChangeCallback = callback;
    }

    setConfidenceThreshold(threshold) {
        this.confidenceThreshold = Math.max(0, Math.min(1, threshold));
    }

    getCurrentSpeaker() {
        return this.currentSpeaker;
    }

    isCurrentlyRecording() {
        return this.isRecording;
    }

    switchSpeaker(newSpeaker) {
        if (this.isRecording) {
            this.startRecording(newSpeaker);
        } else {
            this.currentSpeaker = newSpeaker;
        }
    }

    getAvailableLanguages() {
        // Common languages supported by most browsers
        return [
            { code: 'en-US', name: 'English (US)' },
            { code: 'en-GB', name: 'English (UK)' },
            { code: 'es-ES', name: 'Spanish' },
            { code: 'fr-FR', name: 'French' },
            { code: 'de-DE', name: 'German' },
            { code: 'it-IT', name: 'Italian' },
            { code: 'pt-BR', name: 'Portuguese (Brazil)' },
            { code: 'ja-JP', name: 'Japanese' },
            { code: 'ko-KR', name: 'Korean' },
            { code: 'zh-CN', name: 'Chinese (Simplified)' }
        ];
    }

    setLanguage(languageCode) {
        if (this.recognition) {
            this.recognition.lang = languageCode;
        }
    }

    // Utility methods
    isSupported() {
        return ('webkitSpeechRecognition' in window) || ('SpeechRecognition' in window);
    }

    getBrowserSupport() {
        const userAgent = navigator.userAgent.toLowerCase();
        
        if (userAgent.includes('chrome')) {
            return { browser: 'Chrome', supported: true, quality: 'excellent' };
        } else if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
            return { browser: 'Safari', supported: true, quality: 'good' };
        } else if (userAgent.includes('edge')) {
            return { browser: 'Edge', supported: true, quality: 'good' };
        } else if (userAgent.includes('firefox')) {
            return { browser: 'Firefox', supported: false, quality: 'none' };
        } else {
            return { browser: 'Unknown', supported: false, quality: 'unknown' };
        }
    }

    // Debug methods
    getRecognitionState() {
        return {
            isRecording: this.isRecording,
            currentSpeaker: this.currentSpeaker,
            confidenceThreshold: this.confidenceThreshold,
            recognitionAvailable: !!this.recognition,
            browserSupport: this.getBrowserSupport()
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SpeechRecognitionManager;
}