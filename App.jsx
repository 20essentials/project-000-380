import React, { useEffect, useRef, StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { css, globalCss } from "@pandacss/react"

const globalStyles = globalCss({
  "*, *::after, *::before": {
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
    fontFamily:
      "sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue'",
  },
  a: {
    WebkitTapHighlightColor: "transparent",
  },
  html: {
    scrollBehavior: "smooth",
    scrollbarWidth: "thin",
    scrollbarColor: "white transparent",
  },
  body: {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    placeContent: "center",
    overflow: "hidden",
    position: "relative",
    _before: {
      content: "''",
      position: "fixed",
      inset: 0,
      backgroundImage: "url('assets/texture.svg')",
      backgroundSize: "200px",
      opacity: 0.4,
      pointerEvents: "none",
    },
  },
})

const containerLetters = css({
  width: "220px",
  height: "220px",
  position: "relative",
  backgroundColor: "#fff4",
  borderRadius: "50%",
  transform: "scale(0.8)",
})

const letterStyle = css({
  position: "absolute",
  backgroundColor: "transparent",
  color: "blue",
  fontWeight: "bold",
  textTransform: "uppercase",
  userSelect: "none",
})

function App() {
  const lettersRef = useRef([])
  const containerRef = useRef(null)

  useEffect(() => {
    globalStyles()
    const container = containerRef.current
    const message = "Code is magic where ideas become reality through pure logic"
    const n_letters = message.length
    let angle = -Math.PI
    const increase = (Math.PI * 2) / n_letters
    const letters = []

    for (let i = 0; i < n_letters; i++) {
      const div = document.createElement("div")
      div.className = letterStyle()
      div.style.width = "150px"
      div.style.height = "150px"
      div.textContent = message.charAt(i)
      container.appendChild(div)
      letters.push({
        el: div,
        width: 150,
        height: 150,
        setRotate(deg) {
          this.el.style.transform = `rotate(${deg}deg)`
        },
        setPosition(x, y) {
          const offsetLeft = this.width / 2
          const offsetTop = this.height / 2
          this.el.style.left = x - offsetLeft + "px"
          this.el.style.top = y - offsetTop + "px"
        },
      })
    }

    lettersRef.current = letters

    const rotateLetter = () => {
      const rx = 100 * Math.cos(angle) + 110
      const ry = 100 * Math.sin(angle) + 110

      for (let i = 0; i < n_letters; i++) {
        const x = 80 * Math.cos(angle) + rx
        const y = 80 * Math.sin(angle) + ry
        const deg = (Math.atan2(y - ry, x - rx) * 180) / Math.PI + 90
        letters[i].setRotate(deg)
        letters[i].setPosition(x, y)
        angle += increase
      }
      angle += 0.04
    }

    const interval = setInterval(rotateLetter, 30)
    return () => {
      clearInterval(interval)
      letters.forEach(({ el }) => container.removeChild(el))
    }
  }, [])

  return <main ref={containerRef} className={containerLetters()} />
}

const rootDiv = document.createElement("div")
document.body.appendChild(rootDiv)

createRoot(rootDiv).render(
  <StrictMode>
    <App />
  </StrictMode>
)
