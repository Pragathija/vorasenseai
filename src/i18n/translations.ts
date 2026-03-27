export type LanguageCode = "en" | "hi" | "ta" | "es" | "fr" | "de" | "ja" | "zh";

export interface Translations {
  // Navbar
  login: string;
  signUp: string;
  // Landing
  heroBadge: string;
  heroTitle1: string;
  heroTitle2: string;
  heroDesc: string;
  getStarted: string;
  seeHow: string;
  activeLearners: string;
  accessibilityScore: string;
  voiceCommands: string;
  userRating: string;
  whyVoraSense: string;
  whyDesc: string;
  voiceFirst: string;
  voiceFirstDesc: string;
  adaptiveAI: string;
  adaptiveAIDesc: string;
  smartAnalytics: string;
  smartAnalyticsDesc: string;
  multilingualSupport: string;
  multilingualDesc: string;
  accessibleDesign: string;
  accessibleDesc: string;
  globalLeaderboard: string;
  globalLeaderboardDesc: string;
  // Login
  welcomeBack: string;
  signInDesc: string;
  emailAddress: string;
  password: string;
  forgotPassword: string;
  signIn: string;
  newToVoraSense: string;
  newDesc: string;
  createAccount: string;
  // Register
  joinFuture: string;
  createAccountTitle: string;
  startJourney: string;
  basicInfo: string;
  personalDetails: string;
  accessibility: string;
  fullName: string;
  confirmPassword: string;
  continue_: string;
  back: string;
  age: string;
  gender: string;
  country: string;
  learningGoal: string;
  visualImpairment: string;
  voicePreference: string;
  preferredLanguage: string;
  // Dashboard
  welcomeBackDash: string;
  continueJourney: string;
  startLearning: string;
  aiGenerate: string;
  searchLessons: string;
  // Learning
  yourLearning: string;
  journey: string;
  masterSkills: string;
  chooseTrack: string;
  totalXP: string;
  currentLevel: string;
  learningTime: string;
  achievements: string;
  foundationTrack: string;
  dsaTrack: string;
  voiceDev: string;
  advancedTrack: string;
  // Voice Tutor
  topics: string;
  allChats: string;
  startConversation: string;
  askAnything: string;
  currentContext: string;
  activeTopic: string;
  relatedLessons: string;
  tryAsking: string;
  typeOrSpeak: string;
  // Analytics
  weeklyProgress: string;
  monthlyTargets: string;
  dailyPerformance: string;
  // Leaderboard
  leaderboard: string;
  seeRank: string;
  worldwide: string;
  nationwide: string;
  noLearnersYet: string;
  // Settings
  settings: string;
  customizeExperience: string;
  profile: string;
  voiceSpeech: string;
  accessibilitySettings: string;
  learningPreferences: string;
  notifications: string;
  dataPrivacy: string;
  appearance: string;
  saveChanges: string;
  // BrainMic
  aiAssistant: string;
  alwaysListening: string;
}

