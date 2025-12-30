import {matchingScales} from "@/src/helpers/scales";
import {MajorScale} from "@/src/units/scale";

console.log(matchingScales([0, 2, 7]).map((scale) => scale.toString()))