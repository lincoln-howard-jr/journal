export const scrollToTop = (offset=0) => setTimeout (() => {
  window.scrollBy ({
    left: 0,
    top: -window.scrollY,
    behavior: 'smooth'
  })
}, offset);

export const runScroll = (top=2 * window.innerHeight / 3, offset=100) => setTimeout (() => {
  window.scrollTo ({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  });
}, offset);