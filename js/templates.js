// MedScript Pro - Medical Templates and Data
const MedScriptTemplates = {
    // SOAP Note Templates
    soapTemplates: {
        'Annual Physical': {
            specialty: 'General Medicine',
            description: 'Routine annual examination template',
            icon: 'fas fa-heartbeat',
            color: 'blue',
            data: {
                chiefComplaint: 'Annual physical examination',
                presentIllness: 'Patient presents for routine annual physical examination. Reports feeling well overall with no acute complaints.',
                reviewSystems: `Constitutional: Denies fever, chills, fatigue, unintentional weight loss or gain
Cardiovascular: Denies chest pain, shortness of breath, palpitations, orthopnea, PND, lower extremity edema
Respiratory: Denies cough, dyspnea, wheezing, hemoptysis
Gastrointestinal: Denies abdominal pain, nausea, vomiting, diarrhea, constipation, melena, hematochezia
Genitourinary: Denies dysuria, frequency, urgency, hematuria
Musculoskeletal: Denies joint pain, stiffness, swelling
Neurological: Denies headache, dizziness, weakness, numbness, tingling
Psychiatric: Denies depression, anxiety, sleep disturbances`,
                vitalSigns: 'BP: ___/___  HR: ___  RR: ___  Temp: ___°F  O2 Sat: ___%  BMI: ___',
                primaryDiagnosis: 'Z00.00 - Encounter for general adult medical examination without abnormal findings'
            }
        },
        
        'Chest Pain Evaluation': {
            specialty: 'Cardiology',
            description: 'Comprehensive chest pain assessment',
            icon: 'fas fa-heart',
            color: 'red',
            data: {
                chiefComplaint: 'Chest pain',
                presentIllness: `Patient presents with chest pain. 
Onset: [TIME - sudden vs gradual]
Duration: [DURATION]
Location: [substernal, left-sided, right-sided, radiating]
Quality: [sharp, dull, pressure, burning, stabbing]
Severity: [1-10 scale]
Aggravating factors: [exertion, position, breathing, eating]
Alleviating factors: [rest, nitroglycerin, antacids, position change]
Associated symptoms: [SOB, diaphoresis, nausea, palpitations]`,
                vitalSigns: 'BP: ___/___  HR: ___  RR: ___  O2 Sat: ___%  Pain: ___/10',
                primaryDiagnosis: 'R07.89 - Other chest pain'
            }
        },

        'Pediatric Well Visit': {
            specialty: 'Pediatrics',
            description: 'Well child examination template',
            icon: 'fas fa-baby',
            color: 'green',
            data: {
                chiefComplaint: 'Well child visit',
                presentIllness: 'Child presents for routine well child examination. Parent reports child is doing well with normal growth and development.',
                vitalSigns: 'Weight: ___ kg (___percentile), Height: ___ cm (___percentile), HC: ___ cm (___percentile), BMI: ___',
                primaryDiagnosis: 'Z00.129 - Encounter for routine child health examination without abnormal findings'
            }
        },

        'Mental Health Assessment': {
            specialty: 'Psychiatry',
            description: 'Basic mental health evaluation',
            icon: 'fas fa-brain',
            color: 'purple',
            data: {
                chiefComplaint: 'Mental health evaluation',
                presentIllness: `Patient presents for mental health evaluation.
Mood: [current mood state]
Duration: [how long symptoms present]
Triggers: [precipitating factors]
Sleep: [sleep patterns and quality]
Appetite: [changes in appetite/weight]
Energy: [energy levels and motivation]
Concentration: [ability to focus and concentrate]
Suicidal ideation: [assess for SI/HI]`,
                vitalSigns: 'BP: ___/___  HR: ___  RR: ___  Temp: ___°F',
                primaryDiagnosis: 'F32.9 - Major depressive disorder, single episode, unspecified'
            }
        },

        'Hypertension Follow-up': {
            specialty: 'Internal Medicine',
            description: 'HTN management visit',
            icon: 'fas fa-tachometer-alt',
            color: 'orange',
            data: {
                chiefComplaint: 'Hypertension follow-up',
                presentIllness: 'Patient returns for hypertension management. Reports compliance with medications and lifestyle modifications.',
                vitalSigns: 'BP: ___/___  HR: ___  Weight: ___ lbs',
                primaryDiagnosis: 'I10 - Essential hypertension'
            }
        },

        'Diabetes Management': {
            specialty: 'Endocrinology',
            description: 'Diabetes mellitus follow-up',
            icon: 'fas fa-syringe',
            color: 'indigo',
            data: {
                chiefComplaint: 'Diabetes follow-up',
                presentIllness: 'Patient with Type 2 diabetes mellitus returns for routine management and glucose control assessment.',
                vitalSigns: 'BP: ___/___  HR: ___  Weight: ___ lbs  BMI: ___  Glucose: ___ mg/dL',
                primaryDiagnosis: 'E11.9 - Type 2 diabetes mellitus without complications'
            }
        }
    },

    // ICD-10 Codes Database
    icdCodes: [
        { code: 'Z00.00', description: 'Encounter for general adult medical examination without abnormal findings' },
        { code: 'Z00.129', description: 'Encounter for routine child health examination without abnormal findings' },
        { code: 'R06.02', description: 'Shortness of breath' },
        { code: 'R50.9', description: 'Fever, unspecified' },
        { code: 'R10.9', description: 'Unspecified abdominal pain' },
        { code: 'R07.89', description: 'Other chest pain' },
        { code: 'R07.9', description: 'Chest pain, unspecified' },
        { code: 'R07.1', description: 'Chest pain on breathing' },
        { code: 'R07.81', description: 'Epigastric pain' },
        { code: 'R07.82', description: 'Intercostal pain' },
        { code: 'J06.9', description: 'Acute upper respiratory infection, unspecified' },
        { code: 'J00', description: 'Acute nasopharyngitis [common cold]' },
        { code: 'J01.9', description: 'Acute sinusitis, unspecified' },
        { code: 'J02.9', description: 'Acute pharyngitis, unspecified' },
        { code: 'J03.9', description: 'Acute tonsillitis, unspecified' },
        { code: 'I10', description: 'Essential hypertension' },
        { code: 'I11.9', description: 'Hypertensive heart disease without heart failure' },
        { code: 'I12.9', description: 'Hypertensive chronic kidney disease with stage 1 through stage 4 chronic kidney disease, or unspecified chronic kidney disease' },
        { code: 'E11.9', description: 'Type 2 diabetes mellitus without complications' },
        { code: 'E11.65', description: 'Type 2 diabetes mellitus with hyperglycemia' },
        { code: 'E11.69', description: 'Type 2 diabetes mellitus with other specified complication' },
        { code: 'E10.9', description: 'Type 1 diabetes mellitus without complications' },
        { code: 'F32.9', description: 'Major depressive disorder, single episode, unspecified' },
        { code: 'F32.0', description: 'Major depressive disorder, single episode, mild' },
        { code: 'F32.1', description: 'Major depressive disorder, single episode, moderate' },
        { code: 'F32.2', description: 'Major depressive disorder, single episode, severe without psychotic features' },
        { code: 'F41.9', description: 'Anxiety disorder, unspecified' },
        { code: 'F41.1', description: 'Generalized anxiety disorder' },
        { code: 'F43.10', description: 'Post-traumatic stress disorder, unspecified' },
        { code: 'M79.3', description: 'Panniculitis, unspecified' },
        { code: 'M25.50', description: 'Pain in unspecified joint' },
        { code: 'M25.511', description: 'Pain in right shoulder' },
        { code: 'M25.512', description: 'Pain in left shoulder' },
        { code: 'M79.1', description: 'Myalgia' },
        { code: 'M79.2', description: 'Neuralgia and neuritis, unspecified' },
        { code: 'K59.00', description: 'Constipation, unspecified' },
        { code: 'K21.9', description: 'Gastro-esophageal reflux disease without esophagitis' },
        { code: 'K30', description: 'Functional dyspepsia' },
        { code: 'K92.2', description: 'Gastrointestinal hemorrhage, unspecified' },
        { code: 'H10.9', description: 'Unspecified conjunctivitis' },
        { code: 'H57.1', description: 'Ocular pain' },
        { code: 'N39.0', description: 'Urinary tract infection, site not specified' },
        { code: 'N30.9', description: 'Cystitis, unspecified' },
        { code: 'L30.9', description: 'Dermatitis, unspecified' },
        { code: 'L20.9', description: 'Atopic dermatitis, unspecified' },
        { code: 'R42', description: 'Dizziness and giddiness' },
        { code: 'R51', description: 'Headache' },
        { code: 'R05', description: 'Cough' },
        { code: 'R06.00', description: 'Dyspnea, unspecified' },
        { code: 'R11.10', description: 'Vomiting, unspecified' },
        { code: 'R11.11', description: 'Vomiting without nausea' },
        { code: 'R11.2', description: 'Nausea with vomiting, unspecified' },
        { code: 'Z51.11', description: 'Encounter for antineoplastic chemotherapy' },
        { code: 'Z87.891', description: 'Personal history of nicotine dependence' },
        { code: 'Z79.4', description: 'Long term (current) use of insulin' },
        { code: 'Z79.84', description: 'Long term (current) use of oral hypoglycemic drugs' }
    ],

    // Common Medications Database
    medications: [
        { name: 'Lisinopril', category: 'ACE Inhibitor', commonDoses: ['5mg daily', '10mg daily', '20mg daily'] },
        { name: 'Metformin', category: 'Antidiabetic', commonDoses: ['500mg twice daily', '1000mg twice daily', 'XR 500mg daily'] },
        { name: 'Atorvastatin', category: 'Statin', commonDoses: ['20mg daily', '40mg daily', '80mg daily'] },
        { name: 'Amlodipine', category: 'Calcium Channel Blocker', commonDoses: ['5mg daily', '10mg daily'] },
        { name: 'Metoprolol', category: 'Beta Blocker', commonDoses: ['25mg twice daily', '50mg twice daily', 'XL 50mg daily'] },
        { name: 'Hydrochlorothiazide', category: 'Diuretic', commonDoses: ['25mg daily', '50mg daily'] },
        { name: 'Omeprazole', category: 'PPI', commonDoses: ['20mg daily', '40mg daily'] },
        { name: 'Sertraline', category: 'SSRI', commonDoses: ['25mg daily', '50mg daily', '100mg daily'] },
        { name: 'Escitalopram', category: 'SSRI', commonDoses: ['10mg daily', '20mg daily'] },
        { name: 'Alprazolam', category: 'Benzodiazepine', commonDoses: ['0.25mg as needed', '0.5mg as needed'] },
        { name: 'Ibuprofen', category: 'NSAID', commonDoses: ['400mg every 6-8 hours', '600mg every 6-8 hours'] },
        { name: 'Acetaminophen', category: 'Analgesic', commonDoses: ['650mg every 6 hours', '1000mg every 8 hours'] },
        { name: 'Amoxicillin', category: 'Antibiotic', commonDoses: ['500mg three times daily', '875mg twice daily'] },
        { name: 'Azithromycin', category: 'Antibiotic', commonDoses: ['250mg daily x 5 days', '500mg day 1, then 250mg daily x 4 days'] },
        { name: 'Prednisone', category: 'Corticosteroid', commonDoses: ['5mg daily', '10mg daily', '20mg daily'] },
        { name: 'Albuterol', category: 'Bronchodilator', commonDoses: ['90mcg/puff 2 puffs every 4-6 hours', 'nebulizer 2.5mg every 4-6 hours'] },
        { name: 'Levothyroxine', category: 'Thyroid Hormone', commonDoses: ['25mcg daily', '50mcg daily', '75mcg daily', '100mcg daily'] },
        { name: 'Warfarin', category: 'Anticoagulant', commonDoses: ['2.5mg daily', '5mg daily', '7.5mg daily'] },
        { name: 'Aspirin', category: 'Antiplatelet', commonDoses: ['81mg daily', '325mg daily'] },
        { name: 'Insulin glargine', category: 'Long-acting Insulin', commonDoses: ['10 units daily', '20 units daily', '30 units daily'] }
    ],

    // Physical Exam Templates by Specialty
    examTemplates: {
        general: {
            vital_signs: 'BP, HR, RR, Temperature, O2 Saturation, Weight, Height, BMI',
            general: 'Alert, oriented, well-appearing, no acute distress',
            heent: 'Normocephalic, atraumatic, PERRLA, EOMI, oropharynx clear',
            neck: 'Supple, no lymphadenopathy, no thyromegaly',
            cardiovascular: 'Regular rate and rhythm, no murmurs, rubs, or gallops',
            respiratory: 'Clear to auscultation bilaterally',
            abdomen: 'Soft, non-tender, non-distended, normal bowel sounds',
            extremities: 'No cyanosis, clubbing, or edema',
            neurological: 'Alert and oriented x3, grossly intact',
            skin: 'Warm, dry, no rashes or lesions'
        },
        cardiology: {
            cardiovascular: 'Rate, rhythm, heart sounds, murmurs, rubs, gallops, peripheral pulses, JVD, carotid bruits',
            extremities: 'Peripheral edema, cyanosis, clubbing, peripheral pulses, capillary refill',
            respiratory: 'Breath sounds, rales, wheezes, respiratory effort'
        },
        neurology: {
            neurological: 'Mental status, cranial nerves II-XII, motor strength, reflexes, sensation, coordination, gait',
            mental_status: 'Orientation, memory, attention, language, executive function'
        },
        pediatrics: {
            growth: 'Weight, height, head circumference plotted on growth charts',
            development: 'Age-appropriate milestones and behaviors',
            vaccination: 'Immunization status per CDC schedule'
        }
    },

    // Assessment and Plan Templates
    planTemplates: {
        hypertension: {
            assessment: 'Essential hypertension',
            medications: 'ACE inhibitor or ARB first-line, add thiazide diuretic if needed',
            lifestyle: 'DASH diet, sodium restriction <2.3g/day, regular aerobic exercise, weight management',
            monitoring: 'Home BP monitoring, target <130/80, recheck in 4-6 weeks',
            complications: 'Annual eye exam, kidney function monitoring, cardiovascular risk assessment'
        },
        diabetes: {
            assessment: 'Type 2 diabetes mellitus',
            medications: 'Metformin first-line, add SGLT2 inhibitor or GLP-1 agonist if A1C >7%',
            lifestyle: 'Diabetic diet with carbohydrate counting, regular exercise, weight management',
            monitoring: 'A1C every 3-6 months (target <7%), home glucose monitoring',
            complications: 'Annual dilated eye exam, foot exam, microalbumin screening'
        },
        depression: {
            assessment: 'Major depressive disorder',
            medications: 'SSRI first-line (sertraline, escitalopram), monitor for side effects',
            therapy: 'Cognitive behavioral therapy, consider referral to mental health specialist',
            monitoring: 'PHQ-9 screening, assess for suicidal ideation, follow-up in 2-4 weeks',
            lifestyle: 'Regular exercise, sleep hygiene, stress management, social support'
        },
        anxiety: {
            assessment: 'Generalized anxiety disorder',
            medications: 'SSRI first-line, avoid benzodiazepines for long-term use',
            therapy: 'Cognitive behavioral therapy, relaxation techniques, mindfulness',
            monitoring: 'GAD-7 screening, assess functional impairment, regular follow-up',
            lifestyle: 'Limit caffeine, regular exercise, stress reduction techniques'
        },
        uti: {
            assessment: 'Urinary tract infection',
            medications: 'Nitrofurantoin, trimethoprim-sulfamethoxazole, or ciprofloxacin based on local resistance patterns',
            followup: 'Symptom resolution in 2-3 days, culture if recurrent',
            prevention: 'Adequate hydration, proper hygiene, cranberry supplements may help',
            complications: 'Monitor for pyelonephritis signs, urology referral if recurrent'
        }
    },

    // AI Suggestion Templates
    aiSuggestionTemplates: {
        chiefComplaint: [
            'Consider adding onset, duration, and severity',
            'Include patient\'s own words when possible',
            'Specify location and quality of symptoms',
            'Add associated symptoms or triggers'
        ],
        physicalExam: [
            'Include vital signs and general appearance',
            'Perform systematic examination by systems',
            'Document both positive and negative findings',
            'Consider specialty-specific examination components'
        ],
        assessment: [
            'Consider differential diagnoses',
            'Include ICD-10 codes when appropriate',
            'Provide clinical reasoning for diagnosis',
            'Address severity and complications'
        ],
        plan: [
            'Include specific medications with dosing',
            'Specify follow-up timeline and conditions',
            'Address patient education and lifestyle modifications',
            'Consider referrals and additional testing'
        ]
    },

    // Specialty-specific content
    specialtyContent: {
        cardiology: {
            commonConditions: ['Hypertension', 'Coronary artery disease', 'Heart failure', 'Arrhythmias', 'Valvular disease'],
            keyExams: ['Cardiac auscultation', 'Peripheral pulse assessment', 'JVD evaluation', 'Edema assessment'],
            commonMeds: ['ACE inhibitors', 'Beta blockers', 'Statins', 'Antiplatelet therapy', 'Diuretics']
        },
        pediatrics: {
            commonConditions: ['Upper respiratory infections', 'Ear infections', 'Gastroenteritis', 'Fever', 'Growth concerns'],
            keyExams: ['Growth parameters', 'Developmental assessment', 'Immunization review', 'Safety counseling'],
            ageGroups: ['Newborn', 'Infant', 'Toddler', 'School-age', 'Adolescent']
        },
        psychiatry: {
            commonConditions: ['Depression', 'Anxiety', 'Bipolar disorder', 'ADHD', 'PTSD'],
            keyExams: ['Mental status exam', 'Suicide risk assessment', 'Substance use screening', 'Cognitive assessment'],
            screeningTools: ['PHQ-9', 'GAD-7', 'MMSE', 'AUDIT', 'PCL-5']
        }
    }
};

