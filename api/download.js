export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { format, output, parameters } = req.body;

    if (!format || !output || !parameters) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Generate current timestamp
    const now = new Date();
    const dateString = now.toISOString().split("T")[0]; // YYYY-MM-DD format
    const timeString = now.toTimeString().split(" ")[0]; // HH:MM:SS format

    const watermark = `
─────────────────────────────────────
Generated: ${dateString} ${timeString}
Icebreaker Generator - https://icebreaker-generator.vercel.app
© ${now.getFullYear()} Marcello Petruzzi
Support this project: https://www.paypal.com/donate
─────────────────────────────────────`;

    const prompt =
      format === "csv"
        ? `Convert the following icebreaker activity and its parameters into a well-structured CSV format. Create meaningful columns and properly escape any commas or quotes in the content.

ACTIVITY PARAMETERS:
- Duration: ${parameters.duration} minutes
- Participants: ${parameters.people}
${parameters.workgroups ? `- Work groups: ${parameters.workgroups}` : ""}
- Purposes: ${parameters.purposes.join(", ")}
- Desired outcome: ${parameters.desiredOutcome || "Not specified"}
- Required materials: ${parameters.requiredMaterials || "Not specified"}
- Additional notes: ${parameters.additionalNotes || "None"}
- Language: ${parameters.languageName}
- Time breakdown included: ${parameters.includeTimeBreakdown ? "Yes" : "No"}

GENERATED ACTIVITY:
${output}

Output ONLY the CSV content with proper headers and formatting. Make it suitable for import into spreadsheet applications.`
        : `Format the following icebreaker activity into a clean, professional text document suitable for printing or sharing.

ACTIVITY PARAMETERS:
- Duration: ${parameters.duration} minutes
- Participants: ${parameters.people}
${parameters.workgroups ? `- Work groups: ${parameters.workgroups}` : ""}
- Purposes: ${parameters.purposes.join(", ")}
- Desired outcome: ${parameters.desiredOutcome || "Not specified"}
- Required materials: ${parameters.requiredMaterials || "Not specified"}
- Additional notes: ${parameters.additionalNotes || "None"}
- Language: ${parameters.languageName}
- Time breakdown included: ${parameters.includeTimeBreakdown ? "Yes" : "No"}

GENERATED ACTIVITY:
${output}

Format this as a professional document with clear sections and proper spacing. At the end, add this watermark:
${watermark}

Structure should be: Activity content first, then the watermark at the bottom.`;

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
    const formattedContent = data.content[0].text;

    return res.status(200).json({ content: formattedContent });
  } catch (error) {
    console.error("Error in download API:", error);
    return res.status(500).json({
      error: "Failed to generate download content",
      details: error.message,
    });
  }
}
