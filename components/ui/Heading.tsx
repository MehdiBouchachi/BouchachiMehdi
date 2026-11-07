import type {HTMLAttributes,ReactNode} from 'react';

type HeadingLevel=1|2|3|4|5|6;
type HeadingVariant='hero'|'section'|'page'|'feature'|'card'|'subsection'|'small';
type Props=HTMLAttributes<HTMLHeadingElement>&{level:HeadingLevel;variant?:HeadingVariant;children:ReactNode};

export default function Heading({level,variant,children,className='',...props}:Props){
 const Tag=`h${level}` as 'h1'|'h2'|'h3'|'h4'|'h5'|'h6';
 const resolved=variant??({1:'hero',2:'section',3:'card',4:'subsection',5:'small',6:'small'} as const)[level];
 return <Tag className={`ui-heading ui-heading--${resolved} ${className}`.trim()} {...props}>{children}</Tag>;
}
