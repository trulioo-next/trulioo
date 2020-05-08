

export default () => {
 
	let provinces = [
      { name: '', value: '' },
      { name: 'Alberta', value: 'AB' },
      { name: 'British Columbia', value: 'BC' },
      { name: 'Manitoba', value: 'MB' },
      { name: 'New Brunswick', value: 'NB' },
      { name: 'Newfoundland & Labrador', value: 'NL' },
      { name: 'Northwest Territories', value: 'NT' },
      { name: 'Nova Scotia', value: 'NS' },
      { name: 'Nunavut', value: 'NU' },
      { name: 'Ontario', value: 'ON' },
      { name: 'Prince Edward Island', value: 'PE' },
      { name: 'Québec', value: 'QC' },
      { name: 'Saskatchewan', value: 'SK' },
      { name: 'Yukon', value: 'YT' },
    ];

    let genders = [
      { name: 'Prefer not to say', value: '' },
      { name: 'Male', value: 'Male' },
      { name: 'Female', value: 'Female' },
    ];

    let months = [
      { name: 'Month', value: '' },
      { name: 'Jan', value: '01' },
      { name: 'Feb', value: '02' },
      { name: 'Mar', value: '03' },
      { name: 'Apr', value: '04' },
      { name: 'May', value: '05' },
      { name: 'Jun', value: '06' },
      { name: 'Jul', value: '07' },
      { name: 'Aug', value: '08' },
      { name: 'Sep', value: '09' },
      { name: 'Oct', value: '10' },
      { name: 'Nov', value: '11' },
      { name: 'Dec', value: '12' },
    ];

    let days = [{ name: 'Day', value: '' }];
    for (var i = 0; i < 31; i++) {
    	let val = (i.toString().length < 2) ? "0"+i: i;
    	if(i > 0) {
      		days.push({ name:val, value:val });
  		}
    }

    let years = [{ name: 'Year', value: '' }];
    for (var i = 0; i < 100; i++) {
      let year = 2020 - i;
      years.push({ name: year, value: year });
    }

 return {provinces,genders,months,days,years}

};
