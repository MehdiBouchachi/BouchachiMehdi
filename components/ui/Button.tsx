import type {ButtonHTMLAttributes,ReactNode} from 'react';
import Link from 'next/link';

type Variant='solid'|'outline'|'text'|'inverse'|'filter'|'icon'|'bare';
type Props=ButtonHTMLAttributes<HTMLButtonElement>&{
 children:ReactNode;
 variant?:Variant;
 href?:string;
 target?:string;
 rel?:string;
 download?:boolean|string;
 active?:boolean;
};

export default function Button({children,variant='solid',href,active=false,className='',target,rel,download,type='button',...props}:Props){
 const classes=`ui-button ui-button--${variant}${active?' is-active':''} ${className}`.trim();
 if(href){
  if(href.startsWith('/')&&!download&&!target)return <Link href={href} className={classes}>{children}</Link>;
  return <a href={href} className={classes} target={target} rel={rel} download={download}>{children}</a>;
 }
 return <button type={type} className={classes} {...props}>{children}</button>;
}
