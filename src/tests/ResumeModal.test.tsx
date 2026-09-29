import { describe, expect, test, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { ResumeModal } from "@/components/ResumeModal"

describe("ResumeModal", () => {
  test("does not render when closed", () => {
    render(<ResumeModal open={false} onClose={vi.fn()} />)

    expect(
      screen.queryByText(/Resume Preview/i)
    ).not.toBeInTheDocument()
  })

  test("renders when open", () => {
    render(<ResumeModal open={true} onClose={vi.fn()} />)

    expect(
      screen.getByText(/Resume Preview/i)
    ).toBeInTheDocument()
  })

  test("shows Download Resume button", () => {
    render(<ResumeModal open={true} onClose={vi.fn()} />)

    expect(
      screen.getByRole("link", {
        name: /download resume/i,
      })
    ).toBeInTheDocument()
  })

  test("calls onClose when Escape is pressed", () => {
    const onClose = vi.fn()

    render(<ResumeModal open={true} onClose={onClose} />)

    fireEvent.keyDown(window, {
      key: "Escape",
    })

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test("calls onClose when backdrop is clicked", () => {
    const onClose = vi.fn()

    render(<ResumeModal open={true} onClose={onClose} />)

    fireEvent.click(screen.getByTestId("resume-modal"))

    expect(onClose).toHaveBeenCalled()
  })

  test("closes when close button is clicked", () => {
  const onClose = vi.fn()

  render(<ResumeModal open={true} onClose={onClose} />)

  fireEvent.click(
    screen.getByRole("button", {
      name: /close resume modal/i,
    })
  )

  expect(onClose).toHaveBeenCalledTimes(1)
})

})