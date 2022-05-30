export const redirect = (path: string): void => {
    window.location.pathname = path;
};
export const formatDate = (date: Date, format: string): string => {
    let formattedDate = format;

    const fullYear = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();

    formattedDate = formattedDate.replace("yyyy", fullYear.toString());
    formattedDate = formattedDate.replace("MM", month.toString().padStart(2, "0"));
    formattedDate = formattedDate.replace("dd", day.toString().padStart(2, "0"));
    if (formattedDate.includes("apm")) formattedDate = formattedDate.replace("hh", (hours - 12).toString());
    formattedDate = formattedDate.replace("hh", hours.toString().padStart(2, "0"));
    formattedDate = formattedDate.replace("mm", minutes.toString().padStart(2, "0"));
    formattedDate = formattedDate.replace("ss", seconds.toString().padStart(2, "0"));
    formattedDate = formattedDate.replace("ms", milliseconds.toString().padStart(3, "0"));
    formattedDate = formattedDate.replace("yy", fullYear.toString().substr(2, 2));
    formattedDate = formattedDate.replace("apm", hours >= 12 ? "pm" : "am");

    return formattedDate;
};

export const parseTemplateParameters = (
    parameters: {
        [key: string]: {
            name: string;
            withTitle: boolean;
            boldTitle: boolean;
            order: number;
        };
    }, 
    inputs?: {
        [key: string]: string;
    }
): string => {
    return Object.values(parameters || {}).map(parameter => {
        const parameterInput = inputs ? inputs[parameter.name] : "";
        if(parameter.withTitle) {
            let parameterText = "";

            parameterText = parameter.name + ":";
            if (parameter.boldTitle) {
                parameterText = `**${parameter.name}:**`;
            };

            return `${parameterText} ${parameterInput}`;
        } else {
            return parameterInput;
        };
    }).join("\\n");
};