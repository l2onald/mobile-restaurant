import { itemsData } from "./itemsData.js"

const checkout = document.querySelector('.checkout')
const checkoutModal = document.querySelector('.checkout-modal')
const checkoutCart = document.querySelector('.checkout__cart')
const checkoutCartTotalPrice = document.querySelector('.checkout__cart__total__price')

let checkoutCartHTML = ''
const totalPriceArr = []
const itemsArr = []

document.addEventListener('click', function(e){

    e.target.className==='main__item__btn' && handleAddMainItemBtn(e.target.dataset.item)

    e.target.className==='checkout__cart__item__remove-btn' && handleRemoveItem(e.target.dataset.item)

    e.target.id==='complete-order-btn' && handleCompleteOrderBtn()

    e.target.className==='checkout-modal__container' && closeModal()

    e.target.id==='checkout-pay-btn' && handleCheckoutPayBtn(e)

    e.target.dataset.decrease && handleDecreaseItemBtn(e.target.dataset.decrease)

    e.target.dataset.increase && handleIncreaseItemBtn(e.target.dataset.increase)

    
    
})


function handleIncreaseItemBtn(itemId){

    const selectedItem = itemsArr.find(item => item.id == itemId);

    selectedItem && selectedItem.quantity++;
    document.getElementById(itemId).textContent = selectedItem.quantity;

}

function handleDecreaseItemBtn(itemId){
    const selectedItem = itemsArr.find(item => item.id == itemId);
    selectedItem.quantity <= 1 || selectedItem.quantity--
    document.getElementById(itemId).textContent = selectedItem.quantity;
}


function closeModal(){
    checkoutModal.style.display = "none"
}

function handleCompleteOrderBtn(){
    checkoutModal.style.display = "block"
}

function handleRemoveItem(){
    checkout.style.display = "none"
}

function handleAddMainItemBtn(itemId){
    checkout.style.display = "flex"
    checkoutCart.innerHTML = getCartItemsHTML(itemId)
    const totalPrice = totalPriceArr.reduce((total, current)=> {
        return total + current
    })
    checkoutCartTotalPrice.textContent = `$ ${totalPrice}`

    handleIncreaseItemBtn(itemId)

}


function getCartItemsHTML(itemId){

    const { name, price, id} = itemsData.filter(function(item){
        return item.id===Number(itemId)
    })[0]

    const index = itemsArr.findIndex(item => item.id == id)
    

    if(index !== -1){
        const quantityElement = document.getElementById(id);
        quantityElement.textContent = itemsArr[index].quantity;
    }else{
        totalPriceArr.push(price)
        itemsArr.push({
            id,
            quantity: 0
        })
        checkoutCartHTML += `
        <div class="checkout__cart__item">
            <h2 class="checkout__cart__item__name">${name}</h2>
            <div class="checkout__cart__item__quantity">
                <button class="checkout__cart__item__quantity__subtract btn btn--small" data-decrease=${id}>-</button>
                <p class="checkout__cart__item__quantity__value" id=${id}></p>
                <button class="checkout__cart__item__quantity__increase btn btn--small" data-increase=${id}>+</button>
            </div>
            <p class="checkout__cart__item__price ">$${price}</p>
        </div>`
        
    }

    return checkoutCartHTML

}

function handleCheckoutPayBtn(e){

    document.querySelector('.order-completed').style.display = "block"
    
    e.preventDefault();
    const inputName = document.querySelector('#checkout-name').value

    document.querySelector('.order-completed__text').textContent = `Thanks, ${inputName}! Your order is on its way!`

    checkoutModal.style.display = "none"
    checkout.style.display = "none"

}

function getItemsHtml(){
    let mainHTML = ''
    itemsData.map((item)=> {
        mainHTML += `
        <div class="main__item">
            <div class="main__item__product-info">
                <h2 class="main__item__product-info__name">${item.name}</h2>
                <p class="main__item__product-info__ingredients">${item.ingredients}</p>
                <p class="main__item__product-info__price">${item.price}</p>
            </div>

            <span class="main__item__img">${item.img}</span>

            <button class="main__item__btn" data-item=${item.id}>+</button>
        </div>`
    })
    return mainHTML
}

function render(){
    document.querySelector('.main').innerHTML = getItemsHtml()
}

render()