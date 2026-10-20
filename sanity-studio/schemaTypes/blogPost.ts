import { defineField, defineType } from 'sanity';

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required().max(100) }),
    defineField({ name: 'slug', title: 'URL slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: 'excerpt', title: 'Short summary', type: 'text', rows: 3, validation: (rule) => rule.required().max(300) }),
    defineField({ name: 'coverImage', title: 'Cover image', type: 'image', options: { hotspot: true }, validation: (rule) => rule.required() }),
    defineField({
      name: 'content', title: 'Article content', type: 'array', of: [
        {
          type: 'block', styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [{ title: 'Bullet', value: 'bullet' }, { title: 'Numbered', value: 'number' }],
          marks: { decorators: [{ title: 'Strong', value: 'strong' }, { title: 'Emphasis', value: 'em' }, { title: 'Underline', value: 'underline' }], annotations: [{ name: 'link', type: 'object', title: 'Link', fields: [{ name: 'href', type: 'url', title: 'URL' }] }] },
        },
        {
          type: 'image', options: { hotspot: true }, fields: [
            { name: 'alt', type: 'string', title: 'Alternative text', validation: (rule) => rule.required() },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        },
      ], validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: 'publishedAt', title: 'Publish date', type: 'date', options: { dateFormat: 'MMMM D, YYYY' }, initialValue: () => new Date().toISOString().slice(0, 10), validation: (rule) => rule.required() }),
    defineField({ name: 'featured', title: 'Feature this article', type: 'boolean', initialValue: false }),
    defineField({ name: 'seoTitle', title: 'SEO title (optional)', type: 'string', description: 'Leave blank to use the article title.', validation: (rule) => rule.max(65) }),
    defineField({ name: 'seoDescription', title: 'SEO description (optional)', type: 'text', rows: 2, description: 'Leave blank to use the short summary.', validation: (rule) => rule.max(160) }),
    defineField({ name: 'canonicalUrl', title: 'Canonical URL (optional)', type: 'url' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'publishedAt', media: 'coverImage' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ? `Publish date: ${subtitle}` : 'Draft', media };
    },
  },
  orderings: [{ title: 'Publish date, newest first', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
});