const en: Translations = {
  login: "Login", signUp: "Sign Up",
  heroBadge: "AI-Powered Inclusive Learning",
  heroTitle1: "Adaptive Voice", heroTitle2: "Learning Platform",
  heroDesc: "An AI-powered educational platform designed for inclusive learning — leveraging advanced voice recognition and adaptive algorithms to create personalized experiences for visually impaired and differently-abled students.",
  getStarted: "Get Started Free", seeHow: "See How It Works",
  activeLearners: "Active Learners", accessibilityScore: "Accessibility Score",
  voiceCommands: "Voice Commands", userRating: "User Rating",
  whyVoraSense: "Why VoraSense?", whyDesc: "Built with cutting-edge ML and accessibility at the core.",
  voiceFirst: "Voice-First Learning", voiceFirstDesc: "Learn through natural voice interactions with AI-powered tutoring.",
  adaptiveAI: "Adaptive AI Engine", adaptiveAIDesc: "ML models detect confusion and adapt content difficulty in real-time.",
  smartAnalytics: "Smart Analytics", smartAnalyticsDesc: "Track progress with cognitive scoring and personalized insights.",
  multilingualSupport: "Multilingual Support", multilingualDesc: "Learn in 8+ languages with real-time voice translation.",
  accessibleDesign: "Accessible by Design", accessibleDesc: "Built for visually impaired and differently-abled students.",
  globalLeaderboard: "Global Leaderboard", globalLeaderboardDesc: "Compete nationwide and worldwide with fellow learners.",
  welcomeBack: "Welcome Back!", signInDesc: "Sign in to continue your learning journey",
  emailAddress: "Email Address", password: "Password", forgotPassword: "Forgot password?",
  signIn: "Sign In", newToVoraSense: "New to VoraSense?",
  newDesc: "Our AI-powered platform adapts to your learning style with voice-first interactions and accessibility features.",
  createAccount: "Create Account",
  joinFuture: "Join the future of learning", createAccountTitle: "Create Account",
  startJourney: "Start your personalized learning journey with VoraSense",
  basicInfo: "Basic Info", personalDetails: "Personal Details", accessibility: "Accessibility",
  fullName: "Full Name", confirmPassword: "Confirm Password", continue_: "Continue", back: "Back",
  age: "Age", gender: "Gender", country: "Country", learningGoal: "Learning Goal",
  visualImpairment: "Visual Impairment Level", voicePreference: "Voice Preference", preferredLanguage: "Preferred Language",
  welcomeBackDash: "Welcome back", continueJourney: "Continue your AI-powered learning journey",
  startLearning: "Start Learning", aiGenerate: "AI will generate a personalized learning path for you",
  searchLessons: "Search lessons...",
  yourLearning: "Your Learning", journey: "Journey", masterSkills: "Master skills with personalized learning paths",
  chooseTrack: "Choose Your Track", totalXP: "Total XP", currentLevel: "Current Level",
  learningTime: "Learning Time", achievements: "Achievements",
  foundationTrack: "Foundation Track", dsaTrack: "DSA Track", voiceDev: "Voice Development", advancedTrack: "Advanced Track",
  topics: "Topics", allChats: "All Chats", startConversation: "Start a conversation",
  askAnything: "Ask anything about your learning topics", currentContext: "Current Context",
  activeTopic: "Active Topic", relatedLessons: "Related Lessons", tryAsking: "Try Asking",
  typeOrSpeak: "Type or speak...",
  weeklyProgress: "Weekly Progress", monthlyTargets: "Monthly Targets", dailyPerformance: "Daily Performance Trend",
  leaderboard: "Leaderboard", seeRank: "See how you rank against learners worldwide",
  worldwide: "Worldwide", nationwide: "Nationwide", noLearnersYet: "No learners yet",
  settings: "Settings", customizeExperience: "Customize your learning experience",
  profile: "Profile", voiceSpeech: "Voice & Speech", accessibilitySettings: "Accessibility",
  learningPreferences: "Learning Preferences", notifications: "Notifications",
  dataPrivacy: "Data & Privacy", appearance: "Appearance", saveChanges: "Save Changes",
  aiAssistant: "VoraSense AI", alwaysListening: "Always listening",
};

