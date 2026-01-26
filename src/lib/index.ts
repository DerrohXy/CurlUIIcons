import { CreateElement, CreateComponent } from "curlui";
import {
    CurlUIElementProps,
    CurlUIRenderElement,
    CurlUISvgTag,
    CurlUINativeElement,
} from "curlui/types";

type SVGAttr = {
    [key: string]: any;
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

    if (attributes.style && attributes.style.fontSize) {
        let s = attributes.style.fontSize;

        parsed.width = s;
        parsed.height = s;
    } else {
        parsed.width = attributes.width || "15px";
        parsed.height = attributes.height || "15px";
    }

    return parsed;
}

function createSvg(properties: CustomSVGProps): CurlUIRenderElement {
    let children: Array<SVGProps> = properties.child || [];

    if (properties.tag === "svg") {
        properties.attr.fill = "currentColor";
        properties.attr.stroke = "currentColor";

        if (properties.style) {
            if (!properties.style.color) {
                properties.style.color = "currentColor";
            }
        } else {
            properties.style = { color: "currentColor" };
        }
    }

    return children.length < 1
        ? CreateElement(properties.tag, properties.attr)
        : CreateElement(
              properties.tag,
              { ...properties.attr, ...parseAttributes(properties) },
              ...children.map((x) => {
                  return createSvg(x);
              }),
          );
}

export function GenIcon(
    properties: SVGProps,
): (props: CurlUIElementProps<CurlUINativeElement>) => CurlUIRenderElement {
    return CreateComponent({
        render() {
            let props: CustomSVGProps = this.getProps();
            return createSvg({ ...properties, ...props });
        },
    });
}
