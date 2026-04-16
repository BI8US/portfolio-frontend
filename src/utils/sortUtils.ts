export const moveItemInArray = <T>(array: T[], index: number, direction: 'up' | 'down'): T[] => {
    if (
        (direction === 'up' && index === 0) ||
        (direction === 'down' && index === array.length - 1)
    ) {
        return array;
    }

    const newArray = [...array];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    const temp = newArray[index];
    newArray[index] = newArray[targetIndex];
    newArray[targetIndex] = temp;

    return newArray.map((item, i) => {
        if (typeof item === 'object' && item !== null) {
            return { ...item, sortOrder: i };
        }
        return item;
    });
};
