import { Bigtable } from '@google-cloud/bigtable';

console.log(`Accessing Bigtable Emulator: ${process.env.BIGTABLE_EMULATOR_HOST}`);

const instanceId = 'dev';
const tableId = 'dev';

// 実際の Bigtable インスタンスにアクセスするには、プロジェクトIDと認証情報が必要。
// const projectId = 'your-project-id';
// const keyFilename = '/path/to/your-service-account-file.json';
// const bigtable = new Bigtable({ projectId, keyFilename });

const bigtable = new Bigtable();
const instance = bigtable.instance(instanceId);

const [tableExists] = await instance.table(tableId).exists();
if (!tableExists) {
    instance.createTable(tableId, { families: ['columnFamily1', 'columnFamily2'] });
}

const table = instance.table(tableId);

const now1 = new Date().getTime();
await table.insert([
    {
        key: `key#${now1}`,
        data: {
            columnFamily1: { columnQualifier1: 123 },
            columnFamily2: { columnQualifier2: 'abc' }
        }
    }
]);

const now2 = new Date().getTime();
await table.insert([
    {
        key: `key#${now2}`,
        data: {
            columnFamily1: { columnQualifier1: 456 },
            columnFamily2: { columnQualifier2: 'def' }
        }
    }
]);

const [rows] = await table.getRows();
const data = rows.map((row) => row.data);

console.log(JSON.stringify(data, null, 2));