const hi: Translations = {
  login: "लॉगिन", signUp: "साइन अप",
  heroBadge: "एआई-संचालित समावेशी शिक्षा",
  heroTitle1: "अनुकूली आवाज़", heroTitle2: "शिक्षा मंच",
  heroDesc: "समावेशी शिक्षा के लिए डिज़ाइन किया गया एआई-संचालित शैक्षिक मंच — दृष्टिबाधित और विशेष रूप से सक्षम छात्रों के लिए व्यक्तिगत अनुभव बनाने हेतु उन्नत वॉइस रिकॉग्निशन और अनुकूली एल्गोरिदम का लाभ उठाना।",
  getStarted: "मुफ़्त शुरू करें", seeHow: "कैसे काम करता है देखें",
  activeLearners: "सक्रिय शिक्षार्थी", accessibilityScore: "सुलभता स्कोर",
  voiceCommands: "वॉइस कमांड", userRating: "उपयोगकर्ता रेटिंग",
  whyVoraSense: "VoraSense क्यों?", whyDesc: "अत्याधुनिक ML और सुलभता के साथ निर्मित।",
  voiceFirst: "वॉइस-फर्स्ट लर्निंग", voiceFirstDesc: "एआई-संचालित ट्यूटरिंग के साथ प्राकृतिक वॉइस इंटरैक्शन से सीखें।",
  adaptiveAI: "अनुकूली एआई इंजन", adaptiveAIDesc: "ML मॉडल भ्रम का पता लगाते हैं और रीयल-टाइम में कठिनाई को अनुकूलित करते हैं।",
  smartAnalytics: "स्मार्ट एनालिटिक्स", smartAnalyticsDesc: "संज्ञानात्मक स्कोरिंग और व्यक्तिगत अंतर्दृष्टि के साथ प्रगति ट्रैक करें।",
  multilingualSupport: "बहुभाषी समर्थन", multilingualDesc: "8+ भाषाओं में रीयल-टाइम वॉइस अनुवाद के साथ सीखें।",
  accessibleDesign: "सुलभ डिज़ाइन", accessibleDesc: "दृष्टिबाधित और विशेष रूप से सक्षम छात्रों के लिए निर्मित।",
  globalLeaderboard: "वैश्विक लीडरबोर्ड", globalLeaderboardDesc: "साथी शिक्षार्थियों के साथ राष्ट्रीय और विश्वव्यापी प्रतिस्पर्धा करें।",
  welcomeBack: "वापसी पर स्वागत!", signInDesc: "अपनी सीखने की यात्रा जारी रखने के लिए साइन इन करें",
  emailAddress: "ईमेल पता", password: "पासवर्ड", forgotPassword: "पासवर्ड भूल गए?",
  signIn: "साइन इन", newToVoraSense: "VoraSense में नए हैं?",
  newDesc: "हमारा एआई-संचालित प्लेटफॉर्म वॉइस-फर्स्ट इंटरैक्शन और सुलभता सुविधाओं के साथ आपकी सीखने की शैली के अनुकूल है।",
  createAccount: "खाता बनाएं",
  joinFuture: "सीखने के भविष्य से जुड़ें", createAccountTitle: "खाता बनाएं",
  startJourney: "VoraSense के साथ अपनी व्यक्तिगत सीखने की यात्रा शुरू करें",
  basicInfo: "मूल जानकारी", personalDetails: "व्यक्तिगत विवरण", accessibility: "सुलभता",
  fullName: "पूरा नाम", confirmPassword: "पासवर्ड की पुष्टि", continue_: "जारी रखें", back: "वापस",
  age: "उम्र", gender: "लिंग", country: "देश", learningGoal: "सीखने का लक्ष्य",
  visualImpairment: "दृष्टि हानि स्तर", voicePreference: "आवाज़ प्राथमिकता", preferredLanguage: "पसंदीदा भाषा",
  welcomeBackDash: "वापसी पर स्वागत", continueJourney: "अपनी एआई-संचालित सीखने की यात्रा जारी रखें",
  startLearning: "सीखना शुरू करें", aiGenerate: "एआई आपके लिए एक व्यक्तिगत सीखने का पथ बनाएगा",
  searchLessons: "पाठ खोजें...",
  yourLearning: "आपकी सीखने की", journey: "यात्रा", masterSkills: "व्यक्तिगत सीखने के पथ के साथ कौशल में महारत हासिल करें",
  chooseTrack: "अपना ट्रैक चुनें", totalXP: "कुल XP", currentLevel: "वर्तमान स्तर",
  learningTime: "सीखने का समय", achievements: "उपलब्धियां",
  foundationTrack: "फाउंडेशन ट्रैक", dsaTrack: "DSA ट्रैक", voiceDev: "वॉइस डेवलपमेंट", advancedTrack: "एडवांस्ड ट्रैक",
  topics: "विषय", allChats: "सभी चैट", startConversation: "बातचीत शुरू करें",
  askAnything: "अपने सीखने के विषयों के बारे में कुछ भी पूछें", currentContext: "वर्तमान संदर्भ",
  activeTopic: "सक्रिय विषय", relatedLessons: "संबंधित पाठ", tryAsking: "पूछने का प्रयास करें",
  typeOrSpeak: "टाइप करें या बोलें...",
  weeklyProgress: "साप्ताहिक प्रगति", monthlyTargets: "मासिक लक्ष्य", dailyPerformance: "दैनिक प्रदर्शन रुझान",
  leaderboard: "लीडरबोर्ड", seeRank: "देखें कि आप दुनिया भर के शिक्षार्थियों के बीच कहां हैं",
  worldwide: "विश्वव्यापी", nationwide: "राष्ट्रव्यापी", noLearnersYet: "अभी तक कोई शिक्षार्थी नहीं",
  settings: "सेटिंग्स", customizeExperience: "अपने सीखने के अनुभव को अनुकूलित करें",
  profile: "प्रोफ़ाइल", voiceSpeech: "आवाज़ और भाषण", accessibilitySettings: "सुलभता",
  learningPreferences: "सीखने की प्राथमिकताएं", notifications: "सूचनाएं",
  dataPrivacy: "डेटा और गोपनीयता", appearance: "रूप", saveChanges: "परिवर्तन सहेजें",
  aiAssistant: "VoraSense AI", alwaysListening: "हमेशा सुन रहा है",
};

