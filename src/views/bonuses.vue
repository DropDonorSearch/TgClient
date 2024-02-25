<template>
  <div>
    <div
        class="flex flex-column gap-2"
        ref="scrollComponent"
    >
      <bonus-card v-for="bonus in bonuses" key="bonus.id" :card-data="bonus"/>
    </div>
  </div>
</template>

<script>

import Spinner from "@/components/spinner.vue";
import BonusCard from "@/components/bonus-card.vue";


export default {
  components: {BonusCard, Spinner},
  data() {
    return {
      bonuses: [
        {
          id: 1,
          name: "OZON",
          description: "Промокод на 1000 баллов OZON!",
          partnerLogo: "https://upload.wikimedia.org/wikipedia/ru/e/ec/OZON_2019.svg",
          promo: '77dac325-c3c1-4782-b596-0f365d0602f1',
          img: "https://ir.ozone.ru/s3/cms/a6/t2d/wc200/doodle.png",
        },
        {
          id: 2,
          name: "ВкусВилл",
          description: "Кешбек 50% на первую покупку.",
          partnerLogo: "https://upload.wikimedia.org/wikipedia/commons/4/40/Vkusvill_textlogo_2021.svg",
          promo: '2375a70d-82f2-438c-91cf-0912238b0515',
          img: "https://spb.vkusvill.ru/local/templates/main-responsive/img/prods6/img-6-prods-label.svg",
        },
        {
          id: 3,
          name: "Дарим Добро",
          description: "6000 баллов на добрые дела",
          partnerLogo: "https://static.tildacdn.com/tild3163-3561-4837-b037-646430303961/photo.svg",
          promo: '7548b795-11ac-4bea-919e-ee82129e3182',
          img: "https://optim.tildacdn.com/tild3431-6132-4131-b063-336435323135/-/resize/590x/-/format/webp/photo.png",
        },
        {
          id: 4,
          name: "KINOPOISK",
          description: "30 дней подписки за 1 рубль",
          partnerLogo: "https://yastatic.net/s3/kinopoisk-frontend/special-static-www/release-723/dist/branding/dist/static/images/icons/icon-kp.png",
          promo: 'e7a35f21-14e3-4112-869c-cd9568cb4909',
          img: "https://optim.tildacdn.com/tild3431-6132-4131-b063-336435323135/-/resize/590x/-/format/webp/photo.png",
        },
      ],
    };
  },
};
</script>