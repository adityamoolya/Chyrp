import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-posts.ts';
import '@/ai/flows/recommend-similar-posts.ts';
import '@/ai/flows/suggest-seo-titles-keywords-and-meta-descriptions.ts';