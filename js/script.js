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


//  function replaceDetailsInitialShow() {

//         if (contentDish.classList.contains("content-dish-active")) {
//             const contentDetailsUlList = document.querySelector(".content-details-Ingredients-preparation");
//             const contentDishActive = document.querySelector(".content-dish-active");
//             const dishID = contentDishActive.id;

//             async function fetchData() {
//                 const detailsData = await fetchDetailsIngredientsPreparationDish();

//                 for (let i = 0; i < detailsData.length; detailsData++) {
//                     const contentDishDetails = detailsData[i];

//                     if(contentDishDetails.id == dishID){

//                         const dishDetails = contentDishDetails.ingredients;
//                         contentDetailsUlList.innerHTML = '';
//                             dishDetails.forEach(detailsIngredients => {
//                               const ul = document.createElement('ul');
//                               const ulContent = `
//                                 <li>${detailsIngredients}</li>
//                                 `;
//                                 ul.innerHTML = ulContent;
//                                 contentDetailsUlList.appendChild(ul);

//                             });
//                               } else {
//                                 console.error('Falha ao criar lista.');
//                   }
//                     }

//             }

//             fetchData();
//         }
//     };

// replaceDetailsInitialShow();

async function replaceDetailsInpredientsClickInDish(dishContentId) {
    const validationIdDishClickInIcon = dishContentId;

    const contentDetailsUlList = document.querySelector(".contentLiDish");


    const detailsDataAll = await fetchDetailsIngredientsPreparationDish();

    detailsDataAll.forEach(detailsDish => {
        if (detailsDish.id == validationIdDishClickInIcon) {


            const details = detailsDish.ingredients;
            console.log("Teste" + details);
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