export function camelCaseToSnakeCase(word: string){
    return word.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
}

export function snakeCaseToCamelCase(word: string){
    return word.replace(/(\_[a-z])/g, function(match){
        return match.toUpperCase().replace("_","");
    });
}
