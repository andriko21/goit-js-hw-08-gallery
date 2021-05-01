import gallaries from "./gallary-items.js";

const gallaryList = document.querySelector(".js-gallery");
const modalPicture = document.querySelector(".lightbox__image");
const developGallary = createGallary(gallaries);
const openModal = document.querySelector(".lightbox");
const closeModal = document.querySelector(".lightbox__button");

gallaryList.insertAdjacentHTML("afterbegin", developGallary);
let currentLi;
 gallaryList.addEventListener("click", onPictureGallaryClick);
 closeModal.addEventListener("click", onCloseBtnClick);

function createGallary(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
        </li>
        `;
    })
    .join("");
}

function onPictureGallaryClick(evt) {
  if (!evt.target.classList.contains("gallary__image")) {
    return;
  }
  currentLi = evt.target.parentNode;
  openModal.classList.add('is-open');
  modalPicture.src = evt.target.dataset.source;
  window.addEventListener('keydown', onEscOverlayPres)
  window.addEventListener('keydown', onBtnArrowClick)
  
}

function onCloseBtnClick(evt) {
  window.removeEventListener('keydown', onEscOverlayPres)
  window.removeEventListener('keydown', onBtnArrowClick)
  openModal.classList.remove('is-open')
  modalPicture.src = '';
}

const overlay = document.querySelector('.lightbox__overlay');
overlay.addEventListener('click', onCloseBtnClick);

function onEscOverlayPres(event){
        console.log(event) 
        if(event.code === 'Escape'){
            onCloseModalBtnClick();
        }
}

function onBtnArrowClick(event) {
  if (event.code === 'ArrowRight') {
    let pressOnBtnLeft = currentEventLi.nextElementSibling
    if (!pressOnBtnLeft) {
      pressOnBtnLeft = gallaryList.firstElementChild
    }
    modalPicture.src = pressOnBtnLeft.lastElementChild.dataset.source
    currentEventLi = pressOnBtnLeft
  } 
 
    if(event.code=== 'ArrowLeft'){
        let pressOnBtnRight = currentEventLi.previousElementSibling
        if(!pressOnBtnRight){
            pressOnBtnRight=galleryContainer.lastElementChild
        }
        pictureModal.src = pressOnBtnRight.lastElementChild.dataset.source
        currentEventLi = pressOnBtnRight;
    }
}



