const cart = Vue.component('cart',
    {
        template: `
        <div class="modal">
            <button v-on:click="onClick">close</button>
            <div class="cart-list">
                <card v-for="item of list" :good="item" :action_name="'Удалить'" v-on:cardButtonPushed="deleteFromCart">
                </card>
            </div>
        </div>
        `,
        props: ['list'],
        methods: {
            onClick() {
                this.$emit('cart-close')
            },
            deleteFromCart(card_id) {
                this.$emit('cart-card-button-pushed', card_id);
            }
        }
    }
)

// : action - name="'Удалить'"