import _ from 'lodash';

const array = [
    {
        groupId: 'groupId1',
        subgroupId: 'subgroupId1',
        name: 'name1'
    },
    {
        groupId: 'groupId1',
        subgroupId: 'subgroupId2',
        name: 'name2'
    },
    {
        groupId: 'groupId2',
        subgroupId: 'subgroupId1',
        name: 'name3'
    },
    {
        groupId: 'groupId2',
        subgroupId: 'subgroupId2',
        name: 'name4'
    }
];

const group = _.groupBy(array, (item) => item.groupId);
const subgroup = _.mapValues(group, (group) => _.groupBy(group, (item) => item.subgroupId));

console.log(group);
console.log(JSON.stringify(subgroup, null, 2));
