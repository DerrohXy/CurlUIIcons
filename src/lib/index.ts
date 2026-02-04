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
    let parsed: IconProps = {};

    if (attributes.style && attributes.style.fontSize) {
        let s = attributes.style.fontSize;

        parsed.width = s;
        parsed.height = s;
    } else {
        parsed.width = attributes.width || "15px";
        parsed.height = attributes.height || "15px";
    }

    return { ...parsed, ...attributes };
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
