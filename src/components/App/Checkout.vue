<script setup lang="ts">
import { loadStripe } from "@stripe/stripe-js";
import type { StripeError } from "@stripe/stripe-js";

const props = defineProps<{
  amount: number;
  currency: string;
}>();

const { makeProjectsPayment } = usePublicData();

const emit = defineEmits<{
  (e: "loading", value: boolean): void;
  (e: "error", value: StripeError | unknown): void;
}>();

const form = ref<HTMLFormElement>();
const errorElement = ref<HTMLDivElement>();

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

  const elements = stripe.elements({
    clientSecret,
  });

  const element = elements.create("payment");

  element.mount("#stripe-payment-element-mount-point");

  form.addEventListener("submit", async (event: Event) => {
    event.preventDefault();
    emit("loading", true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:8080/success", // success url
        },
        redirect: "always",
      });

      if (error) {
        errorElement.value.textContent ??= error.message;
        emit("error", error);

        return;
      }
    } catch (error: StripeError | unknown) {
      console.error(error);
      emit("error", error);
    } finally {
      emit("loading", false);
    }
  });
});
</script>

<template>
  <form id="stripe-payment-element-form" ref="form">
    <div id="stripe-payment-element-mount-point" />
    <slot name="stripe-payment-element-errors">
      <div id="stripe-payment-element-errors" role="alert" />
    </slot>
    <UIButton class="button">Pay</UIButton>
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
