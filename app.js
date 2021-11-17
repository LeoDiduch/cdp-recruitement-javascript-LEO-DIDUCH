const json = require('./data');
const data = json.data;

const util = require('util');
const args = process.argv[2];

/**
 * Filter function
 */
if (args.indexOf('--filter=') > -1) {
    const prefix = args.replace('--filter=', '');
    const filteredData = data.filter((data) => {
        data.people = data.people.filter(peopleItem => {
            peopleItem.animals = peopleItem.animals.filter(animalItem => {
                const newName = animalItem.name.indexOf(prefix);
                if (newName > -1) { return animalItem }
            });
            if (peopleItem.animals && peopleItem.animals.length > 0) { return peopleItem }
        });
        if (data.people && data.people.length > 0) { return data }
    });
    console.log(util.inspect(filteredData, false, null, true));
}

/**
 * Counter function
 */
if (args.indexOf('--count') > -1) {
    const dataWithCounter = data.map((data) => {
        data.name = data.name + ` [${data.people.length}]`;
        data.people = data.people.map(peopleItem => {
            if (peopleItem.animals && peopleItem.animals.length > 0) {
                peopleItem.name = peopleItem.name + ` [${peopleItem.animals.length}]`;
            }
            return peopleItem;
        });
        return data;
    });
    console.log(util.inspect(dataWithCounter, false, null, true));
}