<script setup lang="ts">
import { loadStripe } from "@stripe/stripe-js";
import type { Stripe, StripeError } from "@stripe/stripe-js";

const props = defineProps<{
  amount: number;
  currency: string;
}>();

const { makeProjectsPayment } = usePublicData();
const route = useRoute();

const emit = defineEmits<{
  (e: "loading", value: boolean): void;
  (e: "error", value: StripeError | unknown): void;
}>();

const form = ref<HTMLFormElement>();
const errorElement = ref<HTMLDivElement>();

const checkStatus = async (stripe: Stripe) => {
  const clientSecret = route.query.payment_intent_client_secret as string;

  if (!clientSecret) {
    return;
  }

  const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

  switch (paymentIntent?.status) {
    case "succeeded":
      console.log("Payment succeeded!");
      break;
    case "processing":
      console.log("Your payment is processing.");
      break;
    case "requires_payment_method":
      console.log("Your payment was not successful, please try again.");
      break;
    default:
      console.log("Something went wrong.");
      break;
  }
};

onMounted(async () => {
  const clientSecret = await makeProjectsPayment({
    amount: props.amount,
    currency: props.currency,
  });

  const stripe = (await loadStripe(
    "pk_test_aTwQx8JI4Z4frDaV5ZqTR2kP00TZmNRg9A",
    {
      apiVersion: "2022-11-15",
    }
  ))!;

  await checkStatus(stripe);

  const elements = stripe.elements({
    appearance: {
      theme: "flat",
    },
    clientSecret,
  });

  const element = elements.create("payment", {
    layout: "auto",
  });

  element.mount("#stripe-payment-element-mount-point");

  (form.value as HTMLFormElement).addEventListener(
    "submit",
    async (event: Event) => {
      event.preventDefault();
      emit("loading", true);

      try {
        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: new URL(route.path, window.location.origin).toString(), // success url
          },
          redirect: "always",
        });

        if (error) {
          (errorElement.value as HTMLDivElement).textContent =
            error.message as string;
          ElMessage.error({
            message: error.message,
          });
          emit("error", error);
        }
      } catch (error: StripeError | unknown) {
        console.error(error);
        emit("error", error);
      } finally {
        emit("loading", false);
      }
    }
  );
});
</script>

<template>
  <form id="stripe-payment-element-form" ref="form">
    <div id="stripe-payment-element-mount-point" />
    <slot name="stripe-payment-element-errors">
      <div id="stripe-payment-element-errors" ref="errorElement" role="alert" />
    </slot>
    <UIButton style="width: 100%" class="button">Pay</UIButton>
  </form>
</template>

<style lang="scss" scoped>
.button {
  margin-top: 2rem;
  padding: 1rem 3rem;
  &:hover {
    transform: translateY(-25%);
  }
}
</style>
