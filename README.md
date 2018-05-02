This theme is an example theme, upon which all new themes should be based.

# Directory Structure

There are a few standard files that the theme loader looks for.

### `config.yml`

Declares information about the theme to the backend, such as theme versioning and feature support. There are a few required attributes that you should be aware of.

- `api_version` specifies the version of the theme API to use.
- `history` is a changelog for each version of the theme. The text in this hash is shown to users for non-automatic upgrades, so ensure that the text in here is understandable by end users.
- `support` is a hash of what features are supported as of what version
- `can_automatically_upgrade_to_versions` lists versions that are "automatic" upgrades. These upgrades are bug fixes or other changes that do not affect the appearance of user sites.

### `meta.yml`

Declares user-visible theme information, such as theme title, preview image location, and categorization.

- `name` defines the name of the theme, used throughout the UI.
- `description` is an explanation of the theme. Currently not used anywhere on Format, his attribute is being kept around for future compatibility.
- `skins` defines the names and id's of variable presets (formerly known as skins). All themes should have at least two skins, most commonly a "light" and a "dark" skin.
- `default_skin` defines the id of the above skin that should be the "default" for a theme.
- `preview_images` defines paths (relative to the theme root) of theme preview images, used in both the [customizer](http://format.com/site/design) and in the [in-app theme switcher](http://format.com/site/design/themes).
- `preview_site_images` defines paths to images for the demo site (eg. [ora.format.com](http://ora.format.com))
- `filter_attributes` is a list of categories (vertical, slideshow, tiled, etc.) that the theme's design falls under. Used for the filtering mechanisms on both the [marketing site](http://format.com/themes) and in the [in-app theme switcher](http://format.com/site/design/themes).
- `using_position` *(optional)* overwrites the default position and color of the "Using Format" link. Leave this attribute out, unless the theme specifically needs it adjusted.

### `variables.yml`

Defines all editable variables for a theme.

### `assets/`

Holds arbitrary theme assets, such as stylesheets, javascript, or image assets. Commonly used assets include jQuery, blank pixels (for lazyloading), and a `theme.js` file for theme functionality.

Try to reduce the number of image assets used in a theme. Elements such as arrows for slideshows should be drawn using CSS wherever possible.

As well, these files are uploaded to S3 upon deployment, so niceties such as Liquid are not available to items in this folder.

### `templates/`

Contains all theme templates.

**Required:**
- `gallery.html.liquid` is for gallery pages
- `listing.html.liquid` is for listing pages
- `basic.html.liquid` is for title pages
- `simple.html.liquid` is for content pages
- `stylesheet.css.liquid` or `stylesheet.scss.liquid` is the theme stylesheet

**Optional:**
- `blog.html.liquid` is for all blog pages (tags, search, index, single)
- Any template with the extension `.json.liquid` provides a JSON response for URLs with `.json` appended, or when the `Accepts` header is set to JSON. Used in AJAX themes.
