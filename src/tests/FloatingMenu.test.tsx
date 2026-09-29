import { describe, expect, test } from "vitest"
import { render, screen } from "@testing-library/react"

import { FloatingMenu } from "@/components/FloatingMenu"
import { navLinks } from "@/constants"

describe("FloatingMenu", () => {
  test("renders the navigation", () => {
    render(<FloatingMenu />)

    expect(
      screen.getByRole("navigation", {
        name: /floating navigation/i,
      })
    ).toBeInTheDocument()
  })

  test("renders all navigation links", () => {
    render(<FloatingMenu />)

    navLinks.forEach((link) => {
      expect(
        screen.getByRole("link", {
          name: link.label,
        })
      ).toBeInTheDocument()
    })
  })
})