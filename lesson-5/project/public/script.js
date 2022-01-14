// const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
const API_URL = 'http://localhost:3000/api/v1/';

function getCounter() {
    let last = 0;

    return () => ++last;
}


const stackIDGenrator = getCounter()


class Good {
    constructor({ id, title, price }) {
        this.id = id;
        this.title = title;
        this.price = price;
    }

    getId() {
        return this.id;
    }

    getPrice() {
        return this.price;
    }

    getTitle() {
        return this.title;
    }

}

class GoodRender {
    constructor({ id, title, price }) {
        this.id = id;
        this.title = title;
        this.price = price;
    }

    render() {
        console.log(this.id, this.title, this.price)
        return `<div
         class="goods-item" ><h3>${this.title}</h3><p>${this.price} руб.</p>
         <button data-id=${this.id}>Купить</button>
         </div>`;
    }
}

class CartGoodRender extends GoodRender {
    constructor({ id, title, price }, count) {
        super({ id, title, price })
        this.count = count;
    }

    render() {
        return `<div
         class="goods-item-cart"><h3>${this.title}</h3><p>Цена: ${this.price} руб.</p><p> Количество: ${this.count} шт.</p>
          <button data-id=${this.id}>Удалить</button>
         </div>`;
    }
}



class GoodStack {
    constructor(good) {
        this.id = stackIDGenrator();
        this.good = good;
        this.count = 1;
    }

    getGoodId() {
        return this.good.id
    }

    getGood() {
        return this.good;
    }

    getCount() {
        return this.count;
    }

    add() {
        this.count++;
        return this.count;
    }

    remove() {
        this.count--;
        return this.count;
    }
}


class Cart {
    constructor() {
        this.list = []
    }
    _onSuccess(data) {
        //const data = JSON.parse(response)
        data.contents.forEach(item => {
            this.list.push(
                new GoodStack({ id: item.id_product, title: item.product_name, price: item.price, count: item.quantity })
            )
        });

    }

    fetchBasket() {
        const pr1 = fetch(`${API_URL}cart`);
        const pr2 = pr1.then((response) => {
            return response.json()
        })
        pr2.then((data) => {
            this._onSuccess(data);
        })
        return pr2
    }

    add(good) {
        const idx = this.list.findIndex((stack) => stack.getGoodId() == good.id)

        if (idx >= 0) {
            this.list[idx].add()
        } else {
            this.list.push(new GoodStack(good))
        }
    }

    remove(id) {
        const idx = this.list.findIndex((stack) => stack.getGoodId() == id)

        if (idx >= 0) {
            this.list[idx].remove()

            if (this.list[idx].getCount() <= 0) {
                this.list.splice(idx, 1)
            }
        }
    }
}


class Showcase {
    constructor(cart) {
        this.list = [];
        this.filtered = [];
        this.cart = cart;

        this.searchInput = document.querySelector("#search_input");
        this.searchBtn = document.querySelector("#search_btn");
        this.searchBtn.addEventListener('click', this.filter.bind(this));

    }

    filter() {
        //this.filtered = JSON.parse(JSON.stringify(this.list))
        const search = new RegExp(this.searchInput.value, 'gi');
        this.filtered = this.list.filter(good => search.test(good.title));
        //отрисовка витрины после фильтрации
        const ShowcaseRender = new GoodsListRender(this.filtered);
        ShowcaseRender.renderGoodsList();
    }

    _onSuccess(data) {
        //const data = JSON.parse(response)
        data.forEach(product => {
            this.list.push(
                new Good({ id: product.id_product, title: product.product_name, price: product.price })
            )
        });
    }

    fetchGoods() {
        const pr1 = fetch(`${API_URL}showcase`);
        const pr2 = pr1.then((response) => {
            return response.json()
        })
        pr2.then((data) => {
            this._onSuccess(data);
        })
        return pr2
    }

    addToCart(id) {
        console.log(id);
        // return;
        const idx = this.list.findIndex((good) => id == good.id)

        if (idx >= 0) {
            this.cart.add(this.list[idx])
        }
    }
}

class GoodsListRender {
    constructor(list) {
        this.list = list;
        this.goodsContainer = document.querySelector('.goods-list')
    }

    renderGoodsList() {
        let listHtml = '';
        this.list.forEach(item => {
            const GoodRenderObj = new GoodRender(item);
            listHtml += GoodRenderObj.render();
        });
        // const goodsContainer = document.querySelector('.goods-list')
        this.goodsContainer.innerHTML = listHtml;
        // goodsContainer.addEventListener('click', () => { console.log(this.id) })
        // return listHtml
    }

    SetBuyClickHandler(callback) {
        this.goodsContainer.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                const id = e.target.dataset.id;
                callback(id);
            }
        })
    }
}

class CartGoodsListRender {
    constructor(list) {
        this.list = list;
        this.CartGoodsContainer = document.querySelector('.goods-list-cart')
    }

    renderGoodsList() {
        let listHtml = '';
        this.list.forEach(item => {
            const GoodRenderObj = new CartGoodRender(item.good, item.count);
            listHtml += GoodRenderObj.render();
        });
        document.querySelector('.goods-list-cart').innerHTML = listHtml;
        // return listHtml
    }

    SetDeleteClickHandler(callback) {
        this.CartGoodsContainer.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                const id = e.target.dataset.id;
                callback(id);
            }
        })
    }

    hideCart() {
        // this.CartGoodsContainer.style.visibility = 'hidden';
        this.CartGoodsContainer.style.visibility === 'hidden' ? this.CartGoodsContainer.style.visibility = 'visible' : this.CartGoodsContainer.style.visibility = 'hidden'
        // console.log(this.CartGoodsContainer);
        // this.CartGoodsContainer.tog
    }
}


const cart = new Cart()
const showcase = new Showcase(cart)

//забираем витрину с сервера
fetchPromise = showcase.fetchGoods();//если/когда запрос отработал успешното, то можно отрисовывать пришедшие данные 
fetchPromise.then(() => {
    const ShowcaseRender = new GoodsListRender(showcase.list);
    ShowcaseRender.SetBuyClickHandler(showcase.addToCart.bind(showcase))
    ShowcaseRender.renderGoodsList();
})

//забираем корзину с сервера
const CartRender = new CartGoodsListRender(cart.list);
fetchPromise1 = cart.fetchBasket();
fetchPromise1.then(() => {
    CartRender.SetDeleteClickHandler(cart.remove.bind(cart))
    CartRender.renderGoodsList();
})

setInterval(CartRender.renderGoodsList.bind(CartRender), 1000);
/////////////////////////////////////////
// setTimeout(() => {
//     // search_btn = document.getElementById("search_btn");
//     // search_btn.display = 'none';
//     // search_btn.style.visibility = 'hidden';
//     document.querySelector(".goods-list-cart").style.visibility = 'hidden';
//     // search_btn1.display = 'none';

// }, 1000);
// document.getElementById("search_btn");



// cartBtn = document.getElementsByClassName('cart-button')



cartBtn = document.querySelector('.cart-button');
cartBtn.addEventListener('click', CartRender.hideCart.bind(CartRender));




