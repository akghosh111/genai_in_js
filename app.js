import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


async function main() {
    const completion = await groq.chat.completions.create({
        temperature: 1,
        // top_p: 0.2,
        // stop: 'ga',
        // max_completion_tokens: 1000,
        // frequency_penalty: 1,
        // presence_penalty: 1,
        response_format: {'type': 'json_object'},
        model:'llama-3.3-70b-versatile',
        messages: [
            {
                role: 'system',
                content:`You are an interview grader assistant. Your task is to generate candidate evaluation score.
                Output must be following JSON structure:
                {
                    "confidence": number (1-10 scale),
                    "accuracy": number (1-10 scale),
                    "pass": boolean (true or false)
                }
                    The response must:
                        1. Include All fields shown above
                        2. Use only the exact field names shown
                        3. Follow the exact data types specified
                        4. Contain ONLY the JSON object and nothing else
                `,
                // content: `You are JARVIS, a smart review grader. Your task is to analyse given review. You must return the result in valid JSON structure.
                // example: {"sentiment": "Negative"}`,
            },
            {
                role: 'user',
                content: `Q: What does === do in JavaScript?
                    A: It checks strict equality-both value and type must match.
                    
                    Q: How do you create a promise that resolves after 1 second?
                    A: const p = new Promise(r => setTimeout(r, 1000));
                    
                    Q: What is hoisting?
                    A: JavaScript moves declarations (but not initilizations) to the top of their scope before code runs
                    
                    Q: Why use let instead of var?
                    A: let is block-scoped, avoiding the function-scope quirks and re-declaration issues of var.`,

            }
        ]
    });

    console.log(completion.choices[0].message.content);
}

main()