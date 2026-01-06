import {Dispatch} from "react";
import BooleanConfigField from "@/components/config/BooleanConfigField";
import NumberConfigField from "@/components/config/NumberConfigField";
import ArrayConfigField from "@/components/config/ArrayConfigField";
import ObjectConfigField from "@/components/config/ObjectConfigField";
import StringConfigField from "@/components/config/StringConfigField";

export default function ConfigField({entry, setEntry, title}: { entry: any, setEntry: Dispatch<any>, title?: string }) {
    switch (typeof entry) {
        case "boolean":
            return (<>
                <BooleanConfigField key={`${title}:${entry}`} value={entry} setValue={setEntry} title={title}/>
            </>)
        case "number":
            return (<>
                <NumberConfigField key={`${title}:${entry}`} value={entry} setValue={setEntry} title={title}/>
            </>)
        case "string":
            return (<>
                <StringConfigField key={`${title}:${entry}`} value={entry} setValue={setEntry} title={title}/>
            </>)
        case "object":
            if (Object.prototype.toString.call(entry) === '[object Array]') {
                return (<>
                    <ArrayConfigField key={`${title}:${entry}`} value={entry} setValue={setEntry} title={title}/>
                </>)
            } else {
                return (<>
                    <ObjectConfigField key={`${title}:${entry}`} value={entry} setValue={setEntry} title={title}/>
                </>)
            }
    }
    return (<>

    </>)
}