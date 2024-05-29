export default function (
  el: HTMLElement,
  accentColor: string,
  upperElement?: boolean,
  paintSpeed = 1,
  negativeOffset = 0
): void {
  const p = document.createElement('p')
  const text = el.textContent?.split('')
  const startChangerOffset = upperElement
    ? 0
    : el.offsetTop -
      (window.innerHeight - el.offsetHeight) +
      window.innerHeight / 100

  if (text) {
    for (const symbol of text) {
      const span = document.createElement('span')
      span.classList.add('color-transition')
      span.textContent = symbol
      p.append(span)
    }
  }

  el.textContent = ''
  el.append(p)

  paint()

  window.addEventListener('scroll', () => {
    paint()
  })

  function paint () {
    const scrollPercent =
      ((window.scrollY - startChangerOffset) /
        (window.innerHeight / 2)) *
      100 *
      paintSpeed - negativeOffset
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
  }
}
