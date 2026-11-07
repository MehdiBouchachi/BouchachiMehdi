import type {HTMLAttributes,ReactNode} from 'react';

type TextVariant='body'|'lead'|'intro'|'small'|'caption'|'overline';
type Props=HTMLAttributes<HTMLElement>&{as?:'p'|'span'|'small'|'div';variant?:TextVariant;children:ReactNode};

export default function Text({as='p',variant='body',children,className='',...props}:Props){
 const Tag=as;
 return <Tag className={`ui-text ui-text--${variant} ${className}`.trim()} {...props}>{children}</Tag>;
}
