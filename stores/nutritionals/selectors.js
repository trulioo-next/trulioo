/**
 * Selectors let us factorize logic that queries the state. Selectors can be used
 * in sagas or components to avoid duplicating that logic.
 */

// Direct selector to the app state domain
 
 export const nutritionalsSelector = (state) => {
	let nutritionals = [];
	if(state.nutritionals.menuItems) {
		for(var i = 0; i < state.nutritionals.menuItems.length; i++ ) {
			if(state.nutritionals.menuItems[i].acf) {
				nutritionals.push(state.nutritionals.menuItems[i].acf)
			} else {
			// nutritionals.push(state.nutritionals.menuItems[i].acf)

				nutritionals.push(defaultBlankFields(state.nutritionals.menuItems[i].title))
			}
		} 
	}

   return nutritionals
 }


  export const nutritionalByTaxonomySelector = (taxName) => {
  	return (state) => {
		let nutritionals = []; 
		
		if(state.nutritionals.menuItems) {
			for(var i = 0; i < state.nutritionals.menuItems.length; i++ ) {
				if( state.nutritionals.menuItems[i].terms ) {
					if(state.nutritionals.menuItems[i].terms[0].slug === taxName ) {
						if(state.nutritionals.menuItems[i].acf) {
							nutritionals.push(state.nutritionals.menuItems[i].acf)
						} else {
							nutritionals.push(defaultBlankFields(state.nutritionals.menuItems[i].title))
						}
					}
				}
				
			}
		}	
	 
   		return nutritionals
	}
 }

 function defaultBlankFields(title) {

 	let empty = {
		flavour: title,
		additional_information: "0",
		serving_size: "0",
		calories: "0",
		total_fat: "0",
		trans_fat: "0",
		cholesterol: "0",
		sodium: "0",
		carbohydrates: "0",
		dietary_fibre: "0",
		sugars: "0",
		protein: "0",
		vitamin_a: "0",
		vitamin_c: "0",
		calcium: "0",
		iron: "0"
	}
	return empty;
 }

 
export default {
  nutritionalsSelector,
  nutritionalByTaxonomySelector
}
