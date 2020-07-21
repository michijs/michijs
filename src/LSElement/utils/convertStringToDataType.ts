export function convertStringToDataType(newValue: string) {
    const intValue = parseInt(newValue);
    switch (true) {
        case newValue === '':
        case newValue === 'true': {
            return true;
        }
        case newValue === 'false': {
            return false;
        }
        case !Number.isNaN(intValue): {
            return intValue;
        }
        default: {
            return newValue;
        }
    }
}