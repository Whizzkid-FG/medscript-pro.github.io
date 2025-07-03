// MedScript Pro - Configuration File
const MedScriptConfig = {
    // AI Provider Configuration
    ai: {
        primary: {
            provider: 'openai',
            apiKey: 'your-openai-api-key-here', // Replace with your actual OpenAI API key
            model: 'gpt-4',
            baseURL: 'https://api.openai.com/v1/chat/completions'
        },
        fallback: {
            provider: 'anthropic',
            apiKey: 'your-anthropic-api-key-here', // Replace with your actual Anthropic API key
            model: 'claude-3-sonnet-20240229',
            baseURL: 'https://api.anthropic.com/v1/messages'
        },
        settings: {
            temperature: 0.3,
            maxTokens: 4000,
            timeout: 30000 // 30 seconds
        }
    },

    // Speech Recognition Configuration
    speech: {
        language: 'en-US',
        continuous: true,
        interimResults: true,
        maxAlternatives: 3,
        confidenceThreshold: 0.7
    },

    // Application Settings
    app: {
        name: 'MedScript Pro',
        version: '2.0.0',
        autoSaveInterval: 30000, // 30 seconds
        sessionTimeout: 3600000, // 1 hour
        maxTranscriptEntries: 1000
    },

    // UI Configuration
    ui: {
        notificationDuration: 5000, // 5 seconds
        animationDuration: 300,
        themes: {
            default: 'light',
            options: ['light', 'dark', 'clinical']
        }
    },

    // Quality Level Prompts
    qualityPrompts: {
        fast: 'Provide a concise but complete SOAP note with essential details.',
        standard: 'Provide a comprehensive SOAP note with appropriate clinical detail and reasoning.',
        high: 'Provide a detailed, thorough SOAP note with extensive clinical reasoning, differential diagnoses, and specialty-specific considerations.'
    },

    // Medical Specialties Configuration
    specialties: {
        general: {
            name: 'General Medicine',
            context: 'general internal medicine',
            focus: 'comprehensive primary care evaluation'
        },
        cardiology: {
            name: 'Cardiology',
            context: 'cardiology with focus on cardiovascular conditions',
            focus: 'cardiac assessment and cardiovascular risk factors'
        },
        pediatrics: {
            name: 'Pediatrics',
            context: 'pediatrics with age-appropriate considerations',
            focus: 'pediatric development and age-specific conditions'
        },
        psychiatry: {
            name: 'Psychiatry',
            context: 'psychiatry with mental health focus',
            focus: 'mental status examination and psychiatric conditions'
        },
        orthopedics: {
            name: 'Orthopedics',
            context: 'orthopedics with musculoskeletal focus',
            focus: 'musculoskeletal examination and movement disorders'
        },
        dermatology: {
            name: 'Dermatology',
            context: 'dermatology with skin condition focus',
            focus: 'dermatological examination and skin pathology'
        },
        neurology: {
            name: 'Neurology',
            context: 'neurology with neurological condition focus',
            focus: 'neurological examination and nervous system disorders'
        },
        emergency: {
            name: 'Emergency Medicine',
            context: 'emergency medicine with acute care focus',
            focus: 'acute presentation and emergency stabilization'
        },
        oncology: {
            name: 'Oncology',
            context: 'oncology with cancer care focus',
            focus: 'cancer staging, treatment response, and supportive care'
        },
        endocrinology: {
            name: 'Endocrinology',
            context: 'endocrinology with hormonal disorder focus',
            focus: 'endocrine system evaluation and metabolic disorders'
        }
    },

    // Voice Commands Configuration
    voiceCommands: {
        'switch to patient': 'switchToPatient',
        'switch to clinician': 'switchToClinician',
        'switch to doctor': 'switchToClinician',
        'new paragraph': 'addParagraphBreak',
        'paragraph break': 'addParagraphBreak',
        'generate soap': 'generateSOAPNote',
        'generate soap note': 'generateSOAPNote',
        'pause recording': 'pauseRecording',
        'stop recording': 'stopRecording',
        'start recording': 'startRecording',
        'clear note': 'clearSOAPNote',
        'save note': 'autoSave',
        'new session': 'startNewSession'
    },

    // Validation Rules
    validation: {
        requiredFields: [
            { id: 'chiefComplaint', name: 'Chief Complaint', minLength: 10 },
            { id: 'presentIllness', name: 'History of Present Illness', minLength: 20 },
            { id: 'physicalExam', name: 'Physical Examination', minLength: 15 },
            { id: 'primaryDiagnosis', name: 'Primary Diagnosis', minLength: 5 },
            { id: 'medications', name: 'Medications/Plan', minLength: 10 }
        ],
        wordCountLimits: {
            chiefComplaint: { min: 3, max: 50 },
            presentIllness: { min: 20, max: 500 },
            physicalExam: { min: 10, max: 300 },
            primaryDiagnosis: { min: 2, max: 100 }
        }
    },

    // Export Settings
    export: {
        formats: ['json', 'txt', 'pdf'],
        fileNameTemplate: 'soap-note-{sessionId}-{timestamp}',
        includeMetadata: true,
        includeTranscript: true
    },

    // Development/Debug Settings
    debug: {
        enabled: false, // Set to true for development
        logLevel: 'info', // 'error', 'warn', 'info', 'debug'
        mockAI: false, // Set to true to use mock AI responses
        showTimings: false
    }
};

// Utility function to get configuration values
function getConfig(path) {
    return path.split('.').reduce((obj, key) => obj && obj[key], MedScriptConfig);
}

// Utility function to check if API keys are configured
function areAPIKeysConfigured() {
    const primaryKey = getConfig('ai.primary.apiKey');
    const fallbackKey = getConfig('ai.fallback.apiKey');
    
    return (primaryKey && primaryKey !== 'your-openai-api-key-here') ||
           (fallbackKey && fallbackKey !== 'your-anthropic-api-key-here');
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MedScriptConfig, getConfig, areAPIKeysConfigured };
}