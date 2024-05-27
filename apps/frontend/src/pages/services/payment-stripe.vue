<script setup lang="ts">
import { loadStripe, type StripeElements } from '@stripe/stripe-js'

useHead({
  title: () => 'Stripe payment'
})

const cfg = useRuntimeConfig()

const DOMAIN = cfg.public.DOMAIN
const STRIPE_PUB_KEY = cfg.public.STRIPE_PUB_KEY

const route = useRoute()
const router = useRouter()

const isLoading = ref(false)

const stripe = (await loadStripe(STRIPE_PUB_KEY))!

let elements: StripeElements
let clientSecret: string | null = ''

async function handleSubmit (e: Event) {
  e.preventDefault()
  isLoading.value = true

  try {
    await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: DOMAIN
      }
    })
  } finally {
    isLoading.value = false
  }
}

const { fetchGet } = useApi()

onMounted(async () => {
  const orderId = route.query.order_id

  if (!orderId) {
    await router.push('/services')
    return
  }

  const { data: payment } = await useAsyncData<{ uuid: string }>(
    'purchase-stripe-photoportal',
    async () => await fetchGet(`/photoportal/stripe/get/${orderId}`)
  )

  clientSecret = payment.value!.uuid

  elements = stripe.elements({
    appearance: {
      theme: 'stripe'
    },
    clientSecret
  })

  const paymentElementOptions = {
    layout: 'tabs'
  }

  const paymentElement = elements.create('payment', paymentElementOptions)
  paymentElement.mount('#payment-element')
})
</script>

<template>
  <UIWhiteBgContainer>
    <form id="payment-form" @submit="handleSubmit">
      <div id="payment-element" />
      <button id="submit" :disabled="isLoading">
        <div id="spinner" :class="['spinner', { 'hidden': !isLoading }]" />
        <span id="button-text" :class="[{ 'hidden': isLoading }]">Pay now</span>
      </button>
      <div id="payment-message" class="hidden" />
    </form>
  </UIWhiteBgContainer>
</template>

<style lang="scss" scoped>
.hidden {
  display: none;
}

#payment-message {
  color: rgb(105, 115, 134);
  font-size: 16px;
  line-height: 20px;
  padding-top: 12px;
  text-align: center;
}

#payment-element {
  margin-bottom: 24px;
}

/* Buttons and links */
button {
  background: #5469d4;
  font-family: Arial, sans-serif;
  color: #ffffff;
  border-radius: 4px;
  border: 0;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: block;
  transition: all 0.2s ease;
  box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
  width: 100%;
}
button:hover {
  filter: contrast(115%);
}
button:disabled {
  opacity: 0.5;
  cursor: default;
}

/* spinner/processing state, errors */
.spinner,
.spinner:before,
.spinner:after {
  border-radius: 50%;
}
.spinner {
  color: #ffffff;
  font-size: 22px;
  text-indent: -99999px;
  margin: 0px auto;
  position: relative;
  width: 20px;
  height: 20px;
  box-shadow: inset 0 0 0 2px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.spinner:before,
.spinner:after {
  position: absolute;
  content: "";
}
.spinner:before {
  width: 10.4px;
  height: 20.4px;
  background: #5469d4;
  border-radius: 20.4px 0 0 20.4px;
  top: -0.2px;
  left: -0.2px;
  -webkit-transform-origin: 10.4px 10.2px;
  transform-origin: 10.4px 10.2px;
  -webkit-animation: loading 2s infinite ease 1.5s;
  animation: loading 2s infinite ease 1.5s;
}
.spinner:after {
  width: 10.4px;
  height: 10.2px;
  background: #5469d4;
  border-radius: 0 10.2px 10.2px 0;
  top: -0.1px;
  left: 10.2px;
  -webkit-transform-origin: 0px 10.2px;
  transform-origin: 0px 10.2px;
  -webkit-animation: loading 2s infinite ease;
  animation: loading 2s infinite ease;
}

@-webkit-keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@media only screen and (max-width: 600px) {
  form {
    width: 80vw;
    min-width: initial;
  }
}
</style>
