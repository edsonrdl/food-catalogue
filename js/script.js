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
}
function replaceNameDish(dishContentId) {
    const nameDishReplace = document.querySelector("#name-dish");
    const nameContentDish = document.getElementById(dishContentId);
    const contentDishImg = nameContentDish.querySelectorAll("p");
    nameDishReplace.textContent = contentDishImg[0].textContent;
}

function activebuttomDetails(event) {
    idBtnActive = event.currentTarget;
    console.log(idBtnActive.id);
    AllbtnDetails.forEach(buttomActive => {
        buttomActive.classList.remove("btn-details-active");
    });

    idBtnActive.classList.add('btn-details-active');
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
        console.log(detailsData);
    } else {
        console.log('Não foi possível obter os dados da receita.');
    }
}
dishDetailsIngredientsPreparations();


 function replaceDetailsInitialShow() {
    dishContent.forEach(contentDish => {
        if (contentDish.classList.contains("content-dish-active")) {
            const contentDetailsUlList = document.querySelector(".content-details-Ingredients-preparation");
            console.log(contentDetailsUlList);
            const contentDishActive = document.querySelector(".content-dish-active");
            const dishID = contentDishActive.id;

            async function fetchData() {
                const detailsData = await fetchDetailsIngredientsPreparationDish();
                const detailsValidationId = detailsData.id;

                for (let index = 0; index < detailsData.length; detailsData++) {
                    const contentDishDetails = detailsData[index];
                    
                    if(contentDishDetails.id == dishID){

                        const dishDetails = contentDishDetails.ingredients;
                        contentDetailsUlList.innerHTML = '';
                            dishDetails.forEach(detailsIngredients => {
                                console.log(detailsIngredients);
                              const ul = document.createElement('ul');
                              const ulContent = `
                                <li>${detailsIngredients}</li>
                                `;
                                ul.innerHTML = ulContent;
                                contentDetailsUlList.appendChild(ul);
                        
                            });
                              } else {
                                console.error('Falha ao criar lista.');
                  }
                    }

            }

            fetchData();
        }
    });
};

replaceDetailsInitialShow();

// const detailsDishIngredientsPreparation= async () => {
//   const topClientorders = await fetchOrders();

//   if (topClientorders) {
//     const topClientorderValidate=topClientorders.topClientOrdes;
//     tbodydashboardTopClientOrders.innerHTML = '';

//     topClientorderValidate.forEach(topClientorder => {
//       const tr = document.createElement('li');
//       const trContent = `
//         <td>${topClientorder.client}</td>
//         <td>${numeroFormatado}</td>
//         <td>${topClientorder.email}</td>
//         <td>${topClientorder.amount}</td>
//         `;
//       tr.innerHTML = trContent;
//       tbodydashboardTopClientOrders.appendChild(tr);

//     });
//   } else {
//     console.error('Failed to load orders.');
//   }
// }

// dashboardTopClientOrders();