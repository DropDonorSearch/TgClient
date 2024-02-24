<template>
  <div>
    <div
        class="flex flex-column gap-2"
        ref="scrollComponent"
    >
      <BonusCard v-for="bonus in bonuses" key="bonus.id" :card-data="bonus"/>
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
          img: "https://ir.ozone.ru/s3/cms/a6/t2d/wc200/doodle.png",
        },
        {
          id: 2,
          name: "ВкусВилл",
          description: "Кешбек 50% рублей для первой покупки.",
          partnerLogo: "https://upload.wikimedia.org/wikipedia/commons/4/40/Vkusvill_textlogo_2021.svg",
          img: "https://spb.vkusvill.ru/local/templates/main-responsive/img/prods6/img-6-prods-label.svg",
        },
        {
          id: 3,
          name: "Дарим Добро",
          description: "6000 баллов на добрые дела",
          partnerLogo: "https://static.tildacdn.com/tild3163-3561-4837-b037-646430303961/photo.svg",
          img: "https://optim.tildacdn.com/tild3431-6132-4131-b063-336435323135/-/resize/590x/-/format/webp/photo.png",
        },
      ],
    };
  },
};
</script>