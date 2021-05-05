import gallaries from "./gallary-items.js";

const gallaryList = document.querySelector(".js-gallery");
const modalPicture = document.querySelector(".lightbox__image");
const developGallary = createGallary(gallaries);
const openModal = document.querySelector(".lightbox");
const closeModal = document.querySelector(".lightbox__button");

gallaryList.insertAdjacentHTML("afterbegin", developGallary);
let currentEventLi;
gallaryList.addEventListener("click", onPictureGallaryClick);
closeModal.addEventListener("click", onCloseBtnClick);
const overlay = document.querySelector(".lightbox__overlay");
overlay.addEventListener("click", onCloseBtnClick);

function createGallary(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
   <li class="gallery__item">
       <a
       class="gallery__link"
       href="${preview}"
      >
   <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
        `;
    })
    .join("");
}

function onPictureGallaryClick(evt) {
  evt.preventDefault();
  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }
  currentEventLi = evt.target.closest(".gallery__image");
  openModal.classList.add("is-open");
  modalPicture.src = evt.target.dataset.source;
  window.addEventListener("keydown", onEscOverlayPres);
  window.addEventListener("keydown", onBtnArrowClick);
}

function onCloseBtnClick(evt) {
  window.removeEventListener("keydown", onEscOverlayPres);
  window.removeEventListener("keydown", onBtnArrowClick);
  openModal.classList.remove("is-open");
  modalPicture.src = "";
}

function onEscOverlayPres(event) {
  if (event.code === "Escape") {
    onCloseBtnClick();
  }
}

function onBtnArrowClick(event) {
  if (event.code === "ArrowRight") {
    let pressOnBtnLeft =
      currentEventLi.parentElement.parentElement.nextElementSibling;
    if (!pressOnBtnLeft) {
      pressOnBtnLeft = gallaryList.firstElementChild;
    }
    modalPicture.src =
      pressOnBtnLeft.lastElementChild.lastElementChild.dataset.source;
    currentEventLi = pressOnBtnLeft.lastElementChild.lastElementChild;
  }

  if (event.code === "ArrowLeft") {
    let pressOnBtnRight =
      currentEventLi.parentElement.parentElement.previousElementSibling;
    if (!pressOnBtnRight) {
      pressOnBtnRight = gallaryList.lastElementChild;
    }
    modalPicture.src =
      pressOnBtnRight.lastElementChild.lastElementChild.dataset.source;
    currentEventLi = pressOnBtnRight.lastElementChild.lastElementChild;
  }
}
