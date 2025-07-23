export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      duration,
      people,
      workgroups,
      purposes,
      desiredOutcome,
      requiredMaterials,
      additionalNotes,
      languageName,
      includeTimeBreakdown,
    } = req.body;

    // Validate required fields
    if (!duration || !people || !purposes || !languageName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Construct the prompt
    const prompt = `As an expert collaborative process facilitator, generate a personalized icebreaker/energizer with these parameters:

IMPORTANT: Generate the ENTIRE response in ${languageName}. All content including titles, instructions, and explanations must be in ${languageName}.

PARAMETERS:
- Duration: ${duration} minutes
- Number of participants: ${people} people
${workgroups ? `- Work groups organization: ${workgroups}` : ""}
- Purposes: ${purposes.join(", ")}
${desiredOutcome ? `- Desired outcome: ${desiredOutcome}` : ""}
${requiredMaterials ? `- Required materials: ${requiredMaterials}` : ""}
${additionalNotes ? `- Additional notes: ${additionalNotes}` : ""}
- Output language: ${languageName}
- Include time breakdown: ${includeTimeBreakdown ? "Yes" : "No"}

REQUIRED STRUCTURE:
**ACTIVITY TITLE** (in ${languageName})

**BRIEF DESCRIPTION/NOTES** (in ${languageName})
[One-sentence description of the activity's essence - place this immediately after the title]

**OBJECTIVE** (in ${languageName})
[Brief description of specific objectives]

**DURATION** (in ${languageName})
${
  includeTimeBreakdown
    ? "[Estimated time with detailed phase breakdown - e.g., 2 min setup, 5 min main activity, 3 min sharing]"
    : "[Total estimated time only]"
}

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

    // Call Anthropic API
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 2000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      console.error(
        "Anthropic API error:",
        response.status,
        response.statusText
      );
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedActivity = data.content[0].text;

    return res.status(200).json({ activity: generatedActivity });
  } catch (error) {
    console.error("Error in generate API:", error);
    return res.status(500).json({
      error: "Failed to generate activity",
      details: error.message,
    });
  }
}
