// 'use strict'
const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

const _goodList = document.querySelector('.goods-list');
console.log('1', document.getElementsByClassName('goods-list'));
console.log('2', document.getElementsByTagName('div')[0]);

const renderGoodsItem = ({ title, price }) => {
    return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
};

const renderGoodsList = (list = goods) => {
    let goodsList = list.map(item => renderGoodsItem(item)).join('');
    document.querySelector('.goods-list').innerHTML = goodsList;
}

renderGoodsList(goods);