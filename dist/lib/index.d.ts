import { ElementProps, RenderElement, SvgTag, NativeElement } from "curlui/types";
type SVGAttr = {
    [key: string]: any;
};
type SVGProps = {
    tag: SvgTag;
    attr: SVGAttr;
    child?: Array<SVGProps>;
};
type IconProps = ElementProps<NativeElement>;
export declare function GenIcon(properties: SVGProps): (props: IconProps) => RenderElement;
export {};
//# sourceMappingURL=index.d.ts.map