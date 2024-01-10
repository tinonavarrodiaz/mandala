export const access = ()=>{
  sessionStorage.setItem('access', 'true')
  location = "./"
}
export const accessibilitySide = (accessibilityElement)=> {
  const rightButton = accessibilityElement.querySelector('#right-place')
  rightButton.addEventListener('click', e=>{
    accessibilityElement.classList.toggle('right')
  })
}

