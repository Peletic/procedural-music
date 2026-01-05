const fs = require("node:fs")
const path = require("node:path");

function readNames() {
    const media = fs.readdirSync(path.join(__dirname, "..", "public"))
    console.log(media)
    const json = Object.fromEntries(media.map((name) => [name, {
        author: "",
        author_link: "",
        source_link: "",
        license_name: "",
        license_link: "",
        license_prepend: ""
    }]))
    fs.writeFileSync("license_json_" + Date.now() + ".json", JSON.stringify(json, undefined, 4))
}

//readNames()

function transformJSON(filename) {
    const json = JSON.parse(fs.readFileSync(path.join(__dirname, filename), "utf-8"))
    console.log(Object.entries(json))
    const entries = Object.entries(json).map(([entryName, entry]) => entryToString(entryName, entry))
    const str = entries.join("\n")

    fs.writeFileSync("CREDITS_" + Date.now() + ".md", str)
}

function entryToString(entryName, entry) {
    let item = `[${entryName}](${entry["source_link"]})`

    let author = ""
    if (!entry["author"]) {
        author = "an unknown Wikimedia User"
    } else if (entry["author"].toLowerCase().includes("apple")) {
        author = `${entry["author"]}`
    } else {
        if (!entry["author_link"]) {
            author = `Wikimedia user ${entry["author"]}`
        } else if (entry["author_link"].toLowerCase().includes("github")) {
            author = `[Github user ${entry["author"]}](${entry["author_link"]})`
        } else {
            author = `[Wikimedia user ${entry["author"]}](${entry["author_link"]})`
        }
    }

    let license = ""

    if (!entry["license_prepend"]) {
        license += `${entry["license_prepend"]} `
    }
    if (!entry["license_link"]) {
        license += `${entry["license_name"]}`
    } else {
        license += `[${entry["license_name"]}](${entry["license_link"]})`
    }

    return `"${item}" by ${author} under ${license} <br>`
}

transformJSON("license_json_1767643194576.json")