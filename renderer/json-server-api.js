const faker = require('faker')
const shortid = require('shortid')
const casual = require('casual');
const _ = require('lodash')

const streetAbbreviations = ['Ally', 'Arc', 'Ave', 'Bvd', 'Bypa', 'Cct', 'Cl', 'Crn', 'Ct', 'Cres', 'Cds', 'Dr', 'Esp', 'Grn', 'Gr', 'Hwy', 'Jnc', 'Lane', 'Link', 'Mews', 'Pde', 'Pl', 'Rdge', 'Rd', 'Sq', 'St', 'Tce']

module.exports = () => {
	const data = {address: []}
	// Create 1000 users
	for (let i = 0; i < 1000; i++) {
		faker.locale = "en_AU"
		const postcode = faker.address.zipCode()
		const streetNumber1 = _.random(1, 400)
		const streetName = faker.name.lastName()
		const streetType = streetAbbreviations[_.random(0, streetAbbreviations.length - 1)]
		const localityName = faker.address.city()
		const stateTerritory = faker.address.stateAbbr()
		data.address.push({
			id: shortid.generate(),
			formattedAddress: `${streetNumber1} ${streetName} ${streetType}, ${localityName} ${stateTerritory} ${postcode}`/*'113 CANBERRA AV, GRIFFITH ACT 2603'*/,
			localityName,
			postcode,
			stateTerritory,
			streetName,
			streetNumber1,
			streetType
		})
	}
	return data
}

