import React, { useState, useEffect } from "react";
import {
  Download,
  Coffee,
  RefreshCw,
  Play,
  Users,
  Clock,
  Target,
  Package,
  MessageSquare,
  Edit3,
  Globe,
} from "lucide-react";

const IcebreakerGenerator = () => {
  const [formData, setFormData] = useState({
    duration: "",
    people: "",
    workgroups: "",
    purposes: [],
    customPurpose1: "",
    customPurpose2: "",
    desiredOutcome: "",
    requiredMaterials: "",
    additionalNotes: "",
    language: "",
    interfaceLanguage: "en",
    includeTimeBreakdown: true,
  });

  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [formChanged, setFormChanged] = useState(false);
  const [initialFormData, setInitialFormData] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState("");

  // Translations object
  const translations = {
    en: {
      title: "Icebreaker Generator",
      subtitle:
        "Generate engaging activities to break the ice and energize your collaborative groups",
      activityParameters: "Activity Parameters",
      duration: "Ideal Duration (minutes)",
      people: "Number of Participants",
      purpose: "Purpose (max 2 selections)",
      customPurpose1: "Custom purpose 1",
      customPurpose2: "Custom purpose 2",
      desiredOutcome: "Desired Outcome (optional)",
      requiredMaterials: "Required Materials (optional)",
      additionalNotes: "What else? (optional)",
      languageSettings: "Language Settings",
      interfaceLanguage: "Interface Language",
      outputLanguage: "Output Language",
      activityOptions: "Activity Options",
      timeBreakdown: "Include detailed time breakdown",
      timeBreakdownDesc:
        "Break down the duration into phases (setup, main activity, sharing, etc.)",
      generate: "Generate",
      update: "Update",
      generating: "Generating...",
      parametersChanged: "Parameters changed - click Update to regenerate",
      generatedActivity: "Generated Activity",
      fillParameters: 'Fill in the parameters and click "Generate" to start',
      generatingActivity: "Generating your personalized activity...",
      downloadCSV: "Download CSV",
      downloadText: "Download Text",
      buyMeCoffee: "Buy me a coffee",
      selectLanguage: "Select output language...",
      workgroups: "Work Groups (optional)",
      workgroupsPlaceholder:
        "e.g. 3 groups of 5 people, pairs, individual work...",
      purposes: [
        "Relaxation",
        "Energization",
        "Connection",
        "Body Movement",
        "Awakening",
        "Fun",
      ],
      errorGeneral:
        "An error occurred while generating the activity. Please try again.",
      errorNetwork:
        "Network error. Please check your connection and try again.",
    },
    it: {
      title: "Generatore di Icebreaker",
      subtitle:
        "Genera attività coinvolgenti per rompere il ghiaccio ed energizzare i tuoi gruppi collaborativi",
      activityParameters: "Parametri dell'Attività",
      duration: "Durata Ideale (minuti)",
      people: "Numero di Partecipanti",
      purpose: "Scopo (max 2 selezioni)",
      customPurpose1: "Scopo personalizzato 1",
      customPurpose2: "Scopo personalizzato 2",
      desiredOutcome: "Risultato Desiderato (opzionale)",
      requiredMaterials: "Materiali Necessari (opzionale)",
      additionalNotes: "Cos'altro? (opzionale)",
      languageSettings: "Impostazioni Lingua",
      interfaceLanguage: "Lingua Interfaccia",
      outputLanguage: "Lingua Output",
      activityOptions: "Opzioni Attività",
      timeBreakdown: "Includi suddivisione temporale dettagliata",
      timeBreakdownDesc:
        "Suddividi la durata in fasi (preparazione, attività principale, condivisione, ecc.)",
      generate: "Genera",
      update: "Aggiorna",
      generating: "Generando...",
      parametersChanged: "Parametri cambiati - clicca Aggiorna per rigenerare",
      generatedActivity: "Attività Generata",
      fillParameters: 'Compila i parametri e clicca "Genera" per iniziare',
      generatingActivity: "Generando la tua attività personalizzata...",
      downloadCSV: "Scarica CSV",
      downloadText: "Scarica Testo",
      buyMeCoffee: "Offrimi un caffè",
      selectLanguage: "Seleziona lingua di output...",
      workgroups: "Sottogruppi di Lavoro (opzionale)",
      workgroupsPlaceholder:
        "es. 3 gruppi da 5 persone, coppie, lavoro individuale...",
      purposes: [
        "Rilassamento",
        "Energizzazione",
        "Connessione",
        "Movimento Corporeo",
        "Risveglio",
        "Divertimento",
      ],
      errorGeneral:
        "Si è verificato un errore durante la generazione dell'attività. Riprova.",
      errorNetwork: "Errore di rete. Controlla la connessione e riprova.",
    },
    es: {
      title: "Generador de Rompe Hielos",
      subtitle:
        "Genera actividades atractivas para romper el hielo y energizar tus grupos colaborativos",
      activityParameters: "Parámetros de la Actividad",
      duration: "Duración Ideal (minutos)",
      people: "Número de Participantes",
      purpose: "Propósito (máx 2 selecciones)",
      customPurpose1: "Propósito personalizado 1",
      customPurpose2: "Propósito personalizado 2",
      desiredOutcome: "Resultado Deseado (opcional)",
      requiredMaterials: "Materiales Necesarios (opcional)",
      additionalNotes: "¿Qué más? (opcional)",
      languageSettings: "Configuración de Idioma",
      interfaceLanguage: "Idioma de la Interfaz",
      outputLanguage: "Idioma de Salida",
      activityOptions: "Opciones de Actividad",
      timeBreakdown: "Incluir desglose temporal detallado",
      timeBreakdownDesc:
        "Dividir la duración en fases (preparación, actividad principal, compartir, etc.)",
      generate: "Generar",
      update: "Actualizar",
      generating: "Generando...",
      parametersChanged:
        "Parámetros cambiados - haz clic en Actualizar para regenerar",
      generatedActivity: "Actividad Generada",
      fillParameters:
        'Completa los parámetros y haz clic en "Generar" para comenzar',
      generatingActivity: "Generando tu actividad personalizada...",
      downloadCSV: "Descargar CSV",
      downloadText: "Descargar Texto",
      buyMeCoffee: "Cómprame un café",
      selectLanguage: "Selecciona idioma de salida...",
      workgroups: "Grupos de Trabajo (opcional)",
      workgroupsPlaceholder:
        "ej. 3 grupos de 5 personas, parejas, trabajo individual...",
      purposes: [
        "Relajación",
        "Energización",
        "Conexión",
        "Movimiento Corporal",
        "Despertar",
        "Diversión",
      ],
      errorGeneral:
        "Ocurrió un error al generar la actividad. Inténtalo de nuevo.",
      errorNetwork: "Error de red. Verifica tu conexión e inténtalo de nuevo.",
    },
    fr: {
      title: "Générateur de Brise-Glace",
      subtitle:
        "Générez des activités engageantes pour briser la glace et dynamiser vos groupes collaboratifs",
      activityParameters: "Paramètres de l'Activité",
      duration: "Durée Idéale (minutes)",
      people: "Nombre de Participants",
      purpose: "Objectif (max 2 sélections)",
      customPurpose1: "Objectif personnalisé 1",
      customPurpose2: "Objectif personnalisé 2",
      desiredOutcome: "Résultat Souhaité (optionnel)",
      requiredMaterials: "Matériels Requis (optionnel)",
      additionalNotes: "Quoi d'autre ? (optionnel)",
      languageSettings: "Paramètres de Langue",
      interfaceLanguage: "Langue de l'Interface",
      outputLanguage: "Langue de Sortie",
      activityOptions: "Options d'Activité",
      timeBreakdown: "Inclure une répartition temporelle détaillée",
      timeBreakdownDesc:
        "Diviser la durée en phases (préparation, activité principale, partage, etc.)",
      generate: "Générer",
      update: "Mettre à jour",
      generating: "Génération...",
      parametersChanged:
        "Paramètres modifiés - cliquez sur Mettre à jour pour régénérer",
      generatedActivity: "Activité Générée",
      fillParameters:
        'Remplissez les paramètres et cliquez sur "Générer" pour commencer',
      generatingActivity: "Génération de votre activité personnalisée...",
      downloadCSV: "Télécharger CSV",
      downloadText: "Télécharger Texte",
      buyMeCoffee: "Payez-moi un café",
      selectLanguage: "Sélectionner la langue de sortie...",
      workgroups: "Groupes de Travail (optionnel)",
      workgroupsPlaceholder:
        "ex. 3 groupes de 5 personnes, paires, travail individuel...",
      purposes: [
        "Relaxation",
        "Énergisation",
        "Connexion",
        "Mouvement Corporel",
        "Éveil",
        "Amusement",
      ],
      errorGeneral:
        "Une erreur s'est produite lors de la génération de l'activité. Veuillez réessayer.",
      errorNetwork: "Erreur réseau. Vérifiez votre connexion et réessayez.",
    },
    de: {
      title: "Eisbrecher Generator",
      subtitle:
        "Erstelle ansprechende Aktivitäten zum Eisbrechen und zur Energetisierung deiner kollaborativen Gruppen",
      activityParameters: "Aktivitätsparameter",
      duration: "Ideale Dauer (Minuten)",
      people: "Anzahl der Teilnehmer",
      purpose: "Zweck (max 2 Auswahlen)",
      customPurpose1: "Benutzerdefinierter Zweck 1",
      customPurpose2: "Benutzerdefinierter Zweck 2",
      desiredOutcome: "Gewünschtes Ergebnis (optional)",
      requiredMaterials: "Erforderliche Materialien (optional)",
      additionalNotes: "Was sonst noch? (optional)",
      languageSettings: "Spracheinstellungen",
      interfaceLanguage: "Interface-Sprache",
      outputLanguage: "Ausgabesprache",
      activityOptions: "Aktivitätsoptionen",
      timeBreakdown: "Detaillierte Zeitaufteilung einschließen",
      timeBreakdownDesc:
        "Die Dauer in Phasen aufteilen (Vorbereitung, Hauptaktivität, Teilen, etc.)",
      generate: "Generieren",
      update: "Aktualisieren",
      generating: "Generiere...",
      parametersChanged:
        "Parameter geändert - klicken Sie auf Aktualisieren zum Neugenerieren",
      generatedActivity: "Generierte Aktivität",
      fillParameters:
        'Füllen Sie die Parameter aus und klicken Sie auf "Generieren" zum Starten',
      generatingActivity: "Generiere deine personalisierte Aktivität...",
      downloadCSV: "CSV herunterladen",
      downloadText: "Text herunterladen",
      buyMeCoffee: "Kauf mir einen Kaffee",
      selectLanguage: "Ausgabesprache auswählen...",
      workgroups: "Arbeitsgruppen (optional)",
      workgroupsPlaceholder:
        "z.B. 3 Gruppen à 5 Personen, Paare, Einzelarbeit...",
      purposes: [
        "Entspannung",
        "Energetisierung",
        "Verbindung",
        "Körperbewegung",
        "Erwachen",
        "Spaß",
      ],
      errorGeneral:
        "Ein Fehler ist beim Generieren der Aktivität aufgetreten. Bitte versuchen Sie es erneut.",
      errorNetwork:
        "Netzwerkfehler. Bitte überprüfen Sie Ihre Verbindung und versuchen Sie es erneut.",
    },
  };

  const t = translations[formData.interfaceLanguage] || translations.en;
  const predefinedPurposes = t.purposes;

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish / Español" },
    { code: "fr", name: "French / Français" },
    { code: "de", name: "German / Deutsch" },
    { code: "it", name: "Italian / Italiano" },
    { code: "pt", name: "Portuguese / Português" },
    { code: "nl", name: "Dutch / Nederlands" },
    { code: "ru", name: "Russian / Русский" },
    { code: "zh", name: "Chinese / 中文" },
    { code: "ja", name: "Japanese / 日本語" },
    { code: "ko", name: "Korean / 한국어" },
    { code: "ar", name: "Arabic / العربية" },
    { code: "hi", name: "Hindi / हिन्दी" },
    { code: "th", name: "Thai / ไทย" },
    { code: "vi", name: "Vietnamese / Tiếng Việt" },
    { code: "id", name: "Indonesian / Bahasa Indonesia" },
    { code: "ms", name: "Malay / Bahasa Melayu" },
    { code: "tl", name: "Filipino / Tagalog" },
    { code: "sw", name: "Swahili / Kiswahili" },
    { code: "tr", name: "Turkish / Türkçe" },
    { code: "pl", name: "Polish / Polski" },
    { code: "cs", name: "Czech / Čeština" },
    { code: "sk", name: "Slovak / Slovenčina" },
    { code: "hu", name: "Hungarian / Magyar" },
    { code: "ro", name: "Romanian / Română" },
    { code: "bg", name: "Bulgarian / Български" },
    { code: "hr", name: "Croatian / Hrvatski" },
    { code: "sr", name: "Serbian / Српски" },
    { code: "sl", name: "Slovenian / Slovenščina" },
    { code: "lt", name: "Lithuanian / Lietuvių" },
    { code: "lv", name: "Latvian / Latviešu" },
    { code: "et", name: "Estonian / Eesti" },
    { code: "fi", name: "Finnish / Suomi" },
    { code: "sv", name: "Swedish / Svenska" },
    { code: "da", name: "Danish / Dansk" },
    { code: "no", name: "Norwegian / Norsk" },
    { code: "is", name: "Icelandic / Íslenska" },
    { code: "el", name: "Greek / Ελληνικά" },
    { code: "he", name: "Hebrew / עברית" },
    { code: "fa", name: "Persian / فارسی" },
    { code: "ur", name: "Urdu / اردو" },
    { code: "bn", name: "Bengali / বাংলা" },
    { code: "ta", name: "Tamil / தமிழ்" },
    { code: "te", name: "Telugu / తెలుగు" },
    { code: "ml", name: "Malayalam / മലയാളം" },
    { code: "kn", name: "Kannada / ಕನ್ನಡ" },
    { code: "gu", name: "Gujarati / ગુજરાતી" },
    { code: "pa", name: "Punjabi / ਪੰਜਾਬੀ" },
    { code: "mr", name: "Marathi / मराठी" },
    { code: "ne", name: "Nepali / नेपाली" },
    { code: "si", name: "Sinhala / සිංහල" },
    { code: "my", name: "Burmese / မြန်မာ" },
    { code: "km", name: "Khmer / ភាសាខ្មែរ" },
    { code: "lo", name: "Lao / ລາວ" },
    { code: "ka", name: "Georgian / ქართული" },
    { code: "hy", name: "Armenian / Հայերեն" },
    { code: "az", name: "Azerbaijani / Azərbaycan" },
    { code: "kk", name: "Kazakh / Қазақша" },
    { code: "ky", name: "Kyrgyz / Кыргызча" },
    { code: "uz", name: "Uzbek / Oʻzbekcha" },
    { code: "tg", name: "Tajik / Тоҷикӣ" },
    { code: "mn", name: "Mongolian / Монгол" },
    { code: "bo", name: "Tibetan / བོད་སྐད" },
    { code: "dz", name: "Dzongkha / རྫོང་ཁ" },
    { code: "am", name: "Amharic / አማርኛ" },
    { code: "ti", name: "Tigrinya / ትግርኛ" },
    { code: "so", name: "Somali / Soomaali" },
    { code: "yo", name: "Yoruba" },
    { code: "ig", name: "Igbo" },
    { code: "ha", name: "Hausa" },
    { code: "zu", name: "Zulu" },
    { code: "xh", name: "Xhosa" },
    { code: "af", name: "Afrikaans" },
    { code: "mt", name: "Maltese / Malti" },
    { code: "ga", name: "Irish / Gaeilge" },
    { code: "cy", name: "Welsh / Cymraeg" },
    { code: "eu", name: "Basque / Euskera" },
    { code: "ca", name: "Catalan / Català" },
    { code: "gl", name: "Galician / Galego" },
    { code: "oc", name: "Occitan" },
    { code: "br", name: "Breton / Brezhoneg" },
    { code: "co", name: "Corsican / Corsu" },
    { code: "sc", name: "Sardinian / Sardu" },
    { code: "rm", name: "Romansh / Rumantsch" },
    { code: "lb", name: "Luxembourgish / Lëtzebuergesch" },
    { code: "fy", name: "Frisian / Frysk" },
    { code: "gd", name: "Scottish Gaelic / Gàidhlig" },
    { code: "kw", name: "Cornish / Kernewek" },
    { code: "fo", name: "Faroese / Føroyskt" },
  ];

  useEffect(() => {
    if (hasGenerated && initialFormData) {
      const hasChanges =
        JSON.stringify(formData) !== JSON.stringify(initialFormData);
      setFormChanged(hasChanges);
    }
  }, [formData, initialFormData, hasGenerated]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(""); // Clear error when user makes changes
  };

  const handlePurposeChange = (purpose, checked) => {
    setFormData((prev) => {
      const newPurposes = checked
        ? [...prev.purposes, purpose]
        : prev.purposes.filter((p) => p !== purpose);

      if (newPurposes.length > 2) {
        return prev;
      }

      return { ...prev, purposes: newPurposes };
    });
  };

  const validateForm = () => {
    if (!formData.duration || !formData.people || !formData.language)
      return false;
    if (isNaN(formData.duration) || isNaN(formData.people)) return false;
    if (parseInt(formData.duration) <= 0 || parseInt(formData.people) <= 0)
      return false;

    const totalPurposes =
      formData.purposes.length +
      (formData.customPurpose1 ? 1 : 0) +
      (formData.customPurpose2 ? 1 : 0);

    return totalPurposes > 0;
  };

  // API call function - will be moved to backend endpoint
  const callAPI = async (endpoint, data) => {
    try {
      const response = await fetch(`/api/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };

  const generateActivity = async () => {
    if (!validateForm()) return;

    setIsGenerating(true);
    setError("");

    try {
      const allPurposes = [...formData.purposes];
      if (formData.customPurpose1) allPurposes.push(formData.customPurpose1);
      if (formData.customPurpose2) allPurposes.push(formData.customPurpose2);

      const selectedLanguage = languages.find(
        (lang) => lang.code === formData.language
      );
      const languageName = selectedLanguage
        ? selectedLanguage.name
        : formData.language;

      const requestData = {
        duration: formData.duration,
        people: formData.people,
        workgroups: formData.workgroups,
        purposes: allPurposes,
        desiredOutcome: formData.desiredOutcome,
        requiredMaterials: formData.requiredMaterials,
        additionalNotes: formData.additionalNotes,
        languageName: languageName,
        includeTimeBreakdown: formData.includeTimeBreakdown,
      };

      const result = await callAPI("generate", requestData);

      setOutput(result.activity);
      setHasGenerated(true);
      setFormChanged(false);
      setInitialFormData({ ...formData });
    } catch (error) {
      console.error("Error generating activity:", error);
      setError(
        error.message.includes("fetch") ? t.errorNetwork : t.errorGeneral
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const generateDownloadContent = async (format) => {
    if (!output) return null;

    setIsDownloading(true);

    try {
      const allPurposes = [...formData.purposes];
      if (formData.customPurpose1) allPurposes.push(formData.customPurpose1);
      if (formData.customPurpose2) allPurposes.push(formData.customPurpose2);

      const selectedLanguage = languages.find(
        (lang) => lang.code === formData.language
      );
      const languageName = selectedLanguage
        ? selectedLanguage.name
        : formData.language;

      const requestData = {
        format,
        output,
        parameters: {
          duration: formData.duration,
          people: formData.people,
          workgroups: formData.workgroups,
          purposes: allPurposes,
          desiredOutcome: formData.desiredOutcome,
          requiredMaterials: formData.requiredMaterials,
          additionalNotes: formData.additionalNotes,
          languageName: languageName,
          includeTimeBreakdown: formData.includeTimeBreakdown,
        },
      };

      const result = await callAPI("download", requestData);
      return result.content;
    } catch (error) {
      console.error("Error generating download content:", error);
      setError(t.errorGeneral);
      return null;
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadCSV = async () => {
    const csvContent = await generateDownloadContent("csv");
    if (csvContent) {
      downloadFile(csvContent, "icebreaker-activity.csv", "text/csv");
    }
  };

  const downloadText = async () => {
    const textContent = await generateDownloadContent("text");
    if (textContent) {
      downloadFile(textContent, "icebreaker-activity.txt", "text/plain");
    }
  };

  const openBuyMeACoffee = () => {
    window.open("https://www.paypal.com/donate", "_blank");
  };

  const canGenerate = validateForm();

  return (
    <div className="app-container">
      {/* Header */}
      <div className="header">
        <div className="header-background"></div>
        <div className="header-overlay"></div>
        <div className="header-content">
          <h1 className="header-title fade-in">{t.title}</h1>
          <p className="header-subtitle fade-in">{t.subtitle}</p>
        </div>

        {/* Organic shapes */}
        <div className="header-shape-1"></div>
        <div className="header-shape-2"></div>
      </div>

      <div className="main-container">
        <div className="content-grid">
          {/* Left Column - Parameters */}
          <div className="parameters-column fade-in">
            <div className="parameters-card">
              <h2 className="section-title">
                <div className="icon-container icon-container-green">
                  <Target className="icon" />
                </div>
                {t.activityParameters}
              </h2>

              <div className="form-sections">
                {/* Error Display */}
                {error && (
                  <div className="error-banner">
                    <p>{error}</p>
                  </div>
                )}

                {/* Language Selection - FIRST */}
                <div className="form-section">
                  <label className="form-label">
                    <Globe className="label-icon" />
                    {t.languageSettings} *
                  </label>

                  <div className="language-grid">
                    <div>
                      <label className="sublabel">{t.interfaceLanguage}</label>
                      <select
                        value={formData.interfaceLanguage}
                        onChange={(e) =>
                          handleInputChange("interfaceLanguage", e.target.value)
                        }
                        className="form-input"
                      >
                        <option value="en">English</option>
                        <option value="it">Italiano</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                      </select>
                    </div>

                    <div>
                      <label className="sublabel">{t.outputLanguage} *</label>
                      <select
                        value={formData.language}
                        onChange={(e) =>
                          handleInputChange("language", e.target.value)
                        }
                        className="form-input"
                      >
                        <option value="">{t.selectLanguage}</option>
                        {languages.map((lang) => (
                          <option key={lang.code} value={lang.code}>
                            {lang.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Duration and People - Same Row */}
                <div className="form-section">
                  <div className="input-grid">
                    <div>
                      <label className="form-label">
                        <Clock className="label-icon" />
                        {t.duration} *
                      </label>
                      <input
                        type="number"
                        value={formData.duration}
                        onChange={(e) =>
                          handleInputChange("duration", e.target.value)
                        }
                        className="form-input"
                        placeholder="e.g. 15"
                        min="1"
                      />
                    </div>

                    <div>
                      <label className="form-label">
                        <Users className="label-icon" />
                        {t.people} *
                      </label>
                      <input
                        type="number"
                        value={formData.people}
                        onChange={(e) =>
                          handleInputChange("people", e.target.value)
                        }
                        className="form-input"
                        placeholder="e.g. 12"
                        min="1"
                      />
                    </div>
                  </div>

                  {/* Sub-sections under Duration and People */}
                  <div className="subsection-grid">
                    {/* Activity Options under Duration */}
                    <div>
                      <label className="form-label">
                        <Clock className="label-icon" />
                        {t.activityOptions}
                      </label>

                      <div className="checkbox-container">
                        <label className="checkbox-item">
                          <input
                            type="checkbox"
                            checked={formData.includeTimeBreakdown}
                            onChange={(e) =>
                              handleInputChange(
                                "includeTimeBreakdown",
                                e.target.checked
                              )
                            }
                            className="checkbox-input"
                          />
                          <div>
                            <span className="checkbox-title">
                              {t.timeBreakdown}
                            </span>
                            <p className="checkbox-description">
                              {t.timeBreakdownDesc}
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Work Groups under People */}
                    <div>
                      <label className="form-label">
                        <Users className="label-icon" />
                        {t.workgroups}
                      </label>
                      <textarea
                        value={formData.workgroups}
                        onChange={(e) =>
                          handleInputChange("workgroups", e.target.value)
                        }
                        className="form-input form-textarea small-textarea"
                        placeholder={t.workgroupsPlaceholder}
                        rows="3"
                      />
                    </div>
                  </div>
                </div>

                {/* Purpose */}
                <div className="form-section">
                  <label className="form-label">
                    <Target className="label-icon" />
                    {t.purpose} *
                  </label>
                  <div className="purpose-grid">
                    {predefinedPurposes.map((purpose, index) => (
                      <label
                        key={purpose}
                        className={`purpose-item ${
                          formData.purposes.includes(purpose)
                            ? "purpose-item-selected"
                            : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.purposes.includes(purpose)}
                          onChange={(e) =>
                            handlePurposeChange(purpose, e.target.checked)
                          }
                          disabled={
                            !formData.purposes.includes(purpose) &&
                            formData.purposes.length +
                              (formData.customPurpose1 ? 1 : 0) +
                              (formData.customPurpose2 ? 1 : 0) >=
                              2
                          }
                          className="checkbox-input"
                        />
                        <span className="purpose-text">{purpose}</span>
                      </label>
                    ))}
                  </div>
                  <div className="custom-purposes">
                    <input
                      type="text"
                      value={formData.customPurpose1}
                      onChange={(e) =>
                        handleInputChange("customPurpose1", e.target.value)
                      }
                      disabled={
                        !formData.customPurpose1 &&
                        formData.purposes.length +
                          (formData.customPurpose2 ? 1 : 0) >=
                          2
                      }
                      className="form-input small-input"
                      placeholder={t.customPurpose1}
                    />
                    <input
                      type="text"
                      value={formData.customPurpose2}
                      onChange={(e) =>
                        handleInputChange("customPurpose2", e.target.value)
                      }
                      disabled={
                        !formData.customPurpose2 &&
                        formData.purposes.length +
                          (formData.customPurpose1 ? 1 : 0) >=
                          2
                      }
                      className="form-input small-input"
                      placeholder={t.customPurpose2}
                    />
                  </div>
                </div>

                {/* Desired Outcome */}
                <div className="form-section">
                  <label className="form-label">
                    <Target className="label-icon" />
                    {t.desiredOutcome}
                  </label>
                  <textarea
                    value={formData.desiredOutcome}
                    onChange={(e) =>
                      handleInputChange("desiredOutcome", e.target.value)
                    }
                    className="form-input form-textarea"
                    placeholder="e.g. Highlight team skills, create a shared map..."
                    rows="3"
                  />
                </div>

                {/* Required Materials */}
                <div className="form-section">
                  <label className="form-label">
                    <Package className="label-icon" />
                    {t.requiredMaterials}
                  </label>
                  <textarea
                    value={formData.requiredMaterials}
                    onChange={(e) =>
                      handleInputChange("requiredMaterials", e.target.value)
                    }
                    className="form-input form-textarea"
                    placeholder="e.g. Post-it notes, markers, 20-meter rope..."
                    rows="3"
                  />
                </div>

                {/* Additional Notes */}
                <div className="form-section">
                  <label className="form-label">
                    <Edit3 className="label-icon" />
                    {t.additionalNotes}
                  </label>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) =>
                      handleInputChange("additionalNotes", e.target.value)
                    }
                    className="form-input form-textarea"
                    placeholder="Add details, specific context, particular requirements..."
                    rows="4"
                  />
                </div>

                {/* Generate Button */}
                <button
                  onClick={generateActivity}
                  disabled={!canGenerate || isGenerating}
                  className={`generate-button ${
                    canGenerate && !isGenerating
                      ? hasGenerated && formChanged
                        ? "generate-button-update"
                        : "generate-button-primary"
                      : "generate-button-disabled"
                  }`}
                >
                  {isGenerating ? (
                    <RefreshCw className="button-icon spinner" />
                  ) : (
                    <Play className="button-icon" />
                  )}
                  {isGenerating
                    ? t.generating
                    : hasGenerated
                    ? t.update
                    : t.generate}
                </button>

                {hasGenerated && formChanged && (
                  <p className="parameters-changed-text">
                    {t.parametersChanged}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Output */}
          <div className="output-column fade-in">
            <div className="output-card">
              <h2 className="section-title">
                <div className="icon-container icon-container-yellow">
                  <MessageSquare className="icon" />
                </div>
                {t.generatedActivity}
              </h2>

              <div className="output-content">
                {!hasGenerated && !isGenerating && (
                  <div className="empty-state">
                    <div className="empty-state-content">
                      <div className="empty-state-icon">
                        <Play className="empty-icon" />
                      </div>
                      <p className="empty-state-text">{t.fillParameters}</p>
                    </div>
                  </div>
                )}

                {isGenerating && (
                  <div className="loading-state">
                    <div className="loading-state-content">
                      <div className="loading-state-icon">
                        <RefreshCw className="loading-icon spinner" />
                      </div>
                      <p className="loading-state-text">
                        {t.generatingActivity}
                      </p>
                    </div>
                  </div>
                )}

                {output && !isGenerating && (
                  <div className="output-result">
                    <div className="output-text">{output}</div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {hasGenerated && !isGenerating && (
                <div className="action-buttons">
                  <div className="button-group">
                    <button
                      onClick={downloadCSV}
                      disabled={isDownloading}
                      className="action-button action-button-green"
                    >
                      {isDownloading ? (
                        <RefreshCw className="button-icon spinner" />
                      ) : (
                        <Download className="button-icon" />
                      )}
                      {t.downloadCSV}
                    </button>

                    <button
                      onClick={downloadText}
                      disabled={isDownloading}
                      className="action-button action-button-yellow"
                    >
                      {isDownloading ? (
                        <RefreshCw className="button-icon spinner" />
                      ) : (
                        <Download className="button-icon" />
                      )}
                      {t.downloadText}
                    </button>

                    <button
                      onClick={openBuyMeACoffee}
                      className="action-button action-button-red coffee-button"
                    >
                      <Coffee className="button-icon" />
                      {t.buyMeCoffee}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IcebreakerGenerator;
