export async function generateSummary(tasks) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-3-haiku-20240307",
      max_tokens: 100,
      messages: [
        {
          role: "user",
          content: `Analyze these tasks and give a short productivity summary:\n${JSON.stringify(tasks)}`,
        },
      ],
    }),
  });

  const data = await res.json();
  return data.content[0].text;
}