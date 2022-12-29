import fs from 'fs';
import { TestObject } from './input/targetObject';

let text = '';
const outputFile = 'output/targetObject.ts';

displayConnectionValueType(TestObject, '');

fs.writeFileSync(outputFile, text, { encoding: 'utf-8' });

function displayEachValue(target: any): void {
    if (typeof target === 'object') {
        Object.keys(target).forEach((x) => {
            displayEachValue(target[x]);
        });
    } else {
        writeLine(target);
    }
}

function displayConnectionValueType(target: any, typeName: string): void {
    if (typeof target === 'object') {
        typeName = typeName ? typeName : 'tempTypeName';
        writeLine(`type ${typeName} = {`);
        recursive(target, '', typeName);
        writeLine('}');
    } else {
        writeLine(target);
    }

    function recursive(target: any, key: string, value: string): void {
        if (typeof target === 'object') {
            if (key) {
                writeLine(`readonly ${key}: {`);
            }

            Object.keys(target).forEach((x) => {
                recursive(target[x], x, `${value}-${x.toString()}`);
            });

            if (key) {
                writeLine('}');
            }
        } else {
            writeLine(`readonly ${key}: '${value}'`);
        }
    }
}

function writeLine(data: string): void {
    text += data + '\r\n';
}
