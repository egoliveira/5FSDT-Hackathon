// @ts-ignore
export function isInteger(value): boolean {
    let isInteger = false;

    if ((value !== null) && (value !== undefined)) {
        const valueStr = value.toString();

        isInteger = /^\d+$/.test(valueStr);
    }

    return isInteger;
}