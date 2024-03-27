import {HTMLMotionProps, motion} from "framer-motion";
import {cn} from "@/lib/utils";
import Link from "@/components/ui/link";
import {NavItem} from "@/components/header/nav/navItems";
import {CollapsibleItem} from "@/components/header/nav/mobile-nav-item/collapsible-item";

const variants = {
  open: {
    x: 0,
    y:0,
    opacity: 1,
    transition: {
      x: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    x: 50,
    y:0,
    opacity: 0,
    transition: {
      x: { stiffness: 1000 }
    }
  }
};

export const Item = ({
  item,
  ...rest
}:{
  item:NavItem
} & HTMLMotionProps<'div'>

) => {
  return (
<>
  {
    item.href && <Link href={item.href}>
          <motion.div
            {...rest}
            className={cn('text-lg font-medium leading-none', rest.className)}
          >{item.label}</motion.div>
      </Link>
  }
  {
    !item.href &&
          <motion.div
            {...rest}
            className={cn('text-lg font-medium leading-none', rest.className)}
          >{item.label}</motion.div>
  }
</>
)
  ;
};


const HeaderItem = ({
                      item,
                      ...rest
                    }: {
                      item: NavItem
                    } & HTMLMotionProps<'div'>
) => {


  return (
    <motion.div
      layout
      className={'py-2'}
      variants={variants}
    >
      { !item.children && <Item item={item} {...rest}/> }
      {item.children && <CollapsibleItem navItem={item} {...rest}/>}
    </motion.div>
  );
};

export default HeaderItem