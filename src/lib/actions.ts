// src/lib/actions.ts
"use server";

import {
  summarizePost,
  SummarizePostInput,
} from "@/ai/flows/summarize-posts";
import {
  recommendSimilarPosts,
  RecommendSimilarPostsInput,
} from "@/ai/flows/recommend-similar-posts";
import {
  suggestSeoTitlesKeywordsAndMetaDescriptions,
  SuggestSeoTitlesKeywordsAndMetaDescriptionsInput,
} from "@/ai/flows/suggest-seo-titles-keywords-and-meta-descriptions";
import { posts } from "./data";
import { Post } from "./types";

export async function getSummary(input: SummarizePostInput) {
  try {
    // In a real app, you might have more complex logic here
    // For now, we'll simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const result = {
        summary: "This is an AI-generated summary of the post content, providing a quick and easy-to-digest overview of the main points and key takeaways. It's designed to give readers a glimpse of what the post is about before they dive in.",
        bulletPoints: "- AI-generated summary\n- Key takeaways\n- Quick overview"
    }
    return result;
  } catch (error) {
    console.error("Error getting summary:", error);
    return null;
  }
}

export async function getSimilarPosts(input: RecommendSimilarPostsInput) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // In a real app, the AI flow would return post IDs and you'd fetch them.
    // Here we'll just return a few random posts from our mock data.
    return posts
      .filter((p) => p.id !== input.postId)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((p: Post) => ({
        postId: p.id,
        title: p.title,
        excerpt: p.excerpt,
        similarityScore: Math.random() * 0.3 + 0.6, // Fake score
      }));
  } catch (error) {
    console.error("Error getting similar posts:", error);
    return [];
  }
}

export async function getSeoSuggestions(
  input: SuggestSeoTitlesKeywordsAndMetaDescriptionsInput
) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Mocked response
    return {
        titleSuggestions: [
            `Ultimate Guide to ${input.title}`,
            `${input.title}: Everything You Need to Know`,
            `How ${input.title} Can Change Your Life`
        ],
        keywords: (input.tags || []).concat(['seo', 'suggestions', 'ai content']),
        metaDescription: `Discover the best insights on ${input.title}. This AI-generated meta description is optimized for search engines to boost your visibility.`
    }
  } catch (error) {
    console.error("Error getting SEO suggestions:", error);
    return null;
  }
}
