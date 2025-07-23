# AI Code Reviewer Setup Instructions

## Getting a Free Google Gemini API Key

1. **Go to Google AI Studio**: https://makersuite.google.com/
2. **Sign in** with your Google account
3. **Get API Key**: Click "Get API key" button
4. **Create new key** or use existing one
5. **Copy the API key**

## Setting up the API Key

✅ **API Key Already Configured!**

The API key `AIzaSyBmK_-mGXhCOZ_1W8Y1AT4KRFsUg6bO5FM` has been set up in both:
- `src/environments/environment.ts` (development)
- `src/environments/environment.prod.ts` (production)

The application is now configured to use **Gemini 2.0 Flash** model with the latest API format.

## Alternative Free AI APIs

If you prefer other options, here are the modifications needed:

### For OpenAI API
```typescript
// In AiService.ts, replace the callGeminiAPI method with:
private async callOpenAIAPI(prompt: string): Promise<string> {
  const apiKey = environment.openaiApiKey;
  const url = 'https://api.openai.com/v1/chat/completions';
  
  const requestBody = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'user', content: prompt }
    ],
    max_tokens: 1000
  };

  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  };

  const response = await this.http.post(url, requestBody, { headers }).toPromise();
  return response.choices[0].message.content;
}
```

### For Hugging Face API
```typescript
// In AiService.ts, replace the callGeminiAPI method with:
private async callHuggingFaceAPI(prompt: string): Promise<string> {
  const apiKey = environment.huggingFaceApiKey;
  const url = 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-large';
  
  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  };

  const response = await this.http.post(url, { inputs: prompt }, { headers }).toPromise();
  return response.generated_text || response[0]?.generated_text || 'No response generated';
}
```

## Features Implemented

- ✅ Real AI integration with Google Gemini 2.0 Flash
- ✅ API key pre-configured and ready to use
- ✅ Loading states and error handling
- ✅ Modern Angular with signals
- ✅ Responsive UI with good UX
- ✅ TypeScript best practices
- ✅ Proper error handling

## Quick Start

🚀 **Ready to use immediately!**

1. Run `npm install` (if not done already)
2. Run `ng serve` to start the development server
3. Open your browser to `http://localhost:4200`
4. Start reviewing code with AI!

## Usage

1. Paste your code in the textarea
2. Click "Review Code"
3. Wait for the AI analysis
4. Get detailed feedback on your code

The AI will provide feedback on:
- Code quality and best practices
- Potential bugs or issues
- Performance improvements
- Security considerations
- Suggestions for improvement
