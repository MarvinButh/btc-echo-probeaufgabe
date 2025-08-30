import {defineField, defineType} from 'sanity'


export default defineType({
name: 'page',
title: 'Page',
type: 'document',
fields: [
defineField({
name: 'title',
title: 'Title',
type: 'string',
validation: Rule => Rule.required()
}),

defineField({
name: 'slug',
title: 'Slug',
type: 'slug',
options: { source: 'title', maxLength: 96 },
validation: Rule => Rule.required()
}),

defineField({
name: 'hero',
title: 'Hero',
type: 'object',
fields: [
defineField({ name: 'image', title: 'Image', type: 'image', options: {hotspot: true}, validation: Rule => Rule.required() }),
defineField({ name: 'alt', title: 'Alt text', type: 'string', validation: Rule => Rule.required() }),
defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
defineField({ name: 'headline', title: 'Headline', type: 'string' }),
defineField({ name: 'subheadline', title: 'Subheadline', type: 'text' }),
]
}),

defineField({
name: 'content',
title: 'Content',
type: 'array',
of: [
{ type: 'block' },
{ type: 'image', fields: [ defineField({ name: 'alt', title: 'Alt text', type: 'string', validation: Rule => Rule.required() }) ] },
{ type: 'richTextSection' },
{ type: 'ctaSection' },
{ type: 'featureGridSection' },
]
}),

defineField({
name: 'seo',
title: 'SEO',
type: 'object',
fields: [
defineField({ name: 'title', title: 'Meta title', type: 'string' }),
defineField({ name: 'description', title: 'Meta description', type: 'text' }),
]
}),

defineField({
name: 'cta',
title: 'CTA',
type: 'object',
fields: [
defineField({ name: 'text', title: 'Text', type: 'string' }),
defineField({ name: 'url', title: 'URL', type: 'url' }),
]
}),

defineField({
name: 'hubspotForm',
title: 'HubSpot Form',
type: 'object',
options: { collapsible: true },
fields: [
defineField({ name: 'portalId', title: 'Portal ID', type: 'string' }),
defineField({ name: 'formId', title: 'Form ID', type: 'string' }),
defineField({ name: 'embedCode', title: 'Embed code', type: 'text' }),
]
}),

defineField({
name: 'faq',
title: 'FAQ',
type: 'array',
of: [
{
type: 'object',
fields: [
defineField({ name: 'question', title: 'Question', type: 'string', validation: Rule => Rule.required() }),
defineField({ name: 'answer', title: 'Answer', type: 'array', of: [{ type: 'block' }], validation: Rule => Rule.required() }),
]
}
]
}),

defineField({
name: 'banner',
title: 'Banner',
type: 'object',
fields: [
defineField({ name: 'text', title: 'Text', type: 'string' }),
defineField({ name: 'link', title: 'Link', type: 'url' }),
defineField({ name: 'variant', title: 'Variant', type: 'string', options: { list: ['info', 'promo', 'warning'] } }),
]
}),

defineField({ name: 'updatedAt', title: 'Updated at', type: 'datetime', readOnly: true, initialValue: () => new Date().toISOString() }),
],

preview: {
select: { title: 'title', subtitle: 'slug.current', media: 'hero.image' }
}
})