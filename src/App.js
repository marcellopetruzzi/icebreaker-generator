import React, { useState, useEffect } from 'react';
import { Download, Coffee, RefreshCw, Play, Users, Clock, Target, Package, MessageSquare, Edit3, Globe } from 'lucide-react';

const App = () => {
  const [formData, setFormData] = useState({
    duration: '',
    people: '',
    purposes: [],
    customPurpose1: '',
    customPurpose2: '',
    desiredOutcome: '',
    requiredMaterials: '',
    additionalNotes: '',
    language: ''
  });

  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [formChanged, setFormChanged] = useState(false);
  const [initialFormData, setInitialFormData] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const predefinedPurposes = ['Relaxation', 'Energization', 'Connection', 'Body Movement', 'Awakening', 'Fun'];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish / Español' },
    { code: 'fr', name: 'French / Français' },
    { code: 'de', name: 'German / Deutsch' },
    { code: 'it', name: 'Italian / Italiano' },
    { code: 'pt', name: 'Portuguese / Português' },
    { code: 'nl', name: 'Dutch / Nederlands' },
    { code: 'ru', name: 'Russian / Русский' },
    { code: 'zh', name: 'Chinese / 中文' },
    { code: 'ja', name: 'Japanese / 日本語' },
    { code: 'ko', name: 'Korean / 한국어' },
    { code: 'ar', name: 'Arabic / العربية' },
    { code: 'hi', name: 'Hindi / हिन्दी' },
    { code: 'th', name: 'Thai / ไทย' },
    { code: 'vi', name: 'Vietnamese / Tiếng Việt' },
    { code: 'id', name: 'Indonesian / Bahasa Indonesia' },
    { code: 'ms', name: 'Malay / Bahasa Melayu' },
    { code: 'tl', name: 'Filipino / Tagalog' },
    { code: 'sw', name: 'Swahili / Kiswahili' },
    { code: 'tr', name: 'Turkish / Türkçe' },
    { code: 'pl', name: 'Polish / Polski' },
    { code: 'cs', name: 'Czech / Čeština' },
    { code: 'sk', name: 'Slovak / Slovenčina' },
    { code: 'hu', name: 'Hungarian / Magyar' },
    { code: 'ro', name: 'Romanian / Română' },
    { code: 'bg', name: 'Bulgarian / Български' },
    { code: 'hr', name: 'Croatian / Hrvatski' },
    { code: 'sr', name: 'Serbian / Српски' },
    { code: 'sl', name: 'Slovenian / Slovenščina' },
    { code: 'lt', name: 'Lithuanian / Lietuvių' },
    { code: 'lv', name: 'Latvian / Latviešu' },
    { code: 'et', name: 'Estonian / Eesti' },
    { code: 'fi', name: 'Finnish / Suomi' },
    { code: 'sv', name: 'Swedish / Svenska' },
    { code: 'da', name: 'Danish / Dansk' },
    { code: 'no', name: 'Norwegian / Norsk' },
    { code: 'is', name: 'Icelandic / Íslenska' },
    { code: 'el', name: 'Greek / Ελληνικά' },
    { code: 'he', name: 'Hebrew / עברית' },
    { code: 'fa', name: 'Persian / فارسی' },
    { code: 'ur', name: 'Urdu / اردو' },
    { code: 'bn', name: 'Bengali / বাংলা' },
    { code: 'ta', name: 'Tamil / தமிழ்' },
    { code: 'te', name: 'Telugu / తెలుగు' },
    { code: 'ml', name: 'Malayalam / മലയാളം' },
    { code: 'kn', name: 'Kannada / ಕನ್ನಡ' },
    { code: 'gu', name: 'Gujarati / ગુજરાતી' },
    { code: 'pa', name: 'Punjabi / ਪੰਜਾਬੀ' },
    { code: 'mr', name: 'Marathi / मराठी' },
    { code: 'ne', name: 'Nepali / नेपाली' },
    { code: 'si', name: 'Sinhala / සිංහල' },
    { code: 'my', name: 'Burmese / မြန်မာ' },
    { code: 'km', name: 'Khmer / ភាសាខ្មែរ' },
    { code: 'lo', name: 'Lao / ລາວ' },
    { code: 'ka', name: 'Georgian / ქართული' },
    { code: 'hy', name: 'Armenian / Հայերեն' },
    { code: 'az', name: 'Azerbaijani / Azərbaycan' },
    { code: 'kk', name: 'Kazakh / Қазақша' },
    { code: 'ky', name: 'Kyrgyz / Кыргызча' },
    { code: 'uz', name: 'Uzbek / Oʻzbekcha' },
    { code: 'tg', name: 'Tajik / Тоҷикӣ' },
    { code: 'mn', name: 'Mongolian / Монгол' },
    { code: 'bo', name: 'Tibetan / བོད་སྐད' },
    { code: 'dz', name: 'Dzongkha / རྫོང་ཁ' },
    { code: 'am', name: 'Amharic / አማርኛ' },
    { code: 'ti', name: 'Tigrinya / ትግርኛ' },
    { code: 'so', name: 'Somali / Soomaali' },
    { code: 'yo', name: 'Yoruba' },
    { code: 'ig', name: 'Igbo' },
    { code: 'ha', name: 'Hausa' },
    { code: 'zu', name: 'Zulu' },
    { code: 'xh', name: 'Xhosa' },
    { code: 'af', name: 'Afrikaans' },
    { code: 'mt', name: 'Maltese / Malti' },
    { code: 'ga', name: 'Irish / Gaeilge' },
    { code: 'cy', name: 'Welsh / Cymraeg' },
    { code: 'eu', name: 'Basque / Euskera' },
    { code: 'ca', name: 'Catalan / Català' },
    { code: 'gl', name: 'Galician / Galego' },
    { code: 'oc', name: 'Occitan' },
    { code: 'br', name: 'Breton / Brezhoneg' },
    { code: 'co', name: 'Corsican / Corsu' },
    { code: 'sc', name: 'Sardinian / Sardu' },
    { code: 'rm', name: 'Romansh / Rumantsch' },
    { code: 'lb', name: 'Luxembourgish / Lëtzebuergesch' },
    { code: 'fy', name: 'Frisian / Frysk' },
    { code: 'gd', name: 'Scottish Gaelic / Gàidhlig' },
    { code: 'kw', name: 'Cornish / Kernewek' },
    { code: 'fo', name: 'Faroese / Føroyskt' }
  ];

  useEffect(() => {
    if (hasGenerated && initialFormData) {
      const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialFormData);
      setFormChanged(hasChanges);
    }
  }, [formData, initialFormData, hasGenerated]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePurposeChange = (purpose, checked) => {
    setFormData(prev => {
      const newPurposes = checked 
        ? [...prev.purposes, purpose]
        : prev.purposes.filter(p => p !== purpose);
      
      // Limit to 2 selections
      if (newPurposes.length > 2) {
        return prev;
      }
      
      return { ...prev, purposes: newPurposes };
    });
  };

  const validateForm = () => {
    if (!formData.duration || !formData.people || !formData.language) return false;
    if (isNaN(formData.duration) || isNaN(formData.people)) return false;
    if (parseInt(formData.duration) <= 0 || parseInt(formData.people) <= 0) return false;
    
    const totalPurposes = formData.purposes.length + 
      (formData.customPurpose1 ? 1 : 0) + 
      (formData.customPurpose2 ? 1 : 0);
    
    return totalPurposes > 0;
  };

  const generateActivity = async () => {
    if (!validateForm()) return;

    setIsGenerating(true);
    
    try {
      // Debug: Check if API key exists
      console.log('API Key exists:', !!process.env.REACT_APP_ANTHROPIC_API_KEY);
      console.log('API Key starts with sk-ant:', process.env.REACT_APP_ANTHROPIC_API_KEY?.startsWith('sk-ant'));
      console.log('API Key length:', process.env.REACT_APP_ANTHROPIC_API_KEY?.length);
      
      if (!process.env.REACT_APP_ANTHROPIC_API_KEY) {
        throw new Error('API key not found. Please check your environment variables in Vercel.');
      }

      if (!process.env.REACT_APP_ANTHROPIC_API_KEY.startsWith('sk-ant')) {
        throw new Error('API key format appears incorrect. Should start with sk-ant-api03-');
      }

      const allPurposes = [...formData.purposes];
      if (formData.customPurpose1) allPurposes.push(formData.customPurpose1);
      if (formData.customPurpose2) allPurposes.push(formData.customPurpose2);

      const selectedLanguage = languages.find(lang => lang.code === formData.language);
      const languageName = selectedLanguage ? selectedLanguage.name : formData.language;

      const prompt = `As an expert collaborative process facilitator, generate a personalized icebreaker/energizer with these parameters:

IMPORTANT: Generate the ENTIRE response in ${languageName}. All content including titles, instructions, and explanations must be in ${languageName}.

PARAMETERS:
- Duration: ${formData.duration} minutes
- Number of participants: ${formData.people} people
- Purposes: ${allPurposes.join(', ')}
${formData.desiredOutcome ? `- Desired outcome: ${formData.desiredOutcome}` : ''}
${formData.requiredMaterials ? `- Required materials: ${formData.requiredMaterials}` : ''}
${formData.additionalNotes ? `- Additional notes: ${formData.additionalNotes}` : ''}
- Output language: ${languageName}

REQUIRED STRUCTURE:
**ACTIVITY TITLE** (in ${languageName})

**OBJECTIVE** (in ${languageName})
[Brief description of specific objectives]

**DURATION** (in ${languageName})
[Estimated time and phase breakdown if necessary]

**PARTICIPANTS** (in ${languageName})
[Guidelines on number and arrangement]

**MATERIALS** (in ${languageName})
[List of necessary materials, even if minimal]

**STEP-BY-STEP INSTRUCTIONS** (in ${languageName})
1. [First step]
2. [Second step]
[etc.]

**VARIATIONS/ADAPTATIONS** (in ${languageName})
[Suggestions for modifying the activity based on context]

**FACILITATION TIPS** (in ${languageName})
[Advice for those conducting the activity]

Generate an innovative, engaging activity suitable for professional facilitation contexts. Be creative but practical. Remember: ALL content must be written in ${languageName}.`;

      console.log('Making API request via proxy...');

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt
        })
      });

      console.log('Response received:', response);

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      const data = await response.json();
      console.log('Response data:', data);
      
      if (!response.ok) {
        console.error('API Response Error:', data);
        throw new Error(`API Error ${response.status}: ${data.error?.message || JSON.stringify(data)}`);
      }
      
      const generatedActivity = data.content[0].text;
      
      setOutput(generatedActivity);
      setHasGenerated(true);
      setFormChanged(false);
      setInitialFormData({...formData});
      
    } catch (error) {
      console.error('Full error details:', error);
      setOutput(`Error: ${error.message}`);
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

      const selectedLanguage = languages.find(lang => lang.code === formData.language);
      const languageName = selectedLanguage ? selectedLanguage.name : formData.language;

      const prompt = format === 'csv' 
        ? `Convert the following icebreaker activity and its parameters into a well-structured CSV format. Create meaningful columns and properly escape any commas or quotes in the content.

ACTIVITY PARAMETERS:
- Duration: ${formData.duration} minutes
- Participants: ${formData.people}
- Purposes: ${allPurposes.join(', ')}
- Desired outcome: ${formData.desiredOutcome || 'Not specified'}
- Required materials: ${formData.requiredMaterials || 'Not specified'}
- Additional notes: ${formData.additionalNotes || 'None'}
- Language: ${languageName}

GENERATED ACTIVITY:
${output}

Output ONLY the CSV content with proper headers and formatting. Make it suitable for import into spreadsheet applications.`
        : `Format the following icebreaker activity into a clean, professional text document suitable for printing or sharing. Use clear headers, proper spacing, and readable formatting.

ACTIVITY PARAMETERS:
- Duration: ${formData.duration} minutes
- Participants: ${formData.people}
- Purposes: ${allPurposes.join(', ')}
- Desired outcome: ${formData.desiredOutcome || 'Not specified'}
- Required materials: ${formData.requiredMaterials || 'Not specified'}
- Additional notes: ${formData.additionalNotes || 'None'}
- Language: ${languageName}

GENERATED ACTIVITY:
${output}

Format this as a professional document with clear sections and proper spacing.`;

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt
        })
      });

      const data = await response.json();
      return data.content[0].text;
      
    } catch (error) {
      console.error('Error generating download content:', error);
      return null;
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadCSV = async () => {
    const csvContent = await generateDownloadContent('csv');
    if (csvContent) {
      downloadFile(csvContent, 'icebreaker-activity.csv', 'text/csv');
    }
  };

  const downloadText = async () => {
    const textContent = await generateDownloadContent('text');
    if (textContent) {
      downloadFile(textContent, 'icebreaker-activity.txt', 'text/plain');
    }
  };

  const openBuyMeACoffee = () => {
    window.open('https://www.buymeacoffee.com/yourhandle', '_blank');
  };

  const canGenerate = validateForm();
  const buttonText = hasGenerated ? 'Update' : 'Generate';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="header-gradient">
        <div className="header-overlay"></div>
        <div className="header-content">
          <h1 className="text-4xl font-bold text-white mb-4">
            Icebreaker Generator
          </h1>
          <p className="text-xl text-blue-100">
            Generate engaging activities to break the ice and energize your working groups
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 h-full">
          {/* Left Column - Parameters */}
          <div className="flex flex-col">
            <div className="bg-white rounded-2xl shadow-lg p-6 flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-indigo-600" />
                Activity Parameters
              </h2>

              <div className="space-y-4">
                {/* Duration */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4" />
                    Ideal Duration (minutes) *
                  </label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g. 15"
                    min="1"
                  />
                </div>

                {/* People */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4" />
                    Number of Participants *
                  </label>
                  <input
                    type="number"
                    value={formData.people}
                    onChange={(e) => handleInputChange('people', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g. 12"
                    min="1"
                  />
                </div>

                {/* Purpose */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                    <Target className="w-4 h-4" />
                    Purpose (max 2 selections) *
                  </label>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {predefinedPurposes.map(purpose => (
                      <label key={purpose} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.purposes.includes(purpose)}
                          onChange={(e) => handlePurposeChange(purpose, e.target.checked)}
                          disabled={!formData.purposes.includes(purpose) && 
                            formData.purposes.length + (formData.customPurpose1 ? 1 : 0) + (formData.customPurpose2 ? 1 : 0) >= 2}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-sm text-gray-700">{purpose}</span>
                      </label>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={formData.customPurpose1}
                      onChange={(e) => handleInputChange('customPurpose1', e.target.value)}
                      disabled={!formData.customPurpose1 && 
                        formData.purposes.length + (formData.customPurpose2 ? 1 : 0) >= 2}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100"
                      placeholder="Custom purpose 1"
                    />
                    <input
                      type="text"
                      value={formData.customPurpose2}
                      onChange={(e) => handleInputChange('customPurpose2', e.target.value)}
                      disabled={!formData.customPurpose2 && 
                        formData.purposes.length + (formData.customPurpose1 ? 1 : 0) >= 2}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100"
                      placeholder="Custom purpose 2"
                    />
                  </div>
                </div>

                {/* Desired Outcome */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Target className="w-4 h-4" />
                    Desired Outcome (optional)
                  </label>
                  <textarea
                    value={formData.desiredOutcome}
                    onChange={(e) => handleInputChange('desiredOutcome', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g. Highlight team skills, create a shared map..."
                    rows="2"
                  />
                </div>

                {/* Required Materials */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Package className="w-4 h-4" />
                    Required Materials (optional)
                  </label>
                  <textarea
                    value={formData.requiredMaterials}
                    onChange={(e) => handleInputChange('requiredMaterials', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g. Post-it notes, markers, 20-meter rope..."
                    rows="2"
                  />
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Edit3 className="w-4 h-4" />
                    What else? (optional)
                  </label>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Add details, specific context, particular requirements..."
                    rows="3"
                  />
                </div>

                {/* Language */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Globe className="w-4 h-4" />
                    Language *
                  </label>
                  <select
                    value={formData.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select a language...</option>
                    {languages.map(lang => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Generate Button */}
                <button
                  onClick={generateActivity}
                  disabled={!canGenerate || isGenerating}
                  className={`w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                    canGenerate && !isGenerating
                      ? hasGenerated && formChanged
                        ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg hover:shadow-xl'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isGenerating ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                  {isGenerating ? 'Generating...' : buttonText}
                </button>
                
                {hasGenerated && formChanged && (
                  <p className="text-sm text-orange-600 text-center">
                    Parameters changed - click Update to regenerate
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Output */}
          <div className="flex flex-col">
            <div className="bg-white rounded-2xl shadow-lg p-6 flex-1 flex flex-col">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Generated Activity
              </h2>
              
              <div className="flex-1 flex flex-col">
                {!hasGenerated && !isGenerating && (
                  <div className="flex-1 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <Play className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg">Fill in the parameters and click "Generate" to start</p>
                    </div>
                  </div>
                )}

                {isGenerating && (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <RefreshCw className="w-16 h-16 mx-auto mb-4 text-indigo-600 animate-spin" />
                      <p className="text-lg text-gray-600">Generating your personalized activity...</p>
                    </div>
                  </div>
                )}

                {output && !isGenerating && (
                  <div className="flex-1 overflow-auto">
                    <div className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-lg border h-full">
                      {output}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {hasGenerated && !isGenerating && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={downloadCSV}
                      disabled={isDownloading}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
                    >
                      {isDownloading ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Download className="w-4 h-4" />
                      )}
                      Download CSV
                    </button>
                    
                    <button
                      onClick={downloadText}
                      disabled={isDownloading}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
                    >
                      {isDownloading ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Download className="w-4 h-4" />
                      )}
                      Download Text
                    </button>
                    
                    <button
                      onClick={openBuyMeACoffee}
                      className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-colors ml-auto"
                    >
                      <Coffee className="w-4 h-4" />
                      Buy me a coffee
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

export default App;