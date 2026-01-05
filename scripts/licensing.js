const fs = require("node:fs")
const path = require("node:path");

function readNames() {
    const media = fs.readdirSync(path.join(__dirname, "..", "public"))
    console.log(media)
    const json = Object.fromEntries(media.map((name) => [name, {author: "", author_link: "", source_link: "", license_name: "", license_link: "", license_prepend: ""}]))
    fs.writeFileSync("license_json_" + Date.now() + ".json", JSON.stringify(json, undefined, 4))
}

readNames()