import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import HeroBlock from '@/components/HeroBlock'

// Minimal shim for next/image in tests
vi.mock('next/image', () => ({
  default: (props: { alt: string; src: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={props.alt} src={props.src} />
  }
}))

describe('HeroBlock', () => {
  it('renders headline, subheadline and image alt text', () => {
    render(
      <HeroBlock
        eyebrow="Top"
        headline="Hello"
        subheadline="World"
        imageUrl="https://cdn.sanity.io/images/demo/project/abc123.jpg"
        alt="Hero Alt"
      />
    )

    expect(screen.getByRole('heading', { name: 'Hello' })).toBeInTheDocument()
    expect(screen.getByText('World')).toBeInTheDocument()
    expect(screen.getByAltText('Hero Alt')).toBeInTheDocument()
  })
})
