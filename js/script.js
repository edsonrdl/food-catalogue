const imgShow = document.querySelectorAll(".img-show");
const dishContent = document.querySelectorAll(".content-dish");

function ativedishContent(event) {
    const clickedElement = event.currentTarget; 
    const dishContentId = clickedElement.id; 
    console.log(dishContentId);
    replaceImgShow(dishContentId)

    dishContent.forEach(contentDish => {
        contentDish.classList.remove("content-dish-active");
    });
    
    clickedElement.classList.add('content-dish-active');
}

dishContent.forEach(contentDish => {
    contentDish.addEventListener("click", ativedishContent);
});


function replaceImgShow(dishContentId) {
    const nameDishReplace = document.querySelector(".name-dish");
    
    const imgIdContentDish = document.getElementById(dishContentId);
        const contentDishImg= imgIdContentDish.querySelectorAll("img");
        const replaceImgDishContent=contentDishImg[0].currentSrc
        imgShow[0].setAttribute('src', replaceImgDishContent);

}

