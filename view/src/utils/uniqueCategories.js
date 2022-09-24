export default function getUniqueCategories(arr) {
  const uniqueArray = [];
  arr.forEach(ele => {
    //if product category is not in array add the category
    if (uniqueArray.indexOf(ele.category) === -1) {
      uniqueArray.push(ele.category);
    }
  });
  //unique category array
  return uniqueArray;
}
