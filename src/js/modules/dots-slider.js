export const dotsSlider = (dots) =>{
  // console.log(dots.length)
  if (dots.length > 0) {
    const total = dots.length
    setInterval(() => {
      let indexActive = dots.findIndex(el => el.classList.contains('active'))
      dots.map(el => el.classList.remove('active'))
      if (indexActive + 1 < total) {
        dots[indexActive + 1].classList.add('active')
      } else {
        dots[0].classList.add('active')
      }
    }, 5500)
  }
}
