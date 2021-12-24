const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

function send(onError, onSuccess, url, method = 'GET', data = '', headers = {}, timeout = 60000) {

    let xhr;

    if (window.XMLHttpRequest) {
        // Chrome, Mozilla, Opera, Safari
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        // Internet Explorer
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    for ([key, value] of Object.entries(headers)) {
        xhr.setRequestHeader(key, value)
    }

    xhr.timeout = timeout;

    xhr.ontimeout = onError;

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status < 400) {
                onSuccess(xhr.responseText)
            } else if (xhr.status >= 400) {
                onError(xhr.status)
            }
        }
    }

    xhr.open(method, url, true);

    xhr.send(data);
}

function getCounter() {
    let last = 0;

    return () => ++last;
}

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

    // renderGoodItem() {
    //     return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    // }
}

class GoodRender {
    constructor({ title, price }) {
        this.title = title;
        this.price = price;
    }

    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price} руб.</p></div>`;
    }
}

class CartGoodRender extends GoodRender {
    constructor({ title, price }, count) {
        super({ title, price })
        this.count = count;
    }

    render() {
        return `<div class="goods-item-cart"><h3>${this.title}</h3><p>Цена: ${this.price} руб.</p><p> Количество: ${this.count} шт.</p></div>`;
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
        this.cart = cart;
    }

    _onSuccess(response) {
        const data = JSON.parse(response)
        data.forEach(product => {
            this.list.push(
                new Good({ id: product.id_product, title: product.product_name, price: product.price })
            )
        });
    }

    _onError(err) {
        console.log(err);
    }

    fetchGoods() {
        send(this._onError, this._onSuccess.bind(this), `${API_URL}catalogData.json`)
    }

    // fetchGoods() {
    //     this.list = [
    //         new Good({ id: 1, title: 'Футболка', price: 140 }),
    //         new Good({ id: 2, title: 'Брюки', price: 320 }),
    //         new Good({ id: 3, title: 'Галстук', price: 24 })
    //     ]
    // }

    addToCart(id) {
        const idx = this.list.findIndex((good) => id == good.id)

        if (idx >= 0) {
            this.cart.add(this.list[idx])
        }
    }

    // renderShowcase() {
    //     let listHtml = '';
    //     this.list.forEach(item => {
    //         const GoodRenderObj = new GoodRender(item);
    //         listHtml += GoodRenderObj.render();
    //     });
    //     document.querySelector('.goods-list').innerHTML = listHtml;
    // }
}

class GoodsListRender {
    constructor(list) {
        this.list = list;
    }

    renderGoodsList() {
        let listHtml = '';
        this.list.forEach(item => {
            const GoodRenderObj = new GoodRender(item);
            listHtml += GoodRenderObj.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
        return listHtml
    }
}

class CartGoodsListRender {
    constructor(list) {
        this.list = list;
    }

    renderGoodsList() {
        let listHtml = '';
        this.list.forEach(item => {
            const GoodRenderObj = new CartGoodRender(item.good, item.count);
            listHtml += GoodRenderObj.render();
        });
        document.querySelector('.goods-list-cart').innerHTML = listHtml;
        return listHtml
    }
}



const cart = new Cart()
const showcase = new Showcase(cart)
showcase.fetchGoods();

setTimeout(() => {
    showcase.addToCart(123)
    showcase.addToCart(123)
    showcase.addToCart(123)
    showcase.addToCart(456)

    cart.remove(123)

    //вывод в консоль и отрисовка
    console.log(showcase, cart)
    const ShowcaseRender = new GoodsListRender(showcase.list);
    ShowcaseRender.renderGoodsList();
    //
    const CartRender = new CartGoodsListRender(cart.list);
    CartRender.renderGoodsList();
}, 1000)