const ta: Translations = {
  login: "உள்நுழை", signUp: "பதிவு செய்",
  heroBadge: "AI-இயக்கப்படும் உள்ளடக்கிய கற்றல்",
  heroTitle1: "தகவமைப்பு குரல்", heroTitle2: "கற்றல் தளம்",
  heroDesc: "உள்ளடக்கிய கற்றலுக்காக வடிவமைக்கப்பட்ட AI-இயக்கப்படும் கல்வி தளம்.",
  getStarted: "இலவசமாக தொடங்கு", seeHow: "எப்படி வேலை செய்கிறது பாருங்கள்",
  activeLearners: "செயலில் உள்ள கற்பவர்கள்", accessibilityScore: "அணுகல் மதிப்பெண்",
  voiceCommands: "குரல் கட்டளைகள்", userRating: "பயனர் மதிப்பீடு",
  whyVoraSense: "ஏன் VoraSense?", whyDesc: "நவீன ML மற்றும் அணுகல்தன்மையுடன் கட்டமைக்கப்பட்டது.",
  voiceFirst: "குரல்-முதல் கற்றல்", voiceFirstDesc: "AI-இயக்கப்படும் பயிற்சியுடன் இயற்கையான குரல் தொடர்புகள் மூலம் கற்றுக்கொள்ளுங்கள்.",
  adaptiveAI: "தகவமைப்பு AI இயந்திரம்", adaptiveAIDesc: "ML மாதிரிகள் குழப்பத்தை கண்டறிந்து நிகழ்நேரத்தில் கடினத்தை மாற்றுகின்றன.",
  smartAnalytics: "ஸ்மார்ட் பகுப்பாய்வு", smartAnalyticsDesc: "அறிவாற்றல் மதிப்பெண் மற்றும் தனிப்பட்ட நுண்ணறிவுகளுடன் முன்னேற்றத்தை கண்காணிக்கவும்.",
  multilingualSupport: "பன்மொழி ஆதரவு", multilingualDesc: "8+ மொழிகளில் நிகழ்நேர குரல் மொழிபெயர்ப்புடன் கற்றுக்கொள்ளுங்கள்.",
  accessibleDesign: "அணுகக்கூடிய வடிவமைப்பு", accessibleDesc: "பார்வை குறைபாடுள்ள மாணவர்களுக்காக கட்டமைக்கப்பட்டது.",
  globalLeaderboard: "உலகளாவிய தரவரிசை", globalLeaderboardDesc: "சக கற்பவர்களுடன் தேசிய மற்றும் உலகளாவிய போட்டியிடுங்கள்.",
  welcomeBack: "மீண்டும் வரவேற்கிறோம்!", signInDesc: "உங்கள் கற்றல் பயணத்தை தொடர உள்நுழையவும்",
  emailAddress: "மின்னஞ்சல் முகவரி", password: "கடவுச்சொல்", forgotPassword: "கடவுச்சொல் மறந்துவிட்டதா?",
  signIn: "உள்நுழை", newToVoraSense: "VoraSense-க்கு புதியவரா?",
  newDesc: "எங்கள் AI-இயக்கப்படும் தளம் குரல்-முதல் தொடர்புகள் மற்றும் அணுகல் அம்சங்களுடன் உங்கள் கற்றல் பாணிக்கு ஏற்றவாறு மாற்றுகிறது.",
  createAccount: "கணக்கை உருவாக்கு",
  joinFuture: "கற்றலின் எதிர்காலத்தில் சேருங்கள்", createAccountTitle: "கணக்கை உருவாக்கு",
  startJourney: "VoraSense உடன் உங்கள் தனிப்பட்ட கற்றல் பயணத்தை தொடங்குங்கள்",
  basicInfo: "அடிப்படை தகவல்", personalDetails: "தனிப்பட்ட விவரங்கள்", accessibility: "அணுகல்",
  fullName: "முழு பெயர்", confirmPassword: "கடவுச்சொல்லை உறுதிப்படுத்து", continue_: "தொடரவும்", back: "பின்",
  age: "வயது", gender: "பாலினம்", country: "நாடு", learningGoal: "கற்றல் இலக்கு",
  visualImpairment: "பார்வை குறைபாடு நிலை", voicePreference: "குரல் விருப்பம்", preferredLanguage: "விரும்பிய மொழி",
  welcomeBackDash: "மீண்டும் வரவேற்கிறோம்", continueJourney: "உங்கள் AI-இயக்கப்படும் கற்றல் பயணத்தை தொடரவும்",
  startLearning: "கற்க தொடங்கு", aiGenerate: "AI உங்களுக்கு தனிப்பட்ட கற்றல் பாதையை உருவாக்கும்",
  searchLessons: "பாடங்களை தேடு...",
  yourLearning: "உங்கள் கற்றல்", journey: "பயணம்", masterSkills: "தனிப்பட்ட கற்றல் பாதைகளுடன் திறன்களை மாஸ்டர் செய்யுங்கள்",
  chooseTrack: "உங்கள் பாதையை தேர்வு செய்யுங்கள்", totalXP: "மொத்த XP", currentLevel: "தற்போதைய நிலை",
  learningTime: "கற்றல் நேரம்", achievements: "சாதனைகள்",
  foundationTrack: "அடிப்படை பாதை", dsaTrack: "DSA பாதை", voiceDev: "குரல் மேம்பாடு", advancedTrack: "மேம்பட்ட பாதை",
  topics: "தலைப்புகள்", allChats: "அனைத்து அரட்டைகள்", startConversation: "உரையாடலைத் தொடங்கு",
  askAnything: "உங்கள் கற்றல் தலைப்புகள் பற்றி எதையும் கேளுங்கள்", currentContext: "தற்போதைய சூழல்",
  activeTopic: "செயலில் உள்ள தலைப்பு", relatedLessons: "தொடர்புடைய பாடங்கள்", tryAsking: "கேட்க முயற்சிக்கவும்",
  typeOrSpeak: "தட்டச்சு செய்யவும் அல்லது பேசவும்...",
  weeklyProgress: "வாராந்திர முன்னேற்றம்", monthlyTargets: "மாதாந்திர இலக்குகள்", dailyPerformance: "தினசரி செயல்திறன் போக்கு",
  leaderboard: "தரவரிசை", seeRank: "உலகெங்கிலும் உள்ள கற்பவர்களுக்கு எதிராக நீங்கள் எங்கே இருக்கிறீர்கள் என்று பாருங்கள்",
  worldwide: "உலகளாவிய", nationwide: "தேசிய", noLearnersYet: "இன்னும் கற்பவர்கள் இல்லை",
  settings: "அமைப்புகள்", customizeExperience: "உங்கள் கற்றல் அனுபவத்தை தனிப்பயனாக்குங்கள்",
  profile: "சுயவிவரம்", voiceSpeech: "குரல் & பேச்சு", accessibilitySettings: "அணுகல்",
  learningPreferences: "கற்றல் விருப்பங்கள்", notifications: "அறிவிப்புகள்",
  dataPrivacy: "தரவு & தனியுரிமை", appearance: "தோற்றம்", saveChanges: "மாற்றங்களை சேமி",
  aiAssistant: "VoraSense AI", alwaysListening: "எப்போதும் கேட்கிறது",
};

