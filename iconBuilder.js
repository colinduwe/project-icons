const fs = require('fs');
const path = require('path');

// Directory containing the SVG files
const iconsDir = path.join(__dirname, '/project-icons');
// Output JS file
const outputFile = path.resolve(__dirname, './dist/project-icons-built.js');

// Function to convert hyphenated filenames to Title Case
const hyphenatedToTitle = (str) =>
    str
        .replace(/-/g, ' ') // Replace hyphens with spaces
        .replace(/(^\w|\s\w)/g, (match) => match.toUpperCase()); // Capitalize the first letter of each word

function traverseDirectory(dir, categories = [], iconsMap = {}, categoriesSet = new Set()) {
    const icons = [];
    const projectCategories = new Set();

    // Read files and subdirectories in the current directory
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    entries.forEach((entry) => {
        const entryPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            // Recurse into subdirectory and add its name as a category
            const subCategoryName = path.basename(entry.name);
            const subCategoryTitle = hyphenatedToTitle(subCategoryName);
            categoriesSet.add({ name: subCategoryName, title: `'${subCategoryTitle}'` });

            const { icons: subIcons, projectCategories: subCategories } = traverseDirectory(
                entryPath,
                [...categories, subCategoryName],
                iconsMap,
                categoriesSet
            );

            // Merge the subdirectory categories into the main categories set
            subCategories.forEach(categoriesSet.add, categoriesSet);

            // Add the icons from the subdirectory
            subIcons.forEach((icon) => {
                if (iconsMap[icon.name]) {
                    // If the icon exists, merge categories
                    iconsMap[icon.name].categories = [...new Set([...iconsMap[icon.name].categories, ...icon.categories])];
                } else {
                    iconsMap[icon.name] = icon;
                }
            });
        } else if (entry.isFile() && entry.name.endsWith('.svg')) {
            // Process the SVG file
            const iconName = path.basename(entry.name, '.svg');
            let svgContent = fs.readFileSync(entryPath, 'utf8');

            // Replace self-closing tags with open/close tags
            svgContent = svgContent
                .replace(/<(\w+)([^>]*)\/>/g, '<$1$2></$1>') // Self-closing tags
                .replace(/\s+/g, ' ') // Remove excess whitespace
                .replace(/(\r?\n|\r)/g, '') // Remove line breaks
                .trim();

            // // Remove height and width attributes, if present
            // svgContent = svgContent.replace(/\s*(height|width)="[^"]*"/g, '');

            // // Ensure required attributes exist or are added
            // if (!/viewBox=/.test(svgContent)) {
            //     throw new Error(`SVG file ${fileName} is missing a viewBox attribute.`);
            // }

            // Add aria-hidden and focusable attributes if missing
            if (!/aria-hidden=/.test(svgContent)) {
                svgContent = svgContent.replace('<svg', '<svg aria-hidden="true"');
            }
            if (!/focusable=/.test(svgContent)) {
                svgContent = svgContent.replace('<svg', '<svg focusable="false"');
            }

            // Ensure xmlns is not duplicated
            if (!/xmlns=/.test(svgContent)) {
                svgContent = svgContent.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
            }

            // If the icon already exists, append new categories
            if (iconsMap[iconName]) {
                iconsMap[iconName].categories = [...new Set([...iconsMap[iconName].categories, ...categories])];
            } else {
                // Otherwise, create a new icon entry
                iconsMap[iconName] = {
                    name: iconName,
                    title: hyphenatedToTitle(iconName),
                    icon: svgContent,
                    categories: categories,
                };
            }
        }
    });

    return { icons: Object.values(iconsMap), projectCategories: categoriesSet };
}

function buildProjectIcons() {
    const { icons, projectCategories } = traverseDirectory(iconsDir);

    // Format the categories array
    const formattedCategories = Array.from(projectCategories).map(
        (category) => `
    {
        name: '${category.name}',
        title: ${category.title}
    }`
    );

    // Generate the output file
    const outputContent = `
// Auto-generated file. Do not edit manually.

export const projectIcons = ${JSON.stringify(icons, null, 4)};

export const projectCategories = [
    ${formattedCategories.join(',\n')}
];
    `.trim();

    // Write the output file
    fs.writeFileSync(outputFile, outputContent, 'utf8');
    console.log(`Project icons and categories built to ${outputFile}`);
}

buildProjectIcons();