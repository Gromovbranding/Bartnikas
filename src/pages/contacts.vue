<template>
  <main>
    <Title> Contacts </Title>
    <AppPageHead title="Contacts" />
    <section class="contacts">
      <div>
        <img
          src="https://static.tildacdn.com/tild3732-6663-4065-b837-366432646264/Contact.jpg"
          alt=""
        />
      </div>
      <div>
        <p>Stas Bartnikas resides in Moscow, Russia</p>
        <div>
          <p>
            Press inquiry <a href="mailto:sb@stasbart.com">sb@stasbart.com</a>
          </p>
          <p>
            Gallery representation
            <a href="mailto:sb@stasbart.com">sb@stasbart.com</a>
          </p>
        </div>
        <h3>
          For corporate or personal purchase of prints please contact us through
          the form
        </h3>
        <form @submit.prevent>
          <div>
            <label for=""> Your Name </label>
            <UIInput placeholder="John Smith" />
          </div>
          <div>
            <label for=""> Your email </label>
            <UIInput type="email" placeholder="mail@example.com" />
          </div>
          <div>
            <label for=""> Comment </label>
            <UIInput placeholder="Comment text" />
          </div>
          <UIButton style="width: 100%"> Submit </UIButton>
        </form>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.contacts {
  background-color: $colorBackgroundGrey;
  display: flex;
  > div {
    &:first-child {
      max-width: 990px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: $borderRadiusMain;
      }
    }

    &:last-child {
      max-width: 580px;
      margin-left: 90px;
      padding-top: 40px;
      padding-bottom: 40px;

      > div {
        margin-top: 30px;
        margin-bottom: 60px;
      }

      h3 {
        font-size: 34px;
        font-weight: bold;
        margin-bottom: 30px;
        line-height: 1.6;
      }

      p {
        font-size: 26px;
        font-weight: 400;
        line-height: 1.55;
      }

      form {
        > div {
          margin-bottom: 40px;

          label {
            font-size: 24px;
            font-weight: 400;
            margin-bottom: 10px;
            display: block;
          }
        }
      }
    }
  }
}
</style>
