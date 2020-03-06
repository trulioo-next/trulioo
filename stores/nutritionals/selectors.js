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

				nutritionals.push(defaultFields(state.nutritionals.menuItems[i].title,false))
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
					//if(state.nutritionals.menuItems[i].terms[0].slug === taxName ) {
						if(state.nutritionals.menuItems[i].acf) {
							nutritionals.push(defaultFields(
								state.nutritionals.menuItems[i].title,
								state.nutritionals.menuItems[i].terms[0].slug,
								state.nutritionals.menuItems[i].acf))
						} else {
							nutritionals.push(defaultFields(
								state.nutritionals.menuItems[i].title,
								state.nutritionals.menuItems[i].terms[0].slug,
								false))
						}
					// }
				}
				
			}
		}	
	 
   		return nutritionals
	}
 }

 function defaultFields(title,term,obj) {
  
 	let payload = {
		flavour: title,
		additional_information: obj.additional_information || '0',
		serving_size: obj.serving_size || '0',
		calories: obj.calories || '0',
		total_fat: obj.total_fat || '0',
		trans_fat: obj.trans_fat || '0',
		cholesterol: obj.cholesterol || '0',
		sodium: obj.sodium || '0',
		carbohydrates: obj.carbohydrates || '0',
		dietary_fibre: obj.dietary_fibre || '0',
		sugars: obj.sugars || '0',
		protein: obj.protein || '0',
		vitamin_a: obj.vitamin_a || '0',
		vitamin_c: obj.vitamin_c || '0',
		calcium: obj.calcium || '0',
		iron: obj.iron || '0',
		term: term || false
	}
	return payload;
 }
 
 
export default {
  nutritionalsSelector,
  nutritionalByTaxonomySelector
}
