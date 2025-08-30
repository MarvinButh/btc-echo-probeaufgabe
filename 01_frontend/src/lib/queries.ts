import {groq} from 'next-sanity'
export const allSlugs = groq`*[_type == "page" && defined(slug.current)].slug.current`
export const pageBySlug = groq`
*[_type == "page" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  hero{
    eyebrow,
    headline,
    subheadline,
    image{ asset->{ url } },
    alt
  },
  content[]{
    ...,
    _type == 'image' => {
      ...,
      asset->{ url },
      alt
    }
  },
  seo{ title, description },
  cta{ text, url },
  faq[]{ question, answer },
  banner{ text, link, variant },
  updatedAt
}
`