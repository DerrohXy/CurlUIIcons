import { CreateElement, CreateComponent } from "curlui";
function parseAttributes(attributes) {
    let parsed = {};
    if (attributes.style && attributes.style.fontSize) {
        let s = attributes.style.fontSize;
        parsed.width = s;
        parsed.height = s;
    }
    else {
        parsed.width = attributes.width || "15px";
        parsed.height = attributes.height || "15px";
    }
    return parsed;
}
export function GenIcon(properties) {
    return CreateComponent({
        render() {
            let props = this.getProps(), parsedProps = parseAttributes(props);
            return CreateElement("svg", Object.assign(Object.assign({ fill: "currentColor", stroke: "currentColor", strokeWidth: "0" }, properties.attr), parsedProps), ...(properties.child || []).map((t) => {
                return CreateElement(t.tag, Object.assign({}, t.attr));
            }));
        },
    });
}
//# sourceMappingURL=index.js.map