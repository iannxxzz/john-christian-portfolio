import { describe, expect, test } from "vitest"
import { render, screen } from "@testing-library/react"
import { Hero } from "../components/Hero"

describe("Hero Component", () => {
  test("renders the introduction badge", () => {
    render(<Hero />)

    expect(screen.getByText(/Introduction/i)).toBeInTheDocument()
  })

  test("shows the View Resume button", () => {
    render(<Hero />)

    expect(
      screen.getByRole("button", {
        name: /view resume/i,
      })
    ).toBeInTheDocument()
  })

  test("shows the My Projects link", () => {
    render(<Hero />)

    expect(
      screen.getByRole("link", {
        name: /my projects/i,
      })
    ).toBeInTheDocument()
  })
})