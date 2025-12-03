import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'hi' | 'kn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    home: "Home",
    awareness: "Disease Awareness",
    hygieneTest: "Hygiene Test",
    login: "Login",
    register: "Register",
    logout: "Logout",
    welcomeBack: "Welcome,",
    activityLog: "Activity Log",
    loginTitle: "Sign in to Kisan Seva",
    loginSubtitle: "Access farmer resources tailored to you.",
    loginAction: "Log in",
    loginSubmitting: "Signing in...",
    loginSuccessTitle: "Login successful",
    loginSuccessMessage: "You are now logged into Kisan Seva.",
    loginErrorTitle: "Unable to sign in",
    loginErrorMessage: "Please check your email and password and try again.",
    noAccountPrompt: "Don't have an account yet?",
    createAccountLink: "Create one",
    registerTitle: "Create your Kisan Seva account",
    registerSubtitle: "Register to unlock personalised insights and tools.",
    nameLabel: "Full Name",
    namePlaceholder: "Enter your full name",
    emailLabel: "Email",
    passwordLabel: "Password",
    confirmPasswordLabel: "Confirm Password",
    registerAction: "Create account",
    registerSubmitting: "Creating your account...",
    haveAccountPrompt: "Already have an account?",
    signInLink: "Sign in",
    registerSuccessTitle: "Account created",
    registerSuccessMessage: "Welcome to Kisan Seva! You are now signed in.",
    registerErrorTitle: "Unable to register",
    registerErrorMessage: "We couldn't create your account. Please try again.",
    privacyNotice: "Your account data is securely stored on this device only.",
    activityLogTitle: "Your Activity Log",
    activityLogSubtitle: "Track recent sign-ins and account events.",
    activityLogEmpty: "No activity recorded yet.",
    activityLogTableEvent: "Event",
    activityLogTableDetails: "Details",
    activityLogTableTimestamp: "Timestamp",
    auditEventRegister: "Account created",
    auditEventRegisterFailed: "Registration attempt blocked",
    auditEventLogin: "Signed in",
    auditEventLoginFailed: "Failed sign-in attempt",
    auditEventLogout: "Signed out",
    auditReasonEmailExists: "Email already registered",
    auditReasonUserNotFound: "Email not recognised",
    auditReasonInvalidPassword: "Incorrect password",
    auditReasonUnknown: "Reason unavailable",
    
    // Todo List
    todoList: "Todo List",
    addNewTodo: "Add New Task",
    todoTitle: "Task Title",
    todoDescription: "Task Description (Optional)",
    addTodo: "Add Task",
    noTodos: "No tasks yet. Add one to get started!",
    
    // Home Page
    title: "Kisan  Seva",
    subtitle: "Empowering Farmers with Knowledge and Care",
    features: "Our Services",
    feature1Title: "Disease Awareness",
    feature1Desc: "Learn about common diseases affecting your livestock and how to prevent them",
    feature2Title: "Hygiene Assessment",
    feature2Desc: "Test your farm's hygiene standards and get personalized recommendations",
    feature3Title: "Expert Guidance",
    feature3Desc: "Get expert advice on maintaining healthy poultry and cattle",
    getStarted: "Get Started",
    
    // Awareness Page
    awarenessTitle: "Disease Awareness",
    poultryDiseases: "Common Poultry Diseases",
    cattleDiseases: "Common Cattle Diseases",
    symptoms: "Symptoms",
    treatment: "Treatment",
    prevention: "Prevention",
    
    // Poultry Diseases
    newcastleDisease: "Newcastle Disease",
    newcastleSymptoms: "Respiratory distress, greenish diarrhea, nervous signs, swelling around eyes and neck, reduced egg production",
    newcastleTreatment: "No specific treatment. Supportive care with antibiotics to prevent secondary infections. Vaccination is key.",
    newcastlePrevention: "Vaccination, biosecurity measures, quarantine new birds, proper ventilation",
    
    fowlPox: "Fowl Pox",
    fowlPoxSymptoms: "Wart-like lesions on combs and wattles, reduced egg production, difficulty breathing if diphtheritic form",
    fowlPoxTreatment: "Supportive care, remove scabs, apply iodine solution, antibiotics for secondary infections",
    fowlPoxPrevention: "Vaccination, control mosquitoes and flies, good ventilation, proper nutrition",
    
    coccidiosis: "Coccidiosis",
    coccidiosisSymptoms: "Bloody diarrhea, weakness, ruffled feathers, reduced growth, dehydration",
    coccidiosisTreatment: "Anticoccidial drugs in water or feed, electrolytes, vitamin K for bleeding",
    coccidiosisPrevention: "Clean dry litter, proper ventilation, anticoccidial medication in feed, avoid overcrowding",
    
    // Cattle Diseases
    fmd: "Foot and Mouth Disease",
    fmdSymptoms: "Fever, blisters on mouth, tongue, feet, teats, excessive salivation, lameness, reduced milk production",
    fmdTreatment: "Supportive care, antibiotics for secondary infections, anti-inflammatory drugs, proper nutrition",
    fmdPrevention: "Vaccination, quarantine infected animals, biosecurity, disinfection of premises",
    
    mastitis: "Mastitis",
    mastitisSymptoms: "Swollen udder, hot and painful udder, abnormal milk (clots, watery), reduced milk production, fever",
    mastitisTreatment: "Antibiotics (intramammary and systemic), anti-inflammatory drugs, frequent milking, supportive care",
    mastitisPrevention: "Proper milking hygiene, teat dipping, regular udder examination, clean bedding, balanced nutrition",
    
    blackQuarter: "Black Quarter",
    blackQuarterSymptoms: "High fever, swelling of affected muscles (usually hindquarters), lameness, depression, sudden death",
    blackQuarterTreatment: "High doses of penicillin if caught early, supportive care, usually fatal once symptoms appear",
    blackQuarterPrevention: "Vaccination (most effective), avoid grazing in contaminated areas, proper disposal of carcasses",
    
    // Hygiene Test
    testTitle: "Farm Hygiene Assessment",
    selectFarmType: "Select Farm Type",
    poultryFarm: "Poultry Farm",
    cattleFarm: "Cattle Farm",
    startTest: "Start Assessment",
    nextQuestion: "Next Question",
    submitTest: "Submit Assessment",
    backToTest: "Back to Test",
    
    // Poultry Questions
    poultryQ1: "How often do you clean and disinfect the poultry house?",
    poultryQ1A1: "Daily",
    poultryQ1A2: "Weekly",
    poultryQ1A3: "Monthly",
    poultryQ1A4: "Rarely",
    
    poultryQ2: "Is there proper ventilation in your poultry house?",
    poultryQ2A1: "Excellent ventilation with fans",
    poultryQ2A2: "Good natural ventilation",
    poultryQ2A3: "Moderate ventilation",
    poultryQ2A4: "Poor ventilation",
    
    poultryQ3: "How do you manage poultry waste?",
    poultryQ3A1: "Daily removal and proper composting",
    poultryQ3A2: "Regular removal (2-3 times per week)",
    poultryQ3A3: "Weekly removal",
    poultryQ3A4: "Irregular removal",
    
    poultryQ4: "Do you maintain clean water sources?",
    poultryQ4A1: "Changed daily with disinfected containers",
    poultryQ4A2: "Changed daily",
    poultryQ4A3: "Changed every 2-3 days",
    poultryQ4A4: "Changed irregularly",
    
    poultryQ5: "Are new birds quarantined before introducing to the flock?",
    poultryQ5A1: "Yes, always (14+ days)",
    poultryQ5A2: "Sometimes (7-14 days)",
    poultryQ5A3: "Rarely",
    poultryQ5A4: "Never",
    
    // Cattle Questions
    cattleQ1: "How often do you clean the cattle shed?",
    cattleQ1A1: "Daily",
    cattleQ1A2: "Every 2-3 days",
    cattleQ1A3: "Weekly",
    cattleQ1A4: "Rarely",
    
    cattleQ2: "How do you maintain udder hygiene during milking?",
    cattleQ2A1: "Wash with disinfectant, teat dipping before and after",
    cattleQ2A2: "Wash with water, teat dipping after milking",
    cattleQ2A3: "Basic washing only",
    cattleQ2A4: "Minimal or no cleaning",
    
    cattleQ3: "Is your cattle shed well-ventilated and dry?",
    cattleQ3A1: "Excellent - well ventilated and always dry",
    cattleQ3A2: "Good - adequate ventilation",
    cattleQ3A3: "Moderate - some dampness present",
    cattleQ3A4: "Poor - often damp and poorly ventilated",
    
    cattleQ4: "How do you manage cattle waste?",
    cattleQ4A1: "Daily removal and proper composting",
    cattleQ4A2: "Regular removal (2-3 times per week)",
    cattleQ4A3: "Weekly removal",
    cattleQ4A4: "Irregular removal",
    
    cattleQ5: "Do you isolate sick animals immediately?",
    cattleQ5A1: "Yes, always with immediate veterinary care",
    cattleQ5A2: "Usually, with timely care",
    cattleQ5A3: "Sometimes",
    cattleQ5A4: "Rarely or never",
    
    // Results
    resultsTitle: "Assessment Results",
    riskLevel: "Hygiene Standard",
    excellent: "Excellent",
    good: "Good",
    moderate: "Moderate",
    poor: "Poor",
    excellentMsg: "Your farm hygiene is excellent! Keep up the good practices.",
    goodMsg: "Your farm hygiene is good, but there's room for improvement.",
    moderateMsg: "Your farm hygiene needs improvement to prevent disease outbreaks.",
    poorMsg: "Urgent action needed! Your farm is at high risk of disease outbreaks.",
    recommendations: "Recommendations",
    
    // Recommendations
    rec_excellent_1: "Continue your excellent hygiene practices",
    rec_excellent_2: "Maintain regular cleaning and disinfection schedules",
    rec_excellent_3: "Keep detailed health records of your livestock",
    rec_excellent_4: "Stay updated with vaccination schedules",
    
    rec_good_1: "Increase frequency of cleaning and disinfection",
    rec_good_2: "Improve ventilation in housing areas",
    rec_good_3: "Implement stricter biosecurity measures",
    rec_good_4: "Regular health monitoring and veterinary checkups",
    rec_good_5: "Proper waste management system needed",
    
    rec_moderate_1: "Immediate improvement in daily cleaning required",
    rec_moderate_2: "Install proper ventilation system",
    rec_moderate_3: "Start quarantine protocol for new animals",
    rec_moderate_4: "Upgrade water and feed management",
    rec_moderate_5: "Consult veterinarian for health assessment",
    rec_moderate_6: "Implement waste removal schedule",
    
    rec_poor_1: "URGENT: Complete overhaul of hygiene practices needed",
    rec_poor_2: "Daily cleaning and disinfection is critical",
    rec_poor_3: "Immediate veterinary consultation required",
    rec_poor_4: "Isolate sick animals immediately",
    rec_poor_5: "Implement proper ventilation urgently",
    rec_poor_6: "Establish water cleaning protocol",
    rec_poor_7: "Create waste management system",
    rec_poor_8: "Consider temporary reduction in livestock numbers",
    
    // About Page
    aboutTitle: "About Kisan Seva",
    aboutSubtitle: "Empowering Farmers with Knowledge",
    aboutText: "Kisan Seva is dedicated to helping farmers maintain healthy livestock through education, awareness, and practical guidance. We provide comprehensive information about disease prevention, hygiene management, and best practices for poultry and cattle farming.",
    ourMission: "Our Mission",
    missionText: "To empower farmers with accessible, multilingual information that helps them maintain healthy farms and prevent disease outbreaks.",
  },
  hi: {
    // Navigation
    home: "होम",
    awareness: "रोग जागरूकता",
    hygieneTest: "स्वच्छता परीक्षण",
    welcomeBack: "वापसी पर स्वागत,",
    logout: "लॉग आउट",
    
    // Home Page
    title: "किसान सेवा",
    subtitle: "ज्ञान और देखभाल के साथ किसानों को सशक्त बनाना",
    features: "हमारी सेवाएं",
    feature1Title: "रोग जागरूकता",
    feature1Desc: "अपने पशुधन को प्रभावित करने वाली सामान्य बीमारियों के बारे में जानें और उन्हें कैसे रोकें",
    feature2Title: "स्वच्छता मूल्यांकन",
    feature2Desc: "अपने फार्म के स्वच्छता मानकों का परीक्षण करें और व्यक्तिगत सिफारिशें प्राप्त करें",
    feature3Title: "विशेषज्ञ मार्गदर्शन",
    feature3Desc: "स्वस्थ मुर्गीपालन और पशुपालन बनाए रखने पर विशेषज्ञ सलाह प्राप्त करें",
    getStarted: "शुरू करें",
    
    // Awareness Page
    awarenessTitle: "रोग जागरूकता",
    poultryDiseases: "सामान्य मुर्गी रोग",
    cattleDiseases: "सामान्य पशु रोग",
    symptoms: "लक्षण",
    treatment: "उपचार",
    prevention: "रोकथाम",
    
    // Poultry Diseases
    newcastleDisease: "न्यूकैसल रोग",
    newcastleSymptoms: "सांस लेने में तकलीफ, हरे रंग का दस्त, तंत्रिका संकेत, आंखों और गर्दन के आसपास सूजन, अंडे उत्पादन में कमी",
    newcastleTreatment: "कोई विशिष्ट उपचार नहीं। द्वितीयक संक्रमण को रोकने के लिए एंटीबायोटिक दवाओं के साथ सहायक देखभाल। टीकाकरण महत्वपूर्ण है।",
    newcastlePrevention: "टीकाकरण, जैव सुरक्षा उपाय, नए पक्षियों को अलग रखें, उचित वेंटिलेशन",
    
    fowlPox: "फाउल पॉक्स",
    fowlPoxSymptoms: "कंघी और वाटल्स पर मस्से जैसे घाव, अंडे उत्पादन में कमी, डिप्थीरिटिक रूप होने पर सांस लेने में कठिनाई",
    fowlPoxTreatment: "सहायक देखभाल, पपड़ी हटाएं, आयोडीन घोल लगाएं, द्वितीयक संक्रमण के लिए एंटीबायोटिक्स",
    fowlPoxPrevention: "टीकाकरण, मच्छरों और मक्खियों को नियंत्रित करें, अच्छा वेंटिलेशन, उचित पोषण",
    
    coccidiosis: "कोक्सीडायोसिस",
    coccidiosisSymptoms: "खूनी दस्त, कमजोरी, उलझे हुए पंख, विकास में कमी, निर्जलीकरण",
    coccidiosisTreatment: "पानी या चारे में एंटीकोक्सीडियल दवाएं, इलेक्ट्रोलाइट्स, रक्तस्राव के लिए विटामिन के",
    coccidiosisPrevention: "साफ सूखी बिछावन, उचित वेंटिलेशन, चारे में एंटीकोक्सीडियल दवा, भीड़भाड़ से बचें",
    
    // Cattle Diseases
    fmd: "मुंह और खुर रोग",
    fmdSymptoms: "बुखार, मुंह, जीभ, पैर, थनों पर छाले, अत्यधिक लार, लंगड़ापन, दूध उत्पादन में कमी",
    fmdTreatment: "सहायक देखभाल, द्वितीयक संक्रमण के लिए एंटीबायोटिक्स, एंटी-इंफ्लेमेटरी दवाएं, उचित पोषण",
    fmdPrevention: "टीकाकरण, संक्रमित जानवरों को अलग रखें, जैव सुरक्षा, परिसर का कीटाणुशोधन",
    
    mastitis: "थनैला रोग",
    mastitisSymptoms: "सूजा हुआ थन, गर्म और दर्दनाक थन, असामान्य दूध (थक्के, पानी जैसा), दूध उत्पादन में कमी, बुखार",
    mastitisTreatment: "एंटीबायोटिक्स (इंट्रामैमरी और सिस्टमिक), एंटी-इंफ्लेमेटरी दवाएं, बार-बार दूध निकालना, सहायक देखभाल",
    mastitisPrevention: "उचित दुग्धपान स्वच्छता, थन डुबाना, नियमित थन परीक्षण, साफ बिस्तर, संतुलित पोषण",
    
    blackQuarter: "गलघोंटू",
    blackQuarterSymptoms: "तेज बुखार, प्रभावित मांसपेशियों की सूजन (आमतौर पर पिछले हिस्से), लंगड़ापन, अवसाद, अचानक मृत्यु",
    blackQuarterTreatment: "जल्दी पकड़ने पर पेनिसिलिन की उच्च खुराक, सहायक देखभाल, लक्षण दिखने पर आमतौर पर घातक",
    blackQuarterPrevention: "टीकाकरण (सबसे प्रभावी), दूषित क्षेत्रों में चरने से बचें, शवों का उचित निपटान",
    
    // Hygiene Test
    testTitle: "फार्म स्वच्छता मूल्यांकन",
    selectFarmType: "फार्म प्रकार चुनें",
    poultryFarm: "मुर्गी फार्म",
    cattleFarm: "पशु फार्म",
    startTest: "मूल्यांकन शुरू करें",
    nextQuestion: "अगला प्रश्न",
    submitTest: "मूल्यांकन जमा करें",
    backToTest: "परीक्षण पर वापस जाएं",
    
    // Poultry Questions
    poultryQ1: "आप मुर्गी घर को कितनी बार साफ और कीटाणुरहित करते हैं?",
    poultryQ1A1: "प्रतिदिन",
    poultryQ1A2: "साप्ताहिक",
    poultryQ1A3: "मासिक",
    poultryQ1A4: "शायद ही कभी",
    
    poultryQ2: "क्या आपके मुर्गी घर में उचित वेंटिलेशन है?",
    poultryQ2A1: "पंखों के साथ उत्कृष्ट वेंटिलेशन",
    poultryQ2A2: "अच्छा प्राकृतिक वेंटिलेशन",
    poultryQ2A3: "मध्यम वेंटिलेशन",
    poultryQ2A4: "खराब वेंटिलेशन",
    
    poultryQ3: "आप मुर्गी के कचरे का प्रबंधन कैसे करते हैं?",
    poultryQ3A1: "दैनिक हटाना और उचित खाद बनाना",
    poultryQ3A2: "नियमित हटाना (सप्ताह में 2-3 बार)",
    poultryQ3A3: "साप्ताहिक हटाना",
    poultryQ3A4: "अनियमित हटाना",
    
    poultryQ4: "क्या आप साफ पानी के स्रोत बनाए रखते हैं?",
    poultryQ4A1: "कीटाणुरहित कंटेनरों के साथ दैनिक परिवर्तन",
    poultryQ4A2: "दैनिक परिवर्तन",
    poultryQ4A3: "हर 2-3 दिन में परिवर्तन",
    poultryQ4A4: "अनियमित परिवर्तन",
    
    poultryQ5: "क्या झुंड में शामिल करने से पहले नए पक्षियों को अलग रखा जाता है?",
    poultryQ5A1: "हां, हमेशा (14+ दिन)",
    poultryQ5A2: "कभी-कभी (7-14 दिन)",
    poultryQ5A3: "शायद ही कभी",
    poultryQ5A4: "कभी नहीं",
    
    // Cattle Questions
    cattleQ1: "आप पशु शेड को कितनी बार साफ करते हैं?",
    cattleQ1A1: "प्रतिदिन",
    cattleQ1A2: "हर 2-3 दिन",
    cattleQ1A3: "साप्ताहिक",
    cattleQ1A4: "शायद ही कभी",
    
    cattleQ2: "दूध निकालने के दौरान आप थन की स्वच्छता कैसे बनाए रखते हैं?",
    cattleQ2A1: "कीटाणुनाशक से धोना, पहले और बाद में थन डुबाना",
    cattleQ2A2: "पानी से धोना, दूध निकालने के बाद थन डुबाना",
    cattleQ2A3: "केवल बुनियादी धुलाई",
    cattleQ2A4: "न्यूनतम या कोई सफाई नहीं",
    
    cattleQ3: "क्या आपका पशु शेड अच्छी तरह हवादार और सूखा है?",
    cattleQ3A1: "उत्कृष्ट - अच्छी तरह हवादार और हमेशा सूखा",
    cattleQ3A2: "अच्छा - पर्याप्त वेंटिलेशन",
    cattleQ3A3: "मध्यम - कुछ नमी मौजूद",
    cattleQ3A4: "खराब - अक्सर नम और खराब हवादार",
    
    cattleQ4: "आप पशु अपशिष्ट का प्रबंधन कैसे करते हैं?",
    cattleQ4A1: "दैनिक हटाना और उचित खाद बनाना",
    cattleQ4A2: "नियमित हटाना (सप्ताह में 2-3 बार)",
    cattleQ4A3: "साप्ताहिक हटाना",
    cattleQ4A4: "अनियमित हटाना",
    
    cattleQ5: "क्या आप बीमार जानवरों को तुरंत अलग करते हैं?",
    cattleQ5A1: "हां, हमेशा तत्काल पशु चिकित्सा देखभाल के साथ",
    cattleQ5A2: "आमतौर पर, समय पर देखभाल के साथ",
    cattleQ5A3: "कभी-कभी",
    cattleQ5A4: "शायद ही कभी या कभी नहीं",
    
    // Results
    resultsTitle: "मूल्यांकन परिणाम",
    riskLevel: "स्वच्छता मानक",
    excellent: "उत्कृष्ट",
    good: "अच्छा",
    moderate: "मध्यम",
    poor: "खराब",
    excellentMsg: "आपके फार्म की स्वच्छता उत्कृष्ट है! अच्छी प्रथाओं को जारी रखें।",
    goodMsg: "आपके फार्म की स्वच्छता अच्छी है, लेकिन सुधार की गुंजाइश है।",
    moderateMsg: "रोग प्रकोप को रोकने के लिए आपके फार्म की स्वच्छता में सुधार की आवश्यकता है।",
    poorMsg: "तत्काल कार्रवाई की जरूरत! आपका फार्म रोग प्रकोप के उच्च जोखिम में है।",
    recommendations: "सिफारिशें",
    
    // Recommendations
    rec_excellent_1: "अपनी उत्कृष्ट स्वच्छता प्रथाओं को जारी रखें",
    rec_excellent_2: "नियमित सफाई और कीटाणुशोधन कार्यक्रम बनाए रखें",
    rec_excellent_3: "अपने पशुधन के विस्तृत स्वास्थ्य रिकॉर्ड रखें",
    rec_excellent_4: "टीकाकरण कार्यक्रम के साथ अद्यतन रहें",
    
    rec_good_1: "सफाई और कीटाणुशोधन की आवृत्ति बढ़ाएं",
    rec_good_2: "आवास क्षेत्रों में वेंटिलेशन में सुधार करें",
    rec_good_3: "सख्त जैव सुरक्षा उपायों को लागू करें",
    rec_good_4: "नियमित स्वास्थ्य निगरानी और पशु चिकित्सा जांच",
    rec_good_5: "उचित अपशिष्ट प्रबंधन प्रणाली की आवश्यकता है",
    
    rec_moderate_1: "दैनिक सफाई में तत्काल सुधार की आवश्यकता है",
    rec_moderate_2: "उचित वेंटिलेशन सिस्टम स्थापित करें",
    rec_moderate_3: "नए जानवरों के लिए संगरोध प्रोटोकॉल शुरू करें",
    rec_moderate_4: "पानी और चारा प्रबंधन को अपग्रेड करें",
    rec_moderate_5: "स्वास्थ्य मूल्यांकन के लिए पशु चिकित्सक से परामर्श लें",
    rec_moderate_6: "अपशिष्ट हटाने का कार्यक्रम लागू करें",
    
    rec_poor_1: "तत्काल: स्वच्छता प्रथाओं का पूर्ण नवीनीकरण आवश्यक",
    rec_poor_2: "दैनिक सफाई और कीटाणुशोधन महत्वपूर्ण है",
    rec_poor_3: "तत्काल पशु चिकित्सा परामर्श आवश्यक",
    rec_poor_4: "बीमार जानवरों को तुरंत अलग करें",
    rec_poor_5: "तत्काल उचित वेंटिलेशन लागू करें",
    rec_poor_6: "पानी की सफाई प्रोटोकॉल स्थापित करें",
    rec_poor_7: "अपशिष्ट प्रबंधन प्रणाली बनाएं",
    rec_poor_8: "पशुधन संख्या में अस्थायी कमी पर विचार करें",
    
    // Todo List
    todoList: "कार्य सूची",
    addNewTodo: "नया कार्य जोड़ें",
    todoTitle: "कार्य शीर्षक",
    todoDescription: "कार्य विवरण (वैकल्पिक)",
    addTodo: "कार्य जोड़ें",
    noTodos: "अभी तक कोई कार्य नहीं। शुरू करने के लिए एक जोड़ें!",

    // About Page
    aboutTitle: "किसान सेवा के बारे में",
    aboutSubtitle: "ज्ञान के साथ किसानों को सशक्त बनाना",
    aboutText: "किसान सेवा शिक्षा, जागरूकता और व्यावहारिक मार्गदर्शन के माध्यम से किसानों को स्वस्थ पशुधन बनाए रखने में मदद करने के लिए समर्पित है। हम मुर्गीपालन और पशुपालन के लिए रोग रोकथाम, स्वच्छता प्रबंधन और सर्वोत्तम प्रथाओं के बारे में व्यापक जानकारी प्रदान करते हैं।",
    ourMission: "हमारा मिशन",
    missionText: "किसानों को सुलभ, बहुभाषी जानकारी के साथ सशक्त बनाना जो उन्हें स्वस्थ फार्म बनाए रखने और रोग प्रकोप को रोकने में मदद करती है।",
    contactUs: "संपर्क करें",
    emailLabel: "ईमेल",
    phoneLabel: "फोन",
  },
  kn: {
    // Navigation
    home: "ಮುಖಪುಟ",
    awareness: "ರೋಗ ಅರಿವು",
    hygieneTest: "ನೈರ್ಮಲ್ಯ ಪರೀಕ್ಷೆ",
    login: "ಲಾಗಿನ್",
    register: "ನೋಂದಣಿ",
    logout: "ಲಾಗೌಟ್",
    welcomeBack: "ಮರಳಿ ಸ್ವಾಗತ,",
    activityLog: "ಚಟುವಟಿಕೆ ದಾಖಲೆ",
    loginTitle: "ಕಿಸಾನ್ ಸೇವಾಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ",
    loginSubtitle: "ನಿಮಗೆ ರೈತ ಸಂಪನ್ಮೂಲಗಳನ್ನು ತಯಾರಿಸಲಾಗಿದೆ.",
    loginAction: "ಲಾಗಿನ್",
    loginSubmitting: "ಸೈನ್ ಇನ್ ಮಾಡುತ್ತಿದೆ...",
    loginSuccessTitle: "ಲಾಗಿನ್ ಯಶಸ್ವಿ",
    loginSuccessMessage: "ನೀವು ಕಿಸಾನ್ ಸೇವಾಗೆ ಲಾಗಿನ್ ಆಗಿದ್ದೀರಿ.",
    loginErrorTitle: "ಸೈನ್ ಇನ್ ಮಾಡಲು ಸಾಧ್ಯವಿಲ್ಲ",
    loginErrorMessage: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಇಮೇಲ್ ಮತ್ತು ಪಾಸ್‌ವರ್ಡ್ ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    noAccountPrompt: "ಇನ್ನೂ ಖಾತೆ ಇಲ್ಲವೇ?",
    createAccountLink: "ಒಂದನ್ನು ರಚಿಸಿ",
    registerTitle: "ನಿಮ್ಮ ಕಿಸಾನ್ ಸೇವಾ ಖಾತೆಯನ್ನು ರಚಿಸಿ",
    registerSubtitle: "ವೈಯಕ್ತಿಕ ಒಳನೋಟಗಳು ಮತ್ತು ಸಾಧನಗಳನ್ನು ಅನ್‌ಲಾಕ್ ಮಾಡಲು ನೋಂದಣಿ ಮಾಡಿ.",
    nameLabel: "ಪೂರ್ಣ ಹೆಸರು",
    namePlaceholder: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
    emailLabel: "ಇಮೇಲ್",
    passwordLabel: "ಪಾಸ್‌ವರ್ಡ್",
    confirmPasswordLabel: "ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ",
    registerAction: "ಖಾತೆ ರಚಿಸಿ",
    registerSubmitting: "ನಿಮ್ಮ ಖಾತೆಯನ್ನು ರಚಿಸುತ್ತಿದೆ...",
    haveAccountPrompt: "ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?",
    signInLink: "ಸೈನ್ ಇನ್",
    registerSuccessTitle: "ಖಾತೆ ರಚಿಸಲಾಗಿದೆ",
    registerSuccessMessage: "ಕಿಸಾನ್ ಸೇವಾಗೆ ಸ್ವಾಗತ! ನೀವು ಈಗ ಸೈನ್ ಇನ್ ಆಗಿದ್ದೀರಿ.",
    registerErrorTitle: "ನೋಂದಣಿ ಮಾಡಲು ಸಾಧ್ಯವಿಲ್ಲ",
    registerErrorMessage: "ನಾವು ನಿಮ್ಮ ಖಾತೆಯನ್ನು ರಚಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    privacyNotice: "ನಿಮ್ಮ ಖಾತೆಯ ಡೇಟಾ ಈ ಸಾಧನದಲ್ಲಿ ಮಾತ್ರ ಸುರಕ್ಷಿತವಾಗಿ ಸಂಗ್ರಹಿಸಲಾಗಿದೆ.",
    activityLogTitle: "ನಿಮ್ಮ ಚಟುವಟಿಕೆ ದಾಖಲೆ",
    activityLogSubtitle: "ಇತ್ತೀಚಿನ ಸೈನ್-ಇನ್‌ಗಳು ಮತ್ತು ಖಾತೆ ಘಟನೆಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.",
    activityLogEmpty: "ಇನ್ನೂ ಯಾವುದೇ ಚಟುವಟಿಕೆ ದಾಖಲಿಸಲಾಗಿಲ್ಲ.",
    activityLogTableEvent: "ಘಟನೆ",
    activityLogTableDetails: "ವಿವರಗಳು",
    activityLogTableTimestamp: "ಸಮಯ ಮುದ್ರೆ",
    auditEventRegister: "ಖಾತೆ ರಚಿಸಲಾಗಿದೆ",
    auditEventRegisterFailed: "ನೋಂದಣಿ ಪ್ರಯತ್ನವನ್ನು ನಿರ್ಬಂಧಿಸಲಾಗಿದೆ",
    auditEventLogin: "ಸೈನ್ ಇನ್ ಮಾಡಲಾಗಿದೆ",
    auditEventLoginFailed: "ಸೈನ್-ಇನ್ ಪ್ರಯತ್ನವು ವಿಫಲವಾಗಿದೆ",
    auditEventLogout: "ಸೈನ್ ಔಟ್ ಮಾಡಲಾಗಿದೆ",
    auditReasonEmailExists: "ಇಮೇಲ್ ಈಗಾಗಲೇ ನೋಂದಾಯಿಸಲಾಗಿದೆ",
    auditReasonUserNotFound: "ಇಮೇಲ್ ಗುರುತಿಸಲಾಗಿಲ್ಲ",
    auditReasonInvalidPassword: "ತಪ್ಪಾದ ಪಾಸ್‌ವರ್ಡ್",
    auditReasonUnknown: "ಕಾರಣ ಲಭ್ಯವಿಲ್ಲ",
    
    // Todo List
    todoList: "ಟೋಡೋ ಪಟ್ಟಿ",
    addNewTodo: "ಹೊಸ ಕಾರ್ಯವನ್ನು ಸೇರಿಸಿ",
    todoTitle: "ಕಾರ್ಯದ ಶೀರ್ಷಿಕೆ",
    todoDescription: "ಕಾರ್ಯದ ವಿವರಣೆ (ಐಚ್ಛಿಕ)",
    addTodo: "ಕಾರ್ಯವನ್ನು ಸೇರಿಸಿ",
    noTodos: "ಇನ್ನೂ ಕಾರ್ಯಗಳಿಲ್ಲ. ಪ್ರಾರಂಭಿಸಲು ಒಂದನ್ನು ಸೇರಿಸಿ!",
    
    // Home Page
    title: "ಕಿಸಾನ್ ಸೇವಾ",
    subtitle: "ಜ್ಞಾನ ಮತ್ತು ಆರೈಕೆಯೊಂದಿಗೆ ರೈತರನ್ನು ಸಬಲೀಕರಿಸುವುದು",
    features: "ನಮ್ಮ ಸೇವೆಗಳು",
    feature1Title: "ರೋಗ ಅರಿವು",
    feature1Desc: "ನಿಮ್ಮ ಜಾನುವಾರುಗಳ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರುವ ಸಾಮಾನ್ಯ ರೋಗಗಳ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ ಮತ್ತು ಅವುಗಳನ್ನು ಹೇಗೆ ತಡೆಯುವುದು",
    feature2Title: "ನೈರ್ಮಲ್ಯ ಮೌಲ್ಯಮಾಪನ",
    feature2Desc: "ನಿಮ್ಮ ಜಮೀನಿನ ನೈರ್ಮಲ್ಯ ಮಾನದಂಡಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ ಮತ್ತು ವೈಯಕ್ತಿಕ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ",
    feature3Title: "ತಜ್ಞರ ಮಾರ್ಗದರ್ಶನ",
    feature3Desc: "ಆರೋಗ್ಯಕರ ಕೋಳಿ ಮತ್ತು ಜಾನುವಾರು ಸಾಕಣೆ ನಿರ್ವಹಿಸುವ ಬಗ್ಗೆ ತಜ್ಞರ ಸಲಹೆ ಪಡೆಯಿರಿ",
    getStarted: "ಪ್ರಾರಂಭಿಸಿ",
    
    // Awareness Page
    awarenessTitle: "ರೋಗ ಅರಿವು",
    poultryDiseases: "ಸಾಮಾನ್ಯ ಕೋಳಿ ರೋಗಗಳು",
    cattleDiseases: "ಸಾಮಾನ್ಯ ಜಾನುವಾರು ರೋಗಗಳು",
    symptoms: "ಲಕ್ಷಣಗಳು",
    treatment: "ಚಿಕಿತ್ಸೆ",
    prevention: "ತಡೆಗಟ್ಟುವಿಕೆ",
    
    // Poultry Diseases
    newcastleDisease: "ನ್ಯೂಕ್ಯಾಸಲ್ ರೋಗ",
    newcastleSymptoms: "ಉಸಿರಾಟದ ತೊಂದರೆ, ಹಸಿರು ಬಣ್ಣದ ಅತಿಸಾರ, ನರಗಳ ಚಿಹ್ನೆಗಳು, ಕಣ್ಣು ಮತ್ತು ಕುತ್ತಿಗೆ ಸುತ್ತಲೂ ಊತ, ಮೊಟ್ಟೆ ಉತ್ಪಾದನೆ ಕಡಿಮೆ",
    newcastleTreatment: "ನಿರ್ದಿಷ್ಟ ಚಿಕಿತ್ಸೆ ಇಲ್ಲ. ದ್ವಿತೀಯ ಸೋಂಕನ್ನು ತಡೆಗಟ್ಟಲು ಪ್ರತಿಜೀವಕಗಳೊಂದಿಗೆ ಪೋಷಕ ಆರೈಕೆ. ಲಸಿಕೆ ಮುಖ್ಯ.",
    newcastlePrevention: "ಲಸಿಕೆ, ಜೈವಿಕ ಭದ್ರತಾ ಕ್ರಮಗಳು, ಹೊಸ ಪಕ್ಷಿಗಳನ್ನು ಪ್ರತ್ಯೇಕಿಸಿ, ಸರಿಯಾದ ವಾತಾಯನ",
    
    fowlPox: "ಫೌಲ್ ಪಾಕ್ಸ್",
    fowlPoxSymptoms: "ಬಾಚಣಿಗೆ ಮತ್ತು ವಾಟಲ್‌ಗಳ ಮೇಲೆ ನರಹುಲಿಗಳಂತಹ ಗಾಯಗಳು, ಮೊಟ್ಟೆ ಉತ್ಪಾದನೆ ಕಡಿಮೆ, ಡಿಪ್ತೀರಿಟಿಕ್ ರೂಪವಾದರೆ ಉಸಿರಾಡಲು ಕಷ್ಟ",
    fowlPoxTreatment: "ಪೋಷಕ ಆರೈಕೆ, ಹೊರೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ, ಅಯೋಡಿನ್ ದ್ರಾವಣ ಹಚ್ಚಿ, ದ್ವಿತೀಯ ಸೋಂಕಿಗೆ ಪ್ರತಿಜೀವಕಗಳು",
    fowlPoxPrevention: "ಲಸಿಕೆ, ಸೊಳ್ಳೆ ಮತ್ತು ನೊಣಗಳನ್ನು ನಿಯಂತ್ರಿಸಿ, ಉತ್ತಮ ವಾತಾಯನ, ಸರಿಯಾದ ಪೋಷಣೆ",
    
    coccidiosis: "ಕೊಕ್ಸಿಡಿಯೋಸಿಸ್",
    coccidiosisSymptoms: "ರಕ್ತಸಿಕ್ತ ಅತಿಸಾರ, ದುರ್ಬಲತೆ, ಜರ್ಜರಿತ ಗರಿಗಳು, ಬೆಳವಣಿಗೆ ಕಡಿಮೆ, ನಿರ್ಜಲೀಕರಣ",
    coccidiosisTreatment: "ನೀರು ಅಥವಾ ಆಹಾರದಲ್ಲಿ ಆಂಟಿಕೊಕ್ಸಿಡಿಯಲ್ ಔಷಧಗಳು, ಎಲೆಕ್ಟ್ರೋಲೈಟ್‌ಗಳು, ರಕ್ತಸ್ರಾವಕ್ಕೆ ವಿಟಮಿನ್ ಕೆ",
    coccidiosisPrevention: "ಶುಚಿಯಾದ ಒಣ ಹಾಸಿಗೆ, ಸರಿಯಾದ ವಾತಾಯನ, ಆಹಾರದಲ್ಲಿ ಆಂಟಿಕೊಕ್ಸಿಡಿಯಲ್ ಔಷಧ, ಜನಸಂದಣಿ ತಪ್ಪಿಸಿ",
    
    // Cattle Diseases
    fmd: "ಕಾಲು ಮತ್ತು ಬಾಯಿ ರೋಗ",
    fmdSymptoms: "ಜ್ವರ, ಬಾಯಿ, ನಾಲಿಗೆ, ಕಾಲು, ಮೊಲೆತೊಟ್ಟುಗಳ ಮೇಲೆ ಗುಳ್ಳೆಗಳು, ಅತಿಯಾದ ಲಾಲಾರಸ, ಕುಂಟುತನ, ಹಾಲು ಉತ್ಪಾದನೆ ಕಡಿಮೆ",
    fmdTreatment: "ಪೋಷಕ ಆರೈಕೆ, ದ್ವಿತೀಯ ಸೋಂಕಿಗೆ ಪ್ರತಿಜೀವಕಗಳು, ಉರಿಯೂತದ ನಿರೋಧಕ ಔಷಧಗಳು, ಸರಿಯಾದ ಪೋಷಣೆ",
    fmdPrevention: "ಲಸಿಕೆ, ಸೋಂಕಿತ ಪ್ರಾಣಿಗಳನ್ನು ಪ್ರತ್ಯೇಕಿಸಿ, ಜೈವಿಕ ಭದ್ರತೆ, ಆವರಣ ಸೋಂಕುನಿವಾರಣೆ",
    
    mastitis: "ಮಾಸ್ಟೈಟಿಸ್",
    mastitisSymptoms: "ಊತ ಉಬ್ಬಿದ ಕೆಚ್ಚಲು, ಬಿಸಿ ಮತ್ತು ನೋವಿನ ಕೆಚ್ಚಲು, ಅಸಹಜ ಹಾಲು (ಹೆಪ್ಪುಗಟ್ಟುವಿಕೆ, ನೀರಿನಂತೆ), ಹಾಲು ಉತ್ಪಾದನೆ ಕಡಿಮೆ, ಜ್ವರ",
    mastitisTreatment: "ಪ್ರತಿಜೀವಕಗಳು (ಇಂಟ್ರಾಮ್ಯಾಮರಿ ಮತ್ತು ಸಿಸ್ಟಮಿಕ್), ಉರಿಯೂತದ ನಿರೋಧಕ ಔಷಧಗಳು, ಆಗಾಗ್ಗೆ ಹಾಲು ಕರೆಯುವುದು, ಪೋಷಕ ಆರೈಕೆ",
    mastitisPrevention: "ಸರಿಯಾದ ಹಾಲು ಕರೆಯುವ ನೈರ್ಮಲ್ಯ, ಮೊಲೆತೊಟ್ಟು ಮುಳುಗಿಸುವುದು, ನಿಯಮಿತ ಕೆಚ್ಚಲು ಪರೀಕ್ಷೆ, ಶುದ್ಧ ಹಾಸಿಗೆ, ಸಮತೋಲಿತ ಪೋಷಣೆ",
    
    blackQuarter: "ಕಪ್ಪು ಕಾಲು ರೋಗ",
    blackQuarterSymptoms: "ಅತಿ ಜ್ವರ, ಬಾಧಿತ ಸ್ನಾಯುಗಳ ಊತ (ಸಾಮಾನ್ಯವಾಗಿ ಹಿಂಭಾಗ), ಕುಂಟುತನ, ಖಿನ್ನತೆ, ಹಠಾತ್ ಸಾವು",
    blackQuarterTreatment: "ಬೇಗ ಹಿಡಿದರೆ ಪೆನಿಸಿಲಿನ್ ಹೆಚ್ಚಿನ ಪ್ರಮಾಣ, ಪೋಷಕ ಆರೈಕೆ, ಲಕ್ಷಣಗಳು ಕಾಣಿಸಿದ ನಂತರ ಸಾಮಾನ್ಯವಾಗಿ ಮಾರಕ",
    blackQuarterPrevention: "ಲಸಿಕೆ (ಅತ್ಯಂತ ಪರಿಣಾಮಕಾರಿ), ಕಲುಷಿತ ಪ್ರದೇಶಗಳಲ್ಲಿ ಮೇಯಿಸುವುದನ್ನು ತಪ್ಪಿಸಿ, ಶವಗಳ ಸರಿಯಾದ ವಿಲೇವಾರಿ",
    
    // Hygiene Test
    testTitle: "ಫಾರ್ಮ್ ನೈರ್ಮಲ್ಯ ಮೌಲ್ಯಮಾಪನ",
    selectFarmType: "ಫಾರ್ಮ್ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    poultryFarm: "ಕೋಳಿ ಫಾರ್ಮ್",
    cattleFarm: "ಜಾನುವಾರು ಫಾರ್ಮ್",
    startTest: "ಮೌಲ್ಯಮಾಪನ ಪ್ರಾರಂಭಿಸಿ",
    nextQuestion: "ಮುಂದಿನ ಪ್ರಶ್ನೆ",
    submitTest: "ಮೌಲ್ಯಮಾಪನ ಸಲ್ಲಿಸಿ",
    backToTest: "ಪರೀಕ್ಷೆಗೆ ಹಿಂತಿರುಗಿ",
    
    // Poultry Questions
    poultryQ1: "ನೀವು ಕೋಳಿ ಮನೆಯನ್ನು ಎಷ್ಟು ಬಾರಿ ಸ್ವಚ್ಛಗೊಳಿಸುತ್ತೀರಿ ಮತ್ತು ಸೋಂಕುನಿವಾರಣೆ ಮಾಡುತ್ತೀರಿ?",
    poultryQ1A1: "ಪ್ರತಿದಿನ",
    poultryQ1A2: "ವಾರಕ್ಕೊಮ್ಮೆ",
    poultryQ1A3: "ತಿಂಗಳಿಗೊಮ್ಮೆ",
    poultryQ1A4: "ಅಪರೂಪವಾಗಿ",
    
    poultryQ2: "ನಿಮ್ಮ ಕೋಳಿ ಮನೆಯಲ್ಲಿ ಸರಿಯಾದ ವಾತಾಯನ ಇದೆಯೇ?",
    poultryQ2A1: "ಫ್ಯಾನ್‌ಗಳೊಂದಿಗೆ ಅತ್ಯುತ್ತಮ ವಾತಾಯನ",
    poultryQ2A2: "ಉತ್ತಮ ನೈಸರ್ಗಿಕ ವಾತಾಯನ",
    poultryQ2A3: "ಮಧ್ಯಮ ವಾತಾಯನ",
    poultryQ2A4: "ಕಳಪೆ ವಾತಾಯನ",
    
    poultryQ3: "ನೀವು ಕೋಳಿ ತ್ಯಾಜ್ಯವನ್ನು ಹೇಗೆ ನಿರ್ವಹಿಸುತ್ತೀರಿ?",
    poultryQ3A1: "ದೈನಂದಿನ ತೆಗೆದುಹಾಕುವಿಕೆ ಮತ್ತು ಸರಿಯಾದ ಗೊಬ್ಬರ",
    poultryQ3A2: "ನಿಯಮಿತ ತೆಗೆದುಹಾಕುವಿಕೆ (ವಾರಕ್ಕೆ 2-3 ಬಾರಿ)",
    poultryQ3A3: "ವಾರಕ್ಕೊಮ್ಮೆ ತೆಗೆದುಹಾಕುವಿಕೆ",
    poultryQ3A4: "ಅನಿಯಮಿತ ತೆಗೆದುಹಾಕುವಿಕೆ",
    
    poultryQ4: "ನೀವು ಶುದ್ಧ ನೀರಿನ ಮೂಲಗಳನ್ನು ನಿರ್ವಹಿಸುತ್ತೀರಾ?",
    poultryQ4A1: "ಸೋಂಕುನಿವಾರಕ ಧಾರಕಗಳೊಂದಿಗೆ ದೈನಂದಿನ ಬದಲಾವಣೆ",
    poultryQ4A2: "ದೈನಂದಿನ ಬದಲಾವಣೆ",
    poultryQ4A3: "ಪ್ರತಿ 2-3 ದಿನಗಳಲ್ಲಿ ಬದಲಾವಣೆ",
    poultryQ4A4: "ಅನಿಯಮಿತ ಬದಲಾವಣೆ",
    
    poultryQ5: "ಹಿಂಡಿಗೆ ಪರಿಚಯಿಸುವ ಮೊದಲು ಹೊಸ ಪಕ್ಷಿಗಳನ್ನು ಪ್ರತ್ಯೇಕಿಸಲಾಗಿದೆಯೇ?",
    poultryQ5A1: "ಹೌದು, ಯಾವಾಗಲೂ (14+ ದಿನಗಳು)",
    poultryQ5A2: "ಕೆಲವೊಮ್ಮೆ (7-14 ದಿನಗಳು)",
    poultryQ5A3: "ಅಪರೂಪವಾಗಿ",
    poultryQ5A4: "ಎಂದಿಗೂ ಅಲ್ಲ",
    
    // Cattle Questions
    cattleQ1: "ನೀವು ಜಾನುವಾರು ಶೆಡ್ ಅನ್ನು ಎಷ್ಟು ಬಾರಿ ಸ್ವಚ್ಛಗೊಳಿಸುತ್ತೀರಿ?",
    cattleQ1A1: "ಪ್ರತಿದಿನ",
    cattleQ1A2: "ಪ್ರತಿ 2-3 ದಿನಗಳು",
    cattleQ1A3: "ವಾರಕ್ಕೊಮ್ಮೆ",
    cattleQ1A4: "ಅಪರೂಪವಾಗಿ",
    
    cattleQ2: "ಹಾಲು ಕರೆಯುವ ಸಮಯದಲ್ಲಿ ನೀವು ಕೆಚ್ಚಲಿನ ನೈರ್ಮಲ್ಯವನ್ನು ಹೇಗೆ ನಿರ್ವಹಿಸುತ್ತೀರಿ?",
    cattleQ2A1: "ಸೋಂಕುನಿವಾರಕದಿಂದ ತೊಳೆಯಿರಿ, ಮೊದಲು ಮತ್ತು ನಂತರ ಮೊಲೆತೊಟ್ಟು ಮುಳುಗಿಸುವುದು",
    cattleQ2A2: "ನೀರಿನಿಂದ ತೊಳೆಯಿರಿ, ಹಾಲು ಕರೆದ ನಂತರ ಮೊಲೆತೊಟ್ಟು ಮುಳುಗಿಸುವುದು",
    cattleQ2A3: "ಕೇವಲ ಮೂಲಭೂತ ತೊಳೆಯುವಿಕೆ",
    cattleQ2A4: "ಕನಿಷ್ಠ ಅಥವಾ ಯಾವುದೇ ಶುಚಿಗೊಳಿಸುವಿಕೆ ಇಲ್ಲ",
    
    cattleQ3: "ನಿಮ್ಮ ಜಾನುವಾರು ಶೆಡ್ ಚೆನ್ನಾಗಿ ಗಾಳಿಯಿಂದ ಕೂಡಿದೆಯೇ ಮತ್ತು ಒಣಗಿದೆಯೇ?",
    cattleQ3A1: "ಅತ್ಯುತ್ತಮ - ಚೆನ್ನಾಗಿ ಗಾಳಿಯಿಂದ ಕೂಡಿದೆ ಮತ್ತು ಯಾವಾಗಲೂ ಒಣಗಿದೆ",
    cattleQ3A2: "ಉತ್ತಮ - ಸಾಕಷ್ಟು ವಾತಾಯನ",
    cattleQ3A3: "ಮಧ್ಯಮ - ಕೆಲವು ತೇವಾಂಶ ಇದೆ",
    cattleQ3A4: "ಕಳಪೆ - ಆಗಾಗ್ಗೆ ತೇವವಾಗಿರುತ್ತದೆ ಮತ್ತು ಕಳಪೆ ಗಾಳಿಯಿಂದ ಕೂಡಿದೆ",
    
    cattleQ4: "ನೀವು ಜಾನುವಾರು ತ್ಯಾಜ್ಯವನ್ನು ಹೇಗೆ ನಿರ್ವಹಿಸುತ್ತೀರಿ?",
    cattleQ4A1: "ದೈನಂದಿನ ತೆಗೆದುಹಾಕುವಿಕೆ ಮತ್ತು ಸರಿಯಾದ ಗೊಬ್ಬರ",
    cattleQ4A2: "ನಿಯಮಿತ ತೆಗೆದುಹಾಕುವಿಕೆ (ವಾರಕ್ಕೆ 2-3 ಬಾರಿ)",
    cattleQ4A3: "ವಾರಕ್ಕೊಮ್ಮೆ ತೆಗೆದುಹಾಕುವಿಕೆ",
    cattleQ4A4: "ಅನಿಯಮಿತ ತೆಗೆದುಹಾಕುವಿಕೆ",
    
    cattleQ5: "ನೀವು ಅನಾರೋಗ್ಯದ ಪ್ರಾಣಿಗಳನ್ನು ತಕ್ಷಣ ಪ್ರತ್ಯೇಕಿಸುತ್ತೀರಾ?",
    cattleQ5A1: "ಹೌದು, ಯಾವಾಗಲೂ ತಕ್ಷಣದ ಪಶುವೈದ್ಯ ಆರೈಕೆಯೊಂದಿಗೆ",
    cattleQ5A2: "ಸಾಮಾನ್ಯವಾಗಿ, ಸಮಯೋಚಿತ ಆರೈಕೆಯೊಂದಿಗೆ",
    cattleQ5A3: "ಕೆಲವೊಮ್ಮೆ",
    cattleQ5A4: "ಅಪರೂಪವಾಗಿ ಅಥವಾ ಎಂದಿಗೂ ಅಲ್ಲ",
    
    // Results
    resultsTitle: "ಮೌಲ್ಯಮಾಪನ ಫಲಿತಾಂಶಗಳು",
    riskLevel: "ನೈರ್ಮಲ್ಯ ಮಾನದಂಡ",
    excellent: "ಅತ್ಯುತ್ತಮ",
    good: "ಉತ್ತಮ",
    moderate: "ಮಧ್ಯಮ",
    poor: "ಕಳಪೆ",
    excellentMsg: "ನಿಮ್ಮ ಫಾರ್ಮ್ ನೈರ್ಮಲ್ಯ ಅತ್ಯುತ್ತಮವಾಗಿದೆ! ಉತ್ತಮ ಅಭ್ಯಾಸಗಳನ್ನು ಮುಂದುವರಿಸಿ.",
    goodMsg: "ನಿಮ್ಮ ಫಾರ್ಮ್ ನೈರ್ಮಲ್ಯ ಉತ್ತಮವಾಗಿದೆ, ಆದರೆ ಸುಧಾರಣೆಗೆ ಅವಕಾಶವಿದೆ.",
    moderateMsg: "ರೋಗ ಏಕಾಏಕಿ ತಡೆಗಟ್ಟಲು ನಿಮ್ಮ ಫಾರ್ಮ್ ನೈರ್ಮಲ್ಯಕ್ಕೆ ಸುಧಾರಣೆ ಅಗತ್ಯವಿದೆ.",
    poorMsg: "ತುರ್ತು ಕ್ರಮ ಅಗತ್ಯ! ನಿಮ್ಮ ಫಾರ್ಮ್ ರೋಗ ಏಕಾಏಕಿ ಹೆಚ್ಚಿನ ಅಪಾಯದಲ್ಲಿದೆ.",
    recommendations: "ಶಿಫಾರಸುಗಳು",
    
    // Recommendations
    rec_excellent_1: "ನಿಮ್ಮ ಅತ್ಯುತ್ತಮ ನೈರ್ಮಲ್ಯ ಅಭ್ಯಾಸಗಳನ್ನು ಮುಂದುವರಿಸಿ",
    rec_excellent_2: "ನಿಯಮಿತ ಶುಚಿಗೊಳಿಸುವಿಕೆ ಮತ್ತು ಸೋಂಕುನಿವಾರಣೆ ವೇಳಾಪಟ್ಟಿಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
    rec_excellent_3: "ನಿಮ್ಮ ಜಾನುವಾರುಗಳ ವಿವರವಾದ ಆರೋಗ್ಯ ದಾಖಲೆಗಳನ್ನು ಇರಿಸಿ",
    rec_excellent_4: "ಲಸಿಕೆ ವೇಳಾಪಟ್ಟಿಗಳೊಂದಿಗೆ ನವೀಕರಿಸಿ",
    
    rec_good_1: "ಶುಚಿಗೊಳಿಸುವಿಕೆ ಮತ್ತು ಸೋಂಕುನಿವಾರಣೆ ಆವರ್ತನವನ್ನು ಹೆಚ್ಚಿಸಿ",
    rec_good_2: "ವಸತಿ ಪ್ರದೇಶಗಳಲ್ಲಿ ವಾತಾಯನವನ್ನು ಸುಧಾರಿಸಿ",
    rec_good_3: "ಕಟ್ಟುನಿಟ್ಟಾದ ಜೈವಿಕ ಭದ್ರತಾ ಕ್ರಮಗಳನ್ನು ಅನುಷ್ಠಾನಗೊಳಿಸಿ",
    rec_good_4: "ನಿಯಮಿತ ಆರೋಗ್ಯ ಮೇಲ್ವಿಚಾರಣೆ ಮತ್ತು ಪಶುವೈದ್ಯ ತಪಾಸಣೆ",
    rec_good_5: "ಸರಿಯಾದ ತ್ಯಾಜ್ಯ ನಿರ್ವಹಣಾ ವ್ಯವಸ್ಥೆ ಅಗತ್ಯವಿದೆ",
    
    rec_moderate_1: "ದೈನಂದಿನ ಶುಚಿಗೊಳಿಸುವಿಕೆಯಲ್ಲಿ ತಕ್ಷಣದ ಸುಧಾರಣೆ ಅಗತ್ಯವಿದೆ",
    rec_moderate_2: "ಸರಿಯಾದ ವಾತಾಯನ ವ್ಯವಸ್ಥೆಯನ್ನು ಸ್ಥಾಪಿಸಿ",
    rec_moderate_3: "ಹೊಸ ಪ್ರಾಣಿಗಳಿಗೆ ಕ್ವಾರಂಟೈನ್ ಪ್ರೋಟೋಕಾಲ್ ಪ್ರಾರಂಭಿಸಿ",
    rec_moderate_4: "ನೀರು ಮತ್ತು ಆಹಾರ ನಿರ್ವಹಣೆಯನ್ನು ನವೀಕರಿಸಿ",
    rec_moderate_5: "ಆರೋಗ್ಯ ಮೌಲ್ಯಮಾಪನಕ್ಕಾಗಿ ಪಶುವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ",
    rec_moderate_6: "ತ್ಯಾಜ್ಯ ತೆಗೆದುಹಾಕುವ ವೇಳಾಪಟ್ಟಿಯನ್ನು ಅನುಷ್ಠಾನಗೊಳಿಸಿ",
    
    rec_poor_1: "ತುರ್ತು: ನೈರ್ಮಲ್ಯ ಅಭ್ಯಾಸಗಳ ಸಂಪೂರ್ಣ ನವೀಕರಣ ಅಗತ್ಯವಿದೆ",
    rec_poor_2: "ದೈನಂದಿನ ಶುಚಿಗೊಳಿಸುವಿಕೆ ಮತ್ತು ಸೋಂಕುನಿವಾರಣೆ ನಿರ್ಣಾಯಕವಾಗಿದೆ",
    rec_poor_3: "ತಕ್ಷಣದ ಪಶುವೈದ್ಯ ಸಮಾಲೋಚನೆ ಅಗತ್ಯವಿದೆ",
    rec_poor_4: "ಅನಾರೋಗ್ಯದ ಪ್ರಾಣಿಗಳನ್ನು ತಕ್ಷಣ ಪ್ರತ್ಯೇಕಿಸಿ",
    rec_poor_5: "ತುರ್ತಾಗಿ ಸರಿಯಾದ ವಾತಾಯನವನ್ನು ಅನುಷ್ಠಾನಗೊಳಿಸಿ",
    rec_poor_6: "ನೀರಿನ ಶುಚಿಗೊಳಿಸುವ ಪ್ರೋಟೋಕಾಲ್ ಸ್ಥಾಪಿಸಿ",
    rec_poor_7: "ತ್ಯಾಜ್ಯ ನಿರ್ವಹಣಾ ವ್ಯವಸ್ಥೆಯನ್ನು ರಚಿಸಿ",
    rec_poor_8: "ಜಾನುವಾರು ಸಂಖ್ಯೆಯಲ್ಲಿ ತಾತ್ಕಾಲಿಕ ಕಡಿತವನ್ನು ಪರಿಗಣಿಸಿ",
    
    // About Page
    aboutTitle: "ಕಿಸಾನ್ ಸೇವಾ ಬಗ್ಗೆ",
    aboutSubtitle: "ಜ್ಞಾನದೊಂದಿಗೆ ರೈತರನ್ನು ಸಬಲೀಕರಿಸುವುದು",
    aboutText: "ಕಿಸಾನ್ ಸೇವಾ ಶಿಕ್ಷಣ, ಅರಿವು ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಮಾರ್ಗದರ್ಶನದ ಮೂಲಕ ರೈತರಿಗೆ ಆರೋಗ್ಯಕರ ಜಾನುವಾರುಗಳನ್ನು ನಿರ್ವಹಿಸಲು ಸಹಾಯ ಮಾಡಲು ಸಮರ್ಪಿತವಾಗಿದೆ. ನಾವು ಕೋಳಿ ಮತ್ತು ಜಾನುವಾರು ಸಾಕಣೆಗೆ ರೋಗ ತಡೆಗಟ್ಟುವಿಕೆ, ನೈರ್ಮಲ್ಯ ನಿರ್ವಹಣೆ ಮತ್ತು ಉತ್ತಮ ಅಭ್ಯಾಸಗಳ ಬಗ್ಗೆ ಸಮಗ್ರ ಮಾಹಿತಿಯನ್ನು ಒದಗಿಸುತ್ತೇವೆ.",
    ourMission: "ನಮ್ಮ ಧ್ಯೇಯ",
    missionText: "ರೈತರಿಗೆ ಆರೋಗ್ಯಕರ ಜಮೀನುಗಳನ್ನು ನಿರ್ವಹಿಸಲು ಮತ್ತು ರೋಗ ಏಕಾಏಕಿ ತಡೆಗಟ್ಟಲು ಸಹಾಯ ಮಾಡುವ ಪ್ರವೇಶಿಸಬಹುದಾದ, ಬಹುಭಾಷಾ ಮಾಹಿತಿಯೊಂದಿಗೆ ಸಬಲೀಕರಿಸುವುದು.",
    contactUs: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
