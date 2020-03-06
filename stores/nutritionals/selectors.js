/**
 * Selectors let us factorize logic that queries the state. Selectors can be used
 * in sagas or components to avoid duplicating that logic.
 */

// Direct selector to the app state domain
 
 export const nutritionalsSelector = (state) => {
	let nutritionals = [];
	 
	 for(var i = 0; i < state.nutritionals.menuItems.length; i++ ) {
		if(state.nutritionals.menuItems[i].acf) {
			nutritionals.push(state.nutritionals.menuItems[i].acf)
		} else {
			// nutritionals.push(state.nutritionals.menuItems[i].acf)
			let empty = {
				flavour: state.nutritionals.menuItems[i].title,
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
			nutritionals.push(empty)
		}
	 } 

   return nutritionals
 }


  export const nutritionalByTaxonomySelector = (taxName) => {
  	return (state) => {
		let nutritionals = [];

		// console.log('state.nutritionals.menuItems', state.nutritionals.menuItems )
		
		if(state.nutritionals.menuItems) {
			for(var i = 0; i < state.nutritionals.menuItems.length; i++ ) {
				if( state.nutritionals.menuItems[i].terms ) {
					// console.log('TERM ::>>> ', state.nutritionals.menuItems[i].terms[0].slug )
					if(state.nutritionals.menuItems[i].terms[0].slug === taxName ) {
						nutritionals.push(state.nutritionals.menuItems[i].acf)
					}
				}
				
			}
		}	
	 
		  

   		return nutritionals
	}
 }

 
export default {
  nutritionalsSelector,
  nutritionalByTaxonomySelector
}
