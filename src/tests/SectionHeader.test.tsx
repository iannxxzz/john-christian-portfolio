import { describe, expect, test } from "vitest"
import { render, screen } from "@testing-library/react"

import { SectionHeader } from "@/components/SectionHeader"
describe("SectionHeader", () => {
  test("renders the heading", () => {
    render(
      <SectionHeader
        title="My Projects"
        subtitle="Projects"
      />
    )

    expect(
      screen.getByRole("heading", {
        name: /my projects/i,
      })
    ).toBeInTheDocument()
  })

  test("renders the subtitle", () => {
    render(
      <SectionHeader
        title="Contact Me"
        subtitle="Contact"
      />
    )

    expect(
      screen.getByText(/^Contact$/)
    ).toBeInTheDocument()
  })
})