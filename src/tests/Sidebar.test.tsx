import { describe, expect, test } from "vitest"
import { render, screen } from "@testing-library/react"

import { Sidebar } from "@/components/Sidebar"
import { navLinks, socialLinks } from "@/constants"

describe("Sidebar", () => {
  test("renders the menu button", () => {
    render(<Sidebar />)

    expect(
      screen.getByRole("button", {
        name: /open menu/i,
      })
    ).toBeInTheDocument()
  })

  test("opens the sidebar", async () => {
    render(<Sidebar />)

    const button = screen.getByRole("button", {
      name: /open menu/i,
    })

    await button.click()

    expect(
      screen.getByText(/menu/i)
    ).toBeInTheDocument()
  })

  test("renders all navigation links", async () => {
    render(<Sidebar />)

    await screen.getByRole("button", {
      name: /open menu/i,
    }).click()

    navLinks.forEach((link) => {
      expect(
        screen.getByRole("link", {
          name: link.label,
        })
      ).toBeInTheDocument()
    })
  })

  test("renders all social links", async () => {
    render(<Sidebar />)

    await screen.getByRole("button", {
      name: /open menu/i,
    }).click()

    socialLinks.forEach((social) => {
      expect(
        screen.getByRole("link", {
          name: social.label,
        })
      ).toBeInTheDocument()
    })
  })
})