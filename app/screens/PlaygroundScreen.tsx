import MeasureComponent from "@/app/components/MeasureComponent";
import {Measure, Position} from "@/src/units/measure";
import {Note} from "@/src/units/note";
import {Beat} from "@/src/units/beat";

export default function PlaygroundScreen() {
    const testMeasure = new Measure();

    testMeasure.put(new Note("C4", new Beat("1/3")), Position.of("1::3"))
    testMeasure.put(new Note("D4", new Beat("1/3")), Position.of("2::3"))
    testMeasure.put(new Note("E4", new Beat("1/3")), Position.of("3::3"))
    testMeasure.put(new Note("F4", new Beat("1/3")), Position.of("4::3"))

    const testMeasureTwo = new Measure();

    testMeasureTwo.put(new Note("G4", new Beat("1/3")), Position.of("1::3"))
    testMeasureTwo.put(new Note("A4", new Beat("1/3")), Position.of("2::3"))
    testMeasureTwo.put(new Note("B4", new Beat("1/3")), Position.of("3::3"))
    testMeasureTwo.put(new Note("C5", new Beat("1/3")), Position.of("4::3"))
    
    const testMeasureThree = new Measure();

    testMeasureThree.put(new Note("D5", new Beat("1/3")), Position.of("1::3"))
    testMeasureThree.put(new Note("E5", new Beat("1/3")), Position.of("2::3"))
    testMeasureThree.put(new Note("F5", new Beat("1/3")), Position.of("3::3"))
    testMeasureThree.put(new Note("G5", new Beat("1/3")), Position.of("4::3"))

    return (<>
        <div className={"bg-white text-black w-[50em] h-[120em] flex flex-row content-center justify-center align-middle pt-7"}>
            <MeasureComponent value={testMeasure}/>
            <MeasureComponent value={testMeasureTwo}/>
            <MeasureComponent value={testMeasureThree}/>
        </div>
    </>)
}