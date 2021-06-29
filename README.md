## Datalink

Steps for building:

1. Verify the values in your .env file, if necessary use .env-example values
2. In package.json and manifest.json change homepage value (default to /) to production value i.e.: binox.app/
3. When generated, remove from static folder all .map and .license files
4. From assets.manifest, remove all file references of the previous step
