import { CurlUIElementProps, CurlUIRenderElement, CurlUISvgTag, CurlUINativeElement } from "curlui/types";
type SVGAttr = {
    [key: string]: any;
};
type SVGProps = {
    tag: CurlUISvgTag;
    attr: SVGAttr;
    child?: Array<SVGProps>;
};
export declare function GenIcon(properties: SVGProps): (props: CurlUIElementProps<CurlUINativeElement>) => CurlUIRenderElement;
export {};
//# sourceMappingURL=index.d.ts.map