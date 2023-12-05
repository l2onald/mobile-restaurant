import { itemsData } from "./itemsData.js"

const checkout = document.querySelector('.checkout')
const checkoutModal = document.querySelector('.checkout-modal')
const checkoutCart = document.querySelector('.checkout__cart')
const checkoutCartTotalPrice = document.querySelector('.checkout__cart__total__price')

document.addEventListener('click', function(e){

    e.target.className==='main__item__btn' && handleAddMainItemBtn(e.target.dataset.item)

    e.target.className==='checkout__cart__item__remove-btn' && handleRemoveItem(e.target.dataset.item)

    e.target.id==='complete-order-btn' && handleCompleteOrderBtn()

    e.target.className==='checkout-modal__container' && closeModal()

    e.target.id==='checkout-pay-btn' && handleCheckoutPayBtn(e)
    
})



function closeModal(){
    checkoutModal.style.display = "none"
}

function handleCompleteOrderBtn(){
    checkoutModal.style.display = "block"
}

function handleRemoveItem(itemId){
    checkout.style.display = "none"
}



let checkoutCartHTML = ''
const totalPriceArr = []
const itemsArr = []

function handleAddMainItemBtn(itemId){
    checkout.style.display = "flex"
    checkoutCart.innerHTML = getCartItemsHTML(itemId)
    const totalPrice = totalPriceArr.reduce((total, current)=> {
        return total + current
    })
    checkoutCartTotalPrice.textContent = `$ ${totalPrice}`
}

checkoutCartHTML = ``

function getCartItemsHTML(itemId){

    const { name, price, id} = itemsData.filter(function(item){
        return item.id===Number(itemId)
    })[0]
   
    checkoutCartHTML += `
        <div class="checkout__cart__item">
            <h2 class="checkout__cart__item__name">${name}</h2>
            <a class="checkout__cart__item__remove-btn">remove</a>
            <p class="checkout__cart__item__price">$${price}</p>
        </div>`

    itemsArr.push(id)
    totalPriceArr.push(price)

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