// calling API


document.getElementById('search-meal-btn').addEventListener('click', () => {
    const mealName = document.getElementById('search-meal-name').value;
    // mealName = "";
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then(response => response.json())
    .then(data => getMeal(data))
    
});

const getMeal = (meal) => {
    const mealArea = document.getElementById('meal-area');
    const mealInputValue = document.getElementById('search-meal-name').value;
    const mealList = meal.meals;
    console.log(meal.meals);
    
    
    if(mealInputValue == "" || mealList == null){
        document.getElementById('alert-message').style.display = "block";
    }else{
        mealList.forEach(eachMeal => {
            const mealInfo = `
            <div class="col-md-3 mb-4">
            <div onclick="getData('${eachMeal.strMeal}')" class="card h-100">
                <img src="${eachMeal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${eachMeal.strMeal}</h5>
                </div>
            </div>
            `
            
            mealArea.innerHTML += mealInfo;
            console.log(eachMeal);
            document.getElementById('alert-message').style.display = "none"
        });
    }

    // console.log(meal.meals[0].strMeal);
    // console.log(meal.meals[0].strMealThumb);
};

const getData = (mealTitle, callFunction) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealTitle}`)
    .then(response => response.json())
    .then(data => showDetails(data))
}
const showDetails = (mealDetail) => {
    console.log(mealDetail.meals[0].strMeal);
    console.log(mealDetail.meals[0].strIngredient1);
    const mealDetailArea = document.getElementById('meal-details-area');
    const mealDetailInfo =`
    <div class="card col-md-4 m-auto">
        <img src="${mealDetail.meals[0].strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title fw-bold">${mealDetail.meals[0].strMeal}</h5>
          <h6 class="fw-bold">Ingredients</h6>
          <ul>
              <li>${mealDetail.meals[0].strIngredient1}</li>
              <li>${mealDetail.meals[0].strIngredient2}</li>
              <li>${mealDetail.meals[0].strIngredient3}</li>
              <li>${mealDetail.meals[0].strIngredient4}</li>
              <li>${mealDetail.meals[0].strIngredient5}</li>
              <li>${mealDetail.meals[0].strIngredient6}</li>
          </ul>
        </div>
      </div>
    `
    mealDetailArea.innerHTML = mealDetailInfo;
}