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

const [rows] = await table.getRows({
    filter: {
        column: ['columnQualifier1'],
        value: {
            start: 1,
            end: 1
        }
    }
});
const data = rows.map((row) => row.data);

console.log(rows.length);
console.log(JSON.stringify(data, null, 2));
