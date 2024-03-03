const imgShow = document.querySelectorAll(".img-show");
const dishContent = document.querySelectorAll(".content-dish");
const AllbtnDetails = document.querySelectorAll(".btn-details");


function activedishContent(event) {
    const clickedElement = event.currentTarget;
    const dishContentId = clickedElement.id;
    replaceImgShow(dishContentId)

    dishContent.forEach(contentDish => {
        contentDish.classList.remove("content-dish-active");
    });

    clickedElement.classList.add('content-dish-active');
    validationButtomDetailsInitialIngredientsInDish();
}

dishContent.forEach(contentDish => {
    contentDish.addEventListener("click", activedishContent);
});


function replaceImgShow(dishContentId) {
    const imgIdContentDish = document.getElementById(dishContentId);
    const contentDishImg = imgIdContentDish.querySelectorAll("img");
    const replaceImgDishContent = contentDishImg[0].currentSrc
    imgShow[0].setAttribute('src', replaceImgDishContent);
    replaceNameDish(dishContentId);
    replaceDetailsInpredientsClickInDish(dishContentId);
}
function replaceNameDish(dishContentId) {
    const nameDishReplace = document.querySelector("#name-dish");
    const nameContentDish = document.getElementById(dishContentId);
    const contentDishImg = nameContentDish.querySelectorAll("p");
    nameDishReplace.textContent = contentDishImg[0].textContent;
}

function activebuttomDetails(event) {
    idBtnActive = event.currentTarget;
    AllbtnDetails.forEach(buttomActive => {
        buttomActive.classList.remove("btn-details-active");
    });

    idBtnActive.classList.add('btn-details-active');
    replaceDetailsInpredientsPrePreparationShow(idBtnActive.id);
}

AllbtnDetails.forEach(buttomDetails => {
    buttomDetails.addEventListener("click", activebuttomDetails);
});

function validationButtomDetailsInitialIngredientsInDish() {

    const btnValidationIngredients = document.getElementById("btn-Ingredients");
    const btnValidationPreparation = document.getElementById("btn-preparation");

    if(btnValidationPreparation.classList.contains("btn-details-active")){
        btnValidationPreparation.classList.remove("btn-details-active");
    }
    btnValidationIngredients.classList.add('btn-details-active');
 }

async function fetchDetailsIngredientsPreparationDish() {
    try {
        const response = await fetch('details.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar o JSON:', error);
        return null;
    }
}

async function dishDetailsIngredientsPreparations() {
    const detailsData = await fetchDetailsIngredientsPreparationDish();
    if (detailsData) {
    } else {
        console.log('Não foi possível obter os dados da receita.');
    }
}
dishDetailsIngredientsPreparations();

async function replaceDetailsInpredientsClickInDish(dishContentId) {
    const validationIdDishClickInIcon = dishContentId;

    const contentDetailsUlList = document.querySelector(".contentLiDish");


    const detailsDataAll = await fetchDetailsIngredientsPreparationDish();

    detailsDataAll.forEach(detailsDish => {
        if (detailsDish.id == validationIdDishClickInIcon) {


            const details = detailsDish.ingredients;
            contentDetailsUlList.innerHTML = '';
            details.forEach(detailsIngredients => {
                const li = document.createElement('li');
                const ulContent = `
                            ${detailsIngredients}
                            `;
                            li.innerHTML = ulContent;
                contentDetailsUlList.appendChild(li);

            });

        }
    });
    ;
};



async function replaceDetailsInpredientsPrePreparationShow(idBtn) {
    const idBtnValidation = idBtn;

    const contentDetailsUlList = document.querySelector(".contentLiDish");
    const contentDishActive = document.querySelector(".content-dish-active");
    const dishID = contentDishActive.id;

    const detailsDataAll = await fetchDetailsIngredientsPreparationDish();

    detailsDataAll.forEach(detailsDish => {
        if (detailsDish.id == dishID && idBtnValidation=="btn-Ingredients") {

            const details = detailsDish.ingredients;
            contentDetailsUlList.innerHTML = '';
            details.forEach(detailsIngredients => {
                const li = document.createElement('li');
                const ulContent = `
                        ${detailsIngredients}
                            `;
                            li.innerHTML = ulContent;
                contentDetailsUlList.appendChild(li);

            }
            );

        }if (detailsDish.id == dishID && idBtnValidation=="btn-preparation") {

            const details = detailsDish.preparation;
            contentDetailsUlList.innerHTML = '';
            details.forEach(detailsIngredients => {
                const li = document.createElement('li');
                const ulContent = `${detailsIngredients}`;
                li.innerHTML = ulContent;
                contentDetailsUlList.appendChild(li);

            }
            );
            
            
        }
    });
    ;
};