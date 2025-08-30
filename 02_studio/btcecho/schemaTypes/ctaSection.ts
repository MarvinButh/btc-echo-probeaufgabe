import {defineType} from 'sanity'
export default defineType({
name: 'ctaSection', title: 'CTA', type: 'object',
fields: [
{ name: 'headline', type: 'string' },
{ name: 'text', type: 'text' },
{ name: 'buttonLabel', type: 'string' },
{ name: 'buttonHref', type: 'url' },
]
})