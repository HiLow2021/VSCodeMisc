import { Bigtable } from '@google-cloud/bigtable';

console.log(`Accessing Bigtable Emulator: ${process.env.BIGTABLE_EMULATOR_HOST}`);

const instanceId = 'dev';
const tableId = 'dev';

const bigtable = new Bigtable();
const instance = bigtable.instance(instanceId);

const [tableExists] = await instance.table(tableId).exists();
if (!tableExists) {
    instance.createTable(tableId, { families: ['columnFamily1', 'columnFamily2'] });
}

const now = new Date().getTime();
const table = instance.table(tableId);
await table.insert([
    {
        key: `key#${now}`,
        data: {
            columnFamily1: { columnQualifier1: 123 },
            columnFamily2: { columnQualifier2: 'abc' }
        }
    }
]);

const [rows] = await table.getRows();
const data = rows.map((row) => row.data);

console.log(JSON.stringify(data, null, 2));
