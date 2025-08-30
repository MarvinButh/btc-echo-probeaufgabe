/* eslint-disable @typescript-eslint/no-explicit-any */

import {sanity} from '@/lib/sanity'
import {pageBySlug, allSlugs} from '@/lib/queries'
import {PortableText} from '@portabletext/react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
 

export async function generateStaticParams() {
    const slugs: string[] = await sanity.fetch(allSlugs)
    return slugs.map((slug) => ({ slug }))
}


export const revalidate = 60 // ISR


export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const data: any = await sanity.fetch(pageBySlug, { slug: params.slug })
    if (!data) return {}
    return {
        title: data?.seo?.title ?? data?.title ?? undefined,
        description: data?.seo?.description ?? undefined,
    }
}


type PageData = {
    title?: string
    slug?: string
    hero?: { eyebrow?: string; headline?: string; subheadline?: string; image?: { asset?: { url?: string } }; alt?: string; buttonHref?: string; buttonLabel?: string }
    content?: any[]
    seo?: { title?: string; description?: string }
    cta?: { text?: string; url?: string }
    faq?: Array<{ question: string; answer: any[] }>
    banner?: { text?: string; link?: string; variant?: 'info' | 'promo' | 'warning' }
}


export default async function Page({ params }: { params: { slug: string } }) {
    const data = (await sanity.fetch(pageBySlug, { slug: params.slug })) as PageData | null
    if (!data) return notFound()

    const { title, hero, content, cta, faq, banner } = data

    const components = {
        types: {
            image: ({ value }: any) => {
                const url: string | undefined = value?.asset?.url
                const alt: string | undefined = value?.alt
                if (!url) return null
                return (
                    <div className="my-6 rounded-md overflow-hidden bg-white/5 border border-neutral-700">
                        <div className="relative w-full aspect-[16/9]">
                            <Image src={url} alt={alt ?? title ?? 'Image'} fill sizes="100%" className="object-cover" />
                        </div>
                    </div>
                )
            },
            featureGridSection: ({ value }: any) => {
                const items = value?.items ?? []
                if (!Array.isArray(items) || items.length === 0) return null
                const isStats = items.length >= 3 && items.every((it: any) => it.number !== undefined || it.stat !== undefined)
                const isTeam = items.length > 0 && !!items[0]?.image

                return (
                    <section className="mt-12">
                        <div className="mx-auto max-w-6xl px-0 md:px-6">
                            {isStats ? (
                                <div className="bg-neutral-800 rounded-lg p-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center border border-neutral-700">
                                    {items.map((it: any, idx: number) => (
                                        <div key={idx}>
                                            <div className="text-4xl md:text-5xl font-extrabold text-white">{String(it.number ?? it.stat ?? '')}</div>
                                            {it.label && <div className="mt-2 text-neutral-300">{String(it.label)}</div>}
                                        </div>
                                    ))}
                                </div>
                            ) : isTeam ? (
                                <div className="grid gap-8 md:grid-cols-3">
                                    {items.map((member: any, idx: number) => (
                                        <div key={idx} className="bg-white/5 rounded-lg p-6 text-center border border-neutral-700">
                                            <div className="w-40 h-40 mx-auto rounded-full overflow-hidden bg-white shadow-lg">
                                                {member.image ? (
                                                    <Image
                                                        src={member.image?.asset?.url ?? member.image?.url ?? ''}
                                                        alt={String(member.headline ?? member.name ?? 'Team member')}
                                                        width={320}
                                                        height={320}
                                                        className="object-cover w-full h-full"
                                                    />
                                                ) : null}
                                            </div>
                                            <div className="mt-6 text-white/90 font-semibold">{String(member.headline ?? member.name ?? '')}</div>
                                            {member.role && <div className="mt-2 text-neutral-400">{String(member.role)}</div>}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid gap-6 md:grid-cols-3">
                                    {items?.map((item: any, idx: number) => (
                                        <div key={idx} className="p-6 border border-neutral-700 rounded-lg bg-neutral-800 text-neutral-100">
                                            {item.icon && <div className="mb-3">{/* icon placeholder */}</div>}
                                            {item.headline && <h3 className="font-semibold text-white">{String(item.headline)}</h3>}
                                            {item.text && <p className="mt-2 text-neutral-300">{String(item.text)}</p>}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                )
            },
            ctaSection: ({ value }: any) => {
                if (!value?.text && !value?.headline) return null
                return (
                    <section className="mt-12">
                        <div className="mx-auto max-w-6xl px-6">
                            <div className="bg-neutral-800 rounded-lg p-10 flex flex-col md:flex-row items-center justify-between gap-4 border border-neutral-700">
                                <div>
                                    {value.headline && <h3 className="text-xl font-semibold text-white">{String(value.headline)}</h3>}
                                    {value.text && <p className="mt-2 text-neutral-300">{String(value.text)}</p>}
                                </div>
                                {value.buttonHref && (
                                    <a href={String(value.buttonHref)} className="inline-block bg-amber-500 text-neutral-900 px-6 py-3 rounded-md font-medium">{String(value.buttonLabel ?? 'Mehr erfahren')}</a>
                                )}
                            </div>
                        </div>
                    </section>
                )
            },
        },
    }

    function Banner() {
        if (!banner?.text) return null
        const variant = banner.variant ?? 'info'
        const styles: Record<string, string> = {
            info: 'bg-blue-900/40 border-blue-700 text-blue-100',
            promo: 'bg-amber-900/30 border-amber-700 text-amber-100',
            warning: 'bg-red-900/30 border-red-700 text-red-100',
        }
        return (
            <div className={`rounded-md border px-4 py-3 ${styles[variant]}`}>
                <div className="flex items-center justify-between gap-4">
                    <p>{banner.text}</p>
                    {banner.link && (
                        <a href={banner.link} className="underline font-medium">Mehr</a>
                    )}
                </div>
            </div>
        )
    }

    function CTA() {
        if (!cta?.text || !cta?.url) return null
        return (
            <div className="mt-12 text-center">
                <a href={cta.url} className="inline-block bg-amber-500 text-neutral-900 px-6 py-3 rounded-md shadow-md font-medium">
                    {cta.text}
                </a>
            </div>
        )
    }

    function FAQ() {
        if (!faq?.length) return null
        return (
            <section className="mt-12">
                <div className="mx-auto max-w-3xl px-6 text-center">
                    <h2 className="text-2xl font-semibold text-white">FAQ</h2>
                    <div className="mt-6 space-y-6">
                        {faq.map((item, idx) => (
                            <div key={idx} className="bg-neutral-800 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-white">{item.question}</h3>
                                <div className="prose prose-invert max-w-none mt-2 text-neutral-200">
                                    <PortableText value={item.answer as any} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    function SectionHeader({ title }: { title?: string }) {
        if (!title) return null
        return (
            <div className="mx-auto max-w-6xl px-6 flex items-center gap-6 pt-2 pb-6">
                <div className="flex-1 h-px bg-neutral-700" />
                <h2 className="text-2xl md:text-3xl font-semibold text-white text-center whitespace-nowrap">{title}</h2>
                <div className="flex-1 h-px bg-neutral-700" />
            </div>
        )
    }

    // New reusable HeroBlock component and use it
    function HeroBlock({ hero, title }: { hero?: PageData['hero']; title?: string }) {
        if (!hero) return null
        const imageUrl = hero.image?.asset?.url
        return (
            <header className="text-center">
                <div className="mx-auto max-w-4xl px-4">
                    {hero.eyebrow && <div className="text-sm text-amber-300 mb-2">{hero.eyebrow}</div>}
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
                        {hero.headline ?? title ?? 'BTC-ECHO - Bitcoin & Blockchain seit 2014'}
                    </h1>
                    {hero.subheadline && (
                        <p className="mt-4 text-base md:text-lg text-neutral-300">{hero.subheadline}</p>
                    )}
                </div>

                {imageUrl && (
                    <div className="mt-8 mx-auto w-full max-w-4xl rounded-md overflow-hidden bg-white/5 border border-neutral-200">
                        {/* Use fixed width/height with responsive class to avoid full-screen cover */}
                        <Image
                            src={String(imageUrl)}
                            alt={String(hero.alt ?? hero.headline ?? title ?? 'Hero image')}
                            width={1200}
                            height={450}
                            className="object-cover w-full h-auto"
                            sizes="(min-width: 1024px) 1000px, 100vw"
                        />
                    </div>
                )}
            </header>
        )
    }

    return (
        <main className="min-h-screen bg-neutral-900 text-neutral-100">
            <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
                {/* Central styled page container */}
                <div className="mx-auto max-w-6xl bg-neutral-800/80 rounded-xl p-8 md:p-10 shadow-lg border border-neutral-700 space-y-8">

                    {banner ? <Banner /> : null}

                    {/* Use the new HeroBlock component */}
                    {hero ? <HeroBlock hero={hero} title={title} /> : null}

                    {content?.length ? (
                        <section className="text-center">
                            <div className="prose prose-invert mx-auto max-w-3xl text-neutral-200">
                                <PortableText value={content as any} components={components as any} />
                            </div>
                        </section>
                    ) : null}

                    {/* Optional sections driven by content models */}
                    {Array.isArray(content) && content.some((b: any) => b._type === 'featureGridSection') && (
                        <section>
                            <SectionHeader title="Führende Unternehmen die uns vertrauen" />
                        </section>
                    )}

                    <CTA />
                    <SectionHeader title="So findest du uns" />
                    <FAQ />

                </div>
            </div>
        </main>
    )
}