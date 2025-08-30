import Image from 'next/image'

export default function HeroBlock({
  eyebrow,
  headline,
  subheadline,
  imageUrl,
  alt,
  buttonHref,
  buttonLabel,
}: {
  eyebrow?: string
  headline?: string
  subheadline?: string
  imageUrl?: string
  alt?: string
  buttonHref?: string
  buttonLabel?: string
}) {
  return (
    <section className="bg-neutral-900/90 rounded-2xl p-6 md:p-12 shadow-2xl border border-neutral-700 max-w-5xl mx-auto">
      <div className="flex flex-col items-center text-center">
        {eyebrow && (
          <p className="text-sm uppercase tracking-wide text-amber-400 font-semibold">{eyebrow}</p>
        )}

        <h1 className="mt-4 text-3xl md:text-6xl font-extrabold leading-tight text-white max-w-4xl">
          {headline}
        </h1>

        {imageUrl && (
          <div className="w-full rounded-lg overflow-hidden bg-white/5 border border-neutral-700 my-8">
            <div className="relative w-full h-56 md:h-96">
              {/* <Image
                src={imageUrl}
                alt={alt ?? headline ?? 'Hero image'}
                fill
                sizes="100px"
                className="object-cover"
                priority
                unoptimized
              /> */}
            </div>
          </div>
        )}

        {subheadline && (
          <p className="mt-2 text-base md:text-lg text-neutral-300 leading-relaxed max-w-3xl">
            {subheadline}
          </p>
        )}

        {buttonHref && (
          <a
            href={buttonHref}
            className="mt-6 inline-block bg-amber-500 hover:bg-amber-400 text-neutral-900 px-6 py-3 rounded-md shadow-md font-medium"
          >
            {buttonLabel ?? 'Mehr erfahren'}
          </a>
        )}
      </div>
    </section>
  )
}
