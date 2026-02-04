import { CreateElement, CreateComponent } from "curlui";
function parseAttributes(attributes) {
    if (attributes.style && attributes.style.fontSize) {
        let s = attributes.style.fontSize;
        attributes.style.width = s;
        attributes.style.height = s;
    }
    if (!attributes.style) {
        attributes.style = {};
    }
    attributes.style.width = attributes.style.width || "15px";
    attributes.style.height = attributes.style.height || "15px";
    return Object.assign({}, attributes);
}
export function GenIcon(properties) {
    return CreateComponent({
        render() {
            let props = this.getProps(), parsedProps = parseAttributes(props);
            return CreateElement("svg", Object.assign(Object.assign({ fill: "currentColor", stroke: "currentColor", "stroke-width": "0" }, properties.attr), parsedProps), ...(properties.child || []).map((t) => {
                return CreateElement(t.tag, Object.assign({}, t.attr));
            }));
        },
    });
}
//# sourceMappingURL=index.js.map