const API_URL = 'http://localhost:3000/api/v1'

new Vue({
    el: "#app",
    data: {
        showcase: [],
        cart: [],
        isCartVisible: false
    },
    methods: {
        onCartOpen() {
            this.isCartVisible = !this.isCartVisible
        },
        addToCart(card_id) {
            const productToAdd = this.showcase.find((el) => card_id == el.id_product)
            this.cart.push(productToAdd)
            // fetch(`${API_URL}/cart`, {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": 'application/json'
            //     },
            //     body: JSON.stringify(productToAdd)
            // })
            //     .then((res) => {
            //         console.log(res)
            //         // if (res.status === 201) {
            //         //     this.cart.push(productToAdd)
            //         // }
            //     })
            // // }
        },
        delFromCart(card_id) {
            const idxToDel = this.cart.findIndex((el) => card_id == el.id_product)
            this.cart.splice(idxToDel, 1);
            // fetch(`${API_URL}/cart`, {
            //     method: "DELETE",
            //     headers: {
            //         "Content-Type": 'application/json'
            //     },
            //     body: JSON.stringify(this.cart[idxToDel])
            // })
            //     .then(() => {
            //         console.log(idxToDel)
            //         // if (res.status === 201) {
            //         this.cart.splice(idxToDel, 1)
            //         // }
            //     })
        }
    },
    mounted() {
        fetch(`${API_URL}/cart`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                this.cart = data.contents
            })
        fetch(`${API_URL}/showcase`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                this.showcase = data
            })
    }
})

