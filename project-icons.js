import { projectIcons, projectCategories } from './dist/project-icons-built';

// Add custom icons to the Icon Block.
wp.domReady( () => {
	const { __ } = wp.i18n;
	const { addFilter } = wp.hooks;

    const projectIconType = [
        {
            isDefault: true,
            type: 'project-icons',
            title: __( 'project Icons', 'project-icons' ),
            icons: projectIcons,
            categories: projectCategories,
        },
    ];

    function addProjectIcons ( icons ) {

        const allIcons = [].concat( projectIconType, icons );

        console.log( allIcons );

        return allIcons;
    }

    // Update the filter after loading the JSON
    addFilter(
        'iconBlock.icons',
        'project-icons/add-project-icons',
        addProjectIcons
    );
	
} );