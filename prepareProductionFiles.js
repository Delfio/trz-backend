const { rename, readFile } = require('fs/promises');
const path = require('path');

const typeormProductionConfigurationFilePath = path.resolve('.production-ormconfig.json')
const typeormDevelopmentConfigurationFilePath = path.resolve('ormconfig.json')

;
( async() => {
    await rename(typeormDevelopmentConfigurationFilePath, 'ormconfig.bcp.json')
    await rename(typeormProductionConfigurationFilePath, 'ormconfig.json')
})()
