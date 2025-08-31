# **App Name**: Feather Quill

## Core Features:

- Content Creation & Management: Enables users to create, edit, and manage various types of content (text, photo, quote, link, video, audio, uploader) using a Feather-based system. Supports drafts and publishing.
- AI-Powered Summarization: Generates concise summaries (TL;DR) for each post using the Gemini API, providing users with a quick overview of the content.
- AI-Driven SEO Assistance: Provides SEO suggestions, including title ideas, keywords, and meta descriptions, using the Gemini API to help users optimize their content for search engines. The tool uses tags provided to come up with better titles, keywords and meta descriptions.
- Personalized Content Recommendations: Suggests similar blog posts based on content embeddings, tag overlap, and user interests, and optionally location data to boost relevant content, improving user engagement. The tool uses embeddings and personal data to select the blogs most suitable for the reader.
- Taxonomy & Organization: Allows users to categorize and tag posts for better organization and discoverability, enhancing content filtering and search capabilities.
- Engagement Features: Enables users to interact with content through comments (with MAPTCHA) and likes, fostering community engagement and providing feedback mechanisms.
- Media Uploads: Streamlines media uploading to Cloudinary with proper metadata using the uploader Feather, allowing user to manage the process directly from their browser.

## Style Guidelines:

- Primary color: Use a saturated teal (#008080) to reflect a sense of trustworthiness and stability, qualities desirable for reliable information consumption. (User requested Teal)
- Background color: A very light, desaturated teal (#F0F8FF) will serve as a neutral backdrop that is easy on the eyes and supports content focus.
- Accent color: A vibrant yellow-orange (#FFB347), creates visual interest and guide user attention to key interactive elements such as call to action buttons or highlights.
- Body and headline font: 'Inter' (sans-serif) is a neutral, modern, and highly readable typeface that provides a clean and unobtrusive reading experience, allowing for high focus on information content. Note: currently only Google Fonts are supported.
- Code font: 'Source Code Pro' (monospace) ensures code snippets are clear and easily distinguishable from the body text, thanks to its specialized design tailored for programming contexts.
- Employs a consistent set of icons from Radix UI that convey the app's various functions. Their clean, simple design matches the content's informational styling.
- Implements subtle transitions and feedback animations (such as button presses or loading states) to improve user experience.