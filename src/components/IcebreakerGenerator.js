import React, { useState, useEffect } from "react";
import {
  Download,
  Heart,
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
  const [isError, setIsError] = useState(false);

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
      tipDeveloper: "Satisfied with the result? Tip the developer",
      selectLanguage: "Select output language...",
      workgroups: "Work Groups (optional)",
      workgroupsPlaceholder:
        "e.g. 3 groups of 5 people, pairs, individual work...",
      timeoutError: "The generation took too long. Please try again.",
      genericError:
        "An error occurred while generating the activity. Please try again.",
      purposes: [
        "Relaxation",
        "Energization",
        "Connection",
        "Body Movement",
        "Awakening",
        "Fun",
      ],
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
      tipDeveloper:
        "Soddisfatto del risultato? Offri una mancia allo sviluppatore",
      selectLanguage: "Seleziona lingua di output...",
      workgroups: "Sottogruppi di Lavoro (opzionale)",
      workgroupsPlaceholder:
        "es. 3 gruppi da 5 persone, coppie, lavoro individuale...",
      timeoutError: "La generazione ha impiegato troppo tempo. Riprova.",
      genericError:
        "Si è verificato un errore durante la generazione. Riprova.",
      purposes: [
        "Rilassamento",
        "Energizzazione",
        "Connessione",
        "Movimento Corporeo",
        "Risveglio",
        "Divertimento",
      ],
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
      tipDeveloper:
        "¿Satisfecho con el resultado? Dale una propina al desarrollador",
      selectLanguage: "Selecciona idioma de salida...",
      workgroups: "Grupos de Trabajo (opcional)",
      workgroupsPlaceholder:
        "ej. 3 grupos de 5 personas, parejas, trabajo individual...",
      timeoutError:
        "La generación tardó demasiado. Por favor, inténtalo de nuevo.",
      genericError:
        "Se produjo un error al generar la actividad. Por favor, inténtalo de nuevo.",
      purposes: [
        "Relajación",
        "Energización",
        "Conexión",
        "Movimiento Corporal",
        "Despertar",
        "Diversión",
      ],
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
      tipDeveloper:
        "Satisfait du résultat ? Donnez un pourboire au développeur",
      selectLanguage: "Sélectionner la langue de sortie...",
      workgroups: "Groupes de Travail (optionnel)",
      workgroupsPlaceholder:
        "ex. 3 groupes de 5 personnes, paires, travail individuel...",
      timeoutError: "La génération a pris trop de temps. Veuillez réessayer.",
      genericError:
        "Une erreur s'est produite lors de la génération. Veuillez réessayer.",
      purposes: [
        "Relaxation",
        "Énergisation",
        "Connexion",
        "Mouvement Corporel",
        "Éveil",
        "Amusement",
      ],
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
      tipDeveloper:
        "Mit dem Ergebnis zufrieden? Geben Sie dem Entwickler ein Trinkgeld",
      selectLanguage: "Ausgabesprache auswählen...",
      workgroups: "Arbeitsgruppen (optional)",
      workgroupsPlaceholder:
        "z.B. 3 Gruppen à 5 Personen, Paare, Einzelarbeit...",
      timeoutError:
        "Die Generierung hat zu lange gedauert. Bitte versuche es erneut.",
      genericError:
        "Bei der Generierung ist ein Fehler aufgetreten. Bitte versuche es erneut.",
      purposes: [
        "Entspannung",
        "Energetisierung",
        "Verbindung",
        "Körperbewegung",
        "Erwachen",
        "Spaß",
      ],
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

  const generateActivity = async () => {
    if (!validateForm()) return;

    setIsGenerating(true);
    setIsError(false);

    try {
      const allPurposes = [...formData.purposes];
      if (formData.customPurpose1) allPurposes.push(formData.customPurpose1);
      if (formData.customPurpose2) allPurposes.push(formData.customPurpose2);

      const selectedLanguage = languages.find(
        (lang) => lang.code === formData.language,
      );
      const languageName = selectedLanguage
        ? selectedLanguage.name
        : formData.language;

      // eslint-disable-next-line no-unused-vars
      const _prompt = `As an expert collaborative process facilitator, generate a personalized icebreaker/energizer with these parameters:

IMPORTANT: Generate the ENTIRE response in ${languageName}. All content including titles, instructions, and explanations must be in ${languageName}.

PARAMETERS:
- Duration: ${formData.duration} minutes
- Number of participants: ${formData.people} people
${formData.workgroups ? `- Work groups organization: ${formData.workgroups}` : ""}
- Purposes: ${allPurposes.join(", ")}
${formData.desiredOutcome ? `- Desired outcome: ${formData.desiredOutcome}` : ""}
${formData.requiredMaterials ? `- Required materials: ${formData.requiredMaterials}` : ""}
${formData.additionalNotes ? `- Additional notes: ${formData.additionalNotes}` : ""}
- Output language: ${languageName}
- Include time breakdown: ${formData.includeTimeBreakdown ? "Yes" : "No"}

REQUIRED STRUCTURE:
**ACTIVITY TITLE** (in ${languageName})

**BRIEF DESCRIPTION/NOTES** (in ${languageName})
[One-sentence description of the activity's essence - place this immediately after the title]

**OBJECTIVE** (in ${languageName})
[Brief description of specific objectives]

**DURATION** (in ${languageName})
${formData.includeTimeBreakdown ? "[Estimated time with detailed phase breakdown - e.g., 2 min setup, 5 min main activity, 3 min sharing]" : "[Total estimated time only]"}

**PARTICIPANTS** (in ${languageName})
[Guidelines on number and arrangement]

**MATERIALS** (in ${languageName})
[List of necessary materials with specific usage. Be logical: if you mention post-it notes and markers, explain if markers are FOR the post-its or separate. If stones and post-its are listed, clarify whether to write ON stones or use post-its separately]

**STEP-BY-STEP INSTRUCTIONS** (in ${languageName})
1. [First step]
2. [Second step]
[etc.]

**VARIATIONS/ADAPTATIONS** (in ${languageName})
[Provide 2-3 SPECIFIC variations with clear instructions, not vague suggestions. For example: "For larger groups (20+): divide into teams of 4-5 instead of pairs" rather than "adapt for larger groups"]

**FACILITATION TIPS** (in ${languageName})
[Maximum 4-5 SPECIFIC and CONTEXTUAL tips directly related to THIS activity, not generic facilitation advice]

Generate an innovative, engaging activity suitable for professional facilitation contexts. Be creative but practical. When describing materials usage, be logical and specific about how each item is used. Remember: ALL content must be written in ${languageName}.`;

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          duration: formData.duration,
          people: formData.people,
          workgroups: formData.workgroups,
          purposes: allPurposes,
          desiredOutcome: formData.desiredOutcome,
          requiredMaterials: formData.requiredMaterials,
          additionalNotes: formData.additionalNotes,
          languageName,
          includeTimeBreakdown: formData.includeTimeBreakdown,
        }),
      });

      if (!response.ok) {
        const status = response.status;
        if (status === 504 || status === 408) {
          throw new Error("timeout");
        }
        throw new Error(`HTTP error! status: ${status}`);
      }

      const data = await response.json();
      const generatedActivity = data.activity || data.content?.[0]?.text || "";

      setOutput(generatedActivity);
      setHasGenerated(true);
      setFormChanged(false);
      setInitialFormData({ ...formData });
      setIsError(false);
    } catch (error) {
      console.error("Error generating activity:", error);
      setIsError(true);
      if (
        error.message === "timeout" ||
        error.message.includes("504") ||
        error.message.includes("408")
      ) {
        setOutput(t.timeoutError);
      } else {
        setOutput(t.genericError);
      }
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
        (lang) => lang.code === formData.language,
      );
      const languageName = selectedLanguage
        ? selectedLanguage.name
        : formData.language;

      const now = new Date();
      const dateString = now.toISOString().split("T")[0];
      const timeString = now.toTimeString().split(" ")[0];

      const watermark = `
─────────────────────────────────────
Generated: ${dateString} ${timeString}
Icebreaker Generator - https://icebreaker-generator.vercel.app
© ${now.getFullYear()} Marcello Petruzzi
Support this project: https://paypal.me/MarcelloPetruzzi
─────────────────────────────────────`;

      const prompt =
        format === "csv"
          ? `Convert the following icebreaker activity and its parameters into a well-structured CSV format. Create meaningful columns and properly escape any commas or quotes in the content.

ACTIVITY PARAMETERS:
- Duration: ${formData.duration} minutes
- Participants: ${formData.people}
${formData.workgroups ? `- Work groups: ${formData.workgroups}` : ""}
- Purposes: ${allPurposes.join(", ")}
- Desired outcome: ${formData.desiredOutcome || "Not specified"}
- Required materials: ${formData.requiredMaterials || "Not specified"}
- Additional notes: ${formData.additionalNotes || "None"}
- Language: ${languageName}
- Time breakdown included: ${formData.includeTimeBreakdown ? "Yes" : "No"}

GENERATED ACTIVITY:
${output}

Output ONLY the CSV content with proper headers and formatting. Make it suitable for import into spreadsheet applications.`
          : `Format the following icebreaker activity into a clean, professional text document suitable for printing or sharing.

ACTIVITY PARAMETERS:
- Duration: ${formData.duration} minutes
- Participants: ${formData.people}
${formData.workgroups ? `- Work groups: ${formData.workgroups}` : ""}
- Purposes: ${allPurposes.join(", ")}
- Desired outcome: ${formData.desiredOutcome || "Not specified"}
- Required materials: ${formData.requiredMaterials || "Not specified"}
- Additional notes: ${formData.additionalNotes || "None"}
- Language: ${languageName}
- Time breakdown included: ${formData.includeTimeBreakdown ? "Yes" : "No"}

GENERATED ACTIVITY:
${output}

Format this as a professional document with clear sections and proper spacing. At the end, add this watermark:
${watermark}

Structure should be: Activity content first, then the watermark at the bottom.`;

      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, format }),
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data.content || "";
    } catch (error) {
      console.error("Error generating download content:", error);
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

  const openTipDeveloper = () => {
    window.open("https://paypal.me/MarcelloPetruzzi", "_blank");
  };

  const canGenerate = validateForm();

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#f4f0e4",
        fontFamily: "DM Sans, system-ui, sans-serif",
      }}
    >
      <style>{`
        :root {
          --ecru-white: #f4f0e4;
          --zeus: #211e18;
          --chalet-green: #416631;
          --anzac: #ddb349;
          --pueblo: #842813;
          --gray: #615D55;
        }

        .custom-input {
          transition: all 0.3s ease;
          border: 1.5px solid rgba(97, 93, 85, 0.2);
        }

        .custom-input:focus {
          border-color: var(--chalet-green);
          box-shadow: 0 0 0 3px rgba(65, 102, 49, 0.1);
          outline: none;
        }

        .custom-btn {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .custom-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .custom-btn:active {
          transform: translateY(0);
        }

        .fade-in {
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Header */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #416631 0%, #649a48 50%, #82b566 100%)",
          height: "280px",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(221, 179, 73, 0.3) 0%, transparent 50%)",
          }}
        ></div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 70% 80%, rgba(132, 40, 19, 0.2) 0%, transparent 50%)",
          }}
        ></div>

        <div className="relative z-10 container mx-auto px-6 py-12 h-full flex flex-col justify-center">
          <h1
            className="text-5xl font-bold mb-6 fade-in"
            style={{
              color: "#f4f0e4",
              letterSpacing: "0.02em",
              lineHeight: "1.1",
            }}
          >
            {t.title}
          </h1>
          <p
            className="text-xl max-w-2xl fade-in"
            style={{
              color: "rgba(244, 240, 228, 0.9)",
              lineHeight: "1.6",
            }}
          >
            {t.subtitle}
          </p>
        </div>

        <div
          className="absolute top-12 right-12 w-32 h-32 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #ddb349 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        ></div>
        <div
          className="absolute bottom-8 left-8 w-24 h-24 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #842813 0%, transparent 70%)",
            filter: "blur(15px)",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          {/* Left Column - Parameters */}
          <div className="fade-in">
            <div
              className="rounded-3xl p-8 shadow-lg"
              style={{
                backgroundColor: "white",
                border: "1px solid rgba(97, 93, 85, 0.1)",
              }}
            >
              <h2
                className="text-3xl font-bold mb-8 flex items-center gap-3"
                style={{ color: "var(--zeus)" }}
              >
                <div
                  className="p-2 rounded-xl"
                  style={{ backgroundColor: "rgba(65, 102, 49, 0.1)" }}
                >
                  <Target
                    className="w-6 h-6"
                    style={{ color: "var(--chalet-green)" }}
                  />
                </div>
                {t.activityParameters}
              </h2>

              <div className="space-y-6">
                {/* Language Selection */}
                <div>
                  <label
                    className="flex items-center gap-2 text-sm font-semibold mb-4"
                    style={{ color: "var(--zeus)" }}
                  >
                    <Globe
                      className="w-4 h-4"
                      style={{ color: "var(--chalet-green)" }}
                    />
                    {t.languageSettings} *
                  </label>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-xs font-medium mb-2"
                        style={{ color: "var(--gray)" }}
                      >
                        {t.interfaceLanguage}
                      </label>
                      <select
                        value={formData.interfaceLanguage}
                        onChange={(e) =>
                          handleInputChange("interfaceLanguage", e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-xl custom-input text-sm"
                        style={{ backgroundColor: "white" }}
                      >
                        <option value="en">English</option>
                        <option value="it">Italiano</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                      </select>
                    </div>

                    <div>
                      <label
                        className="block text-xs font-medium mb-2"
                        style={{ color: "var(--gray)" }}
                      >
                        {t.outputLanguage} *
                      </label>
                      <select
                        value={formData.language}
                        onChange={(e) =>
                          handleInputChange("language", e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-xl custom-input text-sm"
                        style={{ backgroundColor: "white" }}
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

                {/* Duration and People */}
                <div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="flex items-center gap-2 text-sm font-semibold mb-3"
                        style={{ color: "var(--zeus)" }}
                      >
                        <Clock
                          className="w-4 h-4"
                          style={{ color: "var(--chalet-green)" }}
                        />
                        {t.duration} *
                      </label>
                      <input
                        type="number"
                        value={formData.duration}
                        onChange={(e) =>
                          handleInputChange("duration", e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-xl custom-input"
                        style={{ backgroundColor: "white" }}
                        placeholder="e.g. 15"
                        min="1"
                      />
                    </div>

                    <div>
                      <label
                        className="flex items-center gap-2 text-sm font-semibold mb-3"
                        style={{ color: "var(--zeus)" }}
                      >
                        <Users
                          className="w-4 h-4"
                          style={{ color: "var(--chalet-green)" }}
                        />
                        {t.people} *
                      </label>
                      <input
                        type="number"
                        value={formData.people}
                        onChange={(e) =>
                          handleInputChange("people", e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-xl custom-input"
                        style={{ backgroundColor: "white" }}
                        placeholder="e.g. 12"
                        min="1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {/* Activity Options */}
                    <div>
                      <label
                        className="flex items-center gap-2 text-sm font-semibold mb-3"
                        style={{ color: "var(--zeus)" }}
                      >
                        <Clock
                          className="w-4 h-4"
                          style={{ color: "var(--chalet-green)" }}
                        />
                        {t.activityOptions}
                      </label>

                      <div className="space-y-2">
                        <label
                          className="flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-all hover:bg-opacity-50"
                          style={{
                            backgroundColor: "rgba(97, 93, 85, 0.05)",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={formData.includeTimeBreakdown}
                            onChange={(e) =>
                              handleInputChange(
                                "includeTimeBreakdown",
                                e.target.checked,
                              )
                            }
                            className="w-4 h-4 rounded"
                            style={{ accentColor: "var(--chalet-green)" }}
                          />
                          <div>
                            <span
                              className="text-xs font-medium"
                              style={{ color: "var(--zeus)" }}
                            >
                              {t.timeBreakdown}
                            </span>
                            <p
                              className="text-xs mt-1"
                              style={{ color: "var(--gray)" }}
                            >
                              {t.timeBreakdownDesc}
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Work Groups */}
                    <div>
                      <label
                        className="flex items-center gap-2 text-sm font-semibold mb-3"
                        style={{ color: "var(--zeus)" }}
                      >
                        <Users
                          className="w-4 h-4"
                          style={{ color: "var(--chalet-green)" }}
                        />
                        {t.workgroups}
                      </label>
                      <textarea
                        value={formData.workgroups}
                        onChange={(e) =>
                          handleInputChange("workgroups", e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-xl custom-input resize-none text-sm"
                        style={{ backgroundColor: "white" }}
                        placeholder={t.workgroupsPlaceholder}
                        rows="3"
                      />
                    </div>
                  </div>
                </div>

                {/* Purpose */}
                <div>
                  <label
                    className="flex items-center gap-2 text-sm font-semibold mb-4"
                    style={{ color: "var(--zeus)" }}
                  >
                    <Target
                      className="w-4 h-4"
                      style={{ color: "var(--chalet-green)" }}
                    />
                    {t.purpose} *
                  </label>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {predefinedPurposes.map((purpose) => (
                      <label
                        key={purpose}
                        className="flex items-center gap-3 cursor-pointer p-3 rounded-lg transition-all hover:bg-opacity-50"
                        style={{
                          backgroundColor: formData.purposes.includes(purpose)
                            ? "rgba(65, 102, 49, 0.1)"
                            : "rgba(97, 93, 85, 0.05)",
                        }}
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
                          className="w-4 h-4 rounded"
                          style={{ accentColor: "var(--chalet-green)" }}
                        />
                        <span
                          className="text-sm font-medium"
                          style={{ color: "var(--zeus)" }}
                        >
                          {purpose}
                        </span>
                      </label>
                    ))}
                  </div>
                  <div className="space-y-3">
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
                      className="w-full px-4 py-3 text-sm rounded-xl custom-input"
                      style={{ backgroundColor: "white" }}
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
                      className="w-full px-4 py-3 text-sm rounded-xl custom-input"
                      style={{ backgroundColor: "white" }}
                      placeholder={t.customPurpose2}
                    />
                  </div>
                </div>

                {/* Desired Outcome */}
                <div>
                  <label
                    className="flex items-center gap-2 text-sm font-semibold mb-3"
                    style={{ color: "var(--zeus)" }}
                  >
                    <Target
                      className="w-4 h-4"
                      style={{ color: "var(--chalet-green)" }}
                    />
                    {t.desiredOutcome}
                  </label>
                  <textarea
                    value={formData.desiredOutcome}
                    onChange={(e) =>
                      handleInputChange("desiredOutcome", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-xl custom-input resize-none"
                    style={{ backgroundColor: "white" }}
                    placeholder="e.g. Highlight team skills, create a shared map..."
                    rows="3"
                  />
                </div>

                {/* Required Materials */}
                <div>
                  <label
                    className="flex items-center gap-2 text-sm font-semibold mb-3"
                    style={{ color: "var(--zeus)" }}
                  >
                    <Package
                      className="w-4 h-4"
                      style={{ color: "var(--chalet-green)" }}
                    />
                    {t.requiredMaterials}
                  </label>
                  <textarea
                    value={formData.requiredMaterials}
                    onChange={(e) =>
                      handleInputChange("requiredMaterials", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-xl custom-input resize-none"
                    style={{ backgroundColor: "white" }}
                    placeholder="e.g. Post-it notes, markers, 20-meter rope..."
                    rows="3"
                  />
                </div>

                {/* Additional Notes */}
                <div>
                  <label
                    className="flex items-center gap-2 text-sm font-semibold mb-3"
                    style={{ color: "var(--zeus)" }}
                  >
                    <Edit3
                      className="w-4 h-4"
                      style={{ color: "var(--chalet-green)" }}
                    />
                    {t.additionalNotes}
                  </label>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) =>
                      handleInputChange("additionalNotes", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-xl custom-input resize-none"
                    style={{ backgroundColor: "white" }}
                    placeholder="Add details, specific context, particular requirements..."
                    rows="4"
                  />
                </div>

                {/* Generate Button */}
                <button
                  onClick={generateActivity}
                  disabled={!canGenerate || isGenerating}
                  className={`w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-3 custom-btn text-lg ${
                    canGenerate && !isGenerating
                      ? "shadow-lg"
                      : "cursor-not-allowed opacity-50"
                  }`}
                  style={{
                    backgroundColor:
                      canGenerate && !isGenerating
                        ? hasGenerated && formChanged
                          ? "var(--pueblo)"
                          : "var(--chalet-green)"
                        : "var(--gray)",
                    color: "white",
                  }}
                >
                  {isGenerating ? (
                    <RefreshCw className="w-5 h-5 spinner" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                  {isGenerating
                    ? t.generating
                    : hasGenerated
                      ? t.update
                      : t.generate}
                </button>

                {hasGenerated && formChanged && (
                  <p
                    className="text-sm text-center font-medium"
                    style={{ color: "var(--pueblo)" }}
                  >
                    {t.parametersChanged}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Output */}
          <div className="fade-in">
            <div
              className="rounded-3xl p-8 shadow-lg h-full flex flex-col"
              style={{
                backgroundColor: "white",
                border: "1px solid rgba(97, 93, 85, 0.1)",
              }}
            >
              <h2
                className="text-3xl font-bold mb-8 flex items-center gap-3"
                style={{ color: "var(--zeus)" }}
              >
                <div
                  className="p-2 rounded-xl"
                  style={{ backgroundColor: "rgba(221, 179, 73, 0.1)" }}
                >
                  <MessageSquare
                    className="w-6 h-6"
                    style={{ color: "var(--anzac)" }}
                  />
                </div>
                {t.generatedActivity}
              </h2>

              <div className="flex-1 flex flex-col">
                {!hasGenerated && !isGenerating && (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <div
                        className="p-6 rounded-full mb-6"
                        style={{ backgroundColor: "rgba(97, 93, 85, 0.05)" }}
                      >
                        <Play
                          className="w-16 h-16 mx-auto"
                          style={{ color: "var(--gray)" }}
                        />
                      </div>
                      <p className="text-lg" style={{ color: "var(--gray)" }}>
                        {t.fillParameters}
                      </p>
                    </div>
                  </div>
                )}

                {isGenerating && (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <div
                        className="p-6 rounded-full mb-6"
                        style={{ backgroundColor: "rgba(65, 102, 49, 0.1)" }}
                      >
                        <RefreshCw
                          className="w-16 h-16 mx-auto spinner"
                          style={{ color: "var(--chalet-green)" }}
                        />
                      </div>
                      <p
                        className="text-lg font-medium"
                        style={{ color: "var(--zeus)" }}
                      >
                        {t.generatingActivity}
                      </p>
                    </div>
                  </div>
                )}

                {output && !isGenerating && (
                  <div className="flex-1 overflow-auto">
                    <div
                      className="whitespace-pre-wrap text-sm p-6 rounded-2xl h-full"
                      style={{
                        backgroundColor: isError
                          ? "rgba(132, 40, 19, 0.04)"
                          : "rgba(97, 93, 85, 0.03)",
                        border: isError
                          ? "1px solid rgba(132, 40, 19, 0.2)"
                          : "1px solid rgba(97, 93, 85, 0.1)",
                        color: isError ? "var(--pueblo)" : "var(--zeus)",
                        lineHeight: "1.6",
                      }}
                    >
                      {output}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {hasGenerated && !isGenerating && !isError && (
                <div
                  className="mt-8 pt-6"
                  style={{ borderTop: "1px solid rgba(97, 93, 85, 0.1)" }}
                >
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={downloadCSV}
                      disabled={isDownloading}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium custom-btn"
                      style={{
                        backgroundColor: "var(--chalet-green)",
                        color: "white",
                      }}
                    >
                      {isDownloading ? (
                        <RefreshCw className="w-4 h-4 spinner" />
                      ) : (
                        <Download className="w-4 h-4" />
                      )}
                      {t.downloadCSV}
                    </button>

                    <button
                      onClick={downloadText}
                      disabled={isDownloading}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium custom-btn"
                      style={{
                        backgroundColor: "var(--anzac)",
                        color: "var(--zeus)",
                      }}
                    >
                      {isDownloading ? (
                        <RefreshCw className="w-4 h-4 spinner" />
                      ) : (
                        <Download className="w-4 h-4" />
                      )}
                      {t.downloadText}
                    </button>

                    <button
                      onClick={openTipDeveloper}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium custom-btn ml-auto"
                      style={{
                        backgroundColor: "var(--pueblo)",
                        color: "white",
                      }}
                    >
                      <Heart className="w-4 h-4" />
                      {t.tipDeveloper}
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
