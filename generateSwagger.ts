import fs from 'fs'
import yaml from 'yaml'


import swaggerSpec from './config/swaggerConfig'

export function generateSwaggerDoc(outputFilePath): void {
    const yamlString = yaml.stringify(swaggerSpec)

    fs.writeFile(outputFilePath, yamlString, (err) => {
        if (err != null) {
            console.log('Error writing Swagger YAML file:', err)
        } else {
            console.log('Swagger YAML file generated:', outputFilePath)
        }
    })
}