import { CreateElement, CreateComponent } from "curlui";
function parseAttributes(attributes) {
    let parsed = {};
    Object.keys(attributes).map((k) => {
        if (["tag", "attr"].includes(k)) {
            return;
        }
        parsed[k] = attributes[k];
    });
    if (attributes.style &&
        attributes.style.fontSize &&
        attributes.style.fontSize.endsWith("px")) {
        let s = attributes.style.fontSize.slice(0, -2);
        parsed.width = s;
        parsed.height = s;
    }
    else {
        parsed.width = attributes.width || "25px";
        parsed.height = attributes.height || "25px";
    }
    return parsed;
}
function parseCustomStyles(properties) {
    if (properties.style && properties.style.color) {
        if (properties.attr["fill"] == "currentColor") {
            properties.attr.fill = properties.style.color;
        }
        else if (properties.attr["stroke"] == "currentColor") {
            properties.attr.stroke = properties.style.color;
        }
        else {
            properties.attr.fill = properties.style.color;
        }
    }
}
function createSvg(properties) {
    let children = properties.child || [];
    parseCustomStyles(properties);
    return children.length < 1
        ? CreateElement(properties.tag, properties.attr)
        : CreateElement(properties.tag, Object.assign(Object.assign({}, properties.attr), parseAttributes(properties)), ...children.map((x) => {
            return createSvg(x);
        }));
}
export function GenIcon(properties) {
    return CreateComponent({
        render() {
            let props = this.getProps();
            return createSvg(Object.assign(Object.assign({}, properties), props));
        },
    });
}
//# sourceMappingURL=index.js.map