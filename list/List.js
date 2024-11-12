import obj from "./food.json" with { type: "json" };
import data2 from "./foodList.json" with { type: "json" };
   

for (const key in obj) {
  console.log(`${key}:`);
  obj.forEach(item => {
      console.log(`\tName: ${item.name}`);
    
      var obj2 = item.nutrition
      if (obj2)
        obj2.forEach(item2 => {
        item2.energy? console.log(`\Energy: ${item2.energy}`):item2
        }  
})