// Utility Functions for Templates
const TemplateUtils = {
    // Get template by name
    getTemplate: function(templateName) {
        return MedScriptTemplates.soapTemplates[templateName] || null;
    },

    // Get all template names
    getTemplateNames: function() {
        return Object.keys(MedScriptTemplates.soapTemplates);
    },

    // Search ICD codes
    searchICDCodes: function(query, limit = 10) {
        const lowercaseQuery = query.toLowerCase();
        return MedScriptTemplates.icdCodes
            .filter(code => 
                code.description.toLowerCase().includes(lowercaseQuery) ||
                code.code.toLowerCase().includes(lowercaseQuery)
            )
            .slice(0, limit);
    },

    // Get ICD code by exact code
    getICDByCode: function(code) {
        return MedScriptTemplates.icdCodes.find(icd => 
            icd.code.toLowerCase() === code.toLowerCase()
        );
    },

    // Get medications by category
    getMedicationsByCategory: function(category) {
        return MedScriptTemplates.medications.filter(med => 
            med.category.toLowerCase() === category.toLowerCase()
        );
    },

    // Search medications
    searchMedications: function(query, limit = 10) {
        const lowercaseQuery = query.toLowerCase();
        return MedScriptTemplates.medications
            .filter(med => 
                med.name.toLowerCase().includes(lowercaseQuery) ||
                med.category.toLowerCase().includes(lowercaseQuery)
            )
            .slice(0, limit);
    },

    // Get exam template by specialty
    getExamTemplate: function(specialty) {
        return MedScriptTemplates.examTemplates[specialty] || 
               MedScriptTemplates.examTemplates.general;
    },

    // Get plan template by condition
    getPlanTemplate: function(condition) {
        return MedScriptTemplates.planTemplates[condition.toLowerCase()] || null;
    },

    // Get specialty content
    getSpecialtyContent: function(specialty) {
        return MedScriptTemplates.specialtyContent[specialty] || null;
    },

    // Generate mock SOAP data for demo
    generateMockSOAP: function(specialty = 'general') {
        const mockData = {
            patientInfo: {
                name: "John Smith",
                dob: "03/15/1978",
                mrn: "MRN456789"
            },
            subjective: {
                chiefComplaint: "Patient presents with chest discomfort and shortness of breath for the past 2 days.",
                presentIllness: "45-year-old male reports onset of substernal chest pressure 2 days ago, described as 7/10 intensity, non-radiating, associated with mild shortness of breath on exertion. Denies nausea, diaphoresis, or palpitations. Symptoms worsen with activity, improve with rest. No prior episodes.",
                reviewSystems: "Constitutional: Denies fever, chills, weight loss. Cardiovascular: Chest pain as per HPI, denies palpitations, orthopnea, PND, lower extremity edema. Respiratory: Mild SOB with exertion, denies cough, wheezing. GI: Denies nausea, vomiting, abdominal pain. All other systems negative.",
                pastMedicalHistory: "Hypertension, hyperlipidemia, father with MI at age 55. No prior cardiac events. No surgeries. Medications: Lisinopril 10mg daily, atorvastatin 40mg daily. NKDA."
            },
            objective: {
                vitalSigns: "BP 145/92, HR 78, RR 16, O2 Sat 98% on room air, Temp 98.4°F, Weight 185 lbs, BMI 28.1",
                physicalExam: "General: Well-appearing male in no acute distress. HEENT: Normocephalic, atraumatic, PERRLA, EOMI. Neck: Supple, no JVD, no carotid bruits. Cardiovascular: Regular rate and rhythm, no murmurs, rubs, or gallops, no peripheral edema. Respiratory: Clear to auscultation bilaterally, no wheezes or rales. Abdomen: Soft, non-tender, non-distended. Extremities: No cyanosis, clubbing, or edema, distal pulses intact.",
                diagnosticResults: "ECG: Normal sinus rhythm at 78 bpm, no acute ST-T wave changes, no Q waves. Chest X-ray: Clear lung fields, normal cardiac silhouette, no acute findings."
            },
            assessment: {
                primaryDiagnosis: "R07.89 - Other chest pain",
                differentialDx: "1. Atypical chest pain vs. stable angina 2. Gastroesophageal reflux disease 3. Musculoskeletal chest pain 4. Anxiety-related chest pain",
                clinicalImpression: "45-year-old male with cardiovascular risk factors presenting with atypical chest pain. Low-to-intermediate risk for acute coronary syndrome based on clinical presentation and normal ECG. Consider outpatient stress testing for further risk stratification."
            },
            plan: {
                medications: "1. Continue Lisinopril 10mg daily for hypertension 2. Continue atorvastatin 40mg daily for hyperlipidemia 3. Consider trial of omeprazole 20mg daily for possible GERD 4. Aspirin 81mg daily for cardiovascular protection",
                procedures: "1. Outpatient stress echocardiogram within 2 weeks 2. Basic metabolic panel and lipid panel 3. Consider CT coronary angiogram if stress test abnormal",
                followUp: "1. Return to clinic in 1-2 weeks or sooner if symptoms worsen 2. Cardiology referral if stress test positive or symptoms persist 3. Emergency department if chest pain becomes severe or associated with SOB, diaphoresis, or radiation",
                patientEducation: "1. Discussed warning signs of heart attack: severe chest pain, SOB, nausea, diaphoresis, radiation to arm/jaw 2. Lifestyle modifications: heart-healthy diet, regular exercise, smoking cessation if applicable 3. Medication compliance and follow-up importance 4. When to seek immediate medical attention"
            }
        };

        // Customize based on specialty
        if (specialty === 'pediatrics') {
            mockData.patientInfo = {
                name: "Emma Johnson",
                dob: "08/22/2018",
                mrn: "PED123456"
            };
            mockData.subjective.chiefComplaint = "Well child visit for 5-year-old";
            mockData.assessment.primaryDiagnosis = "Z00.129 - Encounter for routine child health examination without abnormal findings";
        } else if (specialty === 'psychiatry') {
            mockData.subjective.chiefComplaint = "Depression and anxiety symptoms";
            mockData.assessment.primaryDiagnosis = "F32.1 - Major depressive disorder, single episode, moderate";
        }

        return mockData;
    },

    // Format medication string
    formatMedication: function(name, dose, frequency, duration = '') {
        return `${name} ${dose} ${frequency}${duration ? ' for ' + duration : ''}`;
    },

    // Generate template preview
    getTemplatePreview: function(templateName) {
        const template = this.getTemplate(templateName);
        if (!template) return null;

        return {
            name: templateName,
            specialty: template.specialty,
            description: template.description,
            chiefComplaint: template.data?.chiefComplaint || '',
            sampleContent: template.data?.presentIllness?.substring(0, 100) + '...' || ''
        };
    },

    // Validate SOAP note completeness
    validateSOAPCompleteness: function(soapData) {
        const issues = [];
        const required = [
            { section: 'subjective', field: 'chiefComplaint', name: 'Chief Complaint' },
            { section: 'subjective', field: 'presentIllness', name: 'History of Present Illness' },
            { section: 'objective', field: 'physicalExam', name: 'Physical Examination' },
            { section: 'assessment', field: 'primaryDiagnosis', name: 'Primary Diagnosis' },
            { section: 'plan', field: 'followUp', name: 'Follow-up Plan' }
        ];

        required.forEach(item => {
            const content = soapData[item.section]?.[item.field];
            if (!content || content.trim().length < 10) {
                issues.push(`${item.name} needs more detail`);
            }
        });

        return {
            isComplete: issues.length === 0,
            issues: issues,
            completionPercentage: Math.round(((required.length - issues.length) / required.length) * 100)
        };
    },

    // Get random template for demo
    getRandomTemplate: function() {
        const templateNames = this.getTemplateNames();
        const randomIndex = Math.floor(Math.random() * templateNames.length);
        return this.getTemplate(templateNames[randomIndex]);
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MedScriptTemplates, TemplateUtils };
}