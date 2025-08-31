import type { User, Tag, Category, Post, Comment } from './types';

export const users: User[] = [
  { id: '1', name: 'Alice', avatarUrl: 'https://picsum.photos/id/1027/100/100' },
  { id: '2', name: 'Bob', avatarUrl: 'https://picsum.photos/id/1005/100/100' },
];

export const tags: Tag[] = [
  { id: '1', name: 'Technology', slug: 'technology' },
  { id: '2', name: 'AI', slug: 'ai' },
  { id: '3', name: 'Design', slug: 'design' },
  { id: '4', name: 'Travel', slug: 'travel' },
  { id: '5', name: 'Productivity', slug: 'productivity' },
];

export const categories: Category[] = [
  { id: '1', name: 'Tutorials', slug: 'tutorials' },
  { id: '2', name: 'Showcase', slug: 'showcase' },
  { id: '3', name: 'Opinion', slug: 'opinion' },
];

export const posts: Post[] = [
  {
    id: '1',
    slug: 'getting-started-with-ai',
    title: 'Getting Started with Artificial Intelligence',
    type: 'text',
    content: `
Artificial Intelligence is a transformative technology. Here's a simple code snippet to illustrate a point:

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet('World'));
\`\`\`

Mathematics is also crucial. Here's an equation using MathJax: $$\\frac{1}{n}\\sum_{i=1}^n x_i$$

This post will guide you through the basics, from understanding core concepts to writing your first AI program. We will explore different branches of AI, including machine learning, natural language processing, and computer vision.
    `,
    excerpt: 'A beginner-friendly guide to the world of AI, covering fundamental concepts and practical first steps.',
    author: users[0],
    published_at: '2024-05-10T10:00:00Z',
    tags: [tags[0], tags[1]],
    categories: [categories[0]],
    like_count: 128,
    comment_count: 12,
    view_count: 2450,
    data: {},
  },
  {
    id: '2',
    slug: 'serene-landscapes',
    title: 'A Collection of Serene Landscapes',
    type: 'photo',
    excerpt: 'Escape into nature with these breathtaking landscape photographs from around the world.',
    author: users[1],
    published_at: '2024-05-09T15:30:00Z',
    tags: [tags[3], tags[2]],
    categories: [categories[1]],
    like_count: 342,
    comment_count: 28,
    view_count: 5600,
    data: {
      imageUrl: 'https://picsum.photos/1200/800?random=1',
      caption: 'Misty mountains at dawn.',
    },
  },
  {
    id: '3',
    slug: 'wisdom-of-the-ancients',
    title: 'Wisdom of the Ancients',
    type: 'quote',
    excerpt: '"The only true wisdom is in knowing you know nothing." - Socrates. A reflection on ancient philosophy.',
    author: users[0],
    published_at: '2024-05-08T12:00:00Z',
    tags: [tags[4]],
    categories: [categories[2]],
    like_count: 98,
    comment_count: 7,
    view_count: 1800,
    data: {
      text: 'The only true wisdom is in knowing you know nothing.',
      source: 'Socrates',
    },
  },
  {
    id: '4',
    slug: 'amazing-design-tools',
    title: '10 Amazing Design Tools You Should Try',
    type: 'link',
    excerpt: 'A curated list of powerful design tools that can supercharge your workflow. Featuring Figma, Sketch, and more.',
    author: users[1],
    published_at: '2024-05-07T18:45:00Z',
    tags: [tags[2], tags[4]],
    categories: [categories[0]],
    like_count: 215,
    comment_count: 19,
    view_count: 4200,
    data: {
      url: 'https://figma.com',
      title: 'Figma: The Collaborative Interface Design Tool',
      description: 'Figma is a vector graphics editor and prototyping tool which is primarily web-based, with additional offline features enabled by desktop applications for macOS and Windows.',
      imageUrl: 'https://picsum.photos/1200/800?random=2',
    },
  },
  {
    id: '5',
    slug: 'cinematic-drone-footage',
    title: 'Cinematic Drone Footage',
    type: 'video',
    excerpt: 'Experience the world from a new perspective with this stunning 4K cinematic drone footage.',
    author: users[0],
    published_at: '2024-05-06T09:00:00Z',
    tags: [tags[3], tags[0]],
    categories: [categories[1]],
    like_count: 450,
    comment_count: 45,
    view_count: 12050,
    data: {
      url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ', // A placeholder video
    },
  },
  {
    id: '6',
    slug: 'lofi-beats-to-relax',
    title: 'Lofi Beats to Relax/Study to',
    type: 'audio',
    excerpt: 'A curated playlist of lofi hip hop beats perfect for focusing, studying, or just chilling out.',
    author: users[1],
    published_at: '2024-05-05T20:00:00Z',
    tags: [tags[4]],
    categories: [categories[1]],
    like_count: 620,
    comment_count: 75,
    view_count: 25000,
    data: {
      url: 'https://soundcloud.com/stream', // Placeholder, not a real track
    },
  },
  {
    id: '7',
    slug: 'project-design-assets',
    title: 'Project Design Assets',
    type: 'uploader',
    excerpt: 'Download the complete asset pack for our latest design project, including icons, fonts, and mockups.',
    author: users[0],
    published_at: '2024-05-04T14:15:00Z',
    tags: [tags[2]],
    categories: [categories[0]],
    like_count: 88,
    comment_count: 5,
    view_count: 1500,
    data: {
      files: [
        { name: 'Icon_Set.zip', url: '#', size: '2.5 MB' },
        { name: 'Brand_Guidelines.pdf', url: '#', size: '1.2 MB' },
        { name: 'Web_Mockups.fig', url: '#', size: '15.8 MB' },
      ],
    },
  },
    {
    id: '8',
    slug: 'a-journey-through-the-alps',
    title: 'A Journey Through the Alps',
    type: 'photo',
    excerpt: 'Discover the majestic beauty of the Alps in this stunning photo series.',
    author: users[1],
    published_at: '2024-05-03T11:00:00Z',
    tags: [tags[3]],
    categories: [categories[1]],
    like_count: 412,
    comment_count: 34,
    view_count: 7800,
    data: {
      imageUrl: 'https://picsum.photos/1200/800?random=3',
      caption: 'Sun-kissed peaks and lush green valleys.',
    },
  },
  {
    id: '9',
    slug: 'the-art-of-minimalism',
    title: 'The Art of Minimalism in Web Design',
    type: 'text',
    content: `
Minimalism isn't just an aesthetic; it's a principle. In web design, it means stripping away the superfluous to focus on the essential. This enhances usability and clarity.

Here is an example of a minimal component in React:
\`\`\`jsx
const MinimalButton = ({ children }) => (
  <button style={{ padding: '10px 20px', border: '1px solid black', background: 'white' }}>
    {children}
  </button>
);
\`\`\`
By embracing whitespace and a limited color palette, we create interfaces that are not only beautiful but also highly effective.
`,
    excerpt: 'Exploring the principles of minimalist web design and how "less is more" can lead to better user experiences.',
    author: users[0],
    published_at: '2024-05-02T09:20:00Z',
    tags: [tags[2], tags[4]],
    categories: [categories[2]],
    like_count: 199,
    comment_count: 21,
    view_count: 3500,
    data: {},
  },
];

export const comments: Comment[] = [
    { id: '1', author: users[1], content: 'This is a fantastic guide, really helped me understand the basics!', createdAt: '2024-05-10T11:00:00Z'},
    { id: '2', author: users[0], content: 'Beautiful photos! Where was the first one taken?', createdAt: '2024-05-09T16:00:00Z'},
    { id: '3', author: users[1], content: 'Profound words. Makes you think.', createdAt: '2024-05-08T13:00:00Z'},
];
