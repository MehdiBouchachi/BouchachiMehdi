const fs=require('fs');const vm=require('vm');let ts;try{ts=require('typescript')}catch{ts=require('/opt/nvm/versions/node/v22.16.0/lib/node_modules/typescript');}
const source=fs.readFileSync(__dirname+'/data/site.ts','utf8');
const js=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS}}).outputText;
const context={exports:{}};vm.runInNewContext(js,context);
fs.writeFileSync(__dirname+'/data/site.json',JSON.stringify(context.exports,null,2));
console.log('Exported site data from TypeScript');
