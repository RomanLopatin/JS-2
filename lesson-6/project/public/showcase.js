const showcase = Vue.component('showcase',
    {
        template: `
        <div class="goods-list">
            <card v-for="item of list" :good="item" :action_name="'Купить'" v-on:cardButtonPushed="addToCart">
            </card>
        </div>
        `,
        props: ['list'],
        methods: {
            addToCart(card_id) {
                this.$emit('showcase-card-button-pushed', card_id);
            }

        }
    }
)
