var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      productsICanEat = _.filter(products, function(item) {
        var edible = _.all(item.ingredients, function(ingredient) {
          return ingredient !== 'mushrooms';
        });
        return edible && !item.containsNuts;
      })

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = _.reduce(_.range(1,1000), function(start, val) {    /* try chaining range() and reduce() */
      return val % 3 === 0 || val % 5 === 0 ? start+val : start;
    }, 0);

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    _.chain(products)
      .map(function(item) {
        return item.ingredients;
      })
      .flatten(true)
      .reduce(function(start, val) {
        ingredientCount[val] = ingredientCount[val]+1 || 1;
        return ingredientCount
      }, ingredientCount)
      .value()

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  // ADVANCED
  
  it("should find the largest prime factor of a composite number", function () {
    var largestPrime = function(n) {
      var factors = _.filter(_.range(2,n), function(item) {
        return n%item === 0;
      }).reverse();

      if (factors.length === 0) {
        return n
      }

      return largestPrime(factors[0]);
    }

    expect(largestPrime(805)).toBe(23);
    expect(largestPrime(858)).toBe(13);
    expect(largestPrime(1014)).toBe(13);
    expect(largestPrime(7140)).toBe(17);
    expect(largestPrime(10141991)).toBe(257);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    var palindromeProduct = function(x, y) {
      var n = (x*y).toString();
      var temp = '';
      var result = '';
      for (var i = 0; i < n.length; i++) {
        for (var j = 0; j < n.length; j++) {
          temp = n.slice(0,-j);
          if (temp.split('').reverse().join('') === temp && temp.length > result.length) {
            result = temp;
          }
        }
        n = n.slice(1);
      }
      return result;
    }

    expect(palindromeProduct(123, 123)).toBe('151');   //15129
    expect(palindromeProduct(100, 200)).toBe('000');   //2000
    expect(palindromeProduct(772, 241)).toBe('1');     //325012
    expect(palindromeProduct(999, 910)).toBe('90909'); //909090
    expect(palindromeProduct(858, 619)).toBe('11');    //531102
  });

  /*it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      
    
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    
  });

  it("should find the 10001st prime", function () {

  });*/
  
});
