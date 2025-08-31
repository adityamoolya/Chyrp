// RecommendSimilarPosts story implementation.
'use server';
/**
 * @fileOverview Recommends similar blog posts based on content and user interests.
 *
 * - recommendSimilarPosts - A function that recommends similar blog posts.
 * - RecommendSimilarPostsInput - The input type for the recommendSimilarPosts function.
 * - RecommendSimilarPostsOutput - The return type for the recommendSimilarPosts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendSimilarPostsInputSchema = z.object({
  postId: z.string().describe('The ID of the current blog post.'),
  content: z.string().describe('The content of the current blog post.'),
  tags: z.array(z.string()).describe('The tags associated with the current blog post.'),
  interests: z.array(z.string()).optional().describe('The user interests (tags read/liked).'),
  locationCountry: z.string().optional().describe('The user location (country).'),
  locationCity: z.string().optional().describe('The user location (city).'),
});
export type RecommendSimilarPostsInput = z.infer<typeof RecommendSimilarPostsInputSchema>;

const RecommendSimilarPostsOutputSchema = z.array(z.object({
  postId: z.string().describe('The ID of the similar blog post.'),
  title: z.string().describe('The title of the similar blog post.'),
  excerpt: z.string().describe('A short excerpt of the similar blog post.'),
  similarityScore: z.number().describe('The similarity score between the current post and the similar post.'),
}));
export type RecommendSimilarPostsOutput = z.infer<typeof RecommendSimilarPostsOutputSchema>;

export async function recommendSimilarPosts(input: RecommendSimilarPostsInput): Promise<RecommendSimilarPostsOutput> {
  return recommendSimilarPostsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendSimilarPostsPrompt',
  input: {schema: RecommendSimilarPostsInputSchema},
  output: {schema: RecommendSimilarPostsOutputSchema},
  prompt: `You are a blog post recommendation engine. You will receive the content, tags, user interests, and user location of a blog post, and return a list of similar blog posts.

  The similarity score should be a number between 0 and 1, where 1 is the most similar and 0 is the least similar. Include the title, excerpt, and postId for each post.

  Content: {{{content}}}
  Tags: {{#each tags}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  {{#if interests}}
  User Interests: {{#each interests}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  {{/if}}
  {{#if locationCountry}}
  User Location Country: {{{locationCountry}}}
  {{/if}}
  {{#if locationCity}}
  User Location City: {{{locationCity}}}
  {{/if}}`,
});

const recommendSimilarPostsFlow = ai.defineFlow(
  {
    name: 'recommendSimilarPostsFlow',
    inputSchema: RecommendSimilarPostsInputSchema,
    outputSchema: RecommendSimilarPostsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
