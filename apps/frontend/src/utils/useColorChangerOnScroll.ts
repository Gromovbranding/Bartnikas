export default function (
  el: HTMLElement,
  accentColor: string
): void {
  const p = document.createElement('p')
  const text = el.textContent?.split('')
  const startChangerOffset = el.offsetTop - (window.innerHeight - el.offsetHeight)

  if (text) {
    for (const symbol of text) {
      const span = document.createElement('span')
      span.classList.add('color-transition')
      span.textContent = symbol
      p.append(span)
    }
  }

  window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY - startChangerOffset) / el.offsetHeight * 100
    const changingTextRange =
        (p.children.length / 100) * scrollPercent < 0
          ? 0
          : (p.children.length / 100) * scrollPercent

    for (let i = 0; i < p.children.length; i++) {
      const span = p.children[i] as HTMLElement
      if (i < changingTextRange) {
        span.style.color = accentColor
      } else {
        span.style.color = ''
      }
    }
  })

  el.textContent = ''
  el.append(p)
}
