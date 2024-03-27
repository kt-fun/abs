import {RefObject, useEffect, useRef} from "react";
import {useDomEvent, MotionValue, useSpring} from "framer-motion";
import { mix } from "@popmotion/popcorn";
import { debounce } from "lodash";
import {useGesture} from "@use-gesture/react";

interface Constraints {
  top: number;
  bottom: number;
}

// Absolute distance a wheel scroll event can travel outside of
// the defined constraints before we fire a "snap back" animation
const deltaThreshold = 5;

// If wheel event fires beyond constraints, multiple the delta by this amount
const elasticFactor = 0.2;

function springTo(value: MotionValue, from: number, to: number) {
  if (value.isAnimating()) return;
    value.setWithVelocity(from,to, 100)
}

const debouncedSpringTo = debounce(springTo, 100);

/**
 * Re-implements wheel scroll for overlflow: hidden elements.
 *
 * Adds Apple Watch crown-style constraints, where the user
 * must continue to input wheel events of a certain delta at a certain
 * speed or the scrollable container will spring back to the nearest
 * constraint.
 *
 * Currently achieves this using event.deltaY and a debounce, which
 * feels pretty good during direct input but it'd be better to increase
 * the deltaY threshold during momentum scroll.
 *
 * TODOs before inclusion in Framer Motion:
 * - Detect momentum scroll and increase delta threshold before spring
 * - Remove padding hack
 * - Handle x-axis
 * - Perhaps handle arrow and space keyboard events?
 *
 * @param ref - Ref of the Element to attach listener to
 * @param y - MotionValue for the scrollable element - might be different to the Element
 * @param constraints - top/bottom scroll constraints in pixels.
 * @param isActive - `true` if this listener should fire.
 */
export function useWheelScroll(
  ref: RefObject<Element>,
  y: MotionValue<number>,
  constraints: Constraints | null,
  onWheelCallback: (e: any) => void,
  isActive: boolean
) {
  const onWheel = (event: {
    deltaY: number
  }) => {
    const currentY = y.get();
    let newY = currentY - event.deltaY;
    let startedAnimation = false;
    const isWithinBounds =
      constraints && newY >= constraints.top && newY <= constraints.bottom;

    if (constraints && !isWithinBounds) {
      newY = mix(currentY, newY, elasticFactor);

      if (newY < constraints.top) {
        if (event.deltaY <= deltaThreshold) {
          y.setWithVelocity(currentY,newY,constraints.top)
          springTo(y, newY, constraints.top);
          startedAnimation = true;
        } else {
          debouncedSpringTo(y, newY, constraints.top);
        }
      }

      if (newY > constraints.bottom) {
        if (event.deltaY >= -deltaThreshold) {
          springTo(y, newY, constraints.bottom);
          startedAnimation = true;
        } else {
          debouncedSpringTo(y, newY, constraints.bottom);
        }
      }
    }

    if (!startedAnimation) {
      y.stop();
      y.set(newY);
    } else {
      debouncedSpringTo.cancel();
    }

    onWheelCallback(event);
  };

  const wheelOffset = useRef(0)
  const dragOffset = useRef(0)
  //todo:bad in mobile
  useGesture(
    {
      onDrag: ({ event,lastOffset:[,dy],delta:[,deltaY], offset: [, y], direction: [, direction] }) => {
        if(isActive) {
          event.preventDefault()
          if (dy) {
            dragOffset.current = y
            onWheel({
              deltaY: -deltaY
            })
          }
        }
      },
      onWheel: ({ event,lastOffset:[,dy],delta:[,deltaY], offset: [, y], direction: [, direction] }) => {
        // console.log("gesture wheel")
        if(isActive) {
          // console.log("wheel","direction",direction,"lastOffset",dy,"delta",deltaY,'offset',y)
          event.preventDefault()
          if (dy) {
            wheelOffset.current = y
            onWheel({
              deltaY: deltaY
            })
          }
        }
      },
    },
    { target:ref, wheel: { eventOptions: { passive: false } },drag: {eventOptions:{  passive:false}} }
  )
  // useDomEvent(ref, "wheel",  !isActive ? undefined: (e)=>{ onWheel(e as WheelEvent)}, { passive: false });
  // can't trigger in mobile

  // useEffect(() => {
  //   const handler = (e:Event)=>{
  //     console.log('scroll event')
  //     onWheel(e as WheelEvent)
  //   }
  //   const current = ref.current
  //   isActive && current?.addEventListener('scroll', handler)
  //   return ()=>{
  //     current?.removeEventListener('scroll',handler)
  //   }
  // }, [isActive, onWheel, ref]);

  // useDomEvent(ref, "scroll",  !isActive ? undefined: (e)=>{
  //   console.log('dom scroll', e)
  //   onWheel(e as WheelEvent)
  // }, { passive: false });
}
