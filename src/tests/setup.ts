import "@testing-library/jest-dom"
import { vi } from "vitest"

// -----------------------------
// IntersectionObserver
// -----------------------------
class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
})

Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
})

// -----------------------------
// ResizeObserver
// -----------------------------
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  configurable: true,
  value: ResizeObserverMock,
})

// -----------------------------
// matchMedia
// -----------------------------
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// -----------------------------
// scrollTo
// -----------------------------
window.scrollTo = vi.fn()

// -----------------------------
// requestAnimationFrame
// -----------------------------
global.requestAnimationFrame = (cb: FrameRequestCallback) => {
  return setTimeout(cb, 0)
}

global.cancelAnimationFrame = (id: number) => {
  clearTimeout(id)
}