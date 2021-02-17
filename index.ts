const to_require = process.argv[2];
const needle = process.argv[3]||'';
if (!to_require||!needle)
{
    console.log('usage: module_tree /path/to/require/file.js some_module.js');
    process.exit(1);
}
console.log('requiring "%s"', to_require);
console.log('searching "%s"', needle);
require(to_require);

const memorySet = new Set();

function findPath(mod: NodeModule, parents: NodeModule[] = []): NodeModule[]|undefined {
    const newParents = [mod].concat(parents);
    memorySet.add(mod);
    if (mod.id.includes(needle)) {
        return newParents;
    }
    if (mod.children.length) {
        for (const child of mod.children) {
            if (memorySet.has(child))
                continue;
            const path = findPath(child, newParents);
            if (path) {
                return path;
            }
        }
    }
    return undefined;
}

function fmtPath(mod: NodeModule[]): string {
    return mod.map(m=>m.id).reverse().slice(1)
        .map((s, i)=>'  '.repeat(i)+s).join('\n');
}

const path = findPath(module);
if (path)
    console.log(fmtPath(path));
