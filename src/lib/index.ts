import { CreateElement, CreateComponent } from "curlui";
import {
    CurlUIElementProps,
    CurlUIRenderElement,
    CurlUISvgTag,
    CurlUINativeElement,
} from "curlui/types";

type SVGAttr = {
    [key: string]: any;
    // (props : KUIElementProps) {
};

type SVGProps = {
    tag: CurlUISvgTag;
    attr: SVGAttr;
    child?: Array<SVGProps>;
};

type CustomSVGProps = SVGProps & CurlUIElementProps<CurlUINativeElement>;

function parseAttributes(attributes: CurlUIElementProps<CurlUINativeElement>) {
    let parsed: CurlUIElementProps<CurlUINativeElement> = {};
    Object.keys(attributes).map((k) => {
        if (["tag", "attr"].includes(k)) {
            return;
        }
        parsed[k] = attributes[k];
    });
    if (
        attributes.style &&
        attributes.style.fontSize &&
        attributes.style.fontSize.endsWith("px")
    ) {
        let s = attributes.style.fontSize.slice(0, -2);
        parsed.width = s;
        parsed.height = s;
    } else {
        parsed.width = attributes.width || "25px";
        parsed.height = attributes.height || "25px";
    }
    return parsed;
}

function parseCustomStyles(properties: CustomSVGProps) {
    if (properties.style && properties.style.color) {
        if (properties.attr["fill"] == "currentColor") {
            properties.attr.fill = properties.style.color;
        } else if (properties.attr["stroke"] == "currentColor") {
            properties.attr.stroke = properties.style.color;
        } else {
            properties.attr.fill = properties.style.color;
        }
    }
}

function createSvg(properties: CustomSVGProps): CurlUIRenderElement {
    let children: Array<SVGProps> = properties.child || [];

    parseCustomStyles(properties);

    return children.length < 1
        ? CreateElement(properties.tag, properties.attr)
        : CreateElement(
              properties.tag,
              { ...properties.attr, ...parseAttributes(properties) },
              ...children.map((x) => {
                  return createSvg(x);
              })
          );
}

export function GenIcon(
    properties: SVGProps
): (props: CurlUIElementProps<CurlUINativeElement>) => CurlUIRenderElement {
    return CreateComponent({
        render() {
            let props: CustomSVGProps = this.getProps();
            return createSvg({ ...properties, ...props });
        },
    });
}
