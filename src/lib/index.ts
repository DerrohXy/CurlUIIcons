import { CreateElement, CreateComponent } from "curlui";
import {
    ElementProps,
    RenderElement,
    SvgTag,
    NativeElement,
} from "curlui/types";

type SVGAttr = {
    [key: string]: any;
};

type SVGProps = {
    tag: SvgTag;
    attr: SVGAttr;
    child?: Array<SVGProps>;
};

type IconProps = ElementProps<NativeElement>;

function parseAttributes(attributes: IconProps) {
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

    return { ...attributes };
}

export function GenIcon(
    properties: SVGProps,
): (props: IconProps) => RenderElement {
    return CreateComponent<IconProps>({
        render() {
            let props: IconProps = this.getProps(),
                parsedProps = parseAttributes(props);

            return CreateElement(
                "svg",
                {
                    fill: "currentColor",
                    stroke: "currentColor",
                    "stroke-width": "0",
                    ...properties.attr,
                    ...parsedProps,
                },
                ...(properties.child || []).map((t) => {
                    return CreateElement(t.tag, { ...t.attr });
                }),
            );
        },
    });
}
