import smoothscroll from '../packages/smoothscroll'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    smoothscroll({
      animationTime: 800,
      stepSize: 75,
      accelerationDelta: 30,
      accelerationMax: 2
    })
  })
})