// For other languages, clone English with key translations
const es: Translations = { ...en,
  login: "Iniciar sesión", signUp: "Registrarse",
  heroBadge: "Aprendizaje inclusivo impulsado por IA",
  heroTitle1: "Plataforma de voz", heroTitle2: "adaptativa de aprendizaje",
  heroDesc: "Una plataforma educativa impulsada por IA diseñada para el aprendizaje inclusivo.",
  getStarted: "Comenzar gratis", seeHow: "Ver cómo funciona",
  welcomeBack: "¡Bienvenido de nuevo!", signIn: "Iniciar sesión",
  createAccount: "Crear cuenta", startLearning: "Comenzar a aprender",
  settings: "Configuración", searchLessons: "Buscar lecciones...",
  typeOrSpeak: "Escribe o habla...", saveChanges: "Guardar cambios",
  leaderboard: "Clasificación", worldwide: "Mundial", nationwide: "Nacional",
  topics: "Temas", allChats: "Todos los chats",
};

const fr: Translations = { ...en,
  login: "Connexion", signUp: "S'inscrire",
  heroBadge: "Apprentissage inclusif alimenté par l'IA",
  heroTitle1: "Plateforme vocale", heroTitle2: "d'apprentissage adaptatif",
  getStarted: "Commencer gratuitement", seeHow: "Voir comment ça marche",
  welcomeBack: "Bon retour!", signIn: "Se connecter",
  createAccount: "Créer un compte", startLearning: "Commencer à apprendre",
  settings: "Paramètres", searchLessons: "Rechercher des leçons...",
  typeOrSpeak: "Tapez ou parlez...", saveChanges: "Sauvegarder",
  leaderboard: "Classement", worldwide: "Mondial", nationwide: "National",
};

