// get data from server;
document.getElementById('search-meal-btn').addEventListener('click', () => {
    const mealName = document.getElementById('search-meal-name').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then(response => response.json())
    .then(data => getMeal(data))
    
});


// get meal items
const getMeal = (meal) => {
    const mealArea = document.getElementById('meal-area');
    const mealInputValue = document.getElementById('search-meal-name').value;
    const mealList = meal.meals;
    if(mealInputValue === "" || mealList === null){
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
            document.getElementById('alert-message').style.display = "none"
        });
    }
    document.getElementById('search-meal-name').value = "";

};


// get meal details data from server
const getData = (mealTitle) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealTitle}`)
    .then(response => response.json())
    .then(data => showMealDetails(data))
}


// show meal details
const showMealDetails = (mealDetail) => {
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