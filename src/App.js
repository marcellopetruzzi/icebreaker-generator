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

      console.log('Making API request to Anthropic...');

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.REACT_APP_ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 2000,
          messages: [
            { role: "user", content: prompt }
          ]
        })
      });

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