const de: Translations = { ...en,
  login: "Anmelden", signUp: "Registrieren",
  heroBadge: "KI-gestütztes inklusives Lernen",
  heroTitle1: "Adaptive Sprach-", heroTitle2: "Lernplattform",
  getStarted: "Kostenlos starten", seeHow: "So funktioniert es",
  welcomeBack: "Willkommen zurück!", signIn: "Anmelden",
  createAccount: "Konto erstellen", startLearning: "Lernen starten",
  settings: "Einstellungen", searchLessons: "Lektionen suchen...",
  typeOrSpeak: "Tippen oder sprechen...", saveChanges: "Änderungen speichern",
};

const ja: Translations = { ...en,
  login: "ログイン", signUp: "サインアップ",
  heroBadge: "AI搭載のインクルーシブ学習",
  heroTitle1: "適応型音声", heroTitle2: "学習プラットフォーム",
  getStarted: "無料で始める", seeHow: "仕組みを見る",
  welcomeBack: "おかえりなさい!", signIn: "サインイン",
  createAccount: "アカウント作成", startLearning: "学習を開始",
  settings: "設定", searchLessons: "レッスンを検索...",
  typeOrSpeak: "入力または音声...", saveChanges: "変更を保存",
};

const zh: Translations = { ...en,
  login: "登录", signUp: "注册",
  heroBadge: "AI驱动的包容性学习",
  heroTitle1: "自适应语音", heroTitle2: "学习平台",
  getStarted: "免费开始", seeHow: "了解工作原理",
  welcomeBack: "欢迎回来!", signIn: "登录",
  createAccount: "创建账户", startLearning: "开始学习",
  settings: "设置", searchLessons: "搜索课程...",
  typeOrSpeak: "输入或语音...", saveChanges: "保存更改",
};

export const translations: Record<LanguageCode, Translations> = { en, hi, ta, es, fr, de, ja, zh };
