import {defineType} from 'sanity'
export default defineType({
name: 'featureGridSection', title: 'Feature Grid', type: 'object',
fields: [
{ name: 'items', type: 'array', of: [{
type: 'object', fields: [
{name: 'title', type: 'string'},
{name: 'text', type: 'text'},
{name: 'icon', type: 'string'}
]
}]}
]
})