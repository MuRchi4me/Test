import {ProductCardComponent} from "../../Components/product-card/index.js";
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import {peerId1, peerId2} from "../../modules/consts.js";
import {ProductPage} from "../products/index.js";



export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.currentPeerId = peerId1;
    }
    get pageRoot() {
        return document.getElementById('main-page')
    }
        
    getHTML() {
        return (
            `
                <div id="main-page" class="d-flex flex-wrap"><div/>
            `
        )
    }
    renderData(items) {
        // Очищаем контейнер перед отображением новых карточек
        if (this.productCardsContainer) {
            this.productCardsContainer.innerHTML = '';
        } else {
            this.productCardsContainer = document.createElement('div');
            this.productCardsContainer.id = 'product-cards-container';
            this.productCardsContainer.classList.add('d-flex', 'flex-wrap');
            this.pageRoot.appendChild(this.productCardsContainer);
            productCard.cardElement.classList.add('mr-3');
        }

        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.productCardsContainer);
            productCard.render(item, this.clickCard.bind(this));
        });
    }
   
    togglePeerId() {
        this.currentPeerId = this.currentPeerId === peerId1 ? peerId2 : peerId1;
        this.updateDataWithPeerId(this.currentPeerId);
    }

    getData() {
    ajax.get(`http://127.0.0.1:3000/get-members`, (data) => {
        // Предполагая, что бэкенд возвращает данные в формате { response: { items: [...] } }
        // Если формат данных другой, вам нужно будет соответствующим образом адаптировать следующую строку
        this.renderData(data.response.items)
    });
}
    clickCard(e) {
        const cardId = e.target.dataset.id
    
        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }
    
    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        // Добавляем кнопку для переключения между peerId
        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Переключить ID';
        toggleButton.classList.add('toggle-button');
        toggleButton.addEventListener('click', () => {
            this.togglePeerId();
        });
        this.parent.appendChild(toggleButton);

        this.getData();
    }
    
}