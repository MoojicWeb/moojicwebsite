import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'moojic-content',
  title: 'Moojic Content',
  projectId: 'oudkj47x',
  dataset: 'production',
  basePath: '/',
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) => S.list().title('Moojic content').items([
        S.documentTypeListItem('blogPost').title('Blog posts'),
        S.listItem()
          .title('Page SEO')
          .id('pageSeoSettings')
          .child(S.document().schemaType('pageSeoSettings').documentId('pageSeoSettings')),
      ]),
    }),
  ],
});
