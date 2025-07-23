import App from './App.js'

new App()

const scrollBtn = document.getElementById('scroll-to-top-btn')

// 최상단으로 부드러운 스크롤
scrollBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

