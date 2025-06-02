import * as fs from 'fs';
import path from "node:path";

const stdin = process.argv.slice(2)
if (stdin.length !== 1) {
    console.error('Expected one argument: Path of the folder that contains all portals');
    process.exit(1);
}
let portalPath = stdin[0];
searchPortals(portalPath);

function searchPortals(portalPath: string) {
    fs.readdir(portalPath, (err, filenames) => {
        handleFileReadError(err, 'Error reading file:')

        for (const file of filenames) {
            const filePath = path.join(portalPath, file)
            fs.stat(filePath, (err, stat) => {
                handleFileReadError(err, 'Error reading file:')

                if (stat.isDirectory()) {
                    const configJson = path.join(filePath, "config.json")
                    generatePortalIndex(configJson)
                }
            })
        }
    });
}

function generatePortalIndex(path: string) {
    console.log(path)
    fs.readFile(path, {encoding: "utf-8"}, (err, data) => {
        handleFileReadError(err, 'Error reading file content:');

        const regex = new RegExp("\"id\": \"[a-z][A-Z]\d\"")
        console.log(regex.exec(data))
    })
}

function handleFileReadError(err: NodeJS.ErrnoException | null, msg: string) {
    if (err) {
        console.error(msg, err)
        return;
    }
}
