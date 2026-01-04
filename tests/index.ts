import pitchTest from "./units/pitch.test";

function runTests() {
    pitchTest()
}

//runTests()
const el = {count: 4}
console.log(el.count == 1 ? 3 : Math.ceil(Math.pow((el.count) / 4, -1)))