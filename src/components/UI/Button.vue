<template>
    <button class="btn-default">
        <slot />
    </button>
</template>

<style lang="scss" scoped>
.btn-default {
    padding: 25px 120px;
    border-radius: 50px;
    cursor: pointer;
    border: none;
    font-size: 30px;
    color: #fff;
    background-color: $colorAccentBlue;
    transform: translateY(0);
    transition: transform 0.5s ease-in-out;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;

    &:hover {
        transform: translateY(-20px);
    }
}
</style>