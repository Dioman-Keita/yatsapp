/**
 *
 * @param name {string | null | undefined}
 * * the function take the bouth first character in name
 * @returns {string | undefined}
 */
export function profileNameAb(name: string | null | undefined) {
    if (!name) return;
    const arrayName = name.split(" ");
    const firstPart = arrayName[0][0];
    const secondPart = arrayName[1] ? arrayName[1][0] : "";
    return ` ${firstPart.toUpperCase()}${secondPart.toUpperCase()}`;
}
