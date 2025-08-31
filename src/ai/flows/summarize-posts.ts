'use server';

/**
 * @fileOverview A summarization AI agent for blog posts.
 *
 * - summarizePost - A function that handles the post summarization process.
 * - SummarizePostInput - The input type for the summarizePost function.
 * - SummarizePostOutput - The return type for the summarizePost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const SummarizePostInputSchema = z.object({
  content: z.string().describe('The content of the blog post to summarize.'),
});
export type SummarizePostInput = z.infer<typeof SummarizePostInputSchema>;

const SummarizePostOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the blog post.'),
  bulletPoints: z.string().describe('TL;DR bullet points.'),
});
export type SummarizePostOutput = z.infer<typeof SummarizePostOutputSchema>;

export async function summarizePost(input: SummarizePostInput): Promise<SummarizePostOutput> {
  return summarizePostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizePostPrompt',
  input: {schema: SummarizePostInputSchema},
  output: {schema: SummarizePostOutputSchema},
  prompt: `You are an expert summarizer for blog posts.  Your goal is to provide a concise and informative summary of the provided content.

  Content: {{{content}}}

  Summary:
  {{~output.summary~}}
  TL;DR (Bullet Points):
  {{~output.bulletPoints~}}`,
});

const summarizePostFlow = ai.defineFlow(
  {
    name: 'summarizePostFlow',
    inputSchema: SummarizePostInputSchema,
    outputSchema: SummarizePostOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
