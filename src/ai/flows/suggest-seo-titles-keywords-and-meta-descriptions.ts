'use server';

/**
 * @fileOverview An AI agent that suggests SEO-friendly titles, keywords, and meta descriptions for posts.
 *
 * - suggestSeoTitlesKeywordsAndMetaDescriptions - A function that handles the SEO suggestion process.
 * - SuggestSeoTitlesKeywordsAndMetaDescriptionsInput - The input type for the suggestSeoTitlesKeywordsAndMetaDescriptions function.
 * - SuggestSeoTitlesKeywordsAndMetaDescriptionsOutput - The return type for the suggestSeoTitlesKeywordsAndMetaDescriptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSeoTitlesKeywordsAndMetaDescriptionsInputSchema = z.object({
  title: z.string().describe('The title of the post.'),
  content: z.string().describe('The content of the post.'),
  tags: z.array(z.string()).optional().describe('The tags associated with the post.'),
});
export type SuggestSeoTitlesKeywordsAndMetaDescriptionsInput = z.infer<
  typeof SuggestSeoTitlesKeywordsAndMetaDescriptionsInputSchema
>;

const SuggestSeoTitlesKeywordsAndMetaDescriptionsOutputSchema = z.object({
  titleSuggestions: z.array(z.string()).describe('Suggestions for SEO-friendly titles.'),
  keywords: z.array(z.string()).describe('Suggested keywords for the post.'),
  metaDescription: z.string().describe('A suggested meta description for the post.'),
});
export type SuggestSeoTitlesKeywordsAndMetaDescriptionsOutput = z.infer<
  typeof SuggestSeoTitlesKeywordsAndMetaDescriptionsOutputSchema
>;

export async function suggestSeoTitlesKeywordsAndMetaDescriptions(
  input: SuggestSeoTitlesKeywordsAndMetaDescriptionsInput
): Promise<SuggestSeoTitlesKeywordsAndMetaDescriptionsOutput> {
  return suggestSeoTitlesKeywordsAndMetaDescriptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSeoTitlesKeywordsAndMetaDescriptionsPrompt',
  input: {schema: SuggestSeoTitlesKeywordsAndMetaDescriptionsInputSchema},
  output: {schema: SuggestSeoTitlesKeywordsAndMetaDescriptionsOutputSchema},
  prompt: `You are an SEO expert. Given the title, content, and tags of a blog post, you will suggest SEO-friendly titles, keywords, and a meta description to improve the post's visibility in search engine results.

Title: {{{title}}}
Content: {{{content}}}
Tags: {{#if tags}}{{#each tags}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}No tags provided{{/if}}

Please provide:
- 3 title suggestions that are SEO-friendly.
- A list of 5 relevant keywords.
- A compelling meta description (under 160 characters).

Ensure that the suggestions are relevant to the content and incorporate the provided tags where appropriate.`,
});

const suggestSeoTitlesKeywordsAndMetaDescriptionsFlow = ai.defineFlow(
  {
    name: 'suggestSeoTitlesKeywordsAndMetaDescriptionsFlow',
    inputSchema: SuggestSeoTitlesKeywordsAndMetaDescriptionsInputSchema,
    outputSchema: SuggestSeoTitlesKeywordsAndMetaDescriptionